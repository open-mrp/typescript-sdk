// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from '../../core/jobs';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and manage unit groups and their associated units.
 */
export class Actions extends APIResource {
  /**
   * Creates or updates multiple unit groups for the account, matched by name
   * (case-insensitive), then writes asynchronously — 202 with a job to poll.
   *
   * This endpoint requires the permissions: `unit_groups:create` and
   * `unit_groups:update`.
   *
   * @example
   * ```ts
   * const job =
   *   await client.catalog.unitGroups.actions.bulkUpsert({
   *     unit_groups: [
   *       {
   *         name: 'Weight',
   *         type: 'mass',
   *         base_unit: { id: 'un_82bd37dae5po' },
   *         unit_conversions: [
   *           {
   *             unit: { id: 'un_82bd37dae5po' },
   *             discount_percentage: 1,
   *           },
   *         ],
   *       },
   *     ],
   *   });
   * ```
   */
  bulkUpsert(params: ActionBulkUpsertParams, options?: RequestOptions): APIPromise<JobsAPI.Job> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/unit-groups/actions/bulk-upsert', {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * BulkUpsertUnitGroupsRequest is the request to bulk upsert unit groups.
 */
export interface BulkUpsertUnitGroupsRequest {
  /**
   * Unit groups to create or update, matched by name within the account.
   */
  unit_groups: Array<UpsertUnitGroupInput>;
}

/**
 * -------------------------- UNIT -------------------------- Identifies a unit by
 * its id, its name, or its abbreviation, in that order of precedence.
 */
export interface UnitIdentifier {
  /**
   * Unit ID.
   */
  id: string;

  /**
   * Unit abbreviation, matched case-insensitively against the account's units.
   */
  abbreviation: string;

  /**
   * Unit name, matched case-insensitively against the account's units.
   */
  name: string;
}

/**
 * UpsertUnitGroupConversionInput is the input for a single unit conversion within
 * a bulk upsert unit group.
 */
export interface UpsertUnitGroupConversionInput {
  /**
   * -------------------------- UNIT -------------------------- Identifies a unit by
   * its id, its name, or its abbreviation, in that order of precedence.
   */
  unit: UnitIdentifier;

  /**
   * Discount percentage to apply for this unit conversion.
   */
  discount_percentage?: number;
}

/**
 * UpsertUnitGroupInput is the input for a single unit group in a bulk upsert
 * operation.
 */
export interface UpsertUnitGroupInput {
  /**
   * -------------------------- UNIT -------------------------- Identifies a unit by
   * its id, its name, or its abbreviation, in that order of precedence.
   */
  base_unit: UnitIdentifier;

  /**
   * Display name of the unit group, matched case-insensitively against existing
   * groups. A row matching a system unit group fails — system groups cannot be
   * modified.
   */
  name: string;

  /**
   * Unit dimension type. Create-only — an existing group keeps its stored type.
   */
  type: 'currency' | 'quantity' | 'time' | 'mass' | 'volume' | 'length' | 'temperature' | 'area';

  /**
   * Free-form notes about the unit group. Preserved when omitted on update.
   */
  notes?: string;

  /**
   * Units to associate with the group. Replaces the existing set on update; the base
   * unit is always kept.
   */
  unit_conversions?: Array<UpsertUnitGroupConversionInput>;
}

export interface ActionBulkUpsertParams {
  /**
   * Body param: Unit groups to create or update, matched by name within the account.
   */
  unit_groups: Array<UpsertUnitGroupInput>;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export declare namespace Actions {
  export {
    type BulkUpsertUnitGroupsRequest as BulkUpsertUnitGroupsRequest,
    type UnitIdentifier as UnitIdentifier,
    type UpsertUnitGroupConversionInput as UpsertUnitGroupConversionInput,
    type UpsertUnitGroupInput as UpsertUnitGroupInput,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
