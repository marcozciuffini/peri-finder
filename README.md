# peri-finder

A mobile app for finding Nando's restaurants, built with Expo (bare workflow) and React Native.

## Prerequisites

| Tool | Version Built With |
|------|---------|
| Node | 24.14.1 |
| Ruby | 3.3.11 |
| CocoaPods | 1.16.2 |
| Xcode | 26.4.1 |
| Java (JDK) | OpenJDK 17.0.18 |

## Setup

```bash
npm install
npm run ios       # iOS
npm run android   # Android (start an emulator or plug in a device first)
```

> A full native build is recommended — the app uses a custom native module that won't function correctly via `expo start` alone.

## Changes to native modules

If `ios/` or `android/` are missing, out of date, or you've changed `app.json` or `modules/`:

```bash
npx expo prebuild --clean
cd ios && pod install && cd ..
```

## Testing

### Unit and integration tests (Jest)
```bash
npm test                  # run all tests
npm run test:watch        # watch mode
npm run test:coverage     # with coverage report
```

Tests live in `__tests__/` folders next to the code they cover. Unit tests cover individual components, hooks, and stores in isolation. The integration test at `app/__tests__/RestaurantsPage.test.tsx` tests the full page → store → API flow with only the network boundary mocked.

### E2E tests (Maestro)

```bash
brew install maestro
npm run ios
maestro test .maestro/suite.yml
```

Flows live in `.maestro/flows/`. Shared setup is in `.maestro/subflows/app_startup.yml`.

## Project structure

```
app/          # File-based routes (Expo Router)
components/   # UI components, each in their own folder with a styles/ subfolder
config/       # App-level configuration (toast styling)
constants/    # Theme colours, font families, palette
types/        # Shared TypeScript types
hooks/        # Custom hooks (single-concern)
stores/       # Zustand state stores
services/     # API layer (apisauce)
modules/      # Custom native modules
locales/      # i18n translation files (en only)
assets/       # Images, fonts
.maestro/     # Maestro E2E flows
```

## Gotchas

- **Custom native module** — `modules/app-version` is a native module. Changes to it require re-running `npx expo prebuild` + a full rebuild. A JS-only reload won't pick them up.

- **Android environment** — Requires `ANDROID_HOME` and `JAVA_HOME` set in your shell profile:
  ```bash
  export JAVA_HOME=$(/usr/libexec/java_home -v 17)
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
  ```
