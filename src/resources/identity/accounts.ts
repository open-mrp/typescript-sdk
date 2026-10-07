// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage account details, branding, portal, logo, and favicon.
 */
export class Accounts extends APIResource {
  /**
   * Uploads a customer-portal favicon.
   *
   * Send the image as the raw request body, not as multipart form data. Use a small
   * square PNG (e.g. 32x32 or 64x64) for the best result in browser tabs. The
   * uploaded image replaces any existing favicon and is shown on the account's
   * customer portal. You can only upload a favicon for the account you are acting
   * in.
   *
   * A body that is empty or not a PNG, JPEG, GIF, WebP, or ICO image is refused with
   * a 400, and one over 10 MB with a 413; the existing favicon is kept either way.
   *
   * This endpoint requires the permission: `self:update`.
   *
   * @example
   * ```ts
   * const response =
   *   await client.identity.accounts.updateFavicon(
   *     'ac_ykxoradjoeb3',
   *   );
   * ```
   */
  updateFavicon(id: string, options?: RequestOptions): APIPromise<AccountUpdateFaviconResponse> {
    return this._client.put(path`/v1/identity/accounts/${id}/favicon`, options);
  }
}

export interface AccountUpdateFaviconResponse {}

export declare namespace Accounts {
  export { type AccountUpdateFaviconResponse as AccountUpdateFaviconResponse };
}
