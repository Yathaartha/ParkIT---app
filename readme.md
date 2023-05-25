# React Native App

This repository contains a React Native application that is built for handling a smart parking system. The app is developed using React Native, a popular JavaScript framework for building cross-platform mobile applications.

## Features

- Book Parking Slot
- Find Parking Slot
- Admin Login
- Admin Dashboard
- Exit Parking
- Nearby Restaurants
- Parking lot visualization with route generation

## Prerequisites

Before running the application, ensure that you have the following dependencies installed:

- [Node.js](https://nodejs.org) - Make sure you have Node.js installed on your system.
- [React Native CLI](https://reactnative.dev/docs/environment-setup) - Install React Native CLI globally.

## Getting Started

Follow the instructions below to get the application up and running on your local machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/Yathaartha/ParkIT-app
   ```

2. Navigate to the project directory:

   ```bash
   cd ParkIT-app
   ```

3. Install the dependencies:

   ```bash
   yarn
   ```

4. Start the application:

   For iOS:

   ```bash
   npx react-native run-ios
   ```

   For Android:

   ```bash
   npx react-native run-android
   ```

   This will start the development server and launch the app on the iOS or Android simulator/emulator.

## Folder Structure

The folder structure of this project is as follows:

```
ParkIT-app/
  ├── __tests__/
  ├── .bundle/
  ├── android/
  ├── ios/
  ├── node_modules/
  ├── src/
  |   ├── api/
  |   ├── assets/
  │   ├── components/
  |   ├── constants/
  │   ├── modules/
  │   ├── views/
  │   ├── store.js
  |   App.jsx
  ├── .gitignore
  ├── .prettierrc
  ├── .eslintrc
  ├── package.json
  └── README.md
```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the original repository.
