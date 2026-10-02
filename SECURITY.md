# Security Policy

## Supported versions

Security fixes are applied to the latest release branch and current main.

## Reporting

Do not open public issues containing credentials, session tokens, private user data, or exploitable vulnerability details. Report security issues privately to the repository owner through GitHub's private vulnerability reporting when enabled.

## WebView security boundary

The embedded origin is restricted to HTTPS on `bully.zone` and its subdomains. Cleartext traffic, mixed content, file access, content access, third-party cookies, WebView debugging in release builds, and JavaScript native bridges are disabled.

External links are delegated to Android. The app does not bypass TLS validation.
