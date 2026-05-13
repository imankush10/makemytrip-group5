# Make My Trip - Group 5

BDD-style end-to-end test project using:

- [Playwright](https://playwright.dev/) (`@playwright/test`)
- [Cucumber](https://github.com/cucumber/cucumber-js) (`@cucumber/cucumber`)
- [`playwright-bdd`](https://github.com/vitalets/playwright-bdd) for integrating `.feature` files with Playwright

## Prerequisites

- Node.js (LTS recommended)
- `npm`

## Install

```bash
npm install
npx playwright install
```

## Run tests

This repo currently has a `test` script that runs Cucumber directly:

```bash
npm test
```

Notes:

- The Playwright config (`playwright.config.js`) is set up for `playwright-bdd`, so you can also run via Playwright once you have `.feature` files and step definitions in the configured paths:

```bash
npx playwright test
```

## Reports

- Cucumber HTML report (if enabled via config/CLI format): `test-results/report.html`
- Playwright HTML report (Playwright runner): `playwright-report/`

## Current folder structure

```text
.
├─ cucumber.json
├─ package.json
├─ package-lock.json
├─ playwright.config.js
└─ tests/
   ├─ features/
   ├─ fixtures/
   ├─ hooks/
   ├─ pages/
   ├─ steps/
   └─ utils/
```

### What goes where (intended)

- `tests/features/`: Gherkin feature files (`.feature`) written in Given/When/Then.
  - Example: `tests/features/login.feature`
- `tests/steps/`: step definition implementations (currently configured as `tests/steps/**/*.js`).
  - These bind your Gherkin steps to Playwright actions/assertions.
  - Example: `tests/steps/login.steps.js`
- `tests/pages/`: Page Object / screen abstractions (locators + common actions).
  - Keeps step files small and readable.
  - Example: `tests/pages/LoginPage.js`
- `tests/hooks/`: Cucumber hooks (e.g., `Before`, `After`, `BeforeAll`, `AfterAll`).
  - Common uses: browser/context/page lifecycle, screenshots on failure, attaching traces.
  - Example: `tests/hooks/world.js` or `tests/hooks/hooks.js`
- `tests/fixtures/`: test data and reusable fixtures.
  - Example: JSON payloads, users/roles, test constants.
  - Example: `tests/fixtures/users.json`
- `tests/utils/`: shared helper utilities.
  - Common uses: date helpers, random data generation, API helpers, env config helpers.
  - Example: `tests/utils/waitForNetworkIdle.js`
