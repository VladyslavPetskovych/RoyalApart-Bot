import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import ukFlag from "../assets/flags/Flag_of_Ukraine.png"; 
import engFlag from "../assets/flags/Flag_of_the_United_Kingdom.png"; 

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('English'), flag: engFlag }, 
    { code: 'uk', name: t('Ukrainian'), flag: ukFlag }, 
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-sm font-medium text-gray-600 focus:outline-none"
      >
        <img className="w-8 h-6" src={languages.find(lang => lang.code === i18n.language)?.flag} alt="Language flag" />
      </button>
      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
          {languages.map((language, index) => (
            <li
              key={index}
              onClick={() => changeLanguage(language)}
              className="cursor-pointer select-none text-gray-900 hover:bg-gray-100 py-2 px-4"
            >
              <img className="w-8 h-6 mr-2" src={language.flag} alt="Language flag" />
              <span>{language.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
