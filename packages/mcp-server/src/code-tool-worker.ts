// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import path from 'node:path';
import util from 'node:util';
import Fuse from 'fuse.js';
import ts from 'typescript';
import { WorkerOutput } from './code-tool-types';
import { OpenMRP, ClientOptions } from '@openmrp/sdk';

async function tseval(code: string) {
  return import('data:application/typescript;charset=utf-8;base64,' + Buffer.from(code).toString('base64'));
}

function getRunFunctionSource(code: string): {
  type: 'declaration' | 'expression';
  client: string | undefined;
  code: string;
} | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);
  const printer = ts.createPrinter();

  for (const statement of sourceFile.statements) {
    // Check for top-level function declarations
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return {
          type: 'declaration',
          client: statement.parameters[0]?.name.getText(),
          code: printer.printNode(ts.EmitHint.Unspecified, statement.body!, sourceFile),
        };
      }
    }

    // Check for variable declarations: const run = () => {} or const run = function() {}
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === 'run' &&
          // Check if it's initialized with a function
          declaration.initializer &&
          (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
        ) {
          return {
            type: 'expression',
            client: declaration.initializer.parameters[0]?.name.getText(),
            code: printer.printNode(ts.EmitHint.Unspecified, declaration.initializer, sourceFile),
          };
        }
      }
    }
  }

  return null;
}

function getTSDiagnostics(code: string): string[] {
  const functionSource = getRunFunctionSource(code)!;
  const codeWithImport = [
    'import { OpenMRP } from "@openmrp/sdk";',
    functionSource.type === 'declaration' ?
      `async function run(${functionSource.client}: OpenMRP)`
    : `const run: (${functionSource.client}: OpenMRP) => Promise<unknown> =`,
    functionSource.code,
  ].join('\n');
  const sourcePath = path.resolve('code.ts');
  const ast = ts.createSourceFile(sourcePath, codeWithImport, ts.ScriptTarget.Latest, true);
  const options = ts.getDefaultCompilerOptions();
  options.target = ts.ScriptTarget.Latest;
  options.module = ts.ModuleKind.NodeNext;
  options.moduleResolution = ts.ModuleResolutionKind.NodeNext;
  const host = ts.createCompilerHost(options, true);
  const newHost: typeof host = {
    ...host,
    getSourceFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return ast;
      }
      return host.getSourceFile(...args);
    },
    readFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return codeWithImport;
      }
      return host.readFile(...args);
    },
    fileExists: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return true;
      }
      return host.fileExists(...args);
    },
  };
  const program = ts.createProgram({
    options,
    rootNames: [sourcePath],
    host: newHost,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program, ast);
  return diagnostics.map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (!d.file || !d.start) return `- ${message}`;
    const { line: lineNumber } = ts.getLineAndCharacterOfPosition(d.file, d.start);
    const line = codeWithImport.split('\n').at(lineNumber)?.trim();
    return line ? `- ${message}\n    ${line}` : `- ${message}`;
  });
}

const fuse = new Fuse(
  [
    'client.auth.apiKeys.create',
    'client.auth.apiKeys.delete',
    'client.auth.apiKeys.list',
    'client.auth.apiKeys.retrieve',
    'client.auth.apiKeys.actions.rotate',
    'client.core.retrieveSearch',
    'client.core.sandboxes.create',
    'client.core.sandboxes.delete',
    'client.core.sandboxes.list',
    'client.core.sandboxes.retrieve',
    'client.core.requestLogs.list',
    'client.core.requestLogs.retrieve',
    'client.core.auditEvents.list',
    'client.core.auditEvents.retrieve',
    'client.core.auditEvents.retrieveResourceTypes',
    'client.core.addresses.retrieveSuggestions',
    'client.core.addresses.actions.validate',
    'client.core.emailLogs.list',
    'client.core.emailLogs.retrieve',
    'client.core.jobs.cancel',
    'client.core.jobs.retrieve',
    'client.core.analytics.updateDeliveryPerformance',
    'client.core.analytics.updateOee',
    'client.core.analytics.updateOeeTrend',
    'client.core.analytics.updateScheduleAttainment',
    'client.core.actions.emailRecord',
    'client.catalog.units.create',
    'client.catalog.units.delete',
    'client.catalog.units.list',
    'client.catalog.units.retrieve',
    'client.catalog.units.update',
    'client.catalog.units.actions.bulkUpsert',
    'client.catalog.unitGroups.create',
    'client.catalog.unitGroups.delete',
    'client.catalog.unitGroups.list',
    'client.catalog.unitGroups.retrieve',
    'client.catalog.unitGroups.update',
    'client.catalog.unitGroups.units.create',
    'client.catalog.unitGroups.units.delete',
    'client.catalog.unitGroups.units.list',
    'client.catalog.unitGroups.units.retrieve',
    'client.catalog.unitGroups.units.update',
    'client.catalog.unitGroups.actions.bulkUpsert',
    'client.catalog.properties.create',
    'client.catalog.properties.delete',
    'client.catalog.properties.list',
    'client.catalog.properties.retrieve',
    'client.catalog.properties.update',
    'client.catalog.properties.attributes.create',
    'client.catalog.properties.attributes.delete',
    'client.catalog.properties.attributes.list',
    'client.catalog.properties.attributes.retrieve',
    'client.catalog.properties.attributes.update',
    'client.catalog.properties.actions.bulkUpsert',
    'client.catalog.items.changeCategory',
    'client.catalog.items.list',
    'client.catalog.items.retrieve',
    'client.catalog.items.retrieveLotDefault',
    'client.catalog.items.inventory.list',
    'client.catalog.items.inventory.update',
    'client.catalog.items.attributes.delete',
    'client.catalog.items.attributes.update',
    'client.catalog.items.actions.bulkReconcile',
    'client.catalog.itemCategories.changeUnitGroup',
    'client.catalog.itemCategories.create',
    'client.catalog.itemCategories.delete',
    'client.catalog.itemCategories.list',
    'client.catalog.itemCategories.retrieve',
    'client.catalog.itemCategories.update',
    'client.catalog.itemCategories.properties.create',
    'client.catalog.itemCategories.properties.delete',
    'client.catalog.itemCategories.properties.update',
    'client.catalog.itemCategories.actions.bulkUpsert',
    'client.catalog.materials.create',
    'client.catalog.materials.delete',
    'client.catalog.materials.list',
    'client.catalog.materials.retrieve',
    'client.catalog.materials.update',
    'client.catalog.materials.actions.bulkUpsert',
    'client.catalog.parts.create',
    'client.catalog.parts.delete',
    'client.catalog.parts.list',
    'client.catalog.parts.retrieve',
    'client.catalog.parts.update',
    'client.catalog.parts.actions.bulkUpsert',
    'client.catalog.productLines.create',
    'client.catalog.productLines.delete',
    'client.catalog.productLines.list',
    'client.catalog.productLines.retrieve',
    'client.catalog.productLines.update',
    'client.catalog.productLines.actions.bulkUpsert',
    'client.catalog.products.changeProductLine',
    'client.catalog.products.create',
    'client.catalog.products.delete',
    'client.catalog.products.list',
    'client.catalog.products.retrieve',
    'client.catalog.products.update',
    'client.catalog.products.actions.bulkUpsert',
    'client.ai.retrieveToolGroups',
    'client.ai.retrieveTools',
    'client.ai.agents.create',
    'client.ai.agents.delete',
    'client.ai.agents.list',
    'client.ai.agents.retrieve',
    'client.ai.agents.update',
    'client.ai.agents.updateStatus',
    'client.ai.runs.create',
    'client.ai.runs.list',
    'client.ai.runs.retrieve',
    'client.ai.runs.actions.cancel',
    'client.ai.runs.actions.continue',
    'client.ai.runs.actions.retry',
    'client.ai.memories.create',
    'client.ai.memories.delete',
    'client.ai.memories.list',
    'client.ai.memories.retrieve',
    'client.ai.memories.update',
    'client.messaging.retrieveContacts',
    'client.messaging.notifications.create',
    'client.messaging.notifications.list',
    'client.messaging.notifications.retrieve',
    'client.messaging.notifications.retrieveUnreadCount',
    'client.messaging.notifications.retrieveUnreadSummary',
    'client.messaging.notifications.actions.dismiss',
    'client.messaging.notifications.actions.markAllSeen',
    'client.messaging.notifications.actions.read',
    'client.messaging.notifications.actions.seen',
    'client.messaging.announcements.list',
    'client.messaging.announcements.retrieve',
    'client.messaging.announcements.actions.dismiss',
    'client.messaging.announcements.actions.read',
    'client.messaging.announcements.actions.seen',
    'client.messaging.conversations.create',
    'client.messaging.conversations.list',
    'client.messaging.conversations.retrieve',
    'client.messaging.conversations.update',
    'client.messaging.conversations.actions.archive',
    'client.messaging.conversations.actions.assign',
    'client.messaging.conversations.actions.hide',
    'client.messaging.conversations.actions.leave',
    'client.messaging.conversations.actions.mute',
    'client.messaging.conversations.actions.read',
    'client.messaging.conversations.actions.redact',
    'client.messaging.conversations.actions.report',
    'client.messaging.conversations.actions.setLegalHold',
    'client.messaging.conversations.actions.setStatus',
    'client.messaging.conversations.actions.unarchive',
    'client.messaging.conversations.actions.unhide',
    'client.messaging.conversations.actions.unmute',
    'client.messaging.conversations.links.create',
    'client.messaging.conversations.links.delete',
    'client.messaging.conversations.links.list',
    'client.messaging.conversations.messages.create',
    'client.messaging.conversations.messages.list',
    'client.messaging.conversations.participants.create',
    'client.messaging.conversations.participants.delete',
    'client.messaging.conversations.participants.actions.setRole',
    'client.messaging.conversations.attachments.actions.uploadURL',
    'client.messaging.messages.update',
    'client.messaging.messages.actions.approveSend',
    'client.messaging.messages.actions.cancel',
    'client.messaging.messages.actions.reject',
    'client.messaging.messages.actions.reschedule',
    'client.messaging.groups.create',
    'client.messaging.groups.delete',
    'client.messaging.groups.list',
    'client.messaging.groups.retrieve',
    'client.messaging.groups.update',
    'client.messaging.groups.members.create',
    'client.messaging.groups.members.delete',
    'client.messaging.blocks.create',
    'client.messaging.blocks.delete',
    'client.messaging.blocks.list',
    'client.messaging.preferences.list',
    'client.messaging.preferences.update',
    'client.messaging.emailDomains.create',
    'client.messaging.emailDomains.delete',
    'client.messaging.emailDomains.list',
    'client.messaging.emailDomains.retrieve',
    'client.messaging.emailDomains.actions.verify',
    'client.messaging.emailInboxes.create',
    'client.messaging.emailInboxes.delete',
    'client.messaging.emailInboxes.list',
    'client.messaging.emailInboxes.retrieve',
    'client.messaging.emailInboxes.update',
    'client.messaging.emailSender.delete',
    'client.messaging.emailSender.list',
    'client.messaging.emailSender.update',
    'client.sales.accountGroups.create',
    'client.sales.accountGroups.delete',
    'client.sales.accountGroups.list',
    'client.sales.accountGroups.retrieve',
    'client.sales.accountGroups.update',
    'client.sales.accountPrices.create',
    'client.sales.accountPrices.delete',
    'client.sales.accountPrices.list',
    'client.sales.accountPrices.retrieve',
    'client.sales.accountPrices.update',
    'client.sales.accountPrices.actions.exportPriceList',
    'client.sales.addresses.create',
    'client.sales.addresses.delete',
    'client.sales.addresses.list',
    'client.sales.addresses.retrieve',
    'client.sales.addresses.update',
    'client.sales.accountStatuses.list',
    'client.sales.accountStatuses.retrieve',
    'client.sales.accountUsers.salesTargets.create',
    'client.sales.accountUsers.salesTargets.list',
    'client.sales.accountUsers.salesTargets.update',
    'client.sales.priorities.list',
    'client.sales.priorities.retrieve',
    'client.sales.customers.create',
    'client.sales.customers.delete',
    'client.sales.customers.list',
    'client.sales.customers.retrieve',
    'client.sales.customers.retrieveLeadTime',
    'client.sales.customers.update',
    'client.sales.customers.actions.merge',
    'client.sales.contacts.actions.findByEmail',
    'client.sales.orderDiscounts.create',
    'client.sales.orderDiscounts.delete',
    'client.sales.orderDiscounts.list',
    'client.sales.orderDiscounts.retrieve',
    'client.sales.orderDiscounts.update',
    'client.sales.orderDiscounts.actions.findByCode',
    'client.sales.salesOrders.checkout',
    'client.sales.salesOrders.create',
    'client.sales.salesOrders.delete',
    'client.sales.salesOrders.list',
    'client.sales.salesOrders.priceQuote',
    'client.sales.salesOrders.retrieve',
    'client.sales.salesOrders.retrieveStatuses',
    'client.sales.salesOrders.update',
    'client.sales.salesOrders.actions.bulkDelete',
    'client.sales.salesOrders.actions.close',
    'client.sales.salesOrders.actions.createProductionRun',
    'client.sales.salesOrders.actions.issue',
    'client.sales.salesOrders.actions.open',
    'client.sales.salesOrders.actions.quoteCommitment',
    'client.sales.salesOrders.actions.quoteFreight',
    'client.sales.salesOrders.actions.unissue',
    'client.sales.salesOrders.lines.create',
    'client.sales.salesOrders.lines.delete',
    'client.sales.salesOrders.lines.update',
    'client.sales.salesOrders.lines.actions.reorder',
    'client.sales.volumeDiscounts.create',
    'client.sales.volumeDiscounts.delete',
    'client.sales.volumeDiscounts.list',
    'client.sales.volumeDiscounts.retrieve',
    'client.sales.volumeDiscounts.update',
    'client.finance.retrieveAdjustmentTypes',
    'client.finance.retrieveTransactionMethods',
    'client.finance.retrieveTransactionTypes',
    'client.finance.paymentTerms.create',
    'client.finance.paymentTerms.delete',
    'client.finance.paymentTerms.list',
    'client.finance.paymentTerms.retrieve',
    'client.finance.paymentTerms.update',
    'client.operations.retrieveDemandOverrideTypes',
    'client.operations.retrieveMachineDowntimeReasons',
    'client.operations.retrieveMachineStatus',
    'client.operations.retrieveScheduleDeviationTypes',
    'client.operations.shippingTerms.create',
    'client.operations.shippingTerms.delete',
    'client.operations.shippingTerms.list',
    'client.operations.shippingTerms.retrieve',
    'client.operations.shippingTerms.update',
    'client.operations.carriers.create',
    'client.operations.carriers.delete',
    'client.operations.carriers.list',
    'client.operations.carriers.retrieve',
    'client.operations.carriers.update',
    'client.operations.carriers.serviceLevels.create',
    'client.operations.carriers.serviceLevels.delete',
    'client.operations.carriers.serviceLevels.list',
    'client.operations.carriers.serviceLevels.retrieve',
    'client.operations.carriers.serviceLevels.update',
    'client.operations.departments.create',
    'client.operations.departments.delete',
    'client.operations.departments.list',
    'client.operations.departments.retrieve',
    'client.operations.departments.update',
    'client.operations.inventoryChangeLogs.list',
    'client.operations.inventoryChangeLogs.retrieve',
    'client.operations.inventoryChangeLogs.actions.export',
    'client.operations.inventoryChangeLogs.actions.startExport',
    'client.operations.machines.create',
    'client.operations.machines.delete',
    'client.operations.machines.list',
    'client.operations.machines.retrieve',
    'client.operations.machines.update',
    'client.operations.machineDowntimeEvents.create',
    'client.operations.machineDowntimeEvents.delete',
    'client.operations.machineDowntimeEvents.list',
    'client.operations.machineDowntimeEvents.retrieve',
    'client.operations.machineDowntimeEvents.update',
    'client.operations.demandOverrides.create',
    'client.operations.demandOverrides.delete',
    'client.operations.demandOverrides.list',
    'client.operations.demandOverrides.retrieve',
    'client.operations.demandOverrides.update',
    'client.operations.productionSchedules.create',
    'client.operations.productionSchedules.delete',
    'client.operations.productionSchedules.list',
    'client.operations.productionSchedules.retrieve',
    'client.operations.productionSchedules.retrieveAtRiskOrders',
    'client.operations.productionSchedules.retrieveCurrent',
    'client.operations.productionSchedules.retrieveDerivedLines',
    'client.operations.productionSchedules.retrieveDeviations',
    'client.operations.productionSchedules.retrieveFinishedPolicies',
    'client.operations.productionSchedules.retrieveFinishingLines',
    'client.operations.productionSchedules.retrieveItemPolicies',
    'client.operations.productionSchedules.retrieveWeekReleasePreview',
    'client.operations.productionSchedules.lines.create',
    'client.operations.productionSchedules.lines.delete',
    'client.operations.productionSchedules.lines.list',
    'client.operations.productionSchedules.lines.update',
    'client.operations.productionSchedules.actions.archive',
    'client.operations.productionSchedules.actions.preview',
    'client.operations.productionSchedules.actions.previewRegenerate',
    'client.operations.productionSchedules.actions.publish',
    'client.operations.productionSchedules.actions.regenerate',
    'client.operations.productionSchedules.actions.releaseWeek',
    'client.operations.productionScheduleSettings.list',
    'client.operations.productionScheduleSettings.update',
    'client.operations.productionScheduleSettings.resources.delete',
    'client.operations.productionScheduleSettings.resources.list',
    'client.operations.productionScheduleSettings.resources.update',
    'client.operations.productionScheduleSettings.items.delete',
    'client.operations.productionScheduleSettings.items.list',
    'client.operations.productionScheduleSettings.items.retrieve',
    'client.operations.productionScheduleSettings.items.update',
    'client.operations.fulfillmentRecommendations.list',
    'client.operations.fulfillmentRecommendations.actions.apply',
    'client.operations.operatingCalendars.create',
    'client.operations.operatingCalendars.delete',
    'client.operations.operatingCalendars.list',
    'client.operations.operatingCalendars.retrieve',
    'client.operations.operatingCalendars.update',
    'client.operations.operatingCalendars.closures.create',
    'client.operations.operatingCalendars.closures.delete',
    'client.operations.operatingCalendars.closures.list',
    'client.operations.picks.list',
    'client.operations.picks.retrieve',
    'client.operations.picks.actions.pack',
    'client.operations.picks.actions.pick',
    'client.operations.picks.actions.void',
    'client.operations.picks.lines.update',
    'client.operations.picks.lines.actions.pick',
    'client.operations.picks.lines.actions.void',
    'client.operations.locations.create',
    'client.operations.locations.delete',
    'client.operations.locations.list',
    'client.operations.locations.retrieve',
    'client.operations.locations.update',
    'client.operations.locations.actions.bulkUpsert',
    'client.operations.locationTypes.list',
    'client.operations.locationTypes.retrieve',
    'client.operations.shipments.actions.rateShop',
    'client.operations.scanningStations.create',
    'client.operations.scanningStations.delete',
    'client.operations.scanningStations.list',
    'client.operations.scanningStations.retrieve',
    'client.operations.scanningStations.update',
    'client.identity.retrievePermissionGroups',
    'client.identity.accountUsers.create',
    'client.identity.accountUsers.list',
    'client.identity.accountUsers.retrieve',
    'client.identity.accountUsers.update',
    'client.identity.accountUsers.actions.activate',
    'client.identity.accountUsers.actions.disable',
    'client.identity.accountUsers.actions.remove',
    'client.identity.accounts.updateFavicon',
    'client.identity.roles.create',
    'client.identity.roles.delete',
    'client.identity.roles.list',
    'client.identity.roles.retrieve',
    'client.identity.roles.update',
    'client.settings.portalDomains.create',
    'client.settings.portalDomains.delete',
    'client.settings.portalDomains.list',
    'client.settings.portalDomains.retrieve',
    'client.settings.portalDomains.actions.verify',
    'client.settings.integrations.create',
    'client.settings.integrations.delete',
    'client.settings.integrations.list',
    'client.settings.integrations.update',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          // If we're accessing a path that doesn't exist, it will probably eventually error.
          // Let's proxy it and mark it bad so that we can control the error message.
          // We proxy an empty class so that an invocation or construction attempt is possible.
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

function parseError(code: string, error: unknown): string | undefined {
  if (!(error instanceof Error)) return;
  const cause = error.cause instanceof Error ? `: ${error.cause.message}` : '';
  const message = error.name ? `${error.name}: ${error.message}${cause}` : `${error.message}${cause}`;
  try {
    // Deno uses V8; the first "<anonymous>:LINE:COLUMN" is the top of stack.
    const lineNumber = error.stack?.match(/<anonymous>:([0-9]+):[0-9]+/)?.[1];
    // -1 for the zero-based indexing
    const line =
      lineNumber &&
      code
        .split('\n')
        .at(parseInt(lineNumber, 10) - 1)
        ?.trim();
    return line ? `${message}\n  at line ${lineNumber}\n    ${line}` : message;
  } catch {
    return message;
  }
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as { opts: ClientOptions; code: string };

  const runFunctionSource = code ? getRunFunctionSource(code) : null;
  if (!runFunctionSource) {
    const message =
      code ?
        'The code is missing a top-level `run` function.'
      : 'The code argument is missing. Provide one containing a top-level `run` function.';
    return Response.json(
      {
        is_error: true,
        result: `${message} Write code within this template:\n\n\`\`\`\nasync function run(client) {\n  // Fill this out\n}\n\`\`\``,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const diagnostics = getTSDiagnostics(code);
  if (diagnostics.length > 0) {
    return Response.json(
      {
        is_error: true,
        result: `The code contains TypeScript diagnostics:\n${diagnostics.join('\n')}`,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const client = new OpenMRP({
    ...opts,
  });

  const log_lines: string[] = [];
  const err_lines: string[] = [];
  const originalConsole = globalThis.console;
  globalThis.console = {
    ...originalConsole,
    log: (...args: unknown[]) => {
      log_lines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      err_lines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (client: any) => {};
    run_ = (await tseval(`${code}\nexport default run;`)).default;
    const result = await run_(makeSdkProxy(client, { path: ['client'] }));
    return Response.json({
      is_error: false,
      result,
      log_lines,
      err_lines,
    } satisfies WorkerOutput);
  } catch (e) {
    return Response.json(
      {
        is_error: true,
        result: parseError(code, e),
        log_lines,
        err_lines,
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  } finally {
    globalThis.console = originalConsole;
  }
};

export default { fetch };
