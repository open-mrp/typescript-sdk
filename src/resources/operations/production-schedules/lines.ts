// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Generate and review machine-level production schedules.
 */
export class Lines extends APIResource {
  /**
   * Returns the planned campaigns for a schedule version, in the order they run.
   *
   * This endpoint requires the permission: `production_schedules:read`.
   *
   * @example
   * ```ts
   * const listProductionScheduleLine =
   *   await client.operations.productionSchedules.lines.list(
   *     'pnsc_m4zt3z8g8src',
   *   );
   * ```
   */
  list(
    id: string,
    query: LineListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListProductionScheduleLine> {
    return this._client.get(path`/v1/operations/production-schedules/${id}/lines`, { query, ...options });
  }

  /**
   * Adds a campaign to a schedule by hand.
   *
   * The line is recorded as manual, so a later regenerate can tell it apart from
   * what the solver produced, and the change is written to the deviation log. Adding
   * into a frozen week requires a `reason`.
   *
   * Only a draft or a published version can be edited; a superseded or archived
   * version is history. The campaign is appended to the end of its week's run order.
   *
   * This endpoint requires the permission: `production_schedules:update`.
   *
   * @example
   * ```ts
   * const productionScheduleLine =
   *   await client.operations.productionSchedules.lines.create(
   *     'pnsc_m4zt3z8g8src',
   *     {
   *       item_id: 'it_pej07ckhvu62',
   *       machine_id: 'mc_ffcfk9dxixis',
   *       quantity: 600,
   *       week_index: 2,
   *     },
   *   );
   * ```
   */
  create(id: string, body: LineCreateParams, options?: RequestOptions): APIPromise<ProductionScheduleLine> {
    return this._client.post(path`/v1/operations/production-schedules/${id}/lines`, { body, ...options });
  }

  /**
   * Edits a campaign on a schedule.
   *
   * Every change is written to the deviation log with a full before-and-after
   * snapshot, and the line becomes manual so a regenerate can tell it apart from
   * solver output. A change that touches a frozen week — including moving a campaign
   * out of one — requires a `reason`.
   *
   * Only a draft or a published version can be edited; a superseded or archived
   * version is history. An edit that changes several things at once is logged under
   * the single most significant one, in the order machine, week, quantity, position
   * — that being the change a planner has to react to first.
   *
   * This endpoint requires the permission: `production_schedules:update`.
   *
   * @example
   * ```ts
   * const productionScheduleLine =
   *   await client.operations.productionSchedules.lines.update(
   *     'orln_la01fxgrwcnr',
   *     { id: 'pnsc_m4zt3z8g8src', quantity: 900 },
   *   );
   * ```
   */
  update(
    lineID: string,
    params: LineUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ProductionScheduleLine> {
    const { id, ...body } = params;
    return this._client.patch(path`/v1/operations/production-schedules/${id}/lines/${lineID}`, {
      body,
      ...options,
    });
  }

  /**
   * Removes a campaign from a schedule.
   *
   * The deviation log keeps a full snapshot of the removed line, so the change stays
   * readable after the line itself is gone. Removing from a frozen week requires a
   * `reason`.
   *
   * Only a draft or a published version can be edited; a superseded or archived
   * version is history. Removing a campaign whose week has already been released
   * does not remove the batches it created; those live on the production run and
   * have to be dealt with there.
   *
   * This endpoint requires the permission: `production_schedules:update`.
   *
   * @example
   * ```ts
   * const line =
   *   await client.operations.productionSchedules.lines.delete(
   *     'orln_la01fxgrwcnr',
   *     { id: 'pnsc_m4zt3z8g8src' },
   *   );
   * ```
   */
  delete(lineID: string, params: LineDeleteParams, options?: RequestOptions): APIPromise<LineDeleteResponse> {
    const { id, reason, reason_note } = params;
    return this._client.delete(path`/v1/operations/production-schedules/${id}/lines/${lineID}`, {
      query: { reason, reason_note },
      ...options,
    });
  }
}

/**
 * Request to add a campaign to a schedule by hand.
 */
export interface CreateProductionScheduleLineRequest {
  /**
   * ID of the item to build.
   */
  item_id: string;

  /**
   * ID of the machine that will run the campaign.
   *
   * The machine's production step and department are copied onto the campaign, which
   * is what department-level attainment rolls it up by. The schedule's derived
   * department work is not re-exploded for a hand-added campaign; it is rebuilt the
   * next time the version is regenerated.
   */
  machine_id: string;

  /**
   * Units to build over the campaign.
   */
  quantity: number;

  /**
   * Horizon week to plan the campaign in, zero-based.
   *
   * Week 0 is the week the schedule's horizon starts in. The week must fall inside
   * the horizon this version was planned over.
   */
  week_index: number;

  /**
   * How many lots the quantity is built in.
   *
   * Left unset, it is derived from the quantity and the account's default lot size.
   * The lot size itself is taken from that account default and is not settable per
   * campaign, so this is a record of the lot count rather than what a release splits
   * batches by.
   */
  lots?: number;

  /**
   * Why the campaign was added.
   *
   * Required when the campaign lands inside a frozen week, since that is a
   * commitment being changed.
   */
  reason?:
    | 'machine_down'
    | 'material_shortage'
    | 'rush_order'
    | 'quality_hold'
    | 'over_run'
    | 'under_run'
    | 'capacity_change'
    | 'other';

  /**
   * Free-form explanation of the change.
   */
  reason_note?: string;

  /**
   * Machine hours the campaign will take.
   *
   * Left unset, it is estimated from the rate this version was solved with for this
   * item, so the week's utilization still reflects the added work. An item the
   * version holds no policy for estimates to zero.
   */
  run_hours?: number;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListProductionScheduleLine {
  /**
   * Resources in this page.
   */
  data: Array<ProductionScheduleLine>;

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
 * A saved campaign on a production schedule.
 */
export interface ProductionScheduleLine {
  /**
   * Line ID.
   */
  id: string;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  department: CoreAPI.Entity | null;

  /**
   * Whether the line is inside the frozen window, where changing it requires a
   * reason for the deviation log.
   */
  freeze_status: 'frozen' | 'flexible';

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  machine: CoreAPI.Entity | null;

  /**
   * Resource type identifier.
   */
  object: 'production_schedule_line';

  /**
   * Modeled changeover time before the campaign.
   */
  planned_changeover_minutes: number;

  /**
   * Units in one lot, which is the batch size the week is released to the floor in.
   */
  planned_lot_units: number;

  /**
   * Whole lots the quantity rounds to.
   */
  planned_lots: number;

  /**
   * Quantity to produce.
   */
  planned_quantity: number;

  /**
   * Constraint hours the campaign consumes.
   */
  planned_run_hours: number;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  planned_unit: CoreAPI.Entity | null;

  /**
   * Abbreviation of the unit every quantity on this line is counted in, for display.
   *
   * A campaign of 360 means 360 pairs or 360 eaches depending on this, so the two
   * are never meaningful apart.
   */
  planned_unit_abbreviation: string | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  production_run: CoreAPI.Entity | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  production_schedule: CoreAPI.Entity | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  production_step: CoreAPI.Entity | null;

  /**
   * Projected stock after the campaign lands and the week's demand is drawn down.
   */
  projected_on_hand_after: number;

  /**
   * Projected stock before the campaign lands.
   */
  projected_on_hand_before: number;

  /**
   * Why the campaign was placed or last changed by hand.
   *
   * Only hand changes record a reason, and a change that touches a frozen week has
   * to supply one.
   */
  reason:
    | 'machine_down'
    | 'material_shortage'
    | 'rush_order'
    | 'quality_hold'
    | 'over_run'
    | 'under_run'
    | 'capacity_change'
    | 'other'
    | null;

  /**
   * Batches this campaign issued to the floor when its week was released.
   */
  released_batch_count: number;

  /**
   * Batches of this campaign the floor has scanned.
   */
  scanned_batch_count: number;

  /**
   * Quantity scanned so far, in the planned unit.
   *
   * Measured from the run the week was released as, matched on this campaign's item,
   * so a run holding several SKUs credits each campaign with only its own work.
   */
  scanned_quantity: number;

  /**
   * Order the campaign runs within its week.
   */
  sequence_index: number;

  /**
   * Whether the solver or a person created the line.
   *
   * Editing a solver-placed campaign turns it `manual`, and a regenerate that
   * preserves hand work keeps exactly the campaigns marked that way.
   */
  source: 'solver' | 'manual';

  /**
   * Where the line is in its lifecycle.
   *
   * A campaign becomes `released` when its week is issued to the floor as a
   * production run, and goes back to `planned` if that run is deleted.
   */
  status: 'planned' | 'released' | 'in_progress' | 'complete' | 'cancelled';

  /**
   * Last updated timestamp.
   */
  updated_at: string;

  /**
   * Zero-based week offset from the start of the horizon.
   */
  week_index: number;

  /**
   * First instant of the week this campaign runs in.
   */
  week_starts_at: string;
}

/**
 * Request to edit a campaign on a schedule.
 */
export interface UpdateProductionScheduleLineRequest {
  /**
   * How many lots the quantity is built in.
   *
   * What a release actually splits batches by is the lot size the campaign was
   * planned at, which this does not change.
   */
  lots?: number;

  /**
   * ID of the machine to move the campaign to.
   */
  machine_id?: string;

  /**
   * Units to build over the campaign.
   *
   * Changing this re-derives `lots` and `run_hours` from the rate and lot size this
   * version was solved with, so the campaign never keeps claiming its old share of
   * machine time; send either alongside it to override what is derived. A campaign
   * builds something by definition, so use delete rather than a quantity of zero to
   * take it off the plan.
   */
  quantity?: number;

  /**
   * Why the campaign changed.
   *
   * Required when the change touches a frozen week, including moving a campaign out
   * of one.
   */
  reason?:
    | 'machine_down'
    | 'material_shortage'
    | 'rush_order'
    | 'quality_hold'
    | 'over_run'
    | 'under_run'
    | 'capacity_change'
    | 'other'
    | null;

  /**
   * Free-form explanation of the change.
   */
  reason_note?: string;

  /**
   * Machine hours the campaign will take.
   */
  run_hours?: number;

  /**
   * Position within the week's run order, lowest first.
   */
  sequence_index?: number;

  /**
   * Progress of the campaign.
   *
   * Setting `released` here only labels the campaign; it does not create a
   * production run or any batches — releasing a week to the floor is its own action.
   * Setting `cancelled` leaves the campaign on the plan but excludes it from any
   * later release of its week.
   */
  status?: 'planned' | 'released' | 'in_progress' | 'complete' | 'cancelled';

  /**
   * Horizon week to move the campaign to, zero-based.
   *
   * Must fall inside the horizon this version was planned over.
   */
  week_index?: number;
}

export interface LineDeleteResponse {}

export interface LineListParams {
  /**
   * Only return campaigns on these machines.
   */
  machine_ids?: Array<string>;

  /**
   * Only return campaigns in this horizon week, zero-based.
   */
  week_index?: number;
}

export interface LineCreateParams {
  /**
   * ID of the item to build.
   */
  item_id: string;

  /**
   * ID of the machine that will run the campaign.
   *
   * The machine's production step and department are copied onto the campaign, which
   * is what department-level attainment rolls it up by. The schedule's derived
   * department work is not re-exploded for a hand-added campaign; it is rebuilt the
   * next time the version is regenerated.
   */
  machine_id: string;

  /**
   * Units to build over the campaign.
   */
  quantity: number;

  /**
   * Horizon week to plan the campaign in, zero-based.
   *
   * Week 0 is the week the schedule's horizon starts in. The week must fall inside
   * the horizon this version was planned over.
   */
  week_index: number;

  /**
   * How many lots the quantity is built in.
   *
   * Left unset, it is derived from the quantity and the account's default lot size.
   * The lot size itself is taken from that account default and is not settable per
   * campaign, so this is a record of the lot count rather than what a release splits
   * batches by.
   */
  lots?: number;

  /**
   * Why the campaign was added.
   *
   * Required when the campaign lands inside a frozen week, since that is a
   * commitment being changed.
   */
  reason?:
    | 'machine_down'
    | 'material_shortage'
    | 'rush_order'
    | 'quality_hold'
    | 'over_run'
    | 'under_run'
    | 'capacity_change'
    | 'other';

  /**
   * Free-form explanation of the change.
   */
  reason_note?: string;

  /**
   * Machine hours the campaign will take.
   *
   * Left unset, it is estimated from the rate this version was solved with for this
   * item, so the week's utilization still reflects the added work. An item the
   * version holds no policy for estimates to zero.
   */
  run_hours?: number;
}

export interface LineUpdateParams {
  /**
   * Path param: ID of the production schedule.
   */
  id: string;

  /**
   * Body param: How many lots the quantity is built in.
   *
   * What a release actually splits batches by is the lot size the campaign was
   * planned at, which this does not change.
   */
  lots?: number;

  /**
   * Body param: ID of the machine to move the campaign to.
   */
  machine_id?: string;

  /**
   * Body param: Units to build over the campaign.
   *
   * Changing this re-derives `lots` and `run_hours` from the rate and lot size this
   * version was solved with, so the campaign never keeps claiming its old share of
   * machine time; send either alongside it to override what is derived. A campaign
   * builds something by definition, so use delete rather than a quantity of zero to
   * take it off the plan.
   */
  quantity?: number;

  /**
   * Body param: Why the campaign changed.
   *
   * Required when the change touches a frozen week, including moving a campaign out
   * of one.
   */
  reason?:
    | 'machine_down'
    | 'material_shortage'
    | 'rush_order'
    | 'quality_hold'
    | 'over_run'
    | 'under_run'
    | 'capacity_change'
    | 'other'
    | null;

  /**
   * Body param: Free-form explanation of the change.
   */
  reason_note?: string;

  /**
   * Body param: Machine hours the campaign will take.
   */
  run_hours?: number;

  /**
   * Body param: Position within the week's run order, lowest first.
   */
  sequence_index?: number;

  /**
   * Body param: Progress of the campaign.
   *
   * Setting `released` here only labels the campaign; it does not create a
   * production run or any batches — releasing a week to the floor is its own action.
   * Setting `cancelled` leaves the campaign on the plan but excludes it from any
   * later release of its week.
   */
  status?: 'planned' | 'released' | 'in_progress' | 'complete' | 'cancelled';

  /**
   * Body param: Horizon week to move the campaign to, zero-based.
   *
   * Must fall inside the horizon this version was planned over.
   */
  week_index?: number;
}

export interface LineDeleteParams {
  /**
   * Path param: ID of the production schedule.
   */
  id: string;

  /**
   * Query param: Why the campaign was removed.
   *
   * Required when the campaign sits in a frozen week, since that is a commitment
   * being broken.
   */
  reason?:
    | 'machine_down'
    | 'material_shortage'
    | 'rush_order'
    | 'quality_hold'
    | 'over_run'
    | 'under_run'
    | 'capacity_change'
    | 'other';

  /**
   * Query param: Free-form explanation of the change.
   */
  reason_note?: string;
}

export declare namespace Lines {
  export {
    type CreateProductionScheduleLineRequest as CreateProductionScheduleLineRequest,
    type ListProductionScheduleLine as ListProductionScheduleLine,
    type ProductionScheduleLine as ProductionScheduleLine,
    type UpdateProductionScheduleLineRequest as UpdateProductionScheduleLineRequest,
    type LineDeleteResponse as LineDeleteResponse,
    type LineListParams as LineListParams,
    type LineCreateParams as LineCreateParams,
    type LineUpdateParams as LineUpdateParams,
    type LineDeleteParams as LineDeleteParams,
  };
}
