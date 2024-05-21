import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const isActiveRoute = (path) => {
    return location.pathname === path || `${location.pathname}/` === path;
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText("+38(067)677-73-30")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <header className="absolute z-50 right-0 left-0 font-serif">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 text-xl">
        <div className="flex flex-wrap justify-between lg:justify-center items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://royal-apart.com/wp-content/uploads/2022/02/Дизайн-без-названия-41-300x300-1.png"
              className="mr-3 h-[60px] sm:h-[60px]"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <LanguageSelector
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              className="ml-2"
            />
          </div>
          <div className="hidden lg:flex lg:justify-between lg:items-center lg:w-auto">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pr-4 pl-3 ${
                    isActiveRoute("/")
                      ? "text-white bg-mainC"
                      : "text-gray-400 hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0`}
                  aria-current={isActiveRoute("/") ? "page" : undefined}
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/aparts"
                  className={`block py-2 pr-4 pl-3 ${
                    isActiveRoute("/aparts")
                      ? "text-white bg-mainC"
                      : "text-gray-400 hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0`}
                >
                  {t("apartments_header")}
                </Link>
              </li>
              <li>
                <Link
                  to="/book"
                  className={`block py-2 pr-4 pl-3 ${
                    isActiveRoute("/book")
                      ? "text-white bg-mainC"
                      : "text-gray-400 hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0`}
                >
                  {t("book")}
                </Link>
              </li>
              <li>
                <Link
                  to="/rules"
                  className={`block py-2 pr-4 pl-3 ${
                    isActiveRoute("/rules")
                      ? "text-white bg-mainC"
                      : "text-gray-400 hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0`}
                >
                  {t("rules")}
                </Link>
              </li>
              <li className="relative">
                <p
                  className="text-gray-400 font-sans text-base cursor-pointer"
                  onClick={handleCopy}
                >
                  +38(067)677-73-30
                </p>
                <p
                  className={`text-slate-500 absolute font-sans text-sm pt-1 transition-opacity duration-500 ease-in-out ${
                    copied ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Number copied to clipboard!
                </p>
              </li>
              <li>
                <LanguageSelector />
              </li>
            </ul>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center">
            <button
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <ul className="flex flex-col items-center mt-4 font-medium space-y-4">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pr-4 pl-3 ${
                    isActiveRoute("/")
                      ? "text-white bg-mainC"
                      : "text-gray-400 hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0`}
                  aria-current={isActiveRoute("/") ? "page" : undefined}
                  onClick={closeMobileMenu}
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/aparts"
                  className={`block py-2 pr-4 pl-3 ${
                    isActiveRoute("/aparts")
                      ? "text-white bg-mainC"
                      : "text-gray-400 hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0`}
                  onClick={closeMobileMenu}
                >
                  {t("apartments_header")}
                </Link>
              </li>
              <li>
                <Link
                  to="/book"
                  className={`block py-2 pr-4 pl-3 ${
                    isActiveRoute("/book")
                      ? "text-white bg-mainC"
                      : "text-gray-400 hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0`}
                  onClick={closeMobileMenu}
                >
                  {t("book")}
                </Link>
              </li>
              <li>
                <Link
                  to="/rules"
                  className={`block py-2 pr-4 pl-3 ${
                    isActiveRoute("/rules")
                      ? "text-white bg-mainC"
                      : "text-gray-400 hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0`}
                  onClick={closeMobileMenu}
                >
                  {t("rules")}
                </Link>
              </li>
              <li className="relative">
                <p
                  className="text-gray-400 font-sans text-base cursor-pointer"
                  onClick={handleCopy}
                >
                  +38(067)677-73-30
                </p>
                <p
                  className={`text-slate-500 absolute font-sans text-sm pt-1 transition-opacity duration-500 ease-in-out ${
                    copied ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Number copied to clipboard!
                </p>
              </li>
              <li>
                <LanguageSelector />
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
