// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from '../../core/jobs';
import * as PicksAPI from './picks';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List, view, pick, void, and pack picks and pick lines.
 */
export class Actions extends APIResource {
  /**
   * Marks all lines on a pick as picked.
   *
   * Sets each unpacked line's picked quantity to the quantity still outstanding on
   * its sales order line, after accounting for what other pick lines for that order
   * line have already picked, and never lowers a line: calling it again changes
   * nothing, and an over-pick is kept as recorded. Lines that have already been
   * packed, and every line of a finished pick, are unaffected. Use this to fill in a
   * full pick in one call instead of picking each line individually; nothing is
   * shipped until the pick is packed.
   *
   * This endpoint requires the permission: `picks:update`.
   *
   * @example
   * ```ts
   * const pick = await client.operations.picks.actions.pick(
   *   'pk_6eilj488bq8d',
   * );
   * ```
   */
  pick(id: string, options?: RequestOptions): APIPromise<PicksAPI.Pick> {
    return this._client.put(path`/v1/operations/picks/${id}/actions/pick`, options);
  }

  /**
   * Voids a pick, undoing all picking work recorded on it.
   *
   * Resets the picked quantity on every unpacked line to zero and clears the pick's
   * `finished_at` timestamp, so the pick starts over as open with nothing picked.
   * The pick itself is not deleted, and the sales order is unaffected.
   *
   * Returns a validation error if any shipment exists for the pick's sales order.
   * Voiding those shipments is not enough — they must be deleted, since a voided
   * shipment still exists.
   *
   * This endpoint requires the permission: `picks:update`.
   *
   * @example
   * ```ts
   * const pick = await client.operations.picks.actions.void(
   *   'pk_6eilj488bq8d',
   * );
   * ```
   */
  void(id: string, options?: RequestOptions): APIPromise<PicksAPI.Pick> {
    return this._client.put(path`/v1/operations/picks/${id}/actions/void`, options);
  }

  /**
   * Packs a pick, creating a shipment from the picked lines.
   *
   * Returns `202 Accepted` with a job, because packing writes a shipment, one
   * shipment line per packed pick line, and the requested shipping cases. Poll the
   * job at the returned `Location`; once it reports `completed`, its first result
   * carries the new shipment's `id`, with the shipment line and shipping case ids in
   * `sub_resource_ids`. Every unpacked line with a picked quantity greater than zero
   * is marked as packed and added to a new shipment in `packed` status, which
   * inherits the sales order's carrier, service level, and shipping address. When a
   * sales order line still has outstanding quantity afterward and no unpacked pick
   * line is already open for it, a new zero-quantity pick line is created for the
   * remainder, so packing a partial pick leaves the pick open for the next round.
   * The pick is marked finished only once every one of its lines is packed.
   *
   * Returns a validation error if the pick is already finished or no line on the
   * pick has a picked quantity greater than zero. Packs of the same pick run one at
   * a time, so a second pack accepted alongside the first finds nothing left to pack
   * and its job fails rather than shipping the lines twice.
   *
   * This endpoint requires the permission: `picks:update`.
   *
   * @example
   * ```ts
   * const job = await client.operations.picks.actions.pack(
   *   'pk_6eilj488bq8d',
   *   { shipment_case_count: 3 },
   * );
   * ```
   */
  pack(id: string, params: ActionPackParams, options?: RequestOptions): APIPromise<JobsAPI.Job> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/operations/picks/${id}/actions/pack`, {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * Request to pack a pick, creating a shipment from the picked lines.
 */
export interface PackPickRequest {
  /**
   * Number of shipping cases to create on the new shipment.
   *
   * Must be at least 1. Cases are numbered sequentially from the shipment number
   * (e.g. `SO-001-1`, `SO-001-2`), and each starts with zero freight weight and
   * freight cost for you to fill in later.
   */
  shipment_case_count: number;
}

export interface ActionPackParams {
  /**
   * Body param: Number of shipping cases to create on the new shipment.
   *
   * Must be at least 1. Cases are numbered sequentially from the shipment number
   * (e.g. `SO-001-1`, `SO-001-2`), and each starts with zero freight weight and
   * freight cost for you to fill in later.
   */
  shipment_case_count: number;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export declare namespace Actions {
  export { type PackPickRequest as PackPickRequest, type ActionPackParams as ActionPackParams };
}
