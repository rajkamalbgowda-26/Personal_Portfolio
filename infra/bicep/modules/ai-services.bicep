@description('Location for AI Services')
param location string

@description('Prefix for resource names')
param prefix string

// 1. Azure OpenAI Account
resource openAiAccount 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: '${prefix}-openai'
  location: location
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: '${prefix}-openai'
    publicNetworkAccess: 'Enabled'
  }
}

// Deploy GPT-4o / GPT-4o-mini
resource gptDeployment 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
  parent: openAiAccount
  name: 'gpt-4o'
  sku: {
    name: 'Standard'
    capacity: 30
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4o'
      version: '2024-05-13'
    }
  }
}

// Deploy text-embedding-3-large
resource embeddingDeployment 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
  parent: openAiAccount
  name: 'text-embedding-3-large'
  sku: {
    name: 'Standard'
    capacity: 20
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: 'text-embedding-3-large'
      version: '1'
    }
  }
  dependsOn: [gptDeployment]
}

// 2. Azure AI Search Service for Hybrid Vector Retrieval
resource searchService 'Microsoft.Search/searchServices@2023-11-01' = {
  name: '${prefix}-search'
  location: location
  sku: {
    name: 'basic'
  }
  properties: {
    replicaCount: 1
    partitionCount: 1
    hostingMode: 'default'
    publicNetworkAccess: 'enabled'
    semanticSearch: 'free'
  }
}

output openAiEndpoint string = openAiAccount.properties.endpoint
output openAiName string = openAiAccount.name
output searchEndpoint string = 'https://${searchService.name}.search.windows.net'
output searchName string = searchService.name

