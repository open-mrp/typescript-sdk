// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ActionsAPI from './actions';
import {
  ActionBulkReconcileParams,
  Actions,
  BulkReconcileItemInput,
  BulkReconcileItemsRequest,
  BulkReconcileItemsResponse,
  ListReconcileErrorResult,
  ListReconciledItemResult,
  ListSkippedItemResult,
  ReconcileErrorResult,
  ReconciledItemResult,
  SkippedItemResult,
} from './actions';
import * as AttributesAPI from './attributes';
import { AttributeDeleteParams, AttributeUpdateParams, Attributes } from './attributes';
import * as InventoryAPI from './inventory';
import {
  ComputedQuantity,
  Inventory,
  InventoryListParams,
  InventoryUpdateParams,
  InventoryUpdateResponse,
  ItemInventory,
  QuantityInput,
  UpdateItemInventoryRequest,
} from './inventory';
import * as PropertiesAPI from '../properties/properties';
import * as UnitGroupsAPI from '../unit-groups/unit-groups';
import * as UnitsAPI from '../units/units';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage inventory items.
 */
export class Items extends APIResource {
  inventory: InventoryAPI.Inventory = new InventoryAPI.Inventory(this._client);
  attributes: AttributesAPI.Attributes = new AttributesAPI.Attributes(this._client);
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of items, newest first.
   *
   * Items backed by a non-sale product — the service, shipping, tax, credit, and
   * return products that carry charges on orders — are left out, so this reflects
   * the catalog you sell and stock rather than every item row. `q` matches against
   * SKU and description, with closer SKU matches ranked first.
   *
   * This endpoint requires the permission: `items:read`.
   *
   * @example
   * ```ts
   * const listItem = await client.catalog.items.list();
   * ```
   */
  list(query: ItemListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ListItem> {
    return this._client.get('/v1/catalog/items', { query, ...options });
  }

  /**
   * Returns a single item by ID.
   *
   * This endpoint requires the permission: `items:read`.
   *
   * @example
   * ```ts
   * const item = await client.catalog.items.retrieve(
   *   'it_pej07ckhvu62',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: ItemRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Item> {
    return this._client.get(path`/v1/catalog/items/${id}`, { query, ...options });
  }

  /**
   * Returns the lot this item is made in — how many, counted in what.
   *
   * A lot is a doff, a pallet, a batch: the quantity production is issued in. The
   * unit is what makes it meaningful, since 60 pairs and 60 eaches are different
   * lots, so `quantity` should never be read without `unit`.
   *
   * Resolved through the same chain the production schedule uses, most specific
   * first: a per-item override, then the item's own product line, then the product
   * lines of the finished goods it becomes, then the account-wide default. `source`
   * names which rule applied. Intermediate items like greige are not sold and have
   * no product line of their own, which is why they inherit from what they become.
   *
   * `quantity` is `0` when nothing in the chain supplies a lot. That means the item
   * has no lot convention, not that its lot is zero.
   *
   * This endpoint requires the permission: `items:read`.
   *
   * @example
   * ```ts
   * const itemLotDefault =
   *   await client.catalog.items.retrieveLotDefault(
   *     'it_pej07ckhvu62',
   *   );
   * ```
   */
  retrieveLotDefault(
    id: string,
    query: ItemRetrieveLotDefaultParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ItemLotDefault> {
    return this._client.get(path`/v1/catalog/items/${id}/lot-default`, { query, ...options });
  }

  /**
   * Moves an item to a different category and returns the updated item.
   *
   * The item's rate units (unit value, unit cost, burn rate) and any related
   * order-point, consumption, and production quantity units are switched to the new
   * category's base unit. Only the units change — the numbers attached to them are
   * carried over as they were, so review any figure whose meaning depends on the
   * unit after moving between categories that count differently.
   *
   * Re-assigning the item's current category succeeds and changes nothing.
   *
   * This endpoint requires the permission: `items:update`.
   *
   * @example
   * ```ts
   * const item = await client.catalog.items.changeCategory(
   *   'ic_d06g9c6yc9ck',
   *   { id: 'it_pej07ckhvu62' },
   * );
   * ```
   */
  changeCategory(
    categoryID: string,
    params: ItemChangeCategoryParams,
    options?: RequestOptions,
  ): APIPromise<Item> {
    const { id, include } = params;
    return this._client.put(path`/v1/catalog/items/${id}/category/${categoryID}`, {
      query: { include },
      ...options,
    });
  }
}

/**
 * An entry in your catalog: something you sell, consume, or build with.
 */
export interface Item {
  /**
   * Item ID.
   */
  id: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  attributes: PropertiesAPI.ListAttribute | null;

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  burn_rate: Rate | null;

  /**
   * A grouping of related catalog items that defines the unit group and properties
   * available to the items within it.
   */
  category: ItemCategory | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Item description.
   */
  description: string | null;

  /**
   * Free-form notes about the item.
   *
   * Null to customer and supplier portal users: they are your own team's notes.
   */
  notes: string | null;

  /**
   * Resource type identifier.
   */
  object: 'item';

  /**
   * Stock keeping unit code, unique within the account.
   */
  sku: string;

  /**
   * What kind of item this is.
   *
   * - `product`: a finished product.
   * - `material`: a raw material or component consumed in production.
   * - `part`: a part used in production.
   */
  type: 'product' | 'material' | 'part';

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  unit_cost: Rate | null;

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  unit_value: Rate | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A grouping of related catalog items that defines the unit group and properties
 * available to the items within it.
 */
export interface ItemCategory {
  /**
   * Item category ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Display name of the item category.
   */
  name: string;

  /**
   * Free-form notes about the item category.
   *
   * Null to customer and supplier portal users: they are your own team's notes.
   */
  notes: string | null;

  /**
   * Resource type identifier.
   */
  object: 'item_category';

  /**
   * Owner describes the provenance of a resource.
   */
  owner: APIKeysAPI.Owner | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  properties: PropertiesAPI.ListProperty | null;

  /**
   * What kind of items this category groups.
   *
   * - `material_category`: groups raw materials and components (items of type
   *   `material`).
   * - `product_category`: groups finished products and parts (items of type
   *   `product` or `part`).
   *
   * An item can only be assigned to a category whose type matches the item's `type`,
   * and the category's type is fixed at creation.
   */
  type: 'material_category' | 'product_category';

  /**
   * A named collection of units that share one dimension, defining which units a
   * product can be ordered in.
   *
   * Each associated unit carries its own discount and customer portal visibility,
   * applied when an order line is priced in that unit. A product takes its unit
   * group from its product line, falling back to its item category.
   */
  unit_group: UnitGroupsAPI.UnitGroup | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * The lot an item is made in — how many, counted in what.
 *
 * A lot is the quantity production is issued in: a doff, a pallet, a batch. The
 * unit is what makes it meaningful, since 60 pairs and 60 eaches are different
 * lots.
 */
export interface ItemLotDefault {
  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * Resource type identifier.
   */
  object: 'item_lot_default';

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  product_line: CoreAPI.Entity | null;

  /**
   * Units in one lot.
   *
   * `0` means the item has no lot convention, not that its lot is zero.
   */
  quantity: number;

  /**
   * Which rule in the chain produced this lot.
   *
   * - `item_override`: a lot size set on the item itself.
   * - `product_line`: the convention of the line the item sells under.
   * - `downstream_product_line`: inherited from the finished goods this item
   *   becomes, for intermediates that are not themselves sold.
   * - `account_default`: the account-wide fallback.
   *
   * Empty when no rule in the chain supplies a lot, which is the same case
   * `quantity` reports as `0`.
   */
  source: 'item_override' | 'product_line' | 'downstream_product_line' | 'account_default' | '';

  /**
   * Unit of measurement used for conversions and product quantities.
   */
  unit: UnitsAPI.Unit | null;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListItem {
  /**
   * Resources in this page.
   */
  data: Array<Item>;

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
 * Value expressed as a ratio of two units, such as a price per kilogram or a
 * throughput per hour.
 */
export interface Rate {
  /**
   * Rate ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Unit of measurement used for conversions and product quantities.
   */
  denominator_unit: UnitsAPI.Unit | null;

  /**
   * Human-readable formatted value (e.g. "$25.50 / kg" or "100 kg / hr").
   */
  display_value: string;

  /**
   * Unit of measurement used for conversions and product quantities.
   */
  numerator_unit: UnitsAPI.Unit | null;

  /**
   * Resource type identifier.
   */
  object: 'rate';

  /**
   * Last updated timestamp.
   */
  updated_at: string;

  /**
   * Decimal value of the rate, as a string to preserve precision.
   *
   * Expressed as the amount of the numerator unit per one denominator unit.
   */
  value: string;
}

export interface ItemListParams {
  /**
   * Filter to items carrying any of these attributes.
   */
  attribute_ids?: Array<string>;

  /**
   * Filter to items in any of these categories.
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
   * Filter to items any of these customers are allowed to order.
   *
   * A customer qualifies when its relationship, its account group, or its price
   * group grants access to the product line the item's product sits in. Items with
   * no product line, including materials and parts, never match.
   */
  customer_ids?: Array<string>;

  /**
   * Filter to items created on or before this date.
   */
  ends_at?: string;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'category'
    | 'unit_value'
    | 'unit_cost'
    | 'burn_rate'
    | 'attributes'
    | 'category.unit_group'
    | 'category.properties'
    | 'category.unit_group.base_unit'
    | 'category.unit_group.associated_units'
    | 'category.unit_group.associated_units.unit'
  >;

  /**
   * Maximum number of results to return in a single page.
   */
  limit?: number;

  /**
   * Filter to items whose product belongs to any of these product lines.
   */
  product_line_ids?: Array<string>;

  /**
   * Free-text search term used to filter results.
   *
   * Which fields are matched against the term varies by endpoint.
   */
  q?: string;

  /**
   * Filter to items created on or after this date.
   */
  starts_at?: string;

  /**
   * Restricts results based on where the item is produced in its production flow.
   *
   * - `all`: no restriction.
   * - `initial_only`: only items produced by an initial production step, i.e. a step
   *   with no upstream steps feeding into it.
   */
  subassembly_filter?: 'all' | 'initial_only';

  /**
   * Filter to materials this supplier account supplies to you.
   *
   * Only materials can have suppliers, so combining this with a `types` filter that
   * excludes `material` returns nothing.
   */
  supplier_id?: string;

  /**
   * Filter to items of these types (`product`, `material`, `part`).
   */
  types?: Array<'product' | 'material' | 'part'>;
}

export interface ItemRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'category'
    | 'unit_value'
    | 'unit_cost'
    | 'burn_rate'
    | 'attributes'
    | 'category.unit_group'
    | 'category.properties'
    | 'category.unit_group.base_unit'
    | 'category.unit_group.associated_units'
    | 'category.unit_group.associated_units.unit'
  >;
}

export interface ItemRetrieveLotDefaultParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'unit'>;
}

export interface ItemChangeCategoryParams {
  /**
   * Path param: Item ID.
   */
  id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'category'
    | 'unit_value'
    | 'unit_cost'
    | 'burn_rate'
    | 'attributes'
    | 'category.unit_group'
    | 'category.properties'
    | 'category.unit_group.base_unit'
    | 'category.unit_group.associated_units'
    | 'category.unit_group.associated_units.unit'
  >;
}

Items.Inventory = Inventory;
Items.Attributes = Attributes;
Items.Actions = Actions;

export declare namespace Items {
  export {
    type Item as Item,
    type ItemCategory as ItemCategory,
    type ItemLotDefault as ItemLotDefault,
    type ListItem as ListItem,
    type Rate as Rate,
    type ItemListParams as ItemListParams,
    type ItemRetrieveParams as ItemRetrieveParams,
    type ItemRetrieveLotDefaultParams as ItemRetrieveLotDefaultParams,
    type ItemChangeCategoryParams as ItemChangeCategoryParams,
  };

  export {
    Inventory as Inventory,
    type ComputedQuantity as ComputedQuantity,
    type ItemInventory as ItemInventory,
    type QuantityInput as QuantityInput,
    type UpdateItemInventoryRequest as UpdateItemInventoryRequest,
    type InventoryUpdateResponse as InventoryUpdateResponse,
    type InventoryListParams as InventoryListParams,
    type InventoryUpdateParams as InventoryUpdateParams,
  };

  export {
    Attributes as Attributes,
    type AttributeUpdateParams as AttributeUpdateParams,
    type AttributeDeleteParams as AttributeDeleteParams,
  };

  export {
    Actions as Actions,
    type BulkReconcileItemInput as BulkReconcileItemInput,
    type BulkReconcileItemsRequest as BulkReconcileItemsRequest,
    type BulkReconcileItemsResponse as BulkReconcileItemsResponse,
    type ListReconcileErrorResult as ListReconcileErrorResult,
    type ListReconciledItemResult as ListReconciledItemResult,
    type ListSkippedItemResult as ListSkippedItemResult,
    type ReconcileErrorResult as ReconcileErrorResult,
    type ReconciledItemResult as ReconciledItemResult,
    type SkippedItemResult as SkippedItemResult,
    type ActionBulkReconcileParams as ActionBulkReconcileParams,
  };
}
