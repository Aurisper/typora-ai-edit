# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest release | :white_check_mark: |
| Older versions | :x: |

We only provide security fixes for the latest release. Please keep your plugin up to date.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT open a public issue** — security vulnerabilities should not be disclosed publicly before a fix is available.

2. **Email the maintainer** or [open a private security advisory](https://github.com/Aurisper/typora-ai-edit/security/advisories/new) on GitHub.

3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

4. You will receive a response within **7 days** acknowledging the report.

5. A fix will be developed and released as soon as possible, typically within **30 days**.

## Security Considerations

This plugin handles sensitive data. Please be aware of:

- **API Keys** — stored in `localStorage` within Typora. Do not share your Typora profile or user data directory with untrusted parties.
- **OAuth Tokens** — stored locally by `oauth-cli-kit` in your home directory. Protect your `~/.oauth-cli-kit/` folder.
- **Document Content** — when using "Include full document context", the entire document is sent to the AI provider.
- **Image Data** — images are compressed and sent as base64 to the AI provider for description.
- **Network Traffic** — all API calls use HTTPS. The plugin does not send data to any third party other than your configured AI provider.

## Best Practices

- Use an API key with minimal necessary permissions
- Avoid using the plugin with documents containing highly sensitive information
- Regularly rotate your API keys
- Review the [CONTRIBUTING.md](CONTRIBUTING.md) if you plan to modify the plugin
