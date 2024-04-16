import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const loadLocaleData = async () => {
  const en = await import("./en.json");
  const uk = await import("./uk.json");
  // Add other supported languages here
  return {
    en: {
      translation: en.default,
    },
    uk: {
      translation: uk.default,
    },
  };
};

loadLocaleData().then((resources) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en", // Default language
    interpolation: {
      escapeValue: false,
    },
  });
});
