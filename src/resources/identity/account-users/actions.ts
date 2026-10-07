// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List and manage account users.
 */
export class Actions extends APIResource {
  /**
   * Activates a disabled or removed account user, restoring their access to the
   * account you are acting in.
   *
   * Reactivating a user in your own account consumes a seat, so the request fails if
   * your plan is at its seat limit; users of a customer or supplier account you
   * manage take no seat. Activating an already-active user is a no-op.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `team:update`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.identity.accountUsers.actions.activate(
   *     'acus_e5zu8bde0z3h',
   *   );
   * ```
   */
  activate(id: string, options?: RequestOptions): APIPromise<ActionActivateResponse> {
    return this._client.put(path`/v1/identity/account-users/${id}/actions/activate`, options);
  }

  /**
   * Disables (locks) an account user.
   *
   * Disabled users cannot access the account and their active sessions are revoked,
   * but the membership and its role assignment are kept so access can be restored
   * with the activate action. Disabling frees the seat the user occupied. Admin
   * users cannot be disabled, you cannot disable yourself, and removed users must be
   * activated before they can be disabled. Disabling an already-disabled user is a
   * no-op.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `team:update`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.identity.accountUsers.actions.disable(
   *     'acus_e5zu8bde0z3h',
   *   );
   * ```
   */
  disable(id: string, options?: RequestOptions): APIPromise<ActionDisableResponse> {
    return this._client.put(path`/v1/identity/account-users/${id}/actions/disable`, options);
  }

  /**
   * Removes a user from the account you are acting in.
   *
   * Removal is a soft delete: removed users are excluded from listings unless
   * requested via `removed_scope`, they free the seat they occupied, and they can be
   * restored with the activate action or by adding them again. Removing an
   * already-removed user is a no-op. The user's profile itself is untouched, so
   * their access to any other account they belong to is unaffected.
   *
   * Acting in a customer's account requires `customers:delete`, and acting in a
   * supplier's account requires `suppliers:delete`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `team:delete`.
   *
   * @example
   * ```ts
   * const action =
   *   await client.identity.accountUsers.actions.remove(
   *     'acus_e5zu8bde0z3h',
   *   );
   * ```
   */
  remove(id: string, options?: RequestOptions): APIPromise<ActionRemoveResponse> {
    return this._client.put(path`/v1/identity/account-users/${id}/actions/remove`, options);
  }
}

export interface ActionActivateResponse {}

export interface ActionDisableResponse {}

export interface ActionRemoveResponse {}

export declare namespace Actions {
  export {
    type ActionActivateResponse as ActionActivateResponse,
    type ActionDisableResponse as ActionDisableResponse,
    type ActionRemoveResponse as ActionRemoveResponse,
  };
}
