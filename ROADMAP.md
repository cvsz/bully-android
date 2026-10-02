# Bully Zone Android Roadmap

## Release target
Production-grade standalone Android APK for direct distribution. Google Play is out of scope. Releases are signed APKs published with SHA-256 checksums and traceable source commits.

## P0 — Release gate
- [ ] Latest PR HEAD passes strict Android CI: lint, unit tests, debug assemble.
- [ ] Resolve dependency/API compatibility without broad lint suppression.
- [ ] Add release build verification (R8/ProGuard/resource shrinking).
- [ ] Verify WebView trust boundary, Safe Browsing, mixed-content policy, cookies, file chooser, downloads and external intents.
- [ ] Add focused automated tests for URL/navigation policy and release-critical behavior.
- [ ] Merge only a green, mergeable PR.
- [ ] Re-run and pass CI on main.

## P1 — Signed standalone release
- [ ] Generate a dedicated production signing key outside Git.
- [ ] Store signing material/passwords only in protected CI secrets or an offline secure location.
- [ ] Build signed release APK from main.
- [ ] Verify APK signature, package name, versionCode/versionName and release debuggability.
- [ ] Produce SHA-256 checksum.
- [ ] Smoke-test install, launch, bully.zone navigation, back behavior, file flow, offline/retry and upgrade path.
- [ ] Publish versioned GitHub Release with APK, checksum and release notes.

## P2 — Hardening
- [ ] Add dependency/security scanning and SBOM where practical.
- [ ] Add deterministic/reproducible release metadata.
- [ ] Add rollback instructions and retain prior signed APK.
- [ ] Add crash/diagnostic policy that does not expose secrets or browsing data.
- [ ] Verify supported Android versions on representative devices/emulators.

## Definition of Done
A release is production-ready only when CI on main is green, a signed APK is traceable to the released commit, signature/checksum verification succeeds, security-critical WebView behavior is tested, and install/upgrade smoke tests have recorded evidence.
