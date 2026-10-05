// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BlocksAPI from '../messaging/blocks';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * List and manage departments.
 */
export class Departments extends APIResource {
  /**
   * Returns a paginated list of departments in your account, most recently created
   * first.
   *
   * The `q` search term matches the department name.
   *
   * This endpoint requires the permission: `departments:read`.
   *
   * @example
   * ```ts
   * const listDepartment =
   *   await client.operations.departments.list();
   * ```
   */
  list(
    query: DepartmentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListDepartment> {
    return this._client.get('/v1/operations/departments', { query, ...options });
  }

  /**
   * Returns a department by ID.
   *
   * This endpoint requires the permission: `departments:read`.
   *
   * @example
   * ```ts
   * const department =
   *   await client.operations.departments.retrieve(
   *     'dp_m0jayebxnkos',
   *   );
   * ```
   */
  retrieve(
    id: string,
    query: DepartmentRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BlocksAPI.Department> {
    return this._client.get(path`/v1/operations/departments/${id}`, { query, ...options });
  }

  /**
   * Creates a department, optionally assigning scanning stations and machines to it.
   *
   * Returns a conflict error if a department with the same name already exists.
   *
   * This endpoint requires the permission: `departments:create`.
   *
   * @example
   * ```ts
   * const department =
   *   await client.operations.departments.create({
   *     name: 'Fabrication',
   *     machine_ids: ['mc_ffcfk9dxixis'],
   *     scanning_station_ids: ['scst_t71bn7lq5yov'],
   *   });
   * ```
   */
  create(params: DepartmentCreateParams, options?: RequestOptions): APIPromise<BlocksAPI.Department> {
    const { include, ...body } = params;
    return this._client.post('/v1/operations/departments', { query: { include }, body, ...options });
  }

  /**
   * Partially updates a department.
   *
   * Only the fields provided in the request are changed. Assigning scanning stations
   * or machines is additive and does not remove existing ones. Returns a conflict
   * error if the new name is already in use by another department.
   *
   * This endpoint requires the permission: `departments:update`.
   *
   * @example
   * ```ts
   * const department =
   *   await client.operations.departments.update(
   *     'dp_m0jayebxnkos',
   *     { name: 'Production' },
   *   );
   * ```
   */
  update(
    id: string,
    params: DepartmentUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BlocksAPI.Department> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/operations/departments/${id}`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Deletes a department.
   *
   * Scanning stations and machines assigned to the department are not deleted, but
   * they keep pointing at it, and a machine whose department is gone can no longer
   * be read, updated, or deleted through the machines endpoints. Reassign both to
   * another department before deleting this one. Deleting a department that was
   * already deleted returns an already-deleted error rather than a not-found error.
   *
   * This endpoint requires the permission: `departments:delete`.
   *
   * @example
   * ```ts
   * const department =
   *   await client.operations.departments.delete(
   *     'dp_m0jayebxnkos',
   *   );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<DepartmentDeleteResponse> {
    return this._client.delete(path`/v1/operations/departments/${id}`, options);
  }
}

/**
 * Request to create a department.
 */
export interface CreateDepartmentRequest {
  /**
   * Display name of the department.
   *
   * Must be unique within your account; maximum 255 characters.
   */
  name: string;

  /**
   * A rate, expressed as a value together with the units of its numerator and
   * denominator (for example, `25.00` `$` per `hr`).
   */
  labor_rate?: DepartmentRateInput;

  /**
   * ID of the location where this department operates.
   */
  location_id?: string;

  /**
   * IDs of machines to assign to this department.
   *
   * A machine belongs to one department at a time, so listed machines are moved out
   * of their current department.
   */
  machine_ids?: Array<string>;

  /**
   * Free-form notes about the department.
   */
  notes?: string;

  /**
   * IDs of scanning stations to assign to this department.
   *
   * A scanning station belongs to one department at a time, so listed stations are
   * moved out of their current department.
   */
  scanning_station_ids?: Array<string>;
}

/**
 * A rate, expressed as a value together with the units of its numerator and
 * denominator (for example, `25.00` `$` per `hr`).
 */
export interface DepartmentRateInput {
  /**
   * ID of the unit in the rate's denominator (e.g. hours).
   */
  denominator_unit_id: string;

  /**
   * ID of the unit in the rate's numerator (a currency, e.g. dollars).
   */
  numerator_unit_id: string;

  /**
   * Decimal value of the rate.
   */
  value: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListDepartment {
  /**
   * Resources in this page.
   */
  data: Array<BlocksAPI.Department>;

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
 * Request to partially update a department.
 */
export interface UpdateDepartmentRequest {
  /**
   * A rate, expressed as a value together with the units of its numerator and
   * denominator (for example, `25.00` `$` per `hr`).
   */
  labor_rate?: DepartmentRateInput;

  /**
   * ID of the location where this department operates.
   */
  location_id?: string;

  /**
   * IDs of machines to assign to this department.
   *
   * Assignment is additive: listed machines are moved into this department and
   * machines already in the department are unaffected.
   */
  machine_ids?: Array<string>;

  /**
   * Display name of the department.
   *
   * Must be unique within your account; maximum 255 characters.
   */
  name?: string;

  /**
   * Free-form notes about the department.
   *
   * Send `null` to clear.
   */
  notes?: string | null;

  /**
   * IDs of scanning stations to assign to this department.
   *
   * Assignment is additive: listed stations are moved into this department and
   * stations already in the department are unaffected.
   */
  scanning_station_ids?: Array<string>;
}

export interface DepartmentDeleteResponse {}

export interface DepartmentListParams {
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
  include?: Array<'location' | 'scanning_stations' | 'machines'>;

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

export interface DepartmentRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'location' | 'scanning_stations' | 'machines'>;
}

export interface DepartmentCreateParams {
  /**
   * Body param: Display name of the department.
   *
   * Must be unique within your account; maximum 255 characters.
   */
  name: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'location' | 'scanning_stations' | 'machines'>;

  /**
   * Body param: A rate, expressed as a value together with the units of its
   * numerator and denominator (for example, `25.00` `$` per `hr`).
   */
  labor_rate?: DepartmentRateInput;

  /**
   * Body param: ID of the location where this department operates.
   */
  location_id?: string;

  /**
   * Body param: IDs of machines to assign to this department.
   *
   * A machine belongs to one department at a time, so listed machines are moved out
   * of their current department.
   */
  machine_ids?: Array<string>;

  /**
   * Body param: Free-form notes about the department.
   */
  notes?: string;

  /**
   * Body param: IDs of scanning stations to assign to this department.
   *
   * A scanning station belongs to one department at a time, so listed stations are
   * moved out of their current department.
   */
  scanning_station_ids?: Array<string>;
}

export interface DepartmentUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'location' | 'scanning_stations' | 'machines'>;

  /**
   * Body param: A rate, expressed as a value together with the units of its
   * numerator and denominator (for example, `25.00` `$` per `hr`).
   */
  labor_rate?: DepartmentRateInput;

  /**
   * Body param: ID of the location where this department operates.
   */
  location_id?: string;

  /**
   * Body param: IDs of machines to assign to this department.
   *
   * Assignment is additive: listed machines are moved into this department and
   * machines already in the department are unaffected.
   */
  machine_ids?: Array<string>;

  /**
   * Body param: Display name of the department.
   *
   * Must be unique within your account; maximum 255 characters.
   */
  name?: string;

  /**
   * Body param: Free-form notes about the department.
   *
   * Send `null` to clear.
   */
  notes?: string | null;

  /**
   * Body param: IDs of scanning stations to assign to this department.
   *
   * Assignment is additive: listed stations are moved into this department and
   * stations already in the department are unaffected.
   */
  scanning_station_ids?: Array<string>;
}

export declare namespace Departments {
  export {
    type CreateDepartmentRequest as CreateDepartmentRequest,
    type DepartmentRateInput as DepartmentRateInput,
    type ListDepartment as ListDepartment,
    type UpdateDepartmentRequest as UpdateDepartmentRequest,
    type DepartmentDeleteResponse as DepartmentDeleteResponse,
    type DepartmentListParams as DepartmentListParams,
    type DepartmentRetrieveParams as DepartmentRetrieveParams,
    type DepartmentCreateParams as DepartmentCreateParams,
    type DepartmentUpdateParams as DepartmentUpdateParams,
  };
}
