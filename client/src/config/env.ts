export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
} as const;

// Validate environment variables
Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});
