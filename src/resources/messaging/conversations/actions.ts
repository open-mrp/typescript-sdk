// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ConversationsAPI from './conversations';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Create conversations, send and read messages (1:1 direct messages).
 */
export class Actions extends APIResource {
  /**
   * Places a conversation under legal hold or releases it.
   *
   * Holding it exempts the conversation from automatic retention purging, and any
   * attempt to redact it is refused until the hold is released.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.setLegalHold(
   *     'cv_w35z4ck68yq7',
   *     { legal_hold: 'held' },
   *   );
   * ```
   */
  setLegalHold(
    id: string,
    params: ActionSetLegalHoldParams,
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/set-legal-hold`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Permanently erases the content of every message in a conversation, for
   * right-to-erasure requests.
   *
   * Message bodies are cleared and attachments are deleted from storage, leaving the
   * messages behind as an empty audit shell. This cannot be undone, and it is
   * refused while the conversation is under legal hold.
   *
   * This endpoint requires the permission: `messaging:delete`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.redact(
   *     'cv_w35z4ck68yq7',
   *   );
   * ```
   */
  redact(
    id: string,
    params: ActionRedactParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/redact`, {
      query: { include },
      ...options,
    });
  }

  /**
   * Advances the caller's read position in a conversation and returns it with the
   * recalculated unread count.
   *
   * Reading also dismisses the caller's outstanding notifications for this
   * conversation, and updates the read receipt the other participants see.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.read(
   *     'cv_w35z4ck68yq7',
   *     { up_to_sequence: 42 },
   *   );
   * ```
   */
  read(
    id: string,
    params: ActionReadParams,
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/read`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Archives a conversation for the whole account rather than just for the caller.
   *
   * Only an owner or admin of the conversation can archive it, and direct messages
   * cannot be archived. An archived customer-facing case leaves the working support
   * inbox and is returned only by the archived view.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.archive(
   *     'cv_w35z4ck68yq7',
   *   );
   * ```
   */
  archive(
    id: string,
    params: ActionArchiveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/archive`, {
      query: { include },
      ...options,
    });
  }

  /**
   * Returns an archived conversation to the active state for the whole account.
   *
   * Only an owner or admin of the conversation can unarchive it. An unarchived
   * customer-facing case comes back to the working support inbox, and participants
   * who had separately hidden the conversation still see it hidden until they unhide
   * it themselves.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.unarchive(
   *     'cv_w35z4ck68yq7',
   *   );
   * ```
   */
  unarchive(
    id: string,
    params: ActionUnarchiveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/unarchive`, {
      query: { include },
      ...options,
    });
  }

  /**
   * Removes the caller from a conversation.
   *
   * An owner cannot leave — hand ownership to someone else first. Leaving posts a
   * "left the conversation" note to the thread and hides the conversation for the
   * caller, who can still read it back but can no longer post.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.leave(
   *     'cv_w35z4ck68yq7',
   *   );
   * ```
   */
  leave(
    id: string,
    params: ActionLeaveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/leave`, {
      query: { include },
      ...options,
    });
  }

  /**
   * Hides a conversation from the caller's own list without affecting other
   * participants.
   *
   * The caller stays a member and keeps receiving notifications; the conversation
   * simply stops appearing in their list until they unhide it, and new messages do
   * not bring it back on their own. Any participant can hide a conversation,
   * including its owner.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.hide(
   *     'cv_w35z4ck68yq7',
   *   );
   * ```
   */
  hide(
    id: string,
    params: ActionHideParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/hide`, {
      query: { include },
      ...options,
    });
  }

  /**
   * Restores a conversation the caller had hidden back to their own list.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.unhide(
   *     'cv_w35z4ck68yq7',
   *   );
   * ```
   */
  unhide(
    id: string,
    params: ActionUnhideParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/unhide`, {
      query: { include },
      ...options,
    });
  }

  /**
   * Mutes a conversation's notifications for the caller only, leaving the other
   * participants unaffected.
   *
   * While muted the caller gets no notification or email for new messages, though
   * the conversation still accumulates an unread count. A direct @mention pierces
   * the mute and still raises a notification.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.mute(
   *     'cv_w35z4ck68yq7',
   *     { muted_until: '2026-01-02T15:04:05Z' },
   *   );
   * ```
   */
  mute(
    id: string,
    params: ActionMuteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include, ...body } = params ?? {};
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/mute`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Restores notifications for a conversation the caller had muted.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.unmute(
   *     'cv_w35z4ck68yq7',
   *   );
   * ```
   */
  unmute(
    id: string,
    params: ActionUnmuteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/unmute`, {
      query: { include },
      ...options,
    });
  }

  /**
   * Moves a customer-service case to a triage lane in the support inbox.
   *
   * Only customer-facing cases have a triage lane; an internal conversation is
   * rejected. The lane also advances on its own as the case progresses — an inbound
   * customer message moves it to `waiting_internal`, a drafted reply to
   * `needs_approval`, and an approved reply to `waiting_external` — so a lane set by
   * hand can be overtaken by later activity.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.setStatus(
   *     'cv_w35z4ck68yq7',
   *     { workflow_status: 'open' },
   *   );
   * ```
   */
  setStatus(
    id: string,
    params: ActionSetStatusParams,
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/set-status`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Assigns an external customer-service case to an owner — a user or a team — or
   * clears the assignment.
   *
   * Only customer-facing cases can be assigned; assigning an internal conversation
   * is rejected. The support inbox can then be filtered to a single assignee, or to
   * the cases nobody owns yet.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.assign(
   *     'cv_w35z4ck68yq7',
   *     {
   *       assignee_resource_id: 'acus_e5zu8bde0z3h',
   *       assignee_resource_type: 'account_user',
   *     },
   *   );
   * ```
   */
  assign(
    id: string,
    params: ActionAssignParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include, ...body } = params ?? {};
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/assign`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Files an abuse report against a conversation, or against one message within it,
   * and returns the conversation.
   *
   * Only an active participant can report a conversation. The report is recorded for
   * review and changes nothing about the conversation itself — it is not hidden,
   * muted, or removed.
   *
   * This endpoint requires the permission: `messaging:create`.
   *
   * @example
   * ```ts
   * const conversation =
   *   await client.messaging.conversations.actions.report(
   *     'cv_w35z4ck68yq7',
   *     { reason: 'spam', message_id: 'mg_fdny8633ebgw' },
   *   );
   * ```
   */
  report(
    id: string,
    params: ActionReportParams,
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Conversation> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/messaging/conversations/${id}/actions/report`, {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * Request to assign a customer-service case to a single owner — a user or a team.
 *
 * The owner is a polymorphic (`assignee_resource_type`, `assignee_resource_id`)
 * reference; omit both fields to clear the assignment.
 */
export interface AssignConversationRequest {
  /**
   * The owner's id, an `account_user` or `account_group` matching
   * `assignee_resource_type`.
   *
   * Omit this and `assignee_resource_type` to clear the assignment.
   */
  assignee_resource_id?: string;

  /**
   * What kind of owner the case is being assigned to.
   *
   * - `account_user`: an individual teammate takes the case.
   * - `account_group`: a team takes the case, so anyone on it can pick it up.
   */
  assignee_resource_type?: 'account_user' | 'account_group';
}

/**
 * Request to advance the caller's read cursor in a conversation.
 */
export interface MarkConversationReadRequest {
  /**
   * Mark every message up to and including this sequence number as read.
   *
   * A sequence past the conversation's latest message is clamped to it, and the read
   * position never moves backwards, so replaying an older value is harmless.
   */
  up_to_sequence: number;
}

/**
 * Request to mute a conversation for the caller.
 */
export interface MuteConversationRequest {
  /**
   * When the mute expires.
   *
   * Omit to mute indefinitely.
   */
  muted_until?: string;
}

/**
 * Request to report a conversation (optionally a specific message) for abuse.
 */
export interface ReportConversationRequest {
  /**
   * Why the conversation or message is being reported, in free-form text.
   */
  reason: string;

  /**
   * The specific message being reported.
   *
   * Omit to report the conversation as a whole.
   */
  message_id?: string;
}

/**
 * Request to place a conversation under legal hold or release it.
 */
export interface SetLegalHoldRequest {
  /**
   * Whether to place the conversation under legal hold or release it.
   *
   * - `held`: the conversation is preserved — exempt from automatic retention
   *   purging and from redaction.
   * - `released`: normal retention and redaction apply again.
   */
  legal_hold: 'released' | 'held';
}

/**
 * Request to set the triage lane of a customer-service case.
 */
export interface SetWorkflowStatusRequest {
  /**
   * The triage lane to move the case to.
   *
   * - `new`: opened but nobody has triaged it yet.
   * - `open`: actively being worked.
   * - `waiting_internal`: blocked on the internal team.
   * - `waiting_external`: blocked on a reply from the customer.
   * - `needs_approval`: a drafted reply is waiting for a human to approve it.
   * - `resolved`: closed out.
   */
  workflow_status: 'new' | 'open' | 'waiting_internal' | 'waiting_external' | 'needs_approval' | 'resolved';
}

export interface ActionSetLegalHoldParams {
  /**
   * Body param: Whether to place the conversation under legal hold or release it.
   *
   * - `held`: the conversation is preserved — exempt from automatic retention
   *   purging and from redaction.
   * - `released`: normal retention and redaction apply again.
   */
  legal_hold: 'released' | 'held';

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionRedactParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionReadParams {
  /**
   * Body param: Mark every message up to and including this sequence number as read.
   *
   * A sequence past the conversation's latest message is clamped to it, and the read
   * position never moves backwards, so replaying an older value is harmless.
   */
  up_to_sequence: number;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionArchiveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionUnarchiveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionLeaveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionHideParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionUnhideParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionMuteParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;

  /**
   * Body param: When the mute expires.
   *
   * Omit to mute indefinitely.
   */
  muted_until?: string;
}

export interface ActionUnmuteParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionSetStatusParams {
  /**
   * Body param: The triage lane to move the case to.
   *
   * - `new`: opened but nobody has triaged it yet.
   * - `open`: actively being worked.
   * - `waiting_internal`: blocked on the internal team.
   * - `waiting_external`: blocked on a reply from the customer.
   * - `needs_approval`: a drafted reply is waiting for a human to approve it.
   * - `resolved`: closed out.
   */
  workflow_status: 'new' | 'open' | 'waiting_internal' | 'waiting_external' | 'needs_approval' | 'resolved';

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;
}

export interface ActionAssignParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;

  /**
   * Body param: The owner's id, an `account_user` or `account_group` matching
   * `assignee_resource_type`.
   *
   * Omit this and `assignee_resource_type` to clear the assignment.
   */
  assignee_resource_id?: string;

  /**
   * Body param: What kind of owner the case is being assigned to.
   *
   * - `account_user`: an individual teammate takes the case.
   * - `account_group`: a team takes the case, so anyone on it can pick it up.
   */
  assignee_resource_type?: 'account_user' | 'account_group';
}

export interface ActionReportParams {
  /**
   * Body param: Why the conversation or message is being reported, in free-form
   * text.
   */
  reason: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'assignee'
    | 'group'
    | 'participants'
    | 'topic'
    | 'last_message'
    | 'last_message.sender'
    | 'last_message.author'
    | 'last_message.resource'
    | 'last_message.attachments'
    | 'last_message.attachments.resource'
  >;

  /**
   * Body param: The specific message being reported.
   *
   * Omit to report the conversation as a whole.
   */
  message_id?: string;
}

export declare namespace Actions {
  export {
    type AssignConversationRequest as AssignConversationRequest,
    type MarkConversationReadRequest as MarkConversationReadRequest,
    type MuteConversationRequest as MuteConversationRequest,
    type ReportConversationRequest as ReportConversationRequest,
    type SetLegalHoldRequest as SetLegalHoldRequest,
    type SetWorkflowStatusRequest as SetWorkflowStatusRequest,
    type ActionSetLegalHoldParams as ActionSetLegalHoldParams,
    type ActionRedactParams as ActionRedactParams,
    type ActionReadParams as ActionReadParams,
    type ActionArchiveParams as ActionArchiveParams,
    type ActionUnarchiveParams as ActionUnarchiveParams,
    type ActionLeaveParams as ActionLeaveParams,
    type ActionHideParams as ActionHideParams,
    type ActionUnhideParams as ActionUnhideParams,
    type ActionMuteParams as ActionMuteParams,
    type ActionUnmuteParams as ActionUnmuteParams,
    type ActionSetStatusParams as ActionSetStatusParams,
    type ActionAssignParams as ActionAssignParams,
    type ActionReportParams as ActionReportParams,
  };
}
