// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as BlocksAPI from '../../messaging/blocks';
import * as AccountGroupsAPI from '../account-groups';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ItemCategoriesAPI from '../../catalog/item-categories/item-categories';
import * as ItemsAPI from '../../catalog/items/items';
import * as MaterialsAPI from '../../catalog/materials/materials';
import * as ProductLinesAPI from '../../catalog/product-lines/product-lines';
import * as PropertiesAPI from '../../catalog/properties/properties';
import * as ActionsAPI from './actions';
import { ActionExportPriceListParams, Actions, ExportPriceListRequest } from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage account prices.
 */
export class AccountPrices extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of account prices, newest first.
   *
   * The search term matches the recipient customer's name or their customer number.
   * Customer and supplier portal users always see only the prices that apply to
   * their own account, whatever `recipient_account_id` is set to.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `discounts:read`.
   *
   * @example
   * ```ts
   * const listAccountPrice =
   *   await client.sales.accountPrices.list();
   * ```
   */
  list(
    query: AccountPriceListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListAccountPrice> {
    return this._client.get('/v1/sales/account-prices', { query, ...options });
  }

  /**
   * Returns an account price by ID.
   *
   * A customer or supplier portal user can only retrieve a price whose recipient is
   * their own account or its parent; any other price is reported as not found.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `discounts:read`.
   *
   * @example
   * ```ts
   * const accountPrice =
   *   await client.sales.accountPrices.retrieve(
   *     'acpr_7l4j483kf32p',
   *   );
   * ```
   */
  retrieve(
    id: string,
    query: AccountPriceRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AccountPrice> {
    return this._client.get(path`/v1/sales/account-prices/${id}`, { query, ...options });
  }

  /**
   * Creates a customer-specific price for a product line.
   *
   * When a sales order line for the recipient matches the price's product line and
   * attributes, this price replaces the unit price the line would otherwise be
   * given, including the effect of any volume discount. If more than one account
   * price matches a line, the most recently created one wins.
   *
   * This endpoint requires the permission: `discounts:create`.
   *
   * @example
   * ```ts
   * const accountPrice =
   *   await client.sales.accountPrices.create({
   *     product_line_id: 'pdln_k9bnlgvxhxjh',
   *     rate: {
   *       value: '25.50',
   *       numerator_unit_id: 'un_82bd37dae5po',
   *       denominator_unit_id: 'un_82bd37dae5po',
   *     },
   *     recipient_account_id: 'ac_ykxoradjoeb3',
   *     attribute_ids: ['at_rf1w295jt5ia'],
   *     category_ids: ['ic_d06g9c6yc9ck'],
   *   });
   * ```
   */
  create(params: AccountPriceCreateParams, options?: RequestOptions): APIPromise<AccountPrice> {
    const { include, ...body } = params;
    return this._client.post('/v1/sales/account-prices', { query: { include }, body, ...options });
  }

  /**
   * Partially updates an account price.
   *
   * Only the provided fields are changed. If `category_ids` or `attribute_ids` are
   * provided, they replace the existing set entirely.
   *
   * Order lines that have already been priced keep the unit price they were given;
   * the new price applies to lines priced after the change.
   *
   * This endpoint requires the permission: `discounts:update`.
   *
   * @example
   * ```ts
   * const accountPrice =
   *   await client.sales.accountPrices.update(
   *     'acpr_7l4j483kf32p',
   *     {
   *       rate: {
   *         value: '30.000000000000000000000000000000',
   *         numerator_unit_id: 'un_82bd37dae5po',
   *         denominator_unit_id: 'un_82bd37dae5po',
   *       },
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    params: AccountPriceUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AccountPrice> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/sales/account-prices/${id}`, { query: { include }, body, ...options });
  }

  /**
   * Deletes an account price.
   *
   * The price's category and attribute associations and its rate record are removed
   * with it. Deletion is permanent; further requests against the deleted ID return
   * an error.
   *
   * Order lines that have already been priced keep the unit price they were given;
   * only lines priced after the deletion revert to standard pricing.
   *
   * This endpoint requires the permission: `discounts:delete`.
   *
   * @example
   * ```ts
   * const accountPrice =
   *   await client.sales.accountPrices.delete(
   *     'acpr_7l4j483kf32p',
   *   );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<AccountPriceDeleteResponse> {
    return this._client.delete(path`/v1/sales/account-prices/${id}`, options);
  }
}

/**
 * A customer-specific price for a product line.
 *
 * When a sales order line matches an account price, that price replaces the unit
 * price the line would otherwise be given — including the effect of any volume
 * discount — rather than discounting it. If more than one account price matches a
 * line, the most recently created one wins.
 */
export interface AccountPrice {
  /**
   * Account price ID.
   */
  id: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  attributes: PropertiesAPI.ListAttribute | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  categories: ItemCategoriesAPI.ListItemCategory | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Resource type identifier.
   */
  object: 'account_price';

  /**
   * A named grouping of related products in your catalog.
   *
   * A product line carries the default commission and freight policies for the
   * products assigned to it, along with the unit group that determines how those
   * products are measured. Product lines are also the unit that catalog access is
   * granted over, for both customers and account groups.
   */
  product_line: ProductLinesAPI.ProductLine | null;

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  rate: ItemsAPI.Rate | null;

  /**
   * A business you sell to, with its contact details, default fulfillment settings,
   * and order policies.
   */
  recipient_account: Customer | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A shipping carrier configured for fulfilling orders.
 *
 * Carriers with a Shippo-supported `code` (`fedex`, `ups`, `usps`) are connected
 * through Shippo for live rating and label purchase; other carriers represent
 * self-managed shipping methods such as will call or local delivery.
 */
export interface Carrier {
  /**
   * Carrier ID.
   */
  id: string;

  /**
   * Your account number with this carrier.
   *
   * UPS and USPS carrier accounts are connected to Shippo using this number; FedEx
   * carriers authorize through OAuth instead, so their account number is not used to
   * connect them.
   */
  account_number: string | null;

  /**
   * Well-known carrier identifier, set only for recognized carriers and absent for
   * custom ones.
   *
   * - `fedex`, `ups`, `usps`: integrated carriers managed through Shippo (live
   *   rating and labels).
   * - `will_call`: customer picks the order up; no carrier shipment.
   * - `delivery`: delivered by your own vehicles/drivers.
   * - `ltl`, `ltl1`: less-than-truckload freight carriers.
   * - `freight_collect`: freight billed to and arranged by the receiver.
   */
  code: 'fedex' | 'ups' | 'usps' | 'will_call' | 'delivery' | 'ltl' | 'ltl1' | 'freight_collect' | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Whether customers can see and select this carrier at checkout in the customer
   * portal.
   */
  customer_portal_visibility: 'visible' | 'hidden';

  /**
   * Soft-delete timestamp.
   */
  deleted_at: string | null;

  /**
   * Human-readable name for the carrier, unique among the carriers visible to your
   * account.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'carrier';

  /**
   * Owner describes the provenance of a resource.
   */
  owner: APIKeysAPI.Owner | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  service_levels: ListServiceLevel | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Request to create an account price.
 */
export interface CreateAccountPriceRequest {
  /**
   * ID of the product line whose products this price applies to.
   */
  product_line_id: string;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  rate: MaterialsAPI.RateInput;

  /**
   * ID of the customer this price is offered to.
   *
   * A price recorded against a parent customer account also applies to orders placed
   * by its child accounts.
   */
  recipient_account_id: string;

  /**
   * Attribute IDs to constrain this price to.
   *
   * When set, the price applies only to items that have every listed attribute.
   */
  attribute_ids?: Array<string>;

  /**
   * Item category IDs to record on this price.
   *
   * Order pricing matches an account price on its product line and attributes only,
   * so categories recorded here do not narrow which products the price applies to.
   */
  category_ids?: Array<string>;
}

/**
 * A business you sell to, with its contact details, default fulfillment settings,
 * and order policies.
 */
export interface Customer {
  /**
   * Customer ID.
   */
  id: string;

  /**
   * A saved address that can be used for billing and shipping on sales orders,
   * invoices, and shipments.
   */
  bill_to_address: APIKeysAPI.Address | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  child_accounts: ListCustomer | null;

  /**
   * How sales commission applies to this customer's orders.
   *
   * - `commission_exempt`: this customer's orders are exempt from sales commission.
   * - `commission_applied`: sales commission is calculated on this customer's
   *   orders.
   *
   * The customer counts as exempt if this field, its `type` group, or any of its
   * `price_groups` is `commission_exempt`. Exempt customers never have a sales rep
   * assigned automatically when an order is created without one.
   *
   * Null to customer and supplier portal users, like the rest of your commission
   * settings.
   */
  commission_policy: 'commission_applied' | 'commission_exempt' | null;

  /**
   * Customer contact information.
   */
  contact_info: CustomerContactInfo | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  credit_limit: MaterialsAPI.Quantity | null;

  /**
   * Values used to fill in a new sales order for this customer when the order does
   * not supply its own.
   */
  defaults: CustomerDefaults | null;

  /**
   * Customer freight and carrier settings.
   */
  freight_preferences: CustomerFreightPreferences | null;

  /**
   * The customer's business name, as shown throughout the app and on documents.
   */
  name: string;

  /**
   * Free-form note about the customer.
   *
   * Null to customer and supplier portal users: it is your own team's note.
   */
  note: string | null;

  /**
   * Customer notification settings.
   */
  notification_preferences: CustomerNotificationPreferences | null;

  /**
   * Human-readable customer number used to identify the account, distinct from the
   * `id`.
   *
   * Unique within your account.
   */
  number: string;

  /**
   * Resource type identifier.
   */
  object: 'customer';

  /**
   * A business you sell to, with its contact details, default fulfillment settings,
   * and order policies.
   */
  parent_account: Customer | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  price_groups: AccountGroupsAPI.ListAccountGroup | null;

  /**
   * The customer's position in the account hierarchy.
   *
   * - `standalone`: no parent or child accounts.
   * - `parent`: has one or more child accounts (see `child_accounts`).
   * - `child`: belongs to a parent account (see `parent_account`).
   */
  relationship_type: 'standalone' | 'parent' | 'child';

  /**
   * A saved address that can be used for billing and shipping on sales orders,
   * invoices, and shipments.
   */
  ship_to_address: APIKeysAPI.Address | null;

  /**
   * The customer's account standing.
   *
   * - `normal`: standard account with no restrictions.
   * - `preferred`: account flagged for prioritized handling.
   * - `hold_shipment`: the customer's shipments should be held, typically over a
   *   credit problem, while orders can still be placed.
   * - `hold_all`: all activity for the customer should be held.
   *
   * The hold statuses are advisory: OpenMRP flags the customer's orders as being on
   * credit hold, but requests to create orders or shipments for the customer are not
   * rejected.
   */
  status: 'normal' | 'preferred' | 'hold_shipment' | 'hold_all';

  /**
   * A named grouping of customer accounts, used for pricing rules or to categorize
   * accounts.
   *
   * A customer carries at most one group of type `type_group` as its customer type,
   * plus any number of groups of type `pricing_group`. Membership of either kind can
   * scope a volume discount to the customer and open up product lines for it to
   * order from.
   */
  type: AccountGroupsAPI.AccountGroup | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Customer contact information.
 */
export interface CustomerContactInfo {
  /**
   * Email address.
   */
  email: string | null;

  /**
   * Resource type identifier.
   */
  object: 'customer_contact_info';

  /**
   * Phone number.
   */
  phone: string | null;

  /**
   * Website URL.
   */
  url: string | null;
}

/**
 * Values used to fill in a new sales order for this customer when the order does
 * not supply its own.
 */
export interface CustomerDefaults {
  /**
   * How this customer's orders are produced.
   *
   * - `make_to_stock`: their order history feeds the production-schedule forecast,
   *   so stock is built ahead of their demand.
   * - `make_to_order`: their history is left out of the forecast; their orders are
   *   produced only once placed, and fit into the schedule on their own ship-by
   *   dates.
   *
   * With none set here the customer inherits its account group's policy, then falls
   * back to make-to-stock. Always null to customer and supplier portal users, like
   * the rest of your production planning.
   */
  fulfillment_policy: 'make_to_stock' | 'make_to_order' | null;

  /**
   * Calendar days between an order being issued and it being due to ship.
   *
   * Sets each order's `ship_by_date` when it is issued. With none set here the
   * customer inherits its parent account's lead time, then its account group's, then
   * the account default.
   */
  lead_time_days: number | null;

  /**
   * Resource type identifier.
   */
  object: 'customer_defaults';

  /**
   * A payment term describing when payment is due (e.g. `Net 30`), assignable to
   * customers, sales orders, purchase orders, and invoices.
   */
  payment_term: PaymentTerm | null;

  /**
   * Priority level used to order work on sales orders, purchase orders, and picks.
   *
   * The levels are platform-provided and the same for every account, so they cannot
   * be created, renamed, or removed. A customer can carry a default priority that
   * pre-fills new orders for them.
   */
  priority: Priority | null;

  /**
   * The operating calendar naming the days this customer's dock accepts freight.
   *
   * A promised delivery date is worked back from a day the customer can actually
   * receive on. With none set here the customer inherits its account group's
   * calendar, then the account default, then Monday to Friday.
   */
  receive_calendar_id: string | null;

  /**
   * A user's membership in an account, carrying the account-specific status, role,
   * and department.
   *
   * Profile fields (name, email, username, image URL) live on the `user`
   * sub-resource, which is shared across every account the user belongs to.
   */
  sales_rep: BlocksAPI.AccountUser | null;

  /**
   * A named freight pricing rule that decides what a buyer pays for shipping.
   *
   * A customer's default shipping term is evaluated whenever freight is quoted for
   * one of their orders. Freight exemptions on the customer, its type group, or any
   * of its price groups are checked first and zero the freight charge before the
   * shipping term is considered.
   */
  shipping_term: ShippingTerm | null;
}

/**
 * Customer freight and carrier settings.
 */
export interface CustomerFreightPreferences {
  /**
   * Carrier billing account number charged when `billing_type` is `third_party`.
   */
  billing_account: string | null;

  /**
   * Who pays the carrier for shipments.
   *
   * - `sender`: the shipper (you) pays the carrier.
   * - `third_party`: a third party is billed, using `billing_account`.
   */
  billing_type: 'sender' | 'third_party' | null;

  /**
   * A shipping carrier configured for fulfilling orders.
   *
   * Carriers with a Shippo-supported `code` (`fedex`, `ups`, `usps`) are connected
   * through Shippo for live rating and label purchase; other carriers represent
   * self-managed shipping methods such as will call or local delivery.
   */
  carrier: Carrier | null;

  /**
   * Resource type identifier.
   */
  object: 'customer_freight_preferences';

  /**
   * A shipping speed or method offered by a carrier, such as ground or overnight.
   *
   * Carriers connected through Shippo have their service levels synced from the
   * carrier itself; any carrier can also have service levels you create by hand.
   */
  service_level: ServiceLevel | null;

  /**
   * Freight policy applied to this customer's orders.
   *
   * - `free_freight`: the customer is not billed for freight.
   * - `billed_freight`: freight is billed to the customer.
   *
   * Freight is waived when this field, the customer's `type` group, any of its
   * `price_groups`, or any product line the ordered products belong to is
   * `free_freight`, so a shipment can come back freight-exempt even while this field
   * is `billed_freight`.
   */
  status: 'free_freight' | 'billed_freight';
}

/**
 * Customer notification settings.
 */
export interface CustomerNotificationPreferences {
  /**
   * Whether anyone is set up to receive invoice emails for this customer.
   *
   * Derived from the customer's notification recipients: true when at least one of
   * them is configured for invoice notifications.
   */
  accepts_invoice_emails: boolean;

  /**
   * Resource type identifier.
   */
  object: 'customer_notification_preferences';
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListAccountPrice {
  /**
   * Resources in this page.
   */
  data: Array<AccountPrice>;

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
export interface ListCustomer {
  /**
   * Resources in this page.
   */
  data: Array<Customer>;

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
export interface ListServiceLevel {
  /**
   * Resources in this page.
   */
  data: Array<ServiceLevel>;

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
 * A payment term describing when payment is due (e.g. `Net 30`), assignable to
 * customers, sales orders, purchase orders, and invoices.
 */
export interface PaymentTerm {
  /**
   * Payment term ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Display name (e.g. `Net 30`), unique among the payment terms visible to your
   * account.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'payment_term';

  /**
   * Owner describes the provenance of a resource.
   */
  owner: APIKeysAPI.Owner | null;

  /**
   * Whether this payment term is still in active use.
   *
   * Payment terms created through the API are always `active`, and no endpoint
   * changes a term's status. List Payment Terms returns inactive terms alongside
   * active ones, so filter them out yourself if you only want the ones still on
   * offer.
   */
  status: 'active' | 'inactive';

  /**
   * Last-updated timestamp.
   */
  updated_at: string;
}

/**
 * Priority level used to order work on sales orders, purchase orders, and picks.
 *
 * The levels are platform-provided and the same for every account, so they cannot
 * be created, renamed, or removed. A customer can carry a default priority that
 * pre-fills new orders for them.
 */
export interface Priority {
  /**
   * Priority ID.
   */
  id: string;

  /**
   * Machine-readable code identifying the priority level.
   *
   * Other resources refer to a priority by this code rather than by its ID, such as
   * a sales order's `priority`, and it can be used in place of the ID when
   * retrieving a priority.
   */
  code: 'low' | 'normal' | 'high';

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Display name of the priority level.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'priority';

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
 * A shipping speed or method offered by a carrier, such as ground or overnight.
 *
 * Carriers connected through Shippo have their service levels synced from the
 * carrier itself; any carrier can also have service levels you create by hand.
 */
export interface ServiceLevel {
  /**
   * Service level ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Whether customers can see and select this service level at checkout in the
   * customer portal.
   */
  customer_portal_visibility: 'visible' | 'hidden';

  /**
   * Business days this service typically takes in transit, used to work an order's
   * ship-by date back from a promised delivery date.
   *
   * A fallback for lanes the carrier has not quoted. Null means transit is unknown
   * for this service rather than instant, so a ship-by date falls back to the
   * promised delivery date itself.
   */
  default_transit_days: number | null;

  /**
   * Whether this is the carrier's default service level, pre-selected when the
   * carrier is chosen.
   *
   * Each carrier has at most one default; setting a new default clears the previous
   * one. A default service level cannot be deleted until another service level takes
   * its place or the flag is cleared.
   */
  is_default: boolean;

  /**
   * Human-readable name for the service level, shown to customers at checkout when
   * the service level is visible.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'service_level';

  /**
   * Owner describes the provenance of a resource.
   */
  owner: APIKeysAPI.Owner | null;

  /**
   * Carrier-specific code identifying this service level (e.g. `fedex_ground`,
   * `ups_next_day_air`).
   *
   * For service levels synced from a connected carrier this is the carrier's own
   * token, which is what rate shopping and label purchase are keyed on; for service
   * levels you create yourself it is the `code` you supplied.
   */
  service_level_token: string;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A named freight pricing rule that decides what a buyer pays for shipping.
 *
 * A customer's default shipping term is evaluated whenever freight is quoted for
 * one of their orders. Freight exemptions on the customer, its type group, or any
 * of its price groups are checked first and zero the freight charge before the
 * shipping term is considered.
 */
export interface ShippingTerm {
  /**
   * Shipping term ID.
   */
  id: string;

  /**
   * When this shipping term was created.
   */
  created_at: string;

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  flat_rate: MaterialsAPI.Quantity | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  free_shipping_service_levels: ListServiceLevel | null;

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  minimum_order_value: MaterialsAPI.Quantity | null;

  /**
   * Human-readable name for the shipping term, used to identify it when assigning
   * shipping terms to customers and orders.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'shipping_term';

  /**
   * Owner describes the provenance of a resource.
   */
  owner: APIKeysAPI.Owner | null;

  /**
   * Freight pricing model applied by this shipping term.
   *
   * - `free_freight`: the buyer is never charged for shipping.
   * - `flat_rate_freight`: the buyer is charged the fixed amount in `flat_rate`,
   *   regardless of what the carrier would have charged.
   * - `carrier_rate_freight`: the buyer is charged the rate the carrier quotes for
   *   the order's carrier and service level.
   */
  type: 'free_freight' | 'flat_rate_freight' | 'carrier_rate_freight';

  /**
   * When this shipping term was last updated.
   */
  updated_at: string;
}

/**
 * Request to partially update an account price.
 */
export interface UpdateAccountPriceRequest {
  /**
   * Attribute IDs to constrain this price to.
   *
   * When provided, replaces the existing set of attributes entirely; an empty list
   * removes all attribute constraints.
   */
  attribute_ids?: Array<string>;

  /**
   * Item category IDs to record on this price.
   *
   * When provided, replaces the existing set of categories entirely; an empty list
   * removes them all. Categories are recorded only — they do not narrow which
   * products the price applies to.
   */
  category_ids?: Array<string>;

  /**
   * ID of the product line whose products this price applies to.
   */
  product_line_id?: string;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  rate?: MaterialsAPI.RateInput;

  /**
   * ID of the customer this price is offered to.
   */
  recipient_account_id?: string;
}

export interface AccountPriceDeleteResponse {}

export interface AccountPriceListParams {
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
  include?: Array<'recipient_account' | 'product_line' | 'categories' | 'attributes'>;

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
   * Filters results to prices whose recipient is this customer account.
   *
   * A child account also matches the prices recorded against its parent, since those
   * price its orders too.
   */
  recipient_account_id?: string;
}

export interface AccountPriceRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'recipient_account' | 'product_line' | 'categories' | 'attributes'>;
}

export interface AccountPriceCreateParams {
  /**
   * Body param: ID of the product line whose products this price applies to.
   */
  product_line_id: string;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  rate: MaterialsAPI.RateInput;

  /**
   * Body param: ID of the customer this price is offered to.
   *
   * A price recorded against a parent customer account also applies to orders placed
   * by its child accounts.
   */
  recipient_account_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'recipient_account' | 'product_line' | 'categories' | 'attributes'>;

  /**
   * Body param: Attribute IDs to constrain this price to.
   *
   * When set, the price applies only to items that have every listed attribute.
   */
  attribute_ids?: Array<string>;

  /**
   * Body param: Item category IDs to record on this price.
   *
   * Order pricing matches an account price on its product line and attributes only,
   * so categories recorded here do not narrow which products the price applies to.
   */
  category_ids?: Array<string>;
}

export interface AccountPriceUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'recipient_account' | 'product_line' | 'categories' | 'attributes'>;

  /**
   * Body param: Attribute IDs to constrain this price to.
   *
   * When provided, replaces the existing set of attributes entirely; an empty list
   * removes all attribute constraints.
   */
  attribute_ids?: Array<string>;

  /**
   * Body param: Item category IDs to record on this price.
   *
   * When provided, replaces the existing set of categories entirely; an empty list
   * removes them all. Categories are recorded only — they do not narrow which
   * products the price applies to.
   */
  category_ids?: Array<string>;

  /**
   * Body param: ID of the product line whose products this price applies to.
   */
  product_line_id?: string;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  rate?: MaterialsAPI.RateInput;

  /**
   * Body param: ID of the customer this price is offered to.
   */
  recipient_account_id?: string;
}

AccountPrices.Actions = Actions;

export declare namespace AccountPrices {
  export {
    type AccountPrice as AccountPrice,
    type Carrier as Carrier,
    type CreateAccountPriceRequest as CreateAccountPriceRequest,
    type Customer as Customer,
    type CustomerContactInfo as CustomerContactInfo,
    type CustomerDefaults as CustomerDefaults,
    type CustomerFreightPreferences as CustomerFreightPreferences,
    type CustomerNotificationPreferences as CustomerNotificationPreferences,
    type ListAccountPrice as ListAccountPrice,
    type ListCustomer as ListCustomer,
    type ListServiceLevel as ListServiceLevel,
    type PaymentTerm as PaymentTerm,
    type Priority as Priority,
    type ServiceLevel as ServiceLevel,
    type ShippingTerm as ShippingTerm,
    type UpdateAccountPriceRequest as UpdateAccountPriceRequest,
    type AccountPriceDeleteResponse as AccountPriceDeleteResponse,
    type AccountPriceListParams as AccountPriceListParams,
    type AccountPriceRetrieveParams as AccountPriceRetrieveParams,
    type AccountPriceCreateParams as AccountPriceCreateParams,
    type AccountPriceUpdateParams as AccountPriceUpdateParams,
  };

  export {
    Actions as Actions,
    type ExportPriceListRequest as ExportPriceListRequest,
    type ActionExportPriceListParams as ActionExportPriceListParams,
  };
}
