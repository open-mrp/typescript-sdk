// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ItemsAPI from '../../catalog/items/items';
import * as MaterialsAPI from '../../catalog/materials/materials';
import * as ActionsAPI from './actions';
import { ActionPackParams, Actions, PackPickRequest } from './actions';
import * as AccountPricesAPI from '../../sales/account-prices/account-prices';
import * as SalesOrdersAPI from '../../sales/sales-orders/sales-orders';
import * as LinesAPI from './lines/lines';
import { LineUpdateParams, Lines, UpdatePickLineRequest } from './lines/lines';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List, view, pick, void, and pack picks and pick lines.
 */
export class Picks extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);
  lines: LinesAPI.Lines = new LinesAPI.Lines(this._client);

  /**
   * Returns a paginated list of picks, soonest ship-by date first.
   *
   * The `q` search term matches the pick number (which is the order number) and the
   * customer PO number. To narrow by customer, use `customer_ids` rather than
   * searching for a customer name.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `picks:read`.
   *
   * @example
   * ```ts
   * const listPick = await client.operations.picks.list();
   * ```
   */
  list(query: PickListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ListPick> {
    return this._client.get('/v1/operations/picks', { query, ...options });
  }

  /**
   * Returns a pick by ID.
   *
   * This endpoint requires the permission: `picks:read`.
   *
   * @example
   * ```ts
   * const pick = await client.operations.picks.retrieve(
   *   'pk_6eilj488bq8d',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: PickRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Pick> {
    return this._client.get(path`/v1/operations/picks/${id}`, { query, ...options });
  }
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListPick {
  /**
   * Resources in this page.
   */
  data: Array<Pick>;

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
export interface ListPickLine {
  /**
   * Resources in this page.
   */
  data: Array<PickLine>;

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
 * A warehouse picking task for a sales order, tracking the quantities to pull from
 * inventory and pack for shipment.
 *
 * A pick is created automatically when a sales order is issued, with one line for
 * each order line whose product is of type `sale` service, shipping, tax, credit
 * and return lines are skipped — and nothing picked yet.
 */
export interface Pick {
  /**
   * Pick ID.
   */
  id: string;

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
   * Creation timestamp.
   */
  created_at: string;

  /**
   * CreatedBy describes who created a resource and their relationship to the account
   * that owns it.
   *
   * It is resolved from the resource's create audit event.
   */
  created_by: SalesOrdersAPI.CreatedBy | null;

  /**
   * A business you sell to, with its contact details, default fulfillment settings,
   * and order policies.
   */
  customer: AccountPricesAPI.Customer | null;

  /**
   * The customer's own purchase order number for the sales order this pick fulfills.
   */
  customer_purchase_order_number: string | null;

  /**
   * Timestamp when the pick was finished.
   */
  finished_at: string | null;

  /**
   * Freight describes the carrier selection and freight billing for a record.
   *
   * It is a generic, reusable sub-resource shared by anything that carries shipping
   * configuration — a sales order, a purchase order, or a shipment.
   */
  freight: SalesOrdersAPI.Freight | null;

  /**
   * Timestamp of the most recent shipment sent (null until shipped).
   */
  last_shipped_at: string | null;

  /**
   * Number of lines on this pick.
   */
  line_count: number;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  lines: ListPickLine | null;

  /**
   * Free-form note carried from the sales order this pick fulfills.
   */
  note: string | null;

  /**
   * Human-readable number that identifies the pick, distinct from the `id`.
   */
  number: string;

  /**
   * Resource type identifier.
   */
  object: 'pick';

  /**
   * How urgently the pick should be worked.
   */
  priority: 'low' | 'normal' | 'high';

  /**
   * Groups the records a pick sits between — the order it fulfills and the shipments
   * packed from it — and is returned only once at least one member has been
   * expanded.
   */
  related: PickRelated | null;

  /**
   * A saved address that can be used for billing and shipping on sales orders,
   * invoices, and shipments.
   */
  ship_to: APIKeysAPI.Address | null;

  /**
   * Progress through each fulfillment stage of a pick.
   */
  totals: PickTotals | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A single line on a pick, tracking the quantity picked against one sales order
 * line.
 */
export interface PickLine {
  /**
   * Pick line ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * An entry in your catalog: something you sell, consume, or build with.
   */
  item: ItemsAPI.Item | null;

  /**
   * Resource type identifier.
   */
  object: 'pick_line';

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  ordered_quantity: MaterialsAPI.Quantity | null;

  /**
   * Timestamp when the line was packed.
   */
  packed_at: string | null;

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  quantity: MaterialsAPI.Quantity | null;

  /**
   * A single line item on a sales order.
   */
  sales_order_line: SalesOrdersAPI.SalesOrderLine | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Groups the records a pick sits between — the order it fulfills and the shipments
 * packed from it — and is returned only once at least one member has been
 * expanded.
 */
export interface PickRelated {
  /**
   * Resource type identifier.
   */
  object: 'pick_related';

  /**
   * Record is a lightweight reference to a business record — a sales order, purchase
   * order, pick, shipment, production run, invoice, etc.
   *
   * Like the `actor` and `entity` references, it carries just enough to identify and
   * label the referenced record without embedding its full resource. The `status`
   * and `metadata` fields hold type-specific detail that varies by the kind of
   * record referenced.
   */
  sales_order: SalesOrdersAPI.Record | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  shipments: SalesOrdersAPI.ListRecord | null;
}

/**
 * How far one fulfillment stage of a pick has progressed.
 */
export interface PickStageTotal {
  /**
   * Progress as a fraction between 0 and 1.
   */
  completion: number;

  /**
   * Resource type identifier.
   */
  object: 'pick_stage_total';
}

/**
 * Progress through each fulfillment stage of a pick.
 */
export interface PickTotals {
  /**
   * Resource type identifier.
   */
  object: 'pick_totals';

  /**
   * How far one fulfillment stage of a pick has progressed.
   */
  packed: PickStageTotal;

  /**
   * How far one fulfillment stage of a pick has progressed.
   */
  picked: PickStageTotal;
}

export interface PickListParams {
  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Restricts results to picks whose customer belongs to any of these account
   * groups, matching the `type` on the customer.
   */
  customer_group_ids?: Array<string>;

  /**
   * Restricts results to picks raised for any of these customers.
   */
  customer_ids?: Array<string>;

  /**
   * Latest pick creation date to include, in `YYYY-MM-DD` format. Inclusive of the
   * date itself.
   */
  ends_at?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'customer'
    | 'created_by'
    | 'freight'
    | 'related.sales_order'
    | 'related.shipments'
    | 'lines'
    | 'lines.item'
    | 'lines.sales_order_line'
    | 'lines.sales_order_line.product'
    | 'lines.quantity'
    | 'lines.quantity.unit'
    | 'lines.ordered_quantity'
    | 'lines.ordered_quantity.unit'
  >;

  /**
   * Maximum number of results to return in a single page.
   */
  limit?: number;

  /**
   * Restricts results to picks with at least one line whose product belongs to any
   * of these product lines.
   */
  product_line_ids?: Array<string>;

  /**
   * Free-text search term used to filter results.
   *
   * Which fields are matched against the term varies by endpoint.
   */
  q?: string;

  /**
   * Orders the results: `ship_by_date` puts the soonest delivery commitment first,
   * with picks whose order has no ship-by date last; `created_at` puts the newest
   * pick first.
   */
  sort?: 'ship_by_date' | 'created_at';

  /**
   * Earliest pick creation date to include, in `YYYY-MM-DD` format.
   */
  starts_at?: string;

  /**
   * Restricts results to picks in this state.
   *
   * - `open`: picks that have not been finished.
   * - `closed`: picks that have been finished.
   */
  status?: 'open' | 'closed';
}

export interface PickRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'customer'
    | 'created_by'
    | 'freight'
    | 'related.sales_order'
    | 'related.shipments'
    | 'lines'
    | 'lines.item'
    | 'lines.sales_order_line'
    | 'lines.sales_order_line.product'
    | 'lines.quantity'
    | 'lines.quantity.unit'
    | 'lines.ordered_quantity'
    | 'lines.ordered_quantity.unit'
  >;
}

Picks.Actions = Actions;
Picks.Lines = Lines;

export declare namespace Picks {
  export {
    type ListPick as ListPick,
    type ListPickLine as ListPickLine,
    type Pick as Pick,
    type PickLine as PickLine,
    type PickRelated as PickRelated,
    type PickStageTotal as PickStageTotal,
    type PickTotals as PickTotals,
    type PickListParams as PickListParams,
    type PickRetrieveParams as PickRetrieveParams,
  };

  export {
    Actions as Actions,
    type PackPickRequest as PackPickRequest,
    type ActionPackParams as ActionPackParams,
  };

  export {
    Lines as Lines,
    type UpdatePickLineRequest as UpdatePickLineRequest,
    type LineUpdateParams as LineUpdateParams,
  };
}
