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
```

> A full native build is recommended — the app uses a custom native module that won't function correctly via `expo start` alone.

## iOS

**Debug**
```bash
npm run ios
```

Alternatively, open `ios/PERiFinder.xcworkspace` in Xcode, select a connected device or simulator as the destination, and hit **Run** (⌘R). Note that `npm run ios` handles `pod install` automatically — if building directly through Xcode you'll need to run `cd ios && pod install` manually first.

**Release**
```bash
npm run ios:release
```

Alternatively, follow the same Xcode steps as debug, but first go to **Product → Scheme → Edit Scheme**, set the Build Configuration to **Release**, then hit **Run** (⌘R).

## Android

Make sure `ANDROID_HOME` and `JAVA_HOME` are set in your shell profile before running — see Gotchas below if you hit errors.

**Debug**
```bash
npm run android
```
Start an emulator in Android Studio first, or plug in a device.

**Release**
```bash
npm run android:release
```

## Changes to native modules

If `ios/` or `android/` are missing, out of date, or you've changed `app.json` or `modules/`:

```bash
npx expo prebuild --clean
npm run ios
```

## Testing

### Unit and integration tests (Jest)
```bash
npm run test
npm run test:watch
```

Tests live in `__tests__/` folders next to the code they cover. Unit tests cover individual components, hooks, and stores in isolation. The integration test at `app/__tests__/RestaurantsPage.test.tsx` tests the full page → store → API flow with only the network boundary mocked.

### E2E tests (Maestro)

Install Maestro via the official script (recommended — Homebrew checksums can get out of sync with new releases):
```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

Then build and run the app on a simulator first:
```bash
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
