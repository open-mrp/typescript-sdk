// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as JobsAPI from '../../core/jobs';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and export inventory change logs.
 */
export class Actions extends APIResource {
  /**
   * Exports inventory change logs matching the provided filters as an Excel file.
   *
   * Unlike the list endpoint, results are not paginated — every matching change log
   * is included in the download, newest first. The download is named for the date
   * range you requested, using `all` in place of a bound you left open.
   *
   * This endpoint is deprecated: the file is built inside the request, so a wide
   * window on a busy account can outlast the request timeout. Use
   * `POST /v1/operations/inventory-change-logs/actions/export` instead, which builds
   * the same file in the background and returns a job to poll.
   *
   * This endpoint requires the permission: `inventory_logs:read`.
   *
   * @example
   * ```ts
   * const fileDownload =
   *   await client.operations.inventoryChangeLogs.actions.export();
   * ```
   */
  export(
    query: ActionExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<FileDownload> {
    return this._client.get('/v1/operations/inventory-change-logs/actions/export', { query, ...options });
  }

  /**
   * Starts an export of every inventory change log the filters select and returns
   * the job that tracks it.
   *
   * Poll the job; once it completes, `export.url` links to the Excel file. The file
   * has one row per change log, newest first, with the same columns as the
   * synchronous export, and is named for the window you asked for —
   * `inventory-change-logs-<starts_at>-<ends_at>.xlsx`, each bound as its UTC date
   * and `all` in place of a bound you left open. A file with more change logs than
   * one worksheet holds continues on further worksheets.
   *
   * This endpoint requires the permission: `inventory_logs:read`.
   *
   * @example
   * ```ts
   * const job =
   *   await client.operations.inventoryChangeLogs.actions.startExport(
   *     {
   *       action_types: ['scan'],
   *       ends_at: '2026-03-31T00:00:00Z',
   *       starts_at: '2026-01-01T00:00:00Z',
   *     },
   *   );
   * ```
   */
  startExport(
    params: ActionStartExportParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<JobsAPI.Job> {
    const { include, ...body } = params ?? {};
    return this._client.post('/v1/operations/inventory-change-logs/actions/export', {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * FileDownload is a response type for endpoints that return a file (e.g. Excel
 * export). When the service returns \*FileDownload, the handler writes the body
 * with Content-Type and Content-Disposition.
 */
export interface FileDownload {}

/**
 * Filters which inventory change logs land in the exported file.
 */
export interface StartInventoryChangeLogsExportRequest {
  /**
   * Restricts the file to these action types.
   */
  action_types?: Array<'scan' | 'user_action' | 'system_action' | 'user_correction'>;

  /**
   * Restricts the file to changes made by these users.
   *
   * Changes that were recorded without a responsible user are excluded whenever this
   * filter is set.
   */
  changed_by_user_ids?: Array<string>;

  /**
   * Restricts the file to change logs created on or before this timestamp.
   */
  ends_at?: string;

  /**
   * Restricts the file to changes affecting these items.
   */
  item_ids?: Array<string>;

  /**
   * Restricts the file to change logs created on or after this timestamp.
   *
   * Unlike the list, no default window applies: leave it out to export from the
   * account's first change.
   */
  starts_at?: string;
}

export interface ActionExportParams {
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
   * Restricts results to change logs created on or before this timestamp.
   */
  ends_at?: string;

  /**
   * Restricts results to changes affecting these items.
   */
  item_ids?: Array<string>;

  /**
   * Restricts results to change logs created on or after this timestamp.
   */
  starts_at?: string;
}

export interface ActionStartExportParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'created_by' | 'created_by.role'>;

  /**
   * Body param: Restricts the file to these action types.
   */
  action_types?: Array<'scan' | 'user_action' | 'system_action' | 'user_correction'>;

  /**
   * Body param: Restricts the file to changes made by these users.
   *
   * Changes that were recorded without a responsible user are excluded whenever this
   * filter is set.
   */
  changed_by_user_ids?: Array<string>;

  /**
   * Body param: Restricts the file to change logs created on or before this
   * timestamp.
   */
  ends_at?: string;

  /**
   * Body param: Restricts the file to changes affecting these items.
   */
  item_ids?: Array<string>;

  /**
   * Body param: Restricts the file to change logs created on or after this
   * timestamp.
   *
   * Unlike the list, no default window applies: leave it out to export from the
   * account's first change.
   */
  starts_at?: string;
}

export declare namespace Actions {
  export {
    type FileDownload as FileDownload,
    type StartInventoryChangeLogsExportRequest as StartInventoryChangeLogsExportRequest,
    type ActionExportParams as ActionExportParams,
    type ActionStartExportParams as ActionStartExportParams,
  };
}
