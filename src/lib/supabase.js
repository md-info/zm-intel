const { createClient } = require('@supabase/supabase-js');
const { getEnv } = require('../config/env');

const env = getEnv();

// This client runs only in Node. Do not import it into browser code.
const supabase = createClient(env.supabaseUrl, env.supabaseSecretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

module.exports = { supabase };
