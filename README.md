# Bully Android

Android client for **https://bully.zone/** using a hardened native WebView shell.

## Production baseline

- Kotlin / Android SDK 35, minSdk 26
- HTTPS-only network policy; mixed content blocked
- In-app navigation restricted to `bully.zone` and its HTTPS subdomains
- External links delegated to Android
- First-party cookies/session support; third-party cookies disabled
- File chooser support without broad storage permission
- Downloads handed off to an external handler instead of granting WebView filesystem access
- Release WebView debugging disabled; no JavaScript native bridge
- Back navigation, state restore, offline/error recovery
- R8/resource shrinking for release
- CI gates for Android Lint, unit tests, and debug APK assembly

## Build

Requires JDK 17 and Android SDK 35.

```bash
gradle --no-daemon lintDebug testDebugUnitTest assembleDebug
```

The CI workflow installs Gradle 8.9. Local developers may generate a wrapper with `gradle wrapper --gradle-version 8.9` after cloning.

## Release

A CI-green debug build is **not** sufficient evidence for production release. Follow [docs/RELEASE.md](docs/RELEASE.md), configure protected signing outside Git, test a signed release artifact on physical devices, and complete staged rollout checks.

## Security

See [SECURITY.md](SECURITY.md). Never commit keystores, signing passwords, session cookies, API tokens, or other secrets.
