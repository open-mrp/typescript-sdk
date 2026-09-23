// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ActionsAPI from './actions';
import { ActionDismissParams, ActionReadParams, ActionSeenParams, Actions } from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List, read, and manage broadcast announcements.
 */
export class Announcements extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Lists the announcements currently active for the caller, newest first.
   *
   * The feed covers announcements broadcast to the account being acted in together
   * with platform-wide announcements from OpenMRP. Announcements the caller has
   * dismissed are left out, as are any that are scheduled for later or have already
   * expired.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const listAnnouncement =
   *   await client.messaging.announcements.list();
   * ```
   */
  list(
    query: AnnouncementListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListAnnouncement> {
    return this._client.get('/v1/messaging/announcements', { query, ...options });
  }

  /**
   * Retrieves a single announcement by ID, with the calling user's own read state.
   *
   * Only announcements the caller can see are returned: one published to another
   * account, one that has not reached its publish time, or one that has expired is
   * reported as not found. An announcement the caller has dismissed stays
   * retrievable even though it no longer appears in their feed.
   *
   * This endpoint requires the permission: `messaging:read`.
   *
   * @example
   * ```ts
   * const announcement =
   *   await client.messaging.announcements.retrieve(
   *     'an_m4vwgn2t8cqs',
   *   );
   * ```
   */
  retrieve(
    id: string,
    query: AnnouncementRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<Announcement> {
    return this._client.get(path`/v1/messaging/announcements/${id}`, { query, ...options });
  }
}

/**
 * A broadcast announcement shown in the notification (bell) feed, carrying the
 * calling user's own read state.
 *
 * A single announcement is published to everyone in an account, or to every user
 * on the platform, and each user keeps their own seen, read, and dismissed state
 * for it. The status and timestamps you read are therefore always the caller's,
 * and never reflect what anyone else has done with the same announcement.
 * Notifications addressed to one user are a separate resource.
 */
export interface Announcement {
  /**
   * Announcement ID.
   */
  id: string;

  /**
   * Supporting detail shown beneath the title.
   */
  body: string | null;

  /**
   * The kind of event the announcement is about.
   *
   * Announcements draw on the same categories as notifications, such as
   * `system.broadcast` or `order.updated`, and the category is chosen by whoever
   * publishes the announcement. The set is open-ended and may grow over time, so
   * clients should tolerate values they do not recognize.
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
    | 'production_run.updated';

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * When the calling user dismissed the announcement.
   */
  dismissed_at: string | null;

  /**
   * When the announcement stops being shown.
   *
   * Once it expires the announcement leaves every user's feed and can no longer be
   * retrieved; an announcement with no expiry stays until each user dismisses it.
   */
  expires_at: string | null;

  /**
   * Resource type identifier.
   */
  object: 'announcement';

  /**
   * How prominently the announcement should be surfaced, from `low` through
   * `urgent`.
   */
  priority: 'low' | 'normal' | 'high' | 'urgent';

  /**
   * When the announcement becomes visible in the feed.
   *
   * An announcement scheduled for the future is not returned by the announcement
   * endpoints until this time passes.
   */
  publish_at: string;

  /**
   * When the calling user opened the announcement.
   */
  read_at: string | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  resource: CoreAPI.Entity | null;

  /**
   * Who the announcement reaches.
   *
   * - `account`: published to a single account and shown only to that account's
   *   users.
   * - `platform`: published by OpenMRP and shown to every user across all accounts.
   */
  scope: 'account' | 'platform';

  /**
   * When the calling user first saw the announcement.
   */
  seen_at: string | null;

  /**
   * Where the announcement is in its lifecycle for the calling user.
   *
   * - `unseen`: not yet surfaced to the caller.
   * - `seen`: surfaced in the caller's feed but not opened.
   * - `read`: explicitly opened by the caller.
   * - `dismissed`: removed from the caller's feed.
   *
   * The status is derived from the caller's own seen, read, and dismissed timestamps
   * and only ever moves forward, so the same announcement can show a different
   * status for each user in the account.
   */
  status: 'unseen' | 'seen' | 'read' | 'dismissed';

  /**
   * Short headline shown in the feed.
   */
  title: string;

  /**
   * Last update timestamp.
   */
  updated_at: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListAnnouncement {
  /**
   * Resources in this page.
   */
  data: Array<Announcement>;

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

export interface AnnouncementListParams {
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
  include?: Array<'resource'>;

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

export interface AnnouncementRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'resource'>;
}

Announcements.Actions = Actions;

export declare namespace Announcements {
  export {
    type Announcement as Announcement,
    type ListAnnouncement as ListAnnouncement,
    type AnnouncementListParams as AnnouncementListParams,
    type AnnouncementRetrieveParams as AnnouncementRetrieveParams,
  };

  export {
    Actions as Actions,
    type ActionSeenParams as ActionSeenParams,
    type ActionReadParams as ActionReadParams,
    type ActionDismissParams as ActionDismissParams,
  };
}
