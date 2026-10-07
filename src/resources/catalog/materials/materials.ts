// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ItemsAPI from '../items/items';
import * as ActionsAPI from './actions';
import {
  ActionBulkUpsertParams,
  Actions,
  BulkUpsertMaterialsRequest,
  UpsertMaterialInput,
  UpsertMaterialProperty,
} from './actions';
import * as UnitsAPI from '../units/units';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage materials.
 */
export class Materials extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of materials, newest first.
   *
   * `q` matches against SKU and description, with closer SKU matches ranked first.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `materials:read`.
   *
   * @example
   * ```ts
   * const listMaterial = await client.catalog.materials.list();
   * ```
   */
  list(
    query: MaterialListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListMaterial> {
    return this._client.get('/v1/catalog/materials', { query, ...options });
  }

  /**
   * Returns a material by ID.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `materials:read`.
   *
   * @example
   * ```ts
   * const material = await client.catalog.materials.retrieve(
   *   'ml_ow202v78slbl',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: MaterialRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Material> {
    return this._client.get(path`/v1/catalog/materials/${id}`, { query, ...options });
  }

  /**
   * Creates a material together with the catalog item that carries its SKU,
   * description, category, pricing, and attributes.
   *
   * Inventory tracking for the new material starts at a zero on-hand quantity in the
   * category's base unit. The item's consumption rate (`burn_rate`) also starts at
   * zero and cannot be supplied here — it is derived from recorded consumption as
   * production happens.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `materials:create`.
   *
   * @example
   * ```ts
   * const material = await client.catalog.materials.create({
   *   category_id: 'ic_d06g9c6yc9ck',
   *   sku: 'MAT-001',
   *   attribute_ids: ['at_rf1w295jt5ia'],
   *   description:
   *     'Cold-rolled 304 stainless steel sheet, 1.5mm',
   *   lead_time: { value: '7.00', unit_id: 'un_82bd37dae5po' },
   *   notes:
   *     'Store flat in a dry area to avoid surface oxidation.',
   *   order_point: {
   *     value: '100.00',
   *     unit_id: 'un_82bd37dae5po',
   *   },
   *   unit_cost: {
   *     value: '8.25',
   *     numerator_unit_id: 'un_82bd37dae5po',
   *     denominator_unit_id: 'un_82bd37dae5po',
   *   },
   *   unit_price: {
   *     value: '12.50',
   *     numerator_unit_id: 'un_82bd37dae5po',
   *     denominator_unit_id: 'un_82bd37dae5po',
   *   },
   * });
   * ```
   */
  create(params: MaterialCreateParams, options?: RequestOptions): APIPromise<Material> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/materials', { query: { include }, body, ...options });
  }

  /**
   * Partially updates a material.
   *
   * Fields not provided retain their current values. Only the cost side of pricing
   * can be changed here; the selling price set at creation is not editable through
   * this endpoint.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `materials:update`.
   *
   * @example
   * ```ts
   * const material = await client.catalog.materials.update(
   *   'ml_ow202v78slbl',
   *   {
   *     category_id: 'ic_d06g9c6yc9ck',
   *     description:
   *       'Cold-rolled 304 stainless steel sheet, 2.0mm',
   *     lead_time: {
   *       value: '10.00',
   *       unit_id: 'un_82bd37dae5po',
   *     },
   *     notes: 'Reorder point raised after Q2 demand spike.',
   *     order_point: {
   *       value: '150.00',
   *       unit_id: 'un_82bd37dae5po',
   *     },
   *     sku: 'MAT-001-UPDATED',
   *     unit_cost: {
   *       value: '9.10',
   *       numerator_unit_id: 'un_82bd37dae5po',
   *       denominator_unit_id: 'un_82bd37dae5po',
   *     },
   *   },
   * );
   * ```
   */
  update(
    id: string,
    params: MaterialUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Material> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/catalog/materials/${id}`, { query: { include }, body, ...options });
  }

  /**
   * Deletes a material.
   *
   * This is a soft delete: the material and the catalog item behind it stop being
   * returned by other endpoints, but the records are retained. The response is the
   * material as it stood immediately before deletion, and deleting an
   * already-deleted material returns an error.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `materials:delete`.
   *
   * @example
   * ```ts
   * const material = await client.catalog.materials.delete(
   *   'ml_ow202v78slbl',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<Material> {
    return this._client.delete(path`/v1/catalog/materials/${id}`, options);
  }
}

/**
 * Request to create a material.
 */
export interface CreateMaterialRequest {
  /**
   * ID of the item category to place the material in.
   *
   * The category's unit group determines the base unit used for the material's rates
   * (`unit_value`, `unit_cost`, `burn_rate`).
   */
  category_id: string;

  /**
   * Stock keeping unit code for the material.
   *
   * Must be unique within the account; creating a material with a SKU already used
   * by another item fails with a conflict error.
   */
  sku: string;

  /**
   * IDs of existing attributes to link to the material at creation time.
   *
   * Each attribute's property must be one the material's category carries; an
   * attribute from any other property fails the whole request.
   */
  attribute_ids?: Array<string>;

  /**
   * Free-form description of the material.
   */
  description?: string;

  /**
   * A quantity, given as a decimal value and the unit it is measured in.
   */
  lead_time?: QuantityInputRequest;

  /**
   * Free-form notes about the material.
   */
  notes?: string;

  /**
   * A quantity, given as a decimal value and the unit it is measured in.
   */
  order_point?: QuantityInputRequest;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_cost?: RateInput;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: RateInput;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListMaterial {
  /**
   * Resources in this page.
   */
  data: Array<Material>;

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
 * A material in the account's catalog: a raw material or component consumed in
 * production.
 *
 * Material-level data such as the SKU, description, category, pricing, and
 * attributes lives on the underlying `item`; the material record adds the
 * reordering fields `order_point` and `lead_time`.
 */
export interface Material {
  /**
   * Material ID.
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
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  lead_time: Quantity | null;

  /**
   * Resource type identifier.
   */
  object: 'material';

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  order_point: Quantity | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A measured amount: a numeric value together with the unit it is expressed in.
 *
 * Quantities are shared building blocks rather than standalone records — other
 * resources point at them to report stock levels, ordered and packed amounts,
 * money, weights, and durations.
 */
export interface Quantity {
  /**
   * Quantity ID.
   */
  id: string;

  /**
   * Formatted value with unit abbreviation (e.g. "$1,234.56" or "100 kg").
   */
  display_value: string;

  /**
   * Resource type identifier.
   */
  object: 'quantity';

  /**
   * Unit of measurement used for conversions and product quantities.
   */
  unit: UnitsAPI.Unit | null;

  /**
   * Raw decimal value of the quantity, as a string to preserve precision.
   *
   * This is the unformatted machine value; see `display_value` for the
   * human-readable rendering with unit and thousands separators.
   */
  value: string;
}

/**
 * A quantity, given as a decimal value and the unit it is measured in.
 */
export interface QuantityInputRequest {
  /**
   * ID of the unit the value is expressed in.
   */
  unit_id: string;

  /**
   * Decimal value of the quantity.
   */
  value: string;
}

/**
 * A value expressed as a ratio of two units, supplied on create and update
 * requests.
 *
 * A unit price, for example, has a currency as its numerator unit and the unit the
 * product is bought or sold by as its denominator.
 */
export interface RateInput {
  /**
   * ID of the unit for the rate's denominator (the per-unit basis).
   */
  denominator_unit_id: string;

  /**
   * ID of the unit for the rate's numerator (e.g. the currency of a price).
   */
  numerator_unit_id: string;

  /**
   * Decimal value of the rate, expressed as the amount of the numerator unit per one
   * denominator unit.
   */
  value: string;
}

/**
 * Request to update a material.
 */
export interface UpdateMaterialRequest {
  /**
   * ID of the item category to move the material to.
   *
   * The move is the one Change Item Category makes: the category has to be a
   * material category and has to carry the properties of every attribute the
   * material already has, and the material's rate and order-point units switch to
   * the category's base unit while their numbers stay as they were. It is applied
   * before the other fields in the request, so an `order_point` or `unit_cost` sent
   * alongside is written after it.
   */
  category_id?: string;

  /**
   * New description for the material.
   */
  description?: string;

  /**
   * A quantity, given as a decimal value and the unit it is measured in.
   */
  lead_time?: QuantityInputRequest;

  /**
   * New notes for the material.
   */
  notes?: string;

  /**
   * A quantity, given as a decimal value and the unit it is measured in.
   */
  order_point?: QuantityInputRequest;

  /**
   * New stock keeping unit code for the material.
   *
   * Must remain unique within the account; a conflict error is returned if another
   * item already uses it.
   */
  sku?: string;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_cost?: RateInput;
}

export interface MaterialListParams {
  /**
   * Filter to materials carrying any of these attributes.
   */
  attribute_ids?: Array<string>;

  /**
   * Filter to materials in any of these categories.
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
   * Filter to materials created on or before this date.
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
   * Filter to materials created on or after this date.
   */
  starts_at?: string;
}

export interface MaterialRetrieveParams {
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

export interface MaterialCreateParams {
  /**
   * Body param: ID of the item category to place the material in.
   *
   * The category's unit group determines the base unit used for the material's rates
   * (`unit_value`, `unit_cost`, `burn_rate`).
   */
  category_id: string;

  /**
   * Body param: Stock keeping unit code for the material.
   *
   * Must be unique within the account; creating a material with a SKU already used
   * by another item fails with a conflict error.
   */
  sku: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
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
   * Body param: IDs of existing attributes to link to the material at creation time.
   *
   * Each attribute's property must be one the material's category carries; an
   * attribute from any other property fails the whole request.
   */
  attribute_ids?: Array<string>;

  /**
   * Body param: Free-form description of the material.
   */
  description?: string;

  /**
   * Body param: A quantity, given as a decimal value and the unit it is measured in.
   */
  lead_time?: QuantityInputRequest;

  /**
   * Body param: Free-form notes about the material.
   */
  notes?: string;

  /**
   * Body param: A quantity, given as a decimal value and the unit it is measured in.
   */
  order_point?: QuantityInputRequest;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_cost?: RateInput;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: RateInput;
}

export interface MaterialUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
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
   * Body param: ID of the item category to move the material to.
   *
   * The move is the one Change Item Category makes: the category has to be a
   * material category and has to carry the properties of every attribute the
   * material already has, and the material's rate and order-point units switch to
   * the category's base unit while their numbers stay as they were. It is applied
   * before the other fields in the request, so an `order_point` or `unit_cost` sent
   * alongside is written after it.
   */
  category_id?: string;

  /**
   * Body param: New description for the material.
   */
  description?: string;

  /**
   * Body param: A quantity, given as a decimal value and the unit it is measured in.
   */
  lead_time?: QuantityInputRequest;

  /**
   * Body param: New notes for the material.
   */
  notes?: string;

  /**
   * Body param: A quantity, given as a decimal value and the unit it is measured in.
   */
  order_point?: QuantityInputRequest;

  /**
   * Body param: New stock keeping unit code for the material.
   *
   * Must remain unique within the account; a conflict error is returned if another
   * item already uses it.
   */
  sku?: string;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_cost?: RateInput;
}

Materials.Actions = Actions;

export declare namespace Materials {
  export {
    type CreateMaterialRequest as CreateMaterialRequest,
    type ListMaterial as ListMaterial,
    type Material as Material,
    type Quantity as Quantity,
    type QuantityInputRequest as QuantityInputRequest,
    type RateInput as RateInput,
    type UpdateMaterialRequest as UpdateMaterialRequest,
    type MaterialListParams as MaterialListParams,
    type MaterialRetrieveParams as MaterialRetrieveParams,
    type MaterialCreateParams as MaterialCreateParams,
    type MaterialUpdateParams as MaterialUpdateParams,
  };

  export {
    Actions as Actions,
    type BulkUpsertMaterialsRequest as BulkUpsertMaterialsRequest,
    type UpsertMaterialInput as UpsertMaterialInput,
    type UpsertMaterialProperty as UpsertMaterialProperty,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
