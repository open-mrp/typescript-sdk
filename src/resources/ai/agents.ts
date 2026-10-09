// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AIAPI from './ai';
import * as APIKeysAPI from '../auth/api-keys/api-keys';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * List, create, update, and delete agent definitions.
 */
export class Agents extends APIResource {
  /**
   * Creates a custom agent for your account.
   *
   * The new agent is a `custom` definition and is immediately `active`, so it can
   * start running as soon as it has a role.
   *
   * This endpoint requires the permission: `agents:create`.
   *
   * @example
   * ```ts
   * const agentDefinition = await client.ai.agents.create({
   *   category_code: 'inventory',
   *   config: {
   *     system_prompt:
   *       'You are an order processing agent. Parse incoming emails and create draft orders.',
   *     tier: 'high',
   *     temperature: 0.2,
   *     trigger_config: { event_filters: ['email.received'] },
   *   },
   *   name: 'Inventory Monitor',
   *   slug: 'inventory_monitor',
   *   trigger_type: 'event',
   *   description:
   *     'Monitors inventory levels and creates restock alerts.',
   *   role_id: 'rl_3xknmfqflhvb',
   *   tools: [
   *     {
   *       tool: 'read_doc',
   *       sort_order: 1,
   *       require_review: true,
   *     },
   *   ],
   * });
   * ```
   */
  create(params: AgentCreateParams, options?: RequestOptions): APIPromise<AgentDefinition> {
    const { include, ...body } = params;
    return this._client.post('/v1/ai/agents', { query: { include }, body, ...options });
  }

  /**
   * Lists the agents available to your account, newest first.
   *
   * Covers both the `system` agents OpenMRP provides to every account and the
   * `custom` agents created in yours. Deleted agents are never returned. The `q`
   * parameter matches an agent's name, slug, description, or ID.
   *
   * This endpoint requires the permission: `agents:read`.
   *
   * @example
   * ```ts
   * const listAgentDefinition = await client.ai.agents.list();
   * ```
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ListAgentDefinition> {
    return this._client.get('/v1/ai/agents', { query, ...options });
  }

  /**
   * Retrieves a single agent by ID.
   *
   * Resolves both the `system` agents OpenMRP provides and the `custom` agents in
   * your account; the `status` reflects whether the agent is enabled for your
   * account specifically.
   *
   * This endpoint requires the permission: `agents:read`.
   *
   * @example
   * ```ts
   * const agentDefinition = await client.ai.agents.retrieve(
   *   'agdf_ah7tkyfxk8jl',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: AgentRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentDefinition> {
    return this._client.get(path`/v1/ai/agents/${id}`, { query, ...options });
  }

  /**
   * Updates a custom agent.
   *
   * Only the fields provided in the request are changed. OpenMRP's `system` agents
   * cannot be edited — the only thing you can change about them is whether they are
   * enabled for your account, with the Update Agent Status endpoint.
   *
   * This endpoint requires the permission: `agents:update`.
   *
   * @example
   * ```ts
   * const agentDefinition = await client.ai.agents.update(
   *   'agdf_ah7tkyfxk8jl',
   *   { name: 'Inventory Monitor' },
   * );
   * ```
   */
  update(
    id: string,
    params: AgentUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentDefinition> {
    const { include, ...body } = params ?? {};
    return this._client.patch(path`/v1/ai/agents/${id}`, { query: { include }, body, ...options });
  }

  /**
   * Deletes a custom agent.
   *
   * The agent is withdrawn from the API: it stops appearing in listings, no longer
   * resolves by ID, and can no longer be run or modified. Runs it already produced
   * are kept. OpenMRP's `system` agents cannot be deleted — disable one for your
   * account with the Update Agent Status endpoint instead.
   *
   * This endpoint requires the permission: `agents:delete`.
   *
   * @example
   * ```ts
   * const agent = await client.ai.agents.delete(
   *   'agdf_ah7tkyfxk8jl',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<AgentDeleteResponse> {
    return this._client.delete(path`/v1/ai/agents/${id}`, options);
  }

  /**
   * Enables or disables an agent for your account.
   *
   * Activation is per-account, so this works for the `system` agents OpenMRP shares
   * across accounts as well as your own `custom` agents: disabling one here leaves
   * the underlying agent untouched for everyone else. Triggering an inactive agent
   * returns a validation error.
   *
   * This endpoint requires the permission: `agents:update`.
   *
   * @example
   * ```ts
   * const agentDefinition = await client.ai.agents.updateStatus(
   *   'agdf_ah7tkyfxk8jl',
   *   { status: 'active' },
   * );
   * ```
   */
  updateStatus(
    id: string,
    params: AgentUpdateStatusParams,
    options?: RequestOptions,
  ): APIPromise<AgentDefinition> {
    const { include, ...body } = params;
    return this._client.put(path`/v1/ai/agents/${id}/status`, { query: { include }, body, ...options });
  }
}

/**
 * An AI agent available to the account.
 *
 * The definition describes what the agent does, how its runs are triggered, the
 * tools it can use, and whether it is currently enabled for the account.
 */
export interface AgentDefinition {
  /**
   * Agent definition ID.
   */
  id: string;

  /**
   * Category grouping for the agent (e.g. `order_processing`), used to organize
   * agents in the UI.
   */
  category_code: string;

  /**
   * Agent-level configuration controlling LLM behavior and trigger settings.
   *
   * Distinct from per-tool configuration (`tools[].config`), which configures
   * individual tools attached to the agent.
   */
  config: AgentDefinitionConfig | null;

  /**
   * Creation timestamp.
   */
  created_at: string;

  /**
   * Whether the agent is provided by OpenMRP or created in this account.
   *
   * - `system`: provided by OpenMRP; cannot be edited or deleted.
   * - `custom`: created by a user in this account.
   */
  definition_type: 'system' | 'custom';

  /**
   * Description of what the agent does.
   */
  description: string | null;

  /**
   * Whether this agent definition can be edited.
   *
   * Always `read_only` for `system` definitions.
   */
  editability: 'editable' | 'read_only';

  /**
   * Human-readable name of the agent.
   */
  name: string;

  /**
   * Resource type identifier.
   */
  object: 'agent_definition';

  /**
   * A named set of permissions that can be assigned to users to control what they
   * can access.
   */
  role: APIKeysAPI.Role | null;

  /**
   * URL-friendly identifier for the agent.
   *
   * Unique within the account.
   */
  slug: string;

  /**
   * Whether this agent is enabled for the current account.
   *
   * Activation is per-account: a `system` agent shared across accounts can be
   * `active` for one account and `inactive` for another. An `inactive` agent cannot
   * be triggered.
   */
  status: 'active' | 'inactive';

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  tools: ListAgentDefinitionTool | null;

  /**
   * How runs of this agent are initiated.
   *
   * - `scheduled`: runs on a cron schedule (see
   *   `config.trigger_config.cron_schedule`).
   * - `event`: runs in response to platform events (see
   *   `config.trigger_config.event_filters`).
   * - `manual`: runs only when explicitly invoked.
   * - `chat`: runs in response to a chat message; the run is linked to a
   *   conversation and posts its reply back into it.
   */
  trigger_type: 'scheduled' | 'manual' | 'event' | 'chat';

  /**
   * Last updated timestamp.
   */
  updated_at: string;
}

/**
 * Agent-level configuration controlling LLM behavior and trigger settings.
 *
 * Distinct from per-tool configuration (`tools[].config`), which configures
 * individual tools attached to the agent.
 */
export interface AgentDefinitionConfig {
  /**
   * Per-endpoint-tool human-review overrides, keyed by tool slug.
   *
   * When an entry is `true`, the run pauses in `awaiting_approval` each time the
   * agent calls that endpoint-tool until it is approved via the Continue Agent Run
   * endpoint. Slugs absent from the map do not require review.
   */
  endpoint_tool_review: { [key: string]: boolean };

  /**
   * API-endpoint tools the agent may discover and use, by slug (e.g.
   * `create_account_group`).
   *
   * These correspond to tools listed by the List Tools endpoint with category
   * `api_endpoint`. A single entry `*` grants the entire endpoint-tool catalog.
   */
  endpoint_tool_slugs: Array<string>;

  /**
   * Maximum model calls the agent may make in one turn before it must stop and
   * summarize.
   *
   * When the limit is reached, tools are disabled and the agent answers with what it
   * accomplished, what remains, and what it is missing. `null` means the default: 30
   * for chat and manual runs, 40 for scheduled and event-driven runs.
   */
  max_steps: number | null;

  /**
   * Resource type identifier.
   */
  object: 'agent_definition_config';

  /**
   * Standing instructions that define the agent's role and how it should behave on
   * every run.
   */
  system_prompt: string | null;

  /**
   * LLM sampling temperature between 0 and 1.
   *
   * Lower values make the agent's output more repeatable and literal; higher values
   * make it more varied.
   */
  temperature: number | null;

  /**
   * Intelligence and cost tier for the agent's reasoning.
   *
   * Selects how capable and expensive a model the agent uses without pinning a
   * specific model; higher tiers reason better but cost more. Each tier resolves to
   * an ordered chain of equivalent models, so a run automatically fails over to
   * another provider's model if the preferred one is unavailable.
   *
   * - `frontier`: the most capable tier, for multi-step planning, ambiguous agent
   *   work, and hard coding or architecture tasks.
   * - `high`: for normal planning, code edits, synthesis, and customer-facing
   *   reasoning.
   * - `balanced`: for research, summarization, classification, structured
   *   extraction, and light tool use.
   * - `cheap`: for simple transforms, validation, formatting, and routing.
   * - `legacy`: older-generation models kept for compatibility and regression
   *   comparison; avoid unless you specifically need them.
   *
   * Leaving the tier unset picks one from how the agent is triggered: chat and
   * manual runs use `high`, while scheduled and event-driven runs use `balanced` so
   * background work stays cheap.
   */
  tier: 'frontier' | 'high' | 'balanced' | 'cheap' | 'legacy' | null;

  /**
   * Trigger-type-specific configuration.
   *
   * Which fields are populated depends on the agent's `trigger_type`:
   *
   * - `scheduled`: `cron_schedule` (and optionally `timezone`) is set.
   * - `event`: `event_filters` is set.
   * - `manual`: all fields are empty.
   */
  trigger_config: TriggerConfig | null;
}

/**
 * Tool attached to an agent definition.
 *
 * Pairs an AvailableTool with agent-specific config values.
 */
export interface AgentDefinitionTool {
  /**
   * Agent definition tool ID.
   */
  id: string;

  /**
   * Instance-specific configuration for this tool.
   *
   * Must conform to the tool's `config_schema`. Encoded as a JSON value (object,
   * array, string, number, boolean, or null), not a JSON-encoded string.
   */
  config: unknown | null;

  /**
   * Resource type identifier.
   */
  object: 'agent_definition_tool';

  /**
   * Whether calls to this tool must be approved by a user before they execute.
   *
   * When `required`, the run pauses in the `awaiting_approval` status each time the
   * agent invokes this tool; approve or allow the tool via the Continue Agent Run
   * endpoint to proceed. A tool whose `mutating` flag is true still pauses for
   * approval even when this is `not_required`.
   */
  review_requirement: 'not_required' | 'required';

  /**
   * Sort order within the agent.
   */
  sort_order: number;

  /**
   * A capability an agent can be granted, allowing it to take that action during a
   * run.
   *
   * The catalog of available tools is the same for every account; granting one to an
   * agent is what makes it callable.
   */
  tool: AIAPI.AvailableTool;
}

/**
 * Agent-level configuration for creation/update requests.
 */
export interface ConfigInput {
  /**
   * Per-endpoint-tool human-review overrides, keyed by tool slug.
   *
   * Set a slug to `true` to require human approval before the agent may execute that
   * endpoint-tool; the run pauses in `awaiting_approval` until approved via the
   * Continue Agent Run endpoint. Slugs omitted from the map do not require review.
   */
  endpoint_tool_review?: { [key: string]: boolean };

  /**
   * API-endpoint tools the agent may discover and use, by slug (e.g.
   * `create_account_group`).
   *
   * These are the tools listed by the List Tools endpoint with category
   * `api_endpoint`. The single entry `*` grants the entire endpoint-tool catalog.
   * Omit or leave empty to grant none.
   */
  endpoint_tool_slugs?: Array<string>;

  /**
   * Maximum model calls the agent may make in one turn before it must stop and
   * summarize, from 1 to 60.
   *
   * When the limit is reached, tools are disabled and the agent answers with what it
   * accomplished, what remains, and what it is missing. Omit to use the default: 30
   * for chat and manual runs, 40 for scheduled and event-driven runs.
   */
  max_steps?: number;

  /**
   * Instructions that define the agent's role and how it should behave.
   *
   * Sent to the model on every turn of a run, alongside the platform guidance
   * OpenMRP adds automatically.
   */
  system_prompt?: string;

  /**
   * How much randomness the model uses when generating text.
   *
   * Lower values make the agent's output more repeatable; higher values make it more
   * varied.
   */
  temperature?: number;

  /**
   * Intelligence and cost tier for the agent's reasoning.
   *
   * Selects how capable (and how expensive) a model the agent uses without pinning a
   * specific model, so the agent keeps working as the underlying model catalog
   * changes.
   *
   * - `frontier`: the most capable and most expensive; multi-step planning,
   *   ambiguous work, tool-heavy workflows.
   * - `high`: normal planning, synthesis, and customer-facing reasoning.
   * - `balanced`: research, summarization, classification, structured extraction,
   *   and light tool use.
   * - `cheap`: simple transforms, validation, formatting, keyword lookup, and
   *   routing.
   * - `legacy`: older models kept for compatibility and regression comparison; avoid
   *   unless you specifically need them.
   */
  tier?: 'frontier' | 'high' | 'balanced' | 'cheap' | 'legacy';

  /**
   * Trigger-type-specific settings for agent creation/update requests.
   *
   * Required contents depend on the agent's `trigger_type`:
   *
   * - `scheduled`: `cron_schedule` is required.
   * - `event`: at least one entry in `event_filters` is required.
   * - `manual` and `chat`: no trigger configuration is needed.
   */
  trigger_config?: TriggerConfigInput;
}

/**
 * Request to create an agent definition.
 */
export interface CreateAgentRequest {
  /**
   * Category grouping for the agent (e.g. `order_processing`), used to organize
   * agents in the UI.
   */
  category_code: string;

  /**
   * Agent-level configuration for creation/update requests.
   */
  config: ConfigInput;

  /**
   * Human-readable name of the agent.
   */
  name: string;

  /**
   * URL-friendly identifier for the agent.
   *
   * Must be unique within your account.
   */
  slug: string;

  /**
   * How runs of this agent are initiated.
   *
   * - `scheduled`: runs on a cron schedule; `config.trigger_config.cron_schedule` is
   *   required.
   * - `event`: runs in response to platform events; at least one
   *   `config.trigger_config.event_filters` entry is required.
   * - `manual`: runs only when explicitly invoked.
   * - `chat`: runs when a user messages the agent in a conversation, and the agent's
   *   reply is posted back into that conversation.
   *
   * Whatever the trigger type, a run can always be started by hand with the Trigger
   * Agent Run endpoint.
   */
  trigger_type: 'scheduled' | 'manual' | 'event' | 'chat';

  /**
   * Description of what the agent does.
   */
  description?: string;

  /**
   * ID of the role that defines the permissions the agent operates with.
   *
   * Every API call the agent makes is authorized against this role, so it bounds
   * what the agent can see and change. An agent created without a role cannot
   * execute — its runs fail immediately — so attach one before triggering it.
   *
   * Unless you are an admin, the role may grant only permissions you hold yourself
   * and may not be an admin role; otherwise the request fails with a `403` on
   * `role_id`.
   */
  role_id?: string;

  /**
   * Built-in tools to attach to the agent.
   */
  tools?: Array<ToolInput>;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListAgentDefinition {
  /**
   * Resources in this page.
   */
  data: Array<AgentDefinition>;

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
export interface ListAgentDefinitionTool {
  /**
   * Resources in this page.
   */
  data: Array<AgentDefinitionTool>;

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
 * Tool to attach to an agent definition.
 */
export interface ToolInput {
  /**
   * The built-in tool to attach.
   *
   * Only OpenMRP's built-in tools are attached here. Access to API-endpoint tools
   * (creating a customer, listing orders, and so on) is granted separately through
   * `config.endpoint_tool_slugs`. The List Tools endpoint (`GET /v1/ai/tools`)
   * returns both kinds, with API-endpoint tools in the `api_endpoint` category.
   */
  tool:
    | 'create_artifact'
    | 'read_doc'
    | 'search_docs'
    | 'describe_api_operation'
    | 'search_source'
    | 'read_source'
    | 'fetch_url'
    | 'send_email'
    | 'draft_reply';

  /**
   * JSON-encoded configuration for this tool instance.
   *
   * The expected structure depends on the tool (see the tool's `config_schema`).
   */
  config_json?: string;

  /**
   * Whether actions from this tool require human review before they execute.
   *
   * When review is required, a call to this tool pauses the run in
   * `awaiting_approval` and records an action in `pending_review` until someone
   * approves or rejects it through the Continue Agent Run endpoint. Approvals are
   * one-time, so a later call to the same tool pauses again.
   */
  require_review?: boolean;

  /**
   * Display order among the agent's tools (lower values appear first).
   */
  sort_order?: number;
}

/**
 * Trigger-type-specific configuration.
 *
 * Which fields are populated depends on the agent's `trigger_type`:
 *
 * - `scheduled`: `cron_schedule` (and optionally `timezone`) is set.
 * - `event`: `event_filters` is set.
 * - `manual`: all fields are empty.
 */
export interface TriggerConfig {
  /**
   * Cron expression for scheduled triggers (e.g. `0 9 * * *`).
   */
  cron_schedule: string | null;

  /**
   * Event types that trigger this agent (e.g.
   * `["email.received", "order.created"]`).
   */
  event_filters: Array<string>;

  /**
   * Resource type identifier.
   */
  object: 'trigger_config';

  /**
   * IANA timezone for the cron schedule (e.g. `America/New_York`).
   */
  timezone: string | null;
}

/**
 * Trigger-type-specific settings for agent creation/update requests.
 *
 * Required contents depend on the agent's `trigger_type`:
 *
 * - `scheduled`: `cron_schedule` is required.
 * - `event`: at least one entry in `event_filters` is required.
 * - `manual` and `chat`: no trigger configuration is needed.
 */
export interface TriggerConfigInput {
  /**
   * Cron expression for scheduled triggers (e.g. `0 9 * * *`).
   */
  cron_schedule?: string;

  /**
   * Event types that trigger this agent (e.g.
   * `["email.received", "order.created"]`).
   */
  event_filters?: Array<string>;

  /**
   * IANA timezone for the cron schedule (e.g. `America/New_York`).
   */
  timezone?: string;
}

/**
 * Request to partially update an agent definition.
 */
export interface UpdateAgentRequest {
  /**
   * Category grouping for the agent (e.g. `order_processing`), used to organize
   * agents in the UI.
   */
  category_code?: string;

  /**
   * Agent-level configuration for creation/update requests.
   */
  config?: ConfigInput;

  /**
   * Description of what the agent does.
   *
   * Send `null` to clear the description; omit to leave it unchanged.
   */
  description?: string | null;

  /**
   * Human-readable name of the agent.
   */
  name?: string;

  /**
   * ID of the role that defines the permissions the agent operates with.
   *
   * Send `null` to detach the role; omit to leave it unchanged. An agent with no
   * role cannot execute, so detaching the role makes its runs fail immediately.
   *
   * Unless you are an admin, the role the agent ends up with — the one you send, or
   * its current role when you omit this — may grant only permissions you hold
   * yourself and may not be an admin role; otherwise the request fails with a `403`
   * on `role_id`.
   */
  role_id?: string | null;

  /**
   * URL-friendly identifier for the agent.
   */
  slug?: string;

  /**
   * Built-in tools to attach to the agent.
   *
   * Replaces the existing tool set when provided.
   */
  tools?: Array<ToolInput>;

  /**
   * How runs of this agent are initiated.
   *
   * When changing the trigger type, also provide a `config` with a `trigger_config`
   * appropriate for the new type (a cron schedule for `scheduled`, at least one
   * event filter for `event`).
   */
  trigger_type?: 'scheduled' | 'manual' | 'event' | 'chat';
}

/**
 * Request to update the per-account status of an agent.
 */
export interface UpdateAgentStatusRequest {
  /**
   * Account-level status to set for the agent.
   */
  status: 'active' | 'inactive';
}

export interface AgentDeleteResponse {}

export interface AgentCreateParams {
  /**
   * Body param: Category grouping for the agent (e.g. `order_processing`), used to
   * organize agents in the UI.
   */
  category_code: string;

  /**
   * Body param: Agent-level configuration for creation/update requests.
   */
  config: ConfigInput;

  /**
   * Body param: Human-readable name of the agent.
   */
  name: string;

  /**
   * Body param: URL-friendly identifier for the agent.
   *
   * Must be unique within your account.
   */
  slug: string;

  /**
   * Body param: How runs of this agent are initiated.
   *
   * - `scheduled`: runs on a cron schedule; `config.trigger_config.cron_schedule` is
   *   required.
   * - `event`: runs in response to platform events; at least one
   *   `config.trigger_config.event_filters` entry is required.
   * - `manual`: runs only when explicitly invoked.
   * - `chat`: runs when a user messages the agent in a conversation, and the agent's
   *   reply is posted back into that conversation.
   *
   * Whatever the trigger type, a run can always be started by hand with the Trigger
   * Agent Run endpoint.
   */
  trigger_type: 'scheduled' | 'manual' | 'event' | 'chat';

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'config' | 'tools' | 'role' | 'role.permissions'>;

  /**
   * Body param: Description of what the agent does.
   */
  description?: string;

  /**
   * Body param: ID of the role that defines the permissions the agent operates with.
   *
   * Every API call the agent makes is authorized against this role, so it bounds
   * what the agent can see and change. An agent created without a role cannot
   * execute — its runs fail immediately — so attach one before triggering it.
   *
   * Unless you are an admin, the role may grant only permissions you hold yourself
   * and may not be an admin role; otherwise the request fails with a `403` on
   * `role_id`.
   */
  role_id?: string;

  /**
   * Body param: Built-in tools to attach to the agent.
   */
  tools?: Array<ToolInput>;
}

export interface AgentListParams {
  /**
   * Opaque cursor token identifying where the page of results starts.
   *
   * Use the `cursor` value embedded in a previous response's `next_page_url` or
   * `previous_page_url` to fetch the adjacent page. Omit to start from the first
   * page.
   */
  cursor?: string;

  /**
   * Restricts results to agents of one of the given definition types.
   */
  definition_types?: Array<'system' | 'custom'>;

  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'config' | 'tools' | 'role' | 'role.permissions'>;

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

  /**
   * Restricts results to agents with one of the given account-level statuses.
   *
   * `inactive` also matches agents that have never been enabled for your account.
   */
  statuses?: Array<'active' | 'inactive'>;

  /**
   * Restricts results to agents with one of the given trigger types.
   */
  trigger_types?: Array<'scheduled' | 'manual' | 'event' | 'chat'>;
}

export interface AgentRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<'config' | 'tools' | 'role' | 'role.permissions'>;
}

export interface AgentUpdateParams {
  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'config' | 'tools' | 'role' | 'role.permissions'>;

  /**
   * Body param: Category grouping for the agent (e.g. `order_processing`), used to
   * organize agents in the UI.
   */
  category_code?: string;

  /**
   * Body param: Agent-level configuration for creation/update requests.
   */
  config?: ConfigInput;

  /**
   * Body param: Description of what the agent does.
   *
   * Send `null` to clear the description; omit to leave it unchanged.
   */
  description?: string | null;

  /**
   * Body param: Human-readable name of the agent.
   */
  name?: string;

  /**
   * Body param: ID of the role that defines the permissions the agent operates with.
   *
   * Send `null` to detach the role; omit to leave it unchanged. An agent with no
   * role cannot execute, so detaching the role makes its runs fail immediately.
   *
   * Unless you are an admin, the role the agent ends up with — the one you send, or
   * its current role when you omit this — may grant only permissions you hold
   * yourself and may not be an admin role; otherwise the request fails with a `403`
   * on `role_id`.
   */
  role_id?: string | null;

  /**
   * Body param: URL-friendly identifier for the agent.
   */
  slug?: string;

  /**
   * Body param: Built-in tools to attach to the agent.
   *
   * Replaces the existing tool set when provided.
   */
  tools?: Array<ToolInput>;

  /**
   * Body param: How runs of this agent are initiated.
   *
   * When changing the trigger type, also provide a `config` with a `trigger_config`
   * appropriate for the new type (a cron schedule for `scheduled`, at least one
   * event filter for `event`).
   */
  trigger_type?: 'scheduled' | 'manual' | 'event' | 'chat';
}

export interface AgentUpdateStatusParams {
  /**
   * Body param: Account-level status to set for the agent.
   */
  status: 'active' | 'inactive';

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'config' | 'tools' | 'role' | 'role.permissions'>;
}

export declare namespace Agents {
  export {
    type AgentDefinition as AgentDefinition,
    type AgentDefinitionConfig as AgentDefinitionConfig,
    type AgentDefinitionTool as AgentDefinitionTool,
    type ConfigInput as ConfigInput,
    type CreateAgentRequest as CreateAgentRequest,
    type ListAgentDefinition as ListAgentDefinition,
    type ListAgentDefinitionTool as ListAgentDefinitionTool,
    type ToolInput as ToolInput,
    type TriggerConfig as TriggerConfig,
    type TriggerConfigInput as TriggerConfigInput,
    type UpdateAgentRequest as UpdateAgentRequest,
    type UpdateAgentStatusRequest as UpdateAgentStatusRequest,
    type AgentDeleteResponse as AgentDeleteResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentListParams as AgentListParams,
    type AgentRetrieveParams as AgentRetrieveParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentUpdateStatusParams as AgentUpdateStatusParams,
  };
}
