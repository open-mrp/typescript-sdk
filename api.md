# Auth

## APIKeys

Types:

- <code><a href="./src/resources/auth/api-keys/api-keys.ts">Account</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">AccountBranding</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">AccountPortal</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">Address</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">APIKey</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">CreateAPIKeyRequest</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">CreatedAPIKey</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">Geolocation</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">ListAPIKey</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">Owner</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">PageInfo</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">Role</a></code>
- <code><a href="./src/resources/auth/api-keys/api-keys.ts">APIKeyDeleteResponse</a></code>

Methods:

- <code title="get /v1/auth/api-keys/{id}">client.auth.apiKeys.<a href="./src/resources/auth/api-keys/api-keys.ts">retrieve</a>(id, { ...params }) -> APIKey</code>
- <code title="get /v1/auth/api-keys">client.auth.apiKeys.<a href="./src/resources/auth/api-keys/api-keys.ts">list</a>({ ...params }) -> ListAPIKey</code>
- <code title="post /v1/auth/api-keys">client.auth.apiKeys.<a href="./src/resources/auth/api-keys/api-keys.ts">create</a>({ ...params }) -> CreatedAPIKey</code>
- <code title="delete /v1/auth/api-keys/{id}">client.auth.apiKeys.<a href="./src/resources/auth/api-keys/api-keys.ts">delete</a>(id) -> APIKeyDeleteResponse</code>

### Actions

Types:

- <code><a href="./src/resources/auth/api-keys/actions.ts">RotateAPIKeyRequest</a></code>

Methods:

- <code title="post /v1/auth/api-keys/{id}/actions/rotate">client.auth.apiKeys.actions.<a href="./src/resources/auth/api-keys/actions.ts">rotate</a>(id, { ...params }) -> CreatedAPIKey</code>

# Core

Types:

- <code><a href="./src/resources/core/core.ts">Entity</a></code>
- <code><a href="./src/resources/core/core.ts">ListEntity</a></code>

Methods:

- <code title="get /v1/core/search">client.core.<a href="./src/resources/core/core.ts">retrieveSearch</a>({ ...params }) -> ListEntity</code>

## Sandboxes

Types:

- <code><a href="./src/resources/core/sandboxes.ts">CreateSandboxRequest</a></code>
- <code><a href="./src/resources/core/sandboxes.ts">ListSandbox</a></code>
- <code><a href="./src/resources/core/sandboxes.ts">Sandbox</a></code>
- <code><a href="./src/resources/core/sandboxes.ts">SandboxDeleteResponse</a></code>

Methods:

- <code title="get /v1/core/sandboxes">client.core.sandboxes.<a href="./src/resources/core/sandboxes.ts">list</a>({ ...params }) -> ListSandbox</code>
- <code title="get /v1/core/sandboxes/{id}">client.core.sandboxes.<a href="./src/resources/core/sandboxes.ts">retrieve</a>(id, { ...params }) -> Sandbox</code>
- <code title="post /v1/core/sandboxes">client.core.sandboxes.<a href="./src/resources/core/sandboxes.ts">create</a>({ ...params }) -> Sandbox</code>
- <code title="delete /v1/core/sandboxes/{id}">client.core.sandboxes.<a href="./src/resources/core/sandboxes.ts">delete</a>(id) -> SandboxDeleteResponse</code>

## RequestLogs

Types:

- <code><a href="./src/resources/core/request-logs.ts">Actor</a></code>
- <code><a href="./src/resources/core/request-logs.ts">ListRequestLog</a></code>
- <code><a href="./src/resources/core/request-logs.ts">RequestLog</a></code>

Methods:

- <code title="get /v1/core/request-logs">client.core.requestLogs.<a href="./src/resources/core/request-logs.ts">list</a>({ ...params }) -> ListRequestLog</code>
- <code title="get /v1/core/request-logs/{id}">client.core.requestLogs.<a href="./src/resources/core/request-logs.ts">retrieve</a>(id, { ...params }) -> RequestLog</code>

## AuditEvents

Types:

- <code><a href="./src/resources/core/audit-events.ts">AuditEvent</a></code>
- <code><a href="./src/resources/core/audit-events.ts">AuditFieldChange</a></code>
- <code><a href="./src/resources/core/audit-events.ts">ListAuditEvent</a></code>
- <code><a href="./src/resources/core/audit-events.ts">ListAuditFieldChange</a></code>
- <code><a href="./src/resources/core/audit-events.ts">ListObjectType</a></code>

Methods:

- <code title="get /v1/core/audit-events">client.core.auditEvents.<a href="./src/resources/core/audit-events.ts">list</a>({ ...params }) -> ListAuditEvent</code>
- <code title="get /v1/core/audit-events/{id}">client.core.auditEvents.<a href="./src/resources/core/audit-events.ts">retrieve</a>(id, { ...params }) -> AuditEvent</code>
- <code title="get /v1/core/audit-events/resource-types">client.core.auditEvents.<a href="./src/resources/core/audit-events.ts">retrieveResourceTypes</a>() -> ListObjectType</code>

## Addresses

Types:

- <code><a href="./src/resources/core/addresses/addresses.ts">AddressSuggestion</a></code>
- <code><a href="./src/resources/core/addresses/addresses.ts">ListAddressSuggestion</a></code>

Methods:

- <code title="get /v1/core/addresses/suggestions">client.core.addresses.<a href="./src/resources/core/addresses/addresses.ts">retrieveSuggestions</a>({ ...params }) -> ListAddressSuggestion</code>

### Actions

Types:

- <code><a href="./src/resources/core/addresses/actions.ts">AddressComponents</a></code>
- <code><a href="./src/resources/core/addresses/actions.ts">ValidateAddressRequest</a></code>
- <code><a href="./src/resources/core/addresses/actions.ts">ValidatedAddress</a></code>

Methods:

- <code title="put /v1/core/addresses/actions/validate">client.core.addresses.actions.<a href="./src/resources/core/addresses/actions.ts">validate</a>({ ...params }) -> ValidatedAddress</code>

## EmailLogs

Types:

- <code><a href="./src/resources/core/email-logs.ts">EmailLog</a></code>
- <code><a href="./src/resources/core/email-logs.ts">ListEmailLog</a></code>

Methods:

- <code title="get /v1/core/email-logs">client.core.emailLogs.<a href="./src/resources/core/email-logs.ts">list</a>({ ...params }) -> ListEmailLog</code>
- <code title="get /v1/core/email-logs/{id}">client.core.emailLogs.<a href="./src/resources/core/email-logs.ts">retrieve</a>(id, { ...params }) -> EmailLog</code>

## Jobs

Types:

- <code><a href="./src/resources/core/jobs.ts">Job</a></code>
- <code><a href="./src/resources/core/jobs.ts">JobExport</a></code>
- <code><a href="./src/resources/core/jobs.ts">JobResult</a></code>
- <code><a href="./src/resources/core/jobs.ts">ListJobResult</a></code>
- <code><a href="./src/resources/core/jobs.ts">QuotaInfo</a></code>
- <code><a href="./src/resources/core/jobs.ts">ResponseError</a></code>

Methods:

- <code title="get /v1/core/jobs/{id}">client.core.jobs.<a href="./src/resources/core/jobs.ts">retrieve</a>(id, { ...params }) -> Job</code>
- <code title="post /v1/core/jobs/{id}/cancel">client.core.jobs.<a href="./src/resources/core/jobs.ts">cancel</a>(id, { ...params }) -> Job</code>

## Analytics

Types:

- <code><a href="./src/resources/core/analytics.ts">AnalyzeDeliveryPerformanceRequest</a></code>
- <code><a href="./src/resources/core/analytics.ts">AnalyzeDeliveryPerformanceResponse</a></code>
- <code><a href="./src/resources/core/analytics.ts">AnalyzeOeeRequest</a></code>
- <code><a href="./src/resources/core/analytics.ts">AnalyzeOeeResponse</a></code>
- <code><a href="./src/resources/core/analytics.ts">AnalyzeOeeTrendRequest</a></code>
- <code><a href="./src/resources/core/analytics.ts">AnalyzeOeeTrendResponse</a></code>
- <code><a href="./src/resources/core/analytics.ts">AnalyzeScheduleAttainmentRequest</a></code>
- <code><a href="./src/resources/core/analytics.ts">AnalyzeScheduleAttainmentResponse</a></code>
- <code><a href="./src/resources/core/analytics.ts">AttainmentBucket</a></code>
- <code><a href="./src/resources/core/analytics.ts">DeliveryBacklogBucket</a></code>
- <code><a href="./src/resources/core/analytics.ts">DeliveryBreakdown</a></code>
- <code><a href="./src/resources/core/analytics.ts">DeliveryLatenessBucket</a></code>
- <code><a href="./src/resources/core/analytics.ts">DeliveryPerformance</a></code>
- <code><a href="./src/resources/core/analytics.ts">FrozenAdherence</a></code>
- <code><a href="./src/resources/core/analytics.ts">ListAttainmentBucket</a></code>
- <code><a href="./src/resources/core/analytics.ts">ListDeliveryBacklogBucket</a></code>
- <code><a href="./src/resources/core/analytics.ts">ListDeliveryBreakdown</a></code>
- <code><a href="./src/resources/core/analytics.ts">ListDeliveryLatenessBucket</a></code>
- <code><a href="./src/resources/core/analytics.ts">ListDeliveryPerformance</a></code>
- <code><a href="./src/resources/core/analytics.ts">ListFrozenAdherence</a></code>
- <code><a href="./src/resources/core/analytics.ts">ListOeeDepartment</a></code>
- <code><a href="./src/resources/core/analytics.ts">ListOeeDowntimeReason</a></code>
- <code><a href="./src/resources/core/analytics.ts">ListOeeTrendPeriod</a></code>
- <code><a href="./src/resources/core/analytics.ts">OeeDepartment</a></code>
- <code><a href="./src/resources/core/analytics.ts">OeeDepartmentPlannedTime</a></code>
- <code><a href="./src/resources/core/analytics.ts">OeeDowntimeReason</a></code>
- <code><a href="./src/resources/core/analytics.ts">OeeTrendPeriod</a></code>

Methods:

- <code title="put /v1/core/analytics/oee">client.core.analytics.<a href="./src/resources/core/analytics.ts">updateOee</a>({ ...params }) -> AnalyzeOeeResponse</code>
- <code title="put /v1/core/analytics/oee-trend">client.core.analytics.<a href="./src/resources/core/analytics.ts">updateOeeTrend</a>({ ...params }) -> AnalyzeOeeTrendResponse</code>
- <code title="put /v1/core/analytics/schedule-attainment">client.core.analytics.<a href="./src/resources/core/analytics.ts">updateScheduleAttainment</a>({ ...params }) -> AnalyzeScheduleAttainmentResponse</code>
- <code title="put /v1/core/analytics/delivery-performance">client.core.analytics.<a href="./src/resources/core/analytics.ts">updateDeliveryPerformance</a>({ ...params }) -> AnalyzeDeliveryPerformanceResponse</code>

## Actions

Types:

- <code><a href="./src/resources/core/actions.ts">EmailRecordRequest</a></code>
- <code><a href="./src/resources/core/actions.ts">ActionEmailRecordResponse</a></code>

Methods:

- <code title="post /v1/core/actions/email-record">client.core.actions.<a href="./src/resources/core/actions.ts">emailRecord</a>({ ...params }) -> ActionEmailRecordResponse</code>

# Catalog

## Units

Types:

- <code><a href="./src/resources/catalog/units/units.ts">CreateUnitRequest</a></code>
- <code><a href="./src/resources/catalog/units/units.ts">ListUnit</a></code>
- <code><a href="./src/resources/catalog/units/units.ts">Unit</a></code>
- <code><a href="./src/resources/catalog/units/units.ts">UpdateUnitRequest</a></code>
- <code><a href="./src/resources/catalog/units/units.ts">UnitDeleteResponse</a></code>

Methods:

- <code title="get /v1/catalog/units">client.catalog.units.<a href="./src/resources/catalog/units/units.ts">list</a>({ ...params }) -> ListUnit</code>
- <code title="get /v1/catalog/units/{id}">client.catalog.units.<a href="./src/resources/catalog/units/units.ts">retrieve</a>(id, { ...params }) -> Unit</code>
- <code title="post /v1/catalog/units">client.catalog.units.<a href="./src/resources/catalog/units/units.ts">create</a>({ ...params }) -> Unit</code>
- <code title="patch /v1/catalog/units/{id}">client.catalog.units.<a href="./src/resources/catalog/units/units.ts">update</a>(id, { ...params }) -> Unit</code>
- <code title="delete /v1/catalog/units/{id}">client.catalog.units.<a href="./src/resources/catalog/units/units.ts">delete</a>(id) -> UnitDeleteResponse</code>

### Actions

Types:

- <code><a href="./src/resources/catalog/units/actions.ts">BulkUpsertUnitsRequest</a></code>
- <code><a href="./src/resources/catalog/units/actions.ts">UpsertUnitInput</a></code>

Methods:

- <code title="post /v1/catalog/units/actions/bulk-upsert">client.catalog.units.actions.<a href="./src/resources/catalog/units/actions.ts">bulkUpsert</a>({ ...params }) -> Job</code>

## UnitGroups

Types:

- <code><a href="./src/resources/catalog/unit-groups/unit-groups.ts">CreateUnitGroupRequest</a></code>
- <code><a href="./src/resources/catalog/unit-groups/unit-groups.ts">CreateUnitGroupUnitParam</a></code>
- <code><a href="./src/resources/catalog/unit-groups/unit-groups.ts">ListUnitGroup</a></code>
- <code><a href="./src/resources/catalog/unit-groups/unit-groups.ts">ListUnitGroupUnit</a></code>
- <code><a href="./src/resources/catalog/unit-groups/unit-groups.ts">UnitGroup</a></code>
- <code><a href="./src/resources/catalog/unit-groups/unit-groups.ts">UnitGroupUnit</a></code>
- <code><a href="./src/resources/catalog/unit-groups/unit-groups.ts">UpdateUnitGroupRequest</a></code>
- <code><a href="./src/resources/catalog/unit-groups/unit-groups.ts">UnitGroupDeleteResponse</a></code>

Methods:

- <code title="get /v1/catalog/unit-groups">client.catalog.unitGroups.<a href="./src/resources/catalog/unit-groups/unit-groups.ts">list</a>({ ...params }) -> ListUnitGroup</code>
- <code title="get /v1/catalog/unit-groups/{id}">client.catalog.unitGroups.<a href="./src/resources/catalog/unit-groups/unit-groups.ts">retrieve</a>(id, { ...params }) -> UnitGroup</code>
- <code title="post /v1/catalog/unit-groups">client.catalog.unitGroups.<a href="./src/resources/catalog/unit-groups/unit-groups.ts">create</a>({ ...params }) -> UnitGroup</code>
- <code title="patch /v1/catalog/unit-groups/{id}">client.catalog.unitGroups.<a href="./src/resources/catalog/unit-groups/unit-groups.ts">update</a>(id, { ...params }) -> UnitGroup</code>
- <code title="delete /v1/catalog/unit-groups/{id}">client.catalog.unitGroups.<a href="./src/resources/catalog/unit-groups/unit-groups.ts">delete</a>(id) -> UnitGroupDeleteResponse</code>

### Units

Types:

- <code><a href="./src/resources/catalog/unit-groups/units.ts">CreateUnitGroupUnitRequest</a></code>
- <code><a href="./src/resources/catalog/unit-groups/units.ts">UpdateUnitGroupUnitRequest</a></code>
- <code><a href="./src/resources/catalog/unit-groups/units.ts">UnitDeleteResponse</a></code>

Methods:

- <code title="get /v1/catalog/unit-groups/{unit_group_id}/units">client.catalog.unitGroups.units.<a href="./src/resources/catalog/unit-groups/units.ts">list</a>(unitGroupID, { ...params }) -> ListUnitGroupUnit</code>
- <code title="get /v1/catalog/unit-groups/{unit_group_id}/units/{id}">client.catalog.unitGroups.units.<a href="./src/resources/catalog/unit-groups/units.ts">retrieve</a>(id, { ...params }) -> UnitGroupUnit</code>
- <code title="post /v1/catalog/unit-groups/{unit_group_id}/units">client.catalog.unitGroups.units.<a href="./src/resources/catalog/unit-groups/units.ts">create</a>(unitGroupID, { ...params }) -> UnitGroupUnit</code>
- <code title="patch /v1/catalog/unit-groups/{unit_group_id}/units/{id}">client.catalog.unitGroups.units.<a href="./src/resources/catalog/unit-groups/units.ts">update</a>(id, { ...params }) -> UnitGroupUnit</code>
- <code title="delete /v1/catalog/unit-groups/{unit_group_id}/units/{id}">client.catalog.unitGroups.units.<a href="./src/resources/catalog/unit-groups/units.ts">delete</a>(id, { ...params }) -> UnitDeleteResponse</code>

### Actions

Types:

- <code><a href="./src/resources/catalog/unit-groups/actions.ts">BulkUpsertUnitGroupsRequest</a></code>
- <code><a href="./src/resources/catalog/unit-groups/actions.ts">UnitIdentifier</a></code>
- <code><a href="./src/resources/catalog/unit-groups/actions.ts">UpsertUnitGroupConversionInput</a></code>
- <code><a href="./src/resources/catalog/unit-groups/actions.ts">UpsertUnitGroupInput</a></code>

Methods:

- <code title="post /v1/catalog/unit-groups/actions/bulk-upsert">client.catalog.unitGroups.actions.<a href="./src/resources/catalog/unit-groups/actions.ts">bulkUpsert</a>({ ...params }) -> Job</code>

## Properties

Types:

- <code><a href="./src/resources/catalog/properties/properties.ts">Attribute</a></code>
- <code><a href="./src/resources/catalog/properties/properties.ts">CreatePropertyRequest</a></code>
- <code><a href="./src/resources/catalog/properties/properties.ts">ListAttribute</a></code>
- <code><a href="./src/resources/catalog/properties/properties.ts">ListProperty</a></code>
- <code><a href="./src/resources/catalog/properties/properties.ts">Property</a></code>
- <code><a href="./src/resources/catalog/properties/properties.ts">UpdatePropertyRequest</a></code>
- <code><a href="./src/resources/catalog/properties/properties.ts">PropertyDeleteResponse</a></code>

Methods:

- <code title="get /v1/catalog/properties">client.catalog.properties.<a href="./src/resources/catalog/properties/properties.ts">list</a>({ ...params }) -> ListProperty</code>
- <code title="get /v1/catalog/properties/{id}">client.catalog.properties.<a href="./src/resources/catalog/properties/properties.ts">retrieve</a>(id, { ...params }) -> Property</code>
- <code title="post /v1/catalog/properties">client.catalog.properties.<a href="./src/resources/catalog/properties/properties.ts">create</a>({ ...params }) -> Property</code>
- <code title="patch /v1/catalog/properties/{id}">client.catalog.properties.<a href="./src/resources/catalog/properties/properties.ts">update</a>(id, { ...params }) -> Property</code>
- <code title="delete /v1/catalog/properties/{id}">client.catalog.properties.<a href="./src/resources/catalog/properties/properties.ts">delete</a>(id) -> PropertyDeleteResponse</code>

### Attributes

Types:

- <code><a href="./src/resources/catalog/properties/attributes.ts">CreateAttributeRequest</a></code>
- <code><a href="./src/resources/catalog/properties/attributes.ts">UpdateAttributeRequest</a></code>
- <code><a href="./src/resources/catalog/properties/attributes.ts">AttributeDeleteResponse</a></code>

Methods:

- <code title="get /v1/catalog/properties/{property_id}/attributes">client.catalog.properties.attributes.<a href="./src/resources/catalog/properties/attributes.ts">list</a>(propertyID, { ...params }) -> ListAttribute</code>
- <code title="get /v1/catalog/properties/{property_id}/attributes/{id}">client.catalog.properties.attributes.<a href="./src/resources/catalog/properties/attributes.ts">retrieve</a>(id, { ...params }) -> Attribute</code>
- <code title="post /v1/catalog/properties/{property_id}/attributes">client.catalog.properties.attributes.<a href="./src/resources/catalog/properties/attributes.ts">create</a>(propertyID, { ...params }) -> Attribute</code>
- <code title="patch /v1/catalog/properties/{property_id}/attributes/{id}">client.catalog.properties.attributes.<a href="./src/resources/catalog/properties/attributes.ts">update</a>(id, { ...params }) -> Attribute</code>
- <code title="delete /v1/catalog/properties/{property_id}/attributes/{id}">client.catalog.properties.attributes.<a href="./src/resources/catalog/properties/attributes.ts">delete</a>(id, { ...params }) -> AttributeDeleteResponse</code>

### Actions

Types:

- <code><a href="./src/resources/catalog/properties/actions.ts">BulkUpsertPropertiesRequest</a></code>
- <code><a href="./src/resources/catalog/properties/actions.ts">UpsertPropertyAttributeInput</a></code>
- <code><a href="./src/resources/catalog/properties/actions.ts">UpsertPropertyInput</a></code>

Methods:

- <code title="post /v1/catalog/properties/actions/bulk-upsert">client.catalog.properties.actions.<a href="./src/resources/catalog/properties/actions.ts">bulkUpsert</a>({ ...params }) -> Job</code>

## Items

Types:

- <code><a href="./src/resources/catalog/items/items.ts">Item</a></code>
- <code><a href="./src/resources/catalog/items/items.ts">ItemCategory</a></code>
- <code><a href="./src/resources/catalog/items/items.ts">ItemLotDefault</a></code>
- <code><a href="./src/resources/catalog/items/items.ts">ListItem</a></code>
- <code><a href="./src/resources/catalog/items/items.ts">Rate</a></code>

Methods:

- <code title="get /v1/catalog/items">client.catalog.items.<a href="./src/resources/catalog/items/items.ts">list</a>({ ...params }) -> ListItem</code>
- <code title="get /v1/catalog/items/{id}">client.catalog.items.<a href="./src/resources/catalog/items/items.ts">retrieve</a>(id, { ...params }) -> Item</code>
- <code title="get /v1/catalog/items/{id}/lot-default">client.catalog.items.<a href="./src/resources/catalog/items/items.ts">retrieveLotDefault</a>(id, { ...params }) -> ItemLotDefault</code>
- <code title="put /v1/catalog/items/{id}/category/{category_id}">client.catalog.items.<a href="./src/resources/catalog/items/items.ts">changeCategory</a>(categoryID, { ...params }) -> Item</code>

### Inventory

Types:

- <code><a href="./src/resources/catalog/items/inventory.ts">ComputedQuantity</a></code>
- <code><a href="./src/resources/catalog/items/inventory.ts">ItemInventory</a></code>
- <code><a href="./src/resources/catalog/items/inventory.ts">QuantityInput</a></code>
- <code><a href="./src/resources/catalog/items/inventory.ts">UpdateItemInventoryRequest</a></code>
- <code><a href="./src/resources/catalog/items/inventory.ts">InventoryUpdateResponse</a></code>

Methods:

- <code title="get /v1/catalog/items/{id}/inventory">client.catalog.items.inventory.<a href="./src/resources/catalog/items/inventory.ts">list</a>(id, { ...params }) -> ItemInventory</code>
- <code title="patch /v1/catalog/items/{id}/inventory">client.catalog.items.inventory.<a href="./src/resources/catalog/items/inventory.ts">update</a>(id, { ...params }) -> InventoryUpdateResponse</code>

### Attributes

Methods:

- <code title="put /v1/catalog/items/{id}/attributes/{attribute_id}">client.catalog.items.attributes.<a href="./src/resources/catalog/items/attributes.ts">update</a>(attributeID, { ...params }) -> Item</code>
- <code title="delete /v1/catalog/items/{id}/attributes/{attribute_id}">client.catalog.items.attributes.<a href="./src/resources/catalog/items/attributes.ts">delete</a>(attributeID, { ...params }) -> Item</code>

### Actions

Types:

- <code><a href="./src/resources/catalog/items/actions.ts">BulkReconcileItemInput</a></code>
- <code><a href="./src/resources/catalog/items/actions.ts">BulkReconcileItemsRequest</a></code>
- <code><a href="./src/resources/catalog/items/actions.ts">BulkReconcileItemsResponse</a></code>
- <code><a href="./src/resources/catalog/items/actions.ts">ListReconcileErrorResult</a></code>
- <code><a href="./src/resources/catalog/items/actions.ts">ListReconciledItemResult</a></code>
- <code><a href="./src/resources/catalog/items/actions.ts">ListSkippedItemResult</a></code>
- <code><a href="./src/resources/catalog/items/actions.ts">ReconcileErrorResult</a></code>
- <code><a href="./src/resources/catalog/items/actions.ts">ReconciledItemResult</a></code>
- <code><a href="./src/resources/catalog/items/actions.ts">SkippedItemResult</a></code>

Methods:

- <code title="post /v1/catalog/items/actions/bulk-reconcile">client.catalog.items.actions.<a href="./src/resources/catalog/items/actions.ts">bulkReconcile</a>({ ...params }) -> BulkReconcileItemsResponse</code>

## ItemCategories

Types:

- <code><a href="./src/resources/catalog/item-categories/item-categories.ts">CreateItemCategoryRequest</a></code>
- <code><a href="./src/resources/catalog/item-categories/item-categories.ts">ListItemCategory</a></code>
- <code><a href="./src/resources/catalog/item-categories/item-categories.ts">UpdateItemCategoryRequest</a></code>
- <code><a href="./src/resources/catalog/item-categories/item-categories.ts">ItemCategoryDeleteResponse</a></code>
- <code><a href="./src/resources/catalog/item-categories/item-categories.ts">ItemCategoryChangeUnitGroupResponse</a></code>

Methods:

- <code title="get /v1/catalog/item-categories">client.catalog.itemCategories.<a href="./src/resources/catalog/item-categories/item-categories.ts">list</a>({ ...params }) -> ListItemCategory</code>
- <code title="get /v1/catalog/item-categories/{id}">client.catalog.itemCategories.<a href="./src/resources/catalog/item-categories/item-categories.ts">retrieve</a>(id, { ...params }) -> ItemCategory</code>
- <code title="post /v1/catalog/item-categories">client.catalog.itemCategories.<a href="./src/resources/catalog/item-categories/item-categories.ts">create</a>({ ...params }) -> ItemCategory</code>
- <code title="patch /v1/catalog/item-categories/{id}">client.catalog.itemCategories.<a href="./src/resources/catalog/item-categories/item-categories.ts">update</a>(id, { ...params }) -> ItemCategory</code>
- <code title="delete /v1/catalog/item-categories/{id}">client.catalog.itemCategories.<a href="./src/resources/catalog/item-categories/item-categories.ts">delete</a>(id) -> ItemCategoryDeleteResponse</code>
- <code title="put /v1/catalog/item-categories/{id}/unit-groups/{unit_group_id}">client.catalog.itemCategories.<a href="./src/resources/catalog/item-categories/item-categories.ts">changeUnitGroup</a>(unitGroupID, { ...params }) -> ItemCategoryChangeUnitGroupResponse</code>

### Properties

Types:

- <code><a href="./src/resources/catalog/item-categories/properties.ts">PropertyUpdateResponse</a></code>
- <code><a href="./src/resources/catalog/item-categories/properties.ts">PropertyDeleteResponse</a></code>

Methods:

- <code title="put /v1/catalog/item-categories/{id}/properties/{property_id}">client.catalog.itemCategories.properties.<a href="./src/resources/catalog/item-categories/properties.ts">update</a>(propertyID, { ...params }) -> PropertyUpdateResponse</code>
- <code title="delete /v1/catalog/item-categories/{id}/properties/{property_id}">client.catalog.itemCategories.properties.<a href="./src/resources/catalog/item-categories/properties.ts">delete</a>(propertyID, { ...params }) -> PropertyDeleteResponse</code>

### Actions

Types:

- <code><a href="./src/resources/catalog/item-categories/actions.ts">BulkUpsertItemCategoriesRequest</a></code>
- <code><a href="./src/resources/catalog/item-categories/actions.ts">ObjectIdentifier</a></code>
- <code><a href="./src/resources/catalog/item-categories/actions.ts">UpsertItemCategoryInput</a></code>

Methods:

- <code title="post /v1/catalog/item-categories/actions/bulk-upsert">client.catalog.itemCategories.actions.<a href="./src/resources/catalog/item-categories/actions.ts">bulkUpsert</a>({ ...params }) -> Job</code>

## Materials

Types:

- <code><a href="./src/resources/catalog/materials/materials.ts">CreateMaterialRequest</a></code>
- <code><a href="./src/resources/catalog/materials/materials.ts">ListMaterial</a></code>
- <code><a href="./src/resources/catalog/materials/materials.ts">Material</a></code>
- <code><a href="./src/resources/catalog/materials/materials.ts">Quantity</a></code>
- <code><a href="./src/resources/catalog/materials/materials.ts">QuantityInputRequest</a></code>
- <code><a href="./src/resources/catalog/materials/materials.ts">RateInput</a></code>
- <code><a href="./src/resources/catalog/materials/materials.ts">UpdateMaterialRequest</a></code>

Methods:

- <code title="get /v1/catalog/materials">client.catalog.materials.<a href="./src/resources/catalog/materials/materials.ts">list</a>({ ...params }) -> ListMaterial</code>
- <code title="get /v1/catalog/materials/{id}">client.catalog.materials.<a href="./src/resources/catalog/materials/materials.ts">retrieve</a>(id, { ...params }) -> Material</code>
- <code title="post /v1/catalog/materials">client.catalog.materials.<a href="./src/resources/catalog/materials/materials.ts">create</a>({ ...params }) -> Material</code>
- <code title="patch /v1/catalog/materials/{id}">client.catalog.materials.<a href="./src/resources/catalog/materials/materials.ts">update</a>(id, { ...params }) -> Material</code>
- <code title="delete /v1/catalog/materials/{id}">client.catalog.materials.<a href="./src/resources/catalog/materials/materials.ts">delete</a>(id) -> Material</code>

### Actions

Types:

- <code><a href="./src/resources/catalog/materials/actions.ts">BulkUpsertMaterialsRequest</a></code>
- <code><a href="./src/resources/catalog/materials/actions.ts">UpsertMaterialInput</a></code>
- <code><a href="./src/resources/catalog/materials/actions.ts">UpsertMaterialProperty</a></code>

Methods:

- <code title="post /v1/catalog/materials/actions/bulk-upsert">client.catalog.materials.actions.<a href="./src/resources/catalog/materials/actions.ts">bulkUpsert</a>({ ...params }) -> Job</code>

## Parts

Types:

- <code><a href="./src/resources/catalog/parts/parts.ts">CreatePartRequest</a></code>
- <code><a href="./src/resources/catalog/parts/parts.ts">ListPart</a></code>
- <code><a href="./src/resources/catalog/parts/parts.ts">Part</a></code>
- <code><a href="./src/resources/catalog/parts/parts.ts">UpdatePartRequest</a></code>

Methods:

- <code title="get /v1/catalog/parts">client.catalog.parts.<a href="./src/resources/catalog/parts/parts.ts">list</a>({ ...params }) -> ListPart</code>
- <code title="get /v1/catalog/parts/{id}">client.catalog.parts.<a href="./src/resources/catalog/parts/parts.ts">retrieve</a>(id, { ...params }) -> Part</code>
- <code title="post /v1/catalog/parts">client.catalog.parts.<a href="./src/resources/catalog/parts/parts.ts">create</a>({ ...params }) -> Part</code>
- <code title="patch /v1/catalog/parts/{id}">client.catalog.parts.<a href="./src/resources/catalog/parts/parts.ts">update</a>(id, { ...params }) -> Part</code>
- <code title="delete /v1/catalog/parts/{id}">client.catalog.parts.<a href="./src/resources/catalog/parts/parts.ts">delete</a>(id) -> Part</code>

### Actions

Types:

- <code><a href="./src/resources/catalog/parts/actions.ts">BulkUpsertPartsRequest</a></code>
- <code><a href="./src/resources/catalog/parts/actions.ts">UpsertPartInput</a></code>
- <code><a href="./src/resources/catalog/parts/actions.ts">UpsertPartProperty</a></code>

Methods:

- <code title="post /v1/catalog/parts/actions/bulk-upsert">client.catalog.parts.actions.<a href="./src/resources/catalog/parts/actions.ts">bulkUpsert</a>({ ...params }) -> Job</code>

## ProductLines

Types:

- <code><a href="./src/resources/catalog/product-lines/product-lines.ts">CreateProductLineRequest</a></code>
- <code><a href="./src/resources/catalog/product-lines/product-lines.ts">ListProductLine</a></code>
- <code><a href="./src/resources/catalog/product-lines/product-lines.ts">ProductLine</a></code>
- <code><a href="./src/resources/catalog/product-lines/product-lines.ts">UpdateProductLineRequest</a></code>
- <code><a href="./src/resources/catalog/product-lines/product-lines.ts">ProductLineDeleteResponse</a></code>

Methods:

- <code title="get /v1/catalog/product-lines">client.catalog.productLines.<a href="./src/resources/catalog/product-lines/product-lines.ts">list</a>({ ...params }) -> ListProductLine</code>
- <code title="get /v1/catalog/product-lines/{id}">client.catalog.productLines.<a href="./src/resources/catalog/product-lines/product-lines.ts">retrieve</a>(id, { ...params }) -> ProductLine</code>
- <code title="post /v1/catalog/product-lines">client.catalog.productLines.<a href="./src/resources/catalog/product-lines/product-lines.ts">create</a>({ ...params }) -> ProductLine</code>
- <code title="patch /v1/catalog/product-lines/{id}">client.catalog.productLines.<a href="./src/resources/catalog/product-lines/product-lines.ts">update</a>(id, { ...params }) -> ProductLine</code>
- <code title="delete /v1/catalog/product-lines/{id}">client.catalog.productLines.<a href="./src/resources/catalog/product-lines/product-lines.ts">delete</a>(id) -> ProductLineDeleteResponse</code>

### Actions

Types:

- <code><a href="./src/resources/catalog/product-lines/actions.ts">BulkUpsertProductLinesRequest</a></code>
- <code><a href="./src/resources/catalog/product-lines/actions.ts">UpsertProductLineInput</a></code>

Methods:

- <code title="post /v1/catalog/product-lines/actions/bulk-upsert">client.catalog.productLines.actions.<a href="./src/resources/catalog/product-lines/actions.ts">bulkUpsert</a>({ ...params }) -> Job</code>

## Products

Types:

- <code><a href="./src/resources/catalog/products/products.ts">CreateProductRequest</a></code>
- <code><a href="./src/resources/catalog/products/products.ts">ListProduct</a></code>
- <code><a href="./src/resources/catalog/products/products.ts">Product</a></code>
- <code><a href="./src/resources/catalog/products/products.ts">UpdateProductRequest</a></code>

Methods:

- <code title="get /v1/catalog/products">client.catalog.products.<a href="./src/resources/catalog/products/products.ts">list</a>({ ...params }) -> ListProduct</code>
- <code title="get /v1/catalog/products/{id}">client.catalog.products.<a href="./src/resources/catalog/products/products.ts">retrieve</a>(id, { ...params }) -> Product</code>
- <code title="post /v1/catalog/products">client.catalog.products.<a href="./src/resources/catalog/products/products.ts">create</a>({ ...params }) -> Product</code>
- <code title="patch /v1/catalog/products/{id}">client.catalog.products.<a href="./src/resources/catalog/products/products.ts">update</a>(id, { ...params }) -> Product</code>
- <code title="delete /v1/catalog/products/{id}">client.catalog.products.<a href="./src/resources/catalog/products/products.ts">delete</a>(id, { ...params }) -> Product</code>
- <code title="put /v1/catalog/products/{id}/product-line/{product_line_id}">client.catalog.products.<a href="./src/resources/catalog/products/products.ts">changeProductLine</a>(productLineID, { ...params }) -> Product</code>

### Actions

Types:

- <code><a href="./src/resources/catalog/products/actions.ts">BulkUpsertProductsRequest</a></code>
- <code><a href="./src/resources/catalog/products/actions.ts">UpsertProductInput</a></code>
- <code><a href="./src/resources/catalog/products/actions.ts">UpsertProductProperty</a></code>

Methods:

- <code title="post /v1/catalog/products/actions/bulk-upsert">client.catalog.products.actions.<a href="./src/resources/catalog/products/actions.ts">bulkUpsert</a>({ ...params }) -> Job</code>

# AI

Types:

- <code><a href="./src/resources/ai/ai.ts">AvailableTool</a></code>
- <code><a href="./src/resources/ai/ai.ts">ListAvailableTool</a></code>
- <code><a href="./src/resources/ai/ai.ts">ListToolGroup</a></code>
- <code><a href="./src/resources/ai/ai.ts">ToolGroup</a></code>

Methods:

- <code title="get /v1/ai/tools">client.ai.<a href="./src/resources/ai/ai.ts">retrieveTools</a>({ ...params }) -> ListAvailableTool</code>
- <code title="get /v1/ai/tool-groups">client.ai.<a href="./src/resources/ai/ai.ts">retrieveToolGroups</a>({ ...params }) -> ListToolGroup</code>

## Agents

Types:

- <code><a href="./src/resources/ai/agents.ts">AgentDefinition</a></code>
- <code><a href="./src/resources/ai/agents.ts">AgentDefinitionConfig</a></code>
- <code><a href="./src/resources/ai/agents.ts">AgentDefinitionTool</a></code>
- <code><a href="./src/resources/ai/agents.ts">ConfigInput</a></code>
- <code><a href="./src/resources/ai/agents.ts">CreateAgentRequest</a></code>
- <code><a href="./src/resources/ai/agents.ts">ListAgentDefinition</a></code>
- <code><a href="./src/resources/ai/agents.ts">ListAgentDefinitionTool</a></code>
- <code><a href="./src/resources/ai/agents.ts">ToolInput</a></code>
- <code><a href="./src/resources/ai/agents.ts">TriggerConfig</a></code>
- <code><a href="./src/resources/ai/agents.ts">TriggerConfigInput</a></code>
- <code><a href="./src/resources/ai/agents.ts">UpdateAgentRequest</a></code>
- <code><a href="./src/resources/ai/agents.ts">UpdateAgentStatusRequest</a></code>
- <code><a href="./src/resources/ai/agents.ts">AgentDeleteResponse</a></code>

Methods:

- <code title="post /v1/ai/agents">client.ai.agents.<a href="./src/resources/ai/agents.ts">create</a>({ ...params }) -> AgentDefinition</code>
- <code title="get /v1/ai/agents">client.ai.agents.<a href="./src/resources/ai/agents.ts">list</a>({ ...params }) -> ListAgentDefinition</code>
- <code title="get /v1/ai/agents/{id}">client.ai.agents.<a href="./src/resources/ai/agents.ts">retrieve</a>(id, { ...params }) -> AgentDefinition</code>
- <code title="patch /v1/ai/agents/{id}">client.ai.agents.<a href="./src/resources/ai/agents.ts">update</a>(id, { ...params }) -> AgentDefinition</code>
- <code title="delete /v1/ai/agents/{id}">client.ai.agents.<a href="./src/resources/ai/agents.ts">delete</a>(id) -> AgentDeleteResponse</code>
- <code title="put /v1/ai/agents/{id}/status">client.ai.agents.<a href="./src/resources/ai/agents.ts">updateStatus</a>(id, { ...params }) -> AgentDefinition</code>

## Runs

Types:

- <code><a href="./src/resources/ai/runs/runs.ts">AgentAction</a></code>
- <code><a href="./src/resources/ai/runs/runs.ts">AgentRun</a></code>
- <code><a href="./src/resources/ai/runs/runs.ts">AgentRunStep</a></code>
- <code><a href="./src/resources/ai/runs/runs.ts">ListAgentAction</a></code>
- <code><a href="./src/resources/ai/runs/runs.ts">ListAgentRun</a></code>
- <code><a href="./src/resources/ai/runs/runs.ts">ListAgentRunStep</a></code>
- <code><a href="./src/resources/ai/runs/runs.ts">TriggerRunRequest</a></code>

Methods:

- <code title="get /v1/ai/runs">client.ai.runs.<a href="./src/resources/ai/runs/runs.ts">list</a>({ ...params }) -> ListAgentRun</code>
- <code title="get /v1/ai/runs/{id}">client.ai.runs.<a href="./src/resources/ai/runs/runs.ts">retrieve</a>(id, { ...params }) -> AgentRun</code>
- <code title="post /v1/ai/runs">client.ai.runs.<a href="./src/resources/ai/runs/runs.ts">create</a>({ ...params }) -> AgentRun</code>

### Actions

Types:

- <code><a href="./src/resources/ai/runs/actions.ts">ContinueRunRequest</a></code>

Methods:

- <code title="post /v1/ai/runs/{id}/actions/cancel">client.ai.runs.actions.<a href="./src/resources/ai/runs/actions.ts">cancel</a>(id, { ...params }) -> AgentRun</code>
- <code title="post /v1/ai/runs/{id}/actions/continue">client.ai.runs.actions.<a href="./src/resources/ai/runs/actions.ts">continue</a>(id, { ...params }) -> AgentRun</code>
- <code title="post /v1/ai/runs/{id}/actions/retry">client.ai.runs.actions.<a href="./src/resources/ai/runs/actions.ts">retry</a>(id, { ...params }) -> AgentRun</code>

## Memories

Types:

- <code><a href="./src/resources/ai/memories.ts">AgentMemory</a></code>
- <code><a href="./src/resources/ai/memories.ts">CreateMemoryRequest</a></code>
- <code><a href="./src/resources/ai/memories.ts">ListAgentMemory</a></code>
- <code><a href="./src/resources/ai/memories.ts">UpdateMemoryRequest</a></code>
- <code><a href="./src/resources/ai/memories.ts">MemoryDeleteResponse</a></code>

Methods:

- <code title="get /v1/ai/memories">client.ai.memories.<a href="./src/resources/ai/memories.ts">list</a>({ ...params }) -> ListAgentMemory</code>
- <code title="get /v1/ai/memories/{id}">client.ai.memories.<a href="./src/resources/ai/memories.ts">retrieve</a>(id) -> AgentMemory</code>
- <code title="post /v1/ai/memories">client.ai.memories.<a href="./src/resources/ai/memories.ts">create</a>({ ...params }) -> AgentMemory</code>
- <code title="patch /v1/ai/memories/{id}">client.ai.memories.<a href="./src/resources/ai/memories.ts">update</a>(id, { ...params }) -> AgentMemory</code>
- <code title="delete /v1/ai/memories/{id}">client.ai.memories.<a href="./src/resources/ai/memories.ts">delete</a>(id) -> MemoryDeleteResponse</code>

# Messaging

Types:

- <code><a href="./src/resources/messaging/messaging.ts">ListActor</a></code>

Methods:

- <code title="get /v1/messaging/contacts">client.messaging.<a href="./src/resources/messaging/messaging.ts">retrieveContacts</a>({ ...params }) -> ListActor</code>

## Notifications

Types:

- <code><a href="./src/resources/messaging/notifications/notifications.ts">ListNotification</a></code>
- <code><a href="./src/resources/messaging/notifications/notifications.ts">ListNotificationUnreadSummaryAccount</a></code>
- <code><a href="./src/resources/messaging/notifications/notifications.ts">Notification</a></code>
- <code><a href="./src/resources/messaging/notifications/notifications.ts">NotificationSendResult</a></code>
- <code><a href="./src/resources/messaging/notifications/notifications.ts">NotificationTargetInput</a></code>
- <code><a href="./src/resources/messaging/notifications/notifications.ts">NotificationUnreadCount</a></code>
- <code><a href="./src/resources/messaging/notifications/notifications.ts">NotificationUnreadSummary</a></code>
- <code><a href="./src/resources/messaging/notifications/notifications.ts">NotificationUnreadSummaryAccount</a></code>
- <code><a href="./src/resources/messaging/notifications/notifications.ts">SendNotificationRequest</a></code>

Methods:

- <code title="post /v1/messaging/notifications">client.messaging.notifications.<a href="./src/resources/messaging/notifications/notifications.ts">create</a>({ ...params }) -> NotificationSendResult</code>
- <code title="get /v1/messaging/notifications">client.messaging.notifications.<a href="./src/resources/messaging/notifications/notifications.ts">list</a>({ ...params }) -> ListNotification</code>
- <code title="get /v1/messaging/notifications/{id}">client.messaging.notifications.<a href="./src/resources/messaging/notifications/notifications.ts">retrieve</a>(id, { ...params }) -> Notification</code>
- <code title="get /v1/messaging/notifications/unread-count">client.messaging.notifications.<a href="./src/resources/messaging/notifications/notifications.ts">retrieveUnreadCount</a>() -> NotificationUnreadCount</code>
- <code title="get /v1/messaging/notifications/unread-summary">client.messaging.notifications.<a href="./src/resources/messaging/notifications/notifications.ts">retrieveUnreadSummary</a>() -> NotificationUnreadSummary</code>

### Actions

Types:

- <code><a href="./src/resources/messaging/notifications/actions.ts">ActionMarkAllSeenResponse</a></code>

Methods:

- <code title="post /v1/messaging/notifications/{id}/actions/seen">client.messaging.notifications.actions.<a href="./src/resources/messaging/notifications/actions.ts">seen</a>(id, { ...params }) -> Notification</code>
- <code title="post /v1/messaging/notifications/{id}/actions/read">client.messaging.notifications.actions.<a href="./src/resources/messaging/notifications/actions.ts">read</a>(id, { ...params }) -> Notification</code>
- <code title="post /v1/messaging/notifications/{id}/actions/dismiss">client.messaging.notifications.actions.<a href="./src/resources/messaging/notifications/actions.ts">dismiss</a>(id, { ...params }) -> Notification</code>
- <code title="post /v1/messaging/notifications/actions/mark-all-seen">client.messaging.notifications.actions.<a href="./src/resources/messaging/notifications/actions.ts">markAllSeen</a>() -> ActionMarkAllSeenResponse</code>

## Announcements

Types:

- <code><a href="./src/resources/messaging/announcements/announcements.ts">Announcement</a></code>
- <code><a href="./src/resources/messaging/announcements/announcements.ts">ListAnnouncement</a></code>

Methods:

- <code title="get /v1/messaging/announcements">client.messaging.announcements.<a href="./src/resources/messaging/announcements/announcements.ts">list</a>({ ...params }) -> ListAnnouncement</code>
- <code title="get /v1/messaging/announcements/{id}">client.messaging.announcements.<a href="./src/resources/messaging/announcements/announcements.ts">retrieve</a>(id, { ...params }) -> Announcement</code>

### Actions

Methods:

- <code title="post /v1/messaging/announcements/{id}/actions/seen">client.messaging.announcements.actions.<a href="./src/resources/messaging/announcements/actions.ts">seen</a>(id, { ...params }) -> Announcement</code>
- <code title="post /v1/messaging/announcements/{id}/actions/read">client.messaging.announcements.actions.<a href="./src/resources/messaging/announcements/actions.ts">read</a>(id, { ...params }) -> Announcement</code>
- <code title="post /v1/messaging/announcements/{id}/actions/dismiss">client.messaging.announcements.actions.<a href="./src/resources/messaging/announcements/actions.ts">dismiss</a>(id, { ...params }) -> Announcement</code>

## Conversations

Types:

- <code><a href="./src/resources/messaging/conversations/conversations.ts">Conversation</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">ConversationParticipant</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">CreateConversationRequest</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">ListConversation</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">ListConversationParticipant</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">ListMessageAttachment</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">ListMessagingGroupMember</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">Message</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">MessageAttachment</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">MessagingGroup</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">MessagingGroupMember</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">ReadCursor</a></code>
- <code><a href="./src/resources/messaging/conversations/conversations.ts">UpdateConversationRequest</a></code>

Methods:

- <code title="post /v1/messaging/conversations">client.messaging.conversations.<a href="./src/resources/messaging/conversations/conversations.ts">create</a>({ ...params }) -> Conversation</code>
- <code title="get /v1/messaging/conversations">client.messaging.conversations.<a href="./src/resources/messaging/conversations/conversations.ts">list</a>({ ...params }) -> ListConversation</code>
- <code title="get /v1/messaging/conversations/{id}">client.messaging.conversations.<a href="./src/resources/messaging/conversations/conversations.ts">retrieve</a>(id, { ...params }) -> Conversation</code>
- <code title="patch /v1/messaging/conversations/{id}">client.messaging.conversations.<a href="./src/resources/messaging/conversations/conversations.ts">update</a>(id, { ...params }) -> Conversation</code>

### Actions

Types:

- <code><a href="./src/resources/messaging/conversations/actions.ts">AssignConversationRequest</a></code>
- <code><a href="./src/resources/messaging/conversations/actions.ts">MarkConversationReadRequest</a></code>
- <code><a href="./src/resources/messaging/conversations/actions.ts">MuteConversationRequest</a></code>
- <code><a href="./src/resources/messaging/conversations/actions.ts">ReportConversationRequest</a></code>
- <code><a href="./src/resources/messaging/conversations/actions.ts">SetLegalHoldRequest</a></code>
- <code><a href="./src/resources/messaging/conversations/actions.ts">SetWorkflowStatusRequest</a></code>

Methods:

- <code title="post /v1/messaging/conversations/{id}/actions/set-legal-hold">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">setLegalHold</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/redact">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">redact</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/read">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">read</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/archive">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">archive</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/unarchive">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">unarchive</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/leave">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">leave</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/hide">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">hide</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/unhide">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">unhide</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/mute">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">mute</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/unmute">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">unmute</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/set-status">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">setStatus</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/assign">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">assign</a>(id, { ...params }) -> Conversation</code>
- <code title="post /v1/messaging/conversations/{id}/actions/report">client.messaging.conversations.actions.<a href="./src/resources/messaging/conversations/actions.ts">report</a>(id, { ...params }) -> Conversation</code>

### Links

Types:

- <code><a href="./src/resources/messaging/conversations/links.ts">AddConversationLinkRequest</a></code>
- <code><a href="./src/resources/messaging/conversations/links.ts">ConversationLink</a></code>
- <code><a href="./src/resources/messaging/conversations/links.ts">ListConversationLink</a></code>
- <code><a href="./src/resources/messaging/conversations/links.ts">LinkDeleteResponse</a></code>

Methods:

- <code title="post /v1/messaging/conversations/{id}/links">client.messaging.conversations.links.<a href="./src/resources/messaging/conversations/links.ts">create</a>(id, { ...params }) -> ConversationLink</code>
- <code title="delete /v1/messaging/conversations/{id}/links/{link_id}">client.messaging.conversations.links.<a href="./src/resources/messaging/conversations/links.ts">delete</a>(linkID, { ...params }) -> LinkDeleteResponse</code>
- <code title="get /v1/messaging/conversations/{id}/links">client.messaging.conversations.links.<a href="./src/resources/messaging/conversations/links.ts">list</a>(id, { ...params }) -> ListConversationLink</code>

### Messages

Types:

- <code><a href="./src/resources/messaging/conversations/messages.ts">ListMessage</a></code>
- <code><a href="./src/resources/messaging/conversations/messages.ts">MessageAttachmentInput</a></code>
- <code><a href="./src/resources/messaging/conversations/messages.ts">SendMessageRequest</a></code>

Methods:

- <code title="post /v1/messaging/conversations/{id}/messages">client.messaging.conversations.messages.<a href="./src/resources/messaging/conversations/messages.ts">create</a>(id, { ...params }) -> Message</code>
- <code title="get /v1/messaging/conversations/{id}/messages">client.messaging.conversations.messages.<a href="./src/resources/messaging/conversations/messages.ts">list</a>(id, { ...params }) -> ListMessage</code>

### Participants

Types:

- <code><a href="./src/resources/messaging/conversations/participants/participants.ts">AddParticipantRequest</a></code>
- <code><a href="./src/resources/messaging/conversations/participants/participants.ts">ParticipantDeleteResponse</a></code>

Methods:

- <code title="post /v1/messaging/conversations/{id}/participants">client.messaging.conversations.participants.<a href="./src/resources/messaging/conversations/participants/participants.ts">create</a>(id, { ...params }) -> Conversation</code>
- <code title="delete /v1/messaging/conversations/{id}/participants/{pid}">client.messaging.conversations.participants.<a href="./src/resources/messaging/conversations/participants/participants.ts">delete</a>(pid, { ...params }) -> ParticipantDeleteResponse</code>

#### Actions

Types:

- <code><a href="./src/resources/messaging/conversations/participants/actions.ts">UpdateParticipantRoleRequest</a></code>

Methods:

- <code title="post /v1/messaging/conversations/{id}/participants/{pid}/actions/set-role">client.messaging.conversations.participants.actions.<a href="./src/resources/messaging/conversations/participants/actions.ts">setRole</a>(pid, { ...params }) -> Conversation</code>

### Attachments

#### Actions

Types:

- <code><a href="./src/resources/messaging/conversations/attachments/actions.ts">AttachmentUploadTarget</a></code>
- <code><a href="./src/resources/messaging/conversations/attachments/actions.ts">CreateAttachmentUploadURLRequest</a></code>

Methods:

- <code title="post /v1/messaging/conversations/{id}/attachments/actions/upload-url">client.messaging.conversations.attachments.actions.<a href="./src/resources/messaging/conversations/attachments/actions.ts">uploadURL</a>(id, { ...params }) -> AttachmentUploadTarget</code>

## Messages

Types:

- <code><a href="./src/resources/messaging/messages/messages.ts">UpdateDraftRequest</a></code>

Methods:

- <code title="patch /v1/messaging/messages/{id}">client.messaging.messages.<a href="./src/resources/messaging/messages/messages.ts">update</a>(id, { ...params }) -> Message</code>

### Actions

Types:

- <code><a href="./src/resources/messaging/messages/actions.ts">ApproveSendDraftRequest</a></code>

Methods:

- <code title="post /v1/messaging/messages/{id}/actions/approve-send">client.messaging.messages.actions.<a href="./src/resources/messaging/messages/actions.ts">approveSend</a>(id, { ...params }) -> Message</code>
- <code title="post /v1/messaging/messages/{id}/actions/reject">client.messaging.messages.actions.<a href="./src/resources/messaging/messages/actions.ts">reject</a>(id, { ...params }) -> Message</code>
- <code title="post /v1/messaging/messages/{id}/actions/cancel">client.messaging.messages.actions.<a href="./src/resources/messaging/messages/actions.ts">cancel</a>(id, { ...params }) -> Message</code>

## Groups

Types:

- <code><a href="./src/resources/messaging/groups/groups.ts">CreateMessagingGroupRequest</a></code>
- <code><a href="./src/resources/messaging/groups/groups.ts">ListMessagingGroup</a></code>
- <code><a href="./src/resources/messaging/groups/groups.ts">UpdateMessagingGroupRequest</a></code>
- <code><a href="./src/resources/messaging/groups/groups.ts">GroupDeleteResponse</a></code>

Methods:

- <code title="post /v1/messaging/groups">client.messaging.groups.<a href="./src/resources/messaging/groups/groups.ts">create</a>({ ...params }) -> MessagingGroup</code>
- <code title="get /v1/messaging/groups">client.messaging.groups.<a href="./src/resources/messaging/groups/groups.ts">list</a>() -> ListMessagingGroup</code>
- <code title="get /v1/messaging/groups/{id}">client.messaging.groups.<a href="./src/resources/messaging/groups/groups.ts">retrieve</a>(id) -> MessagingGroup</code>
- <code title="patch /v1/messaging/groups/{id}">client.messaging.groups.<a href="./src/resources/messaging/groups/groups.ts">update</a>(id, { ...params }) -> MessagingGroup</code>
- <code title="delete /v1/messaging/groups/{id}">client.messaging.groups.<a href="./src/resources/messaging/groups/groups.ts">delete</a>(id) -> GroupDeleteResponse</code>

### Members

Types:

- <code><a href="./src/resources/messaging/groups/members.ts">AddMessagingGroupMemberRequest</a></code>

Methods:

- <code title="post /v1/messaging/groups/{id}/members">client.messaging.groups.members.<a href="./src/resources/messaging/groups/members.ts">create</a>(id, { ...params }) -> MessagingGroup</code>
- <code title="delete /v1/messaging/groups/{id}/members/{member_id}">client.messaging.groups.members.<a href="./src/resources/messaging/groups/members.ts">delete</a>(memberID, { ...params }) -> MessagingGroup</code>

## Blocks

Types:

- <code><a href="./src/resources/messaging/blocks.ts">AccountUser</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">BlockRequest</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">Consumption</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">Department</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">ListConsumption</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">ListLocation</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">ListMachine</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">ListMessagingBlock</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">ListProductionStep</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">ListScanningStation</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">Location</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">LocationTypeCode</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">Machine</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">MessagingBlock</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">ProductionOutput</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">ProductionStep</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">ScanningStation</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">User</a></code>
- <code><a href="./src/resources/messaging/blocks.ts">BlockDeleteResponse</a></code>

Methods:

- <code title="post /v1/messaging/blocks">client.messaging.blocks.<a href="./src/resources/messaging/blocks.ts">create</a>({ ...params }) -> MessagingBlock</code>
- <code title="delete /v1/messaging/blocks/{id}">client.messaging.blocks.<a href="./src/resources/messaging/blocks.ts">delete</a>(id) -> BlockDeleteResponse</code>
- <code title="get /v1/messaging/blocks">client.messaging.blocks.<a href="./src/resources/messaging/blocks.ts">list</a>({ ...params }) -> ListMessagingBlock</code>

## Preferences

Types:

- <code><a href="./src/resources/messaging/preferences.ts">ListNotificationPreference</a></code>
- <code><a href="./src/resources/messaging/preferences.ts">NotificationPreference</a></code>
- <code><a href="./src/resources/messaging/preferences.ts">UpsertNotificationPreferenceRequest</a></code>

Methods:

- <code title="get /v1/messaging/preferences">client.messaging.preferences.<a href="./src/resources/messaging/preferences.ts">list</a>() -> ListNotificationPreference</code>
- <code title="put /v1/messaging/preferences">client.messaging.preferences.<a href="./src/resources/messaging/preferences.ts">update</a>({ ...params }) -> NotificationPreference</code>

## EmailDomains

Types:

- <code><a href="./src/resources/messaging/email-domains/email-domains.ts">CreateEmailDomainRequest</a></code>
- <code><a href="./src/resources/messaging/email-domains/email-domains.ts">EmailDomain</a></code>
- <code><a href="./src/resources/messaging/email-domains/email-domains.ts">ListEmailDomain</a></code>
- <code><a href="./src/resources/messaging/email-domains/email-domains.ts">EmailDomainDeleteResponse</a></code>

Methods:

- <code title="post /v1/messaging/email-domains">client.messaging.emailDomains.<a href="./src/resources/messaging/email-domains/email-domains.ts">create</a>({ ...params }) -> EmailDomain</code>
- <code title="get /v1/messaging/email-domains">client.messaging.emailDomains.<a href="./src/resources/messaging/email-domains/email-domains.ts">list</a>() -> ListEmailDomain</code>
- <code title="get /v1/messaging/email-domains/{id}">client.messaging.emailDomains.<a href="./src/resources/messaging/email-domains/email-domains.ts">retrieve</a>(id) -> EmailDomain</code>
- <code title="delete /v1/messaging/email-domains/{id}">client.messaging.emailDomains.<a href="./src/resources/messaging/email-domains/email-domains.ts">delete</a>(id) -> EmailDomainDeleteResponse</code>

### Actions

Methods:

- <code title="post /v1/messaging/email-domains/{id}/actions/verify">client.messaging.emailDomains.actions.<a href="./src/resources/messaging/email-domains/actions.ts">verify</a>(id) -> EmailDomain</code>

## EmailInboxes

Types:

- <code><a href="./src/resources/messaging/email-inboxes.ts">CreateEmailInboxRequest</a></code>
- <code><a href="./src/resources/messaging/email-inboxes.ts">EmailInbox</a></code>
- <code><a href="./src/resources/messaging/email-inboxes.ts">ListEmailInbox</a></code>
- <code><a href="./src/resources/messaging/email-inboxes.ts">UpdateEmailInboxRequest</a></code>
- <code><a href="./src/resources/messaging/email-inboxes.ts">EmailInboxDeleteResponse</a></code>

Methods:

- <code title="post /v1/messaging/email-inboxes">client.messaging.emailInboxes.<a href="./src/resources/messaging/email-inboxes.ts">create</a>({ ...params }) -> EmailInbox</code>
- <code title="get /v1/messaging/email-inboxes">client.messaging.emailInboxes.<a href="./src/resources/messaging/email-inboxes.ts">list</a>({ ...params }) -> ListEmailInbox</code>
- <code title="get /v1/messaging/email-inboxes/{id}">client.messaging.emailInboxes.<a href="./src/resources/messaging/email-inboxes.ts">retrieve</a>(id, { ...params }) -> EmailInbox</code>
- <code title="patch /v1/messaging/email-inboxes/{id}">client.messaging.emailInboxes.<a href="./src/resources/messaging/email-inboxes.ts">update</a>(id, { ...params }) -> EmailInbox</code>
- <code title="delete /v1/messaging/email-inboxes/{id}">client.messaging.emailInboxes.<a href="./src/resources/messaging/email-inboxes.ts">delete</a>(id) -> EmailInboxDeleteResponse</code>

## EmailSender

Types:

- <code><a href="./src/resources/messaging/email-sender.ts">EmailSender</a></code>
- <code><a href="./src/resources/messaging/email-sender.ts">SetEmailSenderRequest</a></code>
- <code><a href="./src/resources/messaging/email-sender.ts">EmailSenderDeleteResponse</a></code>

Methods:

- <code title="get /v1/messaging/email-sender">client.messaging.emailSender.<a href="./src/resources/messaging/email-sender.ts">list</a>() -> EmailSender</code>
- <code title="put /v1/messaging/email-sender">client.messaging.emailSender.<a href="./src/resources/messaging/email-sender.ts">update</a>({ ...params }) -> EmailSender</code>
- <code title="delete /v1/messaging/email-sender">client.messaging.emailSender.<a href="./src/resources/messaging/email-sender.ts">delete</a>() -> EmailSenderDeleteResponse</code>

# Sales

## AccountGroups

Types:

- <code><a href="./src/resources/sales/account-groups.ts">AccountGroup</a></code>
- <code><a href="./src/resources/sales/account-groups.ts">CreateAccountGroupRequest</a></code>
- <code><a href="./src/resources/sales/account-groups.ts">ListAccountGroup</a></code>
- <code><a href="./src/resources/sales/account-groups.ts">UpdateAccountGroupRequest</a></code>
- <code><a href="./src/resources/sales/account-groups.ts">AccountGroupDeleteResponse</a></code>

Methods:

- <code title="get /v1/sales/account-groups">client.sales.accountGroups.<a href="./src/resources/sales/account-groups.ts">list</a>({ ...params }) -> ListAccountGroup</code>
- <code title="get /v1/sales/account-groups/{id}">client.sales.accountGroups.<a href="./src/resources/sales/account-groups.ts">retrieve</a>(id) -> AccountGroup</code>
- <code title="post /v1/sales/account-groups">client.sales.accountGroups.<a href="./src/resources/sales/account-groups.ts">create</a>({ ...params }) -> AccountGroup</code>
- <code title="patch /v1/sales/account-groups/{id}">client.sales.accountGroups.<a href="./src/resources/sales/account-groups.ts">update</a>(id, { ...params }) -> AccountGroup</code>
- <code title="delete /v1/sales/account-groups/{id}">client.sales.accountGroups.<a href="./src/resources/sales/account-groups.ts">delete</a>(id) -> AccountGroupDeleteResponse</code>

## AccountPrices

Types:

- <code><a href="./src/resources/sales/account-prices/account-prices.ts">AccountPrice</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">Carrier</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">CreateAccountPriceRequest</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">Customer</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">CustomerContactInfo</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">CustomerDefaults</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">CustomerFreightPreferences</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">CustomerNotificationPreferences</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">ListAccountPrice</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">ListCustomer</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">ListServiceLevel</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">PaymentTerm</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">Priority</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">ServiceLevel</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">ShippingTerm</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">UpdateAccountPriceRequest</a></code>
- <code><a href="./src/resources/sales/account-prices/account-prices.ts">AccountPriceDeleteResponse</a></code>

Methods:

- <code title="get /v1/sales/account-prices">client.sales.accountPrices.<a href="./src/resources/sales/account-prices/account-prices.ts">list</a>({ ...params }) -> ListAccountPrice</code>
- <code title="get /v1/sales/account-prices/{id}">client.sales.accountPrices.<a href="./src/resources/sales/account-prices/account-prices.ts">retrieve</a>(id, { ...params }) -> AccountPrice</code>
- <code title="post /v1/sales/account-prices">client.sales.accountPrices.<a href="./src/resources/sales/account-prices/account-prices.ts">create</a>({ ...params }) -> AccountPrice</code>
- <code title="patch /v1/sales/account-prices/{id}">client.sales.accountPrices.<a href="./src/resources/sales/account-prices/account-prices.ts">update</a>(id, { ...params }) -> AccountPrice</code>
- <code title="delete /v1/sales/account-prices/{id}">client.sales.accountPrices.<a href="./src/resources/sales/account-prices/account-prices.ts">delete</a>(id) -> AccountPriceDeleteResponse</code>

### Actions

Types:

- <code><a href="./src/resources/sales/account-prices/actions.ts">ExportPriceListRequest</a></code>

Methods:

- <code title="post /v1/sales/account-prices/actions/export-price-list">client.sales.accountPrices.actions.<a href="./src/resources/sales/account-prices/actions.ts">exportPriceList</a>({ ...params }) -> Job</code>

## Addresses

Types:

- <code><a href="./src/resources/sales/addresses.ts">AddressInput</a></code>
- <code><a href="./src/resources/sales/addresses.ts">ListAddress</a></code>
- <code><a href="./src/resources/sales/addresses.ts">UpdateAddressRequest</a></code>
- <code><a href="./src/resources/sales/addresses.ts">AddressDeleteResponse</a></code>

Methods:

- <code title="get /v1/sales/addresses">client.sales.addresses.<a href="./src/resources/sales/addresses.ts">list</a>({ ...params }) -> ListAddress</code>
- <code title="get /v1/sales/addresses/{id}">client.sales.addresses.<a href="./src/resources/sales/addresses.ts">retrieve</a>(id) -> Address</code>
- <code title="post /v1/sales/addresses">client.sales.addresses.<a href="./src/resources/sales/addresses.ts">create</a>({ ...params }) -> Address</code>
- <code title="patch /v1/sales/addresses/{id}">client.sales.addresses.<a href="./src/resources/sales/addresses.ts">update</a>(id, { ...params }) -> Address</code>
- <code title="delete /v1/sales/addresses/{id}">client.sales.addresses.<a href="./src/resources/sales/addresses.ts">delete</a>(id) -> AddressDeleteResponse</code>

## AccountStatuses

Types:

- <code><a href="./src/resources/sales/account-statuses.ts">AccountStatus</a></code>
- <code><a href="./src/resources/sales/account-statuses.ts">ListAccountStatus</a></code>

Methods:

- <code title="get /v1/sales/account-statuses">client.sales.accountStatuses.<a href="./src/resources/sales/account-statuses.ts">list</a>({ ...params }) -> ListAccountStatus</code>
- <code title="get /v1/sales/account-statuses/{id}">client.sales.accountStatuses.<a href="./src/resources/sales/account-statuses.ts">retrieve</a>(id, { ...params }) -> AccountStatus</code>

## AccountUsers

### SalesTargets

Types:

- <code><a href="./src/resources/sales/account-users/sales-targets.ts">CreateSalesTargetRequest</a></code>
- <code><a href="./src/resources/sales/account-users/sales-targets.ts">ListSalesTarget</a></code>
- <code><a href="./src/resources/sales/account-users/sales-targets.ts">SalesTarget</a></code>
- <code><a href="./src/resources/sales/account-users/sales-targets.ts">UpsertSalesTargetRequest</a></code>

Methods:

- <code title="get /v1/sales/account-users/{id}/sales-targets">client.sales.accountUsers.salesTargets.<a href="./src/resources/sales/account-users/sales-targets.ts">list</a>(id, { ...params }) -> ListSalesTarget</code>
- <code title="post /v1/sales/account-users/{id}/sales-targets">client.sales.accountUsers.salesTargets.<a href="./src/resources/sales/account-users/sales-targets.ts">create</a>(id, { ...params }) -> SalesTarget</code>
- <code title="put /v1/sales/account-users/{id}/sales-targets/{target_id}">client.sales.accountUsers.salesTargets.<a href="./src/resources/sales/account-users/sales-targets.ts">update</a>(targetID, { ...params }) -> SalesTarget</code>

## Priorities

Types:

- <code><a href="./src/resources/sales/priorities.ts">ListPriority</a></code>

Methods:

- <code title="get /v1/sales/priorities">client.sales.priorities.<a href="./src/resources/sales/priorities.ts">list</a>({ ...params }) -> ListPriority</code>
- <code title="get /v1/sales/priorities/{id}">client.sales.priorities.<a href="./src/resources/sales/priorities.ts">retrieve</a>(id, { ...params }) -> Priority</code>

## Customers

Types:

- <code><a href="./src/resources/sales/customers/customers.ts">CreateCustomerRequest</a></code>
- <code><a href="./src/resources/sales/customers/customers.ts">CustomerLeadTime</a></code>
- <code><a href="./src/resources/sales/customers/customers.ts">UpdateCustomerRequest</a></code>
- <code><a href="./src/resources/sales/customers/customers.ts">CustomerDeleteResponse</a></code>

Methods:

- <code title="get /v1/sales/customers">client.sales.customers.<a href="./src/resources/sales/customers/customers.ts">list</a>({ ...params }) -> ListCustomer</code>
- <code title="get /v1/sales/customers/{id}">client.sales.customers.<a href="./src/resources/sales/customers/customers.ts">retrieve</a>(id, { ...params }) -> Customer</code>
- <code title="post /v1/sales/customers">client.sales.customers.<a href="./src/resources/sales/customers/customers.ts">create</a>({ ...params }) -> Customer</code>
- <code title="patch /v1/sales/customers/{id}">client.sales.customers.<a href="./src/resources/sales/customers/customers.ts">update</a>(id, { ...params }) -> Customer</code>
- <code title="delete /v1/sales/customers/{id}">client.sales.customers.<a href="./src/resources/sales/customers/customers.ts">delete</a>(id) -> CustomerDeleteResponse</code>
- <code title="get /v1/sales/customers/{id}/lead-time">client.sales.customers.<a href="./src/resources/sales/customers/customers.ts">retrieveLeadTime</a>(id, { ...params }) -> CustomerLeadTime</code>

### Actions

Types:

- <code><a href="./src/resources/sales/customers/actions.ts">MergeCustomersRequest</a></code>

Methods:

- <code title="post /v1/sales/customers/{id}/actions/merge">client.sales.customers.actions.<a href="./src/resources/sales/customers/actions.ts">merge</a>(id, { ...params }) -> Customer</code>

## Contacts

### Actions

Types:

- <code><a href="./src/resources/sales/contacts/actions.ts">ContactMatch</a></code>
- <code><a href="./src/resources/sales/contacts/actions.ts">FindContactByEmailRequest</a></code>
- <code><a href="./src/resources/sales/contacts/actions.ts">ListContactMatch</a></code>

Methods:

- <code title="post /v1/sales/contacts/actions/find-by-email">client.sales.contacts.actions.<a href="./src/resources/sales/contacts/actions.ts">findByEmail</a>({ ...params }) -> ListContactMatch</code>

## OrderDiscounts

Types:

- <code><a href="./src/resources/sales/order-discounts/order-discounts.ts">CreateOrderDiscountRequest</a></code>
- <code><a href="./src/resources/sales/order-discounts/order-discounts.ts">ListOrderDiscount</a></code>
- <code><a href="./src/resources/sales/order-discounts/order-discounts.ts">OrderDiscount</a></code>
- <code><a href="./src/resources/sales/order-discounts/order-discounts.ts">UpdateOrderDiscountRequest</a></code>

Methods:

- <code title="get /v1/sales/order-discounts">client.sales.orderDiscounts.<a href="./src/resources/sales/order-discounts/order-discounts.ts">list</a>({ ...params }) -> ListOrderDiscount</code>
- <code title="get /v1/sales/order-discounts/{id}">client.sales.orderDiscounts.<a href="./src/resources/sales/order-discounts/order-discounts.ts">retrieve</a>(id) -> OrderDiscount</code>
- <code title="post /v1/sales/order-discounts">client.sales.orderDiscounts.<a href="./src/resources/sales/order-discounts/order-discounts.ts">create</a>({ ...params }) -> OrderDiscount</code>
- <code title="patch /v1/sales/order-discounts/{id}">client.sales.orderDiscounts.<a href="./src/resources/sales/order-discounts/order-discounts.ts">update</a>(id, { ...params }) -> OrderDiscount</code>
- <code title="delete /v1/sales/order-discounts/{id}">client.sales.orderDiscounts.<a href="./src/resources/sales/order-discounts/order-discounts.ts">delete</a>(id) -> OrderDiscount</code>

### Actions

Types:

- <code><a href="./src/resources/sales/order-discounts/actions.ts">FindOrderDiscountByCodeRequest</a></code>

Methods:

- <code title="post /v1/sales/order-discounts/actions/find-by-code">client.sales.orderDiscounts.actions.<a href="./src/resources/sales/order-discounts/actions.ts">findByCode</a>({ ...params }) -> OrderDiscount</code>

## SalesOrders

Types:

- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">CheckoutSalesOrderRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">CheckoutSalesOrderResponse</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">Commitment</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">ComputedRate</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">CreateSalesOrderLineInput</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">CreateSalesOrderRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">CreatedBy</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">Freight</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">ListQuotedSalesOrderLine</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">ListRecord</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">ListSalesOrder</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">ListSalesOrderLine</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">ListSalesOrderStatus</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">OrderContact</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">QuoteSalesOrderLineInput</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">QuoteSalesOrderPricesRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">QuoteSalesOrderPricesResponse</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">QuotedSalesOrderLine</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">Record</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">SalesOrder</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">SalesOrderEmailContactInput</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">SalesOrderLine</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">SalesOrderRelated</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">SalesOrderStageTotal</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">SalesOrderStatus</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">SalesOrderTotals</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">UpdateSalesOrderRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/sales-orders.ts">SalesOrderDeleteResponse</a></code>

Methods:

- <code title="get /v1/sales/sales-orders/statuses">client.sales.salesOrders.<a href="./src/resources/sales/sales-orders/sales-orders.ts">retrieveStatuses</a>({ ...params }) -> ListSalesOrderStatus</code>
- <code title="get /v1/sales/sales-orders">client.sales.salesOrders.<a href="./src/resources/sales/sales-orders/sales-orders.ts">list</a>({ ...params }) -> ListSalesOrder</code>
- <code title="get /v1/sales/sales-orders/{id}">client.sales.salesOrders.<a href="./src/resources/sales/sales-orders/sales-orders.ts">retrieve</a>(id, { ...params }) -> SalesOrder</code>
- <code title="post /v1/sales/sales-orders">client.sales.salesOrders.<a href="./src/resources/sales/sales-orders/sales-orders.ts">create</a>({ ...params }) -> SalesOrder</code>
- <code title="patch /v1/sales/sales-orders/{id}">client.sales.salesOrders.<a href="./src/resources/sales/sales-orders/sales-orders.ts">update</a>(id, { ...params }) -> SalesOrder</code>
- <code title="delete /v1/sales/sales-orders/{id}">client.sales.salesOrders.<a href="./src/resources/sales/sales-orders/sales-orders.ts">delete</a>(id) -> SalesOrderDeleteResponse</code>
- <code title="post /v1/sales/sales-orders/{id}/checkout">client.sales.salesOrders.<a href="./src/resources/sales/sales-orders/sales-orders.ts">checkout</a>(id, { ...params }) -> CheckoutSalesOrderResponse</code>
- <code title="post /v1/sales/sales-orders/price-quote">client.sales.salesOrders.<a href="./src/resources/sales/sales-orders/sales-orders.ts">priceQuote</a>({ ...params }) -> QuoteSalesOrderPricesResponse</code>

### Actions

Types:

- <code><a href="./src/resources/sales/sales-orders/actions.ts">BulkDeleteSalesOrdersRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/actions.ts">CommitmentQuoteStep</a></code>
- <code><a href="./src/resources/sales/sales-orders/actions.ts">IssueSalesOrderRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/actions.ts">ListProductionRunBatchSummary</a></code>
- <code><a href="./src/resources/sales/sales-orders/actions.ts">ProductionRun</a></code>
- <code><a href="./src/resources/sales/sales-orders/actions.ts">ProductionRunBatchSummary</a></code>
- <code><a href="./src/resources/sales/sales-orders/actions.ts">QuoteSalesOrderCommitmentRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/actions.ts">QuoteSalesOrderCommitmentResponse</a></code>
- <code><a href="./src/resources/sales/sales-orders/actions.ts">QuoteSalesOrderFreightResponse</a></code>
- <code><a href="./src/resources/sales/sales-orders/actions.ts">ActionBulkDeleteResponse</a></code>

Methods:

- <code title="post /v1/sales/sales-orders/actions/bulk-delete">client.sales.salesOrders.actions.<a href="./src/resources/sales/sales-orders/actions.ts">bulkDelete</a>({ ...params }) -> ActionBulkDeleteResponse</code>
- <code title="put /v1/sales/sales-orders/{id}/actions/issue">client.sales.salesOrders.actions.<a href="./src/resources/sales/sales-orders/actions.ts">issue</a>(id, { ...params }) -> SalesOrder</code>
- <code title="put /v1/sales/sales-orders/{id}/actions/unissue">client.sales.salesOrders.actions.<a href="./src/resources/sales/sales-orders/actions.ts">unissue</a>(id) -> SalesOrder</code>
- <code title="put /v1/sales/sales-orders/{id}/actions/close">client.sales.salesOrders.actions.<a href="./src/resources/sales/sales-orders/actions.ts">close</a>(id) -> SalesOrder</code>
- <code title="put /v1/sales/sales-orders/{id}/actions/open">client.sales.salesOrders.actions.<a href="./src/resources/sales/sales-orders/actions.ts">open</a>(id) -> SalesOrder</code>
- <code title="post /v1/sales/sales-orders/{id}/actions/quote-freight">client.sales.salesOrders.actions.<a href="./src/resources/sales/sales-orders/actions.ts">quoteFreight</a>(id) -> QuoteSalesOrderFreightResponse</code>
- <code title="post /v1/sales/sales-orders/actions/quote-commitment">client.sales.salesOrders.actions.<a href="./src/resources/sales/sales-orders/actions.ts">quoteCommitment</a>({ ...params }) -> QuoteSalesOrderCommitmentResponse</code>
- <code title="post /v1/sales/sales-orders/{id}/actions/create-production-run">client.sales.salesOrders.actions.<a href="./src/resources/sales/sales-orders/actions.ts">createProductionRun</a>(id, { ...params }) -> ProductionRun</code>

### Lines

Types:

- <code><a href="./src/resources/sales/sales-orders/lines/lines.ts">CreateSalesOrderLineRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/lines/lines.ts">UpdateSalesOrderLineRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/lines/lines.ts">LineDeleteResponse</a></code>

Methods:

- <code title="post /v1/sales/sales-orders/{id}/lines">client.sales.salesOrders.lines.<a href="./src/resources/sales/sales-orders/lines/lines.ts">create</a>(id, { ...params }) -> SalesOrderLine</code>
- <code title="patch /v1/sales/sales-orders/{id}/lines/{line_id}">client.sales.salesOrders.lines.<a href="./src/resources/sales/sales-orders/lines/lines.ts">update</a>(lineID, { ...params }) -> SalesOrderLine</code>
- <code title="delete /v1/sales/sales-orders/{id}/lines/{line_id}">client.sales.salesOrders.lines.<a href="./src/resources/sales/sales-orders/lines/lines.ts">delete</a>(lineID, { ...params }) -> LineDeleteResponse</code>

#### Actions

Types:

- <code><a href="./src/resources/sales/sales-orders/lines/actions.ts">ReorderSalesOrderLinesRequest</a></code>
- <code><a href="./src/resources/sales/sales-orders/lines/actions.ts">ActionReorderResponse</a></code>

Methods:

- <code title="post /v1/sales/sales-orders/{id}/lines/actions/reorder">client.sales.salesOrders.lines.actions.<a href="./src/resources/sales/sales-orders/lines/actions.ts">reorder</a>(id, { ...params }) -> ActionReorderResponse</code>

## VolumeDiscounts

Types:

- <code><a href="./src/resources/sales/volume-discounts.ts">CreateVolumeDiscountRequest</a></code>
- <code><a href="./src/resources/sales/volume-discounts.ts">CreateVolumeDiscountTierInput</a></code>
- <code><a href="./src/resources/sales/volume-discounts.ts">ListVolumeDiscount</a></code>
- <code><a href="./src/resources/sales/volume-discounts.ts">ListVolumeDiscountTier</a></code>
- <code><a href="./src/resources/sales/volume-discounts.ts">UpdateVolumeDiscountRequest</a></code>
- <code><a href="./src/resources/sales/volume-discounts.ts">UpdateVolumeDiscountTierInput</a></code>
- <code><a href="./src/resources/sales/volume-discounts.ts">VolumeDiscount</a></code>
- <code><a href="./src/resources/sales/volume-discounts.ts">VolumeDiscountTier</a></code>
- <code><a href="./src/resources/sales/volume-discounts.ts">VolumeDiscountDeleteResponse</a></code>

Methods:

- <code title="get /v1/sales/volume-discounts">client.sales.volumeDiscounts.<a href="./src/resources/sales/volume-discounts.ts">list</a>({ ...params }) -> ListVolumeDiscount</code>
- <code title="get /v1/sales/volume-discounts/{id}">client.sales.volumeDiscounts.<a href="./src/resources/sales/volume-discounts.ts">retrieve</a>(id, { ...params }) -> VolumeDiscount</code>
- <code title="post /v1/sales/volume-discounts">client.sales.volumeDiscounts.<a href="./src/resources/sales/volume-discounts.ts">create</a>({ ...params }) -> VolumeDiscount</code>
- <code title="patch /v1/sales/volume-discounts/{id}">client.sales.volumeDiscounts.<a href="./src/resources/sales/volume-discounts.ts">update</a>(id, { ...params }) -> VolumeDiscount</code>
- <code title="delete /v1/sales/volume-discounts/{id}">client.sales.volumeDiscounts.<a href="./src/resources/sales/volume-discounts.ts">delete</a>(id) -> VolumeDiscountDeleteResponse</code>

# Finance

Types:

- <code><a href="./src/resources/finance/finance.ts">AdjustmentType</a></code>
- <code><a href="./src/resources/finance/finance.ts">ListAdjustmentType</a></code>
- <code><a href="./src/resources/finance/finance.ts">ListTransactionMethod</a></code>
- <code><a href="./src/resources/finance/finance.ts">ListTransactionType</a></code>
- <code><a href="./src/resources/finance/finance.ts">TransactionMethod</a></code>
- <code><a href="./src/resources/finance/finance.ts">TransactionType</a></code>

Methods:

- <code title="get /v1/finance/transaction-types">client.finance.<a href="./src/resources/finance/finance.ts">retrieveTransactionTypes</a>({ ...params }) -> ListTransactionType</code>
- <code title="get /v1/finance/transaction-methods">client.finance.<a href="./src/resources/finance/finance.ts">retrieveTransactionMethods</a>({ ...params }) -> ListTransactionMethod</code>
- <code title="get /v1/finance/adjustment-types">client.finance.<a href="./src/resources/finance/finance.ts">retrieveAdjustmentTypes</a>({ ...params }) -> ListAdjustmentType</code>

## PaymentTerms

Types:

- <code><a href="./src/resources/finance/payment-terms.ts">CreatePaymentTermRequest</a></code>
- <code><a href="./src/resources/finance/payment-terms.ts">ListPaymentTerm</a></code>
- <code><a href="./src/resources/finance/payment-terms.ts">UpdatePaymentTermRequest</a></code>
- <code><a href="./src/resources/finance/payment-terms.ts">PaymentTermDeleteResponse</a></code>

Methods:

- <code title="get /v1/finance/payment-terms">client.finance.paymentTerms.<a href="./src/resources/finance/payment-terms.ts">list</a>({ ...params }) -> ListPaymentTerm</code>
- <code title="get /v1/finance/payment-terms/{id}">client.finance.paymentTerms.<a href="./src/resources/finance/payment-terms.ts">retrieve</a>(id, { ...params }) -> PaymentTerm</code>
- <code title="post /v1/finance/payment-terms">client.finance.paymentTerms.<a href="./src/resources/finance/payment-terms.ts">create</a>({ ...params }) -> PaymentTerm</code>
- <code title="patch /v1/finance/payment-terms/{id}">client.finance.paymentTerms.<a href="./src/resources/finance/payment-terms.ts">update</a>(id, { ...params }) -> PaymentTerm</code>
- <code title="delete /v1/finance/payment-terms/{id}">client.finance.paymentTerms.<a href="./src/resources/finance/payment-terms.ts">delete</a>(id) -> PaymentTermDeleteResponse</code>

# Operations

Types:

- <code><a href="./src/resources/operations/operations.ts">DemandOverrideType</a></code>
- <code><a href="./src/resources/operations/operations.ts">ListDemandOverrideType</a></code>
- <code><a href="./src/resources/operations/operations.ts">ListMachineDowntimeReason</a></code>
- <code><a href="./src/resources/operations/operations.ts">ListMachineStatus</a></code>
- <code><a href="./src/resources/operations/operations.ts">ListScheduleDeviationType</a></code>
- <code><a href="./src/resources/operations/operations.ts">MachineCampaign</a></code>
- <code><a href="./src/resources/operations/operations.ts">MachineDowntimeReason</a></code>
- <code><a href="./src/resources/operations/operations.ts">MachineDowntimeReasonSummary</a></code>
- <code><a href="./src/resources/operations/operations.ts">MachineDowntimeSummary</a></code>
- <code><a href="./src/resources/operations/operations.ts">MachineStatus</a></code>
- <code><a href="./src/resources/operations/operations.ts">ScheduleDeviationType</a></code>

Methods:

- <code title="get /v1/operations/machine-downtime-reasons">client.operations.<a href="./src/resources/operations/operations.ts">retrieveMachineDowntimeReasons</a>() -> ListMachineDowntimeReason</code>
- <code title="get /v1/operations/machine-status">client.operations.<a href="./src/resources/operations/operations.ts">retrieveMachineStatus</a>({ ...params }) -> ListMachineStatus</code>
- <code title="get /v1/operations/demand-override-types">client.operations.<a href="./src/resources/operations/operations.ts">retrieveDemandOverrideTypes</a>() -> ListDemandOverrideType</code>
- <code title="get /v1/operations/schedule-deviation-types">client.operations.<a href="./src/resources/operations/operations.ts">retrieveScheduleDeviationTypes</a>() -> ListScheduleDeviationType</code>

## ShippingTerms

Types:

- <code><a href="./src/resources/operations/shipping-terms.ts">CreateShippingTermRequest</a></code>
- <code><a href="./src/resources/operations/shipping-terms.ts">ListShippingTerm</a></code>
- <code><a href="./src/resources/operations/shipping-terms.ts">UpdateShippingTermRequest</a></code>
- <code><a href="./src/resources/operations/shipping-terms.ts">ShippingTermDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/shipping-terms">client.operations.shippingTerms.<a href="./src/resources/operations/shipping-terms.ts">list</a>({ ...params }) -> ListShippingTerm</code>
- <code title="get /v1/operations/shipping-terms/{id}">client.operations.shippingTerms.<a href="./src/resources/operations/shipping-terms.ts">retrieve</a>(id, { ...params }) -> ShippingTerm</code>
- <code title="post /v1/operations/shipping-terms">client.operations.shippingTerms.<a href="./src/resources/operations/shipping-terms.ts">create</a>({ ...params }) -> ShippingTerm</code>
- <code title="patch /v1/operations/shipping-terms/{id}">client.operations.shippingTerms.<a href="./src/resources/operations/shipping-terms.ts">update</a>(id, { ...params }) -> ShippingTerm</code>
- <code title="delete /v1/operations/shipping-terms/{id}">client.operations.shippingTerms.<a href="./src/resources/operations/shipping-terms.ts">delete</a>(id) -> ShippingTermDeleteResponse</code>

## Carriers

Types:

- <code><a href="./src/resources/operations/carriers/carriers.ts">CreateCarrierRequest</a></code>
- <code><a href="./src/resources/operations/carriers/carriers.ts">ListCarrier</a></code>
- <code><a href="./src/resources/operations/carriers/carriers.ts">UpdateCarrierRequest</a></code>
- <code><a href="./src/resources/operations/carriers/carriers.ts">CarrierDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/carriers">client.operations.carriers.<a href="./src/resources/operations/carriers/carriers.ts">list</a>({ ...params }) -> ListCarrier</code>
- <code title="get /v1/operations/carriers/{id}">client.operations.carriers.<a href="./src/resources/operations/carriers/carriers.ts">retrieve</a>(id, { ...params }) -> Carrier</code>
- <code title="post /v1/operations/carriers">client.operations.carriers.<a href="./src/resources/operations/carriers/carriers.ts">create</a>({ ...params }) -> Carrier</code>
- <code title="patch /v1/operations/carriers/{id}">client.operations.carriers.<a href="./src/resources/operations/carriers/carriers.ts">update</a>(id, { ...params }) -> Carrier</code>
- <code title="delete /v1/operations/carriers/{id}">client.operations.carriers.<a href="./src/resources/operations/carriers/carriers.ts">delete</a>(id) -> CarrierDeleteResponse</code>

### ServiceLevels

Types:

- <code><a href="./src/resources/operations/carriers/service-levels.ts">CreateServiceLevelRequest</a></code>
- <code><a href="./src/resources/operations/carriers/service-levels.ts">UpdateServiceLevelRequest</a></code>
- <code><a href="./src/resources/operations/carriers/service-levels.ts">ServiceLevelDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/carriers/{carrier_id}/service-levels">client.operations.carriers.serviceLevels.<a href="./src/resources/operations/carriers/service-levels.ts">list</a>(carrierID, { ...params }) -> ListServiceLevel</code>
- <code title="get /v1/operations/carriers/{carrier_id}/service-levels/{id}">client.operations.carriers.serviceLevels.<a href="./src/resources/operations/carriers/service-levels.ts">retrieve</a>(id, { ...params }) -> ServiceLevel</code>
- <code title="post /v1/operations/carriers/{carrier_id}/service-levels">client.operations.carriers.serviceLevels.<a href="./src/resources/operations/carriers/service-levels.ts">create</a>(carrierID, { ...params }) -> ServiceLevel</code>
- <code title="patch /v1/operations/carriers/{carrier_id}/service-levels/{id}">client.operations.carriers.serviceLevels.<a href="./src/resources/operations/carriers/service-levels.ts">update</a>(id, { ...params }) -> ServiceLevel</code>
- <code title="delete /v1/operations/carriers/{carrier_id}/service-levels/{id}">client.operations.carriers.serviceLevels.<a href="./src/resources/operations/carriers/service-levels.ts">delete</a>(id, { ...params }) -> ServiceLevelDeleteResponse</code>

## Departments

Types:

- <code><a href="./src/resources/operations/departments.ts">CreateDepartmentRequest</a></code>
- <code><a href="./src/resources/operations/departments.ts">DepartmentRateInput</a></code>
- <code><a href="./src/resources/operations/departments.ts">ListDepartment</a></code>
- <code><a href="./src/resources/operations/departments.ts">UpdateDepartmentRequest</a></code>
- <code><a href="./src/resources/operations/departments.ts">DepartmentDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/departments">client.operations.departments.<a href="./src/resources/operations/departments.ts">list</a>({ ...params }) -> ListDepartment</code>
- <code title="get /v1/operations/departments/{id}">client.operations.departments.<a href="./src/resources/operations/departments.ts">retrieve</a>(id, { ...params }) -> Department</code>
- <code title="post /v1/operations/departments">client.operations.departments.<a href="./src/resources/operations/departments.ts">create</a>({ ...params }) -> Department</code>
- <code title="patch /v1/operations/departments/{id}">client.operations.departments.<a href="./src/resources/operations/departments.ts">update</a>(id, { ...params }) -> Department</code>
- <code title="delete /v1/operations/departments/{id}">client.operations.departments.<a href="./src/resources/operations/departments.ts">delete</a>(id) -> DepartmentDeleteResponse</code>

## InventoryChangeLogs

Types:

- <code><a href="./src/resources/operations/inventory-change-logs/inventory-change-logs.ts">InventoryChangeLog</a></code>
- <code><a href="./src/resources/operations/inventory-change-logs/inventory-change-logs.ts">ListInventoryChangeLog</a></code>

Methods:

- <code title="get /v1/operations/inventory-change-logs">client.operations.inventoryChangeLogs.<a href="./src/resources/operations/inventory-change-logs/inventory-change-logs.ts">list</a>({ ...params }) -> ListInventoryChangeLog</code>
- <code title="get /v1/operations/inventory-change-logs/{id}">client.operations.inventoryChangeLogs.<a href="./src/resources/operations/inventory-change-logs/inventory-change-logs.ts">retrieve</a>(id, { ...params }) -> InventoryChangeLog</code>

### Actions

Types:

- <code><a href="./src/resources/operations/inventory-change-logs/actions.ts">FileDownload</a></code>

Methods:

- <code title="get /v1/operations/inventory-change-logs/actions/export">client.operations.inventoryChangeLogs.actions.<a href="./src/resources/operations/inventory-change-logs/actions.ts">export</a>({ ...params }) -> FileDownload</code>

## Machines

Types:

- <code><a href="./src/resources/operations/machines.ts">CreateMachineRequest</a></code>
- <code><a href="./src/resources/operations/machines.ts">UpdateMachineRequest</a></code>
- <code><a href="./src/resources/operations/machines.ts">MachineDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/machines">client.operations.machines.<a href="./src/resources/operations/machines.ts">list</a>({ ...params }) -> ListMachine</code>
- <code title="get /v1/operations/machines/{id}">client.operations.machines.<a href="./src/resources/operations/machines.ts">retrieve</a>(id, { ...params }) -> Machine</code>
- <code title="post /v1/operations/machines">client.operations.machines.<a href="./src/resources/operations/machines.ts">create</a>({ ...params }) -> Machine</code>
- <code title="patch /v1/operations/machines/{id}">client.operations.machines.<a href="./src/resources/operations/machines.ts">update</a>(id, { ...params }) -> Machine</code>
- <code title="delete /v1/operations/machines/{id}">client.operations.machines.<a href="./src/resources/operations/machines.ts">delete</a>(id) -> MachineDeleteResponse</code>

## MachineDowntimeEvents

Types:

- <code><a href="./src/resources/operations/machine-downtime-events.ts">CreateMachineDowntimeEventRequest</a></code>
- <code><a href="./src/resources/operations/machine-downtime-events.ts">ListMachineDowntimeEvent</a></code>
- <code><a href="./src/resources/operations/machine-downtime-events.ts">MachineDowntimeEvent</a></code>
- <code><a href="./src/resources/operations/machine-downtime-events.ts">UpdateMachineDowntimeEventRequest</a></code>
- <code><a href="./src/resources/operations/machine-downtime-events.ts">MachineDowntimeEventDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/machine-downtime-events">client.operations.machineDowntimeEvents.<a href="./src/resources/operations/machine-downtime-events.ts">list</a>({ ...params }) -> ListMachineDowntimeEvent</code>
- <code title="get /v1/operations/machine-downtime-events/{id}">client.operations.machineDowntimeEvents.<a href="./src/resources/operations/machine-downtime-events.ts">retrieve</a>(id, { ...params }) -> MachineDowntimeEvent</code>
- <code title="post /v1/operations/machine-downtime-events">client.operations.machineDowntimeEvents.<a href="./src/resources/operations/machine-downtime-events.ts">create</a>({ ...params }) -> MachineDowntimeEvent</code>
- <code title="patch /v1/operations/machine-downtime-events/{id}">client.operations.machineDowntimeEvents.<a href="./src/resources/operations/machine-downtime-events.ts">update</a>(id, { ...params }) -> MachineDowntimeEvent</code>
- <code title="delete /v1/operations/machine-downtime-events/{id}">client.operations.machineDowntimeEvents.<a href="./src/resources/operations/machine-downtime-events.ts">delete</a>(id) -> MachineDowntimeEventDeleteResponse</code>

## DemandOverrides

Types:

- <code><a href="./src/resources/operations/demand-overrides.ts">CreateDemandOverrideRequest</a></code>
- <code><a href="./src/resources/operations/demand-overrides.ts">DemandOverride</a></code>
- <code><a href="./src/resources/operations/demand-overrides.ts">ListDemandOverride</a></code>
- <code><a href="./src/resources/operations/demand-overrides.ts">UpdateDemandOverrideRequest</a></code>
- <code><a href="./src/resources/operations/demand-overrides.ts">DemandOverrideDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/demand-overrides">client.operations.demandOverrides.<a href="./src/resources/operations/demand-overrides.ts">list</a>({ ...params }) -> ListDemandOverride</code>
- <code title="get /v1/operations/demand-overrides/{id}">client.operations.demandOverrides.<a href="./src/resources/operations/demand-overrides.ts">retrieve</a>(id, { ...params }) -> DemandOverride</code>
- <code title="post /v1/operations/demand-overrides">client.operations.demandOverrides.<a href="./src/resources/operations/demand-overrides.ts">create</a>({ ...params }) -> DemandOverride</code>
- <code title="patch /v1/operations/demand-overrides/{id}">client.operations.demandOverrides.<a href="./src/resources/operations/demand-overrides.ts">update</a>(id, { ...params }) -> DemandOverride</code>
- <code title="delete /v1/operations/demand-overrides/{id}">client.operations.demandOverrides.<a href="./src/resources/operations/demand-overrides.ts">delete</a>(id) -> DemandOverrideDeleteResponse</code>

## ProductionSchedules

Types:

- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">GenerateProductionScheduleRequest</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListProductionSchedule</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListProductionScheduleDerivedLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListProductionScheduleDeviation</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListProductionScheduleFinishedPolicy</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListProductionScheduleFinishingLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListProductionScheduleItemPolicy</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListReleaseScheduleBatch</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListReleasedScheduleLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListScheduleAppliedOverride</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListScheduleAtRiskOrder</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListScheduleOrderCoverage</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ListScheduleOrderCoverageLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ProductionSchedule</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ProductionScheduleDerivedLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ProductionScheduleDeviation</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ProductionScheduleFinishedPolicy</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ProductionScheduleFinishingLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ProductionScheduleItemPolicy</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ReleaseScheduleBatch</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ReleaseScheduleWeekPreview</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ReleasedScheduleLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ScheduleAppliedOverride</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ScheduleAtRiskOrder</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ScheduleDiagnostics</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ScheduleFinishingDiagnostics</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ScheduleOrderCoverage</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ScheduleOrderCoverageLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/production-schedules.ts">ProductionScheduleDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/production-schedules">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">list</a>({ ...params }) -> ListProductionSchedule</code>
- <code title="post /v1/operations/production-schedules">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">create</a>({ ...params }) -> ProductionSchedule</code>
- <code title="get /v1/operations/production-schedules/current">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">retrieveCurrent</a>() -> ProductionSchedule</code>
- <code title="get /v1/operations/production-schedules/{id}">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">retrieve</a>(id) -> ProductionSchedule</code>
- <code title="get /v1/operations/production-schedules/{id}/item-policies">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">retrieveItemPolicies</a>(id) -> ListProductionScheduleItemPolicy</code>
- <code title="get /v1/operations/production-schedules/{id}/finished-policies">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">retrieveFinishedPolicies</a>(id) -> ListProductionScheduleFinishedPolicy</code>
- <code title="get /v1/operations/production-schedules/{id}/finishing-lines">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">retrieveFinishingLines</a>(id, { ...params }) -> ListProductionScheduleFinishingLine</code>
- <code title="get /v1/operations/production-schedules/{id}/derived-lines">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">retrieveDerivedLines</a>(id, { ...params }) -> ListProductionScheduleDerivedLine</code>
- <code title="get /v1/operations/production-schedules/{id}/at-risk-orders">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">retrieveAtRiskOrders</a>(id) -> ListScheduleOrderCoverage</code>
- <code title="get /v1/operations/production-schedules/{id}/deviations">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">retrieveDeviations</a>(id, { ...params }) -> ListProductionScheduleDeviation</code>
- <code title="get /v1/operations/production-schedules/{id}/week-release-preview">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">retrieveWeekReleasePreview</a>(id, { ...params }) -> ReleaseScheduleWeekPreview</code>
- <code title="delete /v1/operations/production-schedules/{id}">client.operations.productionSchedules.<a href="./src/resources/operations/production-schedules/production-schedules.ts">delete</a>(id) -> ProductionScheduleDeleteResponse</code>

### Lines

Types:

- <code><a href="./src/resources/operations/production-schedules/lines.ts">CreateProductionScheduleLineRequest</a></code>
- <code><a href="./src/resources/operations/production-schedules/lines.ts">ListProductionScheduleLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/lines.ts">ProductionScheduleLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/lines.ts">UpdateProductionScheduleLineRequest</a></code>
- <code><a href="./src/resources/operations/production-schedules/lines.ts">LineDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/production-schedules/{id}/lines">client.operations.productionSchedules.lines.<a href="./src/resources/operations/production-schedules/lines.ts">list</a>(id, { ...params }) -> ListProductionScheduleLine</code>
- <code title="post /v1/operations/production-schedules/{id}/lines">client.operations.productionSchedules.lines.<a href="./src/resources/operations/production-schedules/lines.ts">create</a>(id, { ...params }) -> ProductionScheduleLine</code>
- <code title="patch /v1/operations/production-schedules/{id}/lines/{line_id}">client.operations.productionSchedules.lines.<a href="./src/resources/operations/production-schedules/lines.ts">update</a>(lineID, { ...params }) -> ProductionScheduleLine</code>
- <code title="delete /v1/operations/production-schedules/{id}/lines/{line_id}">client.operations.productionSchedules.lines.<a href="./src/resources/operations/production-schedules/lines.ts">delete</a>(lineID, { ...params }) -> LineDeleteResponse</code>

### Actions

Types:

- <code><a href="./src/resources/operations/production-schedules/actions.ts">ListScheduleCampaign</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ListScheduleDiffLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ListSchedulePolicy</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ListScheduleProjection</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">PreviewProductionScheduleRequest</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">PreviewRegenerateProductionScheduleRequest</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ProductionSchedulePreview</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ProductionScheduleRegeneratePreview</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">RegenerateProductionScheduleRequest</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ReleaseProductionScheduleWeekRequest</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ReleaseScheduleWeekResult</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ScheduleCampaign</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ScheduleDiffLine</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">SchedulePolicy</a></code>
- <code><a href="./src/resources/operations/production-schedules/actions.ts">ScheduleProjection</a></code>

Methods:

- <code title="put /v1/operations/production-schedules/actions/preview">client.operations.productionSchedules.actions.<a href="./src/resources/operations/production-schedules/actions.ts">preview</a>({ ...params }) -> ProductionSchedulePreview</code>
- <code title="put /v1/operations/production-schedules/{id}/actions/preview-regenerate">client.operations.productionSchedules.actions.<a href="./src/resources/operations/production-schedules/actions.ts">previewRegenerate</a>(id, { ...params }) -> ProductionScheduleRegeneratePreview</code>
- <code title="put /v1/operations/production-schedules/{id}/actions/regenerate">client.operations.productionSchedules.actions.<a href="./src/resources/operations/production-schedules/actions.ts">regenerate</a>(id, { ...params }) -> ProductionSchedule</code>
- <code title="put /v1/operations/production-schedules/{id}/actions/publish">client.operations.productionSchedules.actions.<a href="./src/resources/operations/production-schedules/actions.ts">publish</a>(id) -> ProductionSchedule</code>
- <code title="post /v1/operations/production-schedules/{id}/actions/release-week">client.operations.productionSchedules.actions.<a href="./src/resources/operations/production-schedules/actions.ts">releaseWeek</a>(id, { ...params }) -> ReleaseScheduleWeekResult</code>
- <code title="put /v1/operations/production-schedules/{id}/actions/archive">client.operations.productionSchedules.actions.<a href="./src/resources/operations/production-schedules/actions.ts">archive</a>(id) -> ProductionSchedule</code>

## ProductionScheduleSettings

Types:

- <code><a href="./src/resources/operations/production-schedule-settings/production-schedule-settings.ts">ProductionScheduleSettings</a></code>
- <code><a href="./src/resources/operations/production-schedule-settings/production-schedule-settings.ts">UpdateProductionScheduleSettingsRequest</a></code>

Methods:

- <code title="get /v1/operations/production-schedule-settings">client.operations.productionScheduleSettings.<a href="./src/resources/operations/production-schedule-settings/production-schedule-settings.ts">list</a>() -> ProductionScheduleSettings</code>
- <code title="put /v1/operations/production-schedule-settings">client.operations.productionScheduleSettings.<a href="./src/resources/operations/production-schedule-settings/production-schedule-settings.ts">update</a>({ ...params }) -> ProductionScheduleSettings</code>

### Resources

Types:

- <code><a href="./src/resources/operations/production-schedule-settings/resources.ts">ListProductionScheduleResourceSetting</a></code>
- <code><a href="./src/resources/operations/production-schedule-settings/resources.ts">ProductionScheduleResourceSetting</a></code>
- <code><a href="./src/resources/operations/production-schedule-settings/resources.ts">UpsertResourceSettingRequest</a></code>
- <code><a href="./src/resources/operations/production-schedule-settings/resources.ts">ResourceDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/production-schedule-settings/resources">client.operations.productionScheduleSettings.resources.<a href="./src/resources/operations/production-schedule-settings/resources.ts">list</a>() -> ListProductionScheduleResourceSetting</code>
- <code title="put /v1/operations/production-schedule-settings/resources">client.operations.productionScheduleSettings.resources.<a href="./src/resources/operations/production-schedule-settings/resources.ts">update</a>({ ...params }) -> ProductionScheduleResourceSetting</code>
- <code title="delete /v1/operations/production-schedule-settings/resources/{id}">client.operations.productionScheduleSettings.resources.<a href="./src/resources/operations/production-schedule-settings/resources.ts">delete</a>(id) -> ResourceDeleteResponse</code>

### Items

Types:

- <code><a href="./src/resources/operations/production-schedule-settings/items.ts">ListProductionScheduleItemSetting</a></code>
- <code><a href="./src/resources/operations/production-schedule-settings/items.ts">ProductionScheduleItemSetting</a></code>
- <code><a href="./src/resources/operations/production-schedule-settings/items.ts">UpsertItemSettingRequest</a></code>
- <code><a href="./src/resources/operations/production-schedule-settings/items.ts">ItemDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/production-schedule-settings/items">client.operations.productionScheduleSettings.items.<a href="./src/resources/operations/production-schedule-settings/items.ts">list</a>() -> ListProductionScheduleItemSetting</code>
- <code title="get /v1/operations/production-schedule-settings/items/{item_id}">client.operations.productionScheduleSettings.items.<a href="./src/resources/operations/production-schedule-settings/items.ts">retrieve</a>(itemID) -> ProductionScheduleItemSetting</code>
- <code title="put /v1/operations/production-schedule-settings/items/{item_id}">client.operations.productionScheduleSettings.items.<a href="./src/resources/operations/production-schedule-settings/items.ts">update</a>(itemID, { ...params }) -> ProductionScheduleItemSetting</code>
- <code title="delete /v1/operations/production-schedule-settings/items/{item_id}">client.operations.productionScheduleSettings.items.<a href="./src/resources/operations/production-schedule-settings/items.ts">delete</a>(itemID) -> ItemDeleteResponse</code>

## FulfillmentRecommendations

Types:

- <code><a href="./src/resources/operations/fulfillment-recommendations/fulfillment-recommendations.ts">FulfillmentRecommendation</a></code>
- <code><a href="./src/resources/operations/fulfillment-recommendations/fulfillment-recommendations.ts">ListFulfillmentRecommendation</a></code>

Methods:

- <code title="get /v1/operations/fulfillment-recommendations">client.operations.fulfillmentRecommendations.<a href="./src/resources/operations/fulfillment-recommendations/fulfillment-recommendations.ts">list</a>() -> ListFulfillmentRecommendation</code>

### Actions

Types:

- <code><a href="./src/resources/operations/fulfillment-recommendations/actions.ts">ApplyFulfillmentRecommendationsRequest</a></code>

Methods:

- <code title="post /v1/operations/fulfillment-recommendations/actions/apply">client.operations.fulfillmentRecommendations.actions.<a href="./src/resources/operations/fulfillment-recommendations/actions.ts">apply</a>({ ...params }) -> ListFulfillmentRecommendation</code>

## OperatingCalendars

Types:

- <code><a href="./src/resources/operations/operating-calendars/operating-calendars.ts">CreateOperatingCalendarRequest</a></code>
- <code><a href="./src/resources/operations/operating-calendars/operating-calendars.ts">ListOperatingCalendar</a></code>
- <code><a href="./src/resources/operations/operating-calendars/operating-calendars.ts">OperatingCalendar</a></code>
- <code><a href="./src/resources/operations/operating-calendars/operating-calendars.ts">UpdateOperatingCalendarRequest</a></code>
- <code><a href="./src/resources/operations/operating-calendars/operating-calendars.ts">OperatingCalendarDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/operating-calendars">client.operations.operatingCalendars.<a href="./src/resources/operations/operating-calendars/operating-calendars.ts">list</a>({ ...params }) -> ListOperatingCalendar</code>
- <code title="get /v1/operations/operating-calendars/{id}">client.operations.operatingCalendars.<a href="./src/resources/operations/operating-calendars/operating-calendars.ts">retrieve</a>(id) -> OperatingCalendar</code>
- <code title="post /v1/operations/operating-calendars">client.operations.operatingCalendars.<a href="./src/resources/operations/operating-calendars/operating-calendars.ts">create</a>({ ...params }) -> OperatingCalendar</code>
- <code title="patch /v1/operations/operating-calendars/{id}">client.operations.operatingCalendars.<a href="./src/resources/operations/operating-calendars/operating-calendars.ts">update</a>(id, { ...params }) -> OperatingCalendar</code>
- <code title="delete /v1/operations/operating-calendars/{id}">client.operations.operatingCalendars.<a href="./src/resources/operations/operating-calendars/operating-calendars.ts">delete</a>(id) -> OperatingCalendarDeleteResponse</code>

### Closures

Types:

- <code><a href="./src/resources/operations/operating-calendars/closures.ts">CreateOperatingCalendarClosureRequest</a></code>
- <code><a href="./src/resources/operations/operating-calendars/closures.ts">ListOperatingCalendarClosure</a></code>
- <code><a href="./src/resources/operations/operating-calendars/closures.ts">OperatingCalendarClosure</a></code>
- <code><a href="./src/resources/operations/operating-calendars/closures.ts">ClosureDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/operating-calendars/{id}/closures">client.operations.operatingCalendars.closures.<a href="./src/resources/operations/operating-calendars/closures.ts">list</a>(id, { ...params }) -> ListOperatingCalendarClosure</code>
- <code title="post /v1/operations/operating-calendars/{id}/closures">client.operations.operatingCalendars.closures.<a href="./src/resources/operations/operating-calendars/closures.ts">create</a>(id, { ...params }) -> OperatingCalendarClosure</code>
- <code title="delete /v1/operations/operating-calendars/{id}/closures/{closure_id}">client.operations.operatingCalendars.closures.<a href="./src/resources/operations/operating-calendars/closures.ts">delete</a>(closureID, { ...params }) -> ClosureDeleteResponse</code>

## Picks

Types:

- <code><a href="./src/resources/operations/picks/picks.ts">ListPick</a></code>
- <code><a href="./src/resources/operations/picks/picks.ts">ListPickLine</a></code>
- <code><a href="./src/resources/operations/picks/picks.ts">Pick</a></code>
- <code><a href="./src/resources/operations/picks/picks.ts">PickLine</a></code>
- <code><a href="./src/resources/operations/picks/picks.ts">PickRelated</a></code>
- <code><a href="./src/resources/operations/picks/picks.ts">PickStageTotal</a></code>
- <code><a href="./src/resources/operations/picks/picks.ts">PickTotals</a></code>

Methods:

- <code title="get /v1/operations/picks">client.operations.picks.<a href="./src/resources/operations/picks/picks.ts">list</a>({ ...params }) -> ListPick</code>
- <code title="get /v1/operations/picks/{id}">client.operations.picks.<a href="./src/resources/operations/picks/picks.ts">retrieve</a>(id, { ...params }) -> Pick</code>

### Actions

Types:

- <code><a href="./src/resources/operations/picks/actions.ts">PackPickRequest</a></code>

Methods:

- <code title="put /v1/operations/picks/{id}/actions/pick">client.operations.picks.actions.<a href="./src/resources/operations/picks/actions.ts">pick</a>(id) -> Pick</code>
- <code title="put /v1/operations/picks/{id}/actions/void">client.operations.picks.actions.<a href="./src/resources/operations/picks/actions.ts">void</a>(id) -> Pick</code>
- <code title="post /v1/operations/picks/{id}/actions/pack">client.operations.picks.actions.<a href="./src/resources/operations/picks/actions.ts">pack</a>(id, { ...params }) -> Job</code>

### Lines

Types:

- <code><a href="./src/resources/operations/picks/lines/lines.ts">UpdatePickLineRequest</a></code>

Methods:

- <code title="patch /v1/operations/picks/{pick_id}/lines/{id}">client.operations.picks.lines.<a href="./src/resources/operations/picks/lines/lines.ts">update</a>(id, { ...params }) -> PickLine</code>

#### Actions

Methods:

- <code title="put /v1/operations/picks/{pick_id}/lines/{id}/actions/pick">client.operations.picks.lines.actions.<a href="./src/resources/operations/picks/lines/actions.ts">pick</a>(id, { ...params }) -> PickLine</code>
- <code title="put /v1/operations/picks/{pick_id}/lines/{id}/actions/void">client.operations.picks.lines.actions.<a href="./src/resources/operations/picks/lines/actions.ts">void</a>(id, { ...params }) -> PickLine</code>

## Locations

Types:

- <code><a href="./src/resources/operations/locations/locations.ts">CreateLocationRequest</a></code>
- <code><a href="./src/resources/operations/locations/locations.ts">UpdateLocationRequest</a></code>
- <code><a href="./src/resources/operations/locations/locations.ts">LocationDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/locations">client.operations.locations.<a href="./src/resources/operations/locations/locations.ts">list</a>({ ...params }) -> ListLocation</code>
- <code title="get /v1/operations/locations/{id}">client.operations.locations.<a href="./src/resources/operations/locations/locations.ts">retrieve</a>(id, { ...params }) -> Location</code>
- <code title="post /v1/operations/locations">client.operations.locations.<a href="./src/resources/operations/locations/locations.ts">create</a>({ ...params }) -> Location</code>
- <code title="patch /v1/operations/locations/{id}">client.operations.locations.<a href="./src/resources/operations/locations/locations.ts">update</a>(id, { ...params }) -> Location</code>
- <code title="delete /v1/operations/locations/{id}">client.operations.locations.<a href="./src/resources/operations/locations/locations.ts">delete</a>(id) -> LocationDeleteResponse</code>

### Actions

Types:

- <code><a href="./src/resources/operations/locations/actions.ts">BulkUpsertLocationsRequest</a></code>
- <code><a href="./src/resources/operations/locations/actions.ts">UpsertLocationInput</a></code>

Methods:

- <code title="post /v1/operations/locations/actions/bulk-upsert">client.operations.locations.actions.<a href="./src/resources/operations/locations/actions.ts">bulkUpsert</a>({ ...params }) -> Job</code>

## LocationTypes

Types:

- <code><a href="./src/resources/operations/location-types.ts">ListLocationType</a></code>
- <code><a href="./src/resources/operations/location-types.ts">LocationType</a></code>

Methods:

- <code title="get /v1/operations/location-types">client.operations.locationTypes.<a href="./src/resources/operations/location-types.ts">list</a>({ ...params }) -> ListLocationType</code>
- <code title="get /v1/operations/location-types/{id}">client.operations.locationTypes.<a href="./src/resources/operations/location-types.ts">retrieve</a>(id) -> LocationType</code>

## Shipments

### Actions

Types:

- <code><a href="./src/resources/operations/shipments/actions.ts">ListRateShopOption</a></code>
- <code><a href="./src/resources/operations/shipments/actions.ts">ParcelInput</a></code>
- <code><a href="./src/resources/operations/shipments/actions.ts">RateShopOption</a></code>
- <code><a href="./src/resources/operations/shipments/actions.ts">RateShopRequest</a></code>
- <code><a href="./src/resources/operations/shipments/actions.ts">RateShopResult</a></code>

Methods:

- <code title="post /v1/operations/shipments/actions/rate-shop">client.operations.shipments.actions.<a href="./src/resources/operations/shipments/actions.ts">rateShop</a>({ ...params }) -> RateShopResult</code>

## ScanningStations

Types:

- <code><a href="./src/resources/operations/scanning-stations.ts">CreateScanningStationRequest</a></code>
- <code><a href="./src/resources/operations/scanning-stations.ts">UpdateScanningStationRequest</a></code>
- <code><a href="./src/resources/operations/scanning-stations.ts">ScanningStationDeleteResponse</a></code>

Methods:

- <code title="get /v1/operations/scanning-stations">client.operations.scanningStations.<a href="./src/resources/operations/scanning-stations.ts">list</a>({ ...params }) -> ListScanningStation</code>
- <code title="get /v1/operations/scanning-stations/{id}">client.operations.scanningStations.<a href="./src/resources/operations/scanning-stations.ts">retrieve</a>(id, { ...params }) -> ScanningStation</code>
- <code title="post /v1/operations/scanning-stations">client.operations.scanningStations.<a href="./src/resources/operations/scanning-stations.ts">create</a>({ ...params }) -> ScanningStation</code>
- <code title="patch /v1/operations/scanning-stations/{id}">client.operations.scanningStations.<a href="./src/resources/operations/scanning-stations.ts">update</a>(id, { ...params }) -> ScanningStation</code>
- <code title="delete /v1/operations/scanning-stations/{id}">client.operations.scanningStations.<a href="./src/resources/operations/scanning-stations.ts">delete</a>(id) -> ScanningStationDeleteResponse</code>

# Identity

Types:

- <code><a href="./src/resources/identity/identity.ts">ListPermission</a></code>
- <code><a href="./src/resources/identity/identity.ts">ListPermissionGroup</a></code>
- <code><a href="./src/resources/identity/identity.ts">Permission</a></code>
- <code><a href="./src/resources/identity/identity.ts">PermissionGroup</a></code>

Methods:

- <code title="get /v1/identity/permission-groups">client.identity.<a href="./src/resources/identity/identity.ts">retrievePermissionGroups</a>({ ...params }) -> ListPermissionGroup</code>

## AccountUsers

Types:

- <code><a href="./src/resources/identity/account-users/account-users.ts">CreateAccountUserRequest</a></code>
- <code><a href="./src/resources/identity/account-users/account-users.ts">ListAccountUser</a></code>
- <code><a href="./src/resources/identity/account-users/account-users.ts">NotificationPreferenceItem</a></code>
- <code><a href="./src/resources/identity/account-users/account-users.ts">UpdateAccountUserRequest</a></code>

Methods:

- <code title="get /v1/identity/account-users">client.identity.accountUsers.<a href="./src/resources/identity/account-users/account-users.ts">list</a>({ ...params }) -> ListAccountUser</code>
- <code title="get /v1/identity/account-users/{id}">client.identity.accountUsers.<a href="./src/resources/identity/account-users/account-users.ts">retrieve</a>(id, { ...params }) -> AccountUser</code>
- <code title="post /v1/identity/account-users">client.identity.accountUsers.<a href="./src/resources/identity/account-users/account-users.ts">create</a>({ ...params }) -> AccountUser</code>
- <code title="patch /v1/identity/account-users/{id}">client.identity.accountUsers.<a href="./src/resources/identity/account-users/account-users.ts">update</a>(id, { ...params }) -> AccountUser</code>

### Actions

Types:

- <code><a href="./src/resources/identity/account-users/actions.ts">ActionActivateResponse</a></code>
- <code><a href="./src/resources/identity/account-users/actions.ts">ActionDisableResponse</a></code>
- <code><a href="./src/resources/identity/account-users/actions.ts">ActionRemoveResponse</a></code>

Methods:

- <code title="put /v1/identity/account-users/{id}/actions/activate">client.identity.accountUsers.actions.<a href="./src/resources/identity/account-users/actions.ts">activate</a>(id) -> ActionActivateResponse</code>
- <code title="put /v1/identity/account-users/{id}/actions/disable">client.identity.accountUsers.actions.<a href="./src/resources/identity/account-users/actions.ts">disable</a>(id) -> ActionDisableResponse</code>
- <code title="put /v1/identity/account-users/{id}/actions/remove">client.identity.accountUsers.actions.<a href="./src/resources/identity/account-users/actions.ts">remove</a>(id) -> ActionRemoveResponse</code>

## Accounts

Types:

- <code><a href="./src/resources/identity/accounts.ts">AccountUpdateFaviconResponse</a></code>

Methods:

- <code title="put /v1/identity/accounts/{id}/favicon">client.identity.accounts.<a href="./src/resources/identity/accounts.ts">updateFavicon</a>(id) -> AccountUpdateFaviconResponse</code>

## Roles

Types:

- <code><a href="./src/resources/identity/roles.ts">CreateRoleRequest</a></code>
- <code><a href="./src/resources/identity/roles.ts">ListRole</a></code>
- <code><a href="./src/resources/identity/roles.ts">UpdateRoleRequest</a></code>
- <code><a href="./src/resources/identity/roles.ts">RoleDeleteResponse</a></code>

Methods:

- <code title="get /v1/identity/roles">client.identity.roles.<a href="./src/resources/identity/roles.ts">list</a>({ ...params }) -> ListRole</code>
- <code title="get /v1/identity/roles/{id}">client.identity.roles.<a href="./src/resources/identity/roles.ts">retrieve</a>(id, { ...params }) -> Role</code>
- <code title="post /v1/identity/roles">client.identity.roles.<a href="./src/resources/identity/roles.ts">create</a>({ ...params }) -> Role</code>
- <code title="patch /v1/identity/roles/{id}">client.identity.roles.<a href="./src/resources/identity/roles.ts">update</a>(id, { ...params }) -> Role</code>
- <code title="delete /v1/identity/roles/{id}">client.identity.roles.<a href="./src/resources/identity/roles.ts">delete</a>(id) -> RoleDeleteResponse</code>

# Settings

## PortalDomains

Types:

- <code><a href="./src/resources/settings/portal-domains/portal-domains.ts">CreatePortalDomainRequest</a></code>
- <code><a href="./src/resources/settings/portal-domains/portal-domains.ts">DNSRecord</a></code>
- <code><a href="./src/resources/settings/portal-domains/portal-domains.ts">ListDNSRecord</a></code>
- <code><a href="./src/resources/settings/portal-domains/portal-domains.ts">ListPortalDomain</a></code>
- <code><a href="./src/resources/settings/portal-domains/portal-domains.ts">PortalDomain</a></code>
- <code><a href="./src/resources/settings/portal-domains/portal-domains.ts">PortalDomainDeleteResponse</a></code>

Methods:

- <code title="post /v1/settings/portal-domains">client.settings.portalDomains.<a href="./src/resources/settings/portal-domains/portal-domains.ts">create</a>({ ...params }) -> PortalDomain</code>
- <code title="get /v1/settings/portal-domains">client.settings.portalDomains.<a href="./src/resources/settings/portal-domains/portal-domains.ts">list</a>() -> ListPortalDomain</code>
- <code title="get /v1/settings/portal-domains/{id}">client.settings.portalDomains.<a href="./src/resources/settings/portal-domains/portal-domains.ts">retrieve</a>(id) -> PortalDomain</code>
- <code title="delete /v1/settings/portal-domains/{id}">client.settings.portalDomains.<a href="./src/resources/settings/portal-domains/portal-domains.ts">delete</a>(id) -> PortalDomainDeleteResponse</code>

### Actions

Methods:

- <code title="post /v1/settings/portal-domains/{id}/actions/verify">client.settings.portalDomains.actions.<a href="./src/resources/settings/portal-domains/actions.ts">verify</a>(id) -> PortalDomain</code>

## Integrations

Types:

- <code><a href="./src/resources/settings/integrations.ts">AccountIntegration</a></code>
- <code><a href="./src/resources/settings/integrations.ts">CreateAccountIntegrationRequest</a></code>
- <code><a href="./src/resources/settings/integrations.ts">ListAccountIntegration</a></code>
- <code><a href="./src/resources/settings/integrations.ts">UpdateAccountIntegrationRequest</a></code>

Methods:

- <code title="get /v1/settings/integrations">client.settings.integrations.<a href="./src/resources/settings/integrations.ts">list</a>({ ...params }) -> ListAccountIntegration</code>
- <code title="post /v1/settings/integrations">client.settings.integrations.<a href="./src/resources/settings/integrations.ts">create</a>({ ...params }) -> AccountIntegration</code>
- <code title="put /v1/settings/integrations/{id}">client.settings.integrations.<a href="./src/resources/settings/integrations.ts">update</a>(id, { ...params }) -> AccountIntegration</code>
- <code title="delete /v1/settings/integrations/{id}">client.settings.integrations.<a href="./src/resources/settings/integrations.ts">delete</a>(id) -> AccountIntegration</code>
