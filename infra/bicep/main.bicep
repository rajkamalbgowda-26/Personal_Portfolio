targetScope = 'resourceGroup'

@description('Deployment environment: development, staging, production')
@allowed([
  'development'
  'staging'
  'production'
])
param environment string = 'production'

@description('Primary Azure region for all regional resources')
param location string = resourceGroup().location

@description('Resource naming prefix')
param prefix string = 'quicksilver'

@description('ACR Login Server')
param acrLoginServer string = 'quicksilvercr.azurecr.io'

@description('API Docker Image tag')
param apiImage string = 'quicksilver-api:latest'

@description('Web Docker Image tag')
param webImage string = 'quicksilver-web:latest'

@secure()
@description('PostgreSQL administrator password')
param dbAdminPassword string

// 1. Managed Environment & Observability
module acaEnv './modules/container-apps-environment.bicep' = {
  name: 'deploy-aca-environment'
  params: {
    location: location
    prefix: '${prefix}-${environment}'
  }
}

// 2. Azure Key Vault
module keyVault './modules/keyvault.bicep' = {
  name: 'deploy-key-vault'
  params: {
    location: location
    keyVaultName: '${prefix}-${environment}-kv'
  }
}

// 3. PostgreSQL Flexible Server (pgvector enabled)
module database './modules/database.bicep' = {
  name: 'deploy-database'
  params: {
    location: location
    serverName: '${prefix}-${environment}-psql'
    adminPassword: dbAdminPassword
  }
}

// 4. Azure OpenAI & AI Search
module aiServices './modules/ai-services.bicep' = {
  name: 'deploy-ai-services'
  params: {
    location: location
    prefix: '${prefix}-${environment}'
  }
}

// 5. Container Apps (Web & API)
module containerApps './modules/container-apps.bicep' = {
  name: 'deploy-container-apps'
  params: {
    location: location
    prefix: '${prefix}-${environment}'
    environmentId: acaEnv.outputs.environmentId
    acrLoginServer: acrLoginServer
    apiImage: apiImage
    webImage: webImage
    appInsightsConnectionString: acaEnv.outputs.appInsightsConnectionString
    databaseUrl: 'postgresql://quicksilver_admin:${dbAdminPassword}@${database.outputs.serverFqdn}:5432/${database.outputs.databaseName}?sslmode=require'
  }
}

// 6. Azure Front Door (Anycast Global CDN & WAF Routing)
module frontDoor './modules/frontdoor.bicep' = {
  name: 'deploy-front-door'
  params: {
    profileName: '${prefix}-${environment}-afd'
    webFqdn: containerApps.outputs.webFqdn
    apiFqdn: containerApps.outputs.apiFqdn
  }
}

output frontDoorEndpoint string = frontDoor.outputs.endpointHostName
output webContainerAppFqdn string = containerApps.outputs.webFqdn
output apiContainerAppFqdn string = containerApps.outputs.apiFqdn
output openAiEndpoint string = aiServices.outputs.openAiEndpoint
output searchEndpoint string = aiServices.outputs.searchEndpoint

