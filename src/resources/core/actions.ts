// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Utility action endpoints for checking duplicates and emailing records.
 */
export class Actions extends APIResource {
  /**
   * Emails a record (invoice, sales order, or purchase order) to its configured
   * recipients and marks the record as sent.
   *
   * Delivery is asynchronous: the endpoint returns `202 Accepted` once the email is
   * queued, so a `202` means the send was accepted, not that it reached the
   * recipients. If the record has no configured recipients the request still
   * succeeds and nothing is sent; in that case a sales order or purchase order is
   * also left unmarked, while an invoice is still marked as sent.
   *
   * An `id` that is not one of the account's records of the given `type` answers
   * `404`.
   *
   * This endpoint requires the permissions: `invoices:read`, `sales_orders:read`,
   * `purchase_orders:read`.
   *
   * @example
   * ```ts
   * const response = await client.core.actions.emailRecord({
   *   id: 'iv_m982ezb0fgp7',
   *   type: 'invoice',
   * });
   * ```
   */
  emailRecord(
    body: ActionEmailRecordParams,
    options?: RequestOptions,
  ): APIPromise<ActionEmailRecordResponse> {
    return this._client.post('/v1/core/actions/email-record', { body, ...options });
  }
}

/**
 * Request to email a record to its configured recipients.
 */
export interface EmailRecordRequest {
  /**
   * ID of the record to email.
   */
  id: string;

  /**
   * The type of record to email.
   *
   * - `invoice`: emails the invoice to the contacts on its sales order that are set
   *   to receive invoice emails.
   * - `sales_order`: sends an order acknowledgement to the order's acknowledgement
   *   recipients.
   * - `purchase_order`: sends the purchase order submission to the order's
   *   submission recipients.
   */
  type: 'invoice' | 'sales_order' | 'purchase_order';
}

export interface ActionEmailRecordResponse {}

export interface ActionEmailRecordParams {
  /**
   * ID of the record to email.
   */
  id: string;

  /**
   * The type of record to email.
   *
   * - `invoice`: emails the invoice to the contacts on its sales order that are set
   *   to receive invoice emails.
   * - `sales_order`: sends an order acknowledgement to the order's acknowledgement
   *   recipients.
   * - `purchase_order`: sends the purchase order submission to the order's
   *   submission recipients.
   */
  type: 'invoice' | 'sales_order' | 'purchase_order';
}

export declare namespace Actions {
  export {
    type EmailRecordRequest as EmailRecordRequest,
    type ActionEmailRecordResponse as ActionEmailRecordResponse,
    type ActionEmailRecordParams as ActionEmailRecordParams,
  };
}
