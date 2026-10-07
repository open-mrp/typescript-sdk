// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from '../../core/jobs';
import * as ActionsAPI from '../item-categories/actions';
import * as MaterialsAPI from './materials';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and manage materials.
 */
export class Actions extends APIResource {
  /**
   * Creates or updates multiple materials for the account, matched by SKU. Validates
   * and resolves synchronously, then writes asynchronously — 202 with a job to poll.
   *
   * At most 1,000 materials and an 8 MB request body per call.
   *
   * @example
   * ```ts
   * const job =
   *   await client.catalog.materials.actions.bulkUpsert({
   *     materials: [
   *       {
   *         sku: 'MAT-001',
   *         category: { id: 'ic_d06g9c6yc9ck' },
   *         properties: [],
   *       },
   *     ],
   *   });
   * ```
   */
  bulkUpsert(params: ActionBulkUpsertParams, options?: RequestOptions): APIPromise<JobsAPI.Job> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/materials/actions/bulk-upsert', {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * Request to bulk upsert materials.
 */
export interface BulkUpsertMaterialsRequest {
  /**
   * Materials to create or update, matched by SKU within the account.
   */
  materials: Array<UpsertMaterialInput>;
}

/**
 * Input for a single material in a bulk upsert operation.
 */
export interface UpsertMaterialInput {
  /**
   * -------------------------- Named Object -------------------------- Identifies an
   * object by its id or its name. An id wins when both are given.
   */
  category: ActionsAPI.ObjectIdentifier;

  /**
   * Properties to attach to the material, matched/created by name + value. Additive
   * — existing attributes are not removed.
   */
  properties: Array<UpsertMaterialProperty>;

  /**
   * SKU for the material, used to match an existing material within the account. If
   * it exists the material is updated in place; otherwise a new material is created.
   * A SKU already used by a non-material item fails that row.
   */
  sku: string;

  /**
   * Material description.
   */
  description?: string;

  /**
   * A quantity, given as a decimal value and the unit it is measured in.
   */
  lead_time?: MaterialsAPI.QuantityInputRequest;

  /**
   * Material notes.
   */
  notes?: string;

  /**
   * A quantity, given as a decimal value and the unit it is measured in.
   */
  order_point?: MaterialsAPI.QuantityInputRequest;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_cost?: MaterialsAPI.RateInput;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

/**
 * Property name + value pair attached to a material. The property and its value
 * (an attribute) are created if they do not yet exist.
 */
export interface UpsertMaterialProperty {
  /**
   * Property name (e.g. "Grade"). Matched case-insensitively; created if missing.
   */
  name: string;

  /**
   * Property value (e.g. "A36"). Matched case-insensitively; created under the
   * property if missing. A value already in use under a different property fails the
   * whole job.
   */
  value: string;
}

export interface ActionBulkUpsertParams {
  /**
   * Body param: Materials to create or update, matched by SKU within the account.
   */
  materials: Array<UpsertMaterialInput>;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export declare namespace Actions {
  export {
    type BulkUpsertMaterialsRequest as BulkUpsertMaterialsRequest,
    type UpsertMaterialInput as UpsertMaterialInput,
    type UpsertMaterialProperty as UpsertMaterialProperty,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
