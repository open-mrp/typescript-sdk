// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ConversationsAPI from './conversations';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Send, list, edit, and delete chat messages.
 */
export class Messages extends APIResource {
  /**
   * Posts a message to a conversation.
   *
   * With `mode` = `send` the message is delivered — immediately, or queued when
   * `scheduled_at` is set — and a retry of an immediate send with the same
   * `client_message_id` returns the original message rather than posting it twice.
   * With `mode` = `draft` the message is proposed as a reply to the customer and
   * held for a teammate to approve instead of being sent, and `channel` is required.
   *
   * Sending requires you to be an active participant allowed to post: view-only
   * participants cannot post, and in a direct message neither side of a block can.
   * On a customer-facing case, replying to the customer moves the case to waiting on
   * the customer, and proposing a draft moves it to awaiting approval.
   *
   * This endpoint requires the permission: `messaging:create`.
   *
   * @example
   * ```ts
   * const message =
   *   await client.messaging.conversations.messages.create(
   *     'cv_w35z4ck68yq7',
   *     {
   *       body: 'Sounds good — shipping it today.',
   *       client_message_id: 'client_msg_8c7d2f',
   *       attachments: [
   *         {
   *           kind: 'file',
   *           s3_key: 'uploads/acme/quote.pdf',
   *           filename: 'quote.pdf',
   *           content_type: 'application/pdf',
   *           size_bytes: 20480,
   *         },
   *       ],
   *       audience: 'customer',
   *       cc: ['ap@acme.com'],
   *       channel: 'email',
   *       link_resource_id: 'or_9lqo07quiwyb',
   *       link_resource_type: 'sales_order',
   *       mentions: ['acus_e5zu8bde0z3h'],
   *       mode: 'send',
   *       reply_to_message_id: 'mg_fdny8633ebgw',
   *       scheduled_at: '2026-05-10T15:00:00Z',
   *       source_thread_message_id: 'mg_fdny8633ebgw',
   *       subject: 'Re: Order #1042',
   *     },
   *   );
   * ```
   */
  create(
    id: string,
    params: MessageCreateParams,
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Message> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/messaging/conversations/${id}/messages`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Returns the messages in a conversation, newest first.
   *
   * You must be an active participant. A customer reading their own case receives
   * only the messages meant for them — internal team notes are never included.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const listMessage =
   *   await client.messaging.conversations.messages.list(
   *     'cv_w35z4ck68yq7',
   *   );
   * ```
   */
  list(
    id: string,
    query: MessageListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListMessage> {
    return this._client.get(path`/v1/messaging/conversations/${id}/messages`, { query, ...options });
  }
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListMessage {
  /**
   * Resources in this page.
   */
  data: Array<ConversationsAPI.Message>;

  /**
   * Resource type identifier.
   */
  object: 'list';

  /**
   * PageInfo describes where the current page sits within a paginated result set and
   * how to move to the adjacent pages.
   *
   * Page a list by following the URLs below rather than assembling cursors yourself.
   * For a top-level list endpoint the URL repeats the original request's query
   * string with only the cursor swapped, so following it preserves the same filters,
   * search term, and page size.
   */
  page_info: APIKeysAPI.PageInfo;
}

/**
 * A single attachment supplied when sending a message.
 *
 * For an uploaded file or image, supply the `s3_key` you uploaded to; for a link,
 * supply `url`; for a resource reference, supply `resource_type` and
 * `resource_id`.
 */
export interface MessageAttachmentInput {
  /**
   * What is being attached.
   *
   * - `file`: a document you uploaded to object storage first.
   * - `image`: an uploaded image, rendered inline in the conversation.
   * - `link`: an external web address, with nothing stored on our side.
   * - `resource`: a reference to an in-app record, such as an order.
   */
  kind: 'file' | 'image' | 'link' | 'resource';

  /**
   * The MIME content type of the uploaded file (file and image).
   */
  content_type?: string;

  /**
   * The filename to display for the attachment (file and image).
   */
  filename?: string;

  /**
   * The id of the record being referenced, paired with `resource_type` (resource).
   */
  resource_id?: string;

  /**
   * The type of the record being referenced, paired with `resource_id` (resource).
   */
  resource_type?: string;

  /**
   * The key you uploaded the file to, taken from the upload-url response (file and
   * image).
   *
   * The key must be one minted for this conversation and the file must already be
   * uploaded, otherwise the send is rejected.
   */
  s3_key?: string;

  /**
   * The size of the uploaded file in bytes (file and image).
   */
  size_bytes?: number;

  /**
   * The web address being shared (link).
   */
  url?: string;
}

/**
 * Request to post a message to a conversation.
 */
export interface SendMessageRequest {
  /**
   * Message body.
   *
   * Required unless the message carries at least one attachment or a resource link.
   */
  body: string;

  /**
   * Client-supplied dedupe key.
   *
   * Repeating an immediate send with the same value returns the message created by
   * the first request instead of posting a second one, so a retry after a network
   * failure is safe. Required when sending (`mode` = `send`); ignored for drafts.
   */
  client_message_id: string;

  /**
   * Attachments to include with the message.
   */
  attachments?: Array<MessageAttachmentInput>;

  /**
   * Who the message is addressed to on a customer-facing case.
   *
   * - `customer`: a reply the customer sees, shown to them as coming from "Customer
   *   Service" and delivered as email when the case is bridged to an inbox.
   * - `internal`: a team-only note the customer never sees.
   *
   * Messages are team-only unless you ask for `customer`, so an internal note can
   * never leak by omission. Asking for `customer` on a conversation that has no
   * customer is rejected.
   *
   * On a case bridged to an email inbox, a customer reply goes out as mail carrying
   * only the body, subject, and copied recipients — attachments, mentions, resource
   * links, and replies are dropped.
   */
  audience?: 'internal' | 'customer';

  /**
   * Additional email addresses to copy on a customer reply sent by email.
   */
  cc?: Array<string>;

  /**
   * The channel a draft will be sent over once it is approved (`mode` = `draft`).
   *
   * - `message`: appears in the customer's conversation timeline.
   * - `email`: goes out as an email from the inbox the case is bridged to. Falls
   *   back to the conversation timeline if the case has no bridged inbox.
   */
  channel?: 'message' | 'email';

  /**
   * ID of a resource to link in the message, paired with `link_resource_type`.
   */
  link_resource_id?: string;

  /**
   * Type of a resource to link in the message, paired with `link_resource_id`.
   *
   * Linking a record lets clients render the message as a reference to it. A link
   * counts in place of text, so a message may consist of nothing but the link.
   */
  link_resource_type?:
    | 'account'
    | 'actor'
    | 'entity'
    | 'record'
    | 'freight'
    | 'commitment'
    | 'sales_order_totals'
    | 'sales_order_stage_total'
    | 'sales_order_related'
    | 'order_contact'
    | 'user'
    | 'address'
    | 'api_key'
    | 'created_api_key'
    | 'refresh_token'
    | 'list'
    | 'sandbox'
    | 'registration_session'
    | 'pricing_plan'
    | 'account_plan'
    | 'plan_change'
    | 'enterprise_inquiry'
    | 'request_log'
    | 'audit_event'
    | 'audit_field_change'
    | 'role'
    | 'unit'
    | 'account_affiliation'
    | 'agent_definition'
    | 'available_tool'
    | 'agent_definition_tool'
    | 'agent_account_status'
    | 'agent_run'
    | 'agent_action'
    | 'agent_run_step'
    | 'agent_token_usage'
    | 'agent_memory'
    | 'notification'
    | 'notification_unread_count'
    | 'notification_send_result'
    | 'notification_unread_summary'
    | 'announcement'
    | 'conversation'
    | 'support_case'
    | 'conversation_participant'
    | 'read_cursor'
    | 'chat_message'
    | 'notification_unread_summary_account'
    | 'messaging_block'
    | 'notification_preference'
    | 'message_attachment'
    | 'attachment_upload_target'
    | 'scheduled_message'
    | 'messaging_contact'
    | 'message_report'
    | 'tool_group'
    | 'model'
    | 'payment_term'
    | 'shipping_term'
    | 'quantity'
    | 'account_group'
    | 'support_route'
    | 'support_availability'
    | 'account_status'
    | 'geolocation'
    | 'account_user'
    | 'department'
    | 'account_integration'
    | 'account_price'
    | 'product_line'
    | 'item_category'
    | 'attribute'
    | 'rate'
    | 'account_group_product_line_access'
    | 'sales_target'
    | 'adjustment_type'
    | 'account_branding'
    | 'account_portal'
    | 'account_logo_url'
    | 'account_favicon_url'
    | 'public_account'
    | 'property'
    | 'carrier'
    | 'service_level'
    | 'item'
    | 'item_lot_default'
    | 'item_inventory'
    | 'product'
    | 'batch'
    | 'batch_flow_node'
    | 'scanning_consumption'
    | 'open_batch_summary'
    | 'scanning_production_step_info'
    | 'scanning_station'
    | 'production_step'
    | 'production_run'
    | 'machine'
    | 'machine_status'
    | 'machine_downtime_event'
    | 'demand_override'
    | 'demand_override_type'
    | 'machine_downtime_reason'
    | 'production_schedule_preview'
    | 'production_schedule_regenerate_preview'
    | 'production_schedule'
    | 'production_schedule_line'
    | 'production_schedule_deviation'
    | 'production_schedule_derived_line'
    | 'production_schedule_settings'
    | 'production_schedule_resource_setting'
    | 'production_schedule_item_setting'
    | 'fulfillment_recommendation'
    | 'analyze_delivery_performance_response'
    | 'delivery_performance'
    | 'delivery_backlog_bucket'
    | 'delivery_lateness_bucket'
    | 'delivery_breakdown'
    | 'analyze_sales_breakdown_response'
    | 'sales_totals'
    | 'sales_breakdown'
    | 'schedule_order_coverage'
    | 'schedule_order_coverage_line'
    | 'schedule_deviation_type'
    | 'schedule_at_risk_order'
    | 'production_schedule_finished_policy'
    | 'production_schedule_finishing_line'
    | 'production_schedule_week_release'
    | 'production_schedule_week_release_preview'
    | 'production_schedule_item_policy'
    | 'child_account'
    | 'unit_group'
    | 'unit_group_unit'
    | 'consumption'
    | 'customer_product_line_access'
    | 'customer'
    | 'frequently_ordered_product'
    | 'priority'
    | 'delivery'
    | 'delivery_line'
    | 'delivery_related'
    | 'sales_order'
    | 'location'
    | 'location_type'
    | 'lot'
    | 'email_log'
    | 'email_domain'
    | 'email_inbox'
    | 'email_sender'
    | 'portal_domain'
    | 'dns_record'
    | 'inventory_change_log'
    | 'invoice'
    | 'invoice_summary'
    | 'invoice_line'
    | 'invoice_allocation'
    | 'invoice_for_payment'
    | 'shipment'
    | 'shipment_summary'
    | 'shipment_line'
    | 'shipping_case'
    | 'shipping_case_label_url'
    | 'settlement'
    | 'settlement_summary'
    | 'role_permission'
    | 'registration_flow'
    | 'registration_flow_option'
    | 'transaction'
    | 'transaction_summary'
    | 'transaction_method'
    | 'transaction_type'
    | 'transaction_allocation'
    | 'usage_item'
    | 'account_usage_response'
    | 'subscription_info'
    | 'billing_portal_session_response'
    | 'switch_plan_response'
    | 'ensure_billing_customer_response'
    | 'spending_cap_response'
    | 'agent_spend_info'
    | 'webhook_response'
    | 'address_suggestion'
    | 'address_components'
    | 'address_details_result'
    | 'validated_address'
    | 'plan_limit'
    | 'plan_change_proration'
    | 'plan_change_line_item'
    | 'setup_billing_response'
    | 'confirm_payment_response'
    | 'oauth_response'
    | 'oauth_status_response'
    | 'stripe_publishable_key'
    | 'stripe_status'
    | 'healthcheck'
    | 'agent_definition_config'
    | 'trigger_config'
    | 'customer_contact_info'
    | 'customer_freight_preferences'
    | 'customer_defaults'
    | 'customer_lead_time'
    | 'customer_notification_preferences'
    | 'order_notification_recipient'
    | 'order_discount'
    | 'sales_order_line'
    | 'sales_order_type'
    | 'sales_order_status'
    | 'material'
    | 'supplier_material'
    | 'part'
    | 'permission_group'
    | 'permission'
    | 'pick'
    | 'pick_line'
    | 'product_type'
    | 'production'
    | 'production_flow'
    | 'map'
    | 'purchase_order'
    | 'purchase_order_line'
    | 'purchase_order_related'
    | 'supplier'
    | 'receivable_entry'
    | 'receiving_order'
    | 'receiving_order_line'
    | 'receiving_order_totals'
    | 'receiving_order_stage_total'
    | 'receiving_order_related'
    | 'email_contact'
    | 'allocation_entry'
    | 'open_credit_entry'
    | 'volume_discount'
    | 'volume_discount_tier'
    | 'analyze_deliveries_response'
    | 'analyze_manufacturing_response'
    | 'analyze_manufacturing_batch_response'
    | 'analyze_quarterly_orders_response'
    | 'analyze_new_customers_response'
    | 'analyze_demand_forecast_response'
    | 'analyze_oee_response'
    | 'analyze_oee_trend_response'
    | 'analyze_schedule_attainment_response'
    | 'catalog_product_line'
    | 'catalog_category'
    | 'catalog_product'
    | 'catalog_property'
    | 'catalog_attribute'
    | 'dc_location'
    | 'edi_run'
    | 'inventory_item'
    | 'analyze_weeks_of_sales_response'
    | 'bulk_reconcile_items_response'
    | 'sys_property'
    | 'sys_property_type'
    | 'sys_property_value'
    | 'territory'
    | 'tenancy'
    | 'checkout_session'
    | 'estimate_rate_result'
    | 'rate_shop_option'
    | 'rate_shop_result'
    | 'owner'
    | 'created_by'
    | 'message'
    | 'account_photo_upload_result'
    | 'user_photo_upload_result'
    | 'user_photo_url'
    | 'batch_lot'
    | 'check_duplicate_result'
    | 'item_costs'
    | 'item_trends'
    | 'reconciled_item_result'
    | 'skipped_item_result'
    | 'reconcile_error_result'
    | 'item_trend_point'
    | 'tenancy_pending_registration'
    | 'invoice_allocation_entry'
    | 'allocation_customer'
    | 'checkout_sales_order'
    | 'sales_order_price_quote'
    | 'sales_order_freight_quote'
    | 'sales_order_commitment_quote'
    | 'operating_calendar'
    | 'operating_calendar_closure'
    | 'sales_order_price_quote_line'
    | 'hubspot_sync_job'
    | 'hubspot_sync_report'
    | 'hubspot_company_review'
    | 'hubspot_company_candidate'
    | 'hubspot_sync_record'
    | 'contact_match'
    | 'reply_draft'
    | 'conversation_link'
    | 'messaging_group'
    | 'messaging_group_member'
    | 'portal_profile'
    | 'portal_registration_session'
    | 'portal_registration_session_data'
    | 'pack_list'
    | 'pack_list_party'
    | 'pack_list_line_item'
    | 'pack_list_back_order'
    | 'pack_list_case'
    | 'job'
    | 'job_result'
    | 'job_export'
    | 'analyze_customer_pricing_response'
    | 'customer_pricing_finding'
    | 'customer_pricing_summary'
    | 'computed_rate'
    | 'computed_quantity'
    | 'analyze_realized_margins_response'
    | 'realized_margin_finding'
    | 'realized_margin_summary'
    | 'shipment_related'
    | 'invoice_related'
    | 'pick_related'
    | 'pick_totals'
    | 'pick_stage_total';

  /**
   * Account user ids explicitly @mentioned in the message.
   *
   * A mention notifies the person even when they have muted the conversation.
   */
  mentions?: Array<string>;

  /**
   * Whether to deliver the message now or hold it as a customer-reply draft.
   *
   * - `send`: delivers the message, immediately or at `scheduled_at`.
   * - `draft`: proposes a reply to the customer on a customer-facing case and holds
   *   it for a teammate to approve before it goes out. Requires `channel`.
   *
   * A draft is built from `body`, `subject`, `channel`, and
   * `source_thread_message_id` only — attachments, mentions, copied recipients,
   * resource links, replies, and scheduling are not carried onto it.
   */
  mode?: 'send' | 'draft';

  /**
   * The message this one is a reply to.
   */
  reply_to_message_id?: string;

  /**
   * When set, hold the message and deliver it at this future time instead of sending
   * it now.
   *
   * Only the body is carried into a scheduled send — attachments, mentions, copied
   * recipients, resource links, replies, and audience are dropped, and it is
   * delivered as an ordinary team-visible message. If you are no longer an active
   * participant when it comes due, it is canceled instead of sent.
   */
  scheduled_at?: string;

  /**
   * The internal thread message a draft is composed from, when drafting from a
   * thread (`mode` = `draft`).
   */
  source_thread_message_id?: string;

  /**
   * The subject line for a customer reply sent by email.
   *
   * When omitted, the reply goes out as "Re:" the case title.
   */
  subject?: string;
}

export interface MessageCreateParams {
  /**
   * Body param: Message body.
   *
   * Required unless the message carries at least one attachment or a resource link.
   */
  body: string;

  /**
   * Body param: Client-supplied dedupe key.
   *
   * Repeating an immediate send with the same value returns the message created by
   * the first request instead of posting a second one, so a retry after a network
   * failure is safe. Required when sending (`mode` = `send`); ignored for drafts.
   */
  client_message_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'sender'
    | 'author'
    | 'resource'
    | 'attachments'
    | 'attachments.resource'
    | 'conversation'
    | 'conversation.participants'
    | 'conversation.last_message'
    | 'reply_to'
    | 'reply_to.sender'
    | 'reply_to.author'
    | 'reply_to.attachments'
    | 'agent_run'
  >;

  /**
   * Body param: Attachments to include with the message.
   */
  attachments?: Array<MessageAttachmentInput>;

  /**
   * Body param: Who the message is addressed to on a customer-facing case.
   *
   * - `customer`: a reply the customer sees, shown to them as coming from "Customer
   *   Service" and delivered as email when the case is bridged to an inbox.
   * - `internal`: a team-only note the customer never sees.
   *
   * Messages are team-only unless you ask for `customer`, so an internal note can
   * never leak by omission. Asking for `customer` on a conversation that has no
   * customer is rejected.
   *
   * On a case bridged to an email inbox, a customer reply goes out as mail carrying
   * only the body, subject, and copied recipients — attachments, mentions, resource
   * links, and replies are dropped.
   */
  audience?: 'internal' | 'customer';

  /**
   * Body param: Additional email addresses to copy on a customer reply sent by
   * email.
   */
  cc?: Array<string>;

  /**
   * Body param: The channel a draft will be sent over once it is approved (`mode` =
   * `draft`).
   *
   * - `message`: appears in the customer's conversation timeline.
   * - `email`: goes out as an email from the inbox the case is bridged to. Falls
   *   back to the conversation timeline if the case has no bridged inbox.
   */
  channel?: 'message' | 'email';

  /**
   * Body param: ID of a resource to link in the message, paired with
   * `link_resource_type`.
   */
  link_resource_id?: string;

  /**
   * Body param: Type of a resource to link in the message, paired with
   * `link_resource_id`.
   *
   * Linking a record lets clients render the message as a reference to it. A link
   * counts in place of text, so a message may consist of nothing but the link.
   */
  link_resource_type?:
    | 'account'
    | 'actor'
    | 'entity'
    | 'record'
    | 'freight'
    | 'commitment'
    | 'sales_order_totals'
    | 'sales_order_stage_total'
    | 'sales_order_related'
    | 'order_contact'
    | 'user'
    | 'address'
    | 'api_key'
    | 'created_api_key'
    | 'refresh_token'
    | 'list'
    | 'sandbox'
    | 'registration_session'
    | 'pricing_plan'
    | 'account_plan'
    | 'plan_change'
    | 'enterprise_inquiry'
    | 'request_log'
    | 'audit_event'
    | 'audit_field_change'
    | 'role'
    | 'unit'
    | 'account_affiliation'
    | 'agent_definition'
    | 'available_tool'
    | 'agent_definition_tool'
    | 'agent_account_status'
    | 'agent_run'
    | 'agent_action'
    | 'agent_run_step'
    | 'agent_token_usage'
    | 'agent_memory'
    | 'notification'
    | 'notification_unread_count'
    | 'notification_send_result'
    | 'notification_unread_summary'
    | 'announcement'
    | 'conversation'
    | 'support_case'
    | 'conversation_participant'
    | 'read_cursor'
    | 'chat_message'
    | 'notification_unread_summary_account'
    | 'messaging_block'
    | 'notification_preference'
    | 'message_attachment'
    | 'attachment_upload_target'
    | 'scheduled_message'
    | 'messaging_contact'
    | 'message_report'
    | 'tool_group'
    | 'model'
    | 'payment_term'
    | 'shipping_term'
    | 'quantity'
    | 'account_group'
    | 'support_route'
    | 'support_availability'
    | 'account_status'
    | 'geolocation'
    | 'account_user'
    | 'department'
    | 'account_integration'
    | 'account_price'
    | 'product_line'
    | 'item_category'
    | 'attribute'
    | 'rate'
    | 'account_group_product_line_access'
    | 'sales_target'
    | 'adjustment_type'
    | 'account_branding'
    | 'account_portal'
    | 'account_logo_url'
    | 'account_favicon_url'
    | 'public_account'
    | 'property'
    | 'carrier'
    | 'service_level'
    | 'item'
    | 'item_lot_default'
    | 'item_inventory'
    | 'product'
    | 'batch'
    | 'batch_flow_node'
    | 'scanning_consumption'
    | 'open_batch_summary'
    | 'scanning_production_step_info'
    | 'scanning_station'
    | 'production_step'
    | 'production_run'
    | 'machine'
    | 'machine_status'
    | 'machine_downtime_event'
    | 'demand_override'
    | 'demand_override_type'
    | 'machine_downtime_reason'
    | 'production_schedule_preview'
    | 'production_schedule_regenerate_preview'
    | 'production_schedule'
    | 'production_schedule_line'
    | 'production_schedule_deviation'
    | 'production_schedule_derived_line'
    | 'production_schedule_settings'
    | 'production_schedule_resource_setting'
    | 'production_schedule_item_setting'
    | 'fulfillment_recommendation'
    | 'analyze_delivery_performance_response'
    | 'delivery_performance'
    | 'delivery_backlog_bucket'
    | 'delivery_lateness_bucket'
    | 'delivery_breakdown'
    | 'analyze_sales_breakdown_response'
    | 'sales_totals'
    | 'sales_breakdown'
    | 'schedule_order_coverage'
    | 'schedule_order_coverage_line'
    | 'schedule_deviation_type'
    | 'schedule_at_risk_order'
    | 'production_schedule_finished_policy'
    | 'production_schedule_finishing_line'
    | 'production_schedule_week_release'
    | 'production_schedule_week_release_preview'
    | 'production_schedule_item_policy'
    | 'child_account'
    | 'unit_group'
    | 'unit_group_unit'
    | 'consumption'
    | 'customer_product_line_access'
    | 'customer'
    | 'frequently_ordered_product'
    | 'priority'
    | 'delivery'
    | 'delivery_line'
    | 'delivery_related'
    | 'sales_order'
    | 'location'
    | 'location_type'
    | 'lot'
    | 'email_log'
    | 'email_domain'
    | 'email_inbox'
    | 'email_sender'
    | 'portal_domain'
    | 'dns_record'
    | 'inventory_change_log'
    | 'invoice'
    | 'invoice_summary'
    | 'invoice_line'
    | 'invoice_allocation'
    | 'invoice_for_payment'
    | 'shipment'
    | 'shipment_summary'
    | 'shipment_line'
    | 'shipping_case'
    | 'shipping_case_label_url'
    | 'settlement'
    | 'settlement_summary'
    | 'role_permission'
    | 'registration_flow'
    | 'registration_flow_option'
    | 'transaction'
    | 'transaction_summary'
    | 'transaction_method'
    | 'transaction_type'
    | 'transaction_allocation'
    | 'usage_item'
    | 'account_usage_response'
    | 'subscription_info'
    | 'billing_portal_session_response'
    | 'switch_plan_response'
    | 'ensure_billing_customer_response'
    | 'spending_cap_response'
    | 'agent_spend_info'
    | 'webhook_response'
    | 'address_suggestion'
    | 'address_components'
    | 'address_details_result'
    | 'validated_address'
    | 'plan_limit'
    | 'plan_change_proration'
    | 'plan_change_line_item'
    | 'setup_billing_response'
    | 'confirm_payment_response'
    | 'oauth_response'
    | 'oauth_status_response'
    | 'stripe_publishable_key'
    | 'stripe_status'
    | 'healthcheck'
    | 'agent_definition_config'
    | 'trigger_config'
    | 'customer_contact_info'
    | 'customer_freight_preferences'
    | 'customer_defaults'
    | 'customer_lead_time'
    | 'customer_notification_preferences'
    | 'order_notification_recipient'
    | 'order_discount'
    | 'sales_order_line'
    | 'sales_order_type'
    | 'sales_order_status'
    | 'material'
    | 'supplier_material'
    | 'part'
    | 'permission_group'
    | 'permission'
    | 'pick'
    | 'pick_line'
    | 'product_type'
    | 'production'
    | 'production_flow'
    | 'map'
    | 'purchase_order'
    | 'purchase_order_line'
    | 'purchase_order_related'
    | 'supplier'
    | 'receivable_entry'
    | 'receiving_order'
    | 'receiving_order_line'
    | 'receiving_order_totals'
    | 'receiving_order_stage_total'
    | 'receiving_order_related'
    | 'email_contact'
    | 'allocation_entry'
    | 'open_credit_entry'
    | 'volume_discount'
    | 'volume_discount_tier'
    | 'analyze_deliveries_response'
    | 'analyze_manufacturing_response'
    | 'analyze_manufacturing_batch_response'
    | 'analyze_quarterly_orders_response'
    | 'analyze_new_customers_response'
    | 'analyze_demand_forecast_response'
    | 'analyze_oee_response'
    | 'analyze_oee_trend_response'
    | 'analyze_schedule_attainment_response'
    | 'catalog_product_line'
    | 'catalog_category'
    | 'catalog_product'
    | 'catalog_property'
    | 'catalog_attribute'
    | 'dc_location'
    | 'edi_run'
    | 'inventory_item'
    | 'analyze_weeks_of_sales_response'
    | 'bulk_reconcile_items_response'
    | 'sys_property'
    | 'sys_property_type'
    | 'sys_property_value'
    | 'territory'
    | 'tenancy'
    | 'checkout_session'
    | 'estimate_rate_result'
    | 'rate_shop_option'
    | 'rate_shop_result'
    | 'owner'
    | 'created_by'
    | 'message'
    | 'account_photo_upload_result'
    | 'user_photo_upload_result'
    | 'user_photo_url'
    | 'batch_lot'
    | 'check_duplicate_result'
    | 'item_costs'
    | 'item_trends'
    | 'reconciled_item_result'
    | 'skipped_item_result'
    | 'reconcile_error_result'
    | 'item_trend_point'
    | 'tenancy_pending_registration'
    | 'invoice_allocation_entry'
    | 'allocation_customer'
    | 'checkout_sales_order'
    | 'sales_order_price_quote'
    | 'sales_order_freight_quote'
    | 'sales_order_commitment_quote'
    | 'operating_calendar'
    | 'operating_calendar_closure'
    | 'sales_order_price_quote_line'
    | 'hubspot_sync_job'
    | 'hubspot_sync_report'
    | 'hubspot_company_review'
    | 'hubspot_company_candidate'
    | 'hubspot_sync_record'
    | 'contact_match'
    | 'reply_draft'
    | 'conversation_link'
    | 'messaging_group'
    | 'messaging_group_member'
    | 'portal_profile'
    | 'portal_registration_session'
    | 'portal_registration_session_data'
    | 'pack_list'
    | 'pack_list_party'
    | 'pack_list_line_item'
    | 'pack_list_back_order'
    | 'pack_list_case'
    | 'job'
    | 'job_result'
    | 'job_export'
    | 'analyze_customer_pricing_response'
    | 'customer_pricing_finding'
    | 'customer_pricing_summary'
    | 'computed_rate'
    | 'computed_quantity'
    | 'analyze_realized_margins_response'
    | 'realized_margin_finding'
    | 'realized_margin_summary'
    | 'shipment_related'
    | 'invoice_related'
    | 'pick_related'
    | 'pick_totals'
    | 'pick_stage_total';

  /**
   * Body param: Account user ids explicitly @mentioned in the message.
   *
   * A mention notifies the person even when they have muted the conversation.
   */
  mentions?: Array<string>;

  /**
   * Body param: Whether to deliver the message now or hold it as a customer-reply
   * draft.
   *
   * - `send`: delivers the message, immediately or at `scheduled_at`.
   * - `draft`: proposes a reply to the customer on a customer-facing case and holds
   *   it for a teammate to approve before it goes out. Requires `channel`.
   *
   * A draft is built from `body`, `subject`, `channel`, and
   * `source_thread_message_id` only — attachments, mentions, copied recipients,
   * resource links, replies, and scheduling are not carried onto it.
   */
  mode?: 'send' | 'draft';

  /**
   * Body param: The message this one is a reply to.
   */
  reply_to_message_id?: string;

  /**
   * Body param: When set, hold the message and deliver it at this future time
   * instead of sending it now.
   *
   * Only the body is carried into a scheduled send — attachments, mentions, copied
   * recipients, resource links, replies, and audience are dropped, and it is
   * delivered as an ordinary team-visible message. If you are no longer an active
   * participant when it comes due, it is canceled instead of sent.
   */
  scheduled_at?: string;

  /**
   * Body param: The internal thread message a draft is composed from, when drafting
   * from a thread (`mode` = `draft`).
   */
  source_thread_message_id?: string;

  /**
   * Body param: The subject line for a customer reply sent by email.
   *
   * When omitted, the reply goes out as "Re:" the case title.
   */
  subject?: string;
}

export interface MessageListParams {
  /**
   * Return only messages that come after this position in the timeline.
   *
   * Use it to catch up after a dropped realtime connection: pass the sequence of the
   * last message you already have to fetch everything since.
   */
  after_sequence?: number;

  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'sender'
    | 'author'
    | 'resource'
    | 'attachments'
    | 'attachments.resource'
    | 'conversation'
    | 'conversation.participants'
    | 'conversation.last_message'
    | 'reply_to'
    | 'reply_to.sender'
    | 'reply_to.author'
    | 'reply_to.attachments'
    | 'agent_run'
  >;

  /**
   * Maximum number of results to return in a single page.
   */
  limit?: number;

  /**
   * Free-text search term used to filter results.
   *
   * Which fields are matched against the term varies by endpoint.
   */
  q?: string;

  /**
   * Which set of the conversation's messages to return.
   *
   * Left unset, you get the delivered timeline. Pass `draft` for the case's reply
   * drafts awaiting approval, or `scheduled` for the messages you yourself have
   * queued for a future send, soonest first. Those two ignore paging and come back
   * in a single response.
   */
  status?: 'draft' | 'scheduled' | 'sent' | 'canceled' | 'rejected' | 'failed' | 'superseded';
}

export declare namespace Messages {
  export {
    type ListMessage as ListMessage,
    type MessageAttachmentInput as MessageAttachmentInput,
    type SendMessageRequest as SendMessageRequest,
    type MessageCreateParams as MessageCreateParams,
    type MessageListParams as MessageListParams,
  };
}
