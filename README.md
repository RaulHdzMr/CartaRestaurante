# Camper Cafe - Menu App (React Native)

## Description

This is a mobile application built with React Native that displays the menu for the "Camper Cafe". The app dynamically loads categories and products from a remote API. It includes an administrative "Edit Mode" that allows menu content management directly from the app's interface, with features to update and delete categories.

## Features (MVP)

- **Menu Display**: Shows a list of products organized by categories.
- **Dynamic Loading**: Fetches all menu data from an external API on startup.
- **Edit Mode**: A toggle to enable/disable admin functionalities.
- **Update Category**: Allows changing the name of an existing category through an inline form.
- **Delete Category**: Allows deleting an entire category (along with its products) after a confirmation alert.
- **Custom Design**: A themed interface with a background image and a content panel for a better user experience.

## Project Structure

The project is organized to separate API logic, UI components, and static assets.

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
|   |   `-- EditCategoryForm.jsx # Form for editing a category's name.
|   |
|   |-- Category.jsx         # Component to display a category and its products.
|   `-- MenuItem.jsx         # Component to display a single menu item.
|
`-- App.jsx                  # Main component: manages state and layout.
```

## Tech Stack

- **React Native**: Main framework for mobile app development.
- **JavaScript (ES6+)**: Programming language used.

## Getting Started

Follow these steps to run the project in your local development environment.

### Prerequisites

- Node.js and npm
- A configured React Native development environment (Expo CLI or React Native CLI).

### Installation & Running the App

1.  **Clone the repository and install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Metro development server:**
    ```bash
    npm start
    ```

3.  **Run the application:**
    - Scan the QR code with the Expo Go app on your mobile device.
    - Or press 'a' or 'i' in the terminal to open the app in an Android or iOS simulator, respectively.

## API Backend

The application connects to a custom backend to fetch and manage menu data. The main API endpoint is hosted at:

`https://jlorenzo.ddns.net/carta_restaurante`

All interaction logic with this API is encapsulated in the `src/api/menuApi.js` module.
