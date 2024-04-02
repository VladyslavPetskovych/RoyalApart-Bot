import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isActiveRoute = (path) => {
    return location.pathname === path || `${location.pathname}/` === path;
  };
  return (
    <header className="absolute z-50 right-0 left-0 font-serif">
      <nav className="  border-gray-200 px-4 lg:px-6 py-2.5  text-2xl  ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <img
            src="https://royal-apart.com/wp-content/uploads/2022/02/Дизайн-без-названия-41-300x300-1.png"
            className="mr-3 h-[60px] sm:h-[60px]"
            alt="Flowbite Logo"
          />

          <div className="flex items-center lg:order-2">
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            ></button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 shadow-lg shadow-black-500/50">
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
                  Головна
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
                  Апартаменти
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
                  Забронювати
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
                  Правила
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block py-2 pr-4 pl-3 ${
                    isActiveRoute("/contact")
                      ? "text-white bg-mainC"
                      : "text-gray-400 bg-mainC hover:bg-gray-50"
                  } rounded lg:bg-transparent lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0  lg:dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Контакт 🎧
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
