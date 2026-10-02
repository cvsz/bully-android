# Release Runbook

## Release gates

1. Android CI is green: lint, unit tests, debug assembly.
2. Build a signed release AAB/APK with a production keystore stored outside Git.
3. Install the release artifact on at least one physical Android device.
4. Verify login/session persistence, logout, redirects, deep navigation, file upload, download handoff, external links, back navigation, rotation, offline/reconnect, and TLS failures.
5. Verify `https://bully.zone/` and required subdomains use valid HTTPS and do not require mixed content.
6. Run Play pre-launch testing before production rollout.
7. Stage rollout before 100% production release and monitor crashes/ANRs.

## Signing

Never commit a keystore, passwords, tokens, cookies, or service credentials. Production signing must be configured through a protected CI environment or Play App Signing.

## Rollback

Keep the previous production artifact/version available. Stop rollout immediately for authentication regressions, WebView crashes/ANRs, unsafe navigation, or data-loss/security defects. Roll forward with a higher `versionCode`; Android distribution does not support downgrading installed production versions in the normal update path.
