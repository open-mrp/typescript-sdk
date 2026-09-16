// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CoreAPI from './core';
import * as RequestLogsAPI from './request-logs';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * View the jobs that track asynchronous work. Endpoints that answer 202 Accepted raise one and point at it with a Location header.
 */
export class Jobs extends APIResource {
  /**
   * Returns a job by ID — poll the job named in a `202 Accepted` response's
   * `Location` to observe its outcome. A completed export carries the link to its
   * file on `export.url`.
   *
   * This endpoint requires the permissions: `jobs:read`, `customers:read`,
   * `suppliers:read`.
   *
   * @example
   * ```ts
   * const job = await client.core.jobs.retrieve(
   *   'jb_grz7cdpnz8jr',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: JobRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Job> {
    return this._client.get(path`/v1/core/jobs/${id}`, { query, ...options });
  }

  /**
   * Cancels a job and returns it carrying its `cancelled` status. Work in flight is
   * not interrupted but can no longer settle, and a finished job cannot be
   * cancelled.
   *
   * This endpoint requires the permission: `jobs:delete`.
   *
   * @example
   * ```ts
   * const job = await client.core.jobs.cancel(
   *   'jb_grz7cdpnz8jr',
   * );
   * ```
   */
  cancel(
    id: string,
    params: JobCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Job> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/core/jobs/${id}/cancel`, { query: { include }, ...options });
  }
}

/**
 * Records a piece of work the API accepted and carries out asynchronously.
 * Endpoints answering `202 Accepted` point at one with a `Location` header; poll
 * it for the outcome.
 */
export interface Job {
  /**
   * Job ID.
   */
  id: string;

  /**
   * When the job was cancelled.
   */
  cancelled_at: string | null;

  /**
   * When the job finished processing, whether or not every row succeeded.
   */
  completed_at: string | null;

  /**
   * When the job was created.
   */
  created_at: string;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  created_by: RequestLogsAPI.Actor | null;

  /**
   * ResponseError is the JSON-serializable error body returned to API clients. It
   * contains only public information. This struct is used by the OpenAPI schema
   * generator to produce documentation.
   */
  error: ResponseError | null;

  /**
   * Points a completed export job at the file it produced.
   */
  export: JobExport | null;

  /**
   * When the most recent attempt failed. A retry that succeeds leaves this alongside
   * `completed_at`.
   */
  failed_at: string | null;

  /**
   * Resource type identifier.
   */
  object: 'job';

  /**
   * The kind of resource the job operates on, as an object-type value (e.g.
   * `product`).
   *
   * `type` names the verb — what the job does — and this names the subject, so a job
   * that produced no results still says what it was for.
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
    | 'pick_stage_total'
    | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  results: ListJobResult | null;

  /**
   * When the job began executing.
   */
  started_at: string | null;

  /**
   * How far the job has got.
   *
   * `completed` means the work was processed, not that every row succeeded — read
   * each entry's own `status` in `results`.
   */
  status: 'created' | 'started' | 'completed' | 'failed' | 'cancelled';

  /**
   * The kind of work the job carries out.
   */
  type: 'bulk_create' | 'bulk_upsert' | 'export' | 'pack_pick';

  /**
   * When the job was last updated.
   */
  updated_at: string;
}

/**
 * Points a completed export job at the file it produced.
 */
export interface JobExport {
  /**
   * Resource type identifier.
   */
  object: 'job_export';

  /**
   * Presigned link to the file, valid for five minutes.
   *
   * If the link has expired, read the job again for a fresh one.
   */
  url: string;
}

/**
 * Accounts for one row of the request: the resource it produced, or the error it
 * was rejected with. Every submitted row lands in exactly one of these once the
 * job completes.
 */
export interface JobResult {
  /**
   * ResponseError is the JSON-serializable error body returned to API clients. It
   * contains only public information. This struct is used by the OpenAPI schema
   * generator to produce documentation.
   */
  error: ResponseError | null;

  /**
   * Zero-based row of the request this result names.
   */
  index: number;

  /**
   * Resource type identifier.
   */
  object: 'job_result';

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  resource: CoreAPI.Entity | null;

  /**
   * What became of the row.
   *
   * - `created`: the row produced a new resource.
   * - `updated`: the row updated an existing resource.
   * - `failed`: the row was rejected and wrote nothing.
   */
  status: 'created' | 'updated' | 'failed';

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  sub_resources: CoreAPI.ListEntity | null;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListJobResult {
  /**
   * Resources in this page.
   */
  data: Array<JobResult>;

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
 * QuotaInfo provides machine-readable details about a plan-imposed resource limit.
 * Included in limit_exceeded errors so clients can display upgrade prompts, usage
 * bars, or implement programmatic retry/backoff logic.
 */
export interface QuotaInfo {
  /**
   * Limit is the maximum number of resources allowed by the current plan.
   */
  limit: number;

  /**
   * ResetAt is the time when the quota resets, if applicable. Nil for static
   * (non-metered) limits.
   */
  reset_at: string | null;

  /**
   * Used is the number of resources currently consumed.
   */
  used: number;
}

/**
 * ResponseError is the JSON-serializable error body returned to API clients. It
 * contains only public information. This struct is used by the OpenAPI schema
 * generator to produce documentation.
 */
export interface ResponseError {
  /**
   * A machine-readable code for the error.
   */
  code:
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
    | 'api_version_too_old';

  /**
   * A URL to documentation about the error.
   */
  doc_url: string | null;

  /**
   * Whether this error is transient and the request can be retried.
   */
  is_transient: boolean;

  /**
   * A human-readable message providing more details about the error.
   */
  message: string;

  /**
   * The parameter that caused the error, if applicable.
   */
  param: string | null;

  /**
   * QuotaInfo provides machine-readable details about a plan-imposed resource limit.
   * Included in limit_exceeded errors so clients can display upgrade prompts, usage
   * bars, or implement programmatic retry/backoff logic.
   */
  quota: QuotaInfo | null;

  /**
   * RequestLogURL is a link to the dashboard page for this request's log entry. Nil
   * when no request log is available.
   */
  request_log_url: string | null;

  /**
   * The type of error.
   */
  type: 'api_error' | 'idempotency_error' | 'invalid_request_error';
}

export interface JobRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export interface JobCancelParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export declare namespace Jobs {
  export {
    type Job as Job,
    type JobExport as JobExport,
    type JobResult as JobResult,
    type ListJobResult as ListJobResult,
    type QuotaInfo as QuotaInfo,
    type ResponseError as ResponseError,
    type JobRetrieveParams as JobRetrieveParams,
    type JobCancelParams as JobCancelParams,
  };
}
