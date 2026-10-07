// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ActionsAPI from './actions';
import { ActionApplyParams, Actions, ApplyFulfillmentRecommendationsRequest } from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * The planning assumptions production schedules are solved against, and the per-resource overrides that mark which machines constrain the plan.
 */
export class FulfillmentRecommendations extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns, for every sellable SKU, whether it should be built to stock or only
   * against orders — and the measurement that decided.
   *
   * The rules are ordered and the first match wins. Lead-time feasibility is checked
   * before anything else: if customers are promised less time than production needs,
   * building to order is not possible rather than not preferred, and no amount of
   * lumpy demand changes that. After that the engine looks for dead stock, a single
   * contract customer, demand too erratic for a buffer to size, and slow-moving
   * expensive units.
   *
   * Every verdict carries its numbers — demand interval, variability, customer
   * concentration, promised lead time, annual cost of goods — so a planner can
   * disagree with the rule rather than only with the answer. Thresholds are
   * merchant-editable in the planning settings.
   *
   * Computed fresh on every call rather than stored. A recommendation is only
   * meaningful next to current demand, and a saved one would go quietly stale; the
   * durable artifact is the item setting written when someone agrees with it.
   * Nothing here changes a plan on its own.
   *
   * This endpoint requires the permission: `production_schedules:read`.
   *
   * @example
   * ```ts
   * const listFulfillmentRecommendation =
   *   await client.operations.fulfillmentRecommendations.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ListFulfillmentRecommendation> {
    return this._client.get('/v1/operations/fulfillment-recommendations', options);
  }
}

/**
 * The engine's advice on how one SKU should be produced, with the measurements
 * behind it.
 */
export interface FulfillmentRecommendation {
  /**
   * Annual cost of goods for this item: demand times unit cost.
   *
   * Null unless the caller holds `costs:read`; customer and supplier portal users
   * never see it.
   */
  annual_cogs: number | null;

  /**
   * Months observed divided by months with demand: 1 means it sells every month, 3
   * means once a quarter on average.
   *
   * Measured on monthly buckets, which cannot distinguish two orders in one month
   * from one.
   */
  average_demand_interval: number;

  /**
   * Whether adopting the recommendation would change anything.
   */
  changes: boolean;

  /**
   * Squared coefficient of variation over the months that had demand, measuring how
   * uneven the quantities are.
   */
  coefficient_of_variation: number;

  /**
   * How the item is planned today.
   */
  current_policy: 'make_to_stock' | 'make_to_order';

  /**
   * Calendar days customers are promised on average, weighted by how much each buys.
   */
  demand_weighted_lead_time_days: number;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * Percentage of demand from customers whose own stated policy disagrees with the
   * recommendation.
   *
   * A policy is resolved per SKU, so an item sold to both a stocking distributor and
   * a contract customer gets one answer either way. A high share here is the signal
   * that the single answer is uncomfortable.
   */
  mixed_stream_share_pct: number;

  /**
   * Months since anything last sold, capped at the observation window.
   */
  months_since_last_sale: number;

  /**
   * Resource type identifier.
   */
  object: 'fulfillment_recommendation';

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  product_line: CoreAPI.Entity | null;

  /**
   * The rule that decided.
   *
   * - `lead_time_infeasible`: customers are promised less time than production
   *   needs, so the stock has to exist before the order does. Checked first, because
   *   producing to order is not possible rather than not preferred.
   * - `no_recent_demand`: nothing has sold for long enough that a buffer is dead
   *   stock.
   * - `single_customer`: effectively one customer buys it, and that customer is
   *   served to order.
   * - `lumpy_demand`: demand arrives rarely and in wildly different sizes, which is
   *   the shape a safety stock sizes worst.
   * - `slow_moving_high_value`: expensive units, few sold — the buffer costs more
   *   than the service it buys.
   * - `steady_demand`: regular enough to forecast, which is what stocking is for.
   */
  reason:
    | 'lead_time_infeasible'
    | 'no_recent_demand'
    | 'single_customer'
    | 'lumpy_demand'
    | 'slow_moving_high_value'
    | 'steady_demand';

  /**
   * How the engine thinks it should be planned.
   */
  recommended_policy: 'make_to_stock' | 'make_to_order';

  /**
   * SKU of that item.
   */
  sku: string;

  /**
   * Name of that customer.
   */
  top_customer_name: string | null;

  /**
   * The largest customer's share of this item's demand, as a percentage.
   */
  top_customer_share_pct: number;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListFulfillmentRecommendation {
  /**
   * Resources in this page.
   */
  data: Array<FulfillmentRecommendation>;

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

FulfillmentRecommendations.Actions = Actions;

export declare namespace FulfillmentRecommendations {
  export {
    type FulfillmentRecommendation as FulfillmentRecommendation,
    type ListFulfillmentRecommendation as ListFulfillmentRecommendation,
  };

  export {
    Actions as Actions,
    type ApplyFulfillmentRecommendationsRequest as ApplyFulfillmentRecommendationsRequest,
    type ActionApplyParams as ActionApplyParams,
  };
}
