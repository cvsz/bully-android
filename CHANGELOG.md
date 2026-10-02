# Changelog

All notable changes to Bully Zone Android are documented here.

## [Unreleased]

### Added
- Native Android wrapper for https://bully.zone/.
- Hardened WebView configuration with cleartext and mixed-content restrictions.
- Trusted bully.zone navigation policy with controlled external link handling.
- Safe Browsing response, retry UI, file chooser, download handoff and back navigation.
- CI gates for lint, unit tests and debug APK assembly.
- Release and security documentation.
- Production roadmap and implementation checklist for standalone APK distribution.

### Changed
- Minimum Android API raised to 27 for the Safe Browsing API used by the app.
- compileSdk and targetSdk raised to API 36.
- AndroidX dependencies refreshed for strict lint compatibility.
- WebView teardown uses a non-null WebViewClient to satisfy Android/Kotlin contracts.
- BuildConfig generation explicitly enabled for debug WebView controls.

### Fixed
- BuildConfig compile failure.
- WebViewClient nullability compile failure.
- API compatibility lint failure.

### Security
- Cleartext traffic disabled.
- File/content access disabled in WebView.
- Mixed content blocked.
- Third-party cookies disabled.
- No JavaScript bridge is exposed.
- Production release signing material must never be committed to Git.

## [1.0.0] - Planned
First signed standalone APK release after all release gates are verified.
