// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as OpenrouterAPI from './openrouter';
import { OpenRouterUsage, Openrouter } from './openrouter';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage third-party account integrations.
 */
export class Integrations extends APIResource {
  openrouter: OpenrouterAPI.Openrouter = new OpenrouterAPI.Openrouter(this._client);

  /**
   * Returns a paginated list of the third-party providers connected to the target
   * account.
   *
   * Stored credentials are never included in the response.
   *
   * This endpoint requires the `admin` role type.
   *
   * @example
   * ```ts
   * const listAccountIntegration =
   *   await client.settings.integrations.list();
   * ```
   */
  list(
    query: IntegrationListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListAccountIntegration> {
    return this._client.get('/v1/settings/integrations', { query, ...options });
  }

  /**
   * Connects a third-party provider to the account, or replaces the name and
   * credentials of the provider's existing connection.
   *
   * An account can have at most one integration per `provider`, so calling this
   * again for a provider that is already connected rotates its credentials in place
   * and returns the same integration rather than creating a second one. Credentials
   * are checked for the provider's expected key format, encrypted at rest, and never
   * returned in API responses.
   *
   * This endpoint requires the `admin` role type.
   *
   * @example
   * ```ts
   * const accountIntegration =
   *   await client.settings.integrations.create({
   *     credentials:
   *       '{"private_key":"sk_test_...","publishable_key":"pk_test_...","webhook_secret":"whsec_..."}',
   *     name: 'My Stripe Integration',
   *     provider: 'stripe',
   *   });
   * ```
   */
  create(body: IntegrationCreateParams, options?: RequestOptions): APIPromise<AccountIntegration> {
    return this._client.post('/v1/settings/integrations', { body, ...options });
  }

  /**
   * Renames an account integration, activates or deactivates it, or changes its
   * monthly spend limit.
   *
   * Omitted fields are left unchanged. Credentials cannot be changed here; to rotate
   * them, call Create Account Integration again with the same `provider`.
   *
   * This endpoint requires the `admin` role type.
   *
   * @example
   * ```ts
   * const accountIntegration =
   *   await client.settings.integrations.update(
   *     'acig_5ilahyezrs63',
   *     {
   *       name: 'Updated Stripe Integration',
   *       status: 'active',
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    body: IntegrationUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AccountIntegration> {
    return this._client.put(path`/v1/settings/integrations/${id}`, { body, ...options });
  }

  /**
   * Disconnects a third-party provider from the account and returns the deleted
   * integration.
   *
   * The stored credentials go with it, so any feature that relies on the provider
   * stops working until the integration is created again. Deleting an integration
   * that is already deleted returns an error rather than succeeding silently. To
   * pause a provider without discarding its credentials, set the integration's
   * status to `inactive` instead.
   *
   * This endpoint requires the `admin` role type.
   *
   * @example
   * ```ts
   * const accountIntegration =
   *   await client.settings.integrations.delete(
   *     'acig_5ilahyezrs63',
   *   );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<AccountIntegration> {
    return this._client.delete(path`/v1/settings/integrations/${id}`, options);
  }
}

/**
 * Third-party integration connected to an account.
 *
 * An account can have at most one integration per provider. The credentials
 * supplied when the integration was connected are encrypted at rest and are never
 * returned by the API.
 */
export interface AccountIntegration {
  /**
   * Account integration ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * A monetary amount.
   */
  monthly_spend_limit: Money | null;

  /**
   * Display name of the integration.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'account_integration';

  /**
   * Integration provider code.
   *
   * - `stripe`: Stripe payment processing.
   * - `shippo`: Shippo shipping and label generation.
   * - `hubspot`: HubSpot CRM.
   * - `openrouter`: OpenRouter, the LLM gateway that serves agent runs.
   */
  provider: 'stripe' | 'shippo' | 'hubspot' | 'openrouter';

  /**
   * Lifecycle status of the integration.
   *
   * Integrations are created `active`. Setting an integration to `inactive` keeps
   * its stored credentials but stops it from being used (for example, the Stripe
   * publishable key cannot be retrieved while the Stripe integration is inactive).
   */
  status: 'active' | 'inactive';

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Request to create or upsert an account integration.
 */
export interface CreateAccountIntegrationRequest {
  /**
   * JSON string containing the provider's credentials.
   *
   * Required keys depend on the provider:
   *
   * - `stripe`: `private_key` (`sk_...`), `publishable_key` (`pk_...`), and
   *   `webhook_secret` (`whsec_...`).
   * - `shippo`: `api_key` (`shippo_live_...` or `shippo_test_...`).
   * - `hubspot`: `access_token` (`pat-...`).
   * - `openrouter`: `api_key` (`sk-or-...`).
   *
   * For Stripe and Shippo, sandbox accounts must supply test keys and production
   * accounts must supply live keys; credentials that do not match are rejected.
   * HubSpot and OpenRouter keys make no such distinction.
   */
  credentials: string;

  /**
   * Display name of the integration.
   */
  name: string;

  /**
   * Integration provider code.
   *
   * - `stripe`: Stripe payment processing.
   * - `shippo`: Shippo shipping and label generation.
   * - `hubspot`: HubSpot CRM.
   * - `openrouter`: OpenRouter, the LLM gateway that serves agent runs.
   */
  provider: 'stripe' | 'shippo' | 'hubspot' | 'openrouter';

  /**
   * A monetary amount, supplied on create and update requests.
   */
  monthly_spend_limit?: MoneyInput;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListAccountIntegration {
  /**
   * Resources in this page.
   */
  data: Array<AccountIntegration>;

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
 * A monetary amount.
 */
export interface Money {
  /**
   * Decimal amount, as a string to preserve precision.
   */
  amount: string;

  /**
   * Lowercase ISO 4217 currency code.
   */
  currency: string;
}

/**
 * A monetary amount, supplied on create and update requests.
 */
export interface MoneyInput {
  /**
   * Decimal amount, as a string to preserve precision.
   */
  amount: string;

  /**
   * Lowercase ISO 4217 currency code.
   */
  currency: string;
}

/**
 * Request to update an account integration.
 */
export interface UpdateAccountIntegrationRequest {
  /**
   * A monetary amount, supplied on create and update requests.
   */
  monthly_spend_limit?: MoneyInput | null;

  /**
   * Display name of the integration.
   */
  name?: string;

  /**
   * Lifecycle status of the integration.
   *
   * Set to `inactive` to stop the provider being used while keeping its stored
   * credentials, and back to `active` to resume without re-entering them.
   */
  status?: 'active' | 'inactive';
}

export interface IntegrationListParams {
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

export interface IntegrationCreateParams {
  /**
   * JSON string containing the provider's credentials.
   *
   * Required keys depend on the provider:
   *
   * - `stripe`: `private_key` (`sk_...`), `publishable_key` (`pk_...`), and
   *   `webhook_secret` (`whsec_...`).
   * - `shippo`: `api_key` (`shippo_live_...` or `shippo_test_...`).
   * - `hubspot`: `access_token` (`pat-...`).
   * - `openrouter`: `api_key` (`sk-or-...`).
   *
   * For Stripe and Shippo, sandbox accounts must supply test keys and production
   * accounts must supply live keys; credentials that do not match are rejected.
   * HubSpot and OpenRouter keys make no such distinction.
   */
  credentials: string;

  /**
   * Display name of the integration.
   */
  name: string;

  /**
   * Integration provider code.
   *
   * - `stripe`: Stripe payment processing.
   * - `shippo`: Shippo shipping and label generation.
   * - `hubspot`: HubSpot CRM.
   * - `openrouter`: OpenRouter, the LLM gateway that serves agent runs.
   */
  provider: 'stripe' | 'shippo' | 'hubspot' | 'openrouter';

  /**
   * A monetary amount, supplied on create and update requests.
   */
  monthly_spend_limit?: MoneyInput;
}

export interface IntegrationUpdateParams {
  /**
   * A monetary amount, supplied on create and update requests.
   */
  monthly_spend_limit?: MoneyInput | null;

  /**
   * Display name of the integration.
   */
  name?: string;

  /**
   * Lifecycle status of the integration.
   *
   * Set to `inactive` to stop the provider being used while keeping its stored
   * credentials, and back to `active` to resume without re-entering them.
   */
  status?: 'active' | 'inactive';
}

Integrations.Openrouter = Openrouter;

export declare namespace Integrations {
  export {
    type AccountIntegration as AccountIntegration,
    type CreateAccountIntegrationRequest as CreateAccountIntegrationRequest,
    type ListAccountIntegration as ListAccountIntegration,
    type Money as Money,
    type MoneyInput as MoneyInput,
    type UpdateAccountIntegrationRequest as UpdateAccountIntegrationRequest,
    type IntegrationListParams as IntegrationListParams,
    type IntegrationCreateParams as IntegrationCreateParams,
    type IntegrationUpdateParams as IntegrationUpdateParams,
  };

  export { Openrouter as Openrouter, type OpenRouterUsage as OpenRouterUsage };
}
