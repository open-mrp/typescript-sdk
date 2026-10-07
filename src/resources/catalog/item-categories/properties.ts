// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CatalogPropertiesAPI from '../properties/properties';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage item categories.
 */
export class Properties extends APIResource {
  /**
   * Attaches one of your account's properties to an item category.
   *
   * The property then appears among the category's properties, including in the
   * customer-facing catalog, describing a dimension along which the category's items
   * vary. Each property name can appear only once per category, so attaching a
   * property whose name duplicates one already there returns a conflict error.
   *
   * This endpoint requires the permission: `item_categories:update`.
   *
   * @example
   * ```ts
   * const property =
   *   await client.catalog.itemCategories.properties.update(
   *     'pp_fhnnvtt3q3ov',
   *     { id: 'ic_d06g9c6yc9ck' },
   *   );
   * ```
   */
  update(
    propertyID: string,
    params: PropertyUpdateParams,
    options?: RequestOptions,
  ): APIPromise<PropertyUpdateResponse> {
    const { id } = params;
    return this._client.put(path`/v1/catalog/item-categories/${id}/properties/${propertyID}`, options);
  }

  /**
   * Creates a property and attaches it to an item category, returning the new
   * property.
   *
   * The property is one of your account's properties like any other, starting with
   * no attributes, and the category carries it from the moment it exists. Both
   * happen in one request that needs only permission to update the category. A name
   * already used by one of your account's properties returns a conflict error naming
   * `name`.
   *
   * This endpoint requires the permission: `item_categories:update`.
   *
   * @example
   * ```ts
   * const property =
   *   await client.catalog.itemCategories.properties.create(
   *     'ic_d06g9c6yc9ck',
   *     { name: 'Color' },
   *   );
   * ```
   */
  create(
    id: string,
    params: PropertyCreateParams,
    options?: RequestOptions,
  ): APIPromise<CatalogPropertiesAPI.Property> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/catalog/item-categories/${id}/properties`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Detaches a property from an item category.
   *
   * Only the link between the property and the category is removed; the property
   * itself and its attributes are left intact and stay available to other
   * categories. The property must belong to your account.
   *
   * This endpoint requires the permission: `item_categories:update`.
   *
   * @example
   * ```ts
   * const property =
   *   await client.catalog.itemCategories.properties.delete(
   *     'pp_fhnnvtt3q3ov',
   *     { id: 'ic_d06g9c6yc9ck' },
   *   );
   * ```
   */
  delete(
    propertyID: string,
    params: PropertyDeleteParams,
    options?: RequestOptions,
  ): APIPromise<PropertyDeleteResponse> {
    const { id } = params;
    return this._client.delete(path`/v1/catalog/item-categories/${id}/properties/${propertyID}`, options);
  }
}

/**
 * Request to create a property on an item category.
 */
export interface CreateItemCategoryPropertyRequest {
  /**
   * Display name of the new property, such as `Color` or `Size`.
   *
   * Must be unique within your account. To attach a property that already exists,
   * use the add item category property endpoint.
   */
  name: string;
}

export interface PropertyUpdateResponse {}

export interface PropertyDeleteResponse {}

export interface PropertyUpdateParams {
  /**
   * Item category ID.
   */
  id: string;
}

export interface PropertyCreateParams {
  /**
   * Body param: Display name of the new property, such as `Color` or `Size`.
   *
   * Must be unique within your account. To attach a property that already exists,
   * use the add item category property endpoint.
   */
  name: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'attributes'>;
}

export interface PropertyDeleteParams {
  /**
   * Item category ID.
   */
  id: string;
}

export declare namespace Properties {
  export {
    type CreateItemCategoryPropertyRequest as CreateItemCategoryPropertyRequest,
    type PropertyUpdateResponse as PropertyUpdateResponse,
    type PropertyDeleteResponse as PropertyDeleteResponse,
    type PropertyUpdateParams as PropertyUpdateParams,
    type PropertyCreateParams as PropertyCreateParams,
    type PropertyDeleteParams as PropertyDeleteParams,
  };
}
