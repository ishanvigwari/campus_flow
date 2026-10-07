# Contributing to Campus Flow

Thank you for considering contributing to Campus Flow! This document provides guidelines and instructions for contributing to this project.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots)
- **Describe the behavior you observed and what you expected**
- **Include your environment details** (OS, browser, Java version, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear and descriptive title**
- **Detailed explanation** of the suggested enhancement
- **Use cases** - explain why this would be useful
- **Possible implementation** approach (if you have ideas)

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding standards** used throughout the project
3. **Write clear commit messages** following our commit message guidelines
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Submit the pull request** with a comprehensive description

## 🔧 Development Setup

### Prerequisites

- Java 17+
- Node.js 16+
- PostgreSQL 12+
- Maven 3.8+
- Git

### Local Development

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/campus_flow.git
   cd campus_flow
   ```

2. **Set up backend**
   ```bash
   cd backend
   # Configure application.properties
   mvn clean install
   mvn spring-boot:run
   ```

3. **Set up frontend**
   ```bash
   cd frontend
   npm install
   # Configure .env
   npm run dev
   ```

## 📝 Coding Standards

### Java (Backend)

- Follow **Java naming conventions**
- Use **meaningful variable and method names**
- Add **Javadoc comments** for public methods
- Keep methods **small and focused** (single responsibility)
- Use **Lombok** annotations to reduce boilerplate
- Handle exceptions properly with custom exception classes
- Write **unit tests** for service layer methods

### JavaScript/React (Frontend)

- Use **functional components** with hooks
- Follow **React best practices**
- Use **meaningful component and variable names**
- Keep components **small and reusable**
- Add **prop validation** where needed
- Use **const** for variables that don't change, **let** otherwise
- Format code consistently (use Prettier if available)

## 📋 Commit Message Guidelines

Follow this format:
```
<type>: <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no code change)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat: Add email notification for interview scheduling

- Implement EmailService for sending notifications
- Add email templates for interview invitations
- Update Interview entity with notification status

Closes #123
```

```
fix: Resolve authentication token expiration issue

Fixed JWT token validation that was causing premature
session timeouts for active users.

Fixes #456
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🔀 Git Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "feat: Add your feature"
   ```

3. **Keep your branch updated**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## 🎯 Priority Areas

We especially welcome contributions in these areas:

- **Testing**: Unit tests, integration tests
- **Documentation**: API docs, user guides, code comments
- **UI/UX**: Design improvements, accessibility
- **Performance**: Query optimization, caching
- **Security**: Security audits, vulnerability fixes
- **Features**: Check open issues for requested features

## ❓ Questions?

Feel free to:
- Open an issue for questions
- Tag maintainers in discussions
- Reach out via email

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect differing viewpoints and experiences

## 🎉 Recognition

All contributors will be recognized in our README and release notes!

---

Thank you for contributing to Campus Flow! 🚀
