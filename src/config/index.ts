const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  auth0: {
    secret: process.env.AUTH0_SECRET!,
    baseUrl: process.env.AUTH0_BASE_URL!,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
    clientID: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  },
};

if (!config.apiBaseUrl) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in environment variables');
}

if (!config.auth0.secret || !config.auth0.baseUrl || !config.auth0.issuerBaseURL || !config.auth0.clientID || !config.auth0.clientSecret) {
  throw new Error('One or more Auth0 environment variables are missing.');
}

export default config;