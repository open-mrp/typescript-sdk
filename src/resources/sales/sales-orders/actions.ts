// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as BlocksAPI from '../../messaging/blocks';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as SalesOrdersAPI from './sales-orders';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List, view, create, update, and delete sales orders.
 */
export class Actions extends APIResource {
  /**
   * Deletes multiple sales orders in a single atomic operation.
   *
   * Each order is torn down exactly as it would be by deleting it on its own.
   * Fulfilled orders cannot be deleted; if any requested order fails this check, no
   * orders are deleted.
   *
   * This endpoint requires the permission: `sales_orders:delete`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.sales.salesOrders.actions.bulkDelete({
   *     sales_order_ids: ['or_9lqo07quiwyb'],
   *   });
   * ```
   */
  bulkDelete(body: ActionBulkDeleteParams, options?: RequestOptions): APIPromise<ActionBulkDeleteResponse> {
    return this._client.post('/v1/sales/sales-orders/actions/bulk-delete', { body, ...options });
  }

  /**
   * Issues a sales order, transitioning it from `estimate` to `issued`.
   *
   * Issuing commits the order for fulfillment: a pick is created for the order's
   * sale lines and inventory is reserved for each line tied to an inventory item.
   * Only an order still in `estimate` can be issued.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const salesOrder =
   *   await client.sales.salesOrders.actions.issue(
   *     'or_9lqo07quiwyb',
   *     { notify_customer: true },
   *   );
   * ```
   */
  issue(
    id: string,
    body: ActionIssueParams,
    options?: RequestOptions,
  ): APIPromise<SalesOrdersAPI.SalesOrder> {
    return this._client.put(path`/v1/sales/sales-orders/${id}/actions/issue`, { body, ...options });
  }

  /**
   * Unissues a sales order, transitioning it from `issued` back to `estimate`.
   *
   * Deletes the order's pick, discarding any picking progress recorded against it,
   * and releases the inventory reserved when the order was issued. Only an order in
   * `issued` can be unissued.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const salesOrder =
   *   await client.sales.salesOrders.actions.unissue(
   *     'or_9lqo07quiwyb',
   *   );
   * ```
   */
  unissue(id: string, options?: RequestOptions): APIPromise<SalesOrdersAPI.SalesOrder> {
    return this._client.put(path`/v1/sales/sales-orders/${id}/actions/unissue`, options);
  }

  /**
   * Closes a sales order, transitioning it from `issued` to `fulfilled`.
   *
   * Stamps the order's completion timestamp and closes its pick, packing every pick
   * line that is still open so the pick reads as complete alongside the order. Only
   * an order in `issued` can be closed, and once it is fulfilled it can no longer be
   * deleted, nor can its lines be removed, until it is reopened.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const salesOrder =
   *   await client.sales.salesOrders.actions.close(
   *     'or_9lqo07quiwyb',
   *   );
   * ```
   */
  close(id: string, options?: RequestOptions): APIPromise<SalesOrdersAPI.SalesOrder> {
    return this._client.put(path`/v1/sales/sales-orders/${id}/actions/close`, options);
  }

  /**
   * Reopens a sales order, transitioning it from `fulfilled` back to `issued`.
   *
   * Clears the order's completion timestamp and reopens its pick, unpacking every
   * pick line that is not yet fully picked so the outstanding work can be resumed;
   * lines already picked in full stay packed. Only an order in `fulfilled` can be
   * reopened.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const salesOrder =
   *   await client.sales.salesOrders.actions.open(
   *     'or_9lqo07quiwyb',
   *   );
   * ```
   */
  open(id: string, options?: RequestOptions): APIPromise<SalesOrdersAPI.SalesOrder> {
    return this._client.put(path`/v1/sales/sales-orders/${id}/actions/open`, options);
  }

  /**
   * Re-estimates the freight (shipping) charge for an order using the latest carrier
   * rates.
   *
   * Computes what the order's freight charge would be from its current ship-to
   * address, carrier, service level, and line items — applying the same
   * freight-exemption, flat-rate, and live carrier-rate logic used when the order is
   * created. The order is not modified: the returned amount is a quote to review,
   * and callers apply it by updating the order's shipping line. Use this to refresh
   * freight after changing the address or line items, or at any time to re-price
   * against current rates.
   *
   * This endpoint requires the permission: `sales_orders:read`.
   *
   * @example
   * ```ts
   * const quoteSalesOrderFreightResponse =
   *   await client.sales.salesOrders.actions.quoteFreight(
   *     'or_9lqo07quiwyb',
   *   );
   * ```
   */
  quoteFreight(id: string, options?: RequestOptions): APIPromise<QuoteSalesOrderFreightResponse> {
    return this._client.post(path`/v1/sales/sales-orders/${id}/actions/quote-freight`, options);
  }

  /**
   * Previews the ship-by date a set of commitment inputs would produce, without
   * creating or changing anything.
   *
   * Runs the same resolution an order runs when it is issued: a promised delivery
   * date has the customer's receiving days, the carrier's transit, and the plant's
   * shipping days worked back through it, while a lead time or a pinned ship date is
   * snapped onto the next earlier day the plant ships. The returned steps are that
   * derivation in order, so a caller can show why a date is what it is rather than
   * restating the rules.
   *
   * At most one of `promised_at`, `lead_time_override_days`, and
   * `ship_by_override_date` may be set; they are alternative answers to the same
   * question.
   *
   * Advisory rather than binding. Carrier transit comes from a lane cache warmed in
   * the background, so a lane nobody has shipped yet quotes against the service
   * level's default or against no transit at all, and the date stamped at issue may
   * differ once the lane has been rated.
   *
   * This endpoint requires the permission: `sales_orders:read`.
   *
   * @example
   * ```ts
   * const quoteSalesOrderCommitmentResponse =
   *   await client.sales.salesOrders.actions.quoteCommitment({
   *     buyer_account_id: 'ac_ykxoradjoeb3',
   *     promised_at: '2026-08-22T00:00:00Z',
   *     service_level_id: 'crop_4ilk9p6gccrx',
   *     ship_to_address_id: 'ad_npqa5y43q26z',
   *   });
   * ```
   */
  quoteCommitment(
    body: ActionQuoteCommitmentParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<QuoteSalesOrderCommitmentResponse> {
    return this._client.post('/v1/sales/sales-orders/actions/quote-commitment', { body, ...options });
  }

  /**
   * Creates a production run from a sales order.
   *
   * Walks the production flow behind each item-backed line to work out what actually
   * has to be made, then creates one batch for each item that is produced directly
   * from raw materials, sized to cover every line that needs it. Reserves the
   * material inventory those batches consume and links the run to the order. The
   * caller becomes the run's responsible user. An order can have at most one
   * production run, and a line whose item has no production flow contributes no
   * batches.
   *
   * This endpoint requires the permission: `production_runs:create`.
   *
   * @example
   * ```ts
   * const productionRun =
   *   await client.sales.salesOrders.actions.createProductionRun(
   *     'or_9lqo07quiwyb',
   *   );
   * ```
   */
  createProductionRun(
    id: string,
    params: ActionCreateProductionRunParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductionRun> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/sales/sales-orders/${id}/actions/create-production-run`, {
      query: { include },
      ...options,
    });
  }
}

/**
 * Request to bulk delete sales orders.
 */
export interface BulkDeleteSalesOrdersRequest {
  /**
   * IDs of the sales orders to delete.
   */
  sales_order_ids: Array<string>;
}

/**
 * CommitmentQuoteStep is one rule's contribution to a previewed ship-by date.
 *
 * Returned as an ordered list so a caller can show why a date is what it is
 * without reimplementing the arithmetic, and so the explanation cannot drift from
 * the calculation that produced it.
 */
export interface CommitmentQuoteStep {
  /**
   * Which rule applied.
   */
  code: 'basis' | 'receive_calendar' | 'carrier_transit' | 'ship_calendar' | 'pickup_cutoff';

  /**
   * Where the running date stood after this rule.
   */
  date: string;

  /**
   * How far this rule pulled the date back. Zero means the rule applied and changed
   * nothing, which is worth showing: it says the date was already on an open day.
   */
  days_moved: number;

  /**
   * The rule's own parameter — where a transit estimate came from, or the cutoff
   * time applied. Null for a rule that takes none, rather than an empty string:
   * snapping onto an open day has no parameter to report.
   */
  detail: string | null;
}

/**
 * Request to issue a sales order.
 */
export interface IssueSalesOrderRequest {
  /**
   * Whether to notify the customer.
   *
   * When `true`, an order acknowledgement email with a PDF of the order is sent to
   * the acknowledgement contacts on the order and the order's
   * `acknowledgment_status` becomes `sent`. The email is sent asynchronously, so
   * `acknowledgment_status` may still read `not_sent` immediately after this call
   * returns and settles to `sent` once delivery is queued. An order with no
   * acknowledgement contacts sends nothing and leaves its `acknowledgment_status`
   * unchanged.
   */
  notify_customer: boolean;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListProductionRunBatchSummary {
  /**
   * Resources in this page.
   */
  data: Array<ProductionRunBatchSummary>;

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
 * A production run: the group of shop-floor batches that are executed together,
 * tracked from the first batch scan through to completion.
 */
export interface ProductionRun {
  /**
   * Production run ID.
   */
  id: string;

  /**
   * Number of batches currently recorded against this run.
   */
  batch_count: number;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  batch_summaries: ListProductionRunBatchSummary | null;

  /**
   * Time the run finished production.
   *
   * Set automatically once every batch in the run has been scanned or deleted. From
   * that point the run can no longer be updated and no further batches can be added
   * to it.
   */
  completed_at: string | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Production run number, unique per account.
   *
   * Assigned automatically at creation as the next sequential number for the
   * account; can be changed via update.
   */
  number: string;

  /**
   * Resource type identifier.
   */
  object: 'production_run';

  /**
   * A user's membership in an account, carrying the account-specific status, role,
   * and department.
   *
   * Profile fields (name, email, username, image URL) live on the `user`
   * sub-resource, which is shared across every account the user belongs to.
   */
  responsible_user: BlocksAPI.AccountUser | null;

  /**
   * Time the run started production.
   *
   * Set automatically the first time a batch in the run is scanned at a station.
   */
  started_at: string | null;

  /**
   * Last-updated timestamp.
   */
  updated_at: string;
}

/**
 * The batches of one item, counted in one unit, that a production run holds.
 */
export interface ProductionRunBatchSummary {
  /**
   * Number of batches in the total.
   */
  batch_count: number;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * Resource type identifier.
   */
  object: 'production_run_batch_summary';

  /**
   * Total quantity of the batches, as a decimal string.
   */
  quantity_value: string;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  unit: CoreAPI.Entity | null;
}

/**
 * Request to preview the ship-by date a set of commitment inputs would produce.
 */
export interface QuoteSalesOrderCommitmentRequest {
  /**
   * The buying account, used to resolve its lead time and receiving days.
   */
  buyer_account_id?: string;

  /**
   * Carrier for the shipment.
   */
  carrier_id?: string;

  /**
   * When the order would be issued. Defaults to the date sales_order_id was issued
   * on, or to now for an order that has not been issued — a lead time is measured
   * from issue, so an order built today but issued next week commits to next week's
   * date, and re-committing one issued last week still counts from last week.
   */
  issued_at?: string;

  /**
   * Days between issue and the order being due to ship, in place of the customer's
   * standing lead time.
   */
  lead_time_override_days?: number;

  /**
   * Date delivery would be promised to the customer.
   */
  promised_at?: string;

  /**
   * An existing order to preview against. Its customer, ship-to address, carrier,
   * and service level are used, and the commitment fields below replace whatever it
   * currently carries.
   *
   * Omit it to preview an order that has not been created yet, supplying the parts
   * directly.
   */
  sales_order_id?: string;

  /**
   * Service level for the shipment, which the lane's transit estimate is keyed on.
   */
  service_level_id?: string;

  /**
   * The exact date the order would be due to ship.
   */
  ship_by_override_date?: string;

  /**
   * The ship-to address, which decides the destination timezone and the lane transit
   * is quoted on.
   */
  ship_to_address_id?: string;
}

/**
 * The ship-by date a set of commitment inputs would produce, and how it was
 * reached.
 */
export interface QuoteSalesOrderCommitmentResponse {
  /**
   * Commitment describes when a record is due to ship: what was asked for, what that
   * resolved to, and which rule decided.
   *
   * It is a generic, reusable sub-resource shared by anything carrying a ship-by
   * commitment — a sales order, the pick that fulfills it, or a preview of an order
   * that does not exist yet.
   *
   * The three inputs are alternative answers to the same question and at most one is
   * ever set; `lead_time_source` reports which of them, or which level of the
   * customer chain, produced the date. They are written flat on the create and
   * update bodies, the way a carrier is written as `carrier_id` and read back under
   * `freight`.
   */
  commitment: SalesOrdersAPI.Commitment | null;

  /**
   * Resource type identifier.
   */
  object: 'sales_order_commitment_quote';

  /**
   * The derivation in order, one entry per rule that moved the date.
   */
  steps: Array<CommitmentQuoteStep>;
}

/**
 * The freshly estimated freight charge for a sales order.
 */
export interface QuoteSalesOrderFreightResponse {
  /**
   * Resource type identifier.
   */
  object: 'sales_order_freight_quote';

  /**
   * A rate calculated on demand rather than stored.
   *
   * The same shape as a rate minus the fields only a persisted row can have: it
   * carries no ID and no timestamps because nothing was written. Used where a figure
   * is derived per request, such as an analysis comparing one customer's price
   * against the median other customers pay.
   */
  unit_price: SalesOrdersAPI.ComputedRate | null;
}

export interface ActionBulkDeleteResponse {}

export interface ActionBulkDeleteParams {
  /**
   * IDs of the sales orders to delete.
   */
  sales_order_ids: Array<string>;
}

export interface ActionIssueParams {
  /**
   * Whether to notify the customer.
   *
   * When `true`, an order acknowledgement email with a PDF of the order is sent to
   * the acknowledgement contacts on the order and the order's
   * `acknowledgment_status` becomes `sent`. The email is sent asynchronously, so
   * `acknowledgment_status` may still read `not_sent` immediately after this call
   * returns and settles to `sent` once delivery is queued. An order with no
   * acknowledgement contacts sends nothing and leaves its `acknowledgment_status`
   * unchanged.
   */
  notify_customer: boolean;
}

export interface ActionQuoteCommitmentParams {
  /**
   * The buying account, used to resolve its lead time and receiving days.
   */
  buyer_account_id?: string;

  /**
   * Carrier for the shipment.
   */
  carrier_id?: string;

  /**
   * When the order would be issued. Defaults to the date sales_order_id was issued
   * on, or to now for an order that has not been issued — a lead time is measured
   * from issue, so an order built today but issued next week commits to next week's
   * date, and re-committing one issued last week still counts from last week.
   */
  issued_at?: string;

  /**
   * Days between issue and the order being due to ship, in place of the customer's
   * standing lead time.
   */
  lead_time_override_days?: number;

  /**
   * Date delivery would be promised to the customer.
   */
  promised_at?: string;

  /**
   * An existing order to preview against. Its customer, ship-to address, carrier,
   * and service level are used, and the commitment fields below replace whatever it
   * currently carries.
   *
   * Omit it to preview an order that has not been created yet, supplying the parts
   * directly.
   */
  sales_order_id?: string;

  /**
   * Service level for the shipment, which the lane's transit estimate is keyed on.
   */
  service_level_id?: string;

  /**
   * The exact date the order would be due to ship.
   */
  ship_by_override_date?: string;

  /**
   * The ship-to address, which decides the destination timezone and the lane transit
   * is quoted on.
   */
  ship_to_address_id?: string;
}

export interface ActionCreateProductionRunParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'responsible_user' | 'responsible_user.user'>;
}

export declare namespace Actions {
  export {
    type BulkDeleteSalesOrdersRequest as BulkDeleteSalesOrdersRequest,
    type CommitmentQuoteStep as CommitmentQuoteStep,
    type IssueSalesOrderRequest as IssueSalesOrderRequest,
    type ListProductionRunBatchSummary as ListProductionRunBatchSummary,
    type ProductionRun as ProductionRun,
    type ProductionRunBatchSummary as ProductionRunBatchSummary,
    type QuoteSalesOrderCommitmentRequest as QuoteSalesOrderCommitmentRequest,
    type QuoteSalesOrderCommitmentResponse as QuoteSalesOrderCommitmentResponse,
    type QuoteSalesOrderFreightResponse as QuoteSalesOrderFreightResponse,
    type ActionBulkDeleteResponse as ActionBulkDeleteResponse,
    type ActionBulkDeleteParams as ActionBulkDeleteParams,
    type ActionIssueParams as ActionIssueParams,
    type ActionQuoteCommitmentParams as ActionQuoteCommitmentParams,
    type ActionCreateProductionRunParams as ActionCreateProductionRunParams,
  };
}
