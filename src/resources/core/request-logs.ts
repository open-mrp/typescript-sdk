// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * List and retrieve request logs.
 */
export class RequestLogs extends APIResource {
  /**
   * Returns a paginated list of API request logs, newest first.
   *
   * Results cover every request where your account is either the acting account or
   * the account that was acted upon, so requests a customer or supplier made against
   * your data appear alongside your own. The `q` parameter matches a log ID exactly
   * and otherwise searches the request path, the normalized route, and the error
   * message.
   *
   * Requests to a number of high-traffic endpoints — including these logging
   * endpoints themselves — are recorded but withheld from this listing so they do
   * not drown out the rest of your traffic. They can still be fetched individually
   * by ID.
   *
   * This endpoint requires the permission: `request_logs:read`.
   *
   * @example
   * ```ts
   * const listRequestLog = await client.core.requestLogs.list();
   * ```
   */
  list(
    query: RequestLogListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListRequestLog> {
    return this._client.get('/v1/core/request-logs', { query, ...options });
  }

  /**
   * Returns a single API request log by ID.
   *
   * The log is readable when your account is either the acting account or the
   * account that was acted upon. This is also the only endpoint that can return the
   * captured query parameters and request and response bodies, and the only way to
   * read the high-traffic-endpoint logs that are withheld from the list endpoint.
   *
   * This endpoint requires the permission: `request_logs:read`.
   *
   * @example
   * ```ts
   * const requestLog = await client.core.requestLogs.retrieve(
   *   'rq_0lhl3kkhme40',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: RequestLogRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RequestLog> {
    return this._client.get(path`/v1/core/request-logs/${id}`, { query, ...options });
  }
}

/**
 * Reference to an actor — the user, API key, agent, or group identity associated
 * with an action.
 */
export interface Actor {
  /**
   * Unique identifier of the actor.
   */
  id: string;

  /**
   * URL of the actor's profile photo, if one is set.
   *
   * Only populated for `user` actors.
   */
  avatar_url: string | null;

  /**
   * Human-readable handle identifying the actor.
   *
   * - For `user` actors: the user's email address.
   * - For `api_key` actors: the redacted key value.
   *
   * Other actor types carry no handle.
   */
  handle: string | null;

  /**
   * The actor's display name.
   */
  name: string | null;

  /**
   * Resource type identifier.
   */
  object: 'actor';

  /**
   * A named set of permissions that can be assigned to users to control what they
   * can access.
   */
  role: APIKeysAPI.Role | null;

  /**
   * Actor type.
   *
   * - `user`: a human user account.
   * - `api_key`: a programmatic caller authenticating with an API key.
   * - `agent`: an automated agent acting on the account's behalf.
   * - `group`: a shared group identity, such as a "Customer Service" persona, rather
   *   than a single individual.
   */
  type: 'user' | 'api_key' | 'agent' | 'group';
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListRequestLog {
  /**
   * Resources in this page.
   */
  data: Array<RequestLog>;

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
 * A log of a single API request, capturing its route, outcome, latency, and actor.
 *
 * Logs are written after the response has been sent, so a new entry may take a
 * moment to become readable.
 */
export interface RequestLog {
  /**
   * Request log ID.
   */
  id: string;

  /**
   * An organization on OpenMRP, including its branding and customer portal
   * sub-resources.
   *
   * Your own account and any customer or supplier account you trade with are both
   * represented by this object.
   */
  account: APIKeysAPI.Account | null;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  actor: Actor | null;

  /**
   * The API version the request was served with.
   *
   * Taken from the `OpenMRP-Version` header the caller sent; requests rejected for
   * omitting that header record no version.
   */
  api_version: string | null;

  /**
   * Client IP address the request came from.
   *
   * Not recorded for requests an OpenMRP agent made on your behalf, since those
   * originate inside OpenMRP's own network.
   */
  client_ip: string | null;

  /**
   * When the log entry was written.
   */
  created_at: string;

  /**
   * Machine-readable API error code.
   *
   * Matches the `code` of the error response the caller received. Populated only for
   * failed requests.
   */
  error_code:
    | 'expired_token'
    | 'api_key_expired'
    | 'api_key_revoked'
    | 'invalid_credentials'
    | 'insufficient_permissions'
    | 'payment_required'
    | 'agent_spending_cap_reached'
    | 'validation_failed'
    | 'missing_field'
    | 'invalid_format'
    | 'method_not_allowed'
    | 'resource_not_found'
    | 'resource_exists'
    | 'resource_conflict'
    | 'resource_gone'
    | 'idempotency_in_progress'
    | 'limit_exceeded'
    | 'registration_closed'
    | 'rate_limit_exceeded'
    | 'parameter_missing'
    | 'parameter_invalid'
    | 'parameter_unknown'
    | 'parameters_exclusive'
    | 'internal_error'
    | 'service_unavailable'
    | 'external_service_error'
    | 'timeout'
    | 'connection_error'
    | 'request_timeout'
    | 'client_closed_request'
    | 'api_version_required'
    | 'api_version_invalid'
    | 'api_version_too_old'
    | null;

  /**
   * Human-readable error message.
   *
   * The same message the caller received. Populated only for failed requests.
   */
  error_message: string | null;

  /**
   * Request host.
   *
   * Usually `api.openmrp.ai`.
   */
  host: string;

  /**
   * User-provided idempotency key.
   */
  idempotency_key: string | null;

  /**
   * Request latency in microseconds.
   *
   * Measured at the API edge, from the moment the request was received until the
   * response was written, so it excludes network time between your client and
   * OpenMRP.
   */
  latency_us: number;

  /**
   * HTTP method.
   */
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

  /**
   * The route template the request matched, with path parameters left as
   * placeholders.
   *
   * For example `/v1/sales/customers/{id}` is the normalized route for the request
   * path `/v1/sales/customers/ac_...`. Falls back to the raw path when the request
   * did not match a registered route.
   */
  normalized_route: string;

  /**
   * Resource type identifier.
   */
  object: 'request_log';

  /**
   * When the request was received.
   *
   * Request logs are ordered and date-filtered by this timestamp rather than by
   * `created_at`.
   */
  occurred_at: string;

  /**
   * The exact path the request was made to, including path parameter values.
   */
  path: string;

  /**
   * Query-string parameters the request was made with, as a JSON object. Encoded as
   * a JSON value (object, array, string, number, boolean, or null), not a
   * JSON-encoded string.
   */
  query_params: unknown | null;

  /**
   * Referrer header.
   */
  referrer: string | null;

  /**
   * The JSON body the request was sent with.
   *
   * Sensitive values such as passwords, tokens, and secrets are redacted before the
   * body is stored. Bodies larger than 256 KB are not stored in full; a small marker
   * object with `_truncated` set to `true` is stored in their place. Encoded as a
   * JSON value (object, array, string, number, boolean, or null), not a JSON-encoded
   * string.
   */
  request_body: unknown | null;

  /**
   * The JSON body OpenMRP responded with.
   *
   * Sensitive values such as generated API key secrets are redacted before the body
   * is stored. Bodies larger than 256 KB are not stored in full; a small marker
   * object with `_truncated` set to `true` is stored in their place. Encoded as a
   * JSON value (object, array, string, number, boolean, or null), not a JSON-encoded
   * string.
   */
  response_body: unknown | null;

  /**
   * HTTP response status code (e.g. `200`, `404`).
   */
  status_code: number;

  /**
   * User agent.
   */
  user_agent: string | null;
}

export interface RequestLogListParams {
  /**
   * Filter by the _acting_ account: the account the actor belongs to (the log's
   * `account.id`).
   *
   * Results are always scoped to logs where your account is either the acting
   * account or the target account; this narrows that set to specific acting
   * accounts. For example, pass a customer's account ID to see only requests that
   * customer's actors made against your account.
   */
  actor_account_ids?: Array<string>;

  /**
   * Filter by the actor identifier.
   *
   * Matches the log's `actor.id`: a user ID for `user` actors, an API key ID for
   * `api_key` actors, or an agent ID for `agent` actors.
   */
  actor_ids?: Array<string>;

  /**
   * Filter by the actor type.
   *
   * Requests are recorded for actors of type `user`, `api_key`, and `agent` — the
   * last covering calls an OpenMRP agent made on your account's behalf.
   */
  actor_types?: Array<'user' | 'api_key' | 'agent' | 'group'>;

  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Restricts results to request logs on or before this timestamp.
   */
  ends_at?: string;

  /**
   * Filter by API error code.
   */
  error_codes?: Array<
    | 'expired_token'
    | 'api_key_expired'
    | 'api_key_revoked'
    | 'invalid_credentials'
    | 'insufficient_permissions'
    | 'payment_required'
    | 'agent_spending_cap_reached'
    | 'validation_failed'
    | 'missing_field'
    | 'invalid_format'
    | 'method_not_allowed'
    | 'resource_not_found'
    | 'resource_exists'
    | 'resource_conflict'
    | 'resource_gone'
    | 'idempotency_in_progress'
    | 'limit_exceeded'
    | 'registration_closed'
    | 'rate_limit_exceeded'
    | 'parameter_missing'
    | 'parameter_invalid'
    | 'parameter_unknown'
    | 'parameters_exclusive'
    | 'internal_error'
    | 'service_unavailable'
    | 'external_service_error'
    | 'timeout'
    | 'connection_error'
    | 'request_timeout'
    | 'client_closed_request'
    | 'api_version_required'
    | 'api_version_invalid'
    | 'api_version_too_old'
  >;

  /**
   * Exclude request logs whose API error code is in this set.
   *
   * Applied as a negative filter after all other filters. Successful requests (which
   * have no error code) are always kept. The OpenMRP dashboard uses this to hide
   * routine `expired_token` 401s — the noise from short-lived access tokens expiring
   * and clients silently refreshing — while still surfacing genuine auth failures
   * like `invalid_credentials`.
   */
  exclude_error_codes?: Array<
    | 'expired_token'
    | 'api_key_expired'
    | 'api_key_revoked'
    | 'invalid_credentials'
    | 'insufficient_permissions'
    | 'payment_required'
    | 'agent_spending_cap_reached'
    | 'validation_failed'
    | 'missing_field'
    | 'invalid_format'
    | 'method_not_allowed'
    | 'resource_not_found'
    | 'resource_exists'
    | 'resource_conflict'
    | 'resource_gone'
    | 'idempotency_in_progress'
    | 'limit_exceeded'
    | 'registration_closed'
    | 'rate_limit_exceeded'
    | 'parameter_missing'
    | 'parameter_invalid'
    | 'parameter_unknown'
    | 'parameters_exclusive'
    | 'internal_error'
    | 'service_unavailable'
    | 'external_service_error'
    | 'timeout'
    | 'connection_error'
    | 'request_timeout'
    | 'client_closed_request'
    | 'api_version_required'
    | 'api_version_invalid'
    | 'api_version_too_old'
  >;

  /**
   * Filter by the request host.
   *
   * Typically `api.openmrp.ai`.
   */
  hosts?: Array<string>;

  /**
   * Filter by the user-provided idempotency key.
   */
  idempotency_key?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'account' | 'actor' | 'actor.role'>;

  /**
   * Maximum number of results to return in a single page.
   */
  limit?: number;

  /**
   * Filter by the HTTP method.
   */
  methods?: Array<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'>;

  /**
   * Restricts results to requests that took at least this many microseconds.
   */
  min_latency_us?: number;

  /**
   * Filter by the _normalized_ route template.
   *
   * For example `/v1/sales/customers/{id}` matches every request to that route
   * regardless of the specific customer ID. Parameter names inside `{}` are ignored
   * when matching, so `{customer_id}` and `{id}` are equivalent.
   */
  normalized_routes?: Array<string>;

  /**
   * Free-text search term used to filter results.
   *
   * Which fields are matched against the term varies by endpoint.
   */
  q?: string;

  /**
   * Restricts results to request logs on or after this timestamp.
   *
   * Defaults to 24 hours before `ends_at`, or before now when `ends_at` is also
   * omitted. Pass an earlier timestamp to search further back.
   */
  starts_at?: string;

  /**
   * Filter by the HTTP status class, expressed as the leading digit: `1`–`5` for
   * 1xx–5xx.
   *
   * Combined with `status_codes` using OR — e.g. `status_codes=401` and
   * `status_code_classes=5` matches 401 responses and any 5xx response.
   */
  status_code_classes?: Array<number>;

  /**
   * Filter by the HTTP status code.
   */
  status_codes?: Array<number>;

  /**
   * Filter by the _target_ account: the account the request acted upon (the log's
   * target account).
   *
   * Results are always scoped to logs where your account is either the acting
   * account or the target account; this narrows that set to specific target
   * accounts. For example, pass a supplier's account ID to see only requests your
   * account made against that supplier.
   */
  target_account_ids?: Array<string>;
}

export interface RequestLogRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'account'
    | 'actor'
    | 'actor.role'
    | 'actor.role.permissions'
    | 'query_params'
    | 'request_body'
    | 'response_body'
  >;
}

export declare namespace RequestLogs {
  export {
    type Actor as Actor,
    type ListRequestLog as ListRequestLog,
    type RequestLog as RequestLog,
    type RequestLogListParams as RequestLogListParams,
    type RequestLogRetrieveParams as RequestLogRetrieveParams,
  };
}
