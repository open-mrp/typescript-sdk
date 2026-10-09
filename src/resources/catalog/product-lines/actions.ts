// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from '../../core/jobs';
import * as ActionsAPI from '../item-categories/actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and manage product lines.
 */
export class Actions extends APIResource {
  /**
   * Creates or updates multiple product lines for the account, matched by name
   * (case-insensitive), then writes asynchronously — 202 with a job to poll.
   *
   * This endpoint requires the permissions: `product_lines:create` and
   * `product_lines:update`.
   *
   * @example
   * ```ts
   * const job =
   *   await client.catalog.productLines.actions.bulkUpsert({
   *     product_lines: [
   *       {
   *         name: 'Industrial Fasteners',
   *         unit_group: { id: 'ug_andst6m79n41' },
   *         commission_policy: 'commission_exempt',
   *         freight_policy: 'billed_freight',
   *       },
   *     ],
   *   });
   * ```
   */
  bulkUpsert(params: ActionBulkUpsertParams, options?: RequestOptions): APIPromise<JobsAPI.Job> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/product-lines/actions/bulk-upsert', {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * BulkUpsertProductLinesRequest is the request to bulk upsert product lines.
 */
export interface BulkUpsertProductLinesRequest {
  /**
   * Product lines to create or update, matched by name within the account.
   */
  product_lines: Array<UpsertProductLineInput>;
}

/**
 * UpsertProductLineInput is the input for a single product line in a bulk upsert
 * operation.
 */
export interface UpsertProductLineInput {
  /**
   * Default commission policy for products in this product line.
   *
   * - `commission_exempt`: no commission applies to these products.
   * - `commission_applied`: commission applies to these products, unless overridden
   *   elsewhere.
   */
  commission_policy: 'commission_applied' | 'commission_exempt';

  /**
   * Default freight policy for products in this product line.
   *
   * - `free_freight`: these products do not incur a freight charge.
   * - `billed_freight`: freight is billed for these products, unless overridden
   *   elsewhere.
   */
  freight_policy: 'free_freight' | 'billed_freight';

  /**
   * Display name of the product line, matched case-insensitively against existing
   * lines. A row matching a system product line fails — system lines cannot be
   * modified.
   */
  name: string;

  /**
   * -------------------------- Named Object -------------------------- Identifies an
   * object by its id or its name. An id wins when both are given.
   */
  unit_group: ActionsAPI.ObjectIdentifier;
}

export interface ActionBulkUpsertParams {
  /**
   * Body param: Product lines to create or update, matched by name within the
   * account.
   */
  product_lines: Array<UpsertProductLineInput>;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;
}

export declare namespace Actions {
  export {
    type BulkUpsertProductLinesRequest as BulkUpsertProductLinesRequest,
    type UpsertProductLineInput as UpsertProductLineInput,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
