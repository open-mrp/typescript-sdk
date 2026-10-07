// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as BlocksAPI from '../../messaging/blocks';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ActionsAPI from './actions';
import { ActionActivateResponse, ActionDisableResponse, ActionRemoveResponse, Actions } from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage account users.
 */
export class AccountUsers extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Returns a paginated list of the users who belong to the account you are acting
   * in.
   *
   * When the account you are acting in is a customer or supplier account you manage,
   * this lists that account's users rather than your own team, each with the
   * `notification_types` you send them.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `team:read`.
   *
   * @example
   * ```ts
   * const listAccountUser =
   *   await client.identity.accountUsers.list();
   * ```
   */
  list(
    query: AccountUserListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListAccountUser> {
    return this._client.get('/v1/identity/account-users', { query, ...options });
  }

  /**
   * Returns an account user by ID.
   *
   * The lookup is scoped to the account you are acting in, so an ID belonging to
   * another account is reported as not found.
   *
   * Acting in a customer's account requires `customers:read`, and acting in a
   * supplier's account requires `suppliers:read`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `team:read`.
   *
   * @example
   * ```ts
   * const accountUser =
   *   await client.identity.accountUsers.retrieve(
   *     'acus_e5zu8bde0z3h',
   *   );
   * ```
   */
  retrieve(
    id: string,
    query: AccountUserRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BlocksAPI.AccountUser> {
    return this._client.get(path`/v1/identity/account-users/${id}`, { query, ...options });
  }

  /**
   * Adds a user to the account you are acting in.
   *
   * If no user with the given email or username exists, a new user is created; a
   * user created with an email address is sent a welcome email containing a
   * generated password and a link to sign in, unless they are being added to a
   * supplier account, since suppliers have no portal to sign in to. A user added to
   * a customer account signs in through your customer portal, on its verified custom
   * domain when you have one. If a matching user already exists, that user is added
   * to the account instead, and a user you previously removed is restored rather
   * than duplicated. Adding a user to your own account consumes a seat and is
   * rejected once your plan's seat limit is reached.
   *
   * You can add users to a customer or supplier account only while you manage it
   * alone: an account that runs its own OpenMRP subscription, or that another
   * account also has as a customer or supplier, manages its own users, and the
   * request is refused.
   *
   * Acting in a customer's account requires `customers:create`, and acting in a
   * supplier's account requires `suppliers:create`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `team:create`.
   *
   * @example
   * ```ts
   * const accountUser =
   *   await client.identity.accountUsers.create({
   *     department_id: 'dp_m0jayebxnkos',
   *     email: 'jdoe@openmrp.ai',
   *     name: 'John Doe',
   *     password: 'QgS7Z8Hhj3&1',
   *     preferences: [
   *       {
   *         notification_type: 'order_acknowledgement',
   *         enabled: true,
   *       },
   *     ],
   *     role_id: 'rl_3xknmfqflhvb',
   *     username: 'jdoe',
   *   });
   * ```
   */
  create(
    params: AccountUserCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BlocksAPI.AccountUser> {
    const { include, ...body } = params ?? {};
    return this._client.post('/v1/identity/account-users', { query: { include }, body, ...options });
  }

  /**
   * Partially updates an account user.
   *
   * Omitted fields are left unchanged. Profile fields (`name`, `email`, `username`)
   * update the underlying user, which is shared across every account the user
   * belongs to, so the change is visible everywhere that person works.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `team:update`.
   *
   * @example
   * ```ts
   * const accountUser =
   *   await client.identity.accountUsers.update(
   *     'acus_e5zu8bde0z3h',
   *     {
   *       department_id: 'dp_m0jayebxnkos',
   *       email: 'jdoe@openmrp.ai',
   *       name: 'John Doe',
   *       preferences: [
   *         {
   *           notification_type: 'order_acknowledgement',
   *           enabled: true,
   *         },
   *       ],
   *       role_id: 'rl_3xknmfqflhvb',
   *       username: 'jdoe',
   *     },
   *   );
   * ```
   */
  update(
    id: string,
    params: AccountUserUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BlocksAPI.AccountUser> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/identity/account-users/${id}`, {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * Request to create an account user.
 */
export interface CreateAccountUserRequest {
  /**
   * ID of the department to assign to the user.
   *
   * The department must already exist in the account you are acting in.
   */
  department_id?: string;

  /**
   * User email address.
   *
   * Either `email` or `username` must be provided. If a user with this email already
   * exists, that user is added to the account instead of a new user being created,
   * and the request fails with a conflict if they are already an active member of
   * it.
   */
  email?: string;

  /**
   * Whether the user can be assigned as a sales representative on orders,
   * territories, and targets.
   *
   * Defaults to false. Forced true for the `sales_rep` role type and rejected for
   * scanner and agent roles.
   */
  is_commission_eligible?: boolean;

  /**
   * User display name.
   */
  name?: string;

  /**
   * Password for scanning station users.
   *
   * Required when creating a scanning station user (username without email) and
   * rejected for all other users, who instead receive a generated password in their
   * welcome email. Must be 8–72 characters and include an uppercase letter, a
   * lowercase letter, a number, and a special character.
   */
  password?: string;

  /**
   * Notification preference toggles for the new user.
   *
   * Only applies when adding a user to a customer or supplier account you manage;
   * ignored when adding a user to your own account. The enabled types are returned
   * in the user's `notification_types`. When the user is one you previously removed,
   * the toggles apply over the preferences they had before removal, and types you
   * leave out keep their previous state.
   */
  preferences?: Array<NotificationPreferenceItem>;

  /**
   * ID of the role to assign to the user.
   *
   * The role you supply can be overridden: users added to a customer account always
   * receive the shared customer role so their portal capabilities stay
   * permission-driven, and scanning station users in any other account receive the
   * scanner role. Supplying a role whose type is `sales_rep` normalizes to the
   * account's canonical sales-rep role.
   */
  role_id?: string;

  /**
   * Unique username.
   *
   * 3–255 characters; letters, numbers, underscores, and hyphens. Either `email` or
   * `username` must be provided. Providing a username without an email creates a
   * scanning station user.
   */
  username?: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListAccountUser {
  /**
   * Resources in this page.
   */
  data: Array<BlocksAPI.AccountUser>;

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
 * NotificationPreferenceItem toggles a single account-relation notification type.
 */
export interface NotificationPreferenceItem {
  /**
   * Whether this notification type is enabled for the account user.
   */
  enabled: boolean;

  /**
   * Notification type.
   */
  notification_type: 'invoice' | 'order_acknowledgement' | 'purchase_order_submission';
}

/**
 * Request to partially update an account user.
 */
export interface UpdateAccountUserRequest {
  /**
   * ID of the department to assign to the user.
   *
   * Set to `null` to clear the department. The department must already exist in the
   * account.
   */
  department_id?: string | null;

  /**
   * User email address.
   *
   * Must not already be in use by another user.
   */
  email?: string;

  /**
   * Whether the user can be assigned as a sales representative on orders,
   * territories, and targets.
   *
   * Forced true for the `sales_rep` role type and rejected for scanner and agent
   * roles. Cannot be turned off while the user stays on a `sales_rep` role.
   */
  is_commission_eligible?: boolean;

  /**
   * User display name.
   */
  name?: string;

  /**
   * Notification preference toggles to apply.
   *
   * Only allowed when updating a user in a customer or supplier account you manage;
   * rejected otherwise. Notification types omitted from the list are left unchanged,
   * and the result is returned in `notification_types`.
   */
  preferences?: Array<NotificationPreferenceItem>;

  /**
   * ID of the role to assign to the user.
   *
   * Set to `null` to clear the role.
   */
  role_id?: string | null;

  /**
   * Unique username.
   *
   * 3–255 characters; letters, numbers, underscores, and hyphens. Must not already
   * be in use by another user.
   */
  username?: string;
}

export interface AccountUserListParams {
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
  include?: Array<'user' | 'role' | 'department'>;

  /**
   * Filter by commission eligibility.
   *
   * Exact match on the column. Pass `true` to list users who can be assigned as
   * sales representatives, including dedicated `sales_rep` users.
   */
  is_commission_eligible?: boolean;

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
   * Controls whether removed (soft-deleted) account users appear in the list.
   *
   * Removed users are left out unless you pass `included`, so a user removed with
   * the remove action disappears from the default listing.
   */
  removed_scope?: 'excluded' | 'included';

  /**
   * Filter by role type.
   *
   * - `admin`: account administrators.
   * - `user`: users with a custom role.
   * - `scanner`: scanning station users.
   * - `sales_rep`: sales representatives.
   * - `agent`: automated agents.
   */
  role_type?: 'admin' | 'user' | 'scanner' | 'sales_rep' | 'agent';
}

export interface AccountUserRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'user' | 'role' | 'department'>;
}

export interface AccountUserCreateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'user' | 'role' | 'department'>;

  /**
   * Body param: ID of the department to assign to the user.
   *
   * The department must already exist in the account you are acting in.
   */
  department_id?: string;

  /**
   * Body param: User email address.
   *
   * Either `email` or `username` must be provided. If a user with this email already
   * exists, that user is added to the account instead of a new user being created,
   * and the request fails with a conflict if they are already an active member of
   * it.
   */
  email?: string;

  /**
   * Body param: Whether the user can be assigned as a sales representative on
   * orders, territories, and targets.
   *
   * Defaults to false. Forced true for the `sales_rep` role type and rejected for
   * scanner and agent roles.
   */
  is_commission_eligible?: boolean;

  /**
   * Body param: User display name.
   */
  name?: string;

  /**
   * Body param: Password for scanning station users.
   *
   * Required when creating a scanning station user (username without email) and
   * rejected for all other users, who instead receive a generated password in their
   * welcome email. Must be 8–72 characters and include an uppercase letter, a
   * lowercase letter, a number, and a special character.
   */
  password?: string;

  /**
   * Body param: Notification preference toggles for the new user.
   *
   * Only applies when adding a user to a customer or supplier account you manage;
   * ignored when adding a user to your own account. The enabled types are returned
   * in the user's `notification_types`. When the user is one you previously removed,
   * the toggles apply over the preferences they had before removal, and types you
   * leave out keep their previous state.
   */
  preferences?: Array<NotificationPreferenceItem>;

  /**
   * Body param: ID of the role to assign to the user.
   *
   * The role you supply can be overridden: users added to a customer account always
   * receive the shared customer role so their portal capabilities stay
   * permission-driven, and scanning station users in any other account receive the
   * scanner role. Supplying a role whose type is `sales_rep` normalizes to the
   * account's canonical sales-rep role.
   */
  role_id?: string;

  /**
   * Body param: Unique username.
   *
   * 3–255 characters; letters, numbers, underscores, and hyphens. Either `email` or
   * `username` must be provided. Providing a username without an email creates a
   * scanning station user.
   */
  username?: string;
}

export interface AccountUserUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'user' | 'role' | 'department'>;

  /**
   * Body param: ID of the department to assign to the user.
   *
   * Set to `null` to clear the department. The department must already exist in the
   * account.
   */
  department_id?: string | null;

  /**
   * Body param: User email address.
   *
   * Must not already be in use by another user.
   */
  email?: string;

  /**
   * Body param: Whether the user can be assigned as a sales representative on
   * orders, territories, and targets.
   *
   * Forced true for the `sales_rep` role type and rejected for scanner and agent
   * roles. Cannot be turned off while the user stays on a `sales_rep` role.
   */
  is_commission_eligible?: boolean;

  /**
   * Body param: User display name.
   */
  name?: string;

  /**
   * Body param: Notification preference toggles to apply.
   *
   * Only allowed when updating a user in a customer or supplier account you manage;
   * rejected otherwise. Notification types omitted from the list are left unchanged,
   * and the result is returned in `notification_types`.
   */
  preferences?: Array<NotificationPreferenceItem>;

  /**
   * Body param: ID of the role to assign to the user.
   *
   * Set to `null` to clear the role.
   */
  role_id?: string | null;

  /**
   * Body param: Unique username.
   *
   * 3–255 characters; letters, numbers, underscores, and hyphens. Must not already
   * be in use by another user.
   */
  username?: string;
}

AccountUsers.Actions = Actions;

export declare namespace AccountUsers {
  export {
    type CreateAccountUserRequest as CreateAccountUserRequest,
    type ListAccountUser as ListAccountUser,
    type NotificationPreferenceItem as NotificationPreferenceItem,
    type UpdateAccountUserRequest as UpdateAccountUserRequest,
    type AccountUserListParams as AccountUserListParams,
    type AccountUserRetrieveParams as AccountUserRetrieveParams,
    type AccountUserCreateParams as AccountUserCreateParams,
    type AccountUserUpdateParams as AccountUserUpdateParams,
  };

  export {
    Actions as Actions,
    type ActionActivateResponse as ActionActivateResponse,
    type ActionDisableResponse as ActionDisableResponse,
    type ActionRemoveResponse as ActionRemoveResponse,
  };
}
