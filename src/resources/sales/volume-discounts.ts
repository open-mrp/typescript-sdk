// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountGroupsAPI from './account-groups';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import * as ItemCategoriesAPI from '../catalog/item-categories/item-categories';
import * as ProductLinesAPI from '../catalog/product-lines/product-lines';
import * as PropertiesAPI from '../catalog/properties/properties';
import * as UnitsAPI from '../catalog/units/units';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * List and manage volume discounts.
 */
export class VolumeDiscounts extends APIResource {
  /**
   * Returns a paginated list of volume discounts, newest first.
   *
   * The search term matches the discount name, the name of a customer group it is
   * scoped to, or the name of a product line it is scoped to. Customer and supplier
   * portal users see only discounts with no customer-group restriction plus those
   * scoped to a group their own account belongs to.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `discounts:read`.
   *
   * @example
   * ```ts
   * const listVolumeDiscount =
   *   await client.sales.volumeDiscounts.list();
   * ```
   */
  list(
    query: VolumeDiscountListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListVolumeDiscount> {
    return this._client.get('/v1/sales/volume-discounts', { query, ...options });
  }

  /**
   * Returns a volume discount by ID.
   *
   * A customer or supplier portal user retrieves only a discount its own listing
   * carries: one with no customer-group restriction, or one scoped to a group its
   * account belongs to. Any other discount is reported as not found.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `discounts:read`.
   *
   * @example
   * ```ts
   * const volumeDiscount =
   *   await client.sales.volumeDiscounts.retrieve(
   *     'quds_bn7hto9s10pp',
   *   );
   * ```
   */
  retrieve(
    id: string,
    query: VolumeDiscountRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VolumeDiscount> {
    return this._client.get(path`/v1/sales/volume-discounts/${id}`, { query, ...options });
  }

  /**
   * Creates a volume discount with its tiers and scoping associations.
   *
   * The discount name must be unique within the account; creating a discount with an
   * existing name returns a conflict error.
   *
   * Each scoping list narrows the order lines the discount applies to, and an empty
   * list places no restriction on that dimension. Because tier thresholds are
   * compared against quantities converted into `unit_ids`, a discount created
   * without any units never reaches a threshold above zero.
   *
   * This endpoint requires the permission: `discounts:create`.
   *
   * @example
   * ```ts
   * const volumeDiscount =
   *   await client.sales.volumeDiscounts.create({
   *     name: 'Bulk Order Discount',
   *     tiers: [
   *       {
   *         name: '100+ Units',
   *         discount_percentage:
   *           '5.000000000000000000000000000000',
   *         threshold: '100.000000000000000000000000000000',
   *       },
   *     ],
   *   });
   * ```
   */
  create(params: VolumeDiscountCreateParams, options?: RequestOptions): APIPromise<VolumeDiscount> {
    const { include, ...body } = params;
    return this._client.post('/v1/sales/volume-discounts', { query: { include }, body, ...options });
  }

  /**
   * Partially updates a volume discount.
   *
   * The tier and association lists are only applied when their corresponding `has_*`
   * flag is `true`, in which case they replace the existing set entirely. Tiers use
   * upsert semantics: tiers with an `id` are updated, tiers without one are created,
   * and existing tiers omitted from the list are deleted.
   *
   * The name must remain unique within the account; reusing another discount's name
   * returns a conflict error. Order lines that have already been priced keep the
   * unit price they were given; the revised discount applies to lines priced after
   * the change.
   *
   * This endpoint requires the permission: `discounts:update`.
   *
   * @example
   * ```ts
   * const volumeDiscount =
   *   await client.sales.volumeDiscounts.update(
   *     'quds_bn7hto9s10pp',
   *     {
   *       has_attributes: true,
   *       has_categories: true,
   *       has_customer_groups: true,
   *       has_product_lines: true,
   *       has_tiers: true,
   *       has_units: true,
   *       name: 'Updated Bulk Discount',
   *       tiers: [
   *         {
   *           name: '50+ Units',
   *           discount_percentage:
   *             '10.000000000000000000000000000000',
   *           threshold: '50.000000000000000000000000000000',
   *         },
   *       ],
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    params: VolumeDiscountUpdateParams,
    options?: RequestOptions,
  ): APIPromise<VolumeDiscount> {
    const { include, ...body } = params;
    return this._client.patch(path`/v1/sales/volume-discounts/${id}`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Deletes a volume discount along with its tiers and scoping associations.
   *
   * Deletion is permanent; further requests against the deleted ID return an error.
   *
   * Order lines that have already been priced keep the unit price they were given;
   * only lines priced after the deletion lose the discount.
   *
   * This endpoint requires the permission: `discounts:delete`.
   *
   * @example
   * ```ts
   * const volumeDiscount =
   *   await client.sales.volumeDiscounts.delete(
   *     'quds_bn7hto9s10pp',
   *   );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<VolumeDiscountDeleteResponse> {
    return this._client.delete(path`/v1/sales/volume-discounts/${id}`, options);
  }
}

/**
 * Request to create a volume discount.
 */
export interface CreateVolumeDiscountRequest {
  /**
   * Display name of the volume discount.
   *
   * Must be unique within the account.
   */
  name: string;

  /**
   * Tiers for this volume discount.
   */
  tiers: Array<CreateVolumeDiscountTierInput>;

  /**
   * Attribute IDs to scope the discount to.
   *
   * When set, an item qualifies only if it has every listed attribute.
   */
  attribute_ids?: Array<string>;

  /**
   * Item category IDs to scope the discount to.
   *
   * When empty, all categories qualify.
   */
  category_ids?: Array<string>;

  /**
   * Account group IDs to scope the discount to specific customer groups.
   *
   * When empty, all customers qualify. A discount scoped to a group the buyer
   * belongs to is preferred over an unscoped one when both could apply to the same
   * order line.
   */
  customer_group_ids?: Array<string>;

  /**
   * Product line IDs to scope the discount to.
   *
   * When empty, all product lines qualify.
   */
  product_line_ids?: Array<string>;

  /**
   * IDs of the units that ordered quantities are measured in when evaluating tier
   * thresholds.
   *
   * Quantities ordered in other units are converted into one of these before being
   * compared against a threshold. Leaving this empty makes the discount inert: the
   * quantity always evaluates to zero, so no threshold above zero is ever reached.
   */
  unit_ids?: Array<string>;
}

/**
 * Volume discount tier to create.
 */
export interface CreateVolumeDiscountTierInput {
  /**
   * Fraction of the price taken off once the threshold is met, as a decimal string.
   *
   * This is a multiplier, not a whole percent: `0.05` takes 5% off. When an order
   * meets several tiers of the same discount, their reductions compound.
   */
  discount_percentage: string;

  /**
   * Display name of the tier.
   */
  name: string;

  /**
   * Minimum ordered quantity at which this tier's discount begins to apply, as a
   * decimal string.
   *
   * The quantity compared against the threshold is the total across every line on
   * the order that falls within the discount's scope, converted into one of the
   * discount's units.
   */
  threshold: string;

  /**
   * ID of another tier that this tier follows.
   *
   * Tier IDs are assigned when the discount is created, so a tier created in this
   * same request cannot be referenced here. The link is stored with the tier but
   * does not affect pricing: every tier whose threshold is met applies, regardless
   * of any parent.
   */
  parent_tier_id?: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListVolumeDiscount {
  /**
   * Resources in this page.
   */
  data: Array<VolumeDiscount>;

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
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListVolumeDiscountTier {
  /**
   * Resources in this page.
   */
  data: Array<VolumeDiscountTier>;

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
 * Request to partially update a volume discount.
 */
export interface UpdateVolumeDiscountRequest {
  /**
   * Whether to apply the `attribute_ids` field; when `false`, it is ignored.
   */
  has_attributes: boolean;

  /**
   * Whether to apply the `category_ids` field; when `false`, it is ignored.
   */
  has_categories: boolean;

  /**
   * Whether to apply the `customer_group_ids` field; when `false`, it is ignored.
   */
  has_customer_groups: boolean;

  /**
   * Whether to apply the `product_line_ids` field; when `false`, it is ignored.
   */
  has_product_lines: boolean;

  /**
   * Whether to apply the `tiers` field.
   *
   * When `true`, the discount's tiers are replaced with the contents of `tiers` (an
   * empty list deletes all tiers). When `false`, `tiers` is ignored.
   */
  has_tiers: boolean;

  /**
   * Whether to apply the `unit_ids` field; when `false`, it is ignored.
   */
  has_units: boolean;

  /**
   * Attribute IDs to set.
   *
   * Only applied when `has_attributes` is `true`, in which case they replace the
   * existing set entirely.
   */
  attribute_ids?: Array<string>;

  /**
   * Item category IDs to set.
   *
   * Only applied when `has_categories` is `true`, in which case they replace the
   * existing set entirely.
   */
  category_ids?: Array<string>;

  /**
   * Account group IDs to set as customer groups.
   *
   * Only applied when `has_customer_groups` is `true`, in which case they replace
   * the existing set entirely.
   */
  customer_group_ids?: Array<string>;

  /**
   * Display name of the volume discount.
   *
   * Must be unique within the account.
   */
  name?: string;

  /**
   * Product line IDs to set.
   *
   * Only applied when `has_product_lines` is `true`, in which case they replace the
   * existing set entirely.
   */
  product_line_ids?: Array<string>;

  /**
   * The full set of tiers for this discount.
   *
   * Only applied when `has_tiers` is `true`. Tiers with an `id` are updated, tiers
   * without an `id` are created, and existing tiers not present in the list are
   * deleted.
   */
  tiers?: Array<UpdateVolumeDiscountTierInput>;

  /**
   * IDs of the units to set as acceptable units.
   *
   * Only applied when `has_units` is `true`, in which case they replace the existing
   * set entirely. Clearing every unit makes the discount inert, since ordered
   * quantity then always evaluates to zero.
   */
  unit_ids?: Array<string>;
}

/**
 * Volume discount tier to upsert.
 *
 * Each entry is written as a whole: send every value you want the tier to keep,
 * since values left out are not carried over from the existing tier.
 */
export interface UpdateVolumeDiscountTierInput {
  /**
   * ID of an existing tier to update.
   *
   * Omit to create a new tier.
   */
  id?: string;

  /**
   * Fraction of the price taken off once the threshold is met, as a decimal string.
   *
   * This is a multiplier, not a whole percent: `0.05` takes 5% off. When an order
   * meets several tiers of the same discount, their reductions compound.
   */
  discount_percentage?: string;

  /**
   * Display name of the tier.
   */
  name?: string;

  /**
   * ID of another tier in this discount that this tier follows.
   *
   * The link is stored with the tier but does not affect pricing. Omitting it when
   * updating an existing tier clears the link.
   */
  parent_tier_id?: string;

  /**
   * Minimum ordered quantity at which this tier's discount begins to apply, as a
   * decimal string.
   *
   * The quantity compared against the threshold is the total across every line on
   * the order that falls within the discount's scope, converted into one of the
   * discount's units.
   */
  threshold?: string;
}

/**
 * A quantity-based discount with tiered percentage rates.
 *
 * A volume discount reduces the price once the ordered quantity reaches a tier's
 * threshold. The customer group associations scope which customers qualify, and
 * the product line, category, and attribute associations scope which order lines
 * qualify; an empty list on any of them means no restriction on that dimension.
 * Acceptable units are not a scope: they are the units the ordered quantity is
 * measured in, and a discount with none of them never reaches a threshold above
 * zero.
 *
 * At most one volume discount is applied to a given order line: among the
 * discounts whose scope the line matches and whose thresholds are met, those
 * scoped to a customer group the buyer belongs to take precedence. An account
 * price for the same line overrides the discounted price entirely.
 */
export interface VolumeDiscount {
  /**
   * Volume discount ID.
   */
  id: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  acceptable_units: UnitsAPI.ListUnit | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  attributes: PropertiesAPI.ListAttribute | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  categories: ItemCategoriesAPI.ListItemCategory | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  customer_groups: AccountGroupsAPI.ListAccountGroup | null;

  /**
   * Display name of the volume discount.
   *
   * Must be unique within the account.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'volume_discount';

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  product_lines: ProductLinesAPI.ListProductLine | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  tiers: ListVolumeDiscountTier | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A quantity threshold within a volume discount, and the reduction that applies at
 * or above it.
 */
export interface VolumeDiscountTier {
  /**
   * Volume discount tier ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Fraction of the price taken off once the threshold is met, as a decimal string.
   *
   * This is a multiplier, not a whole percent: `0.05` takes 5% off. When an order
   * meets several tiers of the same discount, their reductions compound: meeting a
   * `0.1` tier and a `0.2` tier multiplies the price by `0.9 × 0.8`, a 28% reduction
   * overall.
   */
  discount_percentage: string;

  /**
   * Display name of the tier.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'volume_discount_tier';

  /**
   * Minimum ordered quantity at which this tier's discount begins to apply, as a
   * decimal string.
   *
   * The quantity compared against the threshold is the total across every line on
   * the order that falls within the discount's scope, converted into one of the
   * discount's acceptable units — not the quantity of a single line.
   */
  threshold: string;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

export interface VolumeDiscountDeleteResponse {}

export interface VolumeDiscountListParams {
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
    | 'customer_groups'
    | 'product_lines'
    | 'categories'
    | 'categories.properties'
    | 'attributes'
    | 'acceptable_units'
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
}

export interface VolumeDiscountRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'customer_groups'
    | 'product_lines'
    | 'categories'
    | 'categories.properties'
    | 'attributes'
    | 'acceptable_units'
  >;
}

export interface VolumeDiscountCreateParams {
  /**
   * Body param: Display name of the volume discount.
   *
   * Must be unique within the account.
   */
  name: string;

  /**
   * Body param: Tiers for this volume discount.
   */
  tiers: Array<CreateVolumeDiscountTierInput>;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'customer_groups'
    | 'product_lines'
    | 'categories'
    | 'categories.properties'
    | 'attributes'
    | 'acceptable_units'
  >;

  /**
   * Body param: Attribute IDs to scope the discount to.
   *
   * When set, an item qualifies only if it has every listed attribute.
   */
  attribute_ids?: Array<string>;

  /**
   * Body param: Item category IDs to scope the discount to.
   *
   * When empty, all categories qualify.
   */
  category_ids?: Array<string>;

  /**
   * Body param: Account group IDs to scope the discount to specific customer groups.
   *
   * When empty, all customers qualify. A discount scoped to a group the buyer
   * belongs to is preferred over an unscoped one when both could apply to the same
   * order line.
   */
  customer_group_ids?: Array<string>;

  /**
   * Body param: Product line IDs to scope the discount to.
   *
   * When empty, all product lines qualify.
   */
  product_line_ids?: Array<string>;

  /**
   * Body param: IDs of the units that ordered quantities are measured in when
   * evaluating tier thresholds.
   *
   * Quantities ordered in other units are converted into one of these before being
   * compared against a threshold. Leaving this empty makes the discount inert: the
   * quantity always evaluates to zero, so no threshold above zero is ever reached.
   */
  unit_ids?: Array<string>;
}

export interface VolumeDiscountUpdateParams {
  /**
   * Body param: Whether to apply the `attribute_ids` field; when `false`, it is
   * ignored.
   */
  has_attributes: boolean;

  /**
   * Body param: Whether to apply the `category_ids` field; when `false`, it is
   * ignored.
   */
  has_categories: boolean;

  /**
   * Body param: Whether to apply the `customer_group_ids` field; when `false`, it is
   * ignored.
   */
  has_customer_groups: boolean;

  /**
   * Body param: Whether to apply the `product_line_ids` field; when `false`, it is
   * ignored.
   */
  has_product_lines: boolean;

  /**
   * Body param: Whether to apply the `tiers` field.
   *
   * When `true`, the discount's tiers are replaced with the contents of `tiers` (an
   * empty list deletes all tiers). When `false`, `tiers` is ignored.
   */
  has_tiers: boolean;

  /**
   * Body param: Whether to apply the `unit_ids` field; when `false`, it is ignored.
   */
  has_units: boolean;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'customer_groups'
    | 'product_lines'
    | 'categories'
    | 'categories.properties'
    | 'attributes'
    | 'acceptable_units'
  >;

  /**
   * Body param: Attribute IDs to set.
   *
   * Only applied when `has_attributes` is `true`, in which case they replace the
   * existing set entirely.
   */
  attribute_ids?: Array<string>;

  /**
   * Body param: Item category IDs to set.
   *
   * Only applied when `has_categories` is `true`, in which case they replace the
   * existing set entirely.
   */
  category_ids?: Array<string>;

  /**
   * Body param: Account group IDs to set as customer groups.
   *
   * Only applied when `has_customer_groups` is `true`, in which case they replace
   * the existing set entirely.
   */
  customer_group_ids?: Array<string>;

  /**
   * Body param: Display name of the volume discount.
   *
   * Must be unique within the account.
   */
  name?: string;

  /**
   * Body param: Product line IDs to set.
   *
   * Only applied when `has_product_lines` is `true`, in which case they replace the
   * existing set entirely.
   */
  product_line_ids?: Array<string>;

  /**
   * Body param: The full set of tiers for this discount.
   *
   * Only applied when `has_tiers` is `true`. Tiers with an `id` are updated, tiers
   * without an `id` are created, and existing tiers not present in the list are
   * deleted.
   */
  tiers?: Array<UpdateVolumeDiscountTierInput>;

  /**
   * Body param: IDs of the units to set as acceptable units.
   *
   * Only applied when `has_units` is `true`, in which case they replace the existing
   * set entirely. Clearing every unit makes the discount inert, since ordered
   * quantity then always evaluates to zero.
   */
  unit_ids?: Array<string>;
}

export declare namespace VolumeDiscounts {
  export {
    type CreateVolumeDiscountRequest as CreateVolumeDiscountRequest,
    type CreateVolumeDiscountTierInput as CreateVolumeDiscountTierInput,
    type ListVolumeDiscount as ListVolumeDiscount,
    type ListVolumeDiscountTier as ListVolumeDiscountTier,
    type UpdateVolumeDiscountRequest as UpdateVolumeDiscountRequest,
    type UpdateVolumeDiscountTierInput as UpdateVolumeDiscountTierInput,
    type VolumeDiscount as VolumeDiscount,
    type VolumeDiscountTier as VolumeDiscountTier,
    type VolumeDiscountDeleteResponse as VolumeDiscountDeleteResponse,
    type VolumeDiscountListParams as VolumeDiscountListParams,
    type VolumeDiscountRetrieveParams as VolumeDiscountRetrieveParams,
    type VolumeDiscountCreateParams as VolumeDiscountCreateParams,
    type VolumeDiscountUpdateParams as VolumeDiscountUpdateParams,
  };
}
