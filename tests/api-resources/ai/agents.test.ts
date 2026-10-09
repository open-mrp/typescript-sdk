// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenMRP from '@openmrp/sdk';

const client = new OpenMRP({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agents', () => {
  test('create: only required params', async () => {
    const responsePromise = client.ai.agents.create({
      category_code: 'inventory',
      config: {},
      name: 'Inventory Monitor',
      slug: 'inventory_monitor',
      trigger_type: 'event',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.ai.agents.create({
      category_code: 'inventory',
      config: {
        endpoint_tool_review: { foo: true },
        endpoint_tool_slugs: ['string'],
        max_steps: 0,
        system_prompt: 'You are an order processing agent. Parse incoming emails and create draft orders.',
        temperature: 0.2,
        tier: 'high',
        trigger_config: {
          cron_schedule: 'cron_schedule',
          event_filters: ['email.received'],
          timezone: 'timezone',
        },
      },
      name: 'Inventory Monitor',
      slug: 'inventory_monitor',
      trigger_type: 'event',
      include: ['config'],
      description: 'Monitors inventory levels and creates restock alerts.',
      role_id: 'rl_3xknmfqflhvb',
      tools: [
        {
          tool: 'read_doc',
          config_json: 'config_json',
          require_review: true,
          sort_order: 1,
        },
      ],
    });
  });

  test('list', async () => {
    const responsePromise = client.ai.agents.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.ai.agents.list(
        {
          cursor: 'cursor',
          definition_types: ['system'],
          include: ['config'],
          limit: 0,
          q: 'q',
          statuses: ['active'],
          trigger_types: ['scheduled'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('retrieve', async () => {
    const responsePromise = client.ai.agents.retrieve('agdf_ah7tkyfxk8jl');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.ai.agents.retrieve(
        'agdf_ah7tkyfxk8jl',
        { include: ['config'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.ai.agents.update('agdf_ah7tkyfxk8jl');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.ai.agents.update(
        'agdf_ah7tkyfxk8jl',
        {
          include: ['config'],
          category_code: 'category_code',
          config: {
            endpoint_tool_review: { foo: true },
            endpoint_tool_slugs: ['string'],
            max_steps: 0,
            system_prompt:
              'You are an order processing agent. Parse incoming emails and create draft orders.',
            temperature: 0.2,
            tier: 'high',
            trigger_config: {
              cron_schedule: 'cron_schedule',
              event_filters: ['email.received'],
              timezone: 'timezone',
            },
          },
          description: 'description',
          name: 'Inventory Monitor',
          role_id: 'role_id',
          slug: 'slug',
          tools: [
            {
              tool: 'read_doc',
              config_json: 'config_json',
              require_review: true,
              sort_order: 1,
            },
          ],
          trigger_type: 'scheduled',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.ai.agents.delete('agdf_ah7tkyfxk8jl');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateStatus: only required params', async () => {
    const responsePromise = client.ai.agents.updateStatus('agdf_ah7tkyfxk8jl', { status: 'active' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateStatus: required and optional params', async () => {
    const response = await client.ai.agents.updateStatus('agdf_ah7tkyfxk8jl', {
      status: 'active',
      include: ['config'],
    });
  });
});
