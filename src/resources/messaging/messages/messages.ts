// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ConversationsAPI from '../conversations/conversations';
import * as ActionsAPI from './actions';
import {
  ActionApproveSendParams,
  ActionCancelParams,
  ActionRejectParams,
  ActionRescheduleParams,
  Actions,
  ApproveSendDraftRequest,
  RescheduleMessageRequest,
} from './actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Send, list, edit, and delete chat messages.
 */
export class Messages extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Revises a reply draft before it is sent to the customer.
   *
   * Only a draft that is still awaiting approval can be edited; once it has been
   * approved, rejected, or superseded the request fails. Nothing reaches the
   * customer until the draft is approved.
   *
   * This endpoint requires the permission: `messaging:update`.
   *
   * @example
   * ```ts
   * const message = await client.messaging.messages.update(
   *   'mg_fdny8633ebgw',
   *   {
   *     body: 'Hi Joe — good news, your order ships tomorrow.',
   *     subject: 'Re: Order #1042',
   *   },
   * );
   * ```
   */
  update(
    id: string,
    params: MessageUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ConversationsAPI.Message> {
    const { include, ...body } = params;
    return this._client.patch(path`/v1/messaging/messages/${id}`, { query: { include }, body, ...options });
  }
}

/**
 * Request to edit a still-open customer-reply draft message.
 */
export interface UpdateDraftRequest {
  /**
   * The revised reply body, replacing what the draft said before.
   */
  body: string;

  /**
   * The revised subject line for a draft that will be sent by email.
   *
   * Leaving it out keeps the draft's current subject.
   */
  subject?: string;
}

export interface MessageUpdateParams {
  /**
   * Body param: The revised reply body, replacing what the draft said before.
   */
  body: string;

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
   * Body param: The revised subject line for a draft that will be sent by email.
   *
   * Leaving it out keeps the draft's current subject.
   */
  subject?: string;
}

Messages.Actions = Actions;

export declare namespace Messages {
  export { type UpdateDraftRequest as UpdateDraftRequest, type MessageUpdateParams as MessageUpdateParams };

  export {
    Actions as Actions,
    type ApproveSendDraftRequest as ApproveSendDraftRequest,
    type RescheduleMessageRequest as RescheduleMessageRequest,
    type ActionApproveSendParams as ActionApproveSendParams,
    type ActionRejectParams as ActionRejectParams,
    type ActionCancelParams as ActionCancelParams,
    type ActionRescheduleParams as ActionRescheduleParams,
  };
}
