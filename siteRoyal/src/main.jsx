import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import './i18n';

const loadLocaleData = async () => {
  const en = await import('./en.json');
  // Add other supported languages here
  return {
    en: {
      translation: en.default,
    },
  };
};

loadLocaleData().then((resources) => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
});
