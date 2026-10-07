// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenMRP from '@openmrp/sdk';

const client = new OpenMRP({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource conversations', () => {
  test('create: only required params', async () => {
    const responsePromise = client.messaging.conversations.create({
      participant_account_user_ids: ['acus_e5zu8bde0z3h'],
      type: 'group',
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
    const response = await client.messaging.conversations.create({
      participant_account_user_ids: ['acus_e5zu8bde0z3h'],
      type: 'group',
      include: ['assignee'],
      group_id: 'cvgp_wjlypugna7s4',
      participants: [{ account_user_id: 'acus_e5zu8bde0z3h', role: 'admin' }],
      title: 'Order #1042 — shipping question',
      topic_resource_id: 'or_9lqo07quiwyb',
      topic_resource_type: 'sales_order',
    });
  });

  test('list', async () => {
    const responsePromise = client.messaging.conversations.list();
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
      client.messaging.conversations.list(
        {
          assignee_resource_id: 'assignee_resource_id',
          audience: 'internal',
          cursor: 'cursor',
          include: ['assignee'],
          include_archived: true,
          limit: 0,
          q: 'q',
          status: 'active',
          topic_resource_id: 'topic_resource_id',
          topic_resource_type: 'account',
          type: 'direct_message',
          unassigned: true,
          workflow_status: 'new',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('retrieve', async () => {
    const responsePromise = client.messaging.conversations.retrieve('cv_w35z4ck68yq7');
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
      client.messaging.conversations.retrieve(
        'cv_w35z4ck68yq7',
        { include: ['assignee'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('update', async () => {
    const responsePromise = client.messaging.conversations.update('cv_w35z4ck68yq7');
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
      client.messaging.conversations.update(
        'cv_w35z4ck68yq7',
        { include: ['assignee'], title: 'Fulfillment war room' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });
});
