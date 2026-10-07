// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import * as ItemsAPI from '../catalog/items/items';
import * as MaterialsAPI from '../catalog/materials/materials';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Block and unblock users from direct messaging.
 */
export class Blocks extends APIResource {
  /**
   * Blocks another user in your account from exchanging direct messages with you.
   *
   * While the block stands neither of you can start a direct message with the other
   * or post in one you already share; group conversations and customer cases are
   * unaffected. Blocking someone you have already blocked returns the original block
   * instead of creating a second one.
   *
   * This endpoint requires the permission: `messaging:create`.
   *
   * @example
   * ```ts
   * const messagingBlock = await client.messaging.blocks.create(
   *   { blocked_account_user_id: 'acus_e5zu8bde0z3h' },
   * );
   * ```
   */
  create(params: BlockCreateParams, options?: RequestOptions): APIPromise<MessagingBlock> {
    const { include, ...body } = params;
    return this._client.post('/v1/messaging/blocks', { query: { include }, body, ...options });
  }

  /**
   * Lifts a block you placed on another user, letting the two of you message each
   * other again.
   *
   * Only your own block is removed: if the other person has also blocked you, direct
   * messages between you stay blocked. Unblocking someone you have not blocked
   * succeeds and changes nothing.
   *
   * This endpoint requires the permission: `messaging:delete`.
   *
   * @example
   * ```ts
   * const block = await client.messaging.blocks.delete(
   *   'example',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<BlockDeleteResponse> {
    return this._client.delete(path`/v1/messaging/blocks/${id}`, options);
  }

  /**
   * Lists the users you have blocked, most recently blocked first.
   *
   * Only blocks you created are returned — you are never told who has blocked you.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const listMessagingBlock =
   *   await client.messaging.blocks.list();
   * ```
   */
  list(
    query: BlockListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListMessagingBlock> {
    return this._client.get('/v1/messaging/blocks', { query, ...options });
  }
}

/**
 * A user's membership in an account, carrying the account-specific status, role,
 * and department.
 *
 * Profile fields (name, email, username, image URL) live on the `user`
 * sub-resource, which is shared across every account the user belongs to.
 */
export interface AccountUser {
  /**
   * Account user ID.
   */
  id: string;

  /**
   * When the account user was created.
   */
  created_at: string;

  /**
   * A functional area of a production operation, such as fabrication or packaging,
   * that groups scanning stations and machines.
   */
  department: Department | null;

  /**
   * Whether this user can be assigned as a sales representative on orders,
   * territories, and targets.
   *
   * Independent of the `sales_rep` role type, which still scopes analytics and hides
   * cost. Users with the `sales_rep` role are always eligible.
   *
   * Null to customer and supplier portal users, like the rest of your commission
   * settings.
   */
  is_commission_eligible: boolean | null;

  /**
   * When the user last accessed this account.
   *
   * Null to customer and supplier portal users: it is your own team's activity.
   */
  last_used_at: string | null;

  /**
   * The notifications you send this user about the customer or supplier account they
   * belong to.
   *
   * Set when the account you are acting in is a customer or supplier account you
   * manage, and an empty list when none are enabled; turn them on and off with
   * `preferences` on create and update. `null` for your own account's users, and
   * where an account user is embedded in another resource.
   *
   * - `order_acknowledgement`: the confirmation email sent when an order is placed
   *   for the customer.
   * - `invoice`: invoice emails for the customer's orders.
   * - `purchase_order_submission`: a copy of each purchase order you submit to the
   *   supplier.
   */
  notification_types: Array<'invoice' | 'order_acknowledgement' | 'purchase_order_submission'> | null;

  /**
   * Resource type identifier.
   */
  object: 'account_user';

  /**
   * A named set of permissions that can be assigned to users to control what they
   * can access.
   */
  role: APIKeysAPI.Role | null;

  /**
   * The current state of this user's membership in the account.
   *
   * - `active`: the user can sign in to the account and occupies one of the plan's
   *   seats.
   * - `disabled`: the user is locked out of the account and their sessions have been
   *   revoked, but the membership is retained.
   * - `removed`: the membership has been soft-deleted; it is hidden from listings by
   *   default and can be restored with the activate action.
   */
  status: 'active' | 'disabled' | 'removed';

  /**
   * When the account user was last updated.
   */
  updated_at: string;

  /**
   * A user's global profile, shared across every account they belong to.
   *
   * Account-specific settings (status, role, department) live on the account user
   * resource that links the user to each account.
   */
  user: User | null;
}

/**
 * Request to block another account user from messaging the caller.
 */
export interface BlockRequest {
  /**
   * The account user to block.
   *
   * It must be someone else in your account; you cannot block yourself.
   */
  blocked_account_user_id: string;
}

/**
 * Material consumed by a production step.
 *
 * Each consumption records one input item and how much of it the step uses.
 * Consumptions also determine the production flow: when another step produces the
 * consumed item, the two steps are linked upstream/downstream automatically.
 *
 * The quantities are stated against the step's own output, so a step producing 100
 * pairs and consuming 5 kg of yarn needs 5 kg per 100 pairs. Material requirements
 * for an order scale every consumption in the flow by how much of the finished
 * item is wanted.
 */
export interface Consumption {
  /**
   * Consumption ID.
   */
  id: string;

  /**
   * An entry in your catalog: something you sell, consume, or build with.
   */
  consumed_item: ItemsAPI.Item | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Instructions for how this material is consumed.
   */
  instructions: string | null;

  /**
   * Resource type identifier.
   */
  object: 'consumption';

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  quantity: MaterialsAPI.Quantity | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  waste_quantity: MaterialsAPI.Quantity | null;
}

/**
 * A functional area of a production operation, such as fabrication or packaging,
 * that groups scanning stations and machines.
 */
export interface Department {
  /**
   * Department ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  labor_rate: ItemsAPI.Rate | null;

  /**
   * A physical storage location, such as a warehouse, aisle, or bin, arranged in a
   * parent-child hierarchy.
   */
  location: Location | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  machines: ListMachine | null;

  /**
   * Display name of the department.
   *
   * Unique within the account.
   */
  name: string;

  /**
   * Free-form notes about the department.
   */
  notes: string | null;

  /**
   * Resource type identifier.
   */
  object: 'department';

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  scanning_stations: ListScanningStation | null;

  /**
   * Last update timestamp.
   */
  updated_at: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListConsumption {
  /**
   * Resources in this page.
   */
  data: Array<Consumption>;

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
export interface ListLocation {
  /**
   * Resources in this page.
   */
  data: Array<Location>;

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
export interface ListMachine {
  /**
   * Resources in this page.
   */
  data: Array<Machine>;

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
export interface ListMessagingBlock {
  /**
   * Resources in this page.
   */
  data: Array<MessagingBlock>;

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
export interface ListProductionStep {
  /**
   * Resources in this page.
   */
  data: Array<ProductionStep>;

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
export interface ListScanningStation {
  /**
   * Resources in this page.
   */
  data: Array<ScanningStation>;

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
 * A physical storage location, such as a warehouse, aisle, or bin, arranged in a
 * parent-child hierarchy.
 */
export interface Location {
  /**
   * Location ID.
   */
  id: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  children: ListLocation | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Display name of the location.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'location';

  /**
   * A physical storage location, such as a warehouse, aisle, or bin, arranged in a
   * parent-child hierarchy.
   */
  parent: Location | null;

  /**
   * This location's level in the storage hierarchy.
   *
   * The levels run from largest to smallest: `building`, `section`, `aisle`, `rack`,
   * `shelf`, `bin`. They are descriptive labels rather than a rule — a location's
   * parent is not required to be the next level up.
   */
  type: LocationTypeCode;

  /**
   * Last-updated timestamp.
   */
  updated_at: string;
}

export type LocationTypeCode = 'building' | 'section' | 'aisle' | 'rack' | 'shelf' | 'bin';

/**
 * A piece of production equipment, such as a CNC router or press, assigned to a
 * department.
 */
export interface Machine {
  /**
   * Machine ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * A functional area of a production operation, such as fabrication or packaging,
   * that groups scanning stations and machines.
   */
  department: Department | null;

  /**
   * Display name of the machine.
   *
   * Unique within the account.
   */
  name: string;

  /**
   * Free-form notes about the machine.
   */
  notes: string | null;

  /**
   * Resource type identifier.
   */
  object: 'machine';

  /**
   * Serial number of the machine.
   */
  serial_number: string;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A block one account user has placed on another.
 *
 * While the block stands, neither of the two can start a direct message with the
 * other or post in an existing one, whichever of them created it. Group
 * conversations and customer cases are unaffected.
 */
export interface MessagingBlock {
  /**
   * Block ID.
   */
  id: string;

  /**
   * A user's membership in an account, carrying the account-specific status, role,
   * and department.
   *
   * Profile fields (name, email, username, image URL) live on the `user`
   * sub-resource, which is shared across every account the user belongs to.
   */
  blocked_user: AccountUser | null;

  /**
   * When the block was created.
   */
  created_at: string;

  /**
   * Resource type identifier.
   */
  object: 'messaging_block';
}

/**
 * The output of a production step: the item it produces and the quantity produced.
 */
export interface ProductionOutput {
  /**
   * Production ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Resource type identifier.
   */
  object: 'production';

  /**
   * An entry in your catalog: something you sell, consume, or build with.
   */
  produced_item: ItemsAPI.Item | null;

  /**
   * A measured amount: a numeric value together with the unit it is expressed in.
   *
   * Quantities are shared building blocks rather than standalone records — other
   * resources point at them to report stock levels, ordered and packed amounts,
   * money, weights, and durations.
   */
  quantity: MaterialsAPI.Quantity | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A single stage of work in an item's production flow, with its output, material
 * inputs, cost rates, and graph connections.
 */
export interface ProductionStep {
  /**
   * Production step ID.
   */
  id: string;

  /**
   * Allowance correction factor applied to labor time in cost calculations, as a
   * decimal string.
   *
   * Effective labor time per unit is
   * `labor_time × (1 + leveling_factor) × (1 + allowances)`.
   */
  allowances: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  consumptions: ListConsumption | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * A functional area of a production operation, such as fabrication or packaging,
   * that groups scanning stations and machines.
   */
  department: Department | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  in_steps: ListProductionStep | null;

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  labor_rate: ItemsAPI.Rate | null;

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  labor_time: ItemsAPI.Rate | null;

  /**
   * Leveling correction factor applied to labor time in cost calculations, as a
   * decimal string.
   *
   * Effective labor time per unit is
   * `labor_time × (1 + leveling_factor) × (1 + allowances)`.
   */
  leveling_factor: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  machines: ListMachine | null;

  /**
   * Display name of the step.
   */
  name: string;

  /**
   * Free-form notes about the step.
   */
  notes: string | null;

  /**
   * Resource type identifier.
   */
  object: 'production_step';

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  out_steps: ListProductionStep | null;

  /**
   * Value expressed as a ratio of two units, such as a price per kilogram or a
   * throughput per hour.
   */
  overhead_rate: ItemsAPI.Rate | null;

  /**
   * The output of a production step: the item it produces and the quantity produced.
   */
  production: ProductionOutput | null;

  /**
   * A station on the production floor where operators scan batches to perform a
   * batch operation, such as initializing or moving a batch.
   */
  scanning_station: ScanningStation | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A station on the production floor where operators scan batches to perform a
 * batch operation, such as initializing or moving a batch.
 */
export interface ScanningStation {
  /**
   * Scanning station ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * A functional area of a production operation, such as fabrication or packaging,
   * that groups scanning stations and machines.
   */
  department: Department | null;

  /**
   * Size of the labels printed at this station, given as width-by-height (for
   * example, `1x1`).
   */
  label_size: '1x1' | '1x3' | '1x4' | '2x4' | null;

  /**
   * Type of label printed at this station.
   *
   * - `tag`: a label attached to the physical product.
   * - `traveler`: a routing sheet that accompanies the batch through every
   *   production step.
   */
  label_type: 'tag' | 'traveler' | null;

  /**
   * Display name of the scanning station.
   *
   * Unique within the account.
   */
  name: string;

  /**
   * Free-form notes about the scanning station.
   */
  notes: string | null;

  /**
   * Resource type identifier.
   */
  object: 'scanning_station';

  /**
   * Whether operators must perform a material check at this station.
   *
   * - `none`: no additional operator check is required.
   * - `material_check`: a material check is expected before the operation.
   */
  operator_requirement: 'none' | 'material_check';

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  production_steps: ListProductionStep | null;

  /**
   * Scanning station type, determining which batch operation an operator performs
   * when they scan here.
   *
   * - `init_batch`: starts a new batch at the beginning of a production flow.
   * - `merge_batch`: combines several scanned batches into one.
   * - `move_batch`: advances a batch through a production step connected to this
   *   station.
   * - `split_batch`: divides a batch into several batches.
   *
   * Fixed when the station is created.
   */
  type: 'init_batch' | 'merge_batch' | 'move_batch' | 'split_batch';

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * A user's global profile, shared across every account they belong to.
 *
 * Account-specific settings (status, role, department) live on the account user
 * resource that links the user to each account.
 */
export interface User {
  /**
   * User ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Email address the user signs in with and receives platform email at.
   */
  email: string | null;

  /**
   * When the user verified their email address.
   */
  email_verified_at: string | null;

  /**
   * Location of the user's profile image.
   *
   * For photos uploaded through the API this holds an internal path rather than a
   * fetchable image URL; call Get User Photo URL to obtain a temporary link to the
   * image itself.
   */
  image_url: string | null;

  /**
   * User's full display name.
   */
  name: string | null;

  /**
   * Resource type identifier.
   */
  object: 'user';

  /**
   * Last updated timestamp.
   */
  updated_at: string;

  /**
   * Username the user can sign in with instead of their email address.
   *
   * Usernames are unique across the whole platform, not just within your account.
   */
  username: string | null;
}

export interface BlockDeleteResponse {}

export interface BlockCreateParams {
  /**
   * Body param: The account user to block.
   *
   * It must be someone else in your account; you cannot block yourself.
   */
  blocked_account_user_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'blocked_user' | 'blocked_user.user' | 'blocked_user.role' | 'blocked_user.department'>;
}

export interface BlockListParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'blocked_user' | 'blocked_user.user' | 'blocked_user.role' | 'blocked_user.department'>;
}

export declare namespace Blocks {
  export {
    type AccountUser as AccountUser,
    type BlockRequest as BlockRequest,
    type Consumption as Consumption,
    type Department as Department,
    type ListConsumption as ListConsumption,
    type ListLocation as ListLocation,
    type ListMachine as ListMachine,
    type ListMessagingBlock as ListMessagingBlock,
    type ListProductionStep as ListProductionStep,
    type ListScanningStation as ListScanningStation,
    type Location as Location,
    type LocationTypeCode as LocationTypeCode,
    type Machine as Machine,
    type MessagingBlock as MessagingBlock,
    type ProductionOutput as ProductionOutput,
    type ProductionStep as ProductionStep,
    type ScanningStation as ScanningStation,
    type User as User,
    type BlockDeleteResponse as BlockDeleteResponse,
    type BlockCreateParams as BlockCreateParams,
    type BlockListParams as BlockListParams,
  };
}
