// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as RequestLogsAPI from '../../core/request-logs';
import * as RunsAPI from '../../ai/runs/runs';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ActionsAPI from './actions';
import {
  ActionArchiveParams,
  ActionAssignParams,
  ActionHideParams,
  ActionLeaveParams,
  ActionMuteParams,
  ActionReadParams,
  ActionRedactParams,
  ActionReportParams,
  ActionSetLegalHoldParams,
  ActionSetStatusParams,
  ActionUnarchiveParams,
  ActionUnhideParams,
  ActionUnmuteParams,
  Actions,
  AssignConversationRequest,
  MarkConversationReadRequest,
  MuteConversationRequest,
  ReportConversationRequest,
  SetLegalHoldRequest,
  SetWorkflowStatusRequest,
} from './actions';
import * as LinksAPI from './links';
import {
  AddConversationLinkRequest,
  ConversationLink,
  LinkCreateParams,
  LinkDeleteParams,
  LinkDeleteResponse,
  LinkListParams,
  Links,
  ListConversationLink,
} from './links';
import * as MessagesAPI from './messages';
import {
  ListMessage,
  MessageAttachmentInput,
  MessageCreateParams,
  MessageListParams,
  Messages,
  SendMessageRequest,
} from './messages';
import * as AttachmentsAPI from './attachments/attachments';
import { Attachments } from './attachments/attachments';
import * as ParticipantsAPI from './participants/participants';
import {
  AddParticipantRequest,
  ParticipantCreateParams,
  ParticipantDeleteParams,
  ParticipantDeleteResponse,
  Participants,
} from './participants/participants';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Create conversations, send and read messages (1:1 direct messages).
 */
export class Conversations extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);
  links: LinksAPI.Links = new LinksAPI.Links(this._client);
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);
  participants: ParticipantsAPI.Participants = new ParticipantsAPI.Participants(this._client);
  attachments: AttachmentsAPI.Attachments = new AttachmentsAPI.Attachments(this._client);

  /**
   * Starts a direct message or group conversation.
   *
   * Requesting a direct message that already exists returns the existing thread
   * instead of creating a duplicate, and a direct message is refused when either
   * user has blocked the other. Conversation creation is rate limited per user.
   *
   * This endpoint requires the permission: `messaging:create`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.create({
   *     participant_account_user_ids: ['acus_e5zu8bde0z3h'],
   *     type: 'group',
   *     group_id: 'cvgp_wjlypugna7s4',
   *     title: 'Order #1042 — shipping question',
   *     topic_resource_id: 'or_9lqo07quiwyb',
   *     topic_resource_type: 'sales_order',
   *   });
   * ```
   */
  create(params: ConversationCreateParams, options?: RequestOptions): APIPromise<Conversation> {
    const { include, ...body } = params;
    return this._client.post('/v1/messaging/conversations', { query: { include }, body, ...options });
  }

  /**
   * Returns the caller's conversations, most recently active first.
   *
   * A customer portal user sees only their own support case with the vendor, and an
   * empty list until they have contacted support.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const listConversation =
   *   await client.messaging.conversations.list();
   * ```
   */
  list(
    query: ConversationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListConversation> {
    return this._client.get('/v1/messaging/conversations', { query, ...options });
  }

  /**
   * Returns a single conversation the caller participates in.
   *
   * Someone who has left the conversation can still read it back; it comes back
   * marked hidden for them. A team member who opens a customer-facing case they are
   * not yet part of is seated in it as a participant.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.retrieve(
   *     'cv_w35z4ck68yq7',
   *   );
   * ```
   */
  retrieve(
    id: string,
    query: ConversationRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Conversation> {
    return this._client.get(path`/v1/messaging/conversations/${id}`, { query, ...options });
  }

  /**
   * Renames a group conversation.
   *
   * Only an owner or admin of the conversation can rename it, and direct messages
   * cannot be renamed.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.update(
   *     'cv_w35z4ck68yq7',
   *     { title: 'Fulfillment war room' },
   *   );
   * ```
   */
  update(
    id: string,
    params: ConversationUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Conversation> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/messaging/conversations/${id}`, {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * A conversation thread the caller participates in.
 */
export interface Conversation {
  /**
   * Conversation ID.
   */
  id: string;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  assignee: RequestLogsAPI.Actor | null;

  /**
   * Whether this is a team-only conversation (`internal`) or a customer-facing case
   * (`customer`).
   *
   * A customer never sees an `internal` conversation, even one that is about them;
   * within a `customer` case they see only the messages that were sent to them, not
   * the team's internal notes on the case.
   */
  audience: 'internal' | 'customer';

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * A reusable roster: a named set of members (users and/or agents) that seeds new
   * conversations.
   *
   * Starting a conversation from a group snapshots its current members into that
   * conversation, so the same group can back many conversations (each with its own
   * title); later edits to the group never change conversations already created from
   * it.
   */
  group: MessagingGroup | null;

  /**
   * A chat message within a conversation.
   *
   * One resource covers every stage of a message's life: a delivered timeline
   * message, a message queued for a future send, and a customer-reply draft awaiting
   * approval. Read `status` to tell them apart.
   */
  last_message: Message | null;

  /**
   * When the most recent message was sent.
   */
  last_message_at: string | null;

  /**
   * Whether the conversation is under legal hold.
   *
   * While held, the conversation is exempt from automatic retention purging and from
   * redaction until the hold is released.
   */
  legal_hold: 'released' | 'held';

  /**
   * Resource type identifier.
   */
  object: 'conversation';

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  participants: ListConversationParticipant | null;

  /**
   * The conversation's state from the caller's point of view.
   *
   * - `active`: a normal, visible conversation.
   * - `archived`: archived for the whole account.
   * - `hidden`: the caller dismissed the conversation from their own list while
   *   everyone else still sees it, which takes precedence over an account-level
   *   archive.
   */
  status: 'active' | 'archived' | 'hidden';

  /**
   * The display title of a group conversation.
   *
   * Direct messages carry no stored title; clients derive one from the participants.
   */
  title: string | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  topic: CoreAPI.Entity | null;

  /**
   * What kind of conversation this is.
   *
   * - `direct_message`: a 1:1 thread between two users.
   * - `group`: a named thread with multiple user or agent members (including
   *   customer-facing support cases).
   * - `system`: a system channel that delivers automated account alerts.
   */
  type: 'direct_message' | 'group' | 'system';

  /**
   * Number of messages the caller has not yet read.
   */
  unread: number;

  /**
   * Last update timestamp.
   */
  updated_at: string;

  /**
   * The triage lane of a customer-facing case.
   *
   * Only conversations with a `customer` audience have a triage lane. It drives the
   * support inbox and is independent of `status`, which is about visibility rather
   * than progress.
   *
   * - `new`: opened but not yet triaged.
   * - `open`: actively being worked.
   * - `waiting_internal`: blocked on the internal team.
   * - `waiting_external`: blocked on an external reply.
   * - `needs_approval`: a drafted reply is awaiting human approval.
   * - `resolved`: closed out.
   */
  workflow_status:
    | 'new'
    | 'open'
    | 'waiting_internal'
    | 'waiting_external'
    | 'needs_approval'
    | 'resolved'
    | null;
}

/**
 * A participant (membership) in a conversation.
 */
export interface ConversationParticipant {
  /**
   * Participant ID.
   */
  id: string;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  actor: RequestLogsAPI.Actor | null;

  /**
   * For agent participants with a keyword or mention policy, the keywords that
   * trigger it.
   *
   * Matching is case-insensitive and looks anywhere in the message body: under
   * `keyword` the bare word is matched, under `mention` it must appear as
   * `@keyword`. Replying directly to one of the agent's own messages always reaches
   * it, so an agent with no keywords still answers replies but nothing else.
   */
  agent_trigger_keywords: Array<string>;

  /**
   * For agent participants, when the agent is invoked in response to messages.
   *
   * - `mention`: only when the agent is @mentioned.
   * - `keyword`: when a message contains one of the agent's trigger keywords.
   * - `always`: on every human message in the conversation.
   */
  agent_trigger_policy: 'mention' | 'keyword' | 'always' | null;

  /**
   * The participant's membership in the conversation.
   *
   * - `active`: currently a member.
   * - `left`: voluntarily left the conversation.
   * - `removed`: removed by an admin.
   * - `hidden`: still a member but has hidden the conversation from their own list.
   *
   * Membership records are kept rather than deleted, so re-adding someone who left
   * or was removed reactivates their original record and their earlier messages stay
   * attributed to them.
   */
  membership: 'active' | 'left' | 'removed' | 'hidden';

  /**
   * The participant's notification preference for the conversation.
   *
   * - `unmuted`: receives notifications for new messages.
   * - `muted`: new-message notifications are suppressed, though a direct @mention
   *   still raises an in-app alert (never an email), and the conversation still
   *   counts toward the unread total.
   */
  notifications: 'unmuted' | 'muted';

  /**
   * Resource type identifier.
   */
  object: 'conversation_participant';

  /**
   * A participant's read position in a conversation — the basis for read receipts
   * ("who has seen this").
   */
  read_cursor: ReadCursor;

  /**
   * The participant's permission level in the conversation.
   *
   * - `owner`: can rename or delete the conversation and manage its members and
   *   their roles.
   * - `admin`: can add or remove members and rename the conversation.
   * - `member`: can post, react, mute, and leave.
   * - `viewer`: read-only access.
   */
  role: 'owner' | 'admin' | 'member' | 'viewer';

  /**
   * The kind of participant.
   *
   * - `user`: an account user (a teammate).
   * - `agent`: an AI agent.
   * - `system`: the system itself, which posts automated messages.
   * - `customer`: an external customer in a support case.
   */
  type: 'user' | 'agent' | 'system' | 'customer';
}

/**
 * Request to create a conversation.
 */
export interface CreateConversationRequest {
  /**
   * The other participants to add.
   *
   * For a direct message, exactly one account user. For a group, the members to seed
   * — these can be omitted when `group_id` supplies a roster, or when the
   * conversation is anchored to a topic resource, since a record discussion may
   * start solo and pull people in later.
   *
   * The caller is always a participant and does not need to be listed; on a group
   * they become its owner and every other member seeded at creation is notified.
   */
  participant_account_user_ids: Array<string>;

  /**
   * The kind of conversation to create.
   *
   * - `direct_message`: a 1:1 thread with exactly one other user. Addressing
   *   yourself is allowed and gives you a private notes thread.
   * - `group`: a named thread with any number of user and agent members.
   *
   * `system` channels are created by the platform and cannot be requested here.
   */
  type: 'direct_message' | 'group' | 'system';

  /**
   * Seed a group conversation from a reusable roster.
   *
   * The roster's current members are copied into this conversation (in addition to
   * any `participant_account_user_ids`); the conversation is independent afterward.
   * Ignored for direct messages.
   */
  group_id?: string;

  /**
   * Title for a group conversation.
   *
   * A direct message is identified by its participants rather than by a title.
   */
  title?: string;

  /**
   * The id of the business record to anchor this conversation to.
   */
  topic_resource_id?: string;

  /**
   * The type of business record to anchor this conversation to.
   *
   * An anchored conversation is returned when conversations are listed for that
   * record, which is how a discussion shows up on an order or invoice.
   */
  topic_resource_type?:
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
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListConversation {
  /**
   * Resources in this page.
   */
  data: Array<Conversation>;

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
export interface ListConversationParticipant {
  /**
   * Resources in this page.
   */
  data: Array<ConversationParticipant>;

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
export interface ListMessageAttachment {
  /**
   * Resources in this page.
   */
  data: Array<MessageAttachment>;

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
export interface ListMessagingGroupMember {
  /**
   * Resources in this page.
   */
  data: Array<MessagingGroupMember>;

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
 * A chat message within a conversation.
 *
 * One resource covers every stage of a message's life: a delivered timeline
 * message, a message queued for a future send, and a customer-reply draft awaiting
 * approval. Read `status` to tell them apart.
 */
export interface Message {
  /**
   * Message ID.
   */
  id: string;

  /**
   * Machine-readable reason an agent reply failed.
   *
   * A client can react to the specific code rather than just showing the body —
   * `agent_spending_cap_reached`, for example, is a cue to offer raising the agent
   * spending limit.
   */
  agent_error_code:
    | 'expired_token'
    | 'api_key_expired'
    | 'api_key_revoked'
    | 'invalid_credentials'
    | 'insufficient_permissions'
    | 'payment_required'
    | 'agent_spending_cap_reached'
    | 'validation_failed'
    | 'missing_field'
    | 'invalid_format'
    | 'method_not_allowed'
    | 'resource_not_found'
    | 'resource_exists'
    | 'resource_conflict'
    | 'resource_gone'
    | 'idempotency_in_progress'
    | 'limit_exceeded'
    | 'registration_closed'
    | 'rate_limit_exceeded'
    | 'parameter_missing'
    | 'parameter_invalid'
    | 'parameter_unknown'
    | 'parameters_exclusive'
    | 'internal_error'
    | 'service_unavailable'
    | 'external_service_error'
    | 'timeout'
    | 'connection_error'
    | 'request_timeout'
    | 'client_closed_request'
    | 'api_version_required'
    | 'api_version_invalid'
    | 'api_version_too_old'
    | null;

  /**
   * A single execution of an agent, from trigger through completion.
   */
  agent_run: RunsAPI.AgentRun | null;

  /**
   * Whether this message is an agent reply reporting that the agent's run failed.
   *
   * The body explains the failure to the reader rather than answering the request.
   */
  agent_run_failed: boolean;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  attachments: ListMessageAttachment | null;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  author: RequestLogsAPI.Actor | null;

  /**
   * Message body.
   *
   * A message made up of nothing but attachments or a linked record carries no body,
   * and a deleted message has its body cleared.
   */
  body: string | null;

  /**
   * How the message reached its audience, or how a draft will be sent once it is
   * approved.
   *
   * - `message`: appears in the conversation itself.
   * - `email`: goes out as email on the thread of the inbox the case is bridged to.
   */
  channel: 'message' | 'email';

  /**
   * The dedupe key the client supplied when sending, echoed back so an optimistic
   * local copy can be matched to the stored message.
   */
  client_message_id: string | null;

  /**
   * A conversation thread the caller participates in.
   */
  conversation: Conversation | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * When the message was deleted.
   *
   * A deleted message keeps its place in the timeline with its body cleared, so
   * surrounding ordering and replies stay intact.
   */
  deleted_at: string | null;

  /**
   * When the message was last edited.
   */
  edited_at: string | null;

  /**
   * What this message represents.
   *
   * - `chat`: written by a person.
   * - `system_event`: a record of something that happened in the conversation, such
   *   as someone joining or a record being linked.
   * - `agent`: written by an AI agent taking part in the conversation.
   * - `scheduled`: came from a send queued ahead of time.
   * - `alert`: an automated alert surfaced in the conversation.
   * - `email`: a message carried over the case's bridged email thread, either one
   *   that arrived from the customer or a reply sent back out to them.
   */
  kind: 'chat' | 'system_event' | 'agent' | 'scheduled' | 'alert' | 'email';

  /**
   * Resource type identifier.
   */
  object: 'chat_message';

  /**
   * A chat message within a conversation.
   *
   * One resource covers every stage of a message's life: a delivered timeline
   * message, a message queued for a future send, and a customer-reply draft awaiting
   * approval. Read `status` to tell them apart.
   */
  reply_to: Message | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  resource: CoreAPI.Entity | null;

  /**
   * When a message queued for a future send is due to go out.
   */
  scheduled_at: string | null;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  sender: RequestLogsAPI.Actor | null;

  /**
   * The message's position in the conversation timeline, counting up from the first
   * message.
   *
   * A sequence is assigned only when a message is delivered, so a draft or a
   * not-yet-sent scheduled message reports `0`. Listing a conversation's messages
   * pages backwards through this ordering.
   */
  sequence: number;

  /**
   * Where the message stands in its life.
   *
   * - `draft`: a proposed reply to the customer, still editable and waiting for
   *   approval before anyone outside sees it.
   * - `scheduled`: queued to go out at a future time.
   * - `sent`: delivered, and part of the conversation everyone reads.
   * - `canceled`: a scheduled message stopped before it went out.
   * - `rejected`: a draft discarded instead of being sent.
   * - `failed`: a scheduled message that could not be delivered.
   * - `superseded`: a draft replaced by a newer one for the same thread.
   *
   * Only a `sent` message occupies a place in the conversation; the others are
   * records of messages that never reached it.
   */
  status: 'draft' | 'scheduled' | 'sent' | 'canceled' | 'rejected' | 'failed' | 'superseded';

  /**
   * The streaming state of an agent reply.
   *
   * `streaming` means the body is still being generated and keeps growing as
   * realtime updates arrive; `complete` means it is final.
   */
  streaming_state: 'streaming' | 'complete' | null;

  /**
   * The email subject line.
   *
   * On an email-bridged case, this is the subject of the inbound email, or the
   * subject a customer reply is sent out with.
   */
  subject: string | null;

  /**
   * Last update timestamp.
   */
  updated_at: string;

  /**
   * Who can see this message.
   *
   * - `internal`: a note only your team can see.
   * - `external`: sent to or received from an outside party, such as the customer on
   *   a support case, and part of the official record of that exchange.
   * - `system`: an event both your team and the customer see.
   *
   * A customer reading their own case is never served `internal` messages.
   */
  visibility: 'internal' | 'external' | 'system';
}

/**
 * A file, image, link, or resource attached to a message.
 */
export interface MessageAttachment {
  /**
   * Attachment ID.
   */
  id: string;

  /**
   * The MIME type of the uploaded content.
   *
   * Carried only by `file` and `image` attachments.
   */
  content_type: string | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * The filename the attachment was uploaded under.
   *
   * Carried only by `file` and `image` attachments.
   */
  filename: string | null;

  /**
   * The kind of attachment, which determines how it is stored and which of the
   * fields below are populated.
   *
   * - `file`: an uploaded non-image file.
   * - `image`: an uploaded image.
   * - `link`: an external URL reference, with no stored file.
   * - `resource`: a reference to an in-app resource, such as an order.
   */
  kind: 'file' | 'image' | 'link' | 'resource';

  /**
   * Resource type identifier.
   */
  object: 'message_attachment';

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  resource: CoreAPI.Entity | null;

  /**
   * The size of the uploaded content in bytes.
   *
   * Carried only by `file` and `image` attachments, and only when the sender
   * supplied it with the message.
   */
  size_bytes: number | null;

  /**
   * Where to fetch the attachment: a signed download URL for `file` and `image`
   * attachments, or the target address for `link` attachments.
   *
   * Download URLs are signed for one hour and regenerated each time the message is
   * read, so follow the URL promptly instead of persisting it. `resource`
   * attachments have no URL — use `resource` to resolve them.
   */
  url: string | null;
}

/**
 * A reusable roster: a named set of members (users and/or agents) that seeds new
 * conversations.
 *
 * Starting a conversation from a group snapshots its current members into that
 * conversation, so the same group can back many conversations (each with its own
 * title); later edits to the group never change conversations already created from
 * it.
 */
export interface MessagingGroup {
  /**
   * Messaging group ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  members: ListMessagingGroupMember | null;

  /**
   * The roster's display name.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'messaging_group';

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A member of a reusable roster: either a user or an agent, represented by its
 * actor.
 */
export interface MessagingGroupMember {
  /**
   * Membership ID.
   *
   * This identifies the member's place on the roster, not the user or agent
   * themselves; it is the id to pass when removing them from the roster.
   */
  id: string;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  actor: RequestLogsAPI.Actor | null;

  /**
   * Resource type identifier.
   */
  object: 'messaging_group_member';
}

/**
 * A participant's read position in a conversation — the basis for read receipts
 * ("who has seen this").
 */
export interface ReadCursor {
  /**
   * The id of the last message the participant has read.
   */
  message_id: string | null;

  /**
   * Resource type identifier.
   */
  object: 'read_cursor';

  /**
   * When the participant last advanced their read cursor.
   */
  read_at: string | null;

  /**
   * The sequence number of the last message the participant has read in the
   * conversation.
   *
   * A message is "seen" by this participant when its `sequence` is `<=` this value.
   * `0` means they have not read any message in the conversation yet.
   */
  sequence: number;
}

/**
 * Request to rename a conversation.
 */
export interface UpdateConversationRequest {
  /**
   * The group conversation's new display title.
   *
   * Send `null` to clear the title and leave the conversation unnamed.
   */
  title?: string | null;
}

export interface ConversationCreateParams {
  /**
   * Body param: The other participants to add.
   *
   * For a direct message, exactly one account user. For a group, the members to seed
   * — these can be omitted when `group_id` supplies a roster, or when the
   * conversation is anchored to a topic resource, since a record discussion may
   * start solo and pull people in later.
   *
   * The caller is always a participant and does not need to be listed; on a group
   * they become its owner and every other member seeded at creation is notified.
   */
  participant_account_user_ids: Array<string>;

  /**
   * Body param: The kind of conversation to create.
   *
   * - `direct_message`: a 1:1 thread with exactly one other user. Addressing
   *   yourself is allowed and gives you a private notes thread.
   * - `group`: a named thread with any number of user and agent members.
   *
   * `system` channels are created by the platform and cannot be requested here.
   */
  type: 'direct_message' | 'group' | 'system';

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;

  /**
   * Body param: Seed a group conversation from a reusable roster.
   *
   * The roster's current members are copied into this conversation (in addition to
   * any `participant_account_user_ids`); the conversation is independent afterward.
   * Ignored for direct messages.
   */
  group_id?: string;

  /**
   * Body param: Title for a group conversation.
   *
   * A direct message is identified by its participants rather than by a title.
   */
  title?: string;

  /**
   * Body param: The id of the business record to anchor this conversation to.
   */
  topic_resource_id?: string;

  /**
   * Body param: The type of business record to anchor this conversation to.
   *
   * An anchored conversation is returned when conversations are listed for that
   * record, which is how a discussion shows up on an order or invoice.
   */
  topic_resource_type?:
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
}

export interface ConversationListParams {
  /**
   * Filter the support inbox to cases owned by this assignee, an account user or an
   * account group.
   */
  assignee_resource_id?: string;

  /**
   * Filter by whether the conversation is team-only or customer-facing.
   *
   * - `internal`: threads the customer never sees — direct messages, group threads,
   *   and record discussions.
   * - `customer`: external customer-service cases the customer takes part in, from
   *   the portal or a bridged email thread.
   */
  audience?: 'internal' | 'customer';

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
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;

  /**
   * Return the archived support inbox instead of the working one.
   *
   * This swaps the view rather than widening it: archived cases are returned and
   * unarchived ones are left out.
   */
  include_archived?: boolean;

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
   * Filter by whether the caller has hidden the conversation from their own list.
   */
  status?: 'active' | 'hidden';

  /**
   * The id of the business record, together with `topic_resource_type`.
   */
  topic_resource_id?: string;

  /**
   * Restrict to conversations attached to a business record of this type, together
   * with `topic_resource_id`.
   *
   * Matches both conversations anchored to the record and conversations that merely
   * link it, which is what powers the "discussions on this record" view.
   */
  topic_resource_type?:
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
   * Filter by conversation type.
   */
  type?: 'direct_message' | 'group' | 'system';

  /**
   * Restrict the support inbox to cases nobody has been assigned yet.
   */
  unassigned?: boolean;

  /**
   * Filter the support inbox to a single triage lane.
   *
   * - `new`: opened but nobody has triaged it yet.
   * - `open`: actively being worked.
   * - `waiting_internal`: blocked on the internal team.
   * - `waiting_external`: blocked on a reply from the customer.
   * - `needs_approval`: a drafted reply is waiting for a human to approve it.
   * - `resolved`: closed out.
   *
   * The working inbox hides resolved cases unless you ask for this lane explicitly.
   */
  workflow_status?: 'new' | 'open' | 'waiting_internal' | 'waiting_external' | 'needs_approval' | 'resolved';
}

export interface ConversationRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ConversationUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;

  /**
   * Body param: The group conversation's new display title.
   *
   * Send `null` to clear the title and leave the conversation unnamed.
   */
  title?: string | null;
}

Conversations.Actions = Actions;
Conversations.Links = Links;
Conversations.Messages = Messages;
Conversations.Participants = Participants;
Conversations.Attachments = Attachments;

export declare namespace Conversations {
  export {
    type Conversation as Conversation,
    type ConversationParticipant as ConversationParticipant,
    type CreateConversationRequest as CreateConversationRequest,
    type ListConversation as ListConversation,
    type ListConversationParticipant as ListConversationParticipant,
    type ListMessageAttachment as ListMessageAttachment,
    type ListMessagingGroupMember as ListMessagingGroupMember,
    type Message as Message,
    type MessageAttachment as MessageAttachment,
    type MessagingGroup as MessagingGroup,
    type MessagingGroupMember as MessagingGroupMember,
    type ReadCursor as ReadCursor,
    type UpdateConversationRequest as UpdateConversationRequest,
    type ConversationCreateParams as ConversationCreateParams,
    type ConversationListParams as ConversationListParams,
    type ConversationRetrieveParams as ConversationRetrieveParams,
    type ConversationUpdateParams as ConversationUpdateParams,
  };

  export {
    Actions as Actions,
    type AssignConversationRequest as AssignConversationRequest,
    type MarkConversationReadRequest as MarkConversationReadRequest,
    type MuteConversationRequest as MuteConversationRequest,
    type ReportConversationRequest as ReportConversationRequest,
    type SetLegalHoldRequest as SetLegalHoldRequest,
    type SetWorkflowStatusRequest as SetWorkflowStatusRequest,
    type ActionSetLegalHoldParams as ActionSetLegalHoldParams,
    type ActionRedactParams as ActionRedactParams,
    type ActionReadParams as ActionReadParams,
    type ActionArchiveParams as ActionArchiveParams,
    type ActionUnarchiveParams as ActionUnarchiveParams,
    type ActionLeaveParams as ActionLeaveParams,
    type ActionHideParams as ActionHideParams,
    type ActionUnhideParams as ActionUnhideParams,
    type ActionMuteParams as ActionMuteParams,
    type ActionUnmuteParams as ActionUnmuteParams,
    type ActionSetStatusParams as ActionSetStatusParams,
    type ActionAssignParams as ActionAssignParams,
    type ActionReportParams as ActionReportParams,
  };

  export {
    Links as Links,
    type AddConversationLinkRequest as AddConversationLinkRequest,
    type ConversationLink as ConversationLink,
    type ListConversationLink as ListConversationLink,
    type LinkDeleteResponse as LinkDeleteResponse,
    type LinkCreateParams as LinkCreateParams,
    type LinkDeleteParams as LinkDeleteParams,
    type LinkListParams as LinkListParams,
  };

  export {
    Messages as Messages,
    type ListMessage as ListMessage,
    type MessageAttachmentInput as MessageAttachmentInput,
    type SendMessageRequest as SendMessageRequest,
    type MessageCreateParams as MessageCreateParams,
    type MessageListParams as MessageListParams,
  };

  export {
    Participants as Participants,
    type AddParticipantRequest as AddParticipantRequest,
    type ParticipantDeleteResponse as ParticipantDeleteResponse,
    type ParticipantCreateParams as ParticipantCreateParams,
    type ParticipantDeleteParams as ParticipantDeleteParams,
  };

  export { Attachments as Attachments };
}
