// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenMRP from '@openmrp/sdk';

const client = new OpenMRP({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource materials', () => {
  test('list', async () => {
    const responsePromise = client.catalog.materials.list();
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
      client.catalog.materials.list(
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
    const responsePromise = client.catalog.materials.retrieve('ml_ow202v78slbl');
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
      client.catalog.materials.retrieve(
        'ml_ow202v78slbl',
        { include: ['item'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.catalog.materials.create({
      category_id: 'ic_d06g9c6yc9ck',
      sku: 'MAT-001',
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
    const response = await client.catalog.materials.create({
      category_id: 'ic_d06g9c6yc9ck',
      sku: 'MAT-001',
      include: ['item'],
      attribute_ids: ['at_rf1w295jt5ia'],
      description: 'Cold-rolled 304 stainless steel sheet, 1.5mm',
      lead_time: { unit_id: 'un_82bd37dae5po', value: '7.00' },
      notes: 'Store flat in a dry area to avoid surface oxidation.',
      order_point: { unit_id: 'un_82bd37dae5po', value: '100.00' },
      unit_cost: {
        denominator_unit_id: 'un_82bd37dae5po',
        numerator_unit_id: 'un_82bd37dae5po',
        value: '8.25',
      },
      unit_price: {
        denominator_unit_id: 'un_82bd37dae5po',
        numerator_unit_id: 'un_82bd37dae5po',
        value: '12.50',
      },
    });
  });

  test('update', async () => {
    const responsePromise = client.catalog.materials.update('ml_ow202v78slbl');
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
      client.catalog.materials.update(
        'ml_ow202v78slbl',
        {
          include: ['item'],
          category_id: 'ic_d06g9c6yc9ck',
          description: 'Cold-rolled 304 stainless steel sheet, 2.0mm',
          lead_time: { unit_id: 'un_82bd37dae5po', value: '10.00' },
          notes: 'Reorder point raised after Q2 demand spike.',
          order_point: { unit_id: 'un_82bd37dae5po', value: '150.00' },
          sku: 'MAT-001-UPDATED',
          unit_cost: {
            denominator_unit_id: 'un_82bd37dae5po',
            numerator_unit_id: 'un_82bd37dae5po',
            value: '9.10',
          },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.catalog.materials.delete('ml_ow202v78slbl');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
