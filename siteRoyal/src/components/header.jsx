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
  return (
    <header className="absolute z-50 right-0 left-0 font-serif">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 text-xl">
        <div className="flex flex-wrap justify-between lg:justify-center  items-center mx-auto max-w-screen-xl">
          <Link to="/">
            <img
              src="https://royal-apart.com/wp-content/uploads/2022/02/Дизайн-без-названия-41-300x300-1.png"
              className="mr-3  flex h-[60px] sm:h-[60px]"
              alt="Flowbite Logo"
            />
          </Link>
          <div className="flex flex-row ">
            <div className="lg:hidden  ml-16 mt-2">
              <LanguageSelector
                aria-expanded={isMobileMenuOpen ? "true" : "false"}
              />
            </div>
            <div className="flex items-center lg:order-2">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
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
            </div>
          </div>

          <div
            className={`ml-auto flex ${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:hidden lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mx-auto  mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 shadow-lg shadow-black-500/50">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pr-4 pl-3  ${
                    isActiveRoute("/")
                      ? "text-white bg-mainC"
                      : "text-gray-400 bg-mainC hover:bg-gray-50"
                  }  lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
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
                      : "text-gray-400 bg-mainC hover:bg-gray-50"
                  }  lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
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
                      : "text-gray-400 bg-mainC hover:bg-gray-50"
                  }  lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
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
                      : "text-gray-400 bg-mainC hover:bg-gray-50"
                  }  lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
                  onClick={closeMobileMenu}
                >
                  {t("rules")}
                </Link>
              </li>
              <li>
                <p className="bg-mainC pt-5 font-sans text-base">
                  📞 +38(067)677-73-30
                </p>
              </li>
              <li>
                <p className="bg-mainC pb-5 font-sans text-base">
                  ✉ royal.apartments@ukr.net
                </p>
              </li>

              {/* Other menu items */}
            </ul>
          </div>

          {/* Regular menu for screens larger than md */}
          <div className="hidden lg:flex lg:justify-between lg:items-center lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 mx-auto">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pr-4 pl-3  ${
                    isActiveRoute("/")
                      ? "text-white bg-mainC"
                      : "text-gray-400 bg-mainC hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
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
                      : "text-gray-400 bg-mainC hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
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
                      : "text-gray-400 bg-mainC hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
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
                      : "text-gray-400 bg-mainC hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  {t("rules")}
                </Link>
              </li>
              <li>
                <p className="text-gray-400 font-sans text-base pt-0.2">
                  +38(067)677-73-30
                </p>
              </li>
              <li>
                <LanguageSelector />
              </li>
          
            </ul>
            
          </div>
       
        </div>
       
      </nav>
    </header>
  );
}

export default Header;
