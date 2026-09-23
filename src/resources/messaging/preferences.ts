// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Manage per-category notification channel preferences (in-app, email, push).
 */
export class Preferences extends APIResource {
  /**
   * Lists the current user's notification preferences for the account they are
   * acting in: their global default plus any per-category overrides.
   *
   * Only preferences the user has explicitly set are returned, so an empty list
   * means everything falls back to the standard behavior — in-app notifications on,
   * email and push off.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const listNotificationPreference =
   *   await client.messaging.preferences.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ListNotificationPreference> {
    return this._client.get('/v1/messaging/preferences', options);
  }

  /**
   * Creates or replaces one of the current user's notification preferences, either
   * their global default or the override for a single category.
   *
   * The preference applies only to the account being acted in, and the category must
   * be one the platform recognizes. Callers without a user membership in that
   * account cannot hold preferences and are refused.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const notificationPreference =
   *   await client.messaging.preferences.update({
   *     email_enabled: false,
   *     in_app_enabled: true,
   *     push_enabled: false,
   *     category: 'chat.message',
   *     digest: 'instant',
   *   });
   * ```
   */
  update(body: PreferenceUpdateParams, options?: RequestOptions): APIPromise<NotificationPreference> {
    return this._client.put('/v1/messaging/preferences', { body, ...options });
  }
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListNotificationPreference {
  /**
   * Resources in this page.
   */
  data: Array<NotificationPreference>;

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
 * One user's choice of which channels a category of notification is delivered on.
 *
 * Preferences belong to the user's membership in a single account, so the same
 * person can be notified differently in each account they belong to. A preference
 * with no category is that user's global default, and a category-specific
 * preference overrides it. Where neither exists, in-app notifications are
 * delivered and email and push are not.
 *
 * Chat notifications are the only ones these settings currently govern:
 * notifications in every other category reach the in-app feed and are never
 * emailed, whatever is stored here.
 */
export interface NotificationPreference {
  /**
   * Preference ID.
   */
  id: string;

  /**
   * The notification category this preference applies to.
   *
   * A preference with no category is the user's global default, used for every
   * category they have not set a specific preference for.
   */
  category:
    | 'chat.message'
    | 'chat.mention'
    | 'chat.added'
    | 'order.updated'
    | 'agent.run_completed'
    | 'agent.alert'
    | 'system.broadcast'
    | 'customer.registered'
    | 'production_run.updated'
    | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * How often email for this category is sent.
   *
   * - `instant`: send an email as soon as an eligible notification occurs.
   * - `hourly`: collect eligible notifications into a single hourly email.
   * - `daily`: collect eligible notifications into a single daily email.
   * - `off`: never send email for this category, even when email is otherwise
   *   enabled.
   *
   * This governs email only; in-app delivery is unaffected. Batched sending is not
   * running yet, so `hourly` and `daily` currently hold email back in the same way
   * as `off`.
   */
  digest: 'instant' | 'hourly' | 'daily' | 'off';

  /**
   * Whether notifications in this category are also emailed to the user.
   *
   * Email is additionally suppressed for a conversation the user has muted, and only
   * sent on the cadence set by `digest`.
   */
  email_enabled: boolean;

  /**
   * Whether notifications in this category appear in the user's in-app feed.
   *
   * A direct @mention is always delivered in-app, even when this is disabled.
   */
  in_app_enabled: boolean;

  /**
   * Resource type identifier.
   */
  object: 'notification_preference';

  /**
   * Whether notifications in this category are also sent as push notifications.
   *
   * Push delivery is not available yet; the choice is stored for when it is.
   */
  push_enabled: boolean;

  /**
   * Last update timestamp.
   */
  updated_at: string;
}

/**
 * Request to create or replace one of the caller's notification preferences.
 *
 * A user has at most one preference per category, so sending the same category
 * again replaces the previous settings outright — every channel is written from
 * this request, not merged with what was there before.
 *
 * Chat notifications are the only ones these settings currently govern:
 * notifications in every other category reach the in-app feed and are never
 * emailed, whatever is stored here.
 */
export interface UpsertNotificationPreferenceRequest {
  /**
   * Whether notifications in this category are also emailed to the user.
   *
   * Email is additionally suppressed for a conversation the user has muted, and only
   * sent on the cadence set by `digest`.
   */
  email_enabled: boolean;

  /**
   * Whether notifications in this category appear in the user's in-app feed.
   *
   * A direct @mention is always delivered in-app, even when this is off.
   */
  in_app_enabled: boolean;

  /**
   * Whether notifications in this category are also sent as push notifications.
   *
   * Push delivery is not available yet; the choice is stored for when it is.
   */
  push_enabled: boolean;

  /**
   * The notification category these settings apply to, such as `chat.message`.
   *
   * Leave it out to set the global default used for every category without its own
   * preference.
   */
  category?: string | null;

  /**
   * How often email for this category is sent.
   *
   * - `instant`: send an email as soon as an eligible notification occurs.
   * - `hourly`: collect eligible notifications into a single hourly email.
   * - `daily`: collect eligible notifications into a single daily email.
   * - `off`: never send email for this category, even when email is otherwise
   *   enabled.
   *
   * This governs email only; in-app delivery is unaffected. Batched sending is not
   * running yet, so `hourly` and `daily` currently hold email back in the same way
   * as `off`.
   */
  digest?: 'instant' | 'hourly' | 'daily' | 'off';
}

export interface PreferenceUpdateParams {
  /**
   * Whether notifications in this category are also emailed to the user.
   *
   * Email is additionally suppressed for a conversation the user has muted, and only
   * sent on the cadence set by `digest`.
   */
  email_enabled: boolean;

  /**
   * Whether notifications in this category appear in the user's in-app feed.
   *
   * A direct @mention is always delivered in-app, even when this is off.
   */
  in_app_enabled: boolean;

  /**
   * Whether notifications in this category are also sent as push notifications.
   *
   * Push delivery is not available yet; the choice is stored for when it is.
   */
  push_enabled: boolean;

  /**
   * The notification category these settings apply to, such as `chat.message`.
   *
   * Leave it out to set the global default used for every category without its own
   * preference.
   */
  category?: string | null;

  /**
   * How often email for this category is sent.
   *
   * - `instant`: send an email as soon as an eligible notification occurs.
   * - `hourly`: collect eligible notifications into a single hourly email.
   * - `daily`: collect eligible notifications into a single daily email.
   * - `off`: never send email for this category, even when email is otherwise
   *   enabled.
   *
   * This governs email only; in-app delivery is unaffected. Batched sending is not
   * running yet, so `hourly` and `daily` currently hold email back in the same way
   * as `off`.
   */
  digest?: 'instant' | 'hourly' | 'daily' | 'off';
}

export declare namespace Preferences {
  export {
    type ListNotificationPreference as ListNotificationPreference,
    type NotificationPreference as NotificationPreference,
    type UpsertNotificationPreferenceRequest as UpsertNotificationPreferenceRequest,
    type PreferenceUpdateParams as PreferenceUpdateParams,
  };
}
