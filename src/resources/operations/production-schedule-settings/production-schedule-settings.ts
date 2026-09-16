// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as CoreAPI from '../../core/core';
import * as ItemsAPI from './items';
import {
  ItemDeleteResponse,
  ItemUpdateParams,
  Items,
  ListProductionScheduleItemSetting,
  ProductionScheduleItemSetting,
  UpsertItemSettingRequest,
} from './items';
import * as ResourcesAPI from './resources';
import {
  ListProductionScheduleResourceSetting,
  ProductionScheduleResourceSetting,
  ResourceDeleteResponse,
  ResourceUpdateParams,
  Resources,
  UpsertResourceSettingRequest,
} from './resources';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

/**
 * The planning assumptions production schedules are solved against, and the per-resource overrides that mark which machines constrain the plan.
 */
export class ProductionScheduleSettings extends APIResource {
  resources: ResourcesAPI.Resources = new ResourcesAPI.Resources(this._client);
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  /**
   * Returns the planning assumptions production schedules are solved against.
   *
   * The whole set is always returned. An account that has never saved settings reads
   * back the values the solver would apply anyway, so a caller never has to know
   * which assumptions are in play; `settings_status` says whether the values were
   * saved on the account or are those defaults.
   *
   * Per-machine, per-department and per-step overrides of these assumptions are read
   * separately.
   *
   * This endpoint requires the permission: `production_schedules:read`.
   *
   * @example
   * ```ts
   * const productionScheduleSettings =
   *   await client.operations.productionScheduleSettings.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ProductionScheduleSettings> {
    return this._client.get('/v1/operations/production-schedule-settings', options);
  }

  /**
   * Replaces the planning assumptions production schedules are solved against.
   *
   * Settings are replaced wholesale rather than patched, because they are read as
   * one coherent set: a horizon that no longer matches the frozen window, or a
   * capacity headroom that no longer matches the shift pattern, would produce a plan
   * nobody intended. Send the full set on every call — a value the request leaves
   * out is never carried over from what was stored.
   *
   * The set is validated together, so a frozen window longer than the horizon, a
   * minimum changeover above the maximum, or an active cadence with no valid
   * schedule expression is rejected as a whole.
   *
   * Existing schedule versions are unaffected — each one records the assumptions it
   * was solved under, so changing settings changes future plans only.
   *
   * This endpoint requires the permission: `production_schedules:update`.
   *
   * @example
   * ```ts
   * const productionScheduleSettings =
   *   await client.operations.productionScheduleSettings.update({
   *     auto_publish_status: 'inactive',
   *     cadence_status: 'inactive',
   *     capacity_headroom_pct: 0.9,
   *     changeover_avg_minutes: 0,
   *     changeover_labor_rate: 0,
   *     changeover_max_minutes: 0,
   *     changeover_min_minutes: 0,
   *     default_constraint_lead_time_weeks: 0,
   *     default_customer_lead_time_days: 30,
   *     default_fulfillment_policy: 'make_to_stock',
   *     default_lot_units: 60,
   *     demand_basis: 'trailing_12',
   *     demand_window_months: 12,
   *     finish_lead_time_weeks: 0,
   *     forecast_history_months: 24,
   *     forecast_months: 12,
   *     forecast_z: 0,
   *     frozen_weeks: 1,
   *     generation_timezone: 'UTC',
   *     holding_rate_pct: 0,
   *     hours_per_shift: 7,
   *     max_flow_depth: 10,
   *     max_weeks_supply: 12,
   *     planning_horizon_weeks: 13,
   *     service_level_z: 0,
   *     shifts_per_day: 2,
   *     week_start_day: 1,
   *     weeks_per_year: 52,
   *     work_days_per_week: 5,
   *   });
   * ```
   */
  update(
    body: ProductionScheduleSettingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ProductionScheduleSettings> {
    return this._client.put('/v1/operations/production-schedule-settings', { body, ...options });
  }
}

/**
 * The planning assumptions a production schedule is solved against.
 *
 * The whole set is always returned. An account that has never saved settings reads
 * back the values the solver would apply anyway, so a caller never has to know
 * which assumptions are in play; `settings_status` says whether the values were
 * saved on the account or are those defaults.
 */
export interface ProductionScheduleSettings {
  /**
   * Whether a version produced by the cadence is published automatically.
   *
   * While active, a cadence run publishes as soon as it solves, committing its
   * frozen weeks without anyone reviewing the plan. Otherwise the run leaves a draft
   * for a planner to publish by hand. Versions generated on request are never
   * published automatically.
   */
  auto_publish_status: 'active' | 'inactive';

  /**
   * Whether schedules are generated automatically on a recurring cadence.
   *
   * While active, each due tick queues a new schedule version; a generation cron
   * expression is required for the cadence to be saved.
   */
  cadence_status: 'active' | 'inactive';

  /**
   * Share of machine time a plan may fill.
   *
   * Shifts, hours and work days give a machine's raw weekly hours; this trims them
   * to what may actually be planned. The remainder absorbs changeovers, which are
   * not scheduled as explicit blocks, so a value of 1 produces a plan that leaves no
   * time to set anything up.
   */
  capacity_headroom_pct: number;

  /**
   * Typical changeover duration.
   *
   * Changeover time is modeled as rising with the number of new inputs a product
   * introduces, between the minimum and maximum below. The slope is calibrated from
   * production history so the model reproduces this average across the transitions
   * actually observed, which is why the value belongs at the changeover time the
   * floor typically reports rather than at a worst case.
   */
  changeover_avg_minutes: number;

  /**
   * Hourly labor rate charged to a changeover.
   *
   * This is a dedicated technician rate rather than an allocated production rate,
   * because one person works a single machine through a changeover. Together with
   * the typical changeover duration it prices the setup cost that decides economic
   * campaign sizes. The constraint department's own labor rate takes precedence when
   * it has one, leaving this as the fallback.
   */
  changeover_labor_rate: number;

  /**
   * Longest plausible changeover, and the ceiling of the changeover model.
   */
  changeover_max_minutes: number;

  /**
   * Shortest plausible changeover, and the floor of the changeover model.
   */
  changeover_min_minutes: number;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  constraint_department: CoreAPI.Entity | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Weeks of lead time to assume at the constraint for an item with no measured
   * history.
   *
   * An item's own lead time, measured from production history, is used instead
   * whenever one can be observed.
   */
  default_constraint_lead_time_weeks: number;

  /**
   * Calendar days between an order being issued and it being due to ship.
   *
   * The last resort in the ship-by chain: a lead time set on the customer, on its
   * parent account, or on the customer's account group takes precedence. Zero means
   * same-day shipping.
   */
  default_customer_lead_time_days: number;

  /**
   * How a SKU is produced when neither it nor its product line says.
   *
   * - `make_to_stock`: built to the forecast, holding a safety stock against its
   *   variability.
   * - `make_to_order`: built only against orders already on the book, holding no
   *   buffer.
   */
  default_fulfillment_policy: 'make_to_stock' | 'make_to_order';

  /**
   * Units in a default production lot.
   *
   * The last resort in the lot-size chain: a lot set on the item, on its product
   * line, or on the finished goods an intermediate item becomes all take precedence.
   */
  default_lot_units: number;

  /**
   * How the demand a plan is solved against is derived from history.
   *
   * - `trailing_12`: the last twelve complete months of orders, spread evenly across
   *   the coming year.
   * - `seasonal_ema`: a seasonally adjusted, exponentially smoothed projection that
   *   weights recent months more heavily. Falls back to the trailing baseline for an
   *   item with no history.
   *
   * Demand overrides are applied on top of whichever baseline is chosen.
   */
  demand_basis: 'trailing_12' | 'seasonal_ema';

  /**
   * Months of production history the solver measures run rates, changeover behavior
   * and lead times from.
   */
  demand_window_months: number;

  /**
   * Weeks between coming off the constraint and being sellable.
   *
   * Added to the constraint's own lead time when reorder points are set, so a plan
   * replenishes early enough for a decision made today to become sellable stock.
   */
  finish_lead_time_weeks: number;

  /**
   * Months of order history the demand baseline is drawn from.
   */
  forecast_history_months: number;

  /**
   * Months the forecast projects forward.
   *
   * Only applies to the `seasonal_ema` basis. A projection of anything other than
   * twelve months is scaled to an annual rate, so the plan always reasons about a
   * year of demand.
   */
  forecast_months: number;

  /**
   * Z-score used for the confidence interval around the seasonal demand forecast.
   *
   * The plan is solved against the central forecast, so this widens or narrows that
   * interval without changing what gets scheduled.
   */
  forecast_z: number;

  /**
   * How many leading weeks of the horizon become a commitment when a version is
   * published.
   *
   * Nothing is frozen while a version is still a draft. Once published, changing a
   * campaign inside the frozen window requires a reason and is recorded against the
   * plan. Cannot be longer than the planning horizon.
   */
  frozen_weeks: number;

  /**
   * Standard cron expression driving the generation cadence.
   */
  generation_cron: string | null;

  /**
   * Timezone the cadence is interpreted in.
   *
   * Decides when "every Wednesday at 6am" actually happens. A timezone the platform
   * does not recognize falls back to UTC.
   */
  generation_timezone: string;

  /**
   * Annual cost of holding stock, as a share of item value.
   *
   * Weighed against the cost of a changeover when campaigns are sized: a higher rate
   * favors shorter, more frequent runs.
   */
  holding_rate_pct: number;

  /**
   * Hours in a shift.
   */
  hours_per_shift: number;

  /**
   * When the cadence last fired.
   *
   * Stamped when a run is queued rather than when the plan finishes solving, and the
   * next due time is measured from it.
   */
  last_generated_at: string | null;

  /**
   * How many steps down the production flow a constraint item is traced to the
   * finished goods it becomes.
   *
   * Demand, stock and lot conventions are pooled onto the constraint item from every
   * finished good the trace reaches, so anything further down the flow than this
   * contributes nothing to the plan. The limit is also what stops a routing that
   * loops back on itself from being traced forever.
   */
  max_flow_depth: number;

  /**
   * Ceiling on how far ahead any item is built.
   *
   * An item is only rebuilt once its projected stock falls below the lower of its
   * reorder point and this many weeks of demand, so a slow mover whose statistical
   * reorder point covers months of demand is not topped up ahead of items that are
   * actually short.
   */
  max_weeks_supply: number;

  /**
   * Resource type identifier.
   */
  object: 'production_schedule_settings';

  /**
   * How many weeks a generated plan covers.
   */
  planning_horizon_weeks: number;

  receive_calendar_id: string | null;

  /**
   * Z-score behind the safety stock targets.
   *
   * A higher value buys more cover against demand variability at both the constraint
   * and the finished goods stage, at the cost of carrying more stock.
   */
  service_level_z: number;

  /**
   * Whether the values returned were saved on the account or are the defaults
   * applied when nothing has been saved.
   */
  settings_status: 'stored' | 'default';

  /**
   * Shifts worked per day.
   */
  shifts_per_day: number;

  /**
   * The account-wide operating calendars: the days the plant tenders freight, and
   * the days a customer's dock accepts it.
   *
   * Behind the per-address and per-customer links and ahead of a plain
   * Monday-to-Friday week. Null on both means every ship-by date is resolved against
   * weekdays alone.
   */
  ship_calendar_id: string | null;

  /**
   * Last updated timestamp.
   */
  updated_at: string;

  /**
   * Day a planning week starts, where 0 is Sunday.
   */
  week_start_day: number;

  /**
   * Weeks worked per year.
   */
  weeks_per_year: number;

  /**
   * Days worked per week.
   */
  work_days_per_week: number;
}

/**
 * Request to replace the account's planning assumptions.
 */
export interface UpdateProductionScheduleSettingsRequest {
  /**
   * Whether a version produced by the cadence is published automatically.
   *
   * While active, a cadence run publishes as soon as it solves, committing its
   * frozen weeks without anyone reviewing the plan. Otherwise the run leaves a draft
   * for a planner to publish by hand. Versions generated on request are never
   * published automatically.
   */
  auto_publish_status: 'active' | 'inactive';

  /**
   * Whether schedules are generated automatically on a recurring cadence.
   *
   * While active, each due tick queues a new schedule version.
   */
  cadence_status: 'active' | 'inactive';

  /**
   * Share of machine time a plan may fill.
   *
   * Shifts, hours and work days give a machine's raw weekly hours; this trims them
   * to what may actually be planned. The remainder absorbs changeovers, which are
   * not scheduled as explicit blocks, so a value of 1 produces a plan that leaves no
   * time to set anything up.
   */
  capacity_headroom_pct: number;

  /**
   * Typical changeover duration.
   *
   * Changeover time is modeled as rising with the number of new inputs a product
   * introduces, between the minimum and maximum below. The slope is calibrated from
   * production history so the model reproduces this average across the transitions
   * actually observed; set it to the changeover time the floor typically reports
   * rather than to a worst case.
   */
  changeover_avg_minutes: number;

  /**
   * Hourly labor rate charged to a changeover.
   *
   * This should be a dedicated technician rate rather than an allocated production
   * rate, because one person works a single machine through a changeover. The
   * constraint department's own labor rate takes precedence when it has one, leaving
   * this as the fallback.
   */
  changeover_labor_rate: number;

  /**
   * Longest plausible changeover, and the ceiling of the changeover model.
   */
  changeover_max_minutes: number;

  /**
   * Shortest plausible changeover, and the floor of the changeover model.
   *
   * Cannot exceed the maximum.
   */
  changeover_min_minutes: number;

  /**
   * Weeks of lead time to assume at the constraint for an item with no measured
   * history.
   *
   * An item's own lead time, measured from production history, is used instead
   * whenever one can be observed.
   */
  default_constraint_lead_time_weeks: number;

  /**
   * Calendar days between an order being issued and it being due to ship.
   *
   * The last resort in the ship-by chain: a lead time set on the customer, on its
   * parent account, or on the customer's account group takes precedence. Zero
   * commits the account to same-day shipping on every order that falls through to
   * it, so this update replaces the whole settings object and omitting the field is
   * not the same as leaving it alone.
   */
  default_customer_lead_time_days: number;

  /**
   * How a SKU is produced when neither it nor its product line says.
   *
   * - `make_to_stock`: built to the forecast, holding a safety stock against its
   *   variability.
   * - `make_to_order`: built only against orders already on the book, holding no
   *   buffer.
   */
  default_fulfillment_policy: 'make_to_stock' | 'make_to_order';

  /**
   * Units in a default production lot.
   *
   * The last resort in the lot-size chain: a lot set on the item, on its product
   * line, or on the finished goods an intermediate item becomes all take precedence.
   */
  default_lot_units: number;

  /**
   * How the demand a plan is solved against is derived from history.
   *
   * - `trailing_12`: the last twelve complete months of orders, spread evenly across
   *   the coming year.
   * - `seasonal_ema`: a seasonally adjusted, exponentially smoothed projection that
   *   weights recent months more heavily. Falls back to the trailing baseline for an
   *   item with no history.
   *
   * Demand overrides are applied on top of whichever baseline is chosen.
   */
  demand_basis: 'trailing_12' | 'seasonal_ema';

  /**
   * Months of production history the solver measures run rates, changeover behavior
   * and lead times from.
   */
  demand_window_months: number;

  /**
   * Weeks between coming off the constraint and being sellable.
   */
  finish_lead_time_weeks: number;

  /**
   * Months of order history the demand baseline is drawn from.
   */
  forecast_history_months: number;

  /**
   * Months the forecast projects forward.
   *
   * Only applies to the `seasonal_ema` basis. A projection of anything other than
   * twelve months is scaled to an annual rate, so the plan always reasons about a
   * year of demand.
   */
  forecast_months: number;

  /**
   * Z-score used for the confidence interval around the seasonal demand forecast.
   *
   * The plan is solved against the central forecast, so this widens or narrows that
   * interval without changing what gets scheduled.
   */
  forecast_z: number;

  /**
   * How many leading weeks of the horizon become a commitment when a version is
   * published.
   *
   * Cannot be longer than the planning horizon. Once a version is published,
   * changing a campaign inside the frozen window requires a reason and is recorded
   * against the plan.
   */
  frozen_weeks: number;

  /**
   * Timezone the cadence is interpreted in.
   *
   * Decides when "every Wednesday at 6am" actually happens. A timezone the platform
   * does not recognize falls back to UTC.
   */
  generation_timezone: string;

  /**
   * Annual cost of holding stock, as a share of item value.
   *
   * Weighed against the cost of a changeover when campaigns are sized: a higher rate
   * favors shorter, more frequent runs.
   */
  holding_rate_pct: number;

  /**
   * Hours in a shift.
   */
  hours_per_shift: number;

  /**
   * How many steps down the production flow a constraint item is traced to the
   * finished goods it becomes.
   *
   * Demand, stock and lot conventions are pooled onto the constraint item from every
   * finished good the trace reaches, so anything further down the flow than this
   * contributes nothing to the plan. The limit is also what stops a routing that
   * loops back on itself from being traced forever.
   */
  max_flow_depth: number;

  /**
   * Ceiling on how far ahead any item is built.
   *
   * An item is only rebuilt once its projected stock falls below the lower of its
   * reorder point and this many weeks of demand, so a slow mover whose statistical
   * reorder point covers months of demand is not topped up ahead of items that are
   * actually short.
   */
  max_weeks_supply: number;

  /**
   * How many weeks a generated plan covers.
   */
  planning_horizon_weeks: number;

  /**
   * Z-score for service level safety stock targets.
   */
  service_level_z: number;

  /**
   * Shifts worked per day.
   */
  shifts_per_day: number;

  /**
   * Day a planning week starts, where 0 is Sunday.
   */
  week_start_day: number;

  /**
   * Weeks worked per year.
   */
  weeks_per_year: number;

  /**
   * Days worked per week.
   */
  work_days_per_week: number;

  /**
   * ID of the department that sets the pace of the factory, and the one campaigns
   * are planned onto.
   *
   * Every machine in the department is planned, and the work of downstream
   * departments is derived from what those machines are scheduled to run. Sending
   * null, or leaving the field out of a request that otherwise replaces the
   * settings, both leave the account with no constraint department — and generation
   * is refused until one is chosen again.
   */
  constraint_department_id?: string | null;

  /**
   * Standard cron expression driving the generation cadence.
   *
   * Must be present and parse as a standard cron expression whenever the cadence is
   * active, otherwise the whole update is rejected.
   */
  generation_cron?: string | null;

  receive_calendar_id?: string | null;

  /**
   * The operating calendar naming the days this account's plant tenders freight, and
   * the one naming the days a customer's dock accepts it.
   *
   * These are the account-wide fallbacks: an address or a customer with its own
   * calendar overrides them, and an account with neither set falls back to a
   * Monday-to-Friday week with no closures.
   */
  ship_calendar_id?: string | null;
}

export interface ProductionScheduleSettingUpdateParams {
  /**
   * Whether a version produced by the cadence is published automatically.
   *
   * While active, a cadence run publishes as soon as it solves, committing its
   * frozen weeks without anyone reviewing the plan. Otherwise the run leaves a draft
   * for a planner to publish by hand. Versions generated on request are never
   * published automatically.
   */
  auto_publish_status: 'active' | 'inactive';

  /**
   * Whether schedules are generated automatically on a recurring cadence.
   *
   * While active, each due tick queues a new schedule version.
   */
  cadence_status: 'active' | 'inactive';

  /**
   * Share of machine time a plan may fill.
   *
   * Shifts, hours and work days give a machine's raw weekly hours; this trims them
   * to what may actually be planned. The remainder absorbs changeovers, which are
   * not scheduled as explicit blocks, so a value of 1 produces a plan that leaves no
   * time to set anything up.
   */
  capacity_headroom_pct: number;

  /**
   * Typical changeover duration.
   *
   * Changeover time is modeled as rising with the number of new inputs a product
   * introduces, between the minimum and maximum below. The slope is calibrated from
   * production history so the model reproduces this average across the transitions
   * actually observed; set it to the changeover time the floor typically reports
   * rather than to a worst case.
   */
  changeover_avg_minutes: number;

  /**
   * Hourly labor rate charged to a changeover.
   *
   * This should be a dedicated technician rate rather than an allocated production
   * rate, because one person works a single machine through a changeover. The
   * constraint department's own labor rate takes precedence when it has one, leaving
   * this as the fallback.
   */
  changeover_labor_rate: number;

  /**
   * Longest plausible changeover, and the ceiling of the changeover model.
   */
  changeover_max_minutes: number;

  /**
   * Shortest plausible changeover, and the floor of the changeover model.
   *
   * Cannot exceed the maximum.
   */
  changeover_min_minutes: number;

  /**
   * Weeks of lead time to assume at the constraint for an item with no measured
   * history.
   *
   * An item's own lead time, measured from production history, is used instead
   * whenever one can be observed.
   */
  default_constraint_lead_time_weeks: number;

  /**
   * Calendar days between an order being issued and it being due to ship.
   *
   * The last resort in the ship-by chain: a lead time set on the customer, on its
   * parent account, or on the customer's account group takes precedence. Zero
   * commits the account to same-day shipping on every order that falls through to
   * it, so this update replaces the whole settings object and omitting the field is
   * not the same as leaving it alone.
   */
  default_customer_lead_time_days: number;

  /**
   * How a SKU is produced when neither it nor its product line says.
   *
   * - `make_to_stock`: built to the forecast, holding a safety stock against its
   *   variability.
   * - `make_to_order`: built only against orders already on the book, holding no
   *   buffer.
   */
  default_fulfillment_policy: 'make_to_stock' | 'make_to_order';

  /**
   * Units in a default production lot.
   *
   * The last resort in the lot-size chain: a lot set on the item, on its product
   * line, or on the finished goods an intermediate item becomes all take precedence.
   */
  default_lot_units: number;

  /**
   * How the demand a plan is solved against is derived from history.
   *
   * - `trailing_12`: the last twelve complete months of orders, spread evenly across
   *   the coming year.
   * - `seasonal_ema`: a seasonally adjusted, exponentially smoothed projection that
   *   weights recent months more heavily. Falls back to the trailing baseline for an
   *   item with no history.
   *
   * Demand overrides are applied on top of whichever baseline is chosen.
   */
  demand_basis: 'trailing_12' | 'seasonal_ema';

  /**
   * Months of production history the solver measures run rates, changeover behavior
   * and lead times from.
   */
  demand_window_months: number;

  /**
   * Weeks between coming off the constraint and being sellable.
   */
  finish_lead_time_weeks: number;

  /**
   * Months of order history the demand baseline is drawn from.
   */
  forecast_history_months: number;

  /**
   * Months the forecast projects forward.
   *
   * Only applies to the `seasonal_ema` basis. A projection of anything other than
   * twelve months is scaled to an annual rate, so the plan always reasons about a
   * year of demand.
   */
  forecast_months: number;

  /**
   * Z-score used for the confidence interval around the seasonal demand forecast.
   *
   * The plan is solved against the central forecast, so this widens or narrows that
   * interval without changing what gets scheduled.
   */
  forecast_z: number;

  /**
   * How many leading weeks of the horizon become a commitment when a version is
   * published.
   *
   * Cannot be longer than the planning horizon. Once a version is published,
   * changing a campaign inside the frozen window requires a reason and is recorded
   * against the plan.
   */
  frozen_weeks: number;

  /**
   * Timezone the cadence is interpreted in.
   *
   * Decides when "every Wednesday at 6am" actually happens. A timezone the platform
   * does not recognize falls back to UTC.
   */
  generation_timezone: string;

  /**
   * Annual cost of holding stock, as a share of item value.
   *
   * Weighed against the cost of a changeover when campaigns are sized: a higher rate
   * favors shorter, more frequent runs.
   */
  holding_rate_pct: number;

  /**
   * Hours in a shift.
   */
  hours_per_shift: number;

  /**
   * How many steps down the production flow a constraint item is traced to the
   * finished goods it becomes.
   *
   * Demand, stock and lot conventions are pooled onto the constraint item from every
   * finished good the trace reaches, so anything further down the flow than this
   * contributes nothing to the plan. The limit is also what stops a routing that
   * loops back on itself from being traced forever.
   */
  max_flow_depth: number;

  /**
   * Ceiling on how far ahead any item is built.
   *
   * An item is only rebuilt once its projected stock falls below the lower of its
   * reorder point and this many weeks of demand, so a slow mover whose statistical
   * reorder point covers months of demand is not topped up ahead of items that are
   * actually short.
   */
  max_weeks_supply: number;

  /**
   * How many weeks a generated plan covers.
   */
  planning_horizon_weeks: number;

  /**
   * Z-score for service level safety stock targets.
   */
  service_level_z: number;

  /**
   * Shifts worked per day.
   */
  shifts_per_day: number;

  /**
   * Day a planning week starts, where 0 is Sunday.
   */
  week_start_day: number;

  /**
   * Weeks worked per year.
   */
  weeks_per_year: number;

  /**
   * Days worked per week.
   */
  work_days_per_week: number;

  /**
   * ID of the department that sets the pace of the factory, and the one campaigns
   * are planned onto.
   *
   * Every machine in the department is planned, and the work of downstream
   * departments is derived from what those machines are scheduled to run. Sending
   * null, or leaving the field out of a request that otherwise replaces the
   * settings, both leave the account with no constraint department — and generation
   * is refused until one is chosen again.
   */
  constraint_department_id?: string | null;

  /**
   * Standard cron expression driving the generation cadence.
   *
   * Must be present and parse as a standard cron expression whenever the cadence is
   * active, otherwise the whole update is rejected.
   */
  generation_cron?: string | null;

  receive_calendar_id?: string | null;

  /**
   * The operating calendar naming the days this account's plant tenders freight, and
   * the one naming the days a customer's dock accepts it.
   *
   * These are the account-wide fallbacks: an address or a customer with its own
   * calendar overrides them, and an account with neither set falls back to a
   * Monday-to-Friday week with no closures.
   */
  ship_calendar_id?: string | null;
}

ProductionScheduleSettings.Resources = Resources;
ProductionScheduleSettings.Items = Items;

export declare namespace ProductionScheduleSettings {
  export {
    type ProductionScheduleSettings as ProductionScheduleSettings,
    type UpdateProductionScheduleSettingsRequest as UpdateProductionScheduleSettingsRequest,
    type ProductionScheduleSettingUpdateParams as ProductionScheduleSettingUpdateParams,
  };

  export {
    Resources as Resources,
    type ListProductionScheduleResourceSetting as ListProductionScheduleResourceSetting,
    type ProductionScheduleResourceSetting as ProductionScheduleResourceSetting,
    type UpsertResourceSettingRequest as UpsertResourceSettingRequest,
    type ResourceDeleteResponse as ResourceDeleteResponse,
    type ResourceUpdateParams as ResourceUpdateParams,
  };

  export {
    Items as Items,
    type ListProductionScheduleItemSetting as ListProductionScheduleItemSetting,
    type ProductionScheduleItemSetting as ProductionScheduleItemSetting,
    type UpsertItemSettingRequest as UpsertItemSettingRequest,
    type ItemDeleteResponse as ItemDeleteResponse,
    type ItemUpdateParams as ItemUpdateParams,
  };
}
