// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as IntegrationsAPI from './integrations';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * List and manage third-party account integrations.
 */
export class Openrouter extends APIResource {
  /**
   * Returns what the account has spent through its OpenRouter integration today,
   * this week, this month and in total, with its monthly spend limit.
   *
   * Spend is read live from OpenRouter for the integration's API key. Fails with
   * `404` if the account has no OpenRouter integration, and with `400` if OpenRouter
   * rejects the stored key.
   *
   * This endpoint requires the `admin` role type.
   *
   * @example
   * ```ts
   * const openRouterUsage =
   *   await client.settings.integrations.openrouter.retrieveUsage();
   * ```
   */
  retrieveUsage(options?: RequestOptions): APIPromise<OpenRouterUsage> {
    return this._client.get('/v1/settings/integrations/openrouter/usage', options);
  }
}

/**
 * What an account has spent through its OpenRouter integration.
 *
 * Spend comes from OpenRouter and covers every request made with the integration's
 * API key, including any made outside OpenMRP. Days, weeks and months are UTC
 * calendar periods.
 */
export interface OpenRouterUsage {
  /**
   * A monetary amount.
   */
  key_limit: IntegrationsAPI.Money | null;

  /**
   * A monetary amount.
   */
  key_limit_remaining: IntegrationsAPI.Money | null;

  /**
   * A monetary amount.
   */
  monthly_spend_limit: IntegrationsAPI.Money | null;

  /**
   * A monetary amount.
   */
  monthly_spend_remaining: IntegrationsAPI.Money | null;

  /**
   * Resource type identifier.
   */
  object: 'openrouter_usage';

  /**
   * A monetary amount.
   */
  spent_this_month: IntegrationsAPI.Money;

  /**
   * A monetary amount.
   */
  spent_this_week: IntegrationsAPI.Money;

  /**
   * A monetary amount.
   */
  spent_today: IntegrationsAPI.Money;

  /**
   * A monetary amount.
   */
  spent_total: IntegrationsAPI.Money;
}

export declare namespace Openrouter {
  export { type OpenRouterUsage as OpenRouterUsage };
}
