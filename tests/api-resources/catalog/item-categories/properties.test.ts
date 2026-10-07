// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenMRP from '@openmrp/sdk';

const client = new OpenMRP({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource properties', () => {
  test('update: only required params', async () => {
    const responsePromise = client.catalog.itemCategories.properties.update('pp_fhnnvtt3q3ov', {
      id: 'ic_d06g9c6yc9ck',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.catalog.itemCategories.properties.update('pp_fhnnvtt3q3ov', {
      id: 'ic_d06g9c6yc9ck',
    });
  });

  test('create: only required params', async () => {
    const responsePromise = client.catalog.itemCategories.properties.create('ic_d06g9c6yc9ck', {
      name: 'Color',
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
    const response = await client.catalog.itemCategories.properties.create('ic_d06g9c6yc9ck', {
      name: 'Color',
      include: ['attributes'],
    });
  });

  test('delete: only required params', async () => {
    const responsePromise = client.catalog.itemCategories.properties.delete('pp_fhnnvtt3q3ov', {
      id: 'ic_d06g9c6yc9ck',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.catalog.itemCategories.properties.delete('pp_fhnnvtt3q3ov', {
      id: 'ic_d06g9c6yc9ck',
    });
  });
});
