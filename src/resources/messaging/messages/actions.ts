// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ConversationsAPI from '../conversations/conversations';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Send, list, edit, and delete chat messages.
 */
export class Actions extends APIResource {
  /**
   * Approves a reply draft and sends it to the customer.
   *
   * The draft becomes the sent message rather than spawning a copy: it takes its
   * place in the case timeline, and the customer sees it as coming from "Customer
   * Service". A draft on the email channel goes out as a reply on the case's email
   * thread; otherwise it appears in the customer's conversation. Sending also moves
   * the case to waiting on the customer.
   *
   * Only the first approval of a draft sends it — approving one that is no longer
   * open fails, so a concurrent double-approve cannot reach the customer twice.
   * Customer accounts cannot approve drafts.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const message =
   *   await client.messaging.messages.actions.approveSend(
   *     'mg_fdny8633ebgw',
   *     { client_message_id: 'client_msg_approve_7b1c' },
   *   );
   * ```
   */
  approveSend(
    id: string,
    params: ActionApproveSendParams,
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Message> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/messaging/messages/${id}/actions/approve-send`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Discards a reply draft without sending it to the customer.
   *
   * The draft is kept as a rejected record for history and can no longer be edited
   * or approved. Because the customer is still owed an answer, the case moves back
   * to waiting on your team.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const message =
   *   await client.messaging.messages.actions.reject(
   *     'mg_fdny8633ebgw',
   *   );
   * ```
   */
  reject(
    id: string,
    params: ActionRejectParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Message> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/messaging/messages/${id}/actions/reject`, {
      query: { include },
      ...options,
    });
  }

  /**
   * Cancels a message that was scheduled for a future send, so it is never
   * delivered.
   *
   * You can only cancel a message you scheduled yourself, and only while it is still
   * waiting to go out — once it has been delivered or has otherwise left the
   * scheduled state, the request fails. The canceled message is kept as a record and
   * never appears in the conversation.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const message =
   *   await client.messaging.messages.actions.cancel(
   *     'mg_fdny8633ebgw',
   *   );
   * ```
   */
  cancel(
    id: string,
    params: ActionCancelParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Message> {
    const { include } = params ?? {};
    return this._client.post(path`/v1/messaging/messages/${id}/actions/cancel`, {
      query: { include },
      ...options,
    });
  }

  /**
   * Moves a message you scheduled to a new send time, optionally revising what it
   * says, and returns it.
   *
   * The message keeps its id and is sent once, at the new time; the time it had
   * before no longer applies. You can only reschedule a message you scheduled
   * yourself, and only until its send time arrives — once it is due, sent or
   * canceled the request fails.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const message =
   *   await client.messaging.messages.actions.reschedule(
   *     'mg_fdny8633ebgw',
   *     {
   *       scheduled_at: '2026-03-02T14:00:00Z',
   *       body: 'Reminder: the line goes down for maintenance at 6pm.',
   *     },
   *   );
   * ```
   */
  reschedule(
    id: string,
    params: ActionRescheduleParams,
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Message> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/messaging/messages/${id}/actions/reschedule`, {
      query: { include },
      body,
      ...options,
    });
  }
}

/**
 * Request to approve a customer-reply draft and send it to the customer.
 */
export interface ApproveSendDraftRequest {
  /**
   * A unique client-generated key for this approval, such as a UUID.
   */
  client_message_id: string;
}

/**
 * Request to move a scheduled message to a new send time.
 */
export interface RescheduleMessageRequest {
  /**
   * When the message should now be sent. Must be in the future.
   */
  scheduled_at: string;

  /**
   * The revised message body, replacing what it said before.
   *
   * Leaving it out keeps the current body.
   */
  body?: string;
}

export interface ActionApproveSendParams {
  /**
   * Body param: A unique client-generated key for this approval, such as a UUID.
   */
  client_message_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'sender'
    | 'author'
    | 'resource'
    | 'attachments'
    | 'attachments.resource'
    | 'conversation'
    | 'conversation.participants'
    | 'conversation.last_message'
    | 'reply_to'
    | 'reply_to.sender'
    | 'reply_to.author'
    | 'reply_to.attachments'
    | 'agent_run'
  >;
}

export interface ActionRejectParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'sender'
    | 'author'
    | 'resource'
    | 'attachments'
    | 'attachments.resource'
    | 'conversation'
    | 'conversation.participants'
    | 'conversation.last_message'
    | 'reply_to'
    | 'reply_to.sender'
    | 'reply_to.author'
    | 'reply_to.attachments'
    | 'agent_run'
  >;
}

export interface ActionCancelParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'sender'
    | 'author'
    | 'resource'
    | 'attachments'
    | 'attachments.resource'
    | 'conversation'
    | 'conversation.participants'
    | 'conversation.last_message'
    | 'reply_to'
    | 'reply_to.sender'
    | 'reply_to.author'
    | 'reply_to.attachments'
    | 'agent_run'
  >;
}

export interface ActionRescheduleParams {
  /**
   * Body param: When the message should now be sent. Must be in the future.
   */
  scheduled_at: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<
    | 'sender'
    | 'author'
    | 'resource'
    | 'attachments'
    | 'attachments.resource'
    | 'conversation'
    | 'conversation.participants'
    | 'conversation.last_message'
    | 'reply_to'
    | 'reply_to.sender'
    | 'reply_to.author'
    | 'reply_to.attachments'
    | 'agent_run'
  >;

  /**
   * Body param: The revised message body, replacing what it said before.
   *
   * Leaving it out keeps the current body.
   */
  body?: string;
}

export declare namespace Actions {
  export {
    type ApproveSendDraftRequest as ApproveSendDraftRequest,
    type RescheduleMessageRequest as RescheduleMessageRequest,
    type ActionApproveSendParams as ActionApproveSendParams,
    type ActionRejectParams as ActionRejectParams,
    type ActionCancelParams as ActionCancelParams,
    type ActionRescheduleParams as ActionRescheduleParams,
  };
}
