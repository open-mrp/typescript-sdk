// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * List and manage addresses for accounts.
 */
export class Addresses extends APIResource {
  /**
   * Returns a paginated list of addresses.
   *
   * Addresses belonging to the account you are acting in are returned newest first.
   * The `q` search term matches the address name, street lines, city, state, postal
   * code, and country.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `addresses:read`.
   *
   * @example
   * ```ts
   * const listAddress = await client.sales.addresses.list();
   * ```
   */
  list(query: AddressListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ListAddress> {
    return this._client.get('/v1/sales/addresses', { query, ...options });
  }

  /**
   * Retrieves an address by ID.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `addresses:read`.
   *
   * @example
   * ```ts
   * const address = await client.sales.addresses.retrieve(
   *   'ad_j8cz0b79pwdb',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<APIKeysAPI.Address> {
    return this._client.get(path`/v1/sales/addresses/${id}`, options);
  }

  /**
   * Creates an address.
   *
   * The address is saved to the account you are acting in, which may be your own
   * account or a customer or supplier account you manage, and can then be used as a
   * billing or shipping address on sales orders, invoices, and shipments.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `addresses:create`.
   *
   * @example
   * ```ts
   * const address = await client.sales.addresses.create({
   *   country: 'US',
   *   name: 'Headquarters',
   *   email: 'warehouse@acme.com',
   *   locality: 'Springfield',
   *   phone: '555-123-4567',
   *   postal_code: '62701',
   *   state: 'IL',
   *   street_line_1: '123 Main St',
   *   street_line_2: 'Suite 400',
   *   type: 'standard',
   * });
   * ```
   */
  create(body: AddressCreateParams, options?: RequestOptions): APIPromise<APIKeysAPI.Address> {
    return this._client.post('/v1/sales/addresses', { body, ...options });
  }

  /**
   * Partially updates an address.
   *
   * Changing a street, locality, state, postal code, or country field may replace
   * the address's geolocation, so the geolocation `id` in the response can change.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `addresses:update`.
   *
   * @example
   * ```ts
   * const address = await client.sales.addresses.update(
   *   'ad_j8cz0b79pwdb',
   *   {
   *     country: 'US',
   *     email: 'warehouse@acme.com',
   *     locality: 'Springfield',
   *     name: 'Warehouse',
   *     phone: '555-123-4567',
   *     postal_code: '62701',
   *     state: 'IL',
   *     street_line_1: '123 Main St',
   *     street_line_2: 'Suite 400',
   *     type: 'standard',
   *   },
   * );
   * ```
   */
  update(
    id: string,
    body: AddressUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<APIKeysAPI.Address> {
    return this._client.patch(path`/v1/sales/addresses/${id}`, { body, ...options });
  }

  /**
   * Deletes an address.
   *
   * Deletion fails if the address is in use as a billing or shipping address on a
   * sales order, invoice, or shipment, or as a default account address.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `addresses:delete`.
   *
   * @example
   * ```ts
   * const address = await client.sales.addresses.delete(
   *   'ad_j8cz0b79pwdb',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<AddressDeleteResponse> {
    return this._client.delete(path`/v1/sales/addresses/${id}`, options);
  }
}

/**
 * Address details supplied when creating an address, either on its own or inline
 * on another resource.
 *
 * A few requests, such as shipping rate estimates, take these same fields for a
 * one-off address that is never saved to the account.
 */
export interface AddressInput {
  /**
   * Two-letter ISO 3166-1 country code, such as `US`.
   */
  country: string;

  /**
   * Display name of the address.
   */
  name: string;

  /**
   * Email address associated with the address.
   */
  email?: string;

  /**
   * City or locality.
   */
  locality?: string;

  /**
   * Phone number associated with the address.
   */
  phone?: string;

  /**
   * Postal or ZIP code.
   */
  postal_code?: string;

  /**
   * The operating calendar naming the days this dock accepts freight, overriding the
   * customer's own.
   */
  receive_calendar_id?: string;

  /**
   * State or administrative area.
   */
  state?: string;

  /**
   * First line of the street address.
   */
  street_line_1?: string;

  /**
   * Second line of the street address.
   */
  street_line_2?: string;

  /**
   * How the address is used.
   *
   * - `standard`: a normal shipping or billing address.
   * - `drop_ship`: an address an order is shipped to directly, typically a third
   *   party or end customer rather than the account itself.
   */
  type?: 'standard' | 'drop_ship';
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListAddress {
  /**
   * Resources in this page.
   */
  data: Array<APIKeysAPI.Address>;

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
 * Request to partially update an address.
 *
 * Omitted fields are left unchanged.
 */
export interface UpdateAddressRequest {
  /**
   * Two-letter country code.
   */
  country?: string;

  /**
   * Email address associated with the address.
   *
   * Send `null` to clear.
   */
  email?: string | null;

  /**
   * City or locality.
   */
  locality?: string;

  /**
   * Display name of the address.
   */
  name?: string;

  /**
   * Phone number associated with the address.
   *
   * Send `null` to clear.
   */
  phone?: string | null;

  /**
   * Postal or ZIP code.
   */
  postal_code?: string;

  /**
   * The operating calendar naming the days this dock accepts freight, overriding the
   * customer's own. Clearing it returns this address to the customer's own calendar.
   */
  receive_calendar_id?: string | null;

  /**
   * State or administrative area.
   */
  state?: string;

  /**
   * First line of the street address.
   */
  street_line_1?: string;

  /**
   * Second line of the street address.
   *
   * Send `null` to clear.
   */
  street_line_2?: string | null;

  /**
   * How the address is used.
   *
   * - `standard`: a normal shipping or billing address.
   * - `drop_ship`: an address an order is shipped to directly, typically a third
   *   party or end customer rather than the account itself.
   */
  type?: 'standard' | 'drop_ship';
}

export interface AddressDeleteResponse {}

export interface AddressListParams {
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

  /**
   * Filters results to addresses of the given type.
   */
  type?: 'standard' | 'drop_ship';
}

export interface AddressCreateParams {
  /**
   * Two-letter ISO 3166-1 country code, such as `US`.
   */
  country: string;

  /**
   * Display name of the address.
   */
  name: string;

  /**
   * Email address associated with the address.
   */
  email?: string;

  /**
   * City or locality.
   */
  locality?: string;

  /**
   * Phone number associated with the address.
   */
  phone?: string;

  /**
   * Postal or ZIP code.
   */
  postal_code?: string;

  /**
   * The operating calendar naming the days this dock accepts freight, overriding the
   * customer's own.
   */
  receive_calendar_id?: string;

  /**
   * State or administrative area.
   */
  state?: string;

  /**
   * First line of the street address.
   */
  street_line_1?: string;

  /**
   * Second line of the street address.
   */
  street_line_2?: string;

  /**
   * How the address is used.
   *
   * - `standard`: a normal shipping or billing address.
   * - `drop_ship`: an address an order is shipped to directly, typically a third
   *   party or end customer rather than the account itself.
   */
  type?: 'standard' | 'drop_ship';
}

export interface AddressUpdateParams {
  /**
   * Two-letter country code.
   */
  country?: string;

  /**
   * Email address associated with the address.
   *
   * Send `null` to clear.
   */
  email?: string | null;

  /**
   * City or locality.
   */
  locality?: string;

  /**
   * Display name of the address.
   */
  name?: string;

  /**
   * Phone number associated with the address.
   *
   * Send `null` to clear.
   */
  phone?: string | null;

  /**
   * Postal or ZIP code.
   */
  postal_code?: string;

  /**
   * The operating calendar naming the days this dock accepts freight, overriding the
   * customer's own. Clearing it returns this address to the customer's own calendar.
   */
  receive_calendar_id?: string | null;

  /**
   * State or administrative area.
   */
  state?: string;

  /**
   * First line of the street address.
   */
  street_line_1?: string;

  /**
   * Second line of the street address.
   *
   * Send `null` to clear.
   */
  street_line_2?: string | null;

  /**
   * How the address is used.
   *
   * - `standard`: a normal shipping or billing address.
   * - `drop_ship`: an address an order is shipped to directly, typically a third
   *   party or end customer rather than the account itself.
   */
  type?: 'standard' | 'drop_ship';
}

export declare namespace Addresses {
  export {
    type AddressInput as AddressInput,
    type ListAddress as ListAddress,
    type UpdateAddressRequest as UpdateAddressRequest,
    type AddressDeleteResponse as AddressDeleteResponse,
    type AddressListParams as AddressListParams,
    type AddressCreateParams as AddressCreateParams,
    type AddressUpdateParams as AddressUpdateParams,
  };
}
