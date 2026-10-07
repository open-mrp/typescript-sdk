// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenMRP from '@openmrp/sdk';

const client = new OpenMRP({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource lines', () => {
  test('create: only required params', async () => {
    const responsePromise = client.sales.salesOrders.lines.create('or_9lqo07quiwyb', {
      metadata: { foo: 'string' },
      product_id: 'pd_07oe0r7adh2w',
      product_sku: 'WIDGET-001',
      quantity: { unit_id: 'un_82bd37dae5po', value: '10' },
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
    const response = await client.sales.salesOrders.lines.create('or_9lqo07quiwyb', {
      metadata: { foo: 'string' },
      product_id: 'pd_07oe0r7adh2w',
      product_sku: 'WIDGET-001',
      quantity: { unit_id: 'un_82bd37dae5po', value: '10' },
      include: ['product'],
      product_description: 'product_description',
      unit_price: {
        denominator_unit_id: 'denominator_unit_id',
        numerator_unit_id: 'numerator_unit_id',
        value: 'value',
      },
    });
  });

  test('update: only required params', async () => {
    const responsePromise = client.sales.salesOrders.lines.update('example', { id: 'or_9lqo07quiwyb' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.sales.salesOrders.lines.update('example', {
      id: 'or_9lqo07quiwyb',
      include: ['product'],
      metadata: { foo: 'string' },
      product_description: 'product_description',
      product_sku: 'product_sku',
      quantity: { unit_id: 'un_82bd37dae5po', value: '20' },
      unit_cost: {
        denominator_unit_id: 'denominator_unit_id',
        numerator_unit_id: 'numerator_unit_id',
        value: 'value',
      },
      unit_price: {
        denominator_unit_id: 'un_82bd37dae5po',
        numerator_unit_id: 'un_82bd37dae5po',
        value: '30.00',
      },
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.sales.salesOrders.lines.delete('example', { id: 'or_9lqo07quiwyb' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.sales.salesOrders.lines.delete('example', { id: 'or_9lqo07quiwyb' });
  });
});
