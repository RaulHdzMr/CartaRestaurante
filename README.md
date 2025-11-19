
# Camper Cafe Menu - React Native App

![Camper Cafe](src/assets/coffee.jpg)

Welcome to the **Camper Cafe Menu** repository, a mobile and web application built with React Native and Expo. The application displays a coffee shop's menu, organized by categories, and features an administrator mode to edit, delete, and add menu items in real-time.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Logic Abstraction](#api-logic-abstraction)
- [Babel Configuration and Module Aliases](#babel-configuration-and-module-aliases)
- [Installation and Usage](#installation-and-usage)
- [Available Scripts](#available-scripts)

---

## Features

- **Dynamic Menu**: Loads the menu from an external API.
- **Category View**: Organizes products into categories like "Food" and "Desserts".
- **Admin Mode**: Allows management of categories and products (CRUD).
  - Add, edit, and delete categories.
  - Edit products.
- **Pull-to-Refresh**: Drag down to update the menu with the latest data.
- **Responsive Design**:
  - The background image adapts to any screen size.
  - Interface compatible with mobile and web devices.

---

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: JavaScript (ES6+)
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`)
- **Navigation**: React Native native components
- **Transpiler**: Babel
- **Key Dependencies**:
  - `expo`: For app development and compilation.
  - `react`: For building the user interface.
  - `react-native-web`: For web browser compatibility.
  - `babel-plugin-module-resolver`: To simplify import paths.

---

## Project Structure

The project is organized to separate the API logic, user interface components, and static assets.

```
/src
|-- /api
|   `-- menuApi.js         # Centralizes all API call logic (fetch).
|
|-- /assets
|   |-- beans.jpg          # App background image.
|   |-- coffee.jpg         # Image for the "Food" category.
|   `-- pie.jpg            # Image for the "Desserts" category.
|
|-- /components
|   |-- /admin
|   |   |-- AddCategoryForm.jsx
|   |   |-- EditCategoryForm.jsx
|   |   `-- EditProductForm.jsx
|   |
|   |-- Category.jsx       # Component to display a category and its products.
|   `-- MenuItem.jsx       # Component to display a single menu item.
|
`-- App.jsx                # Main component: manages state and layout.
```

---

## API Logic Abstraction

A key improvement in this project was abstracting all API-related logic from the main `App.jsx` component into a dedicated module: `src/api/menuApi.js`.

#### Why was this change made?

Initially, the API fetch calls were made directly within the `App.jsx` component. This approach has several disadvantages as a project grows:

*   **Poor Separation of Concerns:** The main component becomes responsible for both rendering the UI and handling data fetching, making it bloated and harder to read.
*   **Low Reusability:** If another component needs to fetch the same data, the logic would have to be duplicated.
*   **Difficult Maintenance:** Changes to the API (e.g., URL updates, new endpoints) would require hunting down and modifying code scattered throughout the UI components.

By creating `menuApi.js`, we established a clear separation between the UI and the data layer.

*   **`App.jsx` (The UI Layer):**
    *   Focuses exclusively on managing component state (`menu`, `editMode`).
    *   Renders the user interface.
    *   Calls functions from the API module to fetch or update data, without needing to know the implementation details.

*   **`menuApi.js` (The Data Layer):**
    *   Centralizes all functions that interact with the external API (`fetch`, `POST`, `PUT`, `DELETE`).
    *   Provides a clean and reusable set of functions (`fetchMenuData`, `updateCategory`, etc.) for the rest of the application.
    *   Makes the code more modular, maintainable, and easier to debug.

This abstraction follows best practices in software development, leading to a more robust and scalable application.

---

## Babel Configuration and Module Aliases

The `babel.config.js` file is fundamental in the modern JavaScript ecosystem. Its main function is to configure **Babel**, the transpiler that converts modern JavaScript code (ES6+) and special syntax like JSX into a version compatible with all browsers and JavaScript environments.

In this project, `babel.config.js` is used to:
1.  **Use `babel-preset-expo`**: This is the default preset for Expo, which includes all the necessary transformations for React Native code to work correctly on iOS, Android, and the web.
2.  **Integrate `babel-plugin-module-resolver`**: This plugin is a quality-of-life tool that allows us to clean up and simplify module import paths.

### Why was `babel-plugin-module-resolver` added?

As a project grows, relative paths in imports become complex and difficult to maintain. For example, to import the API from a nested component, we might have a path like:

```javascript
import { fetchMenuData } from '../../api/menuApi';
```

These paths (`../../`) are fragile and confusing. If we move the component, the path breaks.

Thanks to the `module-resolver` configuration in `babel.config.js`, we have defined the `src` folder as the root (`root`) for our modules.

```javascript
// babel.config.js
plugins: [
  [
    'module-resolver',
    {
      root: ['./src'],
      alias: {},
    },
  ],
],
```

This allows us to replace relative paths with **absolute paths** from `src`, making the code cleaner and more robust:

```javascript
// Now we can do this from anywhere in the project:
import { fetchMenuData } from 'api/menuApi';
```

---

## Installation and Usage

Follow these steps to run the project in your local development environment.

1.  **Clone the repository**:
    ```bash
    git clone <REPOSITORY_URL>
    cd camper-cafe-native
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Expo development server**:
    ```bash
    npm start
    ```

This will open Expo Dev Tools in your browser. From there, you can choose to run the application on:
- An Android emulator.
- An iOS simulator.
- Your web browser.
- Or by scanning the QR code with the Expo Go app on your phone.

---

## Available Scripts

Inside the `package.json` file, you can find the following scripts:

- `npm start`: Starts the Expo development server.
- `npm run android`: Starts the app on a connected Android emulator or device.
- `npm run ios`: Starts the app on a connected iOS simulator or device.
- `npm run web`: Starts the app in your web browser.
