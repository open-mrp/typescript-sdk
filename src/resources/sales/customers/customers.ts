// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as AccountGroupsAPI from '../account-groups';
import * as AddressesAPI from '../addresses';
import * as InventoryAPI from '../../catalog/items/inventory';
import * as AccountPricesAPI from '../account-prices/account-prices';
import * as ActionsAPI from './actions';
import { ActionMergeParams, Actions, MergeCustomersRequest } from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Manage customer accounts.
 */
export class Customers extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of customers for the current account.
   *
   * This endpoint requires the permission: `customers:read`.
   *
   * @example
   * ```ts
   * const listCustomer = await client.sales.customers.list();
   * ```
   */
  list(
    query: CustomerListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AccountPricesAPI.ListCustomer> {
    return this._client.get('/v1/sales/customers', { query, ...options });
  }

  /**
   * Returns a customer by ID.
   *
   * A customer or supplier portal retrieves only its own account; any other customer
   * is reported as not found.
   *
   * Acting in a supplier's account requires `suppliers:read` instead of the
   * permission this endpoint requires in your own account.
   *
   * This endpoint requires the permission: `customers:read`.
   *
   * @example
   * ```ts
   * const customer = await client.sales.customers.retrieve(
   *   'ac_opnlh43ymyee',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: CustomerRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AccountPricesAPI.Customer> {
    return this._client.get(path`/v1/sales/customers/${id}`, { query, ...options });
  }

  /**
   * Creates a customer account with its default addresses, fulfillment settings, and
   * order policies.
   *
   * If `number` is omitted, the next sequential customer number is assigned
   * automatically.
   *
   * This endpoint requires the permission: `customers:create`.
   *
   * @example
   * ```ts
   * const customer = await client.sales.customers.create({
   *   bill_to_address: {
   *     name: 'Acme Inc.',
   *     street_line_1: '123 Main St',
   *     locality: 'New York',
   *     state: 'NY',
   *     postal_code: '10001',
   *     country: 'US',
   *   },
   *   customer_type_group_id: 'acgp_6p4z57e9alaf',
   *   default_carrier_id: 'cr_tv5vfjtgu1n3',
   *   default_payment_term_id: 'pytm_skssmsy21lem',
   *   default_shipping_term_id: 'shtm_c5gxy05whw6r',
   *   name: 'Acme Inc.',
   *   ship_to_address: {
   *     name: 'Acme Inc.',
   *     street_line_1: '123 Main St',
   *     locality: 'New York',
   *     state: 'NY',
   *     postal_code: '10001',
   *     country: 'US',
   *   },
   *   carrier_billing_account: '123456789',
   *   carrier_billing_type: 'sender',
   *   commission_policy: 'commission_applied',
   *   credit_limit: { value: '10000.00', unit_id: 'un_82bd37dae5po' },
   *   customer_price_group_ids: ['acgp_6p4z57e9alaf'],
   *   default_priority: 'normal',
   *   default_sales_rep_id: 'acus_e5zu8bde0z3h',
   *   default_service_level_id: 'crop_4ilk9p6gccrx',
   *   edi_status: 'disabled',
   *   email: 'orders@acme.com',
   *   freight_policy: 'billed_freight',
   *   fulfillment_policy: 'make_to_order',
   *   note: 'Key enterprise account',
   *   number: '100042',
   *   phone: '555-123-4567',
   *   status: 'normal',
   *   url: 'https://acme.com',
   * });
   * ```
   */
  create(params: CustomerCreateParams, options?: RequestOptions): APIPromise<AccountPricesAPI.Customer> {
    const { include, ...body } = params;
    return this._client.post('/v1/sales/customers', { query: { include }, body, ...options });
  }

  /**
   * Partially updates a customer account.
   *
   * Only the fields provided in the request are changed. Nullable fields can be set
   * to `null` to clear their current value.
   *
   * This endpoint requires the permission: `customers:update`.
   *
   * @example
   * ```ts
   * const customer = await client.sales.customers.update('ac_opnlh43ymyee', {
   *   bill_to_address_id: 'ad_npqa5y43q26z',
   *   carrier_billing_account: '123456789',
   *   carrier_billing_type: 'sender',
   *   commission_policy: 'commission_applied',
   *   credit_limit: { value: '10000.00', unit_id: 'un_82bd37dae5po' },
   *   customer_price_group_ids: ['acgp_6p4z57e9alaf'],
   *   customer_type_group_id: 'acgp_6p4z57e9alaf',
   *   default_carrier_id: 'cr_tv5vfjtgu1n3',
   *   default_payment_term_id: 'pytm_skssmsy21lem',
   *   default_priority: 'normal',
   *   default_sales_rep_id: 'acus_e5zu8bde0z3h',
   *   default_service_level_id: 'crop_4ilk9p6gccrx',
   *   default_shipping_term_id: 'shtm_c5gxy05whw6r',
   *   edi_status: 'disabled',
   *   email: 'orders@acme.com',
   *   freight_policy: 'billed_freight',
   *   fulfillment_policy: 'make_to_order',
   *   name: 'Acme Corp Updated',
   *   note: 'Updated account notes',
   *   number: '100042',
   *   phone: '555-123-4567',
   *   ship_to_address_id: 'ad_npqa5y43q26z',
   *   status: 'normal',
   *   url: 'https://acme.com',
   * });
   * ```
   */
  update(
    id: string,
    params: CustomerUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AccountPricesAPI.Customer> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/sales/customers/${id}`, { query: { include }, body, ...options });
  }

  /**
   * Deletes a customer.
   *
   * Fails with a conflict error if any sales orders still reference the customer;
   * delete or reassign those orders, or merge the customer into another first.
   *
   * This endpoint requires the permission: `customers:delete`.
   *
   * @example
   * ```ts
   * const customer = await client.sales.customers.delete(
   *   'ac_opnlh43ymyee',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<CustomerDeleteResponse> {
    return this._client.delete(path`/v1/sales/customers/${id}`, options);
  }

  /**
   * Returns the ship-by lead time a new order for this customer would be committed
   * to.
   *
   * Resolved through the same chain the issue path stamps onto an order, most
   * specific first: a lead time set on the customer, then on its parent account,
   * then on the customer's account group, then the account-wide default. `source`
   * names which rule applied, so a form can show where the number came from rather
   * than leaving a rep to guess.
   *
   * A lead time set on a parent account therefore governs every child account under
   * it that has not set its own, which is how a head office's terms are given to its
   * locations without repeating them on each one.
   *
   * This is a preview of a commitment, not the commitment itself. An order takes its
   * own `ship_by_date` when it is issued and keeps it afterwards, so changing a lead
   * time here moves what future orders will promise and leaves promises already made
   * alone.
   *
   * This endpoint requires the permission: `customers:read`.
   *
   * @example
   * ```ts
   * const customerLeadTime =
   *   await client.sales.customers.retrieveLeadTime(
   *     'ac_opnlh43ymyee',
   *   );
   * ```
   */
  retrieveLeadTime(
    id: string,
    query: CustomerRetrieveLeadTimeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomerLeadTime> {
    return this._client.get(path`/v1/sales/customers/${id}/lead-time`, { query, ...options });
  }
}

/**
 * Request to create a customer.
 */
export interface CreateCustomerRequest {
  /**
   * Address details supplied when creating an address, either on its own or inline
   * on another resource.
   *
   * A few requests, such as shipping rate estimates, take these same fields for a
   * one-off address that is never saved to the account.
   */
  bill_to_address: AddressesAPI.AddressInput;

  /**
   * ID of the account group of type `type_group` that categorizes this customer (for
   * example "Distributors").
   */
  customer_type_group_id: string;

  /**
   * ID of the carrier used on this customer's orders when the order does not specify
   * one.
   */
  default_carrier_id: string;

  /**
   * ID of the payment term used on this customer's orders when the order does not
   * specify one.
   */
  default_payment_term_id: string;

  /**
   * ID of the shipping term used on this customer's orders when the order does not
   * specify one.
   */
  default_shipping_term_id: string;

  /**
   * The customer's business name, as shown throughout the app and on documents.
   */
  name: string;

  /**
   * Address details supplied when creating an address, either on its own or inline
   * on another resource.
   *
   * A few requests, such as shipping rate estimates, take these same fields for a
   * one-off address that is never saved to the account.
   */
  ship_to_address: AddressesAPI.AddressInput;

  /**
   * Carrier billing account number charged when `carrier_billing_type` is
   * `third_party`.
   */
  carrier_billing_account?: string;

  /**
   * Who pays the carrier for shipments.
   *
   * - `sender`: the shipper (you) pays the carrier.
   * - `third_party`: a third party is billed, using `carrier_billing_account`.
   */
  carrier_billing_type?: 'sender' | 'third_party';

  /**
   * How sales commission applies to this customer's orders.
   *
   * - `commission_exempt`: this customer's orders are exempt from sales commission.
   * - `commission_applied`: sales commission is calculated on this customer's
   *   orders.
   */
  commission_policy?: 'commission_applied' | 'commission_exempt';

  /**
   * An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  credit_limit?: InventoryAPI.QuantityInput;

  /**
   * IDs of the account groups of type `pricing_group` to assign to this customer,
   * used to apply pricing rules.
   */
  customer_price_group_ids?: Array<string>;

  /**
   * Priority used to pre-fill new orders for this customer.
   */
  default_priority?: 'low' | 'normal' | 'high';

  /**
   * The ID of the account user to credit as the sales rep on this customer's orders.
   *
   * Must be an account user on your own account.
   */
  default_sales_rep_id?: string;

  /**
   * ID of the carrier service level used when an order takes its carrier from this
   * customer's default.
   */
  default_service_level_id?: string;

  /**
   * Whether EDI (Electronic Data Interchange) is enabled for exchanging orders and
   * documents with this customer.
   */
  edi_status?: 'enabled' | 'disabled';

  /**
   * Email address.
   */
  email?: string;

  /**
   * Whether this customer is billed for freight on their orders.
   *
   * - `free_freight`: the customer is not billed for freight.
   * - `billed_freight`: freight is billed to the customer.
   *
   * Freight is also waived when the customer's type group, one of its price groups,
   * or a product line the ordered products belong to is `free_freight`.
   */
  freight_policy?: 'free_freight' | 'billed_freight';

  /**
   * How this customer's orders are produced.
   *
   * - `make_to_stock`: their order history feeds the production-schedule forecast,
   *   so stock is built ahead of their demand.
   * - `make_to_order`: their history is left out of the forecast; their orders are
   *   produced only once placed, and fit into the schedule on their own ship-by
   *   dates.
   *
   * Leave unset to inherit the customer's account group policy, then the
   * make-to-stock default.
   */
  fulfillment_policy?: 'make_to_stock' | 'make_to_order';

  /**
   * Calendar days between an order being issued and it being due to ship.
   *
   * Sets each order's `ship_by_date` when it is issued. Leave unset to inherit the
   * parent account's lead time, then the customer's account group lead time, then
   * the account default.
   */
  lead_time_days?: number;

  /**
   * Free-form note about the customer.
   */
  note?: string;

  /**
   * Human-readable customer number used to identify the account, distinct from the
   * `id`.
   *
   * Must be unique within your account. If omitted, the next sequential number is
   * assigned automatically.
   */
  number?: string;

  /**
   * Phone number.
   */
  phone?: string;

  /**
   * The operating calendar naming the days this customer's dock accepts freight.
   *
   * Sits in the same chain as lead_time_days: leaving it unset falls through to the
   * customer's group, then the account default, then Monday to Friday. A promised
   * delivery date is never worked back from a day nobody is there to receive on.
   */
  receive_calendar_id?: string;

  /**
   * The customer's account standing.
   *
   * - `normal`: standard account with no restrictions.
   * - `preferred`: account flagged for prioritized handling.
   * - `hold_shipment`: the customer's shipments should be held, typically over a
   *   credit problem, while orders can still be placed.
   * - `hold_all`: all activity for the customer should be held.
   */
  status?: 'normal' | 'preferred' | 'hold_shipment' | 'hold_all';

  /**
   * Website URL.
   */
  url?: string;
}

/**
 * The ship-by lead time a new order for this customer would be committed to.
 */
export interface CustomerLeadTime {
  /**
   * A named grouping of customer accounts, used for pricing rules or to categorize
   * accounts.
   *
   * A customer carries at most one group of type `type_group` as its customer type,
   * plus any number of groups of type `pricing_group`. Membership of either kind can
   * scope a volume discount to the customer and open up product lines for it to
   * order from.
   */
  account_group: AccountGroupsAPI.AccountGroup | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  customer: CoreAPI.Entity | null;

  /**
   * Calendar days between an order being issued and it being due to ship.
   *
   * `0` means same-day: an order issued today would be due to ship today.
   */
  days: number;

  /**
   * Resource type identifier.
   */
  object: 'customer_lead_time';

  /**
   * A business you sell to, with its contact details, default fulfillment settings,
   * and order policies.
   */
  parent_customer: AccountPricesAPI.Customer | null;

  /**
   * Which rule in the chain produced this lead time.
   *
   * - `customer`: a lead time set on the customer itself.
   * - `parent_customer`: inherited from the customer's parent account.
   * - `account_group`: inherited from the customer's account group.
   * - `account`: the account-wide fallback.
   *
   * The shared `manual` value cannot appear here: it means a promised date was set
   * on one specific order, which is a fact about that order rather than about the
   * customer.
   */
  source:
    | 'customer'
    | 'parent_customer'
    | 'account_group'
    | 'account'
    | 'manual'
    | 'order_lead_time'
    | 'order_ship_by';
}

/**
 * Request to partially update a customer.
 */
export interface UpdateCustomerRequest {
  /**
   * ID of an existing address to use as the default billing address.
   *
   * The address is linked to the customer's account if it is not already.
   */
  bill_to_address_id?: string | null;

  /**
   * Carrier billing account number charged when `carrier_billing_type` is
   * `third_party`.
   */
  carrier_billing_account?: string | null;

  /**
   * Who pays the carrier for shipments.
   *
   * - `sender`: the shipper (you) pays the carrier.
   * - `third_party`: a third party is billed, using `carrier_billing_account`.
   */
  carrier_billing_type?: 'sender' | 'third_party';

  /**
   * How sales commission applies to this customer's orders.
   *
   * - `commission_exempt`: this customer's orders are exempt from sales commission.
   * - `commission_applied`: sales commission is calculated on this customer's
   *   orders.
   */
  commission_policy?: 'commission_applied' | 'commission_exempt';

  /**
   * An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  credit_limit?: InventoryAPI.QuantityInput | null;

  /**
   * IDs of the account groups of type `pricing_group` to assign to this customer,
   * used to apply pricing rules.
   *
   * When provided, replaces the customer's full set of existing price groups.
   */
  customer_price_group_ids?: Array<string>;

  /**
   * ID of the account group of type `type_group` that categorizes this customer (for
   * example "Distributors").
   */
  customer_type_group_id?: string;

  /**
   * ID of the carrier used on this customer's orders when the order does not specify
   * one.
   */
  default_carrier_id?: string;

  /**
   * ID of the payment term used on this customer's orders when the order does not
   * specify one.
   */
  default_payment_term_id?: string;

  /**
   * Priority used to pre-fill new orders for this customer.
   */
  default_priority?: 'low' | 'normal' | 'high';

  /**
   * The ID of the account user to credit as the sales rep on this customer's orders.
   *
   * Must be an account user on your own account.
   */
  default_sales_rep_id?: string | null;

  /**
   * ID of the carrier service level used when an order takes its carrier from this
   * customer's default.
   */
  default_service_level_id?: string | null;

  /**
   * ID of the shipping term used on this customer's orders when the order does not
   * specify one.
   */
  default_shipping_term_id?: string;

  /**
   * Whether EDI (Electronic Data Interchange) is enabled for exchanging orders and
   * documents with this customer.
   */
  edi_status?: 'enabled' | 'disabled';

  /**
   * Email address.
   */
  email?: string | null;

  /**
   * Whether this customer is billed for freight on their orders.
   *
   * - `free_freight`: the customer is not billed for freight.
   * - `billed_freight`: freight is billed to the customer.
   *
   * Freight is also waived when the customer's type group, one of its price groups,
   * or a product line the ordered products belong to is `free_freight`.
   */
  freight_policy?: 'free_freight' | 'billed_freight';

  /**
   * How this customer's orders are produced.
   *
   * - `make_to_stock`: their order history feeds the production-schedule forecast,
   *   so stock is built ahead of their demand.
   * - `make_to_order`: their history is left out of the forecast; their orders are
   *   produced only once placed, and fit into the schedule on their own ship-by
   *   dates.
   *
   * Clearing it returns the customer to their account group policy, then the
   * make-to-stock default.
   */
  fulfillment_policy?: 'make_to_stock' | 'make_to_order' | null;

  /**
   * Calendar days between an order being issued and it being due to ship.
   *
   * Sets each order's `ship_by_date` when it is issued. Clear it to inherit the
   * parent account's lead time, then the customer's account group lead time, then
   * the account default.
   */
  lead_time_days?: number | null;

  /**
   * The customer's business name, as shown throughout the app and on documents.
   */
  name?: string;

  /**
   * Free-form note about the customer.
   */
  note?: string | null;

  /**
   * Human-readable customer number used to identify the account, distinct from the
   * `id`.
   *
   * Must be unique within your account.
   */
  number?: string;

  /**
   * Phone number.
   */
  phone?: string | null;

  /**
   * The operating calendar naming the days this customer's dock accepts freight.
   * Clearing it returns the customer to their group's calendar, then the account
   * default.
   */
  receive_calendar_id?: string | null;

  /**
   * ID of an existing address to use as the default shipping address.
   *
   * The address is linked to the customer's account if it is not already.
   */
  ship_to_address_id?: string | null;

  /**
   * The customer's account standing.
   *
   * - `normal`: standard account with no restrictions.
   * - `preferred`: account flagged for prioritized handling.
   * - `hold_shipment`: the customer's shipments should be held, typically over a
   *   credit problem, while orders can still be placed.
   * - `hold_all`: all activity for the customer should be held.
   */
  status?: 'normal' | 'preferred' | 'hold_shipment' | 'hold_all';

  /**
   * Website URL.
   */
  url?: string | null;
}

export interface CustomerDeleteResponse {}

export interface CustomerListParams {
  /**
   * Filter by default carrier IDs.
   */
  carrier_ids?: Array<string>;

  /**
   * Filter to customers with any address in this city (exact match).
   *
   * When combined with `state` or `postal_code`, a single address must match all
   * provided values.
   */
  city?: string;

  /**
   * Filter by the commission policy set on the customer itself.
   *
   * Policies inherited from the customer's type group or price groups are not
   * considered here.
   */
  commission_status_codes?: Array<'commission_applied' | 'commission_exempt'>;

  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Filter by customer type group IDs (the account group of type `type_group`
   * returned in the customer's `type` field).
   */
  customer_group_ids?: Array<string>;

  /**
   * Filter to customers created at or before this timestamp (inclusive).
   */
  ends_at?: string;

  /**
   * Filter by the freight policy set on the customer itself.
   *
   * Policies inherited from the customer's type group or price groups are not
   * considered here.
   */
  freight_status_codes?: Array<'free_freight' | 'billed_freight'>;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'bill_to_address'
    | 'ship_to_address'
    | 'type'
    | 'parent_account'
    | 'freight_preferences.carrier'
    | 'freight_preferences.carrier.service_levels'
    | 'freight_preferences.service_level'
    | 'defaults.payment_term'
    | 'defaults.shipping_term'
    | 'defaults.sales_rep'
    | 'defaults.sales_rep.user'
    | 'defaults.priority'
    | 'contact_info'
    | 'freight_preferences'
    | 'defaults'
    | 'notification_preferences'
    | 'price_groups'
    | 'child_accounts'
    | 'credit_limit'
    | 'credit_limit.unit'
  >;

  /**
   * Maximum number of results to return in a single page.
   */
  limit?: number;

  /**
   * Filter by whether the customer has child accounts.
   */
  parent_account_status?: 'parent' | 'non_parent';

  /**
   * Filter by default payment term IDs.
   */
  payment_term_ids?: Array<string>;

  /**
   * Filter to customers with any address in this postal code (exact match).
   */
  postal_code?: string;

  /**
   * Filter to customers that belong to any of these pricing groups.
   */
  pricing_group_ids?: Array<string>;

  /**
   * Free-text search term used to filter results.
   *
   * Which fields are matched against the term varies by endpoint.
   */
  q?: string;

  /**
   * Filter to customers whose default sales rep is one of these account users.
   */
  sales_rep_ids?: Array<string>;

  /**
   * Filter by default service level IDs.
   */
  service_level_ids?: Array<string>;

  /**
   * Filter by default shipping term IDs.
   */
  shipping_term_ids?: Array<string>;

  /**
   * Filter to customers created at or after this timestamp (inclusive).
   */
  starts_at?: string;

  /**
   * Filter to customers with any address in this state (exact match).
   */
  state?: string;

  /**
   * Filter by the customer's account standing.
   */
  status_codes?: Array<'normal' | 'preferred' | 'hold_shipment' | 'hold_all'>;
}

export interface CustomerRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'bill_to_address'
    | 'ship_to_address'
    | 'type'
    | 'parent_account'
    | 'freight_preferences.carrier'
    | 'freight_preferences.carrier.service_levels'
    | 'freight_preferences.service_level'
    | 'defaults.payment_term'
    | 'defaults.shipping_term'
    | 'defaults.sales_rep'
    | 'defaults.sales_rep.user'
    | 'defaults.priority'
    | 'contact_info'
    | 'freight_preferences'
    | 'defaults'
    | 'notification_preferences'
    | 'price_groups'
    | 'child_accounts'
    | 'credit_limit'
    | 'credit_limit.unit'
  >;
}

export interface CustomerCreateParams {
  /**
   * Body param: Address details supplied when creating an address, either on its own
   * or inline on another resource.
   *
   * A few requests, such as shipping rate estimates, take these same fields for a
   * one-off address that is never saved to the account.
   */
  bill_to_address: AddressesAPI.AddressInput;

  /**
   * Body param: ID of the account group of type `type_group` that categorizes this
   * customer (for example "Distributors").
   */
  customer_type_group_id: string;

  /**
   * Body param: ID of the carrier used on this customer's orders when the order does
   * not specify one.
   */
  default_carrier_id: string;

  /**
   * Body param: ID of the payment term used on this customer's orders when the order
   * does not specify one.
   */
  default_payment_term_id: string;

  /**
   * Body param: ID of the shipping term used on this customer's orders when the
   * order does not specify one.
   */
  default_shipping_term_id: string;

  /**
   * Body param: The customer's business name, as shown throughout the app and on
   * documents.
   */
  name: string;

  /**
   * Body param: Address details supplied when creating an address, either on its own
   * or inline on another resource.
   *
   * A few requests, such as shipping rate estimates, take these same fields for a
   * one-off address that is never saved to the account.
   */
  ship_to_address: AddressesAPI.AddressInput;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'bill_to_address'
    | 'ship_to_address'
    | 'type'
    | 'parent_account'
    | 'freight_preferences.carrier'
    | 'freight_preferences.carrier.service_levels'
    | 'freight_preferences.service_level'
    | 'defaults.payment_term'
    | 'defaults.shipping_term'
    | 'defaults.sales_rep'
    | 'defaults.sales_rep.user'
    | 'defaults.priority'
    | 'contact_info'
    | 'freight_preferences'
    | 'defaults'
    | 'notification_preferences'
    | 'price_groups'
    | 'child_accounts'
    | 'credit_limit'
    | 'credit_limit.unit'
  >;

  /**
   * Body param: Carrier billing account number charged when `carrier_billing_type`
   * is `third_party`.
   */
  carrier_billing_account?: string;

  /**
   * Body param: Who pays the carrier for shipments.
   *
   * - `sender`: the shipper (you) pays the carrier.
   * - `third_party`: a third party is billed, using `carrier_billing_account`.
   */
  carrier_billing_type?: 'sender' | 'third_party';

  /**
   * Body param: How sales commission applies to this customer's orders.
   *
   * - `commission_exempt`: this customer's orders are exempt from sales commission.
   * - `commission_applied`: sales commission is calculated on this customer's
   *   orders.
   */
  commission_policy?: 'commission_applied' | 'commission_exempt';

  /**
   * Body param: An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  credit_limit?: InventoryAPI.QuantityInput;

  /**
   * Body param: IDs of the account groups of type `pricing_group` to assign to this
   * customer, used to apply pricing rules.
   */
  customer_price_group_ids?: Array<string>;

  /**
   * Body param: Priority used to pre-fill new orders for this customer.
   */
  default_priority?: 'low' | 'normal' | 'high';

  /**
   * Body param: The ID of the account user to credit as the sales rep on this
   * customer's orders.
   *
   * Must be an account user on your own account.
   */
  default_sales_rep_id?: string;

  /**
   * Body param: ID of the carrier service level used when an order takes its carrier
   * from this customer's default.
   */
  default_service_level_id?: string;

  /**
   * Body param: Whether EDI (Electronic Data Interchange) is enabled for exchanging
   * orders and documents with this customer.
   */
  edi_status?: 'enabled' | 'disabled';

  /**
   * Body param: Email address.
   */
  email?: string;

  /**
   * Body param: Whether this customer is billed for freight on their orders.
   *
   * - `free_freight`: the customer is not billed for freight.
   * - `billed_freight`: freight is billed to the customer.
   *
   * Freight is also waived when the customer's type group, one of its price groups,
   * or a product line the ordered products belong to is `free_freight`.
   */
  freight_policy?: 'free_freight' | 'billed_freight';

  /**
   * Body param: How this customer's orders are produced.
   *
   * - `make_to_stock`: their order history feeds the production-schedule forecast,
   *   so stock is built ahead of their demand.
   * - `make_to_order`: their history is left out of the forecast; their orders are
   *   produced only once placed, and fit into the schedule on their own ship-by
   *   dates.
   *
   * Leave unset to inherit the customer's account group policy, then the
   * make-to-stock default.
   */
  fulfillment_policy?: 'make_to_stock' | 'make_to_order';

  /**
   * Body param: Calendar days between an order being issued and it being due to
   * ship.
   *
   * Sets each order's `ship_by_date` when it is issued. Leave unset to inherit the
   * parent account's lead time, then the customer's account group lead time, then
   * the account default.
   */
  lead_time_days?: number;

  /**
   * Body param: Free-form note about the customer.
   */
  note?: string;

  /**
   * Body param: Human-readable customer number used to identify the account,
   * distinct from the `id`.
   *
   * Must be unique within your account. If omitted, the next sequential number is
   * assigned automatically.
   */
  number?: string;

  /**
   * Body param: Phone number.
   */
  phone?: string;

  /**
   * Body param: The operating calendar naming the days this customer's dock accepts
   * freight.
   *
   * Sits in the same chain as lead_time_days: leaving it unset falls through to the
   * customer's group, then the account default, then Monday to Friday. A promised
   * delivery date is never worked back from a day nobody is there to receive on.
   */
  receive_calendar_id?: string;

  /**
   * Body param: The customer's account standing.
   *
   * - `normal`: standard account with no restrictions.
   * - `preferred`: account flagged for prioritized handling.
   * - `hold_shipment`: the customer's shipments should be held, typically over a
   *   credit problem, while orders can still be placed.
   * - `hold_all`: all activity for the customer should be held.
   */
  status?: 'normal' | 'preferred' | 'hold_shipment' | 'hold_all';

  /**
   * Body param: Website URL.
   */
  url?: string;
}

export interface CustomerUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'bill_to_address'
    | 'ship_to_address'
    | 'type'
    | 'parent_account'
    | 'freight_preferences.carrier'
    | 'freight_preferences.carrier.service_levels'
    | 'freight_preferences.service_level'
    | 'defaults.payment_term'
    | 'defaults.shipping_term'
    | 'defaults.sales_rep'
    | 'defaults.sales_rep.user'
    | 'defaults.priority'
    | 'contact_info'
    | 'freight_preferences'
    | 'defaults'
    | 'notification_preferences'
    | 'price_groups'
    | 'child_accounts'
    | 'credit_limit'
    | 'credit_limit.unit'
  >;

  /**
   * Body param: ID of an existing address to use as the default billing address.
   *
   * The address is linked to the customer's account if it is not already.
   */
  bill_to_address_id?: string | null;

  /**
   * Body param: Carrier billing account number charged when `carrier_billing_type`
   * is `third_party`.
   */
  carrier_billing_account?: string | null;

  /**
   * Body param: Who pays the carrier for shipments.
   *
   * - `sender`: the shipper (you) pays the carrier.
   * - `third_party`: a third party is billed, using `carrier_billing_account`.
   */
  carrier_billing_type?: 'sender' | 'third_party';

  /**
   * Body param: How sales commission applies to this customer's orders.
   *
   * - `commission_exempt`: this customer's orders are exempt from sales commission.
   * - `commission_applied`: sales commission is calculated on this customer's
   *   orders.
   */
  commission_policy?: 'commission_applied' | 'commission_exempt';

  /**
   * Body param: An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  credit_limit?: InventoryAPI.QuantityInput | null;

  /**
   * Body param: IDs of the account groups of type `pricing_group` to assign to this
   * customer, used to apply pricing rules.
   *
   * When provided, replaces the customer's full set of existing price groups.
   */
  customer_price_group_ids?: Array<string>;

  /**
   * Body param: ID of the account group of type `type_group` that categorizes this
   * customer (for example "Distributors").
   */
  customer_type_group_id?: string;

  /**
   * Body param: ID of the carrier used on this customer's orders when the order does
   * not specify one.
   */
  default_carrier_id?: string;

  /**
   * Body param: ID of the payment term used on this customer's orders when the order
   * does not specify one.
   */
  default_payment_term_id?: string;

  /**
   * Body param: Priority used to pre-fill new orders for this customer.
   */
  default_priority?: 'low' | 'normal' | 'high';

  /**
   * Body param: The ID of the account user to credit as the sales rep on this
   * customer's orders.
   *
   * Must be an account user on your own account.
   */
  default_sales_rep_id?: string | null;

  /**
   * Body param: ID of the carrier service level used when an order takes its carrier
   * from this customer's default.
   */
  default_service_level_id?: string | null;

  /**
   * Body param: ID of the shipping term used on this customer's orders when the
   * order does not specify one.
   */
  default_shipping_term_id?: string;

  /**
   * Body param: Whether EDI (Electronic Data Interchange) is enabled for exchanging
   * orders and documents with this customer.
   */
  edi_status?: 'enabled' | 'disabled';

  /**
   * Body param: Email address.
   */
  email?: string | null;

  /**
   * Body param: Whether this customer is billed for freight on their orders.
   *
   * - `free_freight`: the customer is not billed for freight.
   * - `billed_freight`: freight is billed to the customer.
   *
   * Freight is also waived when the customer's type group, one of its price groups,
   * or a product line the ordered products belong to is `free_freight`.
   */
  freight_policy?: 'free_freight' | 'billed_freight';

  /**
   * Body param: How this customer's orders are produced.
   *
   * - `make_to_stock`: their order history feeds the production-schedule forecast,
   *   so stock is built ahead of their demand.
   * - `make_to_order`: their history is left out of the forecast; their orders are
   *   produced only once placed, and fit into the schedule on their own ship-by
   *   dates.
   *
   * Clearing it returns the customer to their account group policy, then the
   * make-to-stock default.
   */
  fulfillment_policy?: 'make_to_stock' | 'make_to_order' | null;

  /**
   * Body param: Calendar days between an order being issued and it being due to
   * ship.
   *
   * Sets each order's `ship_by_date` when it is issued. Clear it to inherit the
   * parent account's lead time, then the customer's account group lead time, then
   * the account default.
   */
  lead_time_days?: number | null;

  /**
   * Body param: The customer's business name, as shown throughout the app and on
   * documents.
   */
  name?: string;

  /**
   * Body param: Free-form note about the customer.
   */
  note?: string | null;

  /**
   * Body param: Human-readable customer number used to identify the account,
   * distinct from the `id`.
   *
   * Must be unique within your account.
   */
  number?: string;

  /**
   * Body param: Phone number.
   */
  phone?: string | null;

  /**
   * Body param: The operating calendar naming the days this customer's dock accepts
   * freight. Clearing it returns the customer to their group's calendar, then the
   * account default.
   */
  receive_calendar_id?: string | null;

  /**
   * Body param: ID of an existing address to use as the default shipping address.
   *
   * The address is linked to the customer's account if it is not already.
   */
  ship_to_address_id?: string | null;

  /**
   * Body param: The customer's account standing.
   *
   * - `normal`: standard account with no restrictions.
   * - `preferred`: account flagged for prioritized handling.
   * - `hold_shipment`: the customer's shipments should be held, typically over a
   *   credit problem, while orders can still be placed.
   * - `hold_all`: all activity for the customer should be held.
   */
  status?: 'normal' | 'preferred' | 'hold_shipment' | 'hold_all';

  /**
   * Body param: Website URL.
   */
  url?: string | null;
}

export interface CustomerRetrieveLeadTimeParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'account_group' | 'parent_customer'>;
}

Customers.Actions = Actions;

export declare namespace Customers {
  export {
    type CreateCustomerRequest as CreateCustomerRequest,
    type CustomerLeadTime as CustomerLeadTime,
    type UpdateCustomerRequest as UpdateCustomerRequest,
    type CustomerDeleteResponse as CustomerDeleteResponse,
    type CustomerListParams as CustomerListParams,
    type CustomerRetrieveParams as CustomerRetrieveParams,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerRetrieveLeadTimeParams as CustomerRetrieveLeadTimeParams,
  };

  export {
    Actions as Actions,
    type MergeCustomersRequest as MergeCustomersRequest,
    type ActionMergeParams as ActionMergeParams,
  };
}
