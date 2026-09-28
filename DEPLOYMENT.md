# Public site deployment

The Docker image runs only the public Express server. Admin code and `.env` are excluded. Existing Supabase data remains in Supabase; do not create a new Render database.

1. Put the code in a private Git repository connected to your Render account. Do not upload `.env` or secrets in `.env.example`; use placeholders only.
2. Create a Render Blueprint from `render.yaml`. Confirm the service is **Free** and do not attach a payment method. If a card is required for your account, stop.
3. Enter `SUPABASE_URL` and `SUPABASE_SECRET_KEY` using Render's secret environment-variable inputs, never in source control. The existing server uses a privileged key: it must stay server-side. A dedicated read-only database access configuration is recommended before a broad production launch.
4. Verify `/health`, property search, property details, development details, source links and mobile layouts on the generated HTTPS URL. `/health` checks the process, not database availability.

Free hosting is limited, not guaranteed forever: Render sleeps after 15 minutes idle and enforces monthly usage limits. Without a payment method, usage exhaustion suspends services/builds instead of billing. Review https://render.com/docs/free before deploying.

Database connectivity must work before launch. A successful image build or health check does not prove records are available. Draft research is excluded by the existing published-status query. Other public record types currently have no publication workflow; review their contents before making the site public.
