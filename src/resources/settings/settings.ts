// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as IntegrationsAPI from './integrations/integrations';
import {
  AccountIntegration,
  CreateAccountIntegrationRequest,
  IntegrationCreateParams,
  IntegrationListParams,
  IntegrationUpdateParams,
  Integrations,
  ListAccountIntegration,
  Money,
  MoneyInput,
  UpdateAccountIntegrationRequest,
} from './integrations/integrations';
import * as PortalDomainsAPI from './portal-domains/portal-domains';
import {
  CreatePortalDomainRequest,
  DNSRecord,
  ListDNSRecord,
  ListPortalDomain,
  PortalDomain,
  PortalDomainCreateParams,
  PortalDomainDeleteResponse,
  PortalDomains,
} from './portal-domains/portal-domains';

export class Settings extends APIResource {
  portalDomains: PortalDomainsAPI.PortalDomains = new PortalDomainsAPI.PortalDomains(this._client);
  integrations: IntegrationsAPI.Integrations = new IntegrationsAPI.Integrations(this._client);
}

Settings.PortalDomains = PortalDomains;
Settings.Integrations = Integrations;

export declare namespace Settings {
  export {
    PortalDomains as PortalDomains,
    type CreatePortalDomainRequest as CreatePortalDomainRequest,
    type DNSRecord as DNSRecord,
    type ListDNSRecord as ListDNSRecord,
    type ListPortalDomain as ListPortalDomain,
    type PortalDomain as PortalDomain,
    type PortalDomainDeleteResponse as PortalDomainDeleteResponse,
    type PortalDomainCreateParams as PortalDomainCreateParams,
  };

  export {
    Integrations as Integrations,
    type AccountIntegration as AccountIntegration,
    type CreateAccountIntegrationRequest as CreateAccountIntegrationRequest,
    type ListAccountIntegration as ListAccountIntegration,
    type Money as Money,
    type MoneyInput as MoneyInput,
    type UpdateAccountIntegrationRequest as UpdateAccountIntegrationRequest,
    type IntegrationListParams as IntegrationListParams,
    type IntegrationCreateParams as IntegrationCreateParams,
    type IntegrationUpdateParams as IntegrationUpdateParams,
  };
}
