# Test Devsu UI

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A modern web interface for managing clients, accounts and movements. This project serves as the frontend client for the Test Devsu BE.

## 🚀 Features

- **Client, Accounts, Movements Management**: Create, update, and manage user profiles.
- **Responsive Design**: Optimized for various screen sizes.
- **Real-time Updates**: Auto-reload during development.

## 🛠️ Tech Stack

- **Framework**: [Angular](https://angular.io/)
- **Language**: TypeScript
- **Containerization**: Podman / Docker

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Development Server

To start a local development server:

```bash
ng serve
```

Once running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 📦 Code Generation

Scaffold new parts of the application using the Angular CLI.

**Generate a Component:**

```bash
ng generate component components/component-name
```

**Generate a View:**

```bash
ng generate component view/component-name
```

## 🐳 Containerization (Podman)

You can run the application inside a container using Podman.

**1. Build the image**

VERSION: example 1.0.0

```bash
podman build -t test-devsu-ui:{VERSION} .
```

**Run with interactive shell:**
Replace `{VERSION}` with the desired version tag (e.g., `1.0.0`).

```bash
podman run -it --rm -p 4200:4200 -v .:/app:Z --userns=keep-id test-devsu-ui:{VERSION} /bin/sh
```
