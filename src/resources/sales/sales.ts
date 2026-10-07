// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AccountGroupsAPI from './account-groups';
import {
  AccountGroup,
  AccountGroupCreateParams,
  AccountGroupDeleteResponse,
  AccountGroupListParams,
  AccountGroupUpdateParams,
  AccountGroups,
  CreateAccountGroupRequest,
  ListAccountGroup,
  UpdateAccountGroupRequest,
} from './account-groups';
import * as AccountStatusesAPI from './account-statuses';
import {
  AccountStatus,
  AccountStatusListParams,
  AccountStatusRetrieveParams,
  AccountStatuses,
  ListAccountStatus,
} from './account-statuses';
import * as AddressesAPI from './addresses';
import {
  AddressCreateParams,
  AddressDeleteResponse,
  AddressInput,
  AddressListParams,
  AddressUpdateParams,
  Addresses,
  ListAddress,
  UpdateAddressRequest,
} from './addresses';
import * as PrioritiesAPI from './priorities';
import { ListPriority, Priorities, PriorityListParams, PriorityRetrieveParams } from './priorities';
import * as VolumeDiscountsAPI from './volume-discounts';
import {
  CreateVolumeDiscountRequest,
  CreateVolumeDiscountTierInput,
  ListVolumeDiscount,
  ListVolumeDiscountTier,
  UpdateVolumeDiscountRequest,
  UpdateVolumeDiscountTierInput,
  VolumeDiscount,
  VolumeDiscountCreateParams,
  VolumeDiscountDeleteResponse,
  VolumeDiscountListParams,
  VolumeDiscountRetrieveParams,
  VolumeDiscountTier,
  VolumeDiscountUpdateParams,
  VolumeDiscounts,
} from './volume-discounts';
import * as AccountPricesAPI from './account-prices/account-prices';
import {
  AccountPrice,
  AccountPriceCreateParams,
  AccountPriceDeleteResponse,
  AccountPriceListParams,
  AccountPriceRetrieveParams,
  AccountPriceUpdateParams,
  AccountPrices,
  Carrier,
  CreateAccountPriceRequest,
  Customer,
  CustomerContactInfo,
  CustomerDefaults,
  CustomerFreightPreferences,
  CustomerNotificationPreferences,
  ListAccountPrice,
  ListCustomer,
  ListServiceLevel,
  PaymentTerm,
  Priority,
  ServiceLevel,
  ShippingTerm,
  UpdateAccountPriceRequest,
} from './account-prices/account-prices';
import * as AccountUsersAPI from './account-users/account-users';
import { AccountUsers } from './account-users/account-users';
import * as ContactsAPI from './contacts/contacts';
import { Contacts } from './contacts/contacts';
import * as CustomersAPI from './customers/customers';
import {
  CreateCustomerRequest,
  CustomerCreateParams,
  CustomerDeleteResponse,
  CustomerLeadTime,
  CustomerListParams,
  CustomerRetrieveLeadTimeParams,
  CustomerRetrieveParams,
  CustomerUpdateParams,
  Customers,
  UpdateCustomerRequest,
} from './customers/customers';
import * as OrderDiscountsAPI from './order-discounts/order-discounts';
import {
  CreateOrderDiscountRequest,
  ListOrderDiscount,
  OrderDiscount,
  OrderDiscountCreateParams,
  OrderDiscountListParams,
  OrderDiscountUpdateParams,
  OrderDiscounts,
  UpdateOrderDiscountRequest,
} from './order-discounts/order-discounts';
import * as SalesOrdersAPI from './sales-orders/sales-orders';
import {
  CheckoutSalesOrderRequest,
  CheckoutSalesOrderResponse,
  Commitment,
  ComputedRate,
  CreateSalesOrderLineInput,
  CreateSalesOrderRequest,
  CreatedBy,
  Freight,
  InlineAddressInput,
  ListQuotedSalesOrderLine,
  ListRecord,
  ListSalesOrder,
  ListSalesOrderLine,
  ListSalesOrderStatus,
  OrderContact,
  QuoteSalesOrderLineInput,
  QuoteSalesOrderPricesRequest,
  QuoteSalesOrderPricesResponse,
  QuotedSalesOrderLine,
  Record,
  SalesOrder,
  SalesOrderCheckoutParams,
  SalesOrderCreateParams,
  SalesOrderDeleteResponse,
  SalesOrderEmailContactInput,
  SalesOrderLine,
  SalesOrderListParams,
  SalesOrderPriceQuoteParams,
  SalesOrderRelated,
  SalesOrderRetrieveParams,
  SalesOrderRetrieveStatusesParams,
  SalesOrderStageTotal,
  SalesOrderStatus,
  SalesOrderTotals,
  SalesOrderUpdateParams,
  SalesOrders,
  UpdateSalesOrderRequest,
} from './sales-orders/sales-orders';

export class Sales extends APIResource {
  accountGroups: AccountGroupsAPI.AccountGroups = new AccountGroupsAPI.AccountGroups(this._client);
  accountPrices: AccountPricesAPI.AccountPrices = new AccountPricesAPI.AccountPrices(this._client);
  addresses: AddressesAPI.Addresses = new AddressesAPI.Addresses(this._client);
  accountStatuses: AccountStatusesAPI.AccountStatuses = new AccountStatusesAPI.AccountStatuses(this._client);
  accountUsers: AccountUsersAPI.AccountUsers = new AccountUsersAPI.AccountUsers(this._client);
  priorities: PrioritiesAPI.Priorities = new PrioritiesAPI.Priorities(this._client);
  customers: CustomersAPI.Customers = new CustomersAPI.Customers(this._client);
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);
  orderDiscounts: OrderDiscountsAPI.OrderDiscounts = new OrderDiscountsAPI.OrderDiscounts(this._client);
  salesOrders: SalesOrdersAPI.SalesOrders = new SalesOrdersAPI.SalesOrders(this._client);
  volumeDiscounts: VolumeDiscountsAPI.VolumeDiscounts = new VolumeDiscountsAPI.VolumeDiscounts(this._client);
}

Sales.AccountGroups = AccountGroups;
Sales.AccountPrices = AccountPrices;
Sales.Addresses = Addresses;
Sales.AccountStatuses = AccountStatuses;
Sales.AccountUsers = AccountUsers;
Sales.Priorities = Priorities;
Sales.Customers = Customers;
Sales.Contacts = Contacts;
Sales.OrderDiscounts = OrderDiscounts;
Sales.SalesOrders = SalesOrders;
Sales.VolumeDiscounts = VolumeDiscounts;

export declare namespace Sales {
  export {
    AccountGroups as AccountGroups,
    type AccountGroup as AccountGroup,
    type CreateAccountGroupRequest as CreateAccountGroupRequest,
    type ListAccountGroup as ListAccountGroup,
    type UpdateAccountGroupRequest as UpdateAccountGroupRequest,
    type AccountGroupDeleteResponse as AccountGroupDeleteResponse,
    type AccountGroupListParams as AccountGroupListParams,
    type AccountGroupCreateParams as AccountGroupCreateParams,
    type AccountGroupUpdateParams as AccountGroupUpdateParams,
  };

  export {
    AccountPrices as AccountPrices,
    type AccountPrice as AccountPrice,
    type Carrier as Carrier,
    type CreateAccountPriceRequest as CreateAccountPriceRequest,
    type Customer as Customer,
    type CustomerContactInfo as CustomerContactInfo,
    type CustomerDefaults as CustomerDefaults,
    type CustomerFreightPreferences as CustomerFreightPreferences,
    type CustomerNotificationPreferences as CustomerNotificationPreferences,
    type ListAccountPrice as ListAccountPrice,
    type ListCustomer as ListCustomer,
    type ListServiceLevel as ListServiceLevel,
    type PaymentTerm as PaymentTerm,
    type Priority as Priority,
    type ServiceLevel as ServiceLevel,
    type ShippingTerm as ShippingTerm,
    type UpdateAccountPriceRequest as UpdateAccountPriceRequest,
    type AccountPriceDeleteResponse as AccountPriceDeleteResponse,
    type AccountPriceListParams as AccountPriceListParams,
    type AccountPriceRetrieveParams as AccountPriceRetrieveParams,
    type AccountPriceCreateParams as AccountPriceCreateParams,
    type AccountPriceUpdateParams as AccountPriceUpdateParams,
  };

  export {
    Addresses as Addresses,
    type AddressInput as AddressInput,
    type ListAddress as ListAddress,
    type UpdateAddressRequest as UpdateAddressRequest,
    type AddressDeleteResponse as AddressDeleteResponse,
    type AddressListParams as AddressListParams,
    type AddressCreateParams as AddressCreateParams,
    type AddressUpdateParams as AddressUpdateParams,
  };

  export {
    AccountStatuses as AccountStatuses,
    type AccountStatus as AccountStatus,
    type ListAccountStatus as ListAccountStatus,
    type AccountStatusListParams as AccountStatusListParams,
    type AccountStatusRetrieveParams as AccountStatusRetrieveParams,
  };

  export { AccountUsers as AccountUsers };

  export {
    Priorities as Priorities,
    type ListPriority as ListPriority,
    type PriorityListParams as PriorityListParams,
    type PriorityRetrieveParams as PriorityRetrieveParams,
  };

  export {
    Customers as Customers,
    type CreateCustomerRequest as CreateCustomerRequest,
    type CustomerLeadTime as CustomerLeadTime,
    type UpdateCustomerRequest as UpdateCustomerRequest,
    type CustomerDeleteResponse as CustomerDeleteResponse,
    type CustomerListParams as CustomerListParams,
    type CustomerRetrieveParams as CustomerRetrieveParams,
    type CustomerCreateParams as CustomerCreateParams,
    type CustomerUpdateParams as CustomerUpdateParams,
    type CustomerRetrieveLeadTimeParams as CustomerRetrieveLeadTimeParams,
  };

  export { Contacts as Contacts };

  export {
    OrderDiscounts as OrderDiscounts,
    type CreateOrderDiscountRequest as CreateOrderDiscountRequest,
    type ListOrderDiscount as ListOrderDiscount,
    type OrderDiscount as OrderDiscount,
    type UpdateOrderDiscountRequest as UpdateOrderDiscountRequest,
    type OrderDiscountListParams as OrderDiscountListParams,
    type OrderDiscountCreateParams as OrderDiscountCreateParams,
    type OrderDiscountUpdateParams as OrderDiscountUpdateParams,
  };

  export {
    SalesOrders as SalesOrders,
    type CheckoutSalesOrderRequest as CheckoutSalesOrderRequest,
    type CheckoutSalesOrderResponse as CheckoutSalesOrderResponse,
    type Commitment as Commitment,
    type ComputedRate as ComputedRate,
    type CreateSalesOrderLineInput as CreateSalesOrderLineInput,
    type CreateSalesOrderRequest as CreateSalesOrderRequest,
    type CreatedBy as CreatedBy,
    type Freight as Freight,
    type InlineAddressInput as InlineAddressInput,
    type ListQuotedSalesOrderLine as ListQuotedSalesOrderLine,
    type ListRecord as ListRecord,
    type ListSalesOrder as ListSalesOrder,
    type ListSalesOrderLine as ListSalesOrderLine,
    type ListSalesOrderStatus as ListSalesOrderStatus,
    type OrderContact as OrderContact,
    type QuoteSalesOrderLineInput as QuoteSalesOrderLineInput,
    type QuoteSalesOrderPricesRequest as QuoteSalesOrderPricesRequest,
    type QuoteSalesOrderPricesResponse as QuoteSalesOrderPricesResponse,
    type QuotedSalesOrderLine as QuotedSalesOrderLine,
    type Record as Record,
    type SalesOrder as SalesOrder,
    type SalesOrderEmailContactInput as SalesOrderEmailContactInput,
    type SalesOrderLine as SalesOrderLine,
    type SalesOrderRelated as SalesOrderRelated,
    type SalesOrderStageTotal as SalesOrderStageTotal,
    type SalesOrderStatus as SalesOrderStatus,
    type SalesOrderTotals as SalesOrderTotals,
    type UpdateSalesOrderRequest as UpdateSalesOrderRequest,
    type SalesOrderDeleteResponse as SalesOrderDeleteResponse,
    type SalesOrderRetrieveStatusesParams as SalesOrderRetrieveStatusesParams,
    type SalesOrderListParams as SalesOrderListParams,
    type SalesOrderRetrieveParams as SalesOrderRetrieveParams,
    type SalesOrderCreateParams as SalesOrderCreateParams,
    type SalesOrderUpdateParams as SalesOrderUpdateParams,
    type SalesOrderCheckoutParams as SalesOrderCheckoutParams,
    type SalesOrderPriceQuoteParams as SalesOrderPriceQuoteParams,
  };

  export {
    VolumeDiscounts as VolumeDiscounts,
    type CreateVolumeDiscountRequest as CreateVolumeDiscountRequest,
    type CreateVolumeDiscountTierInput as CreateVolumeDiscountTierInput,
    type ListVolumeDiscount as ListVolumeDiscount,
    type ListVolumeDiscountTier as ListVolumeDiscountTier,
    type UpdateVolumeDiscountRequest as UpdateVolumeDiscountRequest,
    type UpdateVolumeDiscountTierInput as UpdateVolumeDiscountTierInput,
    type VolumeDiscount as VolumeDiscount,
    type VolumeDiscountTier as VolumeDiscountTier,
    type VolumeDiscountDeleteResponse as VolumeDiscountDeleteResponse,
    type VolumeDiscountListParams as VolumeDiscountListParams,
    type VolumeDiscountRetrieveParams as VolumeDiscountRetrieveParams,
    type VolumeDiscountCreateParams as VolumeDiscountCreateParams,
    type VolumeDiscountUpdateParams as VolumeDiscountUpdateParams,
  };
}
