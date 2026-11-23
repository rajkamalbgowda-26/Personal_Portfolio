@description('Location for Container Apps')
param location string

@description('Prefix for resource names')
param prefix string

@description('Container Apps Managed Environment ID')
param environmentId string

@description('ACR Login Server')
param acrLoginServer string

@description('API Image tag')
param apiImage string

@description('Web Image tag')
param webImage string

@description('Application Insights Connection String')
param appInsightsConnectionString string

@description('Database connection string')
@secure()
param databaseUrl string

// 1. API Container App (FastAPI)
resource apiApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: '${prefix}-api'
  location: location
  properties: {
    managedEnvironmentId: environmentId
    configuration: {
      ingress: {
        external: true
        targetPort: 8000
        transport: 'auto'
        allowInsecure: false
        corsPolicy: {
          allowedOrigins: [
            'https://rajkamalgowda.dev'
            'http://localhost:3000'
            'http://localhost:3005'
          ]
          allowedMethods: ['GET', 'POST', 'OPTIONS']
          allowedHeaders: ['*']
          allowCredentials: true
        }
      }
      secrets: [
        {
          name: 'db-url'
          value: databaseUrl
        }
        {
          name: 'appinsights-key'
          value: appInsightsConnectionString
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'api'
          image: '${acrLoginServer}/${apiImage}'
          resources: {
            cpu: json('0.5')
            memory: '1.0Gi'
          }
          env: [
            {
              name: 'ENVIRONMENT'
              value: 'production'
            }
            {
              name: 'DATABASE_URL'
              secretRef: 'db-url'
            }
            {
              name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
              secretRef: 'appinsights-key'
            }
          ]
          probes: [
            {
              type: 'Liveness'
              httpGet: {
                path: '/health'
                port: 8000
              }
              periodSeconds: 15
            }
          ]
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 5
        rules: [
          {
            name: 'http-scaling'
            http: {
              metadata: {
                concurrentRequests: '50'
              }
            }
          }
        ]
      }
    }
  }
}

// 2. Web Container App (Next.js)
resource webApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: '${prefix}-web'
  location: location
  properties: {
    managedEnvironmentId: environmentId
    configuration: {
      ingress: {
        external: true
        targetPort: 3000
        transport: 'auto'
        allowInsecure: false
      }
    }
    template: {
      containers: [
        {
          name: 'web'
          image: '${acrLoginServer}/${webImage}'
          resources: {
            cpu: json('0.5')
            memory: '1.0Gi'
          }
          env: [
            {
              name: 'NODE_ENV'
              value: 'production'
            }
            {
              name: 'NEXT_PUBLIC_API_URL'
              value: 'https://${apiApp.properties.configuration.ingress.fqdn}'
            }
          ]
          probes: [
            {
              type: 'Liveness'
              httpGet: {
                path: '/'
                port: 3000
              }
              periodSeconds: 20
            }
          ]
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 5
      }
    }
  }
}

output apiFqdn string = apiApp.properties.configuration.ingress.fqdn
output webFqdn string = webApp.properties.configuration.ingress.fqdn

