// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import OpenMRP from '@openmrp/sdk';

const client = new OpenMRP({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource salesOrders', () => {
  test('retrieveStatuses', async () => {
    const responsePromise = client.sales.salesOrders.retrieveStatuses();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieveStatuses: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sales.salesOrders.retrieveStatuses(
        {
          cursor: 'cursor',
          include: ['owner'],
          limit: 0,
          q: 'q',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.sales.salesOrders.list();
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
      client.sales.salesOrders.list(
        {
          cursor: 'cursor',
          customer_group_ids: ['string'],
          customer_ids: ['string'],
          ends_at: 'ends_at',
          include: ['customer'],
          item_ids: ['string'],
          limit: 0,
          past_due: true,
          product_line_ids: ['string'],
          q: 'q',
          sales_rep_ids: ['string'],
          ship_by_after: 'ship_by_after',
          ship_by_before: 'ship_by_before',
          starts_at: 'starts_at',
          status_codes: ['estimate'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('retrieve', async () => {
    const responsePromise = client.sales.salesOrders.retrieve('or_9lqo07quiwyb');
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
      client.sales.salesOrders.retrieve(
        'or_9lqo07quiwyb',
        { include: ['customer'] },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('create: only required params', async () => {
    const responsePromise = client.sales.salesOrders.create({
      buyer_account_id: 'ac_opnlh43ymyee',
      lines: [
        {
          product_id: 'pd_07oe0r7adh2w',
          quantity: { unit_id: 'un_82bd37dae5po', value: '10' },
        },
      ],
      priority_code: 'normal',
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
    const response = await client.sales.salesOrders.create({
      buyer_account_id: 'ac_opnlh43ymyee',
      lines: [
        {
          product_id: 'pd_07oe0r7adh2w',
          quantity: { unit_id: 'un_82bd37dae5po', value: '10' },
          product_description: 'product_description',
          product_sku: 'product_sku',
          unit_price: {
            denominator_unit_id: 'denominator_unit_id',
            numerator_unit_id: 'numerator_unit_id',
            value: 'value',
          },
        },
      ],
      priority_code: 'normal',
      include: ['customer'],
      acknowledgement_email_contacts: [{ account_user_id: 'acus_e5zu8bde0z3h' }],
      bill_to_address: {
        id: 'id',
        country: 'US',
        email: 'email',
        locality: 'Springfield',
        name: 'Receiving dock',
        phone: 'phone',
        postal_code: '62701',
        receive_calendar_id: 'receive_calendar_id',
        state: 'IL',
        street_line_1: '123 Main St',
        street_line_2: 'street_line_2',
        type: 'standard',
      },
      bill_to_address_id: 'ad_npqa5y43q26z',
      carrier_billing_account_number: '123456789',
      carrier_billing_type: 'sender',
      carrier_id: 'cr_tv5vfjtgu1n3',
      customer_purchase_order_number: 'PO-88231',
      invoice_email_contacts: [{ account_user_id: 'acus_e5zu8bde0z3h' }],
      lead_time_override_days: 0,
      note: 'Rush order for trade show',
      order_discount_id: 'ords_qnbrjvq5ih2q',
      payment_term_id: 'pytm_skssmsy21lem',
      promised_at: '2026-05-20T00:00:00Z',
      sales_rep_id: 'acus_e5zu8bde0z3h',
      service_level_id: 'crop_4ilk9p6gccrx',
      ship_by_override_date: '2019-12-27T18:11:19.117Z',
      ship_to_address: {
        id: 'id',
        country: 'US',
        email: 'email',
        locality: 'Springfield',
        name: 'Receiving dock',
        phone: 'phone',
        postal_code: '62701',
        receive_calendar_id: 'receive_calendar_id',
        state: 'IL',
        street_line_1: '123 Main St',
        street_line_2: 'street_line_2',
        type: 'standard',
      },
      ship_to_address_id: 'ad_npqa5y43q26z',
      shipping_term_id: 'shtm_c5gxy05whw6r',
    });
  });

  test('update', async () => {
    const responsePromise = client.sales.salesOrders.update('or_9lqo07quiwyb');
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
      client.sales.salesOrders.update(
        'or_9lqo07quiwyb',
        {
          include: ['customer'],
          acknowledgement_email_contacts: [{ account_user_id: 'account_user_id' }],
          acknowledgment_status: 'not_sent',
          billing_address: {
            id: 'id',
            country: 'US',
            email: 'email',
            locality: 'Springfield',
            name: 'Receiving dock',
            phone: 'phone',
            postal_code: '62701',
            receive_calendar_id: 'receive_calendar_id',
            state: 'IL',
            street_line_1: '123 Main St',
            street_line_2: 'street_line_2',
            type: 'standard',
          },
          billing_address_id: 'billing_address_id',
          carrier_billing_account_number: 'carrier_billing_account_number',
          carrier_billing_type: 'sender',
          carrier_id: 'cr_tv5vfjtgu1n3',
          customer_id: 'customer_id',
          customer_purchase_order_number: 'customer_purchase_order_number',
          invoice_email_contacts: [{ account_user_id: 'account_user_id' }],
          lead_time_override_days: 0,
          note: 'Updated shipping instructions',
          order_discount_id: 'order_discount_id',
          payment_term_id: 'payment_term_id',
          priority_code: 'normal',
          promised_at: '2019-12-27T18:11:19.117Z',
          sales_rep_id: 'sales_rep_id',
          service_level_id: 'service_level_id',
          ship_by_override_date: '2019-12-27T18:11:19.117Z',
          shipping_address: {
            id: 'id',
            country: 'US',
            email: 'email',
            locality: 'Springfield',
            name: 'Receiving dock',
            phone: 'phone',
            postal_code: '62701',
            receive_calendar_id: 'receive_calendar_id',
            state: 'IL',
            street_line_1: '123 Main St',
            street_line_2: 'street_line_2',
            type: 'standard',
          },
          shipping_address_id: 'ad_npqa5y43q26z',
          shipping_term_id: 'shipping_term_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(OpenMRP.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.sales.salesOrders.delete('or_9lqo07quiwyb');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('checkout: only required params', async () => {
    const responsePromise = client.sales.salesOrders.checkout('or_9lqo07quiwyb', {
      email: 'operations@acme.example.com',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('checkout: required and optional params', async () => {
    const response = await client.sales.salesOrders.checkout('or_9lqo07quiwyb', {
      email: 'operations@acme.example.com',
    });
  });

  test('priceQuote: only required params', async () => {
    const responsePromise = client.sales.salesOrders.priceQuote({
      buyer_account_id: 'ac_opnlh43ymyee',
      lines: [
        {
          product_id: 'pd_07oe0r7adh2w',
          quantity: { unit_id: 'un_82bd37dae5po', value: '10' },
        },
      ],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('priceQuote: required and optional params', async () => {
    const response = await client.sales.salesOrders.priceQuote({
      buyer_account_id: 'ac_opnlh43ymyee',
      lines: [
        {
          product_id: 'pd_07oe0r7adh2w',
          quantity: { unit_id: 'un_82bd37dae5po', value: '10' },
        },
      ],
    });
  });
});
