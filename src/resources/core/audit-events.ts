// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RequestLogsAPI from './request-logs';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * List and retrieve audit events.
 */
export class AuditEvents extends APIResource {
  /**
   * Returns a paginated list of audit events, newest first.
   *
   * Results cover every change where your account is either the acting account or
   * the account that was acted upon, so a customer's or supplier's changes to your
   * records appear alongside your own. The `q` parameter searches the resource type,
   * action, resource ID, and originating request ID.
   *
   * This endpoint requires the permission: `audit_events:read`.
   *
   * @example
   * ```ts
   * const listAuditEvent = await client.core.auditEvents.list();
   * ```
   */
  list(
    query: AuditEventListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListAuditEvent> {
    return this._client.get('/v1/core/audit-events', { query, ...options });
  }

  /**
   * Returns a single audit event by ID.
   *
   * The event is readable when your account is either the acting account or the
   * account that was acted upon.
   *
   * This endpoint requires the permission: `audit_events:read`.
   *
   * @example
   * ```ts
   * const auditEvent = await client.core.auditEvents.retrieve(
   *   'ae_emripvn8t1xl',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: AuditEventRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AuditEvent> {
    return this._client.get(path`/v1/core/audit-events/${id}`, { query, ...options });
  }

  /**
   * Returns every resource type an audit event can refer to, as plain strings.
   *
   * This is the accepted vocabulary for the `resource_types` filter when listing
   * audit events. It is the API's complete resource-type list rather than a list
   * derived from your account's data, so it includes types you may never have
   * recorded events for.
   *
   * This endpoint requires the permission: `audit_events:read`.
   *
   * @example
   * ```ts
   * const listObjectType =
   *   await client.core.auditEvents.retrieveResourceTypes();
   * ```
   */
  retrieveResourceTypes(options?: RequestOptions): APIPromise<ListObjectType> {
    return this._client.get('/v1/core/audit-events/resource-types', options);
  }
}

/**
 * An immutable record of a single change to a resource, capturing who made the
 * change, what changed, and when.
 *
 * Audit events are recorded automatically as mutations happen; they cannot be
 * created, edited, or deleted through the API. Recording is asynchronous, so an
 * event may take a moment to become readable after the request that caused it has
 * returned. An update that leaves every tracked field at its existing value
 * records no event unless the mutation attaches metadata of its own — a password
 * rotation, for example, records metadata and no field changes.
 */
export interface AuditEvent {
  /**
   * Audit event ID.
   */
  id: string;

  /**
   * An organization on OpenMRP, including its branding and customer portal
   * sub-resources.
   *
   * Your own account and any customer or supplier account you trade with are both
   * represented by this object.
   */
  account: APIKeysAPI.Account | null;

  /**
   * The type of action this event records.
   *
   * - `create`: the resource was created.
   * - `update`: one or more fields were changed.
   * - `delete`: the resource was deleted.
   * - `restore`: a previously deleted resource was restored.
   * - `archive`: the resource was archived.
   * - `approve`: a human approved a gated action, such as allowing a review-gated
   *   agent tool to run.
   * - `deny`: a human denied a gated action, such as rejecting a review-gated agent
   *   tool.
   */
  action: 'create' | 'update' | 'upsert' | 'delete' | 'restore' | 'archive' | 'approve' | 'deny';

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  actor: RequestLogsAPI.Actor | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  changes: ListAuditFieldChange | null;

  /**
   * When the audit event record was written.
   *
   * Slightly later than `occurred_at`, since events are recorded out of band from
   * the request that caused them.
   */
  created_at: string;

  /**
   * Idempotency key of the originating request.
   */
  idempotency_key: string | null;

  /**
   * Arbitrary JSON metadata for the mutation (e.g. reason, source, tags). Encoded as
   * a JSON value (object, array, string, number, boolean, or null), not a
   * JSON-encoded string.
   */
  metadata: unknown | null;

  /**
   * Resource type identifier.
   */
  object: 'audit_event';

  /**
   * When the audited mutation occurred.
   *
   * Audit events are ordered and date-filtered by this timestamp rather than by
   * `created_at`.
   */
  occurred_at: string;

  /**
   * A log of a single API request, capturing its route, outcome, latency, and actor.
   *
   * Logs are written after the response has been sent, so a new entry may take a
   * moment to become readable.
   */
  request: RequestLogsAPI.RequestLog | null;

  /**
   * Audited resource ID.
   */
  resource_id: string;

  /**
   * Resource type of the audited entity.
   */
  resource_type:
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
   * Originating client IP address.
   */
  source_ip: string | null;
}

/**
 * Field-level before/after transition recorded during a mutation.
 */
export interface AuditFieldChange {
  /**
   * Name of the changed field.
   *
   * Field names come from the audited record's stored representation and can differ
   * slightly from the corresponding field on the API resource — for example
   * `commission_policy_code` rather than `commission_policy`.
   */
  field: string;

  /**
   * New value as a JSON fragment.
   *
   * `null` on `delete` events, where the field has no remaining value. Encoded as a
   * JSON value (object, array, string, number, boolean, or null), not a JSON-encoded
   * string.
   */
  new_value: unknown | null;

  /**
   * Resource type identifier.
   */
  object: 'audit_field_change';

  /**
   * Previous value as a JSON fragment.
   *
   * `null` on `create` events, where the field had no prior value. Encoded as a JSON
   * value (object, array, string, number, boolean, or null), not a JSON-encoded
   * string.
   */
  old_value: unknown | null;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListAuditEvent {
  /**
   * Resources in this page.
   */
  data: Array<AuditEvent>;

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
export interface ListAuditFieldChange {
  /**
   * Resources in this page.
   */
  data: Array<AuditFieldChange>;

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
export interface ListObjectType {
  /**
   * Resources in this page.
   */
  data: Array<
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
    | 'pick_stage_total'
  >;

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

export interface AuditEventListParams {
  /**
   * Filter by the mutation type recorded on the event.
   */
  actions?: Array<'create' | 'update' | 'upsert' | 'delete' | 'restore' | 'archive' | 'approve' | 'deny'>;

  /**
   * Filter by the _acting_ account: the account that performed the mutation.
   *
   * Results are always scoped to events where your account is either the acting
   * account or the target account; this narrows that set to specific acting accounts
   * — for example a specific customer's account that mutated a resource on your
   * account.
   */
  actor_account_ids?: Array<string>;

  /**
   * Filter by the actor identifier.
   *
   * Matches the event's `actor.id`: a user ID for `user` actors, an API key ID for
   * `api_key` actors, or an agent ID for `agent` actors.
   */
  actor_ids?: Array<string>;

  /**
   * Filter by the actor type.
   *
   * Events are recorded for actors of type `user`, `api_key`, and `agent` — the last
   * covering changes an OpenMRP agent made on your account's behalf.
   */
  actor_types?: Array<'user' | 'api_key' | 'agent' | 'group'>;

  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Restricts results to audit events on or before this timestamp.
   */
  ends_at?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'account' | 'actor' | 'changes' | 'metadata' | 'request'>;

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
   * Filter by the audited resource IDs.
   */
  resource_ids?: Array<string>;

  /**
   * Filter by the resource type of the audited entity.
   *
   * The full set of valid values is available from the List Audit Event Resource
   * Types endpoint.
   */
  resource_types?: Array<
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
    | 'pick_stage_total'
  >;

  /**
   * ID of the root record whose history tree to return.
   *
   * Only applied when paired with `root_resource_type`.
   */
  root_resource_id?: string;

  /**
   * Scope results to a root record's entire history tree.
   *
   * Returns every event whose root resource matches, covering the root record itself
   * and all of its descendants — for example a sales order together with its lines,
   * picks, shipments, and invoices. Both `root_resource_type` and `root_resource_id`
   * must be supplied together; supplying only one has no effect.
   */
  root_resource_type?:
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
   * Restricts results to audit events on or after this timestamp.
   */
  starts_at?: string;

  /**
   * Filter by the _target_ account the mutation was performed against (the event's
   * `account`).
   *
   * Results are always scoped to events where your account is either the acting
   * account or the target account; this narrows that set to specific target accounts
   * — for example a specific customer's or supplier's account.
   */
  target_account_ids?: Array<string>;
}

export interface AuditEventRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'account' | 'actor' | 'changes' | 'metadata' | 'request'>;
}

export declare namespace AuditEvents {
  export {
    type AuditEvent as AuditEvent,
    type AuditFieldChange as AuditFieldChange,
    type ListAuditEvent as ListAuditEvent,
    type ListAuditFieldChange as ListAuditFieldChange,
    type ListObjectType as ListObjectType,
    type AuditEventListParams as AuditEventListParams,
    type AuditEventRetrieveParams as AuditEventRetrieveParams,
  };
}
