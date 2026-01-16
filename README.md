# E-Commerce CI/CD Project

> Next.js frontend with GitFlow, GitHub Actions, and Ansible deployment automation

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Design Inspiration](#design-inspiration)
- [Project Structure](#project-structure)
- [GitFlow Workflow](#gitflow-workflow)
- [CI/CD Pipelines](#cicd-pipelines)
  - [Continuous Integration](#continuous-integration)
  - [Deployment Strategy 1](#deployment-strategy-1)
  - [Deployment Strategy 2](#deployment-strategy-2)
- [Testing Strategy](#testing-strategy)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Technical Stack](#technical-stack)

## 📖 Project Overview

This project demonstrates a complete CI/CD implementation for a Next.js e-commerce frontend application. The focus is on workflow quality, automation, and deployment strategies rather than extensive features.

**Key objectives:**
- Strict GitFlow implementation with PR-based workflow
- Comprehensive CI pipeline with GitHub Actions
- Dual deployment strategies using Ansible
- Unit and integration testing coverage
- Secure deployment with GitHub Environments

## 🎨 Design Inspiration

**Source:** [TO BE ADDED]

Design references from [Dribbble/Pinterest/Real e-commerce site].

## 📁 Project Structure

```
.
├── .github/
│   ├── workflows/        # GitHub Actions CI/CD pipelines
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── ansible/              # Ansible playbooks for deployment
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable React components
│   └── __tests__/       # Unit and integration tests
├── public/              # Static assets
└── README.md
```

## 🌿 GitFlow Workflow

This project follows strict GitFlow conventions:

- **`main`**: Production-ready code (protected)
- **`develop`**: Integration branch (protected)
- **`feature/*`**: New features → PR to `develop`
- **`bug/*`**: Bug fixes → PR to `develop`
- **`release/*`**: Release preparation → PR to `main` + `develop`
- **`hotfix/*`**: Emergency fixes → PR to `main` + `develop`

**Commit conventions:**
- `feat:` New features
- `bug:` Bug fixes
- `ci:` CI/CD changes
- `chore:` Maintenance tasks
- `docs:` Documentation
- `test:` Test additions/modifications

**Branch naming:**
- `feature/<issue-id>-<short-description>`
- `bug/<issue-id>-<short-description>`
- `release/<version>`

## 🔄 CI/CD Pipelines

### Continuous Integration

GitHub Actions pipeline running on every PR to `develop` and `main`:

1. **Checkout** code
2. **Setup** Node.js environment
3. **Install** dependencies (with caching)
4. **Lint** code quality
5. **Unit tests** execution
6. **Integration tests** execution
7. **Build** application

Pipeline status must be green before merge approval.

### Deployment Strategy 1: Controlled Deployment

- **Trigger:** Manual workflow dispatch or separate approval job
- **Target:** Staging environment (develop branch)
- **Process:** CI passes → Manual Ansible deployment trigger
- **Environment:** `staging` with GitHub Environment protection

### Deployment Strategy 2: Full Automation

- **Trigger:** Automatic on merge to `main` or version tag
- **Target:** Production environment
- **Process:** CI passes → Automated Ansible deployment via GHA
- **Environment:** `production` with approval gates

## 🧪 Testing Strategy

### Unit Tests
- Component testing with Jest + React Testing Library
- Coverage: Header, ProductCard, FilterBar components
- Focus: Props handling, rendering, user interactions

### Integration Tests
- Page-level scenarios
- Coverage: Product catalog with filters, Product detail page
- Focus: Data flow, user journeys, component integration

### E2E Tests (Bonus)
- Playwright for critical user flows (optional)

## 🚀 Deployment

**Target Environment:**
- Google Cloud VM (Ubuntu/Debian)
- Application port: `3003`
- Deployment method: Ansible via SSH

**Ansible Playbook Features:**
- Server environment preparation
- Dependency installation
- Application build
- Systemd service management
- Health check validation (`/api/health`)
- Idempotent execution

**Security:**
- GitHub Secrets for sensitive data
- GitHub Environments with approval rules
- SSH key-based authentication

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Build for production
npm run build
```

## 🛠️ Technical Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest, React Testing Library
- **CI/CD:** GitHub Actions
- **Deployment:** Ansible
- **Infrastructure:** Google Cloud Platform

---

**Author:** Ilias Benharrat
**Academic Year:** 2025-2026
**Institution:** EEMI
