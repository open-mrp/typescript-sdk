// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import * as ProductionSchedulesAPI from './production-schedules';
import * as SalesOrdersActionsAPI from '../../sales/sales-orders/actions';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Generate and review machine-level production schedules.
 */
export class Actions extends APIResource {
  /**
   * Runs the production scheduling solver and returns the plan without saving it.
   *
   * This is the inspection surface for the scheduler: it takes the same path a
   * generated schedule will take, minus the write, so a plan can be reviewed and
   * compared before anything depends on it. No version is created and nothing is
   * numbered, so this can be called as often as needed.
   *
   * The solver plans the constraint department — the room that sets the pace of the
   * factory — so production schedule settings must name one and it must have
   * machines that are included in planning. Without that there is nothing to
   * schedule and the request is rejected rather than returning an empty plan.
   *
   * This endpoint requires the permission: `production_schedules:read`.
   *
   * @example
   * ```ts
   * const productionSchedulePreview =
   *   await client.operations.productionSchedules.actions.preview(
   *     { horizon_weeks: 13 },
   *   );
   * ```
   */
  preview(
    body: ActionPreviewParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductionSchedulePreview> {
    return this._client.put('/v1/operations/production-schedules/actions/preview', { body, ...options });
  }

  /**
   * Returns what regenerating this draft would change, without changing it.
   *
   * Every campaign either plan holds is listed, including the ones both agree on, so
   * the caller can render a full side-by-side rather than a list of surprises. Only
   * a draft can be previewed, for the same reason only a draft can be regenerated.
   *
   * The comparison is run the way a regenerate runs by default — hand-edited
   * campaigns are kept, and the fresh solve plans around them — so they read as
   * unchanged rather than as work the solver wants to take away. `manual_line_count`
   * is how many campaigns on the draft were placed or edited by hand, which is the
   * work a `replace_all` regenerate is putting at risk.
   *
   * The horizon and demand basis default to the ones this version already has, so a
   * plain call changes only how current the plan is, not what question is being
   * asked.
   *
   * This endpoint requires the permission: `production_schedules:read`.
   *
   * @example
   * ```ts
   * const productionScheduleRegeneratePreview =
   *   await client.operations.productionSchedules.actions.previewRegenerate(
   *     'pnsc_m4zt3z8g8src',
   *     { horizon_weeks: 13 },
   *   );
   * ```
   */
  previewRegenerate(
    id: string,
    body: ActionPreviewRegenerateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductionScheduleRegeneratePreview> {
    return this._client.put(path`/v1/operations/production-schedules/${id}/actions/preview-regenerate`, {
      body,
      ...options,
    });
  }

  /**
   * Re-solves a draft in place, keeping its version number.
   *
   * Only a draft can be regenerated. A published version is a commitment the floor
   * is already working to, and a superseded or archived one is history; re-solving
   * either in place would change what a week was measured against after the fact. To
   * replan against a published version, generate a new one — publishing it
   * supersedes the current one.
   *
   * The version number is kept deliberately: minting a new version for every
   * re-solve would fill the list with drafts nobody asked for and make the version
   * number meaningless as a count of the plans actually considered.
   *
   * Every hand edit a `replace_all` destroys is written to the deviation log before
   * it goes, so "where did my change go" stays answerable. Call `preview-regenerate`
   * first to see what a re-solve would change.
   *
   * Aside from the hand edits a `preserve_manual` run keeps, the version's
   * campaigns, policy snapshot, derived department work, solver diagnostics and
   * settings snapshot are all replaced with the fresh solve's, so the plan can still
   * explain itself afterwards.
   *
   * This endpoint requires the permission: `production_schedules:update`.
   *
   * @example
   * ```ts
   * const productionSchedule =
   *   await client.operations.productionSchedules.actions.regenerate(
   *     'pnsc_m4zt3z8g8src',
   *     { merge_mode: 'preserve_manual' },
   *   );
   * ```
   */
  regenerate(
    id: string,
    body: ActionRegenerateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProductionSchedulesAPI.ProductionSchedule> {
    return this._client.put(path`/v1/operations/production-schedules/${id}/actions/regenerate`, {
      body,
      ...options,
    });
  }

  /**
   * Publishes a draft schedule, freezing its first weeks.
   *
   * Publishing is what makes a plan a commitment: the frozen weeks' lines are marked
   * frozen, the frozen line count and quantity are captured onto the version, and
   * any published version whose horizon overlaps this one's is superseded rather
   * than rewritten. After this, a change inside the frozen window has to state a
   * reason.
   *
   * Only a draft can be published. How many weeks freeze comes from the account's
   * frozen-weeks setting as it stood when the version was generated, and a version
   * generated with zero frozen weeks publishes without committing to anything.
   *
   * The frozen counts are snapshotted here and never recomputed, so adherence keeps
   * the denominator it was committed to.
   *
   * This endpoint requires the permission: `production_schedules:update`.
   *
   * @example
   * ```ts
   * const productionSchedule =
   *   await client.operations.productionSchedules.actions.publish(
   *     'pnsc_m4zt3z8g8src',
   *   );
   * ```
   */
  publish(id: string, options?: RequestOptions): APIPromise<ProductionSchedulesAPI.ProductionSchedule> {
    return this._client.put(path`/v1/operations/production-schedules/${id}/actions/publish`, options);
  }

  /**
   * Turns one planned week into a production run.
   *
   * Each campaign in the week becomes one batch per planned lot, using the lot size
   * the campaign was planned at. A 360-unit campaign at a 60-unit lot arrives on the
   * floor as six batches, not one instruction to make 360; a quantity that is not a
   * whole number of lots trails a single short lot at the end of the run.
   *
   * The release is atomic. A run holding half a week's batches is worse than no run,
   * because the missing half looks like work nobody was asked to do and attainment
   * would count it as unplanned production.
   *
   * Releasing the same week twice fails rather than creating a second run. Each
   * released line records the run now carrying it, and a line that is already
   * released is never re-pointed.
   *
   * Lots an earlier week already issued are carried forward rather than reissued.
   * When a week fell short, the next plan asks for the shortfall — and the batches
   * covering it are usually already printed and sitting on the floor. Those tickets
   * are moved into this run and counted against the campaign, so only the genuinely
   * new work is created. `carried_forward_batch_count` says how many arrived that
   * way, and each one names the run it came off. Send `skip_carry_forward` to issue
   * the whole week new instead.
   *
   * Cancelled campaigns and campaigns planned at zero are left behind rather than
   * released. A week that would produce an implausible number of batches is rejected
   * outright, since that is far more likely to be a misconfigured lot size than a
   * real week's work.
   *
   * This endpoint requires the permission: `production_schedules:update`.
   *
   * @example
   * ```ts
   * const releaseScheduleWeekResult =
   *   await client.operations.productionSchedules.actions.releaseWeek(
   *     'pnsc_m4zt3z8g8src',
   *     {
   *       responsible_user_id: 'us_43irtlt2ajz6',
   *       week_index: 0,
   *     },
   *   );
   * ```
   */
  releaseWeek(
    id: string,
    body: ActionReleaseWeekParams,
    options?: RequestOptions,
  ): APIPromise<ReleaseScheduleWeekResult> {
    return this._client.post(path`/v1/operations/production-schedules/${id}/actions/release-week`, {
      body,
      ...options,
    });
  }

  /**
   * Archives a schedule version, retiring it without discarding its history.
   *
   * Any version that is not already archived can be archived, including a draft that
   * was never published. The version stays readable — its campaigns, policy snapshot
   * and deviation log are kept — and it still backs any attainment already measured
   * against it.
   *
   * Archiving does not supersede anything or promote another version in its place.
   * To take a published version out of use by replacing it, generate and publish a
   * newer one instead.
   *
   * This endpoint requires the permission: `production_schedules:update`.
   *
   * @example
   * ```ts
   * const productionSchedule =
   *   await client.operations.productionSchedules.actions.archive(
   *     'pnsc_m4zt3z8g8src',
   *   );
   * ```
   */
  archive(id: string, options?: RequestOptions): APIPromise<ProductionSchedulesAPI.ProductionSchedule> {
    return this._client.put(path`/v1/operations/production-schedules/${id}/actions/archive`, options);
  }
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListScheduleCampaign {
  /**
   * Resources in this page.
   */
  data: Array<ScheduleCampaign>;

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
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListScheduleDiffLine {
  /**
   * Resources in this page.
   */
  data: Array<ScheduleDiffLine>;

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
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListSchedulePolicy {
  /**
   * Resources in this page.
   */
  data: Array<SchedulePolicy>;

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
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListScheduleProjection {
  /**
   * Resources in this page.
   */
  data: Array<ScheduleProjection>;

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
 * Request to preview a production schedule.
 */
export interface PreviewProductionScheduleRequest {
  /**
   * How future demand is derived, overriding the account's configured basis for this
   * preview only.
   *
   * - `trailing_12`: demand is the trailing twelve months of orders.
   * - `seasonal_ema`: demand is a seasonal exponential moving average, which follows
   *   a season arriving early or late rather than flattening it.
   */
  demand_basis?: 'trailing_12' | 'seasonal_ema';

  /**
   * Number of weeks the plan should cover, overriding the account's configured
   * horizon for this preview only.
   */
  horizon_weeks?: number;

  /**
   * The instant to plan against, which is what stock, demand history and active
   * demand overrides are read as of.
   *
   * Left unset, the preview is solved against the moment the request arrives. The
   * horizon starts on the account's configured week-start day on or before this
   * instant, so backdating this shifts the whole week grid.
   */
  planning_as_of?: string;
}

/**
 * Request to see what a re-solve would change.
 */
export interface PreviewRegenerateProductionScheduleRequest {
  /**
   * How future demand is derived, defaulting to the basis this version was solved
   * with.
   *
   * - `trailing_12`: demand is the trailing twelve months of orders.
   * - `seasonal_ema`: demand is a seasonal exponential moving average, which follows
   *   a season arriving early or late rather than flattening it.
   */
  demand_basis?: 'trailing_12' | 'seasonal_ema';

  /**
   * Number of weeks the re-solve should cover, defaulting to the horizon this
   * version already has.
   */
  horizon_weeks?: number;

  /**
   * The instant to plan against, which is what stock, demand history and active
   * demand overrides are read as of.
   *
   * Defaults to now rather than to the instant the version was first generated, so a
   * plain call answers "what would the solver say today". Because the horizon
   * re-anchors to the week containing this instant, a campaign can appear under a
   * different `week_index` than the one stored on the draft.
   */
  planning_as_of?: string;
}

/**
 * A production plan produced by the scheduling solver.
 */
export interface ProductionSchedulePreview {
  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  campaigns: ListScheduleCampaign | null;

  /**
   * What the solver could not do, and why the plan differs from raw history.
   */
  diagnostics: ProductionSchedulesAPI.ScheduleDiagnostics;

  /**
   * Resource type identifier.
   */
  object: 'production_schedule_preview';

  /**
   * The instant the plan was calculated against.
   */
  planning_as_of_at: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  policies: ListSchedulePolicy | null;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  projections: ListScheduleProjection | null;

  /**
   * Version of the solver that produced this plan.
   */
  solver_version: string;
}

/**
 * What a regenerate would change about a draft, without changing it.
 *
 * A regenerate that silently discards hand-work is abandoned within two cycles, so
 * the destructive mode states its cost as a number before it runs:
 * `discarded_manual_count` is exactly how many hand-edited campaigns `replace_all`
 * would destroy.
 */
export interface ProductionScheduleRegeneratePreview {
  /**
   * Campaigns the fresh solve wants that the current plan does not have.
   */
  added_count: number;

  /**
   * Campaigns both hold, in different quantities.
   */
  changed_count: number;

  /**
   * Hand-edited campaigns `replace_all` would destroy.
   */
  discarded_manual_count: number;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  lines: ListScheduleDiffLine | null;

  /**
   * Hand-edited campaigns currently on the draft.
   */
  manual_line_count: number;

  /**
   * Resource type identifier.
   */
  object: 'production_schedule_regenerate_preview';

  /**
   * The instant the fresh solve planned from.
   *
   * Unless the caller names an instant, a regenerate plans from now rather than
   * replaying the one the draft was first generated against, so demand overrides
   * added since then are taken into account and the horizon re-anchors to today.
   */
  planning_as_of_at: string;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  production_schedule: CoreAPI.Entity | null;

  /**
   * Campaigns the current plan has that the fresh solve does not want.
   */
  removed_count: number;

  /**
   * Which solver produced the proposal.
   */
  solver_version: string;
}

/**
 * Request to re-solve a draft in place.
 */
export interface RegenerateProductionScheduleRequest {
  /**
   * How future demand is derived, defaulting to the basis this version was solved
   * with.
   *
   * - `trailing_12`: demand is the trailing twelve months of orders.
   * - `seasonal_ema`: demand is a seasonal exponential moving average, which follows
   *   a season arriving early or late rather than flattening it.
   */
  demand_basis?: 'trailing_12' | 'seasonal_ema';

  /**
   * Number of weeks the re-solve should cover, defaulting to the horizon this
   * version already has.
   */
  horizon_weeks?: number;

  /**
   * What happens to the campaigns someone placed or edited by hand.
   *
   * - `preserve_manual`: hand-edited campaigns are kept, and the fresh solve plans
   *   around them — their stock and machine time are facts the rest of the plan
   *   responds to.
   * - `replace_all`: hand edits are discarded and the fresh solve is taken whole.
   *
   * Omitting this keeps hand edits, because the alternative destroys work silently.
   */
  merge_mode?: 'preserve_manual' | 'replace_all';

  /**
   * The instant to plan against, which is what stock, demand history and active
   * demand overrides are read as of.
   *
   * Defaults to now rather than to the instant the version was first generated, so a
   * plain call answers "what would the solver say today". Because the horizon
   * re-anchors to the week containing this instant, a kept campaign keeps the
   * calendar week it was planned in but can end up under a different `week_index`.
   */
  planning_as_of?: string;
}

/**
 * Request to release one week of a production schedule to the floor.
 */
export interface ReleaseProductionScheduleWeekRequest {
  /**
   * ID of the account user accountable for executing the run.
   *
   * Accepts either an account user ID or a user ID; it is resolved and stored as the
   * account user.
   */
  responsible_user_id: string;

  /**
   * Zero-based week offset from the start of the horizon.
   */
  week_index: number;

  /**
   * ID of the scanning station the batches will be scanned at.
   *
   * Applied to every batch this release creates, across all machines in the week.
   */
  scanning_station_id?: string;

  /**
   * Issue the whole week as new batches, leaving an earlier week's unworked lots
   * where they are.
   *
   * Off unless you ask for it: reprinting a ticket the floor is already holding is
   * exactly what carrying work forward exists to prevent, so it takes a deliberate
   * choice to do it.
   */
  skip_carry_forward?: boolean;
}

/**
 * The production run created from one week of a schedule.
 *
 * Each planned campaign becomes one batch per lot, so a 360-unit week at a 60-unit
 * lot arrives on the floor as six batches rather than one instruction to make 360.
 */
export interface ReleaseScheduleWeekResult {
  /**
   * How many batches the run holds across all campaigns, created and carried forward
   * together.
   */
  batch_count: number;

  /**
   * How many of `batch_count` were moved off an earlier run rather than created.
   *
   * Tickets for these are already printed and on the floor.
   */
  carried_forward_batch_count: number;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  lines: ProductionSchedulesAPI.ListReleasedScheduleLine | null;

  /**
   * Resource type identifier.
   */
  object: 'production_schedule_week_release';

  /**
   * A production run: the group of shop-floor batches that are executed together,
   * tracked from the first batch scan through to completion.
   */
  production_run: SalesOrdersActionsAPI.ProductionRun | null;

  /**
   * How many campaigns were released.
   */
  released_line_count: number;

  /**
   * Total units released.
   */
  total_quantity: number;

  /**
   * Zero-based week offset from the start of the horizon.
   */
  week_index: number;

  /**
   * First instant of the released week.
   */
  week_starts_at: string;
}

/**
 * One planned production block: make this item, on this machine, in this week.
 */
export interface ScheduleCampaign {
  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * Whole lots the quantity rounds to.
   */
  lots: number;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  machine: CoreAPI.Entity | null;

  /**
   * Constraint hours the campaign consumes.
   */
  run_hours: number;

  /**
   * SKU of the item.
   */
  sku: string;

  /**
   * Quantity to produce.
   */
  units: number;

  /**
   * Zero-based week offset from the start of the horizon.
   */
  week_index: number;
}

/**
 * One campaign as the current plan and a fresh solve each see it.
 */
export interface ScheduleDiffLine {
  /**
   * What the regenerate would do to this campaign.
   *
   * - `added`: the fresh solve wants a campaign the current plan does not have.
   * - `removed`: the current plan holds a campaign the fresh solve does not want.
   * - `changed`: both hold the campaign, in different quantities.
   * - `unchanged`: both agree on it.
   */
  change: 'added' | 'removed' | 'changed' | 'unchanged';

  /**
   * Whether the current campaign was created or edited by a person.
   */
  current_is_manual: boolean;

  /**
   * Units the current plan asks for.
   *
   * Zero when the campaign is being added.
   */
  current_quantity: number;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  machine: CoreAPI.Entity | null;

  /**
   * Units the fresh solve asks for.
   *
   * Zero when the campaign is being removed.
   */
  proposed_quantity: number;

  /**
   * SKU of that item.
   */
  sku: string;

  /**
   * Zero-based horizon week.
   */
  week_index: number;
}

/**
 * The inventory policy computed for one item.
 */
export interface SchedulePolicy {
  /**
   * ABC class by share of constraint run hours.
   *
   * - `a`: consumes the largest share of constraint capacity.
   * - `b`: moderate constraint consumption.
   * - `c`: consumes little constraint capacity.
   */
  abc_class: 'a' | 'b' | 'c' | null;

  /**
   * Demand used for planning, annualized.
   */
  annual_demand: number;

  /**
   * Constraint hours this item's annual demand consumes.
   */
  annual_run_hours: number;

  /**
   * What the constraint stage holds on average: its buffer plus half a campaign.
   */
  average_greige_inventory: number;

  /**
   * Observed or default lead time at the constraint.
   */
  constraint_lead_time_weeks: number;

  /**
   * Economic order quantity: the campaign size that balances the cost of a
   * changeover against the cost of holding what it produces.
   */
  eoq_units: number;

  /**
   * Lead time from the constraint to sellable stock.
   */
  finish_lead_time_weeks: number;

  /**
   * Outstanding quantity the order book already owed for this item over the horizon.
   */
  firm_demand_units: number;

  /**
   * Quantity the forecast projected for the same window.
   */
  forecast_demand_units: number;

  /**
   * How this item was planned.
   *
   * - `make_to_stock`: built to the forecast, holding a safety stock against its
   *   variability.
   * - `make_to_order`: built only against orders already on the book, holding no
   *   buffer, so its safety stocks and reorder point are all zero.
   */
  fulfillment_policy: 'make_to_stock' | 'make_to_order';

  /**
   * Annual cost of holding one unit.
   *
   * Null unless the caller holds `costs:read`; customer and supplier portal users
   * never see it.
   */
  holding_cost: number | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * What the constraint stage holds at its peak: its buffer plus a whole campaign.
   */
  max_greige_inventory: number;

  /**
   * Stock on hand at the constraint plus everything downstream of it.
   */
  on_hand_echelon: number;

  /**
   * Stock sitting at the constraint stage on its own.
   */
  on_hand_greige: number;

  /**
   * Ceiling on how far ahead this item is built.
   */
  order_up_to: number;

  /**
   * Which rule decided that policy: the item itself, its product line, or the
   * account default.
   */
  policy_source: 'item' | 'product_line' | 'account_default';

  /**
   * Stock position at which a campaign is triggered.
   */
  reorder_point: number;

  /**
   * Buffer held as finished goods.
   */
  safety_stock_downstream: number;

  /**
   * Buffer held at the constraint, pooled across the finished goods it feeds.
   */
  safety_stock_primary: number;

  /**
   * How long one unit occupies the constraint.
   */
  seconds_per_unit: number;

  /**
   * Cost of one changeover, used as the setup cost in the lot-size calculation.
   *
   * Null unless the caller holds `costs:read`; customer and supplier portal users
   * never see it.
   */
  setup_cost: number | null;

  /**
   * SKU of the item.
   */
  sku: string;

  /**
   * Standard cost per unit.
   *
   * Null unless the caller holds `costs:read`; customer and supplier portal users
   * never see it.
   */
  unit_cost: number | null;

  /**
   * Demand used for planning, per week.
   */
  weekly_demand: number;

  /**
   * Weeks of demand the current stock covers.
   */
  weeks_of_cover: number;
}

/**
 * An item's projected stock position across the horizon.
 */
export interface ScheduleProjection {
  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  item: CoreAPI.Entity | null;

  /**
   * Projected stock at the end of each week of the horizon.
   */
  on_hand_by_week: Array<number>;
}

export interface ActionPreviewParams {
  /**
   * How future demand is derived, overriding the account's configured basis for this
   * preview only.
   *
   * - `trailing_12`: demand is the trailing twelve months of orders.
   * - `seasonal_ema`: demand is a seasonal exponential moving average, which follows
   *   a season arriving early or late rather than flattening it.
   */
  demand_basis?: 'trailing_12' | 'seasonal_ema';

  /**
   * Number of weeks the plan should cover, overriding the account's configured
   * horizon for this preview only.
   */
  horizon_weeks?: number;

  /**
   * The instant to plan against, which is what stock, demand history and active
   * demand overrides are read as of.
   *
   * Left unset, the preview is solved against the moment the request arrives. The
   * horizon starts on the account's configured week-start day on or before this
   * instant, so backdating this shifts the whole week grid.
   */
  planning_as_of?: string;
}

export interface ActionPreviewRegenerateParams {
  /**
   * How future demand is derived, defaulting to the basis this version was solved
   * with.
   *
   * - `trailing_12`: demand is the trailing twelve months of orders.
   * - `seasonal_ema`: demand is a seasonal exponential moving average, which follows
   *   a season arriving early or late rather than flattening it.
   */
  demand_basis?: 'trailing_12' | 'seasonal_ema';

  /**
   * Number of weeks the re-solve should cover, defaulting to the horizon this
   * version already has.
   */
  horizon_weeks?: number;

  /**
   * The instant to plan against, which is what stock, demand history and active
   * demand overrides are read as of.
   *
   * Defaults to now rather than to the instant the version was first generated, so a
   * plain call answers "what would the solver say today". Because the horizon
   * re-anchors to the week containing this instant, a campaign can appear under a
   * different `week_index` than the one stored on the draft.
   */
  planning_as_of?: string;
}

export interface ActionRegenerateParams {
  /**
   * How future demand is derived, defaulting to the basis this version was solved
   * with.
   *
   * - `trailing_12`: demand is the trailing twelve months of orders.
   * - `seasonal_ema`: demand is a seasonal exponential moving average, which follows
   *   a season arriving early or late rather than flattening it.
   */
  demand_basis?: 'trailing_12' | 'seasonal_ema';

  /**
   * Number of weeks the re-solve should cover, defaulting to the horizon this
   * version already has.
   */
  horizon_weeks?: number;

  /**
   * What happens to the campaigns someone placed or edited by hand.
   *
   * - `preserve_manual`: hand-edited campaigns are kept, and the fresh solve plans
   *   around them — their stock and machine time are facts the rest of the plan
   *   responds to.
   * - `replace_all`: hand edits are discarded and the fresh solve is taken whole.
   *
   * Omitting this keeps hand edits, because the alternative destroys work silently.
   */
  merge_mode?: 'preserve_manual' | 'replace_all';

  /**
   * The instant to plan against, which is what stock, demand history and active
   * demand overrides are read as of.
   *
   * Defaults to now rather than to the instant the version was first generated, so a
   * plain call answers "what would the solver say today". Because the horizon
   * re-anchors to the week containing this instant, a kept campaign keeps the
   * calendar week it was planned in but can end up under a different `week_index`.
   */
  planning_as_of?: string;
}

export interface ActionReleaseWeekParams {
  /**
   * ID of the account user accountable for executing the run.
   *
   * Accepts either an account user ID or a user ID; it is resolved and stored as the
   * account user.
   */
  responsible_user_id: string;

  /**
   * Zero-based week offset from the start of the horizon.
   */
  week_index: number;

  /**
   * ID of the scanning station the batches will be scanned at.
   *
   * Applied to every batch this release creates, across all machines in the week.
   */
  scanning_station_id?: string;

  /**
   * Issue the whole week as new batches, leaving an earlier week's unworked lots
   * where they are.
   *
   * Off unless you ask for it: reprinting a ticket the floor is already holding is
   * exactly what carrying work forward exists to prevent, so it takes a deliberate
   * choice to do it.
   */
  skip_carry_forward?: boolean;
}

export declare namespace Actions {
  export {
    type ListScheduleCampaign as ListScheduleCampaign,
    type ListScheduleDiffLine as ListScheduleDiffLine,
    type ListSchedulePolicy as ListSchedulePolicy,
    type ListScheduleProjection as ListScheduleProjection,
    type PreviewProductionScheduleRequest as PreviewProductionScheduleRequest,
    type PreviewRegenerateProductionScheduleRequest as PreviewRegenerateProductionScheduleRequest,
    type ProductionSchedulePreview as ProductionSchedulePreview,
    type ProductionScheduleRegeneratePreview as ProductionScheduleRegeneratePreview,
    type RegenerateProductionScheduleRequest as RegenerateProductionScheduleRequest,
    type ReleaseProductionScheduleWeekRequest as ReleaseProductionScheduleWeekRequest,
    type ReleaseScheduleWeekResult as ReleaseScheduleWeekResult,
    type ScheduleCampaign as ScheduleCampaign,
    type ScheduleDiffLine as ScheduleDiffLine,
    type SchedulePolicy as SchedulePolicy,
    type ScheduleProjection as ScheduleProjection,
    type ActionPreviewParams as ActionPreviewParams,
    type ActionPreviewRegenerateParams as ActionPreviewRegenerateParams,
    type ActionRegenerateParams as ActionRegenerateParams,
    type ActionReleaseWeekParams as ActionReleaseWeekParams,
  };
}
