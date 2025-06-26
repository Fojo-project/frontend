// lib/config.ts
function displayError(key: string) {
  console.error(`Environment variable "${key}" is not defined.`);
}

const config = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || displayError('apiBaseUrl'),
  googleClientId:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || displayError('googleClientId'),
};

export default config;
