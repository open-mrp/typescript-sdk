// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenMRP from '@openmrp/sdk';

const client = new OpenMRP({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource actions', () => {
  test('approveSend: only required params', async () => {
    const responsePromise = client.messaging.messages.actions.approveSend('mg_fdny8633ebgw', {
      client_message_id: 'client_msg_approve_7b1c',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('approveSend: required and optional params', async () => {
    const response = await client.messaging.messages.actions.approveSend('mg_fdny8633ebgw', {
      client_message_id: 'client_msg_approve_7b1c',
      include: ['sender'],
    });
  });

  test('reject', async () => {
    const responsePromise = client.messaging.messages.actions.reject('mg_fdny8633ebgw');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reject: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.messaging.messages.actions.reject(
        'mg_fdny8633ebgw',
        { include: ['sender'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('cancel', async () => {
    const responsePromise = client.messaging.messages.actions.cancel('mg_fdny8633ebgw');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.messaging.messages.actions.cancel(
        'mg_fdny8633ebgw',
        { include: ['sender'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('reschedule: only required params', async () => {
    const responsePromise = client.messaging.messages.actions.reschedule('mg_fdny8633ebgw', {
      scheduled_at: '2026-03-02T14:00:00Z',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('reschedule: required and optional params', async () => {
    const response = await client.messaging.messages.actions.reschedule('mg_fdny8633ebgw', {
      scheduled_at: '2026-03-02T14:00:00Z',
      include: ['sender'],
      body: 'Reminder: the line goes down for maintenance at 6pm.',
    });
  });
});
