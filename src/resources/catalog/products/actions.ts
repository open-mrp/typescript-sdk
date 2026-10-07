// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from '../../core/jobs';
import * as ActionsAPI from '../item-categories/actions';
import * as MaterialsAPI from '../materials/materials';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and manage products.
 */
export class Actions extends APIResource {
  /**
   * Creates or updates multiple products for the account, matched by SKU. Validates
   * and resolves synchronously, then writes asynchronously — 202 with a job to poll.
   *
   * At most 1,000 products and an 8 MB request body per call.
   *
   * @example
   * ```ts
   * const job =
   *   await client.catalog.products.actions.bulkUpsert({
   *     products: [
   *       {
   *         sku: 'ALM-2024-1001',
   *         category: { id: 'ic_d06g9c6yc9ck' },
   *         properties: [],
   *       },
   *     ],
   *   });
   * ```
   */
  bulkUpsert(params: ActionBulkUpsertParams, options?: RequestOptions): APIPromise<JobsAPI.Job> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/products/actions/bulk-upsert', {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * Request to bulk upsert products.
 */
export interface BulkUpsertProductsRequest {
  /**
   * Products to create or update, matched by SKU within the account.
   */
  products: Array<UpsertProductInput>;
}

/**
 * Input for a single product in a bulk upsert operation.
 */
export interface UpsertProductInput {
  /**
   * -------------------------- Named Object -------------------------- Identifies an
   * object by its id or its name. An id wins when both are given.
   */
  category: ActionsAPI.ObjectIdentifier;

  /**
   * Properties to attach to the product, matched/created by name + value. Additive —
   * existing attributes are not removed.
   */
  properties: Array<UpsertProductProperty>;

  /**
   * SKU for the product, used to match an existing product within the account. If it
   * exists the product is updated in place; otherwise a new product is created. A
   * SKU already used by a non-product item fails that row.
   */
  sku: string;

  /**
   * Product description.
   */
  description?: string;

  /**
   * Product notes.
   */
  notes?: string;

  /**
   * Whether the product is shown to buyers in the customer portal. Defaults to
   * `hidden` on create; preserved when omitted on update.
   */
  portal_visibility?: 'visible' | 'hidden';

  /**
   * -------------------------- Named Object -------------------------- Identifies an
   * object by its id or its name. An id wins when both are given.
   */
  product_line?: ActionsAPI.ObjectIdentifier;

  /**
   * Product type. Create-only; defaults to `sale` when omitted.
   */
  type?: 'sale' | 'service' | 'shipping' | 'credit' | 'return' | 'tax';

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
 * Property name + value pair attached to a product. The property and its value (an
 * attribute) are created if they do not yet exist.
 */
export interface UpsertProductProperty {
  /**
   * Property name (e.g. "Color"). Matched case-insensitively; created if missing.
   */
  name: string;

  /**
   * Property value (e.g. "Red"). Matched case-insensitively; created under the
   * property if missing. A value already in use under a different property fails the
   * whole job.
   */
  value: string;
}

export interface ActionBulkUpsertParams {
  /**
   * Body param: Products to create or update, matched by SKU within the account.
   */
  products: Array<UpsertProductInput>;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export declare namespace Actions {
  export {
    type BulkUpsertProductsRequest as BulkUpsertProductsRequest,
    type UpsertProductInput as UpsertProductInput,
    type UpsertProductProperty as UpsertProductProperty,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
