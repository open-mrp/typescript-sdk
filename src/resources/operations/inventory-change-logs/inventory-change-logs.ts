// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as BlocksAPI from '../../messaging/blocks';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ItemsAPI from '../../catalog/items/items';
import * as MaterialsAPI from '../../catalog/materials/materials';
import * as ActionsAPI from './actions';
import { ActionExportParams, Actions, FileDownload } from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and export inventory change logs.
 */
export class InventoryChangeLogs extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of inventory change logs, newest first.
   *
   * Filters combine with AND, while the values within a single filter combine with
   * OR. The `q` search term matches changes affecting items whose SKU contains it,
   * as a case-insensitive substring.
   *
   * This endpoint requires the permission: `inventory_logs:read`.
   *
   * @example
   * ```ts
   * const listInventoryChangeLog =
   *   await client.operations.inventoryChangeLogs.list();
   * ```
   */
  list(
    query: InventoryChangeLogListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListInventoryChangeLog> {
    return this._client.get('/v1/operations/inventory-change-logs', { query, ...options });
  }

  /**
   * Returns an inventory change log by ID.
   *
   * This endpoint requires the permission: `inventory_logs:read`.
   *
   * @example
   * ```ts
   * const inventoryChangeLog =
   *   await client.operations.inventoryChangeLogs.retrieve(
   *     'icl_kb4dlhqx4voe',
   *   );
   * ```
   */
  retrieve(
    id: string,
    query: InventoryChangeLogRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<InventoryChangeLog> {
    return this._client.get(path`/v1/operations/inventory-change-logs/${id}`, { query, ...options });
  }
}

/**
 * A record of a single change to an item's on-hand inventory.
 *
 * Every inventory movement — production scans, manual user adjustments, and
 * automatic system actions — produces one entry, forming an audit trail of how
 * on-hand quantities changed over time.
 */
export interface InventoryChangeLog {
  /**
   * Inventory change log ID.
   */
  id: string;

  /**
   * Action that produced this inventory change.
   *
   * - `scan`: change driven by a scan, typically a production step.
   * - `user_action`: change made manually by a user.
   * - `system_action`: change made automatically by the system.
   * - `user_correction`: manual adjustment a user made to correct an inventory
   *   discrepancy.
   */
  action_type: 'scan' | 'user_action' | 'system_action' | 'user_correction';

  /**
   * Timestamp when this change was recorded.
   */
  created_at: string;

  /**
   * An entry in your catalog: something you sell, consume, or build with.
   */
  item: ItemsAPI.Item | null;

  /**
   * Resource type identifier.
   */
  object: 'inventory_change_log';

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  quantity: MaterialsAPI.Quantity | null;

  /**
   * A station on the production floor where operators scan batches to perform a
   * batch operation, such as initializing or moving a batch.
   */
  responsible_scanning_station: BlocksAPI.ScanningStation | null;

  /**
   * A user's global profile, shared across every account they belong to.
   *
   * Account-specific settings (status, role, department) live on the account user
   * resource that links the user to each account.
   */
  responsible_user: BlocksAPI.User | null;

  /**
   * Timestamp when this record was last updated.
   */
  updated_at: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListInventoryChangeLog {
  /**
   * Resources in this page.
   */
  data: Array<InventoryChangeLog>;

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

export interface InventoryChangeLogListParams {
  /**
   * Restricts results to these action types.
   */
  action_types?: Array<'scan' | 'user_action' | 'system_action' | 'user_correction'>;

  /**
   * Restricts results to changes made by these users.
   *
   * Changes that were recorded without a responsible user are excluded whenever this
   * filter is set.
   */
  changed_by_user_ids?: Array<string>;

  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Restricts results to change logs created on or before this timestamp.
   */
  ends_at?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'item' | 'responsible_user' | 'responsible_scanning_station'>;

  /**
   * Restricts results to changes affecting these items.
   */
  item_ids?: Array<string>;

  /**
   * Maximum number of results to return in a single page.
   */
  limit?: number;

  /**
   * Free-text search term used to filter results.
   *
   * Which fields are matched against the term varies by endpoint.
   */
  q?: string;

  /**
   * Restricts results to change logs created on or after this timestamp.
   *
   * Defaults to 90 days before `ends_at`, or before now when `ends_at` is also
   * omitted, unless `item_ids` is given — an item's history is returned whole. Pass
   * an earlier timestamp to search further back.
   */
  starts_at?: string;
}

export interface InventoryChangeLogRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'item' | 'responsible_user' | 'responsible_scanning_station'>;
}

InventoryChangeLogs.Actions = Actions;

export declare namespace InventoryChangeLogs {
  export {
    type InventoryChangeLog as InventoryChangeLog,
    type ListInventoryChangeLog as ListInventoryChangeLog,
    type InventoryChangeLogListParams as InventoryChangeLogListParams,
    type InventoryChangeLogRetrieveParams as InventoryChangeLogRetrieveParams,
  };

  export {
    Actions as Actions,
    type FileDownload as FileDownload,
    type ActionExportParams as ActionExportParams,
  };
}
