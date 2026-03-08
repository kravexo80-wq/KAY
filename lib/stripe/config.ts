function getRequiredEnvValue(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function hasStripeCheckoutEnv() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function hasStripeWebhookEnv() {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);
}

export function getStripeSecretKey() {
  return getRequiredEnvValue("STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY);
}

export function getStripeWebhookSecret() {
  return getRequiredEnvValue(
    "STRIPE_WEBHOOK_SECRET",
    process.env.STRIPE_WEBHOOK_SECRET,
  );
}

export function getAppUrl() {
  const value =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.APP_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!value) {
    return "http://localhost:3000";
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value.replace(/\/$/, "");
  }

  return `https://${value.replace(/\/$/, "")}`;
}
