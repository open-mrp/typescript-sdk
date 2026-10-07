// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ActionsAPI from './actions';
import {
  ActionBulkUpsertParams,
  Actions,
  BulkUpsertItemCategoriesRequest,
  ObjectIdentifier,
  UpsertItemCategoryInput,
} from './actions';
import * as PropertiesAPI from './properties';
import {
  CreateItemCategoryPropertyRequest,
  Properties,
  PropertyCreateParams,
  PropertyDeleteParams,
  PropertyDeleteResponse,
  PropertyUpdateParams,
  PropertyUpdateResponse,
} from './properties';
import * as ItemsAPI from '../items/items';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage item categories.
 */
export class ItemCategories extends APIResource {
  properties: PropertiesAPI.Properties = new PropertiesAPI.Properties(this._client);
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of the item categories available to the current
   * account, newest first.
   *
   * Both the account's own categories and the platform-provided system categories
   * are included. The `q` search term is matched against the category name.
   *
   * This endpoint requires the permission: `item_categories:read`.
   *
   * @example
   * ```ts
   * const listItemCategory =
   *   await client.catalog.itemCategories.list();
   * ```
   */
  list(
    query: ItemCategoryListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListItemCategory> {
    return this._client.get('/v1/catalog/item-categories', { query, ...options });
  }

  /**
   * Returns an item category by ID.
   *
   * Both account-owned categories and global system categories can be retrieved.
   *
   * This endpoint requires the permission: `item_categories:read`.
   *
   * @example
   * ```ts
   * const itemCategory =
   *   await client.catalog.itemCategories.retrieve(
   *     'ic_d06g9c6yc9ck',
   *   );
   * ```
   */
  retrieve(
    id: string,
    query: ItemCategoryRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ItemsAPI.ItemCategory> {
    return this._client.get(path`/v1/catalog/item-categories/${id}`, { query, ...options });
  }

  /**
   * Creates an item category owned by your account.
   *
   * The new category starts with no properties; attach them afterwards with the Add
   * Item Category Property endpoint.
   *
   * This endpoint requires the permission: `item_categories:create`.
   *
   * @example
   * ```ts
   * const itemCategory =
   *   await client.catalog.itemCategories.create({
   *     name: 'Electronics',
   *     type: 'material_category',
   *     unit_group_id: 'ug_andst6m79n41',
   *   });
   * ```
   */
  create(params: ItemCategoryCreateParams, options?: RequestOptions): APIPromise<ItemsAPI.ItemCategory> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/item-categories', { query: { include }, body, ...options });
  }

  /**
   * Updates the name or notes of an item category owned by your account.
   *
   * Only the fields present in the request body are changed. A category's type is
   * fixed at creation, and its unit group is changed through the Change Item
   * Category Unit Group endpoint. System-owned categories cannot be updated.
   *
   * This endpoint requires the permission: `item_categories:update`.
   *
   * @example
   * ```ts
   * const itemCategory =
   *   await client.catalog.itemCategories.update(
   *     'ic_d06g9c6yc9ck',
   *     {
   *       name: 'Electronic Components',
   *       notes:
   *         'Covers passive and active components; excludes assemblies.',
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    params: ItemCategoryUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ItemsAPI.ItemCategory> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/catalog/item-categories/${id}`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Deletes an item category owned by your account.
   *
   * System-owned categories cannot be deleted. Deleting a category that was already
   * deleted returns an already-deleted error rather than a not-found error.
   *
   * This endpoint requires the permission: `item_categories:delete`.
   *
   * @example
   * ```ts
   * const itemCategory =
   *   await client.catalog.itemCategories.delete(
   *     'ic_d06g9c6yc9ck',
   *   );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<ItemCategoryDeleteResponse> {
    return this._client.delete(path`/v1/catalog/item-categories/${id}`, options);
  }

  /**
   * Changes the unit group of an item category, and with it the units its items can
   * be ordered in.
   *
   * The new unit group must have the same unit type as the current one — for
   * example, a category measured in `mass` units can only switch to another `mass`
   * unit group. System-owned categories cannot be modified.
   *
   * This endpoint requires the permission: `item_categories:update`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.catalog.itemCategories.changeUnitGroup(
   *     'ug_andst6m79n41',
   *     { id: 'ic_d06g9c6yc9ck' },
   *   );
   * ```
   */
  changeUnitGroup(
    unitGroupID: string,
    params: ItemCategoryChangeUnitGroupParams,
    options?: RequestOptions,
  ): APIPromise<ItemCategoryChangeUnitGroupResponse> {
    const { id } = params;
    return this._client.put(path`/v1/catalog/item-categories/${id}/unit-groups/${unitGroupID}`, options);
  }
}

/**
 * Request to create an item category.
 */
export interface CreateItemCategoryRequest {
  /**
   * Display name of the item category.
   */
  name: string;

  /**
   * What kind of items this category groups.
   *
   * - `material_category`: groups raw materials and components (items of type
   *   `material`).
   * - `product_category`: groups finished products and parts (items of type
   *   `product` or `part`).
   *
   * The type is fixed once the category is created.
   */
  type: 'material_category' | 'product_category';

  /**
   * ID of the unit group that determines the units of measure available to items in
   * this category.
   *
   * Must be one of your account's unit groups or a platform-provided one. After
   * creation the unit group can only be replaced by another unit group of the same
   * unit type, through the Change Item Category Unit Group endpoint.
   */
  unit_group_id: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListItemCategory {
  /**
   * Resources in this page.
   */
  data: Array<ItemsAPI.ItemCategory>;

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
 * Request to partially update an item category.
 */
export interface UpdateItemCategoryRequest {
  /**
   * Display name of the item category.
   */
  name?: string;

  /**
   * Free-form notes about the item category.
   */
  notes?: string;
}

export interface ItemCategoryDeleteResponse {}

export interface ItemCategoryChangeUnitGroupResponse {}

export interface ItemCategoryListParams {
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
  include?: Array<
    | 'owner'
    | 'owner.account'
    | 'properties'
    | 'unit_group'
    | 'unit_group.base_unit'
    | 'unit_group.associated_units'
    | 'unit_group.associated_units.unit'
  >;

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
   * Filter by item category type.
   */
  type?: 'material_category' | 'product_category';
}

export interface ItemCategoryRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'owner'
    | 'owner.account'
    | 'properties'
    | 'unit_group'
    | 'unit_group.base_unit'
    | 'unit_group.associated_units'
    | 'unit_group.associated_units.unit'
  >;
}

export interface ItemCategoryCreateParams {
  /**
   * Body param: Display name of the item category.
   */
  name: string;

  /**
   * Body param: What kind of items this category groups.
   *
   * - `material_category`: groups raw materials and components (items of type
   *   `material`).
   * - `product_category`: groups finished products and parts (items of type
   *   `product` or `part`).
   *
   * The type is fixed once the category is created.
   */
  type: 'material_category' | 'product_category';

  /**
   * Body param: ID of the unit group that determines the units of measure available
   * to items in this category.
   *
   * Must be one of your account's unit groups or a platform-provided one. After
   * creation the unit group can only be replaced by another unit group of the same
   * unit type, through the Change Item Category Unit Group endpoint.
   */
  unit_group_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'owner'
    | 'owner.account'
    | 'properties'
    | 'unit_group'
    | 'unit_group.base_unit'
    | 'unit_group.associated_units'
    | 'unit_group.associated_units.unit'
  >;
}

export interface ItemCategoryUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'owner'
    | 'owner.account'
    | 'properties'
    | 'unit_group'
    | 'unit_group.base_unit'
    | 'unit_group.associated_units'
    | 'unit_group.associated_units.unit'
  >;

  /**
   * Body param: Display name of the item category.
   */
  name?: string;

  /**
   * Body param: Free-form notes about the item category.
   */
  notes?: string;
}

export interface ItemCategoryChangeUnitGroupParams {
  /**
   * Item category ID.
   */
  id: string;
}

ItemCategories.Properties = Properties;
ItemCategories.Actions = Actions;

export declare namespace ItemCategories {
  export {
    type CreateItemCategoryRequest as CreateItemCategoryRequest,
    type ListItemCategory as ListItemCategory,
    type UpdateItemCategoryRequest as UpdateItemCategoryRequest,
    type ItemCategoryDeleteResponse as ItemCategoryDeleteResponse,
    type ItemCategoryChangeUnitGroupResponse as ItemCategoryChangeUnitGroupResponse,
    type ItemCategoryListParams as ItemCategoryListParams,
    type ItemCategoryRetrieveParams as ItemCategoryRetrieveParams,
    type ItemCategoryCreateParams as ItemCategoryCreateParams,
    type ItemCategoryUpdateParams as ItemCategoryUpdateParams,
    type ItemCategoryChangeUnitGroupParams as ItemCategoryChangeUnitGroupParams,
  };

  export {
    Properties as Properties,
    type CreateItemCategoryPropertyRequest as CreateItemCategoryPropertyRequest,
    type PropertyUpdateResponse as PropertyUpdateResponse,
    type PropertyDeleteResponse as PropertyDeleteResponse,
    type PropertyUpdateParams as PropertyUpdateParams,
    type PropertyCreateParams as PropertyCreateParams,
    type PropertyDeleteParams as PropertyDeleteParams,
  };

  export {
    Actions as Actions,
    type BulkUpsertItemCategoriesRequest as BulkUpsertItemCategoriesRequest,
    type ObjectIdentifier as ObjectIdentifier,
    type UpsertItemCategoryInput as UpsertItemCategoryInput,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
