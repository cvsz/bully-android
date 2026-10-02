# Install Attribution Endpoint

Deploys a minimal Cloudflare Worker for `https://install.bully.zone/v1/install`.

The Android app generates a random UUID on first launch and sends it with referral `56222`, package/version metadata and platform. The endpoint stores one record per UUID in Workers KV and treats retries as duplicates.

No IMEI, Android ID, advertising ID, contacts, location, account identity or WebView browsing data is collected.

## Routes
- `POST /v1/install` — idempotent install event
- `GET /healthz` — health check

## Deployment
1. Create a Workers KV namespace and replace the placeholder IDs in `wrangler.toml`.
2. Deploy with Wrangler.
3. Route `install.bully.zone/*` to the Worker and ensure HTTPS.
4. Verify `/healthz`, then install a fresh APK and confirm exactly one KV record is created for repeated launches.

Do not ship an APK claiming telemetry is active until the production endpoint is deployed and verified.
