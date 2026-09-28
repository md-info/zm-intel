const required = ['SUPABASE_URL', 'SUPABASE_SECRET_KEY'];

function getEnv() {
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    port: Number(process.env.PORT || 3000),
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY,
  };
}

module.exports = { getEnv };
