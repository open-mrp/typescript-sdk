// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BlocksAPI from '../messaging/blocks';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * List and manage machines.
 */
export class Machines extends APIResource {
  /**
   * Returns a paginated list of machines in your account, most recently created
   * first.
   *
   * The search term matches the machine name.
   *
   * This endpoint requires the permission: `machines:read`.
   *
   * @example
   * ```ts
   * const listMachine = await client.operations.machines.list();
   * ```
   */
  list(
    query: MachineListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BlocksAPI.ListMachine> {
    return this._client.get('/v1/operations/machines', { query, ...options });
  }

  /**
   * Returns a machine by ID.
   *
   * This endpoint requires the permission: `machines:read`.
   *
   * @example
   * ```ts
   * const machine = await client.operations.machines.retrieve(
   *   'mc_ffcfk9dxixis',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: MachineRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BlocksAPI.Machine> {
    return this._client.get(path`/v1/operations/machines/${id}`, { query, ...options });
  }

  /**
   * Creates a machine and assigns it to a department.
   *
   * Returns a conflict error if another machine in your account already uses the
   * same name, and a not-found error if the department does not belong to your
   * account. The department cannot be changed once the machine exists.
   *
   * This endpoint requires the permission: `machines:create`.
   *
   * @example
   * ```ts
   * const machine = await client.operations.machines.create({
   *   department_id: 'dp_m0jayebxnkos',
   *   name: 'CNC Router',
   *   serial_number: 'SN-2024-0001',
   * });
   * ```
   */
  create(params: MachineCreateParams, options?: RequestOptions): APIPromise<BlocksAPI.Machine> {
    const { include, ...body } = params;
    return this._client.post('/v1/operations/machines', { query: { include }, body, ...options });
  }

  /**
   * Partially updates a machine.
   *
   * Only the fields provided in the request are changed. Returns a conflict error if
   * the new name is already in use by another machine in your account. A machine
   * cannot be moved to a different department.
   *
   * This endpoint requires the permission: `machines:update`.
   *
   * @example
   * ```ts
   * const machine = await client.operations.machines.update(
   *   'mc_ffcfk9dxixis',
   *   { name: 'Updated CNC Router' },
   * );
   * ```
   */
  update(
    id: string,
    params: MachineUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BlocksAPI.Machine> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/operations/machines/${id}`, { query: { include }, body, ...options });
  }

  /**
   * Deletes a machine.
   *
   * Deletion is permanent, and repeating the call reports that the machine has
   * already been deleted. Downtime events and schedule lines already logged against
   * the machine are kept rather than removed with it.
   *
   * This endpoint requires the permission: `machines:delete`.
   *
   * @example
   * ```ts
   * const machine = await client.operations.machines.delete(
   *   'mc_ffcfk9dxixis',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<MachineDeleteResponse> {
    return this._client.delete(path`/v1/operations/machines/${id}`, options);
  }
}

/**
 * Request to create a machine.
 */
export interface CreateMachineRequest {
  /**
   * ID of the department this machine belongs to.
   *
   * Must reference a department in your account.
   */
  department_id: string;

  /**
   * Display name of the machine.
   *
   * Must be unique within your account; maximum 255 characters.
   */
  name: string;

  /**
   * Serial number of the machine.
   *
   * Maximum 255 characters.
   */
  serial_number: string;

  /**
   * Free-form notes about the machine.
   */
  notes?: string;
}

/**
 * Request to partially update a machine.
 */
export interface UpdateMachineRequest {
  /**
   * Display name of the machine.
   *
   * Must be unique within your account; maximum 255 characters.
   */
  name?: string;

  /**
   * Free-form notes about the machine.
   *
   * Send `null` to clear.
   */
  notes?: string | null;

  /**
   * Serial number of the machine.
   *
   * Maximum 255 characters.
   */
  serial_number?: string;
}

export interface MachineDeleteResponse {}

export interface MachineListParams {
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
  include?: Array<'department'>;

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

export interface MachineRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'department'>;
}

export interface MachineCreateParams {
  /**
   * Body param: ID of the department this machine belongs to.
   *
   * Must reference a department in your account.
   */
  department_id: string;

  /**
   * Body param: Display name of the machine.
   *
   * Must be unique within your account; maximum 255 characters.
   */
  name: string;

  /**
   * Body param: Serial number of the machine.
   *
   * Maximum 255 characters.
   */
  serial_number: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'department'>;

  /**
   * Body param: Free-form notes about the machine.
   */
  notes?: string;
}

export interface MachineUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'department'>;

  /**
   * Body param: Display name of the machine.
   *
   * Must be unique within your account; maximum 255 characters.
   */
  name?: string;

  /**
   * Body param: Free-form notes about the machine.
   *
   * Send `null` to clear.
   */
  notes?: string | null;

  /**
   * Body param: Serial number of the machine.
   *
   * Maximum 255 characters.
   */
  serial_number?: string;
}

export declare namespace Machines {
  export {
    type CreateMachineRequest as CreateMachineRequest,
    type UpdateMachineRequest as UpdateMachineRequest,
    type MachineDeleteResponse as MachineDeleteResponse,
    type MachineListParams as MachineListParams,
    type MachineRetrieveParams as MachineRetrieveParams,
    type MachineCreateParams as MachineCreateParams,
    type MachineUpdateParams as MachineUpdateParams,
  };
}
