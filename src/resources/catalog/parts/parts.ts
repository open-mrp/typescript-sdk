// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ItemsAPI from '../items/items';
import * as MaterialsAPI from '../materials/materials';
import * as ActionsAPI from './actions';
import {
  ActionBulkUpsertParams,
  Actions,
  BulkUpsertPartsRequest,
  UpsertPartInput,
  UpsertPartProperty,
} from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage parts.
 */
export class Parts extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of parts for the current account, most recently created
   * first.
   *
   * The `q` search term matches the part's SKU or description. When it is supplied,
   * the parts whose SKU matches it most closely are returned first, ordered by
   * creation time within each level of match.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `parts:read`.
   *
   * @example
   * ```ts
   * const listPart = await client.catalog.parts.list();
   * ```
   */
  list(query: PartListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ListPart> {
    return this._client.get('/v1/catalog/parts', { query, ...options });
  }

  /**
   * Returns a part by ID.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `parts:read`.
   *
   * @example
   * ```ts
   * const part = await client.catalog.parts.retrieve(
   *   'pt_coba9fgvd84c',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: PartRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Part> {
    return this._client.get(path`/v1/catalog/parts/${id}`, { query, ...options });
  }

  /**
   * Creates a part with the specified SKU and category.
   *
   * Inventory tracking for the new part starts at a zero on-hand quantity in the
   * category's base unit.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `parts:create`.
   *
   * @example
   * ```ts
   * const part = await client.catalog.parts.create({
   *   category_id: 'ic_d06g9c6yc9ck',
   *   sku: 'BRG-6204-2RS',
   *   attribute_ids: ['at_rf1w295jt5ia'],
   *   description: 'Deep groove ball bearing, 20x47x14mm',
   *   notes:
   *     'OEM-equivalent; verify shielding type before substitution.',
   *   unit_cost: {
   *     value: '9.40',
   *     numerator_unit_id: 'un_82bd37dae5po',
   *     denominator_unit_id: 'un_82bd37dae5po',
   *   },
   *   unit_price: {
   *     value: '14.99',
   *     numerator_unit_id: 'un_82bd37dae5po',
   *     denominator_unit_id: 'un_82bd37dae5po',
   *   },
   * });
   * ```
   */
  create(params: PartCreateParams, options?: RequestOptions): APIPromise<Part> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/parts', { query: { include }, body, ...options });
  }

  /**
   * Partially updates a part.
   *
   * Fields not provided retain their current values. The SKU, description, notes,
   * and category are editable here; the part's attributes are changed through the
   * item endpoints.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `parts:update`.
   *
   * @example
   * ```ts
   * const part = await client.catalog.parts.update(
   *   'pt_coba9fgvd84c',
   *   {
   *     category_id: 'ic_d06g9c6yc9ck',
   *     description: 'Deep groove ball bearing, 20x47x14mm',
   *     notes:
   *       'Superseded by low-friction variant; keep for legacy assemblies.',
   *     sku: 'BRG-6204-2RS',
   *   },
   * );
   * ```
   */
  update(
    id: string,
    params: PartUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Part> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/catalog/parts/${id}`, { query: { include }, body, ...options });
  }

  /**
   * Deletes a part.
   *
   * This is a soft delete: the part is marked deleted and no longer returned by
   * other endpoints, but the record is retained. Deleting an already-deleted part
   * returns an error.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `parts:delete`.
   *
   * @example
   * ```ts
   * const part = await client.catalog.parts.delete(
   *   'pt_coba9fgvd84c',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<Part> {
    return this._client.delete(path`/v1/catalog/parts/${id}`, options);
  }
}

/**
 * Request to create a part.
 */
export interface CreatePartRequest {
  /**
   * ID of the item category to place the part in.
   *
   * The category's unit group determines the base unit used for the part's rates
   * (`unit_value`, `unit_cost`, `burn_rate`).
   */
  category_id: string;

  /**
   * Stock keeping unit code for the part.
   *
   * Must be unique within the account; creating a part with a SKU already used by
   * another item fails with a conflict error.
   */
  sku: string;

  /**
   * IDs of existing attributes to link to the part at creation time.
   *
   * Each attribute's property must be one the part's category carries; an attribute
   * from any other property fails the whole request.
   */
  attribute_ids?: Array<string>;

  /**
   * Free-form description of the part.
   */
  description?: string;

  /**
   * Free-form notes about the part.
   */
  notes?: string;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_cost?: MaterialsAPI.RateInput;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListPart {
  /**
   * Resources in this page.
   */
  data: Array<Part>;

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
 * A part in the account's catalog: a component used in production.
 *
 * Part-level data such as the SKU, description, category, pricing, and attributes
 * lives on the underlying `item`.
 */
export interface Part {
  /**
   * Part ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * An entry in your catalog: something you sell, consume, or build with.
   */
  item: ItemsAPI.Item | null;

  /**
   * Resource type identifier.
   */
  object: 'part';

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Request to partially update a part.
 */
export interface UpdatePartRequest {
  /**
   * ID of the item category to move the part to.
   *
   * The move is the one Change Item Category makes: the category has to be a product
   * category and has to carry the properties of every attribute the part already
   * has, and the part's rate units switch to the category's base unit while their
   * numbers stay as they were. It is applied before the other fields in the request.
   */
  category_id?: string;

  /**
   * New free-form description of the part.
   */
  description?: string | null;

  /**
   * New free-form notes about the part.
   */
  notes?: string | null;

  /**
   * New stock keeping unit code for the part.
   *
   * Must remain unique within the account; a conflict error is returned if another
   * item already uses it.
   */
  sku?: string;
}

export interface PartListParams {
  /**
   * Only return parts carrying at least one of these attributes.
   */
  attribute_ids?: Array<string>;

  /**
   * Only return parts belonging to any of these item categories.
   */
  category_ids?: Array<string>;

  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Only return parts created at or before this time.
   */
  ends_at?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'item'
    | 'item.category'
    | 'item.category.properties'
    | 'item.category.unit_group'
    | 'item.unit_value'
    | 'item.unit_cost'
    | 'item.burn_rate'
    | 'item.attributes'
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
   * Only return parts created at or after this time.
   */
  starts_at?: string;
}

export interface PartRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'item'
    | 'item.category'
    | 'item.category.properties'
    | 'item.category.unit_group'
    | 'item.unit_value'
    | 'item.unit_cost'
    | 'item.burn_rate'
    | 'item.attributes'
  >;
}

export interface PartCreateParams {
  /**
   * Body param: ID of the item category to place the part in.
   *
   * The category's unit group determines the base unit used for the part's rates
   * (`unit_value`, `unit_cost`, `burn_rate`).
   */
  category_id: string;

  /**
   * Body param: Stock keeping unit code for the part.
   *
   * Must be unique within the account; creating a part with a SKU already used by
   * another item fails with a conflict error.
   */
  sku: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    'item' | 'item.category' | 'item.unit_value' | 'item.unit_cost' | 'item.burn_rate' | 'item.attributes'
  >;

  /**
   * Body param: IDs of existing attributes to link to the part at creation time.
   *
   * Each attribute's property must be one the part's category carries; an attribute
   * from any other property fails the whole request.
   */
  attribute_ids?: Array<string>;

  /**
   * Body param: Free-form description of the part.
   */
  description?: string;

  /**
   * Body param: Free-form notes about the part.
   */
  notes?: string;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_cost?: MaterialsAPI.RateInput;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

export interface PartUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    'item' | 'item.category' | 'item.unit_value' | 'item.unit_cost' | 'item.burn_rate' | 'item.attributes'
  >;

  /**
   * Body param: ID of the item category to move the part to.
   *
   * The move is the one Change Item Category makes: the category has to be a product
   * category and has to carry the properties of every attribute the part already
   * has, and the part's rate units switch to the category's base unit while their
   * numbers stay as they were. It is applied before the other fields in the request.
   */
  category_id?: string;

  /**
   * Body param: New free-form description of the part.
   */
  description?: string | null;

  /**
   * Body param: New free-form notes about the part.
   */
  notes?: string | null;

  /**
   * Body param: New stock keeping unit code for the part.
   *
   * Must remain unique within the account; a conflict error is returned if another
   * item already uses it.
   */
  sku?: string;
}

Parts.Actions = Actions;

export declare namespace Parts {
  export {
    type CreatePartRequest as CreatePartRequest,
    type ListPart as ListPart,
    type Part as Part,
    type UpdatePartRequest as UpdatePartRequest,
    type PartListParams as PartListParams,
    type PartRetrieveParams as PartRetrieveParams,
    type PartCreateParams as PartCreateParams,
    type PartUpdateParams as PartUpdateParams,
  };

  export {
    Actions as Actions,
    type BulkUpsertPartsRequest as BulkUpsertPartsRequest,
    type UpsertPartInput as UpsertPartInput,
    type UpsertPartProperty as UpsertPartProperty,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
