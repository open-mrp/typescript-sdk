// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as PicksAPI from '../picks';
import * as ActionsAPI from './actions';
import { ActionPickParams, ActionVoidParams, Actions } from './actions';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

/**
 * List, view, pick, void, and pack picks and pick lines.
 */
export class Lines extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Updates a pick line's picked quantity.
   *
   * Use this to record a short or partial pick; Pick Pick Line fills in the full
   * outstanding quantity instead.
   *
   * This endpoint requires the permission: `picks:update`.
   *
   * @example
   * ```ts
   * const pickLine = await client.operations.picks.lines.update(
   *   'example',
   *   {
   *     pick_id: 'pk_6eilj488bq8d',
   *     quantity_value: '10.000000000000000000000000000000',
   *   },
   * );
   * ```
   */
  update(id: string, params: LineUpdateParams, options?: RequestOptions): APIPromise<PicksAPI.PickLine> {
    const { pick_id, include, ...body } = params;
    return this._client.patch(path`/v1/operations/picks/${pick_id}/lines/${id}`, {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * Request to update a pick line's picked quantity.
 */
export interface UpdatePickLineRequest {
  /**
   * New picked quantity for the line, as a decimal string read in the unit the sales
   * order line was sold in, stored as given and not capped at the ordered quantity.
   *
   * Must not be negative. Pulling more than was ordered is a real floor event and is
   * kept as recorded; pulling a negative amount is not.
   */
  quantity_value?: string;
}

export interface LineUpdateParams {
  /**
   * Path param: Pick ID.
   */
  pick_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    'sales_order_line' | 'sales_order_line.product' | 'quantity.unit' | 'ordered_quantity.unit'
  >;

  /**
   * Body param: New picked quantity for the line, as a decimal string read in the
   * unit the sales order line was sold in, stored as given and not capped at the
   * ordered quantity.
   *
   * Must not be negative. Pulling more than was ordered is a real floor event and is
   * kept as recorded; pulling a negative amount is not.
   */
  quantity_value?: string;
}

Lines.Actions = Actions;

export declare namespace Lines {
  export { type UpdatePickLineRequest as UpdatePickLineRequest, type LineUpdateParams as LineUpdateParams };

  export {
    Actions as Actions,
    type ActionPickParams as ActionPickParams,
    type ActionVoidParams as ActionVoidParams,
  };
}
