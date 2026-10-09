// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AgentsAPI from '../agents';
import * as CoreAPI from '../../core/core';
import * as RequestLogsAPI from '../../core/request-logs';
import * as ActionsAPI from './actions';
import {
  ActionCancelParams,
  ActionContinueParams,
  ActionRetryParams,
  Actions,
  ContinueRunRequest,
} from './actions';
import * as APIKeysAPI from '../../auth/api-keys/api-keys';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * List, retrieve, trigger, cancel, and continue agent runs.
 */
export class Runs extends APIResource {
  actions: ActionsAPI.Actions = new ActionsAPI.Actions(this._client);

  /**
   * Lists agent runs for your account, newest first.
   *
   * The `q` parameter matches a run's ID, its status, or the ID of the agent that
   * produced it.
   *
   * This endpoint requires the permission: `agent_runs:read`.
   *
   * @example
   * ```ts
   * const listAgentRun = await client.ai.runs.list();
   * ```
   */
  list(query: RunListParams | null | undefined = {}, options?: RequestOptions): APIPromise<ListAgentRun> {
    return this._client.get('/v1/ai/runs', { query, ...options });
  }

  /**
   * Retrieves a single agent run by ID.
   *
   * A run records one execution of an agent: its current status, the input it
   * started from, the output it produced, the tools it invoked, and the step-by-step
   * timeline of how it got there.
   *
   * This endpoint requires the permission: `agent_runs:read`.
   *
   * @example
   * ```ts
   * const agentRun = await client.ai.runs.retrieve(
   *   'agrn_l6ob5relrd7t',
   * );
   * ```
   */
  retrieve(
    id: string,
    query: RunRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentRun> {
    return this._client.get(path`/v1/ai/runs/${id}`, { query, ...options });
  }

  /**
   * Starts a new run of the specified agent.
   *
   * The run is created in the `pending` status and executed asynchronously; poll
   * Retrieve Agent Run to follow its progress. Any agent can be started this way
   * regardless of how it is normally triggered, and the resulting run is always
   * recorded with `trigger_type` `manual`.
   *
   * This endpoint requires the permissions: `agent_runs:create`, `agents:read` and
   * `agent_runs:read`.
   *
   * @example
   * ```ts
   * const agentRun = await client.ai.runs.create({
   *   agent_definition_id: 'agdf_ah7tkyfxk8jl',
   *   input: 'Process the latest incoming orders.',
   * });
   * ```
   */
  create(params: RunCreateParams, options?: RequestOptions): APIPromise<AgentRun> {
    const { include, ...body } = params;
    return this._client.post('/v1/ai/runs', { query: { include }, body, ...options });
  }
}

/**
 * A single tool invocation performed by an agent during a run.
 *
 * Each action records the tool that was called, its input and output, and any
 * human review decision.
 */
export interface AgentAction {
  /**
   * Agent action ID.
   */
  id: string;

  /**
   * When this action was created.
   */
  created_at: string;

  /**
   * Longer description of what the action does.
   */
  description: string | null;

  /**
   * Entity is a polymorphic reference to any resource in the system.
   */
  entity: CoreAPI.Entity | null;

  /**
   * Error message if the action failed.
   */
  error_message: string | null;

  /**
   * When the action was executed.
   */
  executed_at: string | null;

  /**
   * Arguments passed to the tool, as JSON.
   *
   * Shape depends on `tool`. Encoded as a JSON value (object, array, string, number,
   * boolean, or null), not a JSON-encoded string.
   */
  input: unknown | null;

  /**
   * Short human-readable label summarizing the action.
   */
  label: string | null;

  /**
   * Resource type identifier.
   */
  object: 'agent_action';

  /**
   * Result returned by the tool, as JSON.
   *
   * The shape depends on `tool`. An action that has not executed — because it is
   * still waiting on a review decision, or was rejected — carries `{}`. Encoded as a
   * JSON value (object, array, string, number, boolean, or null), not a JSON-encoded
   * string.
   */
  output: unknown | null;

  /**
   * Whether a person must approve this action before it takes effect.
   *
   * Fixed when the action is recorded, from the agent's review setting for that
   * tool; tools that take an externally visible action, such as `send_email`, always
   * require review and cannot be exempted. When review is required the action starts
   * in `pending_review` and stays there until someone approves or rejects it;
   * otherwise it is `auto_approved`.
   */
  review_requirement: 'not_required' | 'required';

  /**
   * When a human review decision was recorded for the action.
   */
  reviewed_at: string | null;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  reviewed_by: RequestLogsAPI.Actor | null;

  /**
   * A single execution of an agent, from trigger through completion.
   */
  run: AgentRun | null;

  /**
   * Current action status.
   *
   * - `pending_review`: awaiting human review before it can execute.
   * - `auto_approved`: automatically approved by policy.
   * - `approved`: manually approved by a user.
   * - `rejected`: rejected by a user; will not execute.
   * - `executed`: successfully executed.
   * - `failed`: errored during execution; see `error_message`.
   */
  status: 'pending_review' | 'auto_approved' | 'approved' | 'rejected' | 'executed' | 'failed';

  /**
   * The tool the agent invoked for this action.
   *
   * - `create_artifact`: create an artifact such as a report, document, or data
   *   export.
   * - `read_doc`: read OpenMRP documentation pages.
   * - `fetch_url`: fetch content from a public URL.
   * - `draft_reply`: propose a reply to the case's external party as a draft held
   *   for human approval (not sent).
   * - `send_email`: send an email reply through the conversation's bound inbox.
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
   * When this action was last updated.
   */
  updated_at: string;
}

/**
 * A single execution of an agent, from trigger through completion.
 */
export interface AgentRun {
  /**
   * Agent run ID.
   */
  id: string;

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  actions: ListAgentAction | null;

  /**
   * When the run completed.
   */
  completed_at: string | null;

  /**
   * When this run was created.
   */
  created_at: string;

  /**
   * An AI agent available to the account.
   *
   * The definition describes what the agent does, how its runs are triggered, the
   * tools it can use, and whether it is currently enabled for the account.
   */
  definition: AgentsAPI.AgentDefinition | null;

  /**
   * How long the run took, in milliseconds.
   */
  duration_ms: number | null;

  /**
   * Error message if the run failed.
   */
  error_message: string | null;

  /**
   * Input provided to the agent at the start of the run.
   *
   * The shape depends on what started the run; a manually triggered run records
   * `{"message": "<your input>"}`. Encoded as a JSON value (object, array, string,
   * number, boolean, or null), not a JSON-encoded string.
   */
  input: unknown | null;

  /**
   * Resource type identifier.
   */
  object: 'agent_run';

  /**
   * Final output produced by the agent.
   *
   * Present once the agent has produced a result, including on a run that paused for
   * more input or was cancelled part-way through. A run that has not produced one
   * yet carries an empty object. Encoded as a JSON value (object, array, string,
   * number, boolean, or null), not a JSON-encoded string.
   */
  output: unknown | null;

  /**
   * When the run started executing.
   */
  started_at: string | null;

  /**
   * Current run status.
   *
   * - `pending`: queued but not yet started.
   * - `running`: currently executing.
   * - `awaiting_input`: paused, waiting for user input before continuing.
   * - `awaiting_approval`: paused, waiting for a pending action to be approved.
   * - `completed`: finished successfully.
   * - `failed`: stopped after an error; see `error_message`.
   * - `cancelled`: stopped before completion by a user.
   */
  status:
    | 'pending'
    | 'running'
    | 'completed'
    | 'failed'
    | 'cancelled'
    | 'awaiting_input'
    | 'awaiting_approval';

  /**
   * A single page of resources, together with the metadata needed to page through
   * the rest of the result set.
   */
  steps: ListAgentRunStep | null;

  /**
   * How this run was initiated.
   *
   * - `scheduled`: started by the agent's cron schedule.
   * - `event`: started in response to a platform event.
   * - `manual`: started by an explicit request; see `triggered_by`.
   * - `chat`: started by a message in a conversation, with the agent's reply posted
   *   back into that conversation.
   */
  trigger_type: 'scheduled' | 'manual' | 'event' | 'chat';

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  triggered_by: RequestLogsAPI.Actor | null;

  /**
   * When this run was last updated.
   */
  updated_at: string;
}

/**
 * A single event in an agent run's execution timeline.
 */
export interface AgentRunStep {
  /**
   * Agent run step ID.
   */
  id: string;

  /**
   * Reference to an actor — the user, API key, agent, or group identity associated
   * with an action.
   */
  actor: RequestLogsAPI.Actor | null;

  /**
   * Text payload for the step, such as a message body or a tool result.
   */
  content: string | null;

  /**
   * When this step was created.
   */
  created_at: string;

  /**
   * How long this step took, in milliseconds.
   */
  duration_ms: number | null;

  /**
   * Additional structured data for the step.
   *
   * The shape depends on `step_type` — for example a `tool_call` step carries the
   * tool's arguments. Encoded as a JSON value (object, array, string, number,
   * boolean, or null), not a JSON-encoded string.
   */
  metadata: unknown | null;

  /**
   * Resource type identifier.
   */
  object: 'agent_run_step';

  /**
   * Zero-based position of this step within the run's timeline.
   */
  sequence: number;

  /**
   * The kind of timeline event.
   *
   * Common values are `trigger_received`, `user_message`, `thinking`,
   * `assistant_message`, `tool_call`, `tool_result`, `tool_blocked`,
   * `awaiting_approval`, `completion`, and `error`. This is an open set — new step
   * types are added as the agent runtime evolves, so treat unrecognized values as
   * informational rather than failing on them.
   */
  step_type: string;

  /**
   * Short title for the step.
   */
  title: string;
}

/**
 * A single page of resources, together with the metadata needed to page through
 * the rest of the result set.
 */
export interface ListAgentAction {
  /**
   * Resources in this page.
   */
  data: Array<AgentAction>;

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
export interface ListAgentRun {
  /**
   * Resources in this page.
   */
  data: Array<AgentRun>;

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
export interface ListAgentRunStep {
  /**
   * Resources in this page.
   */
  data: Array<AgentRunStep>;

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
 * Request to trigger an agent run.
 */
export interface TriggerRunRequest {
  /**
   * ID of the agent definition to run.
   *
   * The agent must be active for the account; triggering an inactive agent returns a
   * validation error.
   */
  agent_definition_id: string;

  /**
   * Instruction text passed to the agent at the start of the run.
   *
   * Recorded on the run as `{"message": <input>}` in its `input` field.
   */
  input?: string;
}

export interface RunListParams {
  /**
   * Restricts results to runs of a single agent.
   */
  agent_definition_id?: string;

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
  include?: Array<
    'triggered_by' | 'definition' | 'actions' | 'definition.config' | 'definition.tools' | 'definition.role'
  >;

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
   * Restricts results to runs in this status.
   */
  status?:
    | 'pending'
    | 'running'
    | 'completed'
    | 'failed'
    | 'cancelled'
    | 'awaiting_input'
    | 'awaiting_approval';
}

export interface RunRetrieveParams {
  /**
   * Sub-objects to expand in the response. When omitted, sub-objects are returned as
   * `null`.
   */
  include?: Array<
    | 'triggered_by'
    | 'actions'
    | 'definition'
    | 'steps'
    | 'definition.config'
    | 'definition.tools'
    | 'definition.role'
  >;
}

export interface RunCreateParams {
  /**
   * Body param: ID of the agent definition to run.
   *
   * The agent must be active for the account; triggering an inactive agent returns a
   * validation error.
   */
  agent_definition_id: string;

  /**
   * Query param: Sub-objects to expand in the response. When omitted, sub-objects
   * are returned as `null`.
   */
  include?: Array<'actions' | 'definition' | 'definition.config' | 'definition.tools' | 'definition.role'>;

  /**
   * Body param: Instruction text passed to the agent at the start of the run.
   *
   * Recorded on the run as `{"message": <input>}` in its `input` field.
   */
  input?: string;
}

Runs.Actions = Actions;

export declare namespace Runs {
  export {
    type AgentAction as AgentAction,
    type AgentRun as AgentRun,
    type AgentRunStep as AgentRunStep,
    type ListAgentAction as ListAgentAction,
    type ListAgentRun as ListAgentRun,
    type ListAgentRunStep as ListAgentRunStep,
    type TriggerRunRequest as TriggerRunRequest,
    type RunListParams as RunListParams,
    type RunRetrieveParams as RunRetrieveParams,
    type RunCreateParams as RunCreateParams,
  };

  export {
    Actions as Actions,
    type ContinueRunRequest as ContinueRunRequest,
    type ActionCancelParams as ActionCancelParams,
    type ActionContinueParams as ActionContinueParams,
    type ActionRetryParams as ActionRetryParams,
  };
}
