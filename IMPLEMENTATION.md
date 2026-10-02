# Production Implementation Plan

## Scope
Bully Zone Android is distributed directly as a signed APK. Google Play Store integration, AAB publishing and Play Console requirements are intentionally out of scope.

## 1. Build baseline
- Application ID: `zone.bully.app`
- Java/Kotlin target: 17
- minSdk: 27
- compileSdk/targetSdk: 36
- Release build: minification and resource shrinking enabled.
- CI must fail on lint errors/warnings configured as errors.

Acceptance: clean checkout passes lint, tests and APK assembly in CI.

## 2. WebView security boundary
Only HTTPS bully.zone and explicitly trusted bully.zone subdomains may remain in the embedded WebView. Untrusted navigation must not silently inherit app privileges. Block cleartext, mixed content, file/content access and unsafe schemes. Keep third-party cookies disabled and do not expose JavascriptInterface objects.

Acceptance: automated URL-policy tests plus manual smoke evidence cover trusted, untrusted and malformed URLs.

## 3. Lifecycle and UX
Preserve WebView state across activity recreation, support back history, expose retry on main-frame failure, use system file selection, and hand downloads/external schemes to appropriate external handlers.

Acceptance: launch, back, rotate/recreate, offline/retry, upload and download paths behave predictably without crashes.

## 4. CI release gates
PR pipeline:
1. lintDebug
2. testDebugUnitTest
3. assembleDebug
4. release compilation/assembly verification
5. artifact upload where safe

No merge while the latest HEAD has a genuine failing gate. External entitlement warnings unrelated to application correctness are non-blocking.

## 5. Signing
Create one long-lived production signing identity. Never commit keystore/passwords. CI signing, if enabled, must reconstruct credentials from protected secrets and clean temporary files after use.

Required verification:
- APK signature valid
- expected certificate fingerprint recorded securely
- package is `zone.bully.app`
- release is not debuggable
- version metadata matches release tag

## 6. Direct distribution
Release naming: `bully-zone-vX.Y.Z.apk`.
Publish:
- signed APK
- `SHA256SUMS.txt`
- release notes
- source tag/commit reference
- minimum supported Android version
- upgrade/install instructions

Users must be told Android may require permission to install apps from the distribution source.

## 7. Verification matrix
Automated: lint, unit tests, assemble, release build, checksum/signature checks where credentials are available.
Manual/device: clean install, upgrade from prior signed version, cold start, session/login, navigation, back, file picker, download, offline/reconnect and invalid TLS/navigation behavior.

## 8. Rollback
Never overwrite historical release artifacts. Keep the prior signed APK and release notes. A rollback build must use the same signing identity and a valid Android versionCode strategy.

## Release checklist
- [ ] PR latest HEAD green
- [ ] security tests green
- [ ] release build green
- [ ] PR merged
- [ ] main CI green
- [ ] signed APK produced
- [ ] signature verified
- [ ] SHA-256 published
- [ ] device smoke evidence recorded
- [ ] version tag/release published
- [ ] previous release retained for rollback
