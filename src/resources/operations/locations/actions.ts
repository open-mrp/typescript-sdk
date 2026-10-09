// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from '../../core/jobs';
import * as BlocksAPI from '../../messaging/blocks';
import * as ActionsAPI from '../../catalog/item-categories/actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and manage locations.
 */
export class Actions extends APIResource {
  /**
   * Creates or updates multiple locations for the account, matched by name
   * (case-insensitive), then writes asynchronously — 202 with a job to poll.
   *
   * This endpoint requires the permissions: `locations:create` and
   * `locations:update`.
   *
   * @example
   * ```ts
   * const job =
   *   await client.operations.locations.actions.bulkUpsert({
   *     locations: [{ name: 'Warehouse A', type: 'building' }],
   *   });
   * ```
   */
  bulkUpsert(params: ActionBulkUpsertParams, options?: RequestOptions): APIPromise<JobsAPI.Job> {
    const { include, ...body } = params;
    return this._client.post('/v1/operations/locations/actions/bulk-upsert', {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * BulkUpsertLocationsRequest is the request to bulk upsert locations.
 */
export interface BulkUpsertLocationsRequest {
  /**
   * Locations to create or update, matched by name within the account.
   */
  locations: Array<UpsertLocationInput>;
}

/**
 * UpsertLocationInput is the input for a single location in a bulk upsert
 * operation.
 */
export interface UpsertLocationInput {
  /**
   * Display name of the location, used to match existing locations.
   */
  name: string;

  /**
   * Location type code.
   */
  type: BlocksAPI.LocationTypeCode;

  /**
   * Child locations to re-parent under this one, referenced by `id` or `name`, or by
   * name for a location in the same batch. Redundant with `parent` on each child.
   */
  children?: Array<ActionsAPI.ObjectIdentifier>;

  /**
   * -------------------------- Named Object -------------------------- Identifies an
   * object by its id or its name. An id wins when both are given.
   */
  parent?: ActionsAPI.ObjectIdentifier;
}

export interface ActionBulkUpsertParams {
  /**
   * Body param: Locations to create or update, matched by name within the account.
   */
  locations: Array<UpsertLocationInput>;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export declare namespace Actions {
  export {
    type BulkUpsertLocationsRequest as BulkUpsertLocationsRequest,
    type UpsertLocationInput as UpsertLocationInput,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
