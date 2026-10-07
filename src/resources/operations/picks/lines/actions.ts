// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as PicksAPI from '../picks';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

/**
 * List, view, pick, void, and pack picks and pick lines.
 */
export class Actions extends APIResource {
  /**
   * Marks a pick line as fully picked.
   *
   * Sets the line's picked quantity to its sales order line's ordered quantity less
   * what the order line's other pick lines hold, and never lowers it: picking a line
   * again changes nothing, and an over-pick is kept as recorded. To record a short
   * pick instead, set the quantity yourself with Update Pick Line. Has no effect on
   * a line that has already been packed.
   *
   * This endpoint requires the permission: `picks:update`.
   *
   * @example
   * ```ts
   * const pickLine =
   *   await client.operations.picks.lines.actions.pick(
   *     'example',
   *     { pick_id: 'pk_6eilj488bq8d' },
   *   );
   * ```
   */
  pick(id: string, params: ActionPickParams, options?: RequestOptions): APIPromise<PicksAPI.PickLine> {
    const { pick_id } = params;
    return this._client.put(path`/v1/operations/picks/${pick_id}/lines/${id}/actions/pick`, options);
  }

  /**
   * Voids a pick line, undoing the picking work recorded on it.
   *
   * Resets the line's picked quantity to zero without deleting the line, so the
   * quantity can be picked again. Returns a validation error if the line has already
   * been packed.
   *
   * This endpoint requires the permission: `picks:update`.
   *
   * @example
   * ```ts
   * const pickLine =
   *   await client.operations.picks.lines.actions.void(
   *     'example',
   *     { pick_id: 'pk_6eilj488bq8d' },
   *   );
   * ```
   */
  void(id: string, params: ActionVoidParams, options?: RequestOptions): APIPromise<PicksAPI.PickLine> {
    const { pick_id } = params;
    return this._client.put(path`/v1/operations/picks/${pick_id}/lines/${id}/actions/void`, options);
  }
}

export interface ActionPickParams {
  /**
   * Pick ID.
   */
  pick_id: string;
}

export interface ActionVoidParams {
  /**
   * Pick ID.
   */
  pick_id: string;
}

export declare namespace Actions {
  export { type ActionPickParams as ActionPickParams, type ActionVoidParams as ActionVoidParams };
}
