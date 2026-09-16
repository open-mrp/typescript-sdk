// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as RequestLogsAPI from '../../core/request-logs';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ActionsAPI from './actions';
import {
  ActionDismissParams,
  ActionMarkAllSeenResponse,
  ActionReadParams,
  ActionSeenParams,
  Actions,
} from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List, read, and manage in-app notifications.
 */
export class Notifications extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Sends an in-app notification to a single member of an account, or announces it
   * to everyone in the account.
   *
   * A send to one member is attributed to the authenticated caller, so the recipient
   * sees who sent it. It is accepted and then fanned out, so it reaches the
   * recipient's feed and their connected clients shortly after the response.
   *
   * An announcement to the whole account is stored as the request is accepted,
   * carries no sender, and may only target the account you are currently acting in.
   *
   * This endpoint requires the permission: `alerts:create`.
   *
   * @example
   * ```ts
   * const notificationSendResult =
   *   await client.messaging.notifications.create({
   *     category: 'order.updated',
   *     target: {
   *       type: 'account_user',
   *       id: 'acus_e5zu8bde0z3h',
   *     },
   *     title: 'Order updated',
   *     body: 'Order #1042 was updated.',
   *     link_resource_id: 'or_9lqo07quiwyb',
   *     link_resource_type: 'sales_order',
   *     priority: 'high',
   *   });
   * ```
   */
  create(body: NotificationCreateParams, options?: RequestOptions): APIPromise<NotificationSendResult> {
    return this._client.post('/v1/messaging/notifications', { body, ...options });
  }

  /**
   * Lists the notifications addressed to the current user, newest first.
   *
   * The feed is personal and scoped to the account being acted in, so it never
   * includes another user's notifications. Callers with no user membership in that
   * account, such as an API key, get an empty list rather than an error.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const listNotification =
   *   await client.messaging.notifications.list();
   * ```
   */
  list(
    query: NotificationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListNotification> {
    return this._client.get('/v1/messaging/notifications', { query, ...options });
  }

  /**
   * Retrieves a single notification by ID.
   *
   * Only notifications addressed to the current user are visible; another user's
   * notification is reported as not found. Dismissed notifications remain
   * retrievable.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const notification =
   *   await client.messaging.notifications.retrieve(
   *     'nf_yvw2bfj2guyn',
   *   );
   * ```
   */
  retrieve(
    id: string,
    query: NotificationRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Notification> {
    return this._client.get(path`/v1/messaging/notifications/${id}`, { query, ...options });
  }

  /**
   * Returns the current user's unread tallies for the account they are acting in,
   * for driving a notification badge.
   *
   * The total also counts account announcements the user has not seen, so it can be
   * higher than the notification count alone.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const notificationUnreadCount =
   *   await client.messaging.notifications.retrieveUnreadCount();
   * ```
   */
  retrieveUnreadCount(options?: RequestOptions): APIPromise<NotificationUnreadCount> {
    return this._client.get('/v1/messaging/notifications/unread-count', options);
  }

  /**
   * Returns the caller's unread totals broken down by account, covering every
   * account they belong to and not just the one they are acting in.
   *
   * Use it to show a user that activity is waiting for them elsewhere before they
   * switch accounts. Each tally counts unseen notifications and unseen account
   * announcements together.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const notificationUnreadSummary =
   *   await client.messaging.notifications.retrieveUnreadSummary();
   * ```
   */
  retrieveUnreadSummary(options?: RequestOptions): APIPromise<NotificationUnreadSummary> {
    return this._client.get('/v1/messaging/notifications/unread-summary', options);
  }
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListNotification {
  /**
   * Resources in this page.
   */
  data: Array<Notification>;

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
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListNotificationUnreadSummaryAccount {
  /**
   * Resources in this page.
   */
  data: Array<NotificationUnreadSummaryAccount>;

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
 * An in-app notification addressed to a single user, shown in their notification
 * (bell) feed.
 *
 * A notification belongs to one user in one account, so the feed you read is
 * always that of the authenticated caller in the account they are acting in.
 * Announcements broadcast to a whole account are a separate resource.
 */
export interface Notification {
  /**
   * Notification ID.
   */
  id: string;

  /**
   * Supporting detail shown beneath the title, such as a preview of the message that
   * triggered the notification.
   */
  body: string | null;

  /**
   * The kind of event this notification represents.
   *
   * The set is open-ended and may grow over time. Common first-party categories are:
   *
   * - `chat.message`: a new message in a conversation.
   * - `chat.mention`: a direct @mention, delivered even when the conversation is
   *   muted.
   * - `chat.added`: the user was added to a conversation.
   * - `order.updated`: an order the user is involved with changed.
   * - `agent.run_completed`: an agent run the user triggered finished.
   * - `agent.alert`: an agent raised an alert during a run.
   * - `system.broadcast`: a targeted system message.
   * - `customer.registered`: a buyer completed registration on your customer portal.
   */
  category:
    | 'chat.message'
    | 'chat.mention'
    | 'chat.added'
    | 'order.updated'
    | 'agent.run_completed'
    | 'agent.alert'
    | 'system.broadcast'
    | 'customer.registered';

  change_count: number | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * When the notification was dismissed.
   */
  dismissed_at: string | null;

  /**
   * Resource type identifier.
   */
  object: 'notification';

  /**
   * How prominently the notification should be surfaced, from `low` through
   * `urgent`.
   */
  priority: 'low' | 'normal' | 'high' | 'urgent';

  /**
   * When the notification was explicitly opened.
   */
  read_at: string | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  resource: CoreAPI.Entity | null;

  /**
   * When the notification was first surfaced to the user.
   */
  seen_at: string | null;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  sender: RequestLogsAPI.Actor | null;

  /**
   * Where the notification is in its lifecycle.
   *
   * - `unseen`: delivered but not yet surfaced to the user.
   * - `seen`: surfaced in the feed but not yet opened.
   * - `read`: explicitly opened by the user.
   * - `dismissed`: removed from the active feed.
   *
   * The status is derived from the seen, read, and dismissed timestamps, and only
   * ever moves forward — a notification can never become unseen again.
   */
  status: 'unseen' | 'seen' | 'read' | 'dismissed';

  /**
   * Short headline shown in the feed.
   */
  title: string;

  /**
   * Last update timestamp.
   */
  updated_at: string;
}

/**
 * The acknowledgement returned when a notification is accepted for delivery.
 */
export interface NotificationSendResult {
  /**
   * Number of deliveries accepted for the notification.
   *
   * An account broadcast is stored once as a single announcement that serves
   * everyone in the account, so it reports `1` rather than a per-user count.
   * Acceptance is not delivery: recipients who cannot be resolved are skipped when
   * the notification is fanned out.
   */
  enqueued: number;

  /**
   * Resource type identifier.
   */
  object: 'notification_send_result';
}

/**
 * Who a notification is aimed at.
 */
export interface NotificationTargetInput {
  /**
   * The id of the recipient, matching `type`: an account user id, or an account id.
   *
   * An account target must be the account you are currently acting in — you cannot
   * broadcast into another account.
   */
  id: string;

  /**
   * The kind of recipient being addressed.
   *
   * - `account_user`: one member of the account, who receives a personal
   *   notification in their feed.
   * - `account`: every member of the account, who all receive a single shared
   *   announcement.
   */
  type: 'account_user' | 'account';
}

/**
 * The caller's unread tallies in one account, used to drive the notification bell
 * badge.
 */
export interface NotificationUnreadCount {
  /**
   * Number of conversations with unread messages.
   *
   * Always `0` today — conversation unread counts are not yet folded into the bell.
   */
  conversations: number;

  /**
   * Number of the caller's notifications that have not been seen yet.
   *
   * Dismissed notifications are never counted, and marking all notifications seen
   * drops this to zero.
   */
  notifications: number;

  /**
   * Resource type identifier.
   */
  object: 'notification_unread_count';

  /**
   * Combined unread total for the bell badge.
   *
   * This is the unseen notification count plus any account announcements the caller
   * has not seen, so it can exceed `notifications`. Announcements are cleared
   * individually rather than by marking all notifications seen.
   */
  total: number;
}

/**
 * The caller's unread totals across every account they belong to, used to show
 * unread activity waiting in accounts they are not currently working in.
 */
export interface NotificationUnreadSummary {
  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  accounts: ListNotificationUnreadSummaryAccount | null;

  /**
   * Resource type identifier.
   */
  object: 'notification_unread_summary';

  /**
   * Combined unread total across all of the caller's accounts.
   */
  total: number;
}

/**
 * One account's unread tally within the caller's cross-account summary.
 */
export interface NotificationUnreadSummaryAccount {
  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  account: CoreAPI.Entity | null;

  /**
   * Resource type identifier.
   */
  object: 'notification_unread_summary_account';

  /**
   * Number of unseen notifications and account announcements the caller has in this
   * account.
   */
  unread: number;
}

/**
 * Request to send an in-app notification.
 *
 * The target decides whether the notification goes to one member of the account or
 * to everyone in it.
 */
export interface SendNotificationRequest {
  /**
   * The kind of event the notification represents, such as `order.updated`.
   *
   * Categories are how clients group and filter the feed, so reuse an existing one
   * where it fits.
   */
  category:
    | 'chat.message'
    | 'chat.mention'
    | 'chat.added'
    | 'order.updated'
    | 'agent.run_completed'
    | 'agent.alert'
    | 'system.broadcast'
    | 'customer.registered';

  /**
   * Who a notification is aimed at.
   */
  target: NotificationTargetInput;

  /**
   * Short headline shown in the recipient's feed.
   */
  title: string;

  /**
   * Supporting detail shown beneath the title.
   */
  body?: string;

  /**
   * ID of the resource the notification should link to.
   */
  link_resource_id?: string;

  /**
   * Type of the resource the notification should link to, such as `sales_order`.
   *
   * Set it together with `link_resource_id` to point the notification at something
   * the recipient can open; supplying only one of the two produces a notification
   * with no link.
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
   * How prominently the notification should be surfaced, from `low` through
   * `urgent`.
   */
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

export interface NotificationCreateParams {
  /**
   * The kind of event the notification represents, such as `order.updated`.
   *
   * Categories are how clients group and filter the feed, so reuse an existing one
   * where it fits.
   */
  category:
    | 'chat.message'
    | 'chat.mention'
    | 'chat.added'
    | 'order.updated'
    | 'agent.run_completed'
    | 'agent.alert'
    | 'system.broadcast'
    | 'customer.registered';

  /**
   * Who a notification is aimed at.
   */
  target: NotificationTargetInput;

  /**
   * Short headline shown in the recipient's feed.
   */
  title: string;

  /**
   * Supporting detail shown beneath the title.
   */
  body?: string;

  /**
   * ID of the resource the notification should link to.
   */
  link_resource_id?: string;

  /**
   * Type of the resource the notification should link to, such as `sales_order`.
   *
   * Set it together with `link_resource_id` to point the notification at something
   * the recipient can open; supplying only one of the two produces a notification
   * with no link.
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
   * How prominently the notification should be surfaced, from `low` through
   * `urgent`.
   */
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

export interface NotificationListParams {
  /**
   * Return only notifications of this category, such as `chat.mention` or
   * `order.updated`.
   */
  category?:
    | 'chat.message'
    | 'chat.mention'
    | 'chat.added'
    | 'order.updated'
    | 'agent.run_completed'
    | 'agent.alert'
    | 'system.broadcast'
    | 'customer.registered';

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
  include?: Array<'sender' | 'resource'>;

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
   * Return only notifications sent by these actors.
   *
   * A notification sent by a person is attributed to their account user id, not
   * their user id.
   */
  sender_ids?: Array<string>;

  /**
   * Return only notifications sent by these kinds of actor.
   *
   * Notifications raised by the platform itself are attributed to the `system`
   * sender type but are returned without a sender.
   */
  sender_types?: Array<'user' | 'group' | 'system' | 'agent' | 'apikey'>;

  /**
   * Return only notifications in this lifecycle state.
   *
   * When omitted, the response is the active feed: every notification that has not
   * been dismissed, whatever its seen or read state. Pass `dismissed` to review
   * notifications that were cleared out of the feed.
   */
  status?: 'unseen' | 'seen' | 'read' | 'dismissed';
}

export interface NotificationRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'sender' | 'resource'>;
}

Notifications.Actions = Actions;

export declare namespace Notifications {
  export {
    type ListNotification as ListNotification,
    type ListNotificationUnreadSummaryAccount as ListNotificationUnreadSummaryAccount,
    type Notification as Notification,
    type NotificationSendResult as NotificationSendResult,
    type NotificationTargetInput as NotificationTargetInput,
    type NotificationUnreadCount as NotificationUnreadCount,
    type NotificationUnreadSummary as NotificationUnreadSummary,
    type NotificationUnreadSummaryAccount as NotificationUnreadSummaryAccount,
    type SendNotificationRequest as SendNotificationRequest,
    type NotificationCreateParams as NotificationCreateParams,
    type NotificationListParams as NotificationListParams,
    type NotificationRetrieveParams as NotificationRetrieveParams,
  };

  export {
    Actions as Actions,
    type ActionMarkAllSeenResponse as ActionMarkAllSeenResponse,
    type ActionSeenParams as ActionSeenParams,
    type ActionReadParams as ActionReadParams,
    type ActionDismissParams as ActionDismissParams,
  };
}
