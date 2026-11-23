@description('Location for PostgreSQL')
param location string

@description('Server name')
param serverName string

@description('Administrator username')
param adminUsername string = 'quicksilver_admin'

@secure()
@description('Administrator password')
param adminPassword string

resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2023-03-01-preview' = {
  name: serverName
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    version: '16'
    administratorLogin: adminUsername
    administratorLoginPassword: adminPassword
    storage: {
      storageSizeGB: 32
    }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
    highAvailability: {
      mode: 'Disabled'
    }
  }
}

// Enable pgvector and uuid extensions
resource pgVectorExtension 'Microsoft.DBforPostgreSQL/flexibleServers/configurations@2023-03-01-preview' = {
  parent: postgresServer
  name: 'azure.extensions'
  properties: {
    value: 'vector,uuid-ossp'
    source: 'user-override'
  }
}

// Allow Azure Services Firewall Rule
resource firewallRuleAzure 'Microsoft.DBforPostgreSQL/flexibleServers/firewallRules@2023-03-01-preview' = {
  parent: postgresServer
  name: 'AllowAllAzureServices'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

resource database 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2023-03-01-preview' = {
  parent: postgresServer
  name: 'portfolio'
  properties: {
    charset: 'UTF8'
    collation: 'en_US.utf8'
  }
}

output serverFqdn string = postgresServer.properties.fullyQualifiedDomainName
output databaseName string = database.name

