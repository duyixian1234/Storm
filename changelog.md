# Changelog - Storm

## [0.6.0] - 2026-01-21

### Added

- Created `agent.md`, `PRD.md`, and `implement.md` for better project documentation.
- Integrated Tailwind CSS for modern styling.
- URL validation and request timeout mechanism.

### Changed

- **Refactor**: Significant state management overhaul using `StormProvider` for global context.
- **UI**: Improved layout and spacing across all components for better UX.
- **Tauri**: Upgraded to Tauri 2.0 with the new plugin architecture.

## [0.5.0] - 2023-04-23

### Added

- Response summary bar: Display status code, body size, and response time above tabs.

### Fixed

- File system access error on Linux.

## [0.4.1] - 2023-04-22

### Fixed

- Issue where response headers were not being displayed correctly.

## [0.4.0] - 2023-04-22

### Added

- Support for copying response text to clipboard.

## [0.3.0] - 2023-04-21

### Added

- Request history: Support for saving and loading previous requests.
- Form-data support: Added ability to set and send form data.

## [0.2.0] - 2023-04-20

### Changed

- Migrated network layer to use Tauri native HTTP API (enabling CORS bypass).

## [0.1.0] - 2023-04-19

### Added

- Initial release with basic GET/POST support and raw body editing.
