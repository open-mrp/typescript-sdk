// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ItemsAPI from '../items/items';
import * as MaterialsAPI from '../materials/materials';
import * as ProductLinesAPI from '../product-lines/product-lines';
import * as ActionsAPI from './actions';
import {
  ActionBulkUpsertParams,
  Actions,
  BulkUpsertProductsRequest,
  UpsertProductInput,
  UpsertProductProperty,
} from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage products.
 */
export class Products extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of products for the target account, newest first.
   *
   * Only products of type `sale` are listed — service, shipping, credit, return, and
   * tax products are excluded and must be retrieved by ID. A request made by a
   * customer-portal buyer always returns portal-visible products only, and its
   * `customer_ids` filter is replaced with the buyer's own account, so the results
   * reflect what that account is entitled to buy.
   *
   * The `q` search term is matched against the SKU and description of each product's
   * item; when it is supplied, products whose SKU matches are returned ahead of the
   * rest.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `items:read`.
   *
   * @example
   * ```ts
   * const listProduct = await client.catalog.products.list();
   * ```
   */
  list(query: ProductListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ListProduct> {
    return this._client.get('/v1/catalog/products', { query, ...options });
  }

  /**
   * Returns a product by ID.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `items:read`.
   *
   * @example
   * ```ts
   * const product = await client.catalog.products.retrieve(
   *   'pd_07oe0r7adh2w',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: ProductRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Product> {
    return this._client.get(path`/v1/catalog/products/${id}`, { query, ...options });
  }

  /**
   * Creates a product and its backing inventory item.
   *
   * The new item starts with zero on-hand inventory, and its pricing defaults to
   * zero rates in the category's base unit unless `unit_price` or `unit_cost` is
   * provided.
   *
   * Only products of type `sale` appear in the product list and export; products
   * created with any other type are still usable on orders and invoices but must be
   * retrieved by ID.
   *
   * This endpoint requires the permission: `items:create`.
   *
   * @example
   * ```ts
   * const product = await client.catalog.products.create({
   *   category_id: 'ic_d06g9c6yc9ck',
   *   sku: 'ALM-2024-1001',
   *   type: 'sale',
   *   attribute_ids: ['at_rf1w295jt5ia'],
   *   description:
   *     'Wireless barcode scanner with charging cradle',
   *   notes:
   *     'Ships with a 2-year warranty; register for extended coverage.',
   *   portal_visibility: 'visible',
   *   product_line_id: 'pdln_k9bnlgvxhxjh',
   *   unit_cost: {
   *     value: '112.00',
   *     numerator_unit_id: 'un_82bd37dae5po',
   *     denominator_unit_id: 'un_82bd37dae5po',
   *   },
   *   unit_price: {
   *     value: '199.00',
   *     numerator_unit_id: 'un_82bd37dae5po',
   *     denominator_unit_id: 'un_82bd37dae5po',
   *   },
   * });
   * ```
   */
  create(params: ProductCreateParams, options?: RequestOptions): APIPromise<Product> {
    const { include, ...body } = params;
    return this._client.post('/v1/catalog/products', { query: { include }, body, ...options });
  }

  /**
   * Partially updates a product.
   *
   * `sku`, `description`, `notes`, and `unit_price` all live on the product's
   * backing item and are written there, so the change is visible on the item as
   * well. The product line is reassigned through its own endpoint, and the product
   * type cannot be changed after creation.
   *
   * This endpoint requires the permission: `items:update`.
   *
   * @example
   * ```ts
   * const product = await client.catalog.products.update(
   *   'pd_07oe0r7adh2w',
   *   {
   *     category_id: 'ic_d06g9c6yc9ck',
   *     description:
   *       'Wireless barcode scanner with charging cradle (v2)',
   *     notes:
   *       'Firmware 2.1 improves Bluetooth pairing reliability.',
   *     portal_visibility: 'visible',
   *     sku: 'SKU-002',
   *     unit_price: {
   *       value: '219.00',
   *       numerator_unit_id: 'un_82bd37dae5po',
   *       denominator_unit_id: 'un_82bd37dae5po',
   *     },
   *   },
   * );
   * ```
   */
  update(
    id: string,
    params: ProductUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Product> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/catalog/products/${id}`, { query: { include }, body, ...options });
  }

  /**
   * Soft-deletes a product and returns it as it stood at deletion.
   *
   * Deletion marks the product's backing item as deleted, so the item and its
   * inventory drop out of catalog and inventory listings too. Deleting the same
   * product again returns an error saying it has already been deleted.
   *
   * This endpoint requires the permission: `items:delete`.
   *
   * @example
   * ```ts
   * const product = await client.catalog.products.delete(
   *   'pd_07oe0r7adh2w',
   * );
   * ```
   */
  delete(
    id: string,
    params: ProductDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Product> {
    const { include } = params ?? {};
    return this._client.delete(path`/v1/catalog/products/${id}`, { query: { include }, ...options });
  }

  /**
   * Moves a product to a different product line.
   *
   * The target product line must be one your account owns or a shared system line;
   * anything else fails as not found. Because customer accounts are granted access
   * to whole product lines, moving a product changes which buyers can see and order
   * it in the customer portal, and which default commission and freight policies
   * apply to it.
   *
   * This endpoint requires the permission: `items:update`.
   *
   * @example
   * ```ts
   * const product =
   *   await client.catalog.products.changeProductLine(
   *     'pdln_k9bnlgvxhxjh',
   *     { id: 'pd_07oe0r7adh2w' },
   *   );
   * ```
   */
  changeProductLine(
    productLineID: string,
    params: ProductChangeProductLineParams,
    options?: RequestOptions,
  ): APIPromise<Product> {
    const { id, include } = params;
    return this._client.put(path`/v1/catalog/products/${id}/product-line/${productLineID}`, {
      query: { include },
      ...options,
    });
  }
}

/**
 * Request to create a product.
 */
export interface CreateProductRequest {
  /**
   * ID of the item category for the product's item.
   *
   * The category's unit group determines the default units used for the product's
   * pricing rates and inventory tracking.
   */
  category_id: string;

  /**
   * Stock keeping unit code for the product's item.
   *
   * Must be unique within the account; creation fails with a conflict error if
   * another item already uses it.
   */
  sku: string;

  /**
   * Product type code, which determines how the product behaves on orders and
   * invoices.
   *
   * - `sale`: a standard sellable product.
   * - `service`: a non-physical service line, such as labor or installation.
   * - `shipping`: a shipping charge applied to an order.
   * - `credit`: a credit applied against an order or invoice.
   * - `return`: a returned product (RMA).
   * - `tax`: a tax line.
   */
  type: 'sale' | 'service' | 'shipping' | 'credit' | 'return' | 'tax';

  /**
   * Attribute IDs to link to the product's item at creation time.
   *
   * Every ID must already exist in your account, and each attribute's property must
   * be one the item's category carries; an ID that fails either check fails the
   * whole request rather than being skipped.
   */
  attribute_ids?: Array<string>;

  /**
   * Free-form description of the product.
   */
  description?: string;

  /**
   * Free-form notes about the product.
   */
  notes?: string;

  /**
   * Whether the product is shown to buyers in the customer portal.
   *
   * - `visible`: buyers can see and order the product in the portal.
   * - `hidden`: the product is concealed from the portal but remains usable
   *   internally.
   *
   * When omitted, the product is created hidden, so it must be set to `visible`
   * before buyers can see it.
   */
  portal_visibility?: 'visible' | 'hidden';

  /**
   * ID of the product line to assign the product to.
   *
   * The product line must be one your account owns or a shared system line; anything
   * else fails as not found. Buyers are granted access to whole product lines, so a
   * product created without one never appears in the customer portal, whatever its
   * `portal_visibility`.
   */
  product_line_id?: string;

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
export interface ListProduct {
  /**
   * Resources in this page.
   */
  data: Array<Product>;

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
 * A catalog entry as it is sold: an inventory item together with its product type,
 * product line, and customer portal visibility.
 *
 * Every product is backed by exactly one item, which carries the SKU, description,
 * pricing, attributes, and inventory position. Creating a product creates that
 * item; deleting the product deletes it.
 */
export interface Product {
  /**
   * Product ID.
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
  object: 'product';

  /**
   * Whether the product is shown to buyers in the customer portal.
   *
   * - `visible`: buyers can see and order the product in the portal.
   * - `hidden`: the product is concealed from the portal but remains usable
   *   internally.
   *
   * Visibility alone is not enough to expose a product: a buyer only sees it if
   * their account has also been granted access to the product's product line.
   */
  portal_visibility: 'visible' | 'hidden';

  /**
   * A named grouping of related products in your catalog.
   *
   * A product line carries the default commission and freight policies for the
   * products assigned to it, along with the unit group that determines how those
   * products are measured. Product lines are also the unit that catalog access is
   * granted over, for both customers and account groups.
   */
  product_line: ProductLinesAPI.ProductLine | null;

  /**
   * Product type code, which determines how the product behaves on orders and
   * invoices.
   *
   * - `sale`: a standard sellable product.
   * - `service`: a non-physical service line, such as labor or installation.
   * - `shipping`: a shipping charge applied to an order.
   * - `credit`: a credit applied against an order or invoice.
   * - `return`: a returned product (RMA).
   * - `tax`: a tax line.
   */
  type: 'sale' | 'service' | 'shipping' | 'credit' | 'return' | 'tax';

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Request to partially update a product.
 */
export interface UpdateProductRequest {
  /**
   * ID of the item category to move the product to.
   *
   * The move is the one Change Item Category makes: the category has to be a product
   * category and has to carry the properties of every attribute the product already
   * has, and the product's rate units switch to the category's base unit while their
   * numbers stay as they were. It is applied before the other fields in the request,
   * so a `unit_price` sent alongside is written after it.
   */
  category_id?: string;

  /**
   * Free-form description of the product.
   *
   * Send `null` to clear.
   */
  description?: string | null;

  /**
   * Free-form notes about the product.
   *
   * Send `null` to clear.
   */
  notes?: string | null;

  /**
   * Whether the product is shown to buyers in the customer portal.
   *
   * - `visible`: buyers can see and order the product in the portal.
   * - `hidden`: the product is concealed from the portal but remains usable
   *   internally.
   */
  portal_visibility?: 'visible' | 'hidden';

  /**
   * New stock keeping unit code for the product's item.
   *
   * Must be unique within the account; the update fails with a conflict error if
   * another item already uses it.
   */
  sku?: string;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

export interface ProductListParams {
  /**
   * Filter to products whose item carries at least one of these attributes.
   */
  attribute_ids?: Array<string>;

  /**
   * Filter by the item category the product's item belongs to.
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
   * Restrict results to products these customer accounts are entitled to buy.
   *
   * A product matches when its product line has been granted to the customer
   * directly, through the customer's account group, or through the account group
   * used for the customer's pricing. Combined with `product_line_ids` this widens
   * the results rather than narrowing them: products matching either filter are
   * returned.
   */
  customer_ids?: Array<string>;

  /**
   * End of creation date range.
   */
  ends_at?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'product_line'
    | 'product_line.unit_group'
    | 'product_line.unit_group.base_unit'
    | 'product_line.unit_group.associated_units'
    | 'product_line.unit_group.associated_units.unit'
    | 'item'
    | 'item.category'
    | 'item.category.properties'
    | 'item.category.unit_group'
    | 'item.category.unit_group.base_unit'
    | 'item.category.unit_group.associated_units'
    | 'item.category.unit_group.associated_units.unit'
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
   * Filter by customer portal visibility.
   */
  portal_visibility?: 'visible' | 'hidden';

  /**
   * Filter by product line IDs.
   *
   * Combined with `customer_ids`, products matching either filter are returned.
   */
  product_line_ids?: Array<string>;

  /**
   * Free-text search term used to filter results.
   *
   * Which fields are matched against the term varies by endpoint.
   */
  q?: string;

  /**
   * Start of creation date range.
   */
  starts_at?: string;
}

export interface ProductRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'product_line'
    | 'product_line.unit_group'
    | 'product_line.unit_group.base_unit'
    | 'product_line.unit_group.associated_units'
    | 'product_line.unit_group.associated_units.unit'
    | 'item'
    | 'item.category'
    | 'item.category.properties'
    | 'item.category.unit_group'
    | 'item.category.unit_group.base_unit'
    | 'item.category.unit_group.associated_units'
    | 'item.category.unit_group.associated_units.unit'
    | 'item.unit_value'
    | 'item.unit_cost'
    | 'item.burn_rate'
    | 'item.attributes'
  >;
}

export interface ProductCreateParams {
  /**
   * Body param: ID of the item category for the product's item.
   *
   * The category's unit group determines the default units used for the product's
   * pricing rates and inventory tracking.
   */
  category_id: string;

  /**
   * Body param: Stock keeping unit code for the product's item.
   *
   * Must be unique within the account; creation fails with a conflict error if
   * another item already uses it.
   */
  sku: string;

  /**
   * Body param: Product type code, which determines how the product behaves on
   * orders and invoices.
   *
   * - `sale`: a standard sellable product.
   * - `service`: a non-physical service line, such as labor or installation.
   * - `shipping`: a shipping charge applied to an order.
   * - `credit`: a credit applied against an order or invoice.
   * - `return`: a returned product (RMA).
   * - `tax`: a tax line.
   */
  type: 'sale' | 'service' | 'shipping' | 'credit' | 'return' | 'tax';

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'product_line'
    | 'product_line.unit_group'
    | 'product_line.unit_group.base_unit'
    | 'product_line.unit_group.associated_units'
    | 'product_line.unit_group.associated_units.unit'
    | 'item'
    | 'item.category'
    | 'item.category.properties'
    | 'item.category.unit_group'
    | 'item.category.unit_group.base_unit'
    | 'item.category.unit_group.associated_units'
    | 'item.category.unit_group.associated_units.unit'
    | 'item.unit_value'
    | 'item.unit_cost'
    | 'item.burn_rate'
    | 'item.attributes'
  >;

  /**
   * Body param: Attribute IDs to link to the product's item at creation time.
   *
   * Every ID must already exist in your account, and each attribute's property must
   * be one the item's category carries; an ID that fails either check fails the
   * whole request rather than being skipped.
   */
  attribute_ids?: Array<string>;

  /**
   * Body param: Free-form description of the product.
   */
  description?: string;

  /**
   * Body param: Free-form notes about the product.
   */
  notes?: string;

  /**
   * Body param: Whether the product is shown to buyers in the customer portal.
   *
   * - `visible`: buyers can see and order the product in the portal.
   * - `hidden`: the product is concealed from the portal but remains usable
   *   internally.
   *
   * When omitted, the product is created hidden, so it must be set to `visible`
   * before buyers can see it.
   */
  portal_visibility?: 'visible' | 'hidden';

  /**
   * Body param: ID of the product line to assign the product to.
   *
   * The product line must be one your account owns or a shared system line; anything
   * else fails as not found. Buyers are granted access to whole product lines, so a
   * product created without one never appears in the customer portal, whatever its
   * `portal_visibility`.
   */
  product_line_id?: string;

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

export interface ProductUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'product_line'
    | 'product_line.unit_group'
    | 'product_line.unit_group.base_unit'
    | 'product_line.unit_group.associated_units'
    | 'product_line.unit_group.associated_units.unit'
    | 'item'
    | 'item.category'
    | 'item.category.properties'
    | 'item.category.unit_group'
    | 'item.category.unit_group.base_unit'
    | 'item.category.unit_group.associated_units'
    | 'item.category.unit_group.associated_units.unit'
    | 'item.unit_value'
    | 'item.unit_cost'
    | 'item.burn_rate'
    | 'item.attributes'
  >;

  /**
   * Body param: ID of the item category to move the product to.
   *
   * The move is the one Change Item Category makes: the category has to be a product
   * category and has to carry the properties of every attribute the product already
   * has, and the product's rate units switch to the category's base unit while their
   * numbers stay as they were. It is applied before the other fields in the request,
   * so a `unit_price` sent alongside is written after it.
   */
  category_id?: string;

  /**
   * Body param: Free-form description of the product.
   *
   * Send `null` to clear.
   */
  description?: string | null;

  /**
   * Body param: Free-form notes about the product.
   *
   * Send `null` to clear.
   */
  notes?: string | null;

  /**
   * Body param: Whether the product is shown to buyers in the customer portal.
   *
   * - `visible`: buyers can see and order the product in the portal.
   * - `hidden`: the product is concealed from the portal but remains usable
   *   internally.
   */
  portal_visibility?: 'visible' | 'hidden';

  /**
   * Body param: New stock keeping unit code for the product's item.
   *
   * Must be unique within the account; the update fails with a conflict error if
   * another item already uses it.
   */
  sku?: string;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

export interface ProductDeleteParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'product_line'
    | 'product_line.unit_group'
    | 'product_line.unit_group.base_unit'
    | 'product_line.unit_group.associated_units'
    | 'product_line.unit_group.associated_units.unit'
    | 'item'
    | 'item.category'
    | 'item.category.properties'
    | 'item.category.unit_group'
    | 'item.category.unit_group.base_unit'
    | 'item.category.unit_group.associated_units'
    | 'item.category.unit_group.associated_units.unit'
    | 'item.unit_value'
    | 'item.unit_cost'
    | 'item.burn_rate'
    | 'item.attributes'
  >;
}

export interface ProductChangeProductLineParams {
  /**
   * Path param: Product ID.
   */
  id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'product_line'
    | 'product_line.unit_group'
    | 'product_line.unit_group.base_unit'
    | 'product_line.unit_group.associated_units'
    | 'product_line.unit_group.associated_units.unit'
    | 'item'
    | 'item.category'
    | 'item.category.properties'
    | 'item.category.unit_group'
    | 'item.category.unit_group.base_unit'
    | 'item.category.unit_group.associated_units'
    | 'item.category.unit_group.associated_units.unit'
    | 'item.unit_value'
    | 'item.unit_cost'
    | 'item.burn_rate'
    | 'item.attributes'
  >;
}

Products.Actions = Actions;

export declare namespace Products {
  export {
    type CreateProductRequest as CreateProductRequest,
    type ListProduct as ListProduct,
    type Product as Product,
    type UpdateProductRequest as UpdateProductRequest,
    type ProductListParams as ProductListParams,
    type ProductRetrieveParams as ProductRetrieveParams,
    type ProductCreateParams as ProductCreateParams,
    type ProductUpdateParams as ProductUpdateParams,
    type ProductDeleteParams as ProductDeleteParams,
    type ProductChangeProductLineParams as ProductChangeProductLineParams,
  };

  export {
    Actions as Actions,
    type BulkUpsertProductsRequest as BulkUpsertProductsRequest,
    type UpsertProductInput as UpsertProductInput,
    type UpsertProductProperty as UpsertProductProperty,
    type ActionBulkUpsertParams as ActionBulkUpsertParams,
  };
}
