// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ActionsAPI from './actions';
import { ActionFindByCodeParams, Actions, FindOrderDiscountByCodeRequest } from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage order discounts.
 */
export class OrderDiscounts extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of the order discounts defined for the current account,
   * newest first.
   *
   * Pass `q` to narrow the list to discounts whose name or code contains the search
   * text.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `discounts:read`.
   *
   * @example
   * ```ts
   * const listOrderDiscount =
   *   await client.sales.orderDiscounts.list();
   * ```
   */
  list(
    query: OrderDiscountListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListOrderDiscount> {
    return this._client.get('/v1/sales/order-discounts', { query, ...options });
  }

  /**
   * Returns an order discount by ID.
   *
   * This endpoint requires the permission: `discounts:read`.
   *
   * @example
   * ```ts
   * const orderDiscount =
   *   await client.sales.orderDiscounts.retrieve(
   *     'ords_qnbrjvq5ih2q',
   *   );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<OrderDiscount> {
    return this._client.get(path`/v1/sales/order-discounts/${id}`, options);
  }

  /**
   * Creates an order discount that buyers can then redeem on a sales order by its
   * code.
   *
   * The code must be unique within your account; reusing a code that another
   * discount already holds returns a conflict error. Creating the discount does not
   * apply it to anything — a discount only affects an order once that order
   * references it.
   *
   * This endpoint requires the permission: `discounts:create`.
   *
   * @example
   * ```ts
   * const orderDiscount =
   *   await client.sales.orderDiscounts.create({
   *     code: 'SAVE10',
   *     discount_type: 'percentage',
   *     name: '10% Off',
   *     percentage: '0.1',
   *   });
   * ```
   */
  create(body: OrderDiscountCreateParams, options?: RequestOptions): APIPromise<OrderDiscount> {
    return this._client.post('/v1/sales/order-discounts', { body, ...options });
  }

  /**
   * Partially updates an order discount.
   *
   * Only the fields you send are changed; the rest keep their current values.
   * Changing `code` to one another discount already holds returns a conflict error.
   * Edits apply to future orders only — orders that already used this discount keep
   * the reduction they were given.
   *
   * This endpoint requires the permission: `discounts:update`.
   *
   * @example
   * ```ts
   * const orderDiscount =
   *   await client.sales.orderDiscounts.update(
   *     'ords_qnbrjvq5ih2q',
   *     { code: 'SAVE15', name: '15% Off' },
   *   );
   * ```
   */
  update(
    id: string,
    body: OrderDiscountUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OrderDiscount> {
    return this._client.patch(path`/v1/sales/order-discounts/${id}`, { body, ...options });
  }

  /**
   * Deletes an order discount and returns it as it was just before deletion.
   *
   * Deletion is permanent; further requests against the deleted ID return an error.
   *
   * The code can no longer be redeemed, but sales orders that already used the
   * discount keep the reduction that was applied to them; their totals are not
   * recalculated.
   *
   * This endpoint requires the permission: `discounts:delete`.
   *
   * @example
   * ```ts
   * const orderDiscount =
   *   await client.sales.orderDiscounts.delete(
   *     'ords_qnbrjvq5ih2q',
   *   );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<OrderDiscount> {
    return this._client.delete(path`/v1/sales/order-discounts/${id}`, options);
  }
}

/**
 * Request to create an order discount.
 */
export interface CreateOrderDiscountRequest {
  /**
   * The code a buyer enters to apply this discount to an order.
   *
   * Codes are unique within your account and are compared without regard to letter
   * case, so `SAVE10` collides with `save10`.
   */
  code: string;

  /**
   * How the discount is calculated.
   *
   * - `percentage`: the order total is reduced by the fraction in `percentage`.
   * - `amount`: the order total is reduced by the flat amount in `amount`.
   */
  discount_type: 'percentage' | 'amount';

  /**
   * Display name of the discount.
   */
  name: string;

  /**
   * The flat amount to take off the order total, as a decimal string.
   *
   * Only read when `discount_type` is `amount`. Leaving it out stores `0`, which
   * produces a discount that takes nothing off.
   */
  amount?: string;

  /**
   * The fraction of the order total to take off, as a decimal string.
   *
   * This is a multiplier, not a whole percent: send `0.1` to take 10% off. Only read
   * when `discount_type` is `percentage`. Leaving it out stores `0`, which produces
   * a discount that takes nothing off.
   */
  percentage?: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListOrderDiscount {
  /**
   * Resources in this page.
   */
  data: Array<OrderDiscount>;

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
 * A discount code that can be applied to a sales order.
 *
 * An order discount reduces the order total by either a percentage or a fixed
 * amount, depending on `discount_type`. The reduction is capped at the order total
 * and rounded to the nearest cent.
 */
export interface OrderDiscount {
  /**
   * Order discount ID.
   */
  id: string;

  /**
   * The flat amount taken off the order total, as a decimal string.
   *
   * Only read when `discount_type` is `amount`.
   */
  amount: string;

  /**
   * The code a buyer enters to apply this discount to an order.
   *
   * Codes are unique within your account and are matched without regard to letter
   * case.
   */
  code: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * How the discount is calculated.
   *
   * - `percentage`: the order total is reduced by the fraction in `percentage`.
   * - `amount`: the order total is reduced by the flat amount in `amount`.
   */
  discount_type: 'percentage' | 'amount';

  /**
   * Display name of the discount.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'order_discount';

  /**
   * How many sales orders this discount has been applied to, across all buyers.
   */
  order_count: number;

  /**
   * The fraction of the order total taken off, as a decimal string.
   *
   * This is a multiplier, not a whole percent: `0.1` takes 10% off. Only read when
   * `discount_type` is `percentage`.
   */
  percentage: string;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Request to partially update an order discount.
 */
export interface UpdateOrderDiscountRequest {
  /**
   * The flat amount to take off the order total, as a decimal string.
   *
   * Only read when `discount_type` is `amount`.
   */
  amount?: string;

  /**
   * The code a buyer enters to apply this discount to an order.
   *
   * Codes are unique within your account and are compared without regard to letter
   * case.
   */
  code?: string;

  /**
   * How the discount is calculated.
   *
   * - `percentage`: the order total is reduced by the fraction in `percentage`.
   * - `amount`: the order total is reduced by the flat amount in `amount`.
   *
   * Switching the type does not move the stored figure across, so send the matching
   * `percentage` or `amount` in the same request or the discount will take nothing
   * off.
   */
  discount_type?: 'percentage' | 'amount';

  /**
   * Display name of the discount.
   */
  name?: string;

  /**
   * The fraction of the order total to take off, as a decimal string.
   *
   * This is a multiplier, not a whole percent: send `0.1` to take 10% off. Only read
   * when `discount_type` is `percentage`.
   */
  percentage?: string;
}

export interface OrderDiscountListParams {
  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

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

export interface OrderDiscountCreateParams {
  /**
   * The code a buyer enters to apply this discount to an order.
   *
   * Codes are unique within your account and are compared without regard to letter
   * case, so `SAVE10` collides with `save10`.
   */
  code: string;

  /**
   * How the discount is calculated.
   *
   * - `percentage`: the order total is reduced by the fraction in `percentage`.
   * - `amount`: the order total is reduced by the flat amount in `amount`.
   */
  discount_type: 'percentage' | 'amount';

  /**
   * Display name of the discount.
   */
  name: string;

  /**
   * The flat amount to take off the order total, as a decimal string.
   *
   * Only read when `discount_type` is `amount`. Leaving it out stores `0`, which
   * produces a discount that takes nothing off.
   */
  amount?: string;

  /**
   * The fraction of the order total to take off, as a decimal string.
   *
   * This is a multiplier, not a whole percent: send `0.1` to take 10% off. Only read
   * when `discount_type` is `percentage`. Leaving it out stores `0`, which produces
   * a discount that takes nothing off.
   */
  percentage?: string;
}

export interface OrderDiscountUpdateParams {
  /**
   * The flat amount to take off the order total, as a decimal string.
   *
   * Only read when `discount_type` is `amount`.
   */
  amount?: string;

  /**
   * The code a buyer enters to apply this discount to an order.
   *
   * Codes are unique within your account and are compared without regard to letter
   * case.
   */
  code?: string;

  /**
   * How the discount is calculated.
   *
   * - `percentage`: the order total is reduced by the fraction in `percentage`.
   * - `amount`: the order total is reduced by the flat amount in `amount`.
   *
   * Switching the type does not move the stored figure across, so send the matching
   * `percentage` or `amount` in the same request or the discount will take nothing
   * off.
   */
  discount_type?: 'percentage' | 'amount';

  /**
   * Display name of the discount.
   */
  name?: string;

  /**
   * The fraction of the order total to take off, as a decimal string.
   *
   * This is a multiplier, not a whole percent: send `0.1` to take 10% off. Only read
   * when `discount_type` is `percentage`.
   */
  percentage?: string;
}

OrderDiscounts.Actions = Actions;

export declare namespace OrderDiscounts {
  export {
    type CreateOrderDiscountRequest as CreateOrderDiscountRequest,
    type ListOrderDiscount as ListOrderDiscount,
    type OrderDiscount as OrderDiscount,
    type UpdateOrderDiscountRequest as UpdateOrderDiscountRequest,
    type OrderDiscountListParams as OrderDiscountListParams,
    type OrderDiscountCreateParams as OrderDiscountCreateParams,
    type OrderDiscountUpdateParams as OrderDiscountUpdateParams,
  };

  export {
    Actions as Actions,
    type FindOrderDiscountByCodeRequest as FindOrderDiscountByCodeRequest,
    type ActionFindByCodeParams as ActionFindByCodeParams,
  };
}
