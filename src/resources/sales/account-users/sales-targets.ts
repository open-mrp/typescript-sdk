// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as MaterialsAPI from '../../catalog/materials/materials';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage sales targets for account users.
 */
export class SalesTargets extends APIResource {
  /**
   * Returns the revenue goals set for one sales rep, most recent period first.
   *
   * This endpoint does not support cursor pagination; passing a `cursor` returns a
   * validation error, and the response carries no page cursors. Requesting targets
   * for someone who is not an active account user in your account returns a
   * not-found error.
   *
   * Pass `q` to narrow the list to targets whose ID or goal amount contains the
   * search text.
   *
   * This endpoint requires the permission: `sales_targets:read`.
   *
   * @example
   * ```ts
   * const listSalesTarget =
   *   await client.sales.accountUsers.salesTargets.list(
   *     'acus_e5zu8bde0z3h',
   *   );
   * ```
   */
  list(
    id: string,
    query: SalesTargetListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListSalesTarget> {
    return this._client.get(path`/v1/sales/account-users/${id}/sales-targets`, { query, ...options });
  }

  /**
   * Creates a revenue goal for a sales rep covering a given period.
   *
   * The sales rep must be an active account user in your account, otherwise the
   * request returns a not-found error. Periods are not checked for overlap, so a rep
   * can hold several targets covering the same dates; use the upsert endpoint to
   * change an existing target rather than adding another.
   *
   * This endpoint requires the permission: `sales_targets:create`.
   *
   * @example
   * ```ts
   * const salesTarget =
   *   await client.sales.accountUsers.salesTargets.create(
   *     'acus_e5zu8bde0z3h',
   *     {
   *       amount_unit_id: 'un_82bd37dae5po',
   *       amount_value: '50000.00',
   *       ends_at: '2026-03-31T00:00:00Z',
   *       starts_at: '2026-01-01T00:00:00Z',
   *     },
   *   );
   * ```
   */
  create(id: string, body: SalesTargetCreateParams, options?: RequestOptions): APIPromise<SalesTarget> {
    return this._client.post(path`/v1/sales/account-users/${id}/sales-targets`, { body, ...options });
  }

  /**
   * Creates or updates a sales rep's revenue goal at an ID you choose.
   *
   * If no target with the given ID exists, one is created with the supplied dates,
   * amount, and unit. If it already exists, only the amount value is updated — the
   * dates and unit are left unchanged, so raising or lowering a goal mid-period is
   * the intended use. The sales rep must be an active account user in your account,
   * and an existing target must be filed under that rep, otherwise the request
   * returns a not-found error.
   *
   * This endpoint requires the permission: `sales_targets:update`.
   *
   * @example
   * ```ts
   * const salesTarget =
   *   await client.sales.accountUsers.salesTargets.update(
   *     'example',
   *     {
   *       id: 'acus_e5zu8bde0z3h',
   *       amount_unit_id: 'un_82bd37dae5po',
   *       amount_value: '75000.00',
   *       ends_at: '2026-06-30T00:00:00Z',
   *       starts_at: '2026-04-01T00:00:00Z',
   *     },
   *   );
   * ```
   */
  update(
    targetID: string,
    params: SalesTargetUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SalesTarget> {
    const { id, ...body } = params;
    return this._client.put(path`/v1/sales/account-users/${id}/sales-targets/${targetID}`, {
      body,
      ...options,
    });
  }
}

/**
 * Request to create a sales target.
 */
export interface CreateSalesTargetRequest {
  /**
   * The unit the goal is denominated in, typically a currency unit. It must be one
   * of your account's units or a unit every account shares.
   */
  amount_unit_id: string;

  /**
   * The revenue goal for the period, as a decimal string (e.g. `50000.00`).
   */
  amount_value: string;

  /**
   * End of the period the target applies to. It may not be before `starts_at`.
   */
  ends_at: string;

  /**
   * Start of the period the target applies to (inclusive).
   */
  starts_at: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListSalesTarget {
  /**
   * Resources in this page.
   */
  data: Array<SalesTarget>;

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
 * A revenue goal assigned to a sales rep for a specific time period.
 */
export interface SalesTarget {
  /**
   * Sales target ID.
   */
  id: string;

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  amount: MaterialsAPI.Quantity | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * End of the period this target applies to (e.g. the close of a quarter).
   */
  end_at: string;

  /**
   * Resource type identifier.
   */
  object: 'sales_target';

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  sales_rep: CoreAPI.Entity | null;

  /**
   * Start of the period this target applies to (inclusive).
   */
  start_at: string;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Request to create or update a sales target.
 */
export interface UpsertSalesTargetRequest {
  /**
   * The unit the goal is denominated in, typically a currency unit. It must be one
   * of your account's units or a unit every account shares.
   *
   * Only applied when creating a new target; the unit on an existing target is not
   * changed.
   */
  amount_unit_id: string;

  /**
   * The revenue goal for the period, as a decimal string (e.g. `75000.00`).
   *
   * This is the only value an existing target accepts; everything else on it stays
   * as it was.
   */
  amount_value: string;

  /**
   * End of the period the target applies to. It may not be before `starts_at`.
   *
   * Only applied when creating a new target; the dates on an existing target are not
   * changed.
   */
  ends_at: string;

  /**
   * Start of the period the target applies to (inclusive).
   *
   * Only applied when creating a new target; the dates on an existing target are not
   * changed.
   */
  starts_at: string;
}

export interface SalesTargetListParams {
  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

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
}

export interface SalesTargetCreateParams {
  /**
   * The unit the goal is denominated in, typically a currency unit. It must be one
   * of your account's units or a unit every account shares.
   */
  amount_unit_id: string;

  /**
   * The revenue goal for the period, as a decimal string (e.g. `50000.00`).
   */
  amount_value: string;

  /**
   * End of the period the target applies to. It may not be before `starts_at`.
   */
  ends_at: string;

  /**
   * Start of the period the target applies to (inclusive).
   */
  starts_at: string;
}

export interface SalesTargetUpdateParams {
  /**
   * Path param: The account user (sales rep) the target is for.
   *
   * Must be an active account user in your account. Only applied when creating a new
   * target; the rep on an existing target is not changed.
   */
  id: string;

  /**
   * Body param: The unit the goal is denominated in, typically a currency unit. It
   * must be one of your account's units or a unit every account shares.
   *
   * Only applied when creating a new target; the unit on an existing target is not
   * changed.
   */
  amount_unit_id: string;

  /**
   * Body param: The revenue goal for the period, as a decimal string (e.g.
   * `75000.00`).
   *
   * This is the only value an existing target accepts; everything else on it stays
   * as it was.
   */
  amount_value: string;

  /**
   * Body param: End of the period the target applies to. It may not be before
   * `starts_at`.
   *
   * Only applied when creating a new target; the dates on an existing target are not
   * changed.
   */
  ends_at: string;

  /**
   * Body param: Start of the period the target applies to (inclusive).
   *
   * Only applied when creating a new target; the dates on an existing target are not
   * changed.
   */
  starts_at: string;
}

export declare namespace SalesTargets {
  export {
    type CreateSalesTargetRequest as CreateSalesTargetRequest,
    type ListSalesTarget as ListSalesTarget,
    type SalesTarget as SalesTarget,
    type UpsertSalesTargetRequest as UpsertSalesTargetRequest,
    type SalesTargetListParams as SalesTargetListParams,
    type SalesTargetCreateParams as SalesTargetCreateParams,
    type SalesTargetUpdateParams as SalesTargetUpdateParams,
  };
}
