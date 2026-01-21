# Implementation Details - Storm

## Architectural Overview

Storm uses a standard Tauri V2 architecture, separating the native Rust core from the Solid.js web frontend.

## Frontend Implementation

### State Management (`src/vm.tsx`)

- **StormProvider**: A context provider that manages the global `StormState` using `solid-js/store`.
- **Reactivity**: Uses `createMemo` to compute the "real" URL (base URL + queries) and `createEffect` for persistence triggers.
- **Actions**: Encapsulates logic for updating headers, queries, and executing requests.

### Component Structure

- **Windows.tsx**: The main application shell managing the overall layout.
- **Request Section**:
  - `UrlEditor.tsx`: Handles URL input and method selection.
  - `QueriesEditor.tsx`, `HeadersEditor.tsx`, `FormEditor.tsx`: Key-value pair editors.
- **Response Section**:
  - `ResponsePage.tsx`: Orchestrates the display of status, body, and headers.
  - `Body.tsx`: Uses conditional rendering to handle different MIME types (Text, Image, Media).

### Network Layer

- Uses `@tauri-apps/plugin-http`'s `fetch` API. This allows requests to bypass browser CORS restrictions by executing them from the Rust side.

## Backend Implementation (`src-tauri/`)

### Tauri Configuration

- **Capabilities**: Defined in `capabilities/default.json` to allow network access (`http:default`), clipboard access, and file system operations.
- **Plugins**:
  - `tauri-plugin-http` for network requests.
  - `tauri-plugin-fs` for history persistence.
  - `tauri-plugin-clipboard-manager` for clipboard actions.

## Data Persistence (`src/storage.ts`)

- History is stored as a JSON file in the application's local data directory.
- `storage.ts` provides wrappers around `@tauri-apps/plugin-fs` to `saveHistory` and `loadHistory`.

## Styling

- **Tailwind CSS**: Used for all UI components.
- **Custom CSS**: Minimal custom styles in `styles.css` and component-specific CSS (e.g., `request.css`).
