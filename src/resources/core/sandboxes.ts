// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * List and manage sandbox environments.
 */
export class Sandboxes extends APIResource {
  /**
   * Returns a paginated list of the sandboxes owned by your production account,
   * newest first.
   *
   * The `q` search term matches the sandbox name. Sandboxes cannot be listed while
   * acting in a sandbox.
   *
   * This endpoint requires the permission: `sandboxes:read`.
   *
   * @example
   * ```ts
   * const listSandbox = await client.core.sandboxes.list();
   * ```
   */
  list(query: SandboxListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ListSandbox> {
    return this._client.get('/v1/core/sandboxes', { query, ...options });
  }

  /**
   * Returns a single sandbox by ID.
   *
   * Only sandboxes owned by your production account are visible; any other sandbox
   * is reported as not found. Sandboxes cannot be retrieved while acting in a
   * sandbox.
   *
   * This endpoint requires the permission: `sandboxes:read`.
   *
   * @example
   * ```ts
   * const sandbox = await client.core.sandboxes.retrieve(
   *   'sbac_d8ci32xggml9',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: SandboxRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Sandbox> {
    return this._client.get(path`/v1/core/sandboxes/${id}`, { query, ...options });
  }

  /**
   * Creates a sandbox account owned by your production account.
   *
   * The creating user is added to the new sandbox as an administrator, so it can be
   * switched into right away.
   *
   * When `mode` is `seeded`, sample data is populated asynchronously and may not be
   * available immediately after the sandbox is created. Sandboxes cannot be created
   * while acting in a sandbox.
   *
   * This endpoint requires the permission: `sandboxes:create`.
   *
   * @example
   * ```ts
   * const sandbox = await client.core.sandboxes.create({
   *   name: 'Integration Testing',
   *   mode: 'blank',
   * });
   * ```
   */
  create(params: SandboxCreateParams, options?: RequestOptions): APIPromise<Sandbox> {
    const { include, ...body } = params;
    return this._client.post('/v1/core/sandboxes', { query: { include }, body, ...options });
  }

  /**
   * Deletes a sandbox account and everything inside it.
   *
   * The sandbox becomes inaccessible as soon as this call returns, but its data is
   * purged asynchronously and may persist briefly. Deletion is permanent: the
   * sandbox cannot be restored, and deleting it again reports that it has already
   * been deleted. Sandboxes cannot be deleted while acting in a sandbox.
   *
   * This endpoint requires the permission: `sandboxes:delete`.
   *
   * @example
   * ```ts
   * const sandbox = await client.core.sandboxes.delete(
   *   'sbac_d8ci32xggml9',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<SandboxDeleteResponse> {
    return this._client.delete(path`/v1/core/sandboxes/${id}`, options);
  }
}

/**
 * Request to create a sandbox.
 */
export interface CreateSandboxRequest {
  /**
   * Display name of the sandbox.
   */
  name: string;

  /**
   * Controls how the sandbox is initialized.
   *
   * - `blank`: starts empty, with no pre-populated data.
   * - `seeded`: starts with sample data, populated asynchronously after the sandbox
   *   is created.
   */
  mode?: 'blank' | 'seeded';
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListSandbox {
  /**
   * Resources in this page.
   */
  data: Array<Sandbox>;

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
 * An isolated test account owned by a production account.
 *
 * A sandbox is a full account with its own data, so anything created or changed
 * inside it leaves your production data untouched.
 */
export interface Sandbox {
  /**
   * Sandbox ID.
   */
  id: string;

  /**
   * When this sandbox was created.
   */
  created_at: string;

  /**
   * Display name of the sandbox.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'sandbox';

  /**
   * An organization on OpenMRP, including its branding and customer portal
   * sub-resources.
   *
   * Your own account and any customer or supplier account you trade with are both
   * represented by this object.
   */
  owner_account: APIKeysAPI.Account | null;

  /**
   * When this sandbox was last updated.
   */
  updated_at: string;
}

export interface SandboxDeleteResponse {}

export interface SandboxListParams {
  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'owner_account'>;

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

export interface SandboxRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'owner_account'>;
}

export interface SandboxCreateParams {
  /**
   * Body param: Display name of the sandbox.
   */
  name: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'owner_account'>;

  /**
   * Body param: Controls how the sandbox is initialized.
   *
   * - `blank`: starts empty, with no pre-populated data.
   * - `seeded`: starts with sample data, populated asynchronously after the sandbox
   *   is created.
   */
  mode?: 'blank' | 'seeded';
}

export declare namespace Sandboxes {
  export {
    type CreateSandboxRequest as CreateSandboxRequest,
    type ListSandbox as ListSandbox,
    type Sandbox as Sandbox,
    type SandboxDeleteResponse as SandboxDeleteResponse,
    type SandboxListParams as SandboxListParams,
    type SandboxRetrieveParams as SandboxRetrieveParams,
    type SandboxCreateParams as SandboxCreateParams,
  };
}
