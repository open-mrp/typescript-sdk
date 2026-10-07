// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenMRP from '@openmrp/sdk';

const client = new OpenMRP({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource parts', () => {
  test('list', async () => {
    const responsePromise = client.catalog.parts.list();
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
      client.catalog.parts.list(
        {
          attribute_ids: ['string'],
          category_ids: ['string'],
          cursor: 'cursor',
          ends_at: '2019-12-27T18:11:19.117Z',
          include: ['item'],
          limit: 0,
          q: 'q',
          starts_at: '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('retrieve', async () => {
    const responsePromise = client.catalog.parts.retrieve('pt_coba9fgvd84c');
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
      client.catalog.parts.retrieve(
        'pt_coba9fgvd84c',
        { include: ['item'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.catalog.parts.create({
      category_id: 'ic_d06g9c6yc9ck',
      sku: 'BRG-6204-2RS',
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
    const response = await client.catalog.parts.create({
      category_id: 'ic_d06g9c6yc9ck',
      sku: 'BRG-6204-2RS',
      include: ['item'],
      attribute_ids: ['at_rf1w295jt5ia'],
      description: 'Deep groove ball bearing, 20x47x14mm',
      notes: 'OEM-equivalent; verify shielding type before substitution.',
      unit_cost: {
        denominator_unit_id: 'un_82bd37dae5po',
        numerator_unit_id: 'un_82bd37dae5po',
        value: '9.40',
      },
      unit_price: {
        denominator_unit_id: 'un_82bd37dae5po',
        numerator_unit_id: 'un_82bd37dae5po',
        value: '14.99',
      },
    });
  });

  test('update', async () => {
    const responsePromise = client.catalog.parts.update('pt_coba9fgvd84c');
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
      client.catalog.parts.update(
        'pt_coba9fgvd84c',
        {
          include: ['item'],
          category_id: 'ic_d06g9c6yc9ck',
          description: 'Deep groove ball bearing, 20x47x14mm',
          notes: 'Superseded by low-friction variant; keep for legacy assemblies.',
          sku: 'BRG-6204-2RS',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.catalog.parts.delete('pt_coba9fgvd84c');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
