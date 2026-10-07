// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

/**
 * List, view, create, update, and delete sales orders.
 */
export class Actions extends APIResource {
  /**
   * Reorders the product lines on a sales order to match the sequence supplied.
   *
   * The lines are renumbered from `1` in the given order. Discount and freight lines
   * always stay at the bottom of the list regardless of the sequence given here.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.sales.salesOrders.lines.actions.reorder(
   *     'or_9lqo07quiwyb',
   *     {
   *       line_ids: ['orln_la01fxgrwcnr', 'orln_vwp43e1rq2zb'],
   *     },
   *   );
   * ```
   */
  reorder(
    id: string,
    body: ActionReorderParams,
    options?: RequestOptions,
  ): APIPromise<ActionReorderResponse> {
    return this._client.post(path`/v1/sales/sales-orders/${id}/lines/actions/reorder`, { body, ...options });
  }
}

/**
 * Request to reorder a sales order's lines.
 */
export interface ReorderSalesOrderLinesRequest {
  /**
   * The order's product-line IDs in the desired display order.
   *
   * Every product line on the order must be listed exactly once. The automatically
   * generated discount and freight lines are kept at the bottom of the list and must
   * not be included.
   */
  line_ids: Array<string>;
}

export interface ActionReorderResponse {}

export interface ActionReorderParams {
  /**
   * The order's product-line IDs in the desired display order.
   *
   * Every product line on the order must be listed exactly once. The automatically
   * generated discount and freight lines are kept at the bottom of the list and must
   * not be included.
   */
  line_ids: Array<string>;
}

export declare namespace Actions {
  export {
    type ReorderSalesOrderLinesRequest as ReorderSalesOrderLinesRequest,
    type ActionReorderResponse as ActionReorderResponse,
    type ActionReorderParams as ActionReorderParams,
  };
}
