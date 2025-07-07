# 🌦️ Weather App

A  weather forecasting app built using **React**, **Redux Toolkit**, and **Axios**. This app allows users to search for a city, view the current weather, 24-hour and 5-day forecasts, and even fetch weather using geolocation.

---

## 🚀 Features

- 🔄 State management with **Redux Toolkit**
- 🌐 API integration using **Axios** + **WeatherAPI**
- 🔍 Debounced input search using 
- 📍 Geolocation support for instant weather lookup
- 🌡️ Toggle between **Celsius & Fahrenheit**
- ⚠️ Error handling with fallback UI
- 🧹 Clean folder structure and component separation

---

## 🧱 Tech Stack

- **React** + **Vite**
- **Redux Toolkit**
- **Axios**
- **React Router**
- **WeatherAPI**
- **CSS (BEM naming)**

---

## 📂 Folder Structure

```plaintext
📦 src
├── 📁 app
│   └── store.js              # Redux store configuration
├── 📁 assets                 # Icons / images
├── 📁 components
│   ├── 📁 Header
│   ├── 📁 Weather
│   ├── 📁 Daily
│   ├── 📁 Hourly
│   └── 📁 NoResult
├── 📁 features
│   └── 📁 weather            # Redux slice + async thunk
│       └── weatherslice.js
├── 📁 pages
│   ├── DailyPage.jsx
│   ├── HourlyPage.jsx
├── App.jsx
├── main.jsx
└── index.css
