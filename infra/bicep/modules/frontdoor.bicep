@description('Front Door Profile Name')
param profileName string

@description('Backend Web FQDN')
param webFqdn string

@description('Backend API FQDN')
param apiFqdn string

resource frontDoorProfile 'Microsoft.Cdn/profiles@2023-05-01' = {
  name: profileName
  location: 'global'
  sku: {
    name: 'Standard_AzureFrontDoor'
  }
}

resource frontDoorEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2023-05-01' = {
  parent: frontDoorProfile
  name: 'quicksilver-atelier'
  location: 'global'
  properties: {
    enabledState: 'Enabled'
  }
}

// Origin Group for Web
resource webOriginGroup 'Microsoft.Cdn/profiles/originGroups@2023-05-01' = {
  parent: frontDoorProfile
  name: 'web-origin-group'
  properties: {
    loadBalancingSettings: {
      sampleSize: 4
      successfulSamplesRequired: 3
    }
    healthProbeSettings: {
      probePath: '/'
      probeRequestType: 'HEAD'
      probeProtocol: 'Https'
      probeIntervalInSeconds: 60
    }
  }
}

resource webOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2023-05-01' = {
  parent: webOriginGroup
  name: 'web-origin'
  properties: {
    hostName: webFqdn
    httpPort: 80
    httpsPort: 443
    originHostHeader: webFqdn
    priority: 1
    weight: 1000
    enabledState: 'Enabled'
  }
}

// Origin Group for API
resource apiOriginGroup 'Microsoft.Cdn/profiles/originGroups@2023-05-01' = {
  parent: frontDoorProfile
  name: 'api-origin-group'
  properties: {
    loadBalancingSettings: {
      sampleSize: 4
      successfulSamplesRequired: 3
    }
    healthProbeSettings: {
      probePath: '/health'
      probeRequestType: 'GET'
      probeProtocol: 'Https'
      probeIntervalInSeconds: 30
    }
  }
}

resource apiOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2023-05-01' = {
  parent: apiOriginGroup
  name: 'api-origin'
  properties: {
    hostName: apiFqdn
    httpPort: 80
    httpsPort: 443
    originHostHeader: apiFqdn
    priority: 1
    weight: 1000
    enabledState: 'Enabled'
  }
}

// Routing Rule for API requests (/api/*)
resource apiRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2023-05-01' = {
  parent: frontDoorEndpoint
  name: 'api-route'
  properties: {
    originGroup: {
      id: apiOriginGroup.id
    }
    supportedProtocols: ['Http', 'Https']
    patternsToMatch: ['/api/*', '/health']
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
    httpsRedirect: 'Enabled'
  }
  dependsOn: [apiOrigin]
}

// Default Routing Rule for Web frontend (/*)
resource defaultRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2023-05-01' = {
  parent: frontDoorEndpoint
  name: 'default-route'
  properties: {
    originGroup: {
      id: webOriginGroup.id
    }
    supportedProtocols: ['Http', 'Https']
    patternsToMatch: ['/*']
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
    httpsRedirect: 'Enabled'
    cacheConfiguration: {
      queryStringCachingBehavior: 'UseQueryString'
      compressionSettings: {
        isCompressionEnabled: true
        contentTypesToCompress: [
          'text/html'
          'text/css'
          'application/javascript'
          'application/json'
          'image/svg+xml'
        ]
      }
    }
  }
  dependsOn: [webOrigin, apiRoute]
}

output endpointHostName string = frontDoorEndpoint.properties.hostName

