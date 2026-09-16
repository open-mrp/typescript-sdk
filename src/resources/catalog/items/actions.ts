// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as InventoryAPI from './inventory';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and manage inventory items.
 */
export class Actions extends APIResource {
  /**
   * Reconciles inventory for multiple items by SKU in one call, the bulk equivalent
   * of counting stock and correcting the books.
   *
   * `reconcile_type` controls whether each quantity is added to the item's current
   * quantity (`addition`) or replaces it (`force`). The figure a `force` measures
   * against is what is on hand net of demand nothing has covered, the same basis the
   * single-item endpoint uses. The response reports each item as reconciled, skipped
   * (e.g. unknown SKU), or errored (e.g. unknown unit), so a problem with one item
   * does not fail the rest of the batch.
   *
   * Each correction is written to the item's inventory audit trail as a user
   * correction, attributed to the caller.
   *
   * This endpoint requires the permission: `items:create`.
   *
   * @example
   * ```ts
   * const bulkReconcileItemsResponse =
   *   await client.catalog.items.actions.bulkReconcile({
   *     data: [
   *       {
   *         sku: 'ALM-2024-1001',
   *         unit: 'kg',
   *         quantity: '10.5',
   *       },
   *     ],
   *     reconcile_type: 'addition',
   *   });
   * ```
   */
  bulkReconcile(
    body: ActionBulkReconcileParams,
    options?: RequestOptions,
  ): APIPromise<BulkReconcileItemsResponse> {
    return this._client.post('/v1/catalog/items/actions/bulk-reconcile', { body, ...options });
  }
}

/**
 * One item to reconcile in a bulk reconcile request.
 */
export interface BulkReconcileItemInput {
  /**
   * Quantity to apply, interpreted according to the request's `reconcile_type`.
   *
   * A decimal string rather than a number: a quantity that has been through a binary
   * float is not the quantity you sent.
   */
  quantity: string;

  /**
   * SKU of the item to reconcile.
   *
   * Items whose SKU does not match an existing item are reported in the response's
   * `skipped_items` rather than failing the request.
   */
  sku: string;

  /**
   * Abbreviation of a unit available to your account (e.g. `kg`).
   *
   * The unit is checked for existence only: the quantity is always recorded in the
   * item's own base unit, so send figures already expressed in that unit. Rows
   * naming an abbreviation that matches no built-in or account-defined unit are
   * reported in the response's `errors`.
   */
  unit: string;
}

/**
 * Request to reconcile inventory for many items at once.
 */
export interface BulkReconcileItemsRequest {
  /**
   * Items to reconcile.
   */
  data: Array<BulkReconcileItemInput>;

  /**
   * How each item's quantity is applied to its current quantity.
   *
   * - `addition`: adds the quantity to the item's current quantity.
   * - `force`: sets the item's current quantity to exactly the given quantity.
   */
  reconcile_type: 'addition' | 'force';
}

/**
 * The outcome of a bulk inventory reconciliation, reported as three separate
 * lists.
 */
export interface BulkReconcileItemsResponse {
  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  errors: ListReconcileErrorResult | null;

  /**
   * Resource type identifier.
   */
  object: 'bulk_reconcile_items_response';

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  reconciled_items: ListReconciledItemResult | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  skipped_items: ListSkippedItemResult | null;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListReconcileErrorResult {
  /**
   * Resources in this page.
   */
  data: Array<ReconcileErrorResult>;

  /**
   * Resource type identifier.
   */
  object: 'list';

  /**
   * PageInfo describes where the current page sits within a paginated result set and
   * how to move to the adjacent pages.
   *
   * Page a list by following the URLs below rather than assembling cursors yourself.
   * For a top-level list endpoint the URL repeats the original request's query
   * string with only the cursor swapped, so following it preserves the same filters,
   * search term, and page size.
   */
  page_info: APIKeysAPI.PageInfo;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListReconciledItemResult {
  /**
   * Resources in this page.
   */
  data: Array<ReconciledItemResult>;

  /**
   * Resource type identifier.
   */
  object: 'list';

  /**
   * PageInfo describes where the current page sits within a paginated result set and
   * how to move to the adjacent pages.
   *
   * Page a list by following the URLs below rather than assembling cursors yourself.
   * For a top-level list endpoint the URL repeats the original request's query
   * string with only the cursor swapped, so following it preserves the same filters,
   * search term, and page size.
   */
  page_info: APIKeysAPI.PageInfo;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListSkippedItemResult {
  /**
   * Resources in this page.
   */
  data: Array<SkippedItemResult>;

  /**
   * Resource type identifier.
   */
  object: 'list';

  /**
   * PageInfo describes where the current page sits within a paginated result set and
   * how to move to the adjacent pages.
   *
   * Page a list by following the URLs below rather than assembling cursors yourself.
   * For a top-level list endpoint the URL repeats the original request's query
   * string with only the cursor swapped, so following it preserves the same filters,
   * search term, and page size.
   */
  page_info: APIKeysAPI.PageInfo;
}

/**
 * A submitted row that could not be reconciled.
 */
export interface ReconcileErrorResult {
  /**
   * Error message.
   */
  error: string;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * Resource type identifier.
   */
  object: 'reconcile_error_result';
}

/**
 * An item whose on-hand quantity was successfully reconciled.
 *
 * Both quantities are expressed in the item's own base unit, not in the unit
 * submitted with the request, and both arrive with that unit resolved.
 */
export interface ReconciledItemResult {
  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * An amount calculated on demand rather than stored.
   *
   * The same shape as a quantity minus the ID, because nothing was written: it is
   * derived per request, such as a total rolled up across invoiced lines for one
   * analysis.
   */
  new_quantity: InventoryAPI.ComputedQuantity | null;

  /**
   * Resource type identifier.
   */
  object: 'reconciled_item_result';

  /**
   * An amount calculated on demand rather than stored.
   *
   * The same shape as a quantity minus the ID, because nothing was written: it is
   * derived per request, such as a total rolled up across invoiced lines for one
   * analysis.
   */
  previous_quantity: InventoryAPI.ComputedQuantity | null;
}

/**
 * A submitted row that was skipped rather than reconciled.
 *
 * A skipped row is reported by the SKU it was submitted under rather than as an
 * item reference, because the usual reason to skip one is that no item carries
 * that SKU — there is nothing to point at.
 */
export interface SkippedItemResult {
  /**
   * Resource type identifier.
   */
  object: 'skipped_item_result';

  /**
   * Human-readable reason the item was skipped.
   */
  reason: string;

  /**
   * Item SKU, as submitted.
   */
  sku: string;
}

export interface ActionBulkReconcileParams {
  /**
   * Items to reconcile.
   */
  data: Array<BulkReconcileItemInput>;

  /**
   * How each item's quantity is applied to its current quantity.
   *
   * - `addition`: adds the quantity to the item's current quantity.
   * - `force`: sets the item's current quantity to exactly the given quantity.
   */
  reconcile_type: 'addition' | 'force';
}

export declare namespace Actions {
  export {
    type BulkReconcileItemInput as BulkReconcileItemInput,
    type BulkReconcileItemsRequest as BulkReconcileItemsRequest,
    type BulkReconcileItemsResponse as BulkReconcileItemsResponse,
    type ListReconcileErrorResult as ListReconcileErrorResult,
    type ListReconciledItemResult as ListReconciledItemResult,
    type ListSkippedItemResult as ListSkippedItemResult,
    type ReconcileErrorResult as ReconcileErrorResult,
    type ReconciledItemResult as ReconciledItemResult,
    type SkippedItemResult as SkippedItemResult,
    type ActionBulkReconcileParams as ActionBulkReconcileParams,
  };
}
