// The following import statements show how the API client code
// can be imported when using mix-cli as a dependency.
import {createMixClient} from '@nuance-mix/mix-cli/lib/mix/client.js'
import * as OrganizationsAPI from '@nuance-mix/mix-cli/lib/mix/api/organizations.js'

const mixAPIServer = 'mix.api.nuance.com'

// The access token needs to be provided.
// A library like simple-oauth2 available on npm can help with that.
const token = 'your_token_here'

const options = {
  // Replace the value of userAgent with one relevant to your application.
  userAgent: 'sdk-sample-client',
  server: mixAPIServer,
}

const client = createMixClient(options)
client.setToken(token)

const response = await OrganizationsAPI.listOrganizations(client, {
  showAll: true,
  type: 'PERSONAL',
  view: 'FULL',
})

switch (response._state) {
  case 'success':
    console.log(JSON.stringify(response.data, null, 2))
    break

  case 'mixFailure':
    console.error(response.error.statusCode, response.error.message)
    break

  case 'connectionFailure':
  default:
    console.error(response.message)
    break
}
