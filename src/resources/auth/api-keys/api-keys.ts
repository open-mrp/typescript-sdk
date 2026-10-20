// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ActionsAPI from './actions';
import { ActionRotateParams, Actions, RotateAPIKeyRequest } from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Create and manage API keys for programmatic access.
 */
export class APIKeys extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns [API key](https://docs.openmrp.ai/api/api-keys) metadata by ID.
   *
   * Only the redacted key value is returned. The full secret is available only in
   * the response that issued the key, so a lost secret must be replaced by rotating
   * the key.
   *
   * This endpoint requires the `admin` role type.
   *
   * @example
   * ```ts
   * const apiKey = await client.auth.apiKeys.retrieve(
   *   'apke_eiylmwr6q7oz',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: APIKeyRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIKey> {
    return this._client.get(path`/v1/auth/api-keys/${id}`, { query, ...options });
  }

  /**
   * Returns a paginated list of [API keys](https://docs.openmrp.ai/api/api-keys),
   * newest first.
   *
   * Only keys belonging to the account making the request are returned. The search
   * term matches against the key name.
   *
   * This endpoint requires the `admin` role type.
   *
   * @example
   * ```ts
   * const listAPIKey = await client.auth.apiKeys.list();
   * ```
   */
  list(query: APIKeyListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ListAPIKey> {
    return this._client.get('/v1/auth/api-keys', { query, ...options });
  }

  /**
   * Creates an [API key](https://docs.openmrp.ai/api/api-keys) to authenticate API
   * requests.
   *
   * The key belongs to the account it was created under and only ever acts on behalf
   * of that account. Keys created under a sandbox account carry an `mrp_sk_test_`
   * prefix; keys created under a production account carry an `mrp_sk_prod_` prefix.
   *
   * The secret key is returned once and cannot be retrieved later, so you should
   * store it securely. We provide some
   * [recommendations](https://docs.openmrp.ai/api/managing-api-keys) on how you can
   * manage your API keys.
   *
   * This endpoint requires the `admin` role type.
   *
   * @example
   * ```ts
   * const createdAPIKey = await client.auth.apiKeys.create({
   *   name: 'Production API Key',
   *   role_id: 'rl_3xknmfqflhvb',
   *   expires_at: '2027-01-01T00:00:00Z',
   * });
   * ```
   */
  create(params: APIKeyCreateParams, options?: RequestOptions): APIPromise<CreatedAPIKey> {
    const { include, ...body } = params;
    return this._client.post('/v1/auth/api-keys', { query: { include }, body, ...options });
  }

  /**
   * Revokes an [API key](https://docs.openmrp.ai/api/api-keys).
   *
   * Revocation takes effect immediately and cannot be undone; any request still
   * presenting the key is rejected. The key record is kept, so it stays visible in
   * the key list with a `revoked` status. To replace a key without an interruption
   * in access, use Rotate API Key instead.
   *
   * This endpoint requires the `admin` role type.
   *
   * @example
   * ```ts
   * const apiKey = await client.auth.apiKeys.delete(
   *   'apke_eiylmwr6q7oz',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<APIKeyDeleteResponse> {
    return this._client.delete(path`/v1/auth/api-keys/${id}`, options);
  }
}

/**
 * An organization on OpenMRP, including its branding and customer portal
 * sub-resources.
 *
 * Your own account and any customer or supplier account you trade with are both
 * represented by this object.
 */
export interface Account {
  /**
   * Account ID.
   */
  id: string;

  /**
   * The customer-facing branding an account presents on its portal, emails, and
   * documents.
   */
  branding: AccountBranding | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * A saved address that can be used for billing and shipping on sales orders,
   * invoices, and shipments.
   */
  default_billing_address: Address | null;

  /**
   * A saved address that can be used for billing and shipping on sales orders,
   * invoices, and shipments.
   */
  default_shipping_address: Address | null;

  /**
   * The account's display name.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'account';

  /**
   * The customer portal an account publishes for its customers to sign in to.
   */
  portal: AccountPortal | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * The customer-facing branding an account presents on its portal, emails, and
 * documents.
 */
export interface AccountBranding {
  /**
   * Branding ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Facebook handle.
   */
  facebook_handle: string | null;

  /**
   * Stored location of the account's customer-portal favicon.
   *
   * Favicons uploaded through the API are stored as an object key rather than a
   * fetchable link, so use the Get Account Favicon URL endpoint to obtain a download
   * URL.
   */
  favicon_url: string | null;

  /**
   * Instagram handle.
   */
  instagram_handle: string | null;

  /**
   * LinkedIn handle.
   */
  linkedin_handle: string | null;

  /**
   * Stored location of the account's logo image.
   *
   * Logos uploaded through the API are stored as an object key rather than a
   * fetchable link, so use the Get Account Logo URL endpoint to obtain a download
   * URL.
   */
  logo_url: string | null;

  /**
   * Resource type identifier.
   */
  object: 'account_branding';

  /**
   * The account's public contact phone number.
   */
  phone_number: string | null;

  /**
   * The email address customers are directed to for support.
   */
  support_email: string | null;

  /**
   * Twitter handle.
   */
  twitter_handle: string | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;

  /**
   * The account's public website.
   */
  website_url: string | null;
}

/**
 * The customer portal an account publishes for its customers to sign in to.
 */
export interface AccountPortal {
  /**
   * Portal ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Resource type identifier.
   */
  object: 'account_portal';

  /**
   * URL slug that identifies the account's customer portal.
   *
   * Unique across all accounts.
   */
  slug: string;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A saved address that can be used for billing and shipping on sales orders,
 * invoices, and shipments.
 */
export interface Address {
  /**
   * Address ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Email address associated with the address.
   */
  email: string | null;

  /**
   * The street-level location details of an address.
   */
  geolocation: Geolocation | null;

  /**
   * Display name of the address.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'address';

  /**
   * Phone number associated with the address.
   */
  phone: string | null;

  /**
   * The operating calendar naming the days this dock accepts freight.
   *
   * The most specific link in the receiving chain: set it when one of a customer's
   * sites keeps different days from the rest. Null falls through to the customer,
   * then their group, then the account default.
   */
  receive_calendar_id: string | null;

  /**
   * How the address is used.
   *
   * - `standard`: a normal shipping or billing address.
   * - `drop_ship`: an address an order is shipped to directly, typically a third
   *   party or end customer rather than the account itself.
   */
  type: 'standard' | 'drop_ship';

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * An API key used to authenticate requests to the OpenMRP API.
 *
 * A key always acts on behalf of the account it was created under, with the
 * permissions of the role assigned to it.
 */
export interface APIKey {
  /**
   * API key ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * When the key expires and stops authenticating requests.
   *
   * A key with no expiration keeps working until it is revoked or rotated.
   */
  expires_at: string | null;

  /**
   * When the key was last used to authenticate a request.
   *
   * Recorded at most once every 24 hours, so it can lag the key's most recent use by
   * up to a day.
   */
  last_used_at: string | null;

  /**
   * Human-readable name for the API key.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'api_key';

  /**
   * Redacted key value safe for display.
   *
   * The key's prefix followed by its last four characters, e.g.
   * `mrp_sk_prod_****hjt4`.
   */
  redacted_value: string;

  /**
   * When the key's revocation takes effect.
   *
   * A future timestamp means revocation was scheduled (for example, by a rotation)
   * and the key continues to authenticate requests until that time.
   */
  revoked_at: string | null;

  /**
   * A named set of permissions that can be assigned to users to control what they
   * can access.
   */
  role: Role | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Request to create an API key.
 */
export interface CreateAPIKeyRequest {
  /**
   * Human-readable name for the API key.
   *
   * Shown when listing keys and used to match keys when searching, so prefer
   * something that identifies the integration using it.
   */
  name: string;

  /**
   * ID of the role to assign to the API key.
   *
   * The role determines what requests authenticated with the key are allowed to do.
   * A key keeps its role for life — including through rotation — so issue a new key
   * to use a different one, while changes to the role's own permissions take effect
   * for existing keys immediately.
   */
  role_id: string;

  /**
   * When the key expires and stops authenticating requests.
   *
   * If omitted, the key keeps working until it is revoked or rotated.
   */
  expires_at?: string;
}

/**
 * A newly issued API key together with its secret value, returned when a key is
 * created or rotated.
 */
export interface CreatedAPIKey {
  /**
   * An API key used to authenticate requests to the OpenMRP API.
   *
   * A key always acts on behalf of the account it was created under, with the
   * permissions of the role assigned to it.
   */
  api_key_info: APIKey;

  /**
   * The secret used to authenticate requests, sent as a bearer token in the
   * `Authorization` header.
   *
   * This is the only response that ever contains the secret; if it is lost, rotate
   * the key to issue a new one. Learn more about
   * [managing your API keys](https://docs.openmrp.ai/api/managing-api-keys).
   */
  api_key_secret: string;

  /**
   * Resource type identifier.
   */
  object: 'created_api_key';
}

/**
 * The street-level location details of an address.
 */
export interface Geolocation {
  /**
   * Geolocation ID.
   */
  id: string;

  /**
   * Two-letter country code.
   */
  country: string;

  /**
   * City or locality.
   */
  locality: string | null;

  /**
   * Resource type identifier.
   */
  object: 'geolocation';

  /**
   * Postal or ZIP code.
   */
  postal_code: string | null;

  /**
   * State or administrative area.
   */
  state: string | null;

  /**
   * First line of the street address.
   */
  street_line_1: string | null;

  /**
   * Second line of the street address.
   */
  street_line_2: string | null;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListAPIKey {
  /**
   * Resources in this page.
   */
  data: Array<APIKey>;

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
  page_info: PageInfo;
}

/**
 * Owner describes the provenance of a resource.
 */
export interface Owner {
  /**
   * An organization on OpenMRP, including its branding and customer portal
   * sub-resources.
   *
   * Your own account and any customer or supplier account you trade with are both
   * represented by this object.
   */
  account: Account | null;

  /**
   * Resource type identifier.
   */
  object: 'owner';

  /**
   * Where this resource came from.
   *
   * - `system`: a platform-provided default shared across all accounts; not
   *   editable.
   * - `account`: created and owned by a specific account; the `account` field
   *   identifies which.
   */
  type: 'system' | 'account';
}

/**
 * PageInfo describes where the current page sits within a paginated result set and
 * how to move to the adjacent pages.
 *
 * Page a list by following the URLs below rather than assembling cursors yourself.
 * For a top-level list endpoint the URL repeats the original request's query
 * string with only the cursor swapped, so following it preserves the same filters,
 * search term, and page size.
 */
export interface PageInfo {
  /**
   * Whether more results exist after this page.
   */
  has_next_page: boolean;

  /**
   * Whether results exist before this page.
   */
  has_prev_page: boolean;

  /**
   * Relative URL that fetches the next page of results.
   */
  next_page_url: string | null;

  /**
   * Relative URL that fetches the previous page of results.
   */
  previous_page_url: string | null;
}

/**
 * A named set of permissions that can be assigned to users to control what they
 * can access.
 */
export interface Role {
  /**
   * Role ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Display name of the role.
   *
   * Unique within the account.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'role';

  /**
   * Owner describes the provenance of a resource.
   */
  owner: Owner | null;

  /**
   * Permissions granted by this role, in `{permission}:{action}` format, such as
   * `customers:read`.
   */
  permissions: Array<string> | null;

  /**
   * The kind of role.
   *
   * The type gates behavior that individual permissions do not cover, and some
   * actions are reserved for a single role type.
   *
   * - `admin`: full administrative access. Sensitive areas such as API keys and
   *   third-party integrations are restricted to admins no matter what permissions
   *   another role holds.
   * - `user`: a custom role tailored to a specific need, with its permissions
   *   defined explicitly. Roles created through the API always have this type.
   * - `scanner`: the role used by shop-floor scanning stations, assigned
   *   automatically when a scanning-station user is created.
   * - `sales_rep`: a role for sales representatives. Order analytics are scoped to
   *   the rep's own orders.
   * - `agent`: a role assigned to an automated agent rather than a person.
   */
  type: 'admin' | 'user' | 'scanner' | 'sales_rep' | 'agent';

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

export interface APIKeyDeleteResponse {}

export interface APIKeyRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'role' | 'role.permissions'>;
}

export interface APIKeyListParams {
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
  include?: Array<'role' | 'role.permissions'>;

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
   * API key statuses to filter by.
   *
   * - `active`: the key still authenticates requests. A key whose revocation is
   *   scheduled for a future time is still active until that time arrives.
   * - `expired`: the key passed its expiration time without having been revoked.
   * - `revoked`: the key was revoked, which takes precedence over expiration.
   *
   * When omitted, keys of every status are returned.
   */
  statuses?: Array<'active' | 'expired' | 'revoked'>;
}

export interface APIKeyCreateParams {
  /**
   * Body param: Human-readable name for the API key.
   *
   * Shown when listing keys and used to match keys when searching, so prefer
   * something that identifies the integration using it.
   */
  name: string;

  /**
   * Body param: ID of the role to assign to the API key.
   *
   * The role determines what requests authenticated with the key are allowed to do.
   * A key keeps its role for life — including through rotation — so issue a new key
   * to use a different one, while changes to the role's own permissions take effect
   * for existing keys immediately.
   */
  role_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'role' | 'role.permissions'>;

  /**
   * Body param: When the key expires and stops authenticating requests.
   *
   * If omitted, the key keeps working until it is revoked or rotated.
   */
  expires_at?: string;
}

APIKeys.Actions = Actions;

export declare namespace APIKeys {
  export {
    type Account as Account,
    type AccountBranding as AccountBranding,
    type AccountPortal as AccountPortal,
    type Address as Address,
    type APIKey as APIKey,
    type CreateAPIKeyRequest as CreateAPIKeyRequest,
    type CreatedAPIKey as CreatedAPIKey,
    type Geolocation as Geolocation,
    type ListAPIKey as ListAPIKey,
    type Owner as Owner,
    type PageInfo as PageInfo,
    type Role as Role,
    type APIKeyDeleteResponse as APIKeyDeleteResponse,
    type APIKeyRetrieveParams as APIKeyRetrieveParams,
    type APIKeyListParams as APIKeyListParams,
    type APIKeyCreateParams as APIKeyCreateParams,
  };

  export {
    Actions as Actions,
    type RotateAPIKeyRequest as RotateAPIKeyRequest,
    type ActionRotateParams as ActionRotateParams,
  };
}
