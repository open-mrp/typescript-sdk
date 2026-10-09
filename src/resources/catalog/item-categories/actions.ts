// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from '../../core/jobs';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and manage item categories.
 */
export class Actions extends APIResource {
  /**
   * Creates or updates multiple item categories for the account, matched by name
   * (case-insensitive), then writes asynchronously — 202 with a job to poll.
   *
   * This endpoint requires the permissions: `item_categories:create` and
   * `item_categories:update`.
   *
   * @example
   * ```ts
   * const job =
   *   await client.catalog.itemCategories.actions.bulkUpsert({
   *     item_categories: [
   *       {
   *         name: 'Electronics',
   *         type: 'material_category',
   *         unit_group: { id: 'ug_andst6m79n41' },
   *         property_names: [],
   *         notes: null,
   *       },
   *     ],
   *   });
   * ```
   */
  bulkUpsert(params: ActionBulkUpsertParams, options?: RequestOptions): APIPromise<JobsAPI.Job> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/item-categories/actions/bulk-upsert', {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * BulkUpsertItemCategoriesRequest is the request to bulk upsert item categories.
 */
export interface BulkUpsertItemCategoriesRequest {
  /**
   * Item categories to create or update, matched by name within the account.
   */
  item_categories: Array<UpsertItemCategoryInput>;
}

/**
 * -------------------------- Named Object -------------------------- Identifies an
 * object by its id or its name. An id wins when both are given.
 */
export interface ObjectIdentifier {
  /**
   * Object ID.
   */
  id: string;

  /**
   * Object name, matched case-insensitively.
   */
  name: string;
}

/**
 * UpsertItemCategoryInput is the input for a single item category in a bulk upsert
 * operation.
 */
export interface UpsertItemCategoryInput {
  /**
   * Display name of the item category, used to match existing categories.
   */
  name: string;

  /**
   * Optional notes.
   */
  notes: string | null;

  /**
   * Optional list of property names to attach to this category. Properties are
   * matched by name (case-insensitive) within the account; names not found are
   * created automatically. Relations are additive — existing relations are not
   * removed.
   */
  property_names: Array<string>;

  /**
   * Item category type code. Create-only.
   */
  type: 'material_category' | 'product_category';

  /**
   * -------------------------- Named Object -------------------------- Identifies an
   * object by its id or its name. An id wins when both are given.
   */
  unit_group: ObjectIdentifier;
}

export interface ActionBulkUpsertParams {
  /**
   * Body param: Item categories to create or update, matched by name within the
   * account.
   */
  item_categories: Array<UpsertItemCategoryInput>;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export declare namespace Actions {
  export {
    type BulkUpsertItemCategoriesRequest as BulkUpsertItemCategoriesRequest,
    type ObjectIdentifier as ObjectIdentifier,
    type UpsertItemCategoryInput as UpsertItemCategoryInput,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
