# Localization App

This is a localization-enabled React Native app built with Expo. The app supports multiple languages and allows users to switch between them dynamically.

## Features

- Multi-language support with translations
- Dynamic language switching
- Persistent language selection using AsyncStorage
- Form validation using Formik and Yup
- Navigation with Expo Router

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/localization-app.git
   cd localization-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm start
   ```
   Project Structure

```bash
project/
├── assets/                 # Static assets like images
├── components/             # Reusable components
│   ├── CommonButton.tsx    # A styled button component
│   ├── SelectLangModal.tsx # Modal for selecting language
├── pages/                  # App pages for routing
│   ├── index.tsx           # Home screen (default)
│   ├── signup.tsx          # Signup screen
├── i18n/                   # i18n configuration
│   ├── index.ts            # i18n initialization
│   ├── locales/            # Translation files
│       ├── en.json         # English translations
│       ├── hi.json         # Hindi translations
│       ├── pa.json         # Punjabi translations
│       ├── ta.json         # Tamil translations
├── App.tsx                 # Main entry point for the app
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── README.md               # Project documentation
```

How It Works
Localization

1. Initialization: The app uses react-i18next for localization. The i18n instance is configured in the i18n/index.ts file.
2. Language Persistence: The selected language is stored in AsyncStorage, so it persists between app restarts.
3. Dynamic Language Switching: Users can select a language using the SelectLangModal component, which updates the app's language in real time.

Navigation
The app uses expo-router for file-based routing. Screens are defined in the pages directory.

Form Validation
Formik and Yup are used for form handling and validation in the Login and Signup screens.

Scripts
npm start: Starts the Expo development server
npm run android: Runs the app on an Android emulator/device
npm run ios: Runs the app on an iOS simulator/device
npm run web: Runs the app in a web browser
Localization Example
