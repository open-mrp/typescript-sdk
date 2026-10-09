// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from '../../core/jobs';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and manage units.
 */
export class Actions extends APIResource {
  /**
   * Creates or updates multiple units of measure for the account, matched by name or
   * abbreviation, then writes asynchronously — 202 with a job to poll.
   *
   * This endpoint requires the permissions: `units:create` and `units:update`.
   *
   * @example
   * ```ts
   * const job = await client.catalog.units.actions.bulkUpsert({
   *   units: [
   *     {
   *       name: 'Kilogram',
   *       abbreviation: 'kg',
   *       type: 'mass',
   *       ratio_numerator: '1000',
   *       ratio_denominator: '1',
   *       offset_numerator: '0',
   *       offset_denominator: '1',
   *       is_base_unit: false,
   *     },
   *   ],
   * });
   * ```
   */
  bulkUpsert(params: ActionBulkUpsertParams, options?: RequestOptions): APIPromise<JobsAPI.Job> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/units/actions/bulk-upsert', {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * BulkUpsertUnitsRequest is the request to bulk upsert units.
 */
export interface BulkUpsertUnitsRequest {
  /**
   * Units to create or update, matched by name or abbreviation within the account.
   */
  units: Array<UpsertUnitInput>;
}

/**
 * UpsertUnitInput is the input for a single unit in a bulk upsert operation.
 */
export interface UpsertUnitInput {
  /**
   * Short abbreviation for the unit (e.g. "g"). Also used for matching — see `name`.
   */
  abbreviation: string;

  /**
   * Whether the unit is its dimension's base unit. Bulk upsert never creates a base
   * unit and rejects a change to an existing one.
   */
  is_base_unit: boolean;

  /**
   * Display name of the unit (e.g. "Gram"). A row matching a system unit fails —
   * system units cannot be modified.
   */
  name: string;

  /**
   * Conversion offset denominator, as a decimal string.
   */
  offset_denominator: string;

  /**
   * Conversion offset numerator, as a decimal string.
   */
  offset_numerator: string;

  /**
   * Conversion ratio denominator relative to the base unit, as a decimal string.
   */
  ratio_denominator: string;

  /**
   * Conversion ratio numerator relative to the base unit, as a decimal string.
   */
  ratio_numerator: string;

  /**
   * Unit dimension code. Create-only — a row that changes an existing unit's
   * dimension fails.
   */
  type: 'currency' | 'quantity' | 'time' | 'mass' | 'volume' | 'length' | 'temperature' | 'area';
}

export interface ActionBulkUpsertParams {
  /**
   * Body param: Units to create or update, matched by name or abbreviation within
   * the account.
   */
  units: Array<UpsertUnitInput>;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export declare namespace Actions {
  export {
    type BulkUpsertUnitsRequest as BulkUpsertUnitsRequest,
    type UpsertUnitInput as UpsertUnitInput,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
