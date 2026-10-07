// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as InventoryAPI from '../../../catalog/items/inventory';
import * as MaterialsAPI from '../../../catalog/materials/materials';
import * as SalesOrdersAPI from '../sales-orders';
import * as ActionsAPI from './actions';
import {
  ActionReorderParams,
  ActionReorderResponse,
  Actions,
  ReorderSalesOrderLinesRequest,
} from './actions';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

/**
 * List, view, create, update, and delete sales orders.
 */
export class Lines extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Adds a line item to a sales order.
   *
   * The new line is appended below the existing product lines, keeping the order's
   * freight and discount lines at the bottom. When the order has already been
   * issued, the line is added to its pick as outstanding work and the pick is
   * reopened if it had been finished.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const salesOrderLine =
   *   await client.sales.salesOrders.lines.create(
   *     'or_9lqo07quiwyb',
   *     {
   *       metadata: { foo: 'string' },
   *       product_id: 'pd_07oe0r7adh2w',
   *       product_sku: 'WIDGET-001',
   *       quantity: { value: '10', unit_id: 'un_82bd37dae5po' },
   *     },
   *   );
   * ```
   */
  create(
    id: string,
    params: LineCreateParams,
    options?: RequestOptions,
  ): APIPromise<SalesOrdersAPI.SalesOrderLine> {
    const { include, ...body } = params;
    return this._client.post(path`/v1/sales/sales-orders/${id}/lines`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Partially updates a sales order line item.
   *
   * Changing the quantity flows through to fulfillment: the order's pick is
   * reconciled against what is still outstanding — reopening it when the new
   * quantity leaves work to do, or dropping the surplus pick line and finishing it
   * when everything ordered is already packed. Shipment and invoice lines that still
   * carry the full previously ordered quantity follow the new value, while partial
   * ones keep the amount that actually moved.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const salesOrderLine =
   *   await client.sales.salesOrders.lines.update('example', {
   *     id: 'or_9lqo07quiwyb',
   *     quantity: { value: '20', unit_id: 'un_82bd37dae5po' },
   *     unit_price: {
   *       value: '30.00',
   *       numerator_unit_id: 'un_82bd37dae5po',
   *       denominator_unit_id: 'un_82bd37dae5po',
   *     },
   *   });
   * ```
   */
  update(
    lineID: string,
    params: LineUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SalesOrdersAPI.SalesOrderLine> {
    const { id, include, ...body } = params;
    return this._client.patch(path`/v1/sales/sales-orders/${id}/lines/${lineID}`, {
      query: { include },
      body,
      ...options,
    });
  }

  /**
   * Deletes a sales order line and its pick lines.
   *
   * A line cannot be removed once it has been packed onto a shipment, or once the
   * order is fulfilled, and removing one from an order that is already completed or
   * has a shipped shipment requires an admin. The remaining lines are renumbered so
   * the sequence stays contiguous, and if this was the last line left to pick, the
   * order's pick is deleted and the order falls back to `estimate` with its reserved
   * inventory released.
   *
   * Acting in a customer's account requires `customers:update`, and acting in a
   * supplier's account requires `suppliers:update`, instead of the permission this
   * endpoint requires in your own account.
   *
   * This endpoint requires the permission: `sales_orders:update`.
   *
   * @example
   * ```ts
   * const line = await client.sales.salesOrders.lines.delete(
   *   'example',
   *   { id: 'or_9lqo07quiwyb' },
   * );
   * ```
   */
  delete(lineID: string, params: LineDeleteParams, options?: RequestOptions): APIPromise<LineDeleteResponse> {
    const { id } = params;
    return this._client.delete(path`/v1/sales/sales-orders/${id}/lines/${lineID}`, options);
  }
}

/**
 * Request to create a line on a sales order.
 */
export interface CreateSalesOrderLineRequest {
  /**
   * Key-value pairs to store on the line for your own references, such as its ID in
   * another system.
   *
   * Up to 50 keys. Keys are up to 40 characters and cannot contain `[` or `]`;
   * values are strings up to 500 characters, and an empty string is stored as one. A
   * key sent as `null` is not stored.
   */
  metadata: { [key: string]: string };

  /**
   * ID of the product being ordered.
   */
  product_id: string;

  /**
   * The product SKU recorded on the line.
   */
  product_sku: string;

  /**
   * An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  quantity: InventoryAPI.QuantityInput;

  /**
   * The product description recorded on the line.
   */
  product_description?: string;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

/**
 * Request to update a sales order line.
 */
export interface UpdateSalesOrderLineRequest {
  /**
   * Key-value pairs to store on the line, merged into the ones it already has.
   *
   * Keys left out are kept, so `{}` changes nothing. Setting a key to `null` removes
   * it; an empty string is stored as a value. Sending `metadata: null` removes every
   * key. An object holds at most 50 keys. Keys are up to 40 characters and cannot
   * contain `[` or `]`; values are up to 500 characters.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Description recorded on the line.
   */
  product_description?: string | null;

  /**
   * SKU recorded on the line.
   */
  product_sku?: string;

  /**
   * An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  quantity?: InventoryAPI.QuantityInput;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_cost?: MaterialsAPI.RateInput;

  /**
   * A value expressed as a ratio of two units, supplied on create and update
   * requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

export interface LineDeleteResponse {}

export interface LineCreateParams {
  /**
   * Body param: Key-value pairs to store on the line for your own references, such
   * as its ID in another system.
   *
   * Up to 50 keys. Keys are up to 40 characters and cannot contain `[` or `]`;
   * values are strings up to 500 characters, and an empty string is stored as one. A
   * key sent as `null` is not stored.
   */
  metadata: { [key: string]: string };

  /**
   * Body param: ID of the product being ordered.
   */
  product_id: string;

  /**
   * Body param: The product SKU recorded on the line.
   */
  product_sku: string;

  /**
   * Body param: An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  quantity: InventoryAPI.QuantityInput;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'product' | 'quantity_ordered' | 'unit_price' | 'unit_cost' | 'totals'>;

  /**
   * Body param: The product description recorded on the line.
   */
  product_description?: string;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

export interface LineUpdateParams {
  /**
   * Path param: Sales order ID.
   */
  id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'product' | 'quantity_ordered' | 'unit_price' | 'unit_cost' | 'totals'>;

  /**
   * Body param: Key-value pairs to store on the line, merged into the ones it
   * already has.
   *
   * Keys left out are kept, so `{}` changes nothing. Setting a key to `null` removes
   * it; an empty string is stored as a value. Sending `metadata: null` removes every
   * key. An object holds at most 50 keys. Keys are up to 40 characters and cannot
   * contain `[` or `]`; values are up to 500 characters.
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Body param: Description recorded on the line.
   */
  product_description?: string | null;

  /**
   * Body param: SKU recorded on the line.
   */
  product_sku?: string;

  /**
   * Body param: An amount together with the unit it is expressed in.
   *
   * The unit may be a currency, so money amounts such as a credit limit are written
   * the same way as physical amounts like weights or counts.
   */
  quantity?: InventoryAPI.QuantityInput;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_cost?: MaterialsAPI.RateInput;

  /**
   * Body param: A value expressed as a ratio of two units, supplied on create and
   * update requests.
   *
   * A unit price, for example, has a currency as its numerator unit and the unit the
   * product is bought or sold by as its denominator.
   */
  unit_price?: MaterialsAPI.RateInput;
}

export interface LineDeleteParams {
  /**
   * Sales order ID.
   */
  id: string;
}

Lines.Actions = Actions;

export declare namespace Lines {
  export {
    type CreateSalesOrderLineRequest as CreateSalesOrderLineRequest,
    type UpdateSalesOrderLineRequest as UpdateSalesOrderLineRequest,
    type LineDeleteResponse as LineDeleteResponse,
    type LineCreateParams as LineCreateParams,
    type LineUpdateParams as LineUpdateParams,
    type LineDeleteParams as LineDeleteParams,
  };

  export {
    Actions as Actions,
    type ReorderSalesOrderLinesRequest as ReorderSalesOrderLinesRequest,
    type ActionReorderResponse as ActionReorderResponse,
    type ActionReorderParams as ActionReorderParams,
  };
}
