// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AccountPricesAPI from '../../sales/account-prices/account-prices';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage service levels (shipping service levels).
 */
export class ServiceLevels extends APIResource {
  /**
   * Returns a paginated list of the service levels a carrier offers.
   *
   * Use this rather than the `service_levels` field on the carrier itself when a
   * carrier has more than a handful of services, since that inline list is capped.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `carriers:read`.
   *
   * @example
   * ```ts
   * const listServiceLevel =
   *   await client.operations.carriers.serviceLevels.list(
   *     'cr_tv5vfjtgu1n3',
   *   );
   * ```
   */
  list(
    carrierID: string,
    query: ServiceLevelListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AccountPricesAPI.ListServiceLevel> {
    return this._client.get(path`/v1/operations/carriers/${carrierID}/service-levels`, { query, ...options });
  }

  /**
   * Returns a service level by ID.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `carriers:read`.
   *
   * @example
   * ```ts
   * const serviceLevel =
   *   await client.operations.carriers.serviceLevels.retrieve(
   *     'crop_4ilk9p6gccrx',
   *     { carrier_id: 'cr_tv5vfjtgu1n3' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: ServiceLevelRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<AccountPricesAPI.ServiceLevel> {
    const { carrier_id, ...query } = params;
    return this._client.get(path`/v1/operations/carriers/${carrier_id}/service-levels/${id}`, {
      query,
      ...options,
    });
  }

  /**
   * Adds a shipping service level to a carrier.
   *
   * Use this for self-managed carriers, or to add a service a connected carrier does
   * not publish. Service levels created here are never removed by a later sync of
   * the carrier's services.
   *
   * This endpoint requires the permission: `carriers:create`.
   *
   * @example
   * ```ts
   * const serviceLevel =
   *   await client.operations.carriers.serviceLevels.create(
   *     'cr_tv5vfjtgu1n3',
   *     {
   *       code: 'ground',
   *       is_default: false,
   *       name: 'Ground Shipping',
   *       customer_portal_visibility: 'visible',
   *       default_transit_days: 3,
   *     },
   *   );
   * ```
   */
  create(
    carrierID: string,
    params: ServiceLevelCreateParams,
    options?: RequestOptions,
  ): APIPromise<AccountPricesAPI.ServiceLevel> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/operations/carriers/${carrierID}/service-levels`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Updates a service level's name, code, customer portal visibility, or default
   * status.
   *
   * Only the fields you send are changed. System-owned service levels cannot be
   * updated.
   *
   * This endpoint requires the permission: `carriers:update`.
   *
   * @example
   * ```ts
   * const serviceLevel =
   *   await client.operations.carriers.serviceLevels.update(
   *     'crop_4ilk9p6gccrx',
   *     {
   *       carrier_id: 'cr_tv5vfjtgu1n3',
   *       code: 'express',
   *       customer_portal_visibility: 'visible',
   *       name: 'Express Shipping',
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    params: ServiceLevelUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AccountPricesAPI.ServiceLevel> {
    const { carrier_id, include, ...body } = params;
    return this._client.patch(path`/v1/operations/carriers/${carrier_id}/service-levels/${id}`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Permanently deletes a service level so it can no longer be selected on
   * shipments.
   *
   * System-owned service levels and the carrier's default service level cannot be
   * deleted; to remove a default, first clear its `is_default` flag or promote
   * another service level in its place.
   *
   * This endpoint requires the permission: `carriers:delete`.
   *
   * @example
   * ```ts
   * const serviceLevel =
   *   await client.operations.carriers.serviceLevels.delete(
   *     'crop_4ilk9p6gccrx',
   *     { carrier_id: 'cr_tv5vfjtgu1n3' },
   *   );
   * ```
   */
  delete(
    id: string,
    params: ServiceLevelDeleteParams,
    options?: RequestOptions,
  ): APIPromise<ServiceLevelDeleteResponse> {
    const { carrier_id } = params;
    return this._client.delete(path`/v1/operations/carriers/${carrier_id}/service-levels/${id}`, options);
  }
}

/**
 * Request to create a service level.
 */
export interface CreateServiceLevelRequest {
  /**
   * Carrier-specific code identifying this service level (e.g. `fedex_ground`).
   *
   * Must be unique among the carrier's service levels, and is returned as the
   * service level's `service_level_token`.
   */
  code: string;

  /**
   * Whether this becomes the carrier's default service level, pre-selected when the
   * carrier is chosen.
   *
   * Each carrier has at most one default; setting this to `true` clears the
   * carrier's existing default.
   */
  is_default: boolean;

  /**
   * Human-readable name for the service level, shown to customers at checkout when
   * the service level is visible.
   */
  name: string;

  /**
   * Whether customers can see and select this service level at checkout in the
   * customer portal.
   */
  customer_portal_visibility?: 'visible' | 'hidden';

  /**
   * Business days this service typically takes in transit, used to work an order's
   * ship-by date back from a promised delivery date.
   *
   * A fallback: when a carrier can rate the lane, the transit it quotes is used
   * instead. Leave unset for carriers that can be rated, and set it for those that
   * cannot (freight, will-call), where it is the only transit the system will have.
   */
  default_transit_days?: number;
}

/**
 * Request to update a service level.
 */
export interface UpdateServiceLevelRequest {
  /**
   * Carrier-specific code identifying this service level (e.g. `fedex_ground`).
   *
   * Must be unique among the carrier's service levels. For a service level synced
   * from a connected carrier the `service_level_token` used for rating is fixed by
   * the carrier and a code change does not affect it; for one you created yourself,
   * the token follows the code.
   */
  code?: string;

  /**
   * Whether customers can see and select this service level at checkout in the
   * customer portal.
   */
  customer_portal_visibility?: 'visible' | 'hidden';

  /**
   * Business days this service typically takes in transit, used to work an order's
   * ship-by date back from a promised delivery date.
   *
   * A fallback: when a carrier can rate the lane, the transit it quotes is used
   * instead. Set to null to remove it, which leaves transit unknown for lanes the
   * carrier cannot rate.
   */
  default_transit_days?: number | null;

  /**
   * Whether this is the carrier's default service level, pre-selected when the
   * carrier is chosen.
   *
   * Each carrier has at most one default; setting this to `true` clears the
   * carrier's existing default.
   */
  is_default?: boolean;

  /**
   * Human-readable name for the service level, shown to customers at checkout when
   * the service level is visible.
   */
  name?: string;
}

export interface ServiceLevelDeleteResponse {}

export interface ServiceLevelListParams {
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
  include?: Array<'owner' | 'owner.account'>;

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

export interface ServiceLevelRetrieveParams {
  /**
   * Path param: The carrier that owns this service level.
   */
  carrier_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'owner' | 'owner.account'>;
}

export interface ServiceLevelCreateParams {
  /**
   * Body param: Carrier-specific code identifying this service level (e.g.
   * `fedex_ground`).
   *
   * Must be unique among the carrier's service levels, and is returned as the
   * service level's `service_level_token`.
   */
  code: string;

  /**
   * Body param: Whether this becomes the carrier's default service level,
   * pre-selected when the carrier is chosen.
   *
   * Each carrier has at most one default; setting this to `true` clears the
   * carrier's existing default.
   */
  is_default: boolean;

  /**
   * Body param: Human-readable name for the service level, shown to customers at
   * checkout when the service level is visible.
   */
  name: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'owner' | 'owner.account'>;

  /**
   * Body param: Whether customers can see and select this service level at checkout
   * in the customer portal.
   */
  customer_portal_visibility?: 'visible' | 'hidden';

  /**
   * Body param: Business days this service typically takes in transit, used to work
   * an order's ship-by date back from a promised delivery date.
   *
   * A fallback: when a carrier can rate the lane, the transit it quotes is used
   * instead. Leave unset for carriers that can be rated, and set it for those that
   * cannot (freight, will-call), where it is the only transit the system will have.
   */
  default_transit_days?: number;
}

export interface ServiceLevelUpdateParams {
  /**
   * Path param: The carrier that owns this service level.
   */
  carrier_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'owner' | 'owner.account'>;

  /**
   * Body param: Carrier-specific code identifying this service level (e.g.
   * `fedex_ground`).
   *
   * Must be unique among the carrier's service levels. For a service level synced
   * from a connected carrier the `service_level_token` used for rating is fixed by
   * the carrier and a code change does not affect it; for one you created yourself,
   * the token follows the code.
   */
  code?: string;

  /**
   * Body param: Whether customers can see and select this service level at checkout
   * in the customer portal.
   */
  customer_portal_visibility?: 'visible' | 'hidden';

  /**
   * Body param: Business days this service typically takes in transit, used to work
   * an order's ship-by date back from a promised delivery date.
   *
   * A fallback: when a carrier can rate the lane, the transit it quotes is used
   * instead. Set to null to remove it, which leaves transit unknown for lanes the
   * carrier cannot rate.
   */
  default_transit_days?: number | null;

  /**
   * Body param: Whether this is the carrier's default service level, pre-selected
   * when the carrier is chosen.
   *
   * Each carrier has at most one default; setting this to `true` clears the
   * carrier's existing default.
   */
  is_default?: boolean;

  /**
   * Body param: Human-readable name for the service level, shown to customers at
   * checkout when the service level is visible.
   */
  name?: string;
}

export interface ServiceLevelDeleteParams {
  /**
   * The carrier that owns this service level.
   */
  carrier_id: string;
}

export declare namespace ServiceLevels {
  export {
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
