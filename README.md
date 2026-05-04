# 🎮 TIC-TAC-TOE E2E Tests

End-to-End test automation project for the **Tic-Tac-Toe game**, built with:

- 🧪 Cucumber (BDD)
- 🎭 Playwright
- 🟦 TypeScript

This project validates critical user flows including gameplay, settings, and user management.

---

## 📌 Test Scope

### 🎮 Game Features
- Difficulty selection
- Hint system
- Game history
- Gameplay flow
- Game result validation

### ⚙️ Settings
- Language switching (EN / FA)
- Theme switching

### 👤 User Management
- User registration
- User flow validation

---

## 🧱 Project Structure

```
TIC-TAC-TOE-E2E-TESTS/
├── features/                  # Gherkin feature files (BDD scenarios)
│   ├── game/
│   ├── settings/
│   └── user/
│
├── src/
│   ├── data/                 # Test data (texts, constants)
│   ├── hooks/                # Browser lifecycle hooks
│   ├── pages/steps/          # Step definitions
│
│   ├── game/                 # Game test implementations
│   ├── settings/             # Settings test implementations
│   ├── user/                 # User test implementations
│
│   ├── support/              # World + config setup
│   └── utils/                # Helpers & reusable functions
│
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛠️ Installation

```bash
npm install
```

---

## ▶️ Running Tests

### Run all tests
```bash
npm run e2e
```

### Run tagged tests
```bash
npm run e2e:only
```

---

## 📊 Reports

After execution, test reports are generated here:

```
playwright-report/
```

Open report:
```bash
npx playwright show-report
```

---

## 🧪 Testing Strategy

This project follows a **layered testing approach**:

- Unit-level E2E flows → isolated features (language, theme, etc.)
- Integration flows → user registration + game interactions
- End-to-End flows → full user journey (login → play → result)

---

## 🎯 Design Principles

- BDD with Cucumber for readability
- Reusable step definitions
- Data-driven UI validation
- Separation of concerns (features / steps / utils)
- Maintainable and scalable test structure

---

## ✨ Example Covered Flow

- User selects language
- User registers
- Game starts
- UI is validated in selected language
- Game result is verified

---

## 📁 Tech Stack

- Playwright
- Cucumber
- TypeScript
- Node.js

---

## 🚀 Future Improvements

- Parallel test execution optimization
- Visual regression testing
- API + UI hybrid coverage
- CI/CD integration (GitHub Actions)
