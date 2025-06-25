// lib/config.ts
function displayError(key: string) {
    console.error(`Environment variable "${key}" is not defined.`)
}

const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || displayError('apiBaseUrl'),
  auth0: {
    secret: process.env.NEXT_PUBLIC_AUTH0_SECRET || displayError('auth0 secret'),
    clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || displayError('auth0 clientID'),
  },
};

export default config;