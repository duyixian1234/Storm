# Storm Agent Guide

## Project Description

Storm is a lightweight REST API client built with Tauri and Solid.js.

### Project Goals

- **Lightweight**: Provide a fast and efficient API debugging experience.
- **Full-featured**: Support common HTTP methods, query parameters, headers, and body settings.
- **Result Visualization**: Support previewing responses in various formats (text, image, audio, video, etc.).
- **Persistency**: Support saving and loading request history.

### Tech Stack

- **Backend**: Tauri (Rust)
- **Frontend**: Solid.js (TypeScript), Vite
- **Styling**: Tailwind CSS, PostCSS
- **Core Plugins**: `@tauri-apps/plugin-http`, `@tauri-apps/plugin-clipboard-manager`

## Development Workflow

Track project progress using the following files:

- **[PRD.md](PRD.md)**: Define functional requirements.
- **[impletment.md](impletment.md)**: Document implementation plans and technical details.
- **[changelog.md](changelog.md)**: Track version change logs.

## Code Style Guide

- **TypeScript**: Strict type checking, prefer `interface`.
- **Solid.js**: Keep component logic concise, use `createSignal` and `createMemo` appropriately.
- **Component Structure**: Organized by functional modules in `src/components/`.
- **Rust**: Modular design, keep `main.rs` logic minimal.
- **Naming Conventions**:
  - Components & Types: `PascalCase`
  - Variables & Functions: `camelCase`
  - Rust Functions: `snake_case`
- **Styling**: Prefer Tailwind CSS utility classes.
