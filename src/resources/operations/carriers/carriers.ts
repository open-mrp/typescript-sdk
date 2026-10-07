// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ServiceLevelsAPI from './service-levels';
import {
  CreateServiceLevelRequest,
  ServiceLevelCreateParams,
  ServiceLevelDeleteParams,
  ServiceLevelDeleteResponse,
  ServiceLevelListParams,
  ServiceLevelRetrieveParams,
  ServiceLevelUpdateParams,
  ServiceLevels,
  UpdateServiceLevelRequest,
} from './service-levels';
import * as AccountPricesAPI from '../../sales/account-prices/account-prices';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage carriers and their Shippo integrations.
 */
export class Carriers extends APIResource {
  serviceLevels: ServiceLevelsAPI.ServiceLevels = new ServiceLevelsAPI.ServiceLevels(this._client);

  /**
   * Returns a paginated list of the carriers available to the current account.
   *
   * This covers the carriers you have created plus the platform-provided system
   * carriers that every account shares.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `carriers:read`.
   *
   * @example
   * ```ts
   * const listCarrier = await client.operations.carriers.list();
   * ```
   */
  list(query: CarrierListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ListCarrier> {
    return this._client.get('/v1/operations/carriers', { query, ...options });
  }

  /**
   * Returns a carrier by ID.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `carriers:read`.
   *
   * @example
   * ```ts
   * const carrier = await client.operations.carriers.retrieve(
   *   'cr_tv5vfjtgu1n3',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: CarrierRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AccountPricesAPI.Carrier> {
    return this._client.get(path`/v1/operations/carriers/${id}`, { query, ...options });
  }

  /**
   * Creates a shipping carrier your account can ship orders with.
   *
   * Supplying a Shippo-supported code (`fedex`, `ups`, `usps`) connects a Shippo
   * carrier account and creates a service level for every service that carrier
   * offers, each hidden from the customer portal until you make it visible. This
   * requires an active Shippo integration on the account and is skipped entirely for
   * sandbox accounts, which get a carrier record with no service levels and no live
   * rating.
   *
   * This endpoint requires the permission: `carriers:create`.
   *
   * @example
   * ```ts
   * const carrier = await client.operations.carriers.create({
   *   name: 'FedEx',
   *   account_number: '1234567890',
   *   code: 'fedex',
   *   customer_portal_visibility: 'visible',
   * });
   * ```
   */
  create(params: CarrierCreateParams, options?: RequestOptions): APIPromise<AccountPricesAPI.Carrier> {
    const { include, ...body } = params;
    return this._client.post('/v1/operations/carriers', { query: { include }, body, ...options });
  }

  /**
   * Updates a carrier's name and customer portal visibility.
   *
   * Only these two attributes can change: a carrier's code and account number are
   * fixed at creation, and system-owned carriers cannot be updated at all.
   *
   * This endpoint requires the permission: `carriers:update`.
   *
   * @example
   * ```ts
   * const carrier = await client.operations.carriers.update(
   *   'cr_tv5vfjtgu1n3',
   *   {
   *     customer_portal_visibility: 'visible',
   *     name: 'FedEx Express',
   *   },
   * );
   * ```
   */
  update(
    id: string,
    params: CarrierUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AccountPricesAPI.Carrier> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/operations/carriers/${id}`, { query: { include }, body, ...options });
  }

  /**
   * Deletes a carrier and all of its service levels.
   *
   * If the carrier is connected through Shippo, its Shippo carrier account is
   * deactivated. System-owned carriers cannot be deleted.
   *
   * This endpoint requires the permission: `carriers:delete`.
   *
   * @example
   * ```ts
   * const carrier = await client.operations.carriers.delete(
   *   'cr_tv5vfjtgu1n3',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<CarrierDeleteResponse> {
    return this._client.delete(path`/v1/operations/carriers/${id}`, options);
  }
}

/**
 * Request to create a carrier.
 */
export interface CreateCarrierRequest {
  /**
   * Human-readable name for the carrier.
   *
   * Must not match another carrier already visible to your account, including the
   * system-provided ones.
   */
  name: string;

  /**
   * Your account number with this carrier.
   *
   * Required when `code` is `ups` or `usps`, whose carrier accounts are connected to
   * Shippo using this number; FedEx authorizes through OAuth instead, so no account
   * number is needed.
   */
  account_number?: string;

  /**
   * Well-known carrier code.
   *
   * Providing a Shippo-supported code (`fedex`, `ups`, `usps`) connects the carrier
   * through Shippo and syncs its service levels; the other codes, such as
   * `will_call` and `delivery`, simply describe a self-managed shipping method. Omit
   * the code entirely when none of them fit. The code cannot be changed after the
   * carrier is created.
   */
  code?: 'fedex' | 'ups' | 'usps' | 'will_call' | 'delivery' | 'ltl' | 'ltl1' | 'freight_collect';

  /**
   * Whether customers can see and select this carrier at checkout in the customer
   * portal.
   */
  customer_portal_visibility?: 'visible' | 'hidden';
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListCarrier {
  /**
   * Resources in this page.
   */
  data: Array<AccountPricesAPI.Carrier>;

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
 * Request to update a carrier.
 */
export interface UpdateCarrierRequest {
  /**
   * Whether customers can see and select this carrier at checkout in the customer
   * portal.
   *
   * Each of the carrier's service levels carries its own customer portal visibility,
   * which this does not change.
   */
  customer_portal_visibility?: 'visible' | 'hidden';

  /**
   * Human-readable name for the carrier.
   *
   * Must not match another carrier already visible to your account, including the
   * system-provided ones.
   */
  name?: string;
}

export interface CarrierDeleteResponse {}

export interface CarrierListParams {
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
  include?: Array<'owner' | 'owner.account' | 'service_levels'>;

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

export interface CarrierRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'owner' | 'owner.account' | 'service_levels'>;
}

export interface CarrierCreateParams {
  /**
   * Body param: Human-readable name for the carrier.
   *
   * Must not match another carrier already visible to your account, including the
   * system-provided ones.
   */
  name: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'owner' | 'owner.account' | 'service_levels'>;

  /**
   * Body param: Your account number with this carrier.
   *
   * Required when `code` is `ups` or `usps`, whose carrier accounts are connected to
   * Shippo using this number; FedEx authorizes through OAuth instead, so no account
   * number is needed.
   */
  account_number?: string;

  /**
   * Body param: Well-known carrier code.
   *
   * Providing a Shippo-supported code (`fedex`, `ups`, `usps`) connects the carrier
   * through Shippo and syncs its service levels; the other codes, such as
   * `will_call` and `delivery`, simply describe a self-managed shipping method. Omit
   * the code entirely when none of them fit. The code cannot be changed after the
   * carrier is created.
   */
  code?: 'fedex' | 'ups' | 'usps' | 'will_call' | 'delivery' | 'ltl' | 'ltl1' | 'freight_collect';

  /**
   * Body param: Whether customers can see and select this carrier at checkout in the
   * customer portal.
   */
  customer_portal_visibility?: 'visible' | 'hidden';
}

export interface CarrierUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'owner' | 'owner.account' | 'service_levels'>;

  /**
   * Body param: Whether customers can see and select this carrier at checkout in the
   * customer portal.
   *
   * Each of the carrier's service levels carries its own customer portal visibility,
   * which this does not change.
   */
  customer_portal_visibility?: 'visible' | 'hidden';

  /**
   * Body param: Human-readable name for the carrier.
   *
   * Must not match another carrier already visible to your account, including the
   * system-provided ones.
   */
  name?: string;
}

Carriers.ServiceLevels = ServiceLevels;

export declare namespace Carriers {
  export {
    type CreateCarrierRequest as CreateCarrierRequest,
    type ListCarrier as ListCarrier,
    type UpdateCarrierRequest as UpdateCarrierRequest,
    type CarrierDeleteResponse as CarrierDeleteResponse,
    type CarrierListParams as CarrierListParams,
    type CarrierRetrieveParams as CarrierRetrieveParams,
    type CarrierCreateParams as CarrierCreateParams,
    type CarrierUpdateParams as CarrierUpdateParams,
  };

  export {
    ServiceLevels as ServiceLevels,
    type CreateServiceLevelRequest as CreateServiceLevelRequest,
    type UpdateServiceLevelRequest as UpdateServiceLevelRequest,
    type ServiceLevelDeleteResponse as ServiceLevelDeleteResponse,
    type ServiceLevelListParams as ServiceLevelListParams,
    type ServiceLevelRetrieveParams as ServiceLevelRetrieveParams,
    type ServiceLevelCreateParams as ServiceLevelCreateParams,
    type ServiceLevelUpdateParams as ServiceLevelUpdateParams,
    type ServiceLevelDeleteParams as ServiceLevelDeleteParams,
  };
}
