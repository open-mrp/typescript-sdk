// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenMRP from '@openmrp/sdk';

const client = new OpenMRP({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customers', () => {
  test('list', async () => {
    const responsePromise = client.sales.customers.list();
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
      client.sales.customers.list(
        {
          carrier_ids: ['string'],
          city: 'city',
          commission_status_codes: ['commission_applied'],
          cursor: 'cursor',
          customer_group_ids: ['string'],
          ends_at: '2019-12-27T18:11:19.117Z',
          freight_status_codes: ['free_freight'],
          include: ['bill_to_address'],
          limit: 0,
          parent_account_status: 'parent',
          payment_term_ids: ['string'],
          postal_code: 'postal_code',
          pricing_group_ids: ['string'],
          q: 'q',
          sales_rep_ids: ['string'],
          service_level_ids: ['string'],
          shipping_term_ids: ['string'],
          starts_at: '2019-12-27T18:11:19.117Z',
          state: 'state',
          status_codes: ['normal'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('retrieve', async () => {
    const responsePromise = client.sales.customers.retrieve('ac_opnlh43ymyee');
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
      client.sales.customers.retrieve(
        'ac_opnlh43ymyee',
        { include: ['bill_to_address'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.sales.customers.create({
      bill_to_address: { country: 'US', name: 'Acme Inc.' },
      customer_type_group_id: 'acgp_6p4z57e9alaf',
      default_carrier_id: 'cr_tv5vfjtgu1n3',
      default_payment_term_id: 'pytm_skssmsy21lem',
      default_shipping_term_id: 'shtm_c5gxy05whw6r',
      name: 'Acme Inc.',
      ship_to_address: { country: 'US', name: 'Acme Inc.' },
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
    const response = await client.sales.customers.create({
      bill_to_address: {
        country: 'US',
        name: 'Acme Inc.',
        email: 'warehouse@acme.com',
        locality: 'New York',
        phone: '555-123-4567',
        postal_code: '10001',
        receive_calendar_id: 'receive_calendar_id',
        state: 'NY',
        street_line_1: '123 Main St',
        street_line_2: 'Suite 400',
        type: 'standard',
      },
      customer_type_group_id: 'acgp_6p4z57e9alaf',
      default_carrier_id: 'cr_tv5vfjtgu1n3',
      default_payment_term_id: 'pytm_skssmsy21lem',
      default_shipping_term_id: 'shtm_c5gxy05whw6r',
      name: 'Acme Inc.',
      ship_to_address: {
        country: 'US',
        name: 'Acme Inc.',
        email: 'warehouse@acme.com',
        locality: 'New York',
        phone: '555-123-4567',
        postal_code: '10001',
        receive_calendar_id: 'receive_calendar_id',
        state: 'NY',
        street_line_1: '123 Main St',
        street_line_2: 'Suite 400',
        type: 'standard',
      },
      include: ['bill_to_address'],
      carrier_billing_account: '123456789',
      carrier_billing_type: 'sender',
      commission_policy: 'commission_applied',
      credit_limit: { unit_id: 'un_82bd37dae5po', value: '10000.00' },
      customer_price_group_ids: ['acgp_6p4z57e9alaf'],
      default_priority: 'normal',
      default_sales_rep_id: 'acus_e5zu8bde0z3h',
      default_service_level_id: 'crop_4ilk9p6gccrx',
      email: 'orders@acme.com',
      freight_policy: 'billed_freight',
      fulfillment_policy: 'make_to_order',
      lead_time_days: 0,
      note: 'Key enterprise account',
      number: '100042',
      phone: '555-123-4567',
      receive_calendar_id: 'receive_calendar_id',
      status: 'normal',
      url: 'https://acme.com',
    });
  });

  test('update', async () => {
    const responsePromise = client.sales.customers.update('ac_opnlh43ymyee');
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
      client.sales.customers.update(
        'ac_opnlh43ymyee',
        {
          include: ['bill_to_address'],
          bill_to_address_id: 'ad_npqa5y43q26z',
          carrier_billing_account: '123456789',
          carrier_billing_type: 'sender',
          commission_policy: 'commission_applied',
          credit_limit: { unit_id: 'un_82bd37dae5po', value: '10000.00' },
          customer_price_group_ids: ['acgp_6p4z57e9alaf'],
          customer_type_group_id: 'acgp_6p4z57e9alaf',
          default_carrier_id: 'cr_tv5vfjtgu1n3',
          default_payment_term_id: 'pytm_skssmsy21lem',
          default_priority: 'normal',
          default_sales_rep_id: 'acus_e5zu8bde0z3h',
          default_service_level_id: 'crop_4ilk9p6gccrx',
          default_shipping_term_id: 'shtm_c5gxy05whw6r',
          email: 'orders@acme.com',
          freight_policy: 'billed_freight',
          fulfillment_policy: 'make_to_order',
          lead_time_days: 0,
          name: 'Acme Corp Updated',
          note: 'Updated account notes',
          number: '100042',
          phone: '555-123-4567',
          receive_calendar_id: 'receive_calendar_id',
          ship_to_address_id: 'ad_npqa5y43q26z',
          status: 'normal',
          url: 'https://acme.com',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.sales.customers.delete('ac_opnlh43ymyee');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveLeadTime', async () => {
    const responsePromise = client.sales.customers.retrieveLeadTime('ac_opnlh43ymyee');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveLeadTime: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sales.customers.retrieveLeadTime(
        'ac_opnlh43ymyee',
        { include: ['account_group'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });
});
