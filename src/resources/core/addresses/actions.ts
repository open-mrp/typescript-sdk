// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * Autocomplete, look up details, and validate addresses.
 */
export class Actions extends APIResource {
  /**
   * Checks an address against an address validation service and returns a
   * standardized version of it.
   *
   * Nothing is created or modified. Use this before creating or updating an address
   * to confirm it is complete and to pick up corrected values. When the service can
   * standardize the address, `formatted_address` and `components` carry the
   * corrected values, and `validation_messages` explains anything that was inferred,
   * replaced, or could not be confirmed.
   *
   * @example
   * ```ts
   * const validatedAddress =
   *   await client.core.addresses.actions.validate({
   *     address_line_1: '123 Main St',
   *     city: 'Springfield',
   *     country: 'US',
   *     postal_code: '62701',
   *     state: 'IL',
   *     address_line_2: 'Suite 400',
   *   });
   * ```
   */
  validate(body: ActionValidateParams, options?: RequestOptions): APIPromise<ValidatedAddress> {
    return this._client.put('/v1/core/addresses/actions/validate', { body, ...options });
  }
}

/**
 * Parsed address components.
 */
export interface AddressComponents {
  /**
   * First line of the street address.
   */
  address_line_1: string;

  /**
   * Second line of the street address.
   */
  address_line_2: string | null;

  /**
   * City or locality.
   */
  city: string;

  /**
   * Country name or code.
   */
  country: string;

  /**
   * Two-letter country code.
   */
  country_code: string;

  /**
   * Resource type identifier.
   */
  object: 'address_components';

  /**
   * Postal or ZIP code.
   */
  postal_code: string;

  /**
   * State or administrative area.
   */
  state: string;
}

/**
 * Request to validate an address.
 */
export interface ValidateAddressRequest {
  /**
   * First line of the street address.
   */
  address_line_1: string;

  /**
   * City or locality.
   */
  city: string;

  /**
   * Two-letter country code, such as `US`.
   *
   * A full country name such as `United States` is recognized for a handful of
   * common countries; send the two-letter code for anywhere else.
   */
  country: string;

  /**
   * Postal or ZIP code. Empty for an address without one.
   */
  postal_code: string;

  /**
   * State or administrative area. Empty for an address without one.
   */
  state: string;

  /**
   * Second line of the street address.
   */
  address_line_2?: string;
}

/**
 * The outcome of checking a submitted address against an address validation
 * service.
 */
export interface ValidatedAddress {
  /**
   * Parsed address components.
   */
  components: AddressComponents | null;

  /**
   * Formatted, single-line address as standardized by the validation service.
   *
   * The validation service may omit this regardless of `status`, so it can be absent
   * even for a `valid` address.
   */
  formatted_address: string | null;

  /**
   * Resource type identifier.
   */
  object: 'validated_address';

  /**
   * Whether the address was confirmed as complete and specific enough to ship to.
   *
   * - `valid`: nothing required was missing and the address resolved to a specific
   *   building or block.
   * - `invalid`: required components were missing, or the address only resolved to a
   *   street or a wider area.
   *
   * When the status is `invalid`, read `validation_messages` and compare
   * `components` against what you submitted to see what to correct.
   */
  status: 'valid' | 'invalid';

  /**
   * Human-readable messages describing issues found during validation.
   *
   * May be non-empty even when `status` is `valid`, for example when components were
   * inferred or replaced with standardized values. Empty when no issues were
   * reported.
   */
  validation_messages: Array<string>;
}

export interface ActionValidateParams {
  /**
   * First line of the street address.
   */
  address_line_1: string;

  /**
   * City or locality.
   */
  city: string;

  /**
   * Two-letter country code, such as `US`.
   *
   * A full country name such as `United States` is recognized for a handful of
   * common countries; send the two-letter code for anywhere else.
   */
  country: string;

  /**
   * Postal or ZIP code. Empty for an address without one.
   */
  postal_code: string;

  /**
   * State or administrative area. Empty for an address without one.
   */
  state: string;

  /**
   * Second line of the street address.
   */
  address_line_2?: string;
}

export declare namespace Actions {
  export {
    type AddressComponents as AddressComponents,
    type ValidateAddressRequest as ValidateAddressRequest,
    type ValidatedAddress as ValidatedAddress,
    type ActionValidateParams as ActionValidateParams,
  };
}
