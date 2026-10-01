// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as RequestLogsAPI from '../../core/request-logs';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as InventoryAPI from '../../catalog/items/inventory';
import * as ItemsAPI from '../../catalog/items/items';
import * as MaterialsAPI from '../../catalog/materials/materials';
import * as ProductsAPI from '../../catalog/products/products';
import * as UnitsAPI from '../../catalog/units/units';
import * as AccountPricesAPI from '../account-prices/account-prices';
import * as OrderDiscountsAPI from '../order-discounts/order-discounts';
import * as ActionsAPI from './actions';
import {
  ActionBulkDeleteParams,
  ActionBulkDeleteResponse,
  ActionCreateProductionRunParams,
  ActionIssueParams,
  ActionQuoteCommitmentParams,
  Actions,
  BulkDeleteSalesOrdersRequest,
  CommitmentQuoteStep,
  IssueSalesOrderRequest,
  ListProductionRunBatchSummary,
  ProductionRun,
  ProductionRunBatchSummary,
  QuoteSalesOrderCommitmentRequest,
  QuoteSalesOrderCommitmentResponse,
  QuoteSalesOrderFreightResponse,
} from './actions';
import * as LinesAPI from './lines/lines';
import {
  CreateSalesOrderLineRequest,
  LineCreateParams,
  LineDeleteParams,
  LineDeleteResponse,
  LineUpdateParams,
  Lines,
  UpdateSalesOrderLineRequest,
} from './lines/lines';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class SalesOrders extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);
  lines: LinesAPI.Lines = new LinesAPI.Lines(this._client);

  /**
   * Lists the statuses a sales order can be in.
   *
   * The statuses are platform-provided and the same for every account, so the result
   * is small and stable enough to cache. Use it to label orders in your own
   * interface; an order moves between statuses through its issue, unissue, close,
   * and reopen actions rather than by being assigned a status.
   *
   * @example
   * ```ts
   * const listSalesOrderStatus =
   *   await client.sales.salesOrders.retrieveStatuses();
   * ```
   */
  retrieveStatuses(
    query: SalesOrderRetrieveStatusesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListSalesOrderStatus> {
    return this._client.get('/v1/sales/sales-orders/statuses', { query, ...options });
  }

  /**
   * Returns a paginated list of sales orders for the current account, newest first.
   *
   * A free-text search term (`q`) is matched as an exact value against the order
   * number and the customer purchase order number, and still respects the other
   * filters. Customer accounts calling this endpoint only ever see their own orders.
   *
   * This endpoint requires the permissions: `sales_orders:read`, `customers:read`,
   * `suppliers:read`.
   *
   * @example
   * ```ts
   * const listSalesOrder =
   *   await client.sales.salesOrders.list();
   * ```
   */
  list(
    query: SalesOrderListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListSalesOrder> {
    return this._client.get('/v1/sales/sales-orders', { query, ...options });
  }

  /**
   * Returns a sales order by ID.
   *
   * This endpoint requires the permissions: `customers:read`, `suppliers:read`,
   * `sales_orders:read`.
   *
   * @example
   * ```ts
   * const salesOrder = await client.sales.salesOrders.retrieve(
   *   'or_9lqo07quiwyb',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: SalesOrderRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SalesOrder> {
    return this._client.get(path`/v1/sales/sales-orders/${id}`, { query, ...options });
  }

  /**
   * Creates a sales order in `estimate` status.
   *
   * The order number is assigned automatically, and a sales rep is auto-assigned
   * when none is provided. Line prices and costs are resolved server-side from each
   * product. A shipping line carrying the estimated freight charge is added to the
   * order, plus a negative-priced discount line when an order discount is supplied.
   * The order is not committed for fulfillment until it is issued.
   *
   * This endpoint requires the permission: `sales_orders:create`.
   *
   * @example
   * ```ts
   * const salesOrder = await client.sales.salesOrders.create({
   *   bill_to_address_id: 'ad_npqa5y43q26z',
   *   buyer_account_id: 'ac_opnlh43ymyee',
   *   lines: [
   *     {
   *       product_id: 'pd_07oe0r7adh2w',
   *       quantity: { value: '10', unit_id: 'un_82bd37dae5po' },
   *     },
   *   ],
   *   priority_code: 'normal',
   *   ship_to_address_id: 'ad_npqa5y43q26z',
   *   acknowledgement_email_contacts: [
   *     { account_user_id: 'acus_e5zu8bde0z3h' },
   *   ],
   *   carrier_billing_account_number: '123456789',
   *   carrier_billing_type: 'sender',
   *   carrier_id: 'cr_tv5vfjtgu1n3',
   *   customer_purchase_order_number: 'PO-88231',
   *   invoice_email_contacts: [
   *     { account_user_id: 'acus_e5zu8bde0z3h' },
   *   ],
   *   note: 'Rush order for trade show',
   *   order_discount_id: 'ords_qnbrjvq5ih2q',
   *   payment_term_id: 'pytm_skssmsy21lem',
   *   promised_at: '2026-05-20T00:00:00Z',
   *   sales_rep_id: 'acus_e5zu8bde0z3h',
   *   service_level_id: 'crop_4ilk9p6gccrx',
   *   shipping_term_id: 'shtm_c5gxy05whw6r',
   * });
   * ```
   */
  create(params: SalesOrderCreateParams, options?: RequestOptions): APIPromise<SalesOrder> {
    const { include, ...body } = params;
    return this._client.post('/v1/sales/sales-orders', { query: { include }, body, ...options });
  }

  /**
   * Partially updates a sales order.
   *
   * Changing the carrier, service level, or ship-to address propagates to the
   * order's existing shipments, but never re-prices the freight line: request a
   * fresh estimate from the quote-freight endpoint and apply it to the shipping line
   * yourself. Order status is changed through the issue, unissue, close, and reopen
   * actions instead of this endpoint.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const salesOrder = await client.sales.salesOrders.update(
   *   'or_9lqo07quiwyb',
   *   {
   *     carrier_id: 'cr_tv5vfjtgu1n3',
   *     note: 'Updated shipping instructions',
   *     priority_code: 'normal',
   *     shipping_address_id: 'ad_npqa5y43q26z',
   *   },
   * );
   * ```
   */
  update(
    id: string,
    params: SalesOrderUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SalesOrder> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/sales/sales-orders/${id}`, { query: { include }, body, ...options });
  }

  /**
   * Deletes a sales order and all its related records.
   *
   * Removes the order's lines, pick, shipment and invoice lines, and email contacts,
   * and releases any inventory it had reserved. Fulfilled orders cannot be deleted.
   *
   * This endpoint requires the permission: `sales_orders:delete`.
   *
   * @example
   * ```ts
   * const salesOrder = await client.sales.salesOrders.delete(
   *   'or_9lqo07quiwyb',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<SalesOrderDeleteResponse> {
    return this._client.delete(path`/v1/sales/sales-orders/${id}`, options);
  }

  /**
   * Creates a hosted payment checkout session for a sales order.
   *
   * Requires an active Stripe integration on the account and a customer that already
   * exists in Stripe. The customer is charged a single amount covering every line on
   * the order, including its freight and discount lines, and the checkout link is
   * emailed to the address provided. Fails with a conflict if the order already has
   * a payment.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const checkoutSalesOrderResponse =
   *   await client.sales.salesOrders.checkout(
   *     'or_9lqo07quiwyb',
   *     { email: 'operations@acme.example.com' },
   *   );
   * ```
   */
  checkout(
    id: string,
    body: SalesOrderCheckoutParams,
    options?: RequestOptions,
  ): APIPromise<CheckoutSalesOrderResponse> {
    return this._client.post(path`/v1/sales/sales-orders/${id}/checkout`, { body, ...options });
  }

  /**
   * Calculates the unit price for each line without creating an order.
   *
   * Use this to display prices to users as they build an order. Prices are computed
   * server-side from the product's list price, contracted account prices, and
   * applicable discounts — the same logic used when an order is created. Internal
   * price overrides are not accepted here; the calculated price is always returned.
   *
   * This endpoint requires the permission: `sales_orders:read`.
   *
   * @example
   * ```ts
   * const quoteSalesOrderPricesResponse =
   *   await client.sales.salesOrders.priceQuote({
   *     buyer_account_id: 'ac_opnlh43ymyee',
   *     lines: [
   *       {
   *         product_id: 'pd_07oe0r7adh2w',
   *         quantity: {
   *           value: '10',
   *           unit_id: 'un_82bd37dae5po',
   *         },
   *       },
   *     ],
   *   });
   * ```
   */
  priceQuote(
    body: SalesOrderPriceQuoteParams,
    options?: RequestOptions,
  ): APIPromise<QuoteSalesOrderPricesResponse> {
    return this._client.post('/v1/sales/sales-orders/price-quote', { body, ...options });
  }
}

/**
 * Request to create a checkout session for a sales order.
 */
export interface CheckoutSalesOrderRequest {
  /**
   * Email address to send the checkout link to.
   */
  email: string;
}

/**
 * Checkout session result.
 */
export interface CheckoutSalesOrderResponse {
  /**
   * URL of the hosted payment page where the customer completes the checkout.
   */
  checkout_url: string;

  /**
   * Resource type identifier.
   */
  object: 'checkout_sales_order';
}

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
export interface Commitment {
  /**
   * Days the customer's receiving calendar and the plant's shipping calendar pulled
   * the ship-by date back, beyond what carrier transit accounted for.
   *
   * Zero means every date along the way already fell on an open day. This is what
   * explains a ship-by date that is earlier than transit alone would suggest.
   */
  calendar_adjustment_days: number | null;

  /**
   * When freight leaving on the ship-by date would reach the customer: transit
   * walked forward from it and landed on a day their dock receives.
   *
   * Reported by the commitment preview, which is asked what a set of inputs would
   * produce and so computes the arrival too. A record carries the commitment it was
   * stamped with, not a projection, and leaves this null.
   */
  estimated_delivery_date: string | null;

  /**
   * Calendar days between issue and the ship-by date.
   */
  lead_time_days: number | null;

  /**
   * Days between issue and the ship-by date, set on this record alone in place of
   * the customer's standing lead time.
   */
  lead_time_override_days: number | null;

  /**
   * Which rule produced the ship-by date.
   */
  lead_time_source:
    | 'customer'
    | 'parent_customer'
    | 'account_group'
    | 'account'
    | 'manual'
    | 'order_lead_time'
    | 'order_ship_by'
    | null;

  /**
   * Resource type identifier.
   */
  object: 'commitment';

  /**
   * Date delivery was promised to the customer, if one was committed.
   */
  promised_at: string | null;

  /**
   * When the record is contractually due to ship.
   *
   * Stamped at issue. With a promised delivery date, this is that date less the
   * carrier's transit for the order's lane and less any day the customer cannot
   * receive on — when the order has to leave to arrive when promised. Otherwise it
   * comes from a lead time, whether the order's own or the one on the customer, its
   * parent account, its account group, or the account.
   *
   * Always a day the plant actually ships on, whichever rule produced it, and
   * carries the plant's pickup cutoff as its time of day when the shipping calendar
   * sets one — the moment freight has to be tendered by, not just the day. Midnight
   * UTC means no cutoff is configured rather than a deadline at midnight.
   *
   * Recomputed while the order is still open whenever something it was derived from
   * moves — the basis above, or the carrier, service level, or ship-to address the
   * transit was quoted on. Renegotiating a customer's standing lead time or adding a
   * holiday to a calendar does not reach back into commitments already made. Cleared
   * if the order is unissued.
   */
  ship_by_date: string | null;

  /**
   * The ship date pinned by hand, bypassing transit and the customer's receiving
   * days.
   */
  ship_by_override_date: string | null;

  /**
   * Business days the carrier needs to cover this lane, subtracted from the promised
   * delivery date to reach the ship-by date.
   *
   * Only set when a delivery date was promised and the lane could be priced. Without
   * it the ship-by date falls back to the promised date itself.
   */
  transit_days: number | null;

  /**
   * Where the transit estimate came from.
   */
  transit_source: 'carrier_lane' | 'service_level' | null;
}

/**
 * A rate calculated on demand rather than stored.
 *
 * The same shape as a rate minus the fields only a persisted row can have: it
 * carries no ID and no timestamps because nothing was written. Used where a figure
 * is derived per request, such as an analysis comparing one customer's price
 * against the median other customers pay.
 */
export interface ComputedRate {
  /**
   * Unit of measurement used for conversions and product quantities.
   */
  denominator_unit: UnitsAPI.Unit | null;

  /**
   * Human-readable formatted value (e.g. "$25.50 / pr").
   */
  display_value: string;

  /**
   * Unit of measurement used for conversions and product quantities.
   */
  numerator_unit: UnitsAPI.Unit | null;

  /**
   * Resource type identifier.
   */
  object: 'computed_rate';

  /**
   * Decimal value of the rate, as a string to preserve precision.
   *
   * Expressed as the amount of the numerator unit per one denominator unit.
   */
  value: string;
}

/**
 * Line item input for a create sales order request.
 *
 * The item, unit cost, and (unless an internal user supplies a `unit_price`
 * override) the unit price are resolved server-side from the product. The quantity
 * unit must belong to the product's unit group.
 */
export interface CreateSalesOrderLineInput {
  /**
   * ID of the product being ordered.
   */
  product_id: string;

  /**
   * An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  quantity: InventoryAPI.QuantityInput;

  /**
   * Description recorded on the line.
   *
   * Defaults to the product's description when omitted.
   */
  product_description?: string;

  /**
   * SKU recorded on the line.
   *
   * Defaults to the product's SKU when omitted.
   */
  product_sku?: string;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

/**
 * Request to create a sales order.
 */
export interface CreateSalesOrderRequest {
  /**
   * Bill-to address ID.
   *
   * Must reference an existing address on the order's owner or buyer account.
   */
  bill_to_address_id: string;

  /**
   * ID of the customer account the order is for.
   */
  buyer_account_id: string;

  /**
   * The line items to put on the order.
   *
   * The freight line, and the discount line when `order_discount_id` is supplied,
   * are added on top of these automatically.
   */
  lines: Array<CreateSalesOrderLineInput>;

  /**
   * Fulfillment priority used to rank the order on the shop floor.
   */
  priority_code: 'low' | 'normal' | 'high';

  /**
   * Ship-to address ID.
   *
   * Must reference an existing address on the order's owner or buyer account.
   */
  ship_to_address_id: string;

  /**
   * Users who should receive order acknowledgement emails for this order.
   *
   * Each must be a user on the customer's account.
   */
  acknowledgement_email_contacts?: Array<SalesOrderEmailContactInput>;

  /**
   * Carrier billing account number charged when `carrier_billing_type` is
   * `third_party`.
   */
  carrier_billing_account_number?: string;

  /**
   * Who is billed for freight.
   *
   * - `sender`: the sender pays for shipping.
   * - `third_party`: a third party pays for shipping, using the carrier billing
   *   account number.
   */
  carrier_billing_type?: 'sender' | 'third_party';

  /**
   * ID of the carrier that will ship the order.
   *
   * Falls back to the customer's default carrier; the order is rejected when neither
   * is available.
   */
  carrier_id?: string;

  /**
   * The customer's own purchase order number, for cross-referencing.
   *
   * Must be unique among your orders for this customer.
   */
  customer_purchase_order_number?: string;

  /**
   * Users who should receive invoice emails for this order.
   *
   * Each must be a user on the customer's account.
   */
  invoice_email_contacts?: Array<SalesOrderEmailContactInput>;

  /**
   * Days between this order being issued and it being due to ship, replacing the
   * customer's standing lead time for this order alone.
   *
   * Already a ship lead time, so no carrier transit is subtracted from it. Mutually
   * exclusive with promised_at and ship_by_override_date.
   */
  lead_time_override_days?: number;

  /**
   * Free-form note about the order.
   */
  note?: string;

  /**
   * The order-level discount to apply, given as either its ID or its unique code.
   *
   * The discount is realized as an extra negative-priced line on the order rather
   * than as a separate total.
   */
  order_discount_id?: string;

  /**
   * ID of the payment terms for the order.
   *
   * Falls back to the customer's default payment term; the order is rejected when
   * neither is available.
   */
  payment_term_id?: string;

  /**
   * Date delivery is promised to the customer.
   *
   * The order's ship-by date is worked back from this: the goods have to reach the
   * customer on a day they receive, so transit and both operating calendars are
   * subtracted from it. Mutually exclusive with lead_time_override_days and
   * ship_by_override_date.
   */
  promised_at?: string;

  /**
   * ID of the account user to credit as the order's sales rep.
   *
   * When omitted, a rep is assigned automatically: the customer's default sales rep
   * first, then the sales territory matching the ship-to postal code, then the
   * ship-to state. No rep is assigned when the customer is commission-exempt or
   * every ordered product belongs to a commission-exempt product line.
   */
  sales_rep_id?: string;

  /**
   * ID of the carrier service level the order ships on.
   *
   * Falls back to the customer's default service level, but only when `carrier_id`
   * is also omitted — supplying a carrier without a service level leaves the service
   * level unset.
   */
  service_level_id?: string;

  /**
   * The exact date the order is due to ship, bypassing transit and the customer's
   * receiving days.
   *
   * Still moved back to the nearest earlier day the plant ships on, since a date
   * nobody can ship on is not a deadline. Mutually exclusive with promised_at and
   * lead_time_override_days.
   */
  ship_by_override_date?: string;

  /**
   * ID of the shipping terms for the order.
   *
   * Falls back to the customer's default shipping term; the order is rejected when
   * neither is available.
   */
  shipping_term_id?: string;
}

/**
 * CreatedBy describes who created a resource and their relationship to the account
 * that owns it.
 *
 * It is resolved from the resource's create audit event.
 */
export interface CreatedBy {
  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  actor: RequestLogsAPI.Actor | null;

  /**
   * Resource type identifier.
   */
  object: 'created_by';

  /**
   * The creator's relationship to the account that owns the resource.
   *
   * - `internal`: created by a user of the owning account.
   * - `customer`: created by a customer of the owning account.
   * - `system`: created automatically with no human actor (e.g. an EDI import).
   */
  relation: 'internal' | 'customer' | 'system';
}

/**
 * Freight describes the carrier selection and freight billing for a record.
 *
 * It is a generic, reusable sub-resource shared by anything that carries shipping
 * configuration — a sales order, a purchase order, or a shipment.
 */
export interface Freight {
  /**
   * Carrier account number to bill, used when `billing_type` is `third_party`.
   */
  billing_account_number: string | null;

  /**
   * Which party the carrier bills for the shipment.
   *
   * - `sender`: the shipper (your account) is billed.
   * - `third_party`: a third party is billed via `billing_account_number`.
   */
  billing_type: 'sender' | 'third_party' | null;

  /**
   * A shipping carrier configured for fulfilling orders.
   *
   * Carriers with a Shippo-supported `code` (`fedex`, `ups`, `usps`) are connected
   * through Shippo for live rating and label purchase; other carriers represent
   * self-managed shipping methods such as will call or local delivery.
   */
  carrier: AccountPricesAPI.Carrier | null;

  /**
   * Resource type identifier.
   */
  object: 'freight';

  /**
   * How freight is arranged and billed for the record.
   *
   * - `free_freight`: no shipping cost to the buyer.
   * - `billed_freight`: freight is billed to the buyer.
   *
   * Sales orders, purchase orders, and shipments do not carry a policy of their own.
   * Freight on those records is waived when the customer's freight preferences, the
   * customer's type group, any of its pricing groups, the customer's shipping term,
   * or any product line on the order is `free_freight`.
   */
  policy: 'free_freight' | 'billed_freight' | null;

  /**
   * A shipping speed or method offered by a carrier, such as ground or overnight.
   *
   * Carriers connected through Shippo have their service levels synced from the
   * carrier itself; any carrier can also have service levels you create by hand.
   */
  service_level: AccountPricesAPI.ServiceLevel | null;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListQuotedSalesOrderLine {
  /**
   * Resources in this page.
   */
  data: Array<QuotedSalesOrderLine>;

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
export interface ListRecord {
  /**
   * Resources in this page.
   */
  data: Array<Record>;

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
export interface ListSalesOrder {
  /**
   * Resources in this page.
   */
  data: Array<SalesOrder>;

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
export interface ListSalesOrderLine {
  /**
   * Resources in this page.
   */
  data: Array<SalesOrderLine>;

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
export interface ListSalesOrderStatus {
  /**
   * Resources in this page.
   */
  data: Array<SalesOrderStatus>;

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
 * A sales order's email recipients, grouped by the notification they receive.
 */
export interface OrderContact {
  /**
   * Email addresses that receive order acknowledgements for this order.
   */
  acknowledgement: Array<string>;

  /**
   * Email addresses that receive invoices for this order.
   */
  invoice: Array<string>;

  /**
   * Resource type identifier.
   */
  object: 'order_contact';
}

/**
 * A line to price in a quote request.
 */
export interface QuoteSalesOrderLineInput {
  /**
   * ID of the product to price.
   */
  product_id: string;

  /**
   * An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  quantity: InventoryAPI.QuantityInput;
}

/**
 * Request to quote sales-order line prices without creating an order.
 */
export interface QuoteSalesOrderPricesRequest {
  /**
   * ID of the customer account the prices are for.
   */
  buyer_account_id: string;

  /**
   * Lines to price.
   */
  lines: Array<QuoteSalesOrderLineInput>;
}

/**
 * Quoted unit prices for the requested lines, in request order.
 */
export interface QuoteSalesOrderPricesResponse {
  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  lines: ListQuotedSalesOrderLine | null;

  /**
   * Resource type identifier.
   */
  object: 'sales_order_price_quote';
}

/**
 * One priced line in a quote response.
 */
export interface QuotedSalesOrderLine {
  /**
   * Resource type identifier.
   */
  object: 'sales_order_price_quote_line';

  /**
   * A catalog entry as it is sold: an inventory item together with its product type,
   * product line, and customer portal visibility.
   *
   * Every product is backed by exactly one item, which carries the SKU, description,
   * pricing, attributes, and inventory position. Creating a product creates that
   * item; deleting the product deletes it.
   */
  product: ProductsAPI.Product | null;

  /**
   * A rate calculated on demand rather than stored.
   *
   * The same shape as a rate minus the fields only a persisted row can have: it
   * carries no ID and no timestamps because nothing was written. Used where a figure
   * is derived per request, such as an analysis comparing one customer's price
   * against the median other customers pay.
   */
  unit_price: ComputedRate | null;
}

/**
 * Record is a lightweight reference to a business record — a sales order, purchase
 * order, pick, shipment, production run, invoice, etc.
 *
 * Like the `actor` and `entity` references, it carries just enough to identify and
 * label the referenced record without embedding its full resource. The `status`
 * and `metadata` fields hold type-specific detail that varies by the kind of
 * record referenced.
 */
export interface Record {
  /**
   * Unique identifier for the record.
   */
  id: string;

  /**
   * Type-specific metadata.
   *
   * The set of keys varies by record type.
   */
  metadata: { [key: string]: string };

  /**
   * Human-readable record number, when the record has one.
   */
  number: string | null;

  /**
   * Resource type identifier.
   */
  object: 'record';

  /**
   * Type-specific status code, when applicable.
   */
  status: string | null;

  /**
   * The kind of business record referenced.
   *
   * Determines how to resolve the record and which `status` and `metadata` keys may
   * appear.
   *
   * - `sales_order`: a customer order.
   * - `purchase_order`: an order placed with a supplier.
   * - `receiving_order`: an inbound order being received into inventory.
   * - `pick`: a warehouse pick task.
   * - `shipment`: an outbound shipment.
   * - `delivery`: a delivery of one or more shipments to a destination.
   * - `production_run`: a manufacturing production run.
   * - `invoice`: a customer invoice.
   * - `transaction`: a payment or financial transaction.
   * - `settlement`: a settlement reconciling transactions against invoices.
   */
  type:
    | 'sales_order'
    | 'purchase_order'
    | 'receiving_order'
    | 'pick'
    | 'shipment'
    | 'delivery'
    | 'production_run'
    | 'invoice'
    | 'transaction'
    | 'settlement';
}

/**
 * An order placed by a customer, tracked from estimate through fulfillment.
 */
export interface SalesOrder {
  /**
   * Sales order ID.
   */
  id: string;

  /**
   * Whether an order acknowledgment has been sent to the customer.
   *
   * Becomes `sent` when the order is issued with customer notification requested and
   * the order has acknowledgement contacts to send to. It can also be set directly
   * when an acknowledgement was sent outside OpenMRP.
   */
  acknowledgment_status: 'not_sent' | 'sent';

  /**
   * A saved address that can be used for billing and shipping on sales orders,
   * invoices, and shipments.
   */
  bill_to_address: APIKeysAPI.Address | null;

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
  commitment: Commitment | null;

  /**
   * When the order was fulfilled and closed.
   */
  completed_at: string | null;

  /**
   * A sales order's email recipients, grouped by the notification they receive.
   */
  contacts: OrderContact | null;

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
  created_by: CreatedBy | null;

  /**
   * A business you sell to, with its contact details, default fulfillment settings,
   * and order policies.
   */
  customer: AccountPricesAPI.Customer | null;

  /**
   * The customer's own purchase order number, for cross-referencing.
   *
   * Unique among this customer's orders.
   */
  customer_purchase_order_number: string | null;

  /**
   * When this estimate expires, if an expiration was set.
   */
  expired_at: string | null;

  /**
   * When the first shipment against this order went out.
   */
  first_ship_at: string | null;

  /**
   * Freight describes the carrier selection and freight billing for a record.
   *
   * It is a generic, reusable sub-resource shared by anything that carries shipping
   * configuration — a sales order, a purchase order, or a shipment.
   */
  freight: Freight | null;

  /**
   * When the order was issued (moved out of `estimate`).
   */
  issued_at: string | null;

  /**
   * Number of lines on this order.
   */
  line_count: number;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  lines: ListSalesOrderLine | null;

  /**
   * Free-form note about the order.
   */
  note: string | null;

  /**
   * Human-readable order number, e.g. `SO-001`.
   *
   * Assigned automatically when the order is created; unique within your account.
   */
  number: string;

  /**
   * Resource type identifier.
   */
  object: 'sales_order';

  /**
   * A discount code that can be applied to a sales order.
   *
   * An order discount reduces the order total by either a percentage or a fixed
   * amount, depending on `discount_type`. The reduction is capped at the order total
   * and rounded to the nearest cent.
   */
  order_discount: OrderDiscountsAPI.OrderDiscount | null;

  /**
   * Stripe payment intent IDs recorded against this order.
   */
  payment_intent_ids: Array<string>;

  /**
   * Payment state of the order, derived from settlement allocations, invoices, and
   * Stripe payments.
   */
  payment_status: 'unpaid' | 'partially_paid' | 'paid';

  /**
   * A payment term describing when payment is due (e.g. `Net 30`), assignable to
   * customers, sales orders, purchase orders, and invoices.
   */
  payment_term: AccountPricesAPI.PaymentTerm | null;

  /**
   * Fulfillment priority, used to rank orders on the shop floor.
   */
  priority: 'low' | 'normal' | 'high';

  /**
   * The fulfillment records produced from a sales order.
   *
   * The group itself is returned only when at least one of its members has been
   * expanded.
   */
  related: SalesOrderRelated | null;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  sales_rep: RequestLogsAPI.Actor | null;

  /**
   * A saved address that can be used for billing and shipping on sales orders,
   * invoices, and shipments.
   */
  ship_to_address: APIKeysAPI.Address | null;

  /**
   * A named freight pricing rule that decides what a buyer pays for shipping.
   *
   * A customer's default shipping term is evaluated whenever freight is quoted for
   * one of their orders. Freight exemptions on the customer, its type group, or any
   * of its price groups are checked first and zero the freight charge before the
   * shipping term is considered.
   */
  shipping_term: AccountPricesAPI.ShippingTerm | null;

  /**
   * Order lifecycle status.
   *
   * - `estimate`: a draft quote that has not yet been committed; not counted as a
   *   real order.
   * - `issued`: the order has been issued and is being fulfilled.
   * - `fulfilled`: the order has been completed and closed.
   *
   * Status changes are made through the issue, unissue, close, and reopen action
   * endpoints rather than by updating this field.
   */
  status: 'estimate' | 'issued' | 'fulfilled';

  /**
   * Derived monetary totals for a sales order or one of its lines.
   *
   * Fulfillment runs ordered -> picked -> packed -> invoiced, and each downstream
   * stage reports both the money that has reached it and its progress against the
   * ordered baseline.
   */
  totals: SalesOrderTotals | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A user subscribed to one of a sales order's email notifications.
 */
export interface SalesOrderEmailContactInput {
  /**
   * ID of the account user who should receive the notification.
   */
  account_user_id: string;
}

/**
 * A single line item on a sales order.
 */
export interface SalesOrderLine {
  /**
   * Sales order line ID.
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
   * Position of the line on the order.
   *
   * Assigned automatically in sequence, starting at `1`. Product lines are numbered
   * first and the automatically generated freight and discount lines always sit at
   * the bottom; removing a line renumbers the rest so the sequence stays contiguous.
   */
  line_item_number: number;

  /**
   * Resource type identifier.
   */
  object: 'sales_order_line';

  /**
   * A catalog entry as it is sold: an inventory item together with its product type,
   * product line, and customer portal visibility.
   *
   * Every product is backed by exactly one item, which carries the SKU, description,
   * pricing, attributes, and inventory position. Creating a product creates that
   * item; deleting the product deletes it.
   */
  product: ProductsAPI.Product | null;

  /**
   * Description recorded on this line, taken from the product unless the line
   * supplies its own.
   */
  product_description: string | null;

  /**
   * SKU recorded on this line.
   *
   * Taken from the product unless the line supplies its own, and editable
   * afterwards, so it preserves what was sold even if the product's SKU later
   * changes.
   */
  product_sku: string;

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  quantity_ordered: MaterialsAPI.Quantity | null;

  /**
   * Derived monetary totals for a sales order or one of its lines.
   *
   * Fulfillment runs ordered -> picked -> packed -> invoiced, and each downstream
   * stage reports both the money that has reached it and its progress against the
   * ordered baseline.
   */
  totals: SalesOrderTotals | null;

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  unit_cost: ItemsAPI.Rate | null;

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  unit_price: ItemsAPI.Rate | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * The fulfillment records produced from a sales order.
 *
 * The group itself is returned only when at least one of its members has been
 * expanded.
 */
export interface SalesOrderRelated {
  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  invoices: ListRecord | null;

  /**
   * Resource type identifier.
   */
  object: 'sales_order_related';

  /**
   * Record is a lightweight reference to a business record — a sales order, purchase
   * order, pick, shipment, production run, invoice, etc.
   *
   * Like the `actor` and `entity` references, it carries just enough to identify and
   * label the referenced record without embedding its full resource. The `status`
   * and `metadata` fields hold type-specific detail that varies by the kind of
   * record referenced.
   */
  pick: Record | null;

  /**
   * Record is a lightweight reference to a business record — a sales order, purchase
   * order, pick, shipment, production run, invoice, etc.
   *
   * Like the `actor` and `entity` references, it carries just enough to identify and
   * label the referenced record without embedding its full resource. The `status`
   * and `metadata` fields hold type-specific detail that varies by the kind of
   * record referenced.
   */
  production_run: Record | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  shipments: ListRecord | null;
}

/**
 * The monetary amount that has reached one fulfillment stage, together with how
 * far that stage has progressed.
 */
export interface SalesOrderStageTotal {
  /**
   * Amount that has reached this stage, as a decimal string (unit price times the
   * quantity at this stage).
   */
  amount: string;

  /**
   * Progress through this stage, as a fraction between 0 and 1.
   *
   * Calculated as the quantity that has reached this stage divided by the quantity
   * ordered, so `1` means the whole order has cleared the stage and `0` means
   * nothing has reached it yet.
   */
  completion: number;

  /**
   * Resource type identifier.
   */
  object: 'sales_order_stage_total';
}

/**
 * A lookup value describing where a sales order is in its lifecycle, from estimate
 * through fulfillment.
 *
 * These are the values that appear as a sales order's `status`. The set is
 * platform-provided and the same for every account, and an order moves between the
 * statuses through its issue, unissue, close, and reopen actions rather than by
 * being assigned a status directly.
 */
export interface SalesOrderStatus {
  /**
   * Sales order status ID.
   */
  id: string;

  /**
   * Machine-readable status code.
   *
   * - `estimate`: a draft quote that has not yet been committed.
   * - `issued`: the order is committed for fulfillment, with a pick raised against
   *   it.
   * - `fulfilled`: the order has been completed and closed.
   */
  code: 'estimate' | 'issued' | 'fulfilled';

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Human-readable name of the status.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'sales_order_status';

  /**
   * Owner describes the provenance of a resource.
   */
  owner: APIKeysAPI.Owner | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Derived monetary totals for a sales order or one of its lines.
 *
 * Fulfillment runs ordered -> picked -> packed -> invoiced, and each downstream
 * stage reports both the money that has reached it and its progress against the
 * ordered baseline.
 */
export interface SalesOrderTotals {
  /**
   * The monetary amount that has reached one fulfillment stage, together with how
   * far that stage has progressed.
   */
  invoiced: SalesOrderStageTotal;

  /**
   * Resource type identifier.
   */
  object: 'sales_order_totals';

  /**
   * Total ordered amount as a decimal string (unit price x quantity ordered).
   *
   * This is the baseline the stage completions are measured against.
   */
  ordered: string;

  /**
   * The monetary amount that has reached one fulfillment stage, together with how
   * far that stage has progressed.
   */
  packed: SalesOrderStageTotal;

  /**
   * The monetary amount that has reached one fulfillment stage, together with how
   * far that stage has progressed.
   */
  picked: SalesOrderStageTotal;
}

/**
 * Request to update a sales order.
 */
export interface UpdateSalesOrderRequest {
  /**
   * Replaces the acknowledgement email contacts on the order.
   *
   * An empty list clears all contacts; omitting the field leaves existing contacts
   * untouched.
   */
  acknowledgement_email_contacts?: Array<SalesOrderEmailContactInput>;

  /**
   * Acknowledgment status of the order.
   *
   * Set to `sent` to mark the acknowledgement as sent without emailing the customer,
   * or `not_sent` to reset it.
   */
  acknowledgment_status?: 'not_sent' | 'sent';

  /**
   * Billing address ID.
   *
   * Re-points the order to an existing address. To change an address's contents, use
   * the update-address endpoint.
   */
  billing_address_id?: string;

  /**
   * Carrier billing account number charged when `carrier_billing_type` is
   * `third_party`.
   */
  carrier_billing_account_number?: string | null;

  /**
   * Who is billed for freight.
   *
   * - `sender`: the sender pays for shipping.
   * - `third_party`: a third party pays for shipping, using the carrier billing
   *   account number.
   */
  carrier_billing_type?: 'sender' | 'third_party' | null;

  /**
   * ID of the carrier that will ship the order.
   */
  carrier_id?: string;

  /**
   * Moves the order to a different customer account.
   *
   * Existing lines keep the prices they were created with; they are not re-priced
   * against the new customer.
   */
  customer_id?: string;

  /**
   * The customer's own purchase order number, for cross-referencing.
   */
  customer_purchase_order_number?: string | null;

  /**
   * Replaces the invoice email contacts on the order.
   *
   * An empty list clears all contacts; omitting the field leaves existing contacts
   * untouched.
   */
  invoice_email_contacts?: Array<SalesOrderEmailContactInput>;

  /**
   * Days between this order being issued and it being due to ship, replacing the
   * customer's standing lead time for this order alone. Mutually exclusive with
   * promised_at and ship_by_override_date; clear one to switch to another.
   */
  lead_time_override_days?: number | null;

  /**
   * Free-form note about the order.
   */
  note?: string | null;

  /**
   * ID of the order-level discount recorded on the order.
   *
   * Changing this does not add, reprice, or remove the order's discount line; adjust
   * that line directly.
   */
  order_discount_id?: string | null;

  /**
   * ID of the payment terms for the order.
   */
  payment_term_id?: string;

  /**
   * New fulfillment priority for the order.
   */
  priority_code?: 'low' | 'normal' | 'high';

  /**
   * Date delivery is promised to the customer.
   */
  promised_at?: string | null;

  /**
   * ID of the account user to credit as the order's sales rep.
   */
  sales_rep_id?: string | null;

  /**
   * ID of the carrier service level the order ships on.
   */
  service_level_id?: string | null;

  /**
   * The exact date the order is due to ship, bypassing transit and the customer's
   * receiving days. Mutually exclusive with promised_at and lead_time_override_days.
   */
  ship_by_override_date?: string | null;

  /**
   * Shipping address ID.
   *
   * Re-points the order to an existing address. To change an address's contents, use
   * the update-address endpoint.
   */
  shipping_address_id?: string;

  /**
   * ID of the shipping terms for the order.
   */
  shipping_term_id?: string;
}

export interface SalesOrderDeleteResponse {}

export interface SalesOrderRetrieveStatusesParams {
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
  include?: Array<'owner'>;

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
}

export interface SalesOrderListParams {
  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Restricts results to orders placed by customers belonging to any of these
   * account groups.
   */
  customer_group_ids?: Array<string>;

  /**
   * Restricts results to orders placed by any of these customers.
   */
  customer_ids?: Array<string>;

  /**
   * Latest order creation date to include, in `YYYY-MM-DD` format.
   *
   * Compared against the creation timestamp at the start of that day, so orders
   * created later on the end date itself are excluded; pass the following day to
   * include them.
   */
  ends_at?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'customer'
    | 'sales_rep'
    | 'created_by'
    | 'bill_to_address'
    | 'ship_to_address'
    | 'freight'
    | 'payment_term'
    | 'shipping_term'
    | 'order_discount'
    | 'totals'
    | 'contacts'
    | 'related.pick'
    | 'related.production_run'
    | 'related.shipments'
    | 'related.invoices'
    | 'lines'
    | 'lines.product'
    | 'lines.product.item'
    | 'lines.product.item.category'
    | 'lines.product.item.category.properties'
    | 'lines.product.item.category.unit_group'
    | 'lines.product.item.category.unit_group.base_unit'
    | 'lines.product.item.category.unit_group.associated_units'
    | 'lines.product.item.category.unit_group.associated_units.unit'
    | 'lines.product.product_line'
    | 'lines.quantity_ordered'
    | 'lines.quantity_ordered.unit'
    | 'lines.unit_price'
    | 'lines.unit_price.numerator_unit'
    | 'lines.unit_price.denominator_unit'
    | 'lines.unit_cost'
    | 'lines.unit_cost.numerator_unit'
    | 'lines.unit_cost.denominator_unit'
    | 'lines.totals'
  >;

  /**
   * Restricts results to orders that have at least one line for any of these
   * inventory items.
   */
  item_ids?: Array<string>;

  /**
   * Maximum number of results to return in a single page.
   */
  limit?: number;

  /**
   * Restricts results to orders that are, or are not, past their ship-by date.
   *
   * An order is past due when it is still `issued` and its ship-by date has passed.
   * A fulfilled order that shipped late is not past due — it is delivered, and how
   * late it was is a delivery-performance question rather than a backlog one.
   */
  past_due?: boolean;

  /**
   * Restricts results to orders that have at least one line whose product belongs to
   * any of these product lines.
   */
  product_line_ids?: Array<string>;

  /**
   * Free-text search term used to filter results.
   *
   * Which fields are matched against the term varies by endpoint.
   */
  q?: string;

  /**
   * Restricts results to orders credited to any of these sales reps.
   *
   * These are account user IDs, matching the `sales_rep` on the order.
   */
  sales_rep_ids?: Array<string>;

  /**
   * Earliest ship-by date to include, in `YYYY-MM-DD` format. Inclusive of the date
   * itself.
   */
  ship_by_after?: string;

  /**
   * Latest ship-by date to include, in `YYYY-MM-DD` format. Inclusive of the date
   * itself.
   */
  ship_by_before?: string;

  /**
   * Earliest order creation date to include, in `YYYY-MM-DD` format.
   */
  starts_at?: string;

  /**
   * Restricts results to orders in any of these lifecycle statuses.
   */
  status_codes?: Array<'estimate' | 'issued' | 'fulfilled'>;
}

export interface SalesOrderRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'customer'
    | 'sales_rep'
    | 'created_by'
    | 'bill_to_address'
    | 'ship_to_address'
    | 'freight'
    | 'payment_term'
    | 'shipping_term'
    | 'order_discount'
    | 'totals'
    | 'contacts'
    | 'related.pick'
    | 'related.production_run'
    | 'related.shipments'
    | 'related.invoices'
    | 'lines'
    | 'lines.product'
    | 'lines.product.item'
    | 'lines.product.item.category'
    | 'lines.product.item.category.properties'
    | 'lines.product.item.category.unit_group'
    | 'lines.product.item.category.unit_group.base_unit'
    | 'lines.product.item.category.unit_group.associated_units'
    | 'lines.product.item.category.unit_group.associated_units.unit'
    | 'lines.product.product_line'
    | 'lines.quantity_ordered'
    | 'lines.quantity_ordered.unit'
    | 'lines.unit_price'
    | 'lines.unit_price.numerator_unit'
    | 'lines.unit_price.denominator_unit'
    | 'lines.unit_cost'
    | 'lines.unit_cost.numerator_unit'
    | 'lines.unit_cost.denominator_unit'
    | 'lines.totals'
  >;
}

export interface SalesOrderCreateParams {
  /**
   * Body param: Bill-to address ID.
   *
   * Must reference an existing address on the order's owner or buyer account.
   */
  bill_to_address_id: string;

  /**
   * Body param: ID of the customer account the order is for.
   */
  buyer_account_id: string;

  /**
   * Body param: The line items to put on the order.
   *
   * The freight line, and the discount line when `order_discount_id` is supplied,
   * are added on top of these automatically.
   */
  lines: Array<CreateSalesOrderLineInput>;

  /**
   * Body param: Fulfillment priority used to rank the order on the shop floor.
   */
  priority_code: 'low' | 'normal' | 'high';

  /**
   * Body param: Ship-to address ID.
   *
   * Must reference an existing address on the order's owner or buyer account.
   */
  ship_to_address_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'customer'
    | 'sales_rep'
    | 'bill_to_address'
    | 'ship_to_address'
    | 'freight'
    | 'payment_term'
    | 'shipping_term'
    | 'order_discount'
    | 'totals'
    | 'contacts'
    | 'related.pick'
    | 'related.production_run'
    | 'related.shipments'
    | 'related.invoices'
    | 'lines'
    | 'lines.product'
    | 'lines.quantity_ordered'
    | 'lines.quantity_ordered.unit'
    | 'lines.unit_price'
    | 'lines.unit_price.numerator_unit'
    | 'lines.unit_price.denominator_unit'
    | 'lines.unit_cost'
    | 'lines.unit_cost.numerator_unit'
    | 'lines.unit_cost.denominator_unit'
    | 'lines.totals'
  >;

  /**
   * Body param: Users who should receive order acknowledgement emails for this
   * order.
   *
   * Each must be a user on the customer's account.
   */
  acknowledgement_email_contacts?: Array<SalesOrderEmailContactInput>;

  /**
   * Body param: Carrier billing account number charged when `carrier_billing_type`
   * is `third_party`.
   */
  carrier_billing_account_number?: string;

  /**
   * Body param: Who is billed for freight.
   *
   * - `sender`: the sender pays for shipping.
   * - `third_party`: a third party pays for shipping, using the carrier billing
   *   account number.
   */
  carrier_billing_type?: 'sender' | 'third_party';

  /**
   * Body param: ID of the carrier that will ship the order.
   *
   * Falls back to the customer's default carrier; the order is rejected when neither
   * is available.
   */
  carrier_id?: string;

  /**
   * Body param: The customer's own purchase order number, for cross-referencing.
   *
   * Must be unique among your orders for this customer.
   */
  customer_purchase_order_number?: string;

  /**
   * Body param: Users who should receive invoice emails for this order.
   *
   * Each must be a user on the customer's account.
   */
  invoice_email_contacts?: Array<SalesOrderEmailContactInput>;

  /**
   * Body param: Days between this order being issued and it being due to ship,
   * replacing the customer's standing lead time for this order alone.
   *
   * Already a ship lead time, so no carrier transit is subtracted from it. Mutually
   * exclusive with promised_at and ship_by_override_date.
   */
  lead_time_override_days?: number;

  /**
   * Body param: Free-form note about the order.
   */
  note?: string;

  /**
   * Body param: The order-level discount to apply, given as either its ID or its
   * unique code.
   *
   * The discount is realized as an extra negative-priced line on the order rather
   * than as a separate total.
   */
  order_discount_id?: string;

  /**
   * Body param: ID of the payment terms for the order.
   *
   * Falls back to the customer's default payment term; the order is rejected when
   * neither is available.
   */
  payment_term_id?: string;

  /**
   * Body param: Date delivery is promised to the customer.
   *
   * The order's ship-by date is worked back from this: the goods have to reach the
   * customer on a day they receive, so transit and both operating calendars are
   * subtracted from it. Mutually exclusive with lead_time_override_days and
   * ship_by_override_date.
   */
  promised_at?: string;

  /**
   * Body param: ID of the account user to credit as the order's sales rep.
   *
   * When omitted, a rep is assigned automatically: the customer's default sales rep
   * first, then the sales territory matching the ship-to postal code, then the
   * ship-to state. No rep is assigned when the customer is commission-exempt or
   * every ordered product belongs to a commission-exempt product line.
   */
  sales_rep_id?: string;

  /**
   * Body param: ID of the carrier service level the order ships on.
   *
   * Falls back to the customer's default service level, but only when `carrier_id`
   * is also omitted — supplying a carrier without a service level leaves the service
   * level unset.
   */
  service_level_id?: string;

  /**
   * Body param: The exact date the order is due to ship, bypassing transit and the
   * customer's receiving days.
   *
   * Still moved back to the nearest earlier day the plant ships on, since a date
   * nobody can ship on is not a deadline. Mutually exclusive with promised_at and
   * lead_time_override_days.
   */
  ship_by_override_date?: string;

  /**
   * Body param: ID of the shipping terms for the order.
   *
   * Falls back to the customer's default shipping term; the order is rejected when
   * neither is available.
   */
  shipping_term_id?: string;
}

export interface SalesOrderUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'customer'
    | 'sales_rep'
    | 'bill_to_address'
    | 'ship_to_address'
    | 'freight'
    | 'payment_term'
    | 'shipping_term'
    | 'order_discount'
    | 'totals'
    | 'contacts'
    | 'related.pick'
    | 'related.production_run'
    | 'related.shipments'
    | 'related.invoices'
    | 'lines'
    | 'lines.product'
    | 'lines.quantity_ordered'
    | 'lines.quantity_ordered.unit'
    | 'lines.unit_price'
    | 'lines.unit_price.numerator_unit'
    | 'lines.unit_price.denominator_unit'
    | 'lines.unit_cost'
    | 'lines.unit_cost.numerator_unit'
    | 'lines.unit_cost.denominator_unit'
    | 'lines.totals'
  >;

  /**
   * Body param: Replaces the acknowledgement email contacts on the order.
   *
   * An empty list clears all contacts; omitting the field leaves existing contacts
   * untouched.
   */
  acknowledgement_email_contacts?: Array<SalesOrderEmailContactInput>;

  /**
   * Body param: Acknowledgment status of the order.
   *
   * Set to `sent` to mark the acknowledgement as sent without emailing the customer,
   * or `not_sent` to reset it.
   */
  acknowledgment_status?: 'not_sent' | 'sent';

  /**
   * Body param: Billing address ID.
   *
   * Re-points the order to an existing address. To change an address's contents, use
   * the update-address endpoint.
   */
  billing_address_id?: string;

  /**
   * Body param: Carrier billing account number charged when `carrier_billing_type`
   * is `third_party`.
   */
  carrier_billing_account_number?: string | null;

  /**
   * Body param: Who is billed for freight.
   *
   * - `sender`: the sender pays for shipping.
   * - `third_party`: a third party pays for shipping, using the carrier billing
   *   account number.
   */
  carrier_billing_type?: 'sender' | 'third_party' | null;

  /**
   * Body param: ID of the carrier that will ship the order.
   */
  carrier_id?: string;

  /**
   * Body param: Moves the order to a different customer account.
   *
   * Existing lines keep the prices they were created with; they are not re-priced
   * against the new customer.
   */
  customer_id?: string;

  /**
   * Body param: The customer's own purchase order number, for cross-referencing.
   */
  customer_purchase_order_number?: string | null;

  /**
   * Body param: Replaces the invoice email contacts on the order.
   *
   * An empty list clears all contacts; omitting the field leaves existing contacts
   * untouched.
   */
  invoice_email_contacts?: Array<SalesOrderEmailContactInput>;

  /**
   * Body param: Days between this order being issued and it being due to ship,
   * replacing the customer's standing lead time for this order alone. Mutually
   * exclusive with promised_at and ship_by_override_date; clear one to switch to
   * another.
   */
  lead_time_override_days?: number | null;

  /**
   * Body param: Free-form note about the order.
   */
  note?: string | null;

  /**
   * Body param: ID of the order-level discount recorded on the order.
   *
   * Changing this does not add, reprice, or remove the order's discount line; adjust
   * that line directly.
   */
  order_discount_id?: string | null;

  /**
   * Body param: ID of the payment terms for the order.
   */
  payment_term_id?: string;

  /**
   * Body param: New fulfillment priority for the order.
   */
  priority_code?: 'low' | 'normal' | 'high';

  /**
   * Body param: Date delivery is promised to the customer.
   */
  promised_at?: string | null;

  /**
   * Body param: ID of the account user to credit as the order's sales rep.
   */
  sales_rep_id?: string | null;

  /**
   * Body param: ID of the carrier service level the order ships on.
   */
  service_level_id?: string | null;

  /**
   * Body param: The exact date the order is due to ship, bypassing transit and the
   * customer's receiving days. Mutually exclusive with promised_at and
   * lead_time_override_days.
   */
  ship_by_override_date?: string | null;

  /**
   * Body param: Shipping address ID.
   *
   * Re-points the order to an existing address. To change an address's contents, use
   * the update-address endpoint.
   */
  shipping_address_id?: string;

  /**
   * Body param: ID of the shipping terms for the order.
   */
  shipping_term_id?: string;
}

export interface SalesOrderCheckoutParams {
  /**
   * Email address to send the checkout link to.
   */
  email: string;
}

export interface SalesOrderPriceQuoteParams {
  /**
   * ID of the customer account the prices are for.
   */
  buyer_account_id: string;

  /**
   * Lines to price.
   */
  lines: Array<QuoteSalesOrderLineInput>;
}

SalesOrders.Actions = Actions;
SalesOrders.Lines = Lines;

export declare namespace SalesOrders {
  export {
    type CheckoutSalesOrderRequest as CheckoutSalesOrderRequest,
    type CheckoutSalesOrderResponse as CheckoutSalesOrderResponse,
    type Commitment as Commitment,
    type ComputedRate as ComputedRate,
    type CreateSalesOrderLineInput as CreateSalesOrderLineInput,
    type CreateSalesOrderRequest as CreateSalesOrderRequest,
    type CreatedBy as CreatedBy,
    type Freight as Freight,
    type ListQuotedSalesOrderLine as ListQuotedSalesOrderLine,
    type ListRecord as ListRecord,
    type ListSalesOrder as ListSalesOrder,
    type ListSalesOrderLine as ListSalesOrderLine,
    type ListSalesOrderStatus as ListSalesOrderStatus,
    type OrderContact as OrderContact,
    type QuoteSalesOrderLineInput as QuoteSalesOrderLineInput,
    type QuoteSalesOrderPricesRequest as QuoteSalesOrderPricesRequest,
    type QuoteSalesOrderPricesResponse as QuoteSalesOrderPricesResponse,
    type QuotedSalesOrderLine as QuotedSalesOrderLine,
    type Record as Record,
    type SalesOrder as SalesOrder,
    type SalesOrderEmailContactInput as SalesOrderEmailContactInput,
    type SalesOrderLine as SalesOrderLine,
    type SalesOrderRelated as SalesOrderRelated,
    type SalesOrderStageTotal as SalesOrderStageTotal,
    type SalesOrderStatus as SalesOrderStatus,
    type SalesOrderTotals as SalesOrderTotals,
    type UpdateSalesOrderRequest as UpdateSalesOrderRequest,
    type SalesOrderDeleteResponse as SalesOrderDeleteResponse,
    type SalesOrderRetrieveStatusesParams as SalesOrderRetrieveStatusesParams,
    type SalesOrderListParams as SalesOrderListParams,
    type SalesOrderRetrieveParams as SalesOrderRetrieveParams,
    type SalesOrderCreateParams as SalesOrderCreateParams,
    type SalesOrderUpdateParams as SalesOrderUpdateParams,
    type SalesOrderCheckoutParams as SalesOrderCheckoutParams,
    type SalesOrderPriceQuoteParams as SalesOrderPriceQuoteParams,
  };

  export {
    Actions as Actions,
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

  export {
    Lines as Lines,
    type CreateSalesOrderLineRequest as CreateSalesOrderLineRequest,
    type UpdateSalesOrderLineRequest as UpdateSalesOrderLineRequest,
    type LineDeleteResponse as LineDeleteResponse,
    type LineCreateParams as LineCreateParams,
    type LineUpdateParams as LineUpdateParams,
    type LineDeleteParams as LineDeleteParams,
  };
}
