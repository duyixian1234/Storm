# Product Requirement Document (PRD) - Storm

## Project Overview

Storm is a lightweight, high-performance REST API client built using Tauri and Solid.js. It aims to provide developers with a fast alternative to bloated API testing tools.

## Target Audience

- Frontend and backend developers needing a quick way to test REST APIs.
- Users who prefer a native-feeling, low-resource desktop application.

## Functional Requirements

### 1. Request Configuration

- **HTTP Methods**: Support for GET, POST, PUT, DELETE, and others.
- **URL Editor**: Intelligent URL input with query parameter synchronization.
- **Headers**: Key-value editor for request headers.
- **Query Parameters**: Dedicated editor for URL query strings.
- **Body Editor**:
  - Raw text/JSON input.
  - Form-data (multipart/form-data) support.
  - Toggle between raw body and form-data.

### 2. Response Handling

- **Status Information**: Display HTTP status code, response time, and body size.
- **Body Preview**:
  - Text/JSON with syntax highlighting (via PrismJS).
  - Visualization for Images, Audio, and Video.
  - Option to download binary files.
- **Headers**: View all returned response headers.

### 3. History & Persistence

- **Auto-save**: Automatically save successful requests to history.
- **History Browser**: List previous requests with the ability to restore state by clicking.
- **Storage**: Use local file system (via Tauri FS plugin) for data persistence.

### 4. User Experience

- **Responsive Layout**: Sidebar for history and main area for request/response.
- **Clipboard**: Copy status codes, headers, and response bodies easily.
- **Visual Feedback**: Loading indicators during active requests.

## Non-Functional Requirements

- **Performance**: Startup time under 1 second; minimal memory footprint.
- **Security**: Safe handling of local file system and network requests via Tauri's permission system.
- **Cross-Platform**: Support for Windows, macOS, and Linux.
