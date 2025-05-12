# QuickConvert - Currency Converter App

QuickConvert is a minimalist and user-friendly currency converter application built with modern web technologies. It allows users to quickly get exchange rates between various international currencies, using real-time data from the Frankfurter.app API.

##  Final Project – Build a Custom React App

This project was developed as a final project to demonstrate skills in React, Redux Toolkit, API integration, and other modern frontend tools and patterns.

## ✨ Features

* Convert amounts between a wide range of currencies.
* Select 'From' and 'To' currencies from a dynamically populated list.
* Swap 'From' and 'To' currencies with a single click.
* Real-time exchange rates (updated daily by the API).
* Clean, responsive, and minimalist user interface.
* Loading and error states for a better user experience.
* Animations for smoother transitions and interactions.

## 🛠️ Technologies Used

* **React (v18.2.0)** with Vite
* **Redux Toolkit (v2.2.5)** for state management
* **React Redux (v9.1.2)** for connecting React components to Redux
* **@tanstack/react-query (v5.40.0)** for server state management and data fetching
* **Axios (v1.7.2)** for making HTTP requests
* **Framer Motion (v11.2.10)** for animations
* **Tailwind CSS (v3.4.3)** for styling
* **React Icons (v5.2.1)** for UI icons
* **ESLint** for code linting

## ⚙️ API Used

* **Frankfurter.app API:** ([https://www.frankfurter.app/docs/](https://www.frankfurter.app/docs/)) - A free, open-source API for current and historical foreign exchange rates, published by the European Central Bank. No API key is required for basic use.

## 🚀 Running Your App Locally

To get a local copy up and running, follow these simple steps:

### Prerequisites

* Node.js (v18.x or later recommended)
* npm (v9.x or later) or yarn

### Installation & Setup

1.  **Clone the repository (if applicable) or ensure all files are in your project directory:**
    # If you have it in a git repo:
    # git clone this repo
    # cd currency-converter-app

2.  **Install NPM packages:**
    npm install

3.  **Start the development server:**
    npm run dev

    This will start the Vite development server, typically on `http://localhost:5173` (or the next available port if 5173 is busy). The application will automatically open in your default web browser.

### How I used AI responsibly

I asked the AI how can I make HTTP responses and it gave me a tutorial about how to use Axios. It also helped me create the spinner component.