# AutomationExercise Playwright Test Suite

End-to-end test automation framework for [AutomationExercise.com](https://automationexercise.com) built with Playwright and TypeScript.

## 🎯 What This Project Demonstrates

- **Page Object Model (POM)** with reusable page classes
- **E2E test flows** covering authentication, product browsing, and checkout
- **API testing** for backend validation
- **Cross-browser testing** across Chromium, Firefox, and WebKit
- **Data-driven approach** with external test data

## 🛠️ Tech Stack

- Playwright
- TypeScript
- Page Object Model
- GitHub Actions CI/CD

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/auth.spec.ts

# Run in headed mode
npx playwright test --headed

# View HTML report
npx playwright show-report
```

## 📂 Project Structure

```
tests/           # Test specifications
pages/           # Page Object Model classes
data/            # Test data files
playwright.config.ts  # Playwright configuration
```

## ✅ Test Coverage

- User authentication (login/signup)
- Product browsing and search
- Shopping cart operations
- Checkout flow
- API endpoint validation

---

**E-commerce automation framework demonstrating Playwright + TypeScript best practices.**
