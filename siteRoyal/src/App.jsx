import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Book from "./pages/book/book";
import MainPagebody from "./components/mainpage/mainPagebody";
import Aparts from "./pages/aparts/aparts";
import Rules from "./pages/rules/rules";
import Contact from "./pages/contact";
import RoomPage from "./pages/roomPage/roomPage";
import MiniHotel from "./pages/mini-hotel/MiniHotel";
import NotFound from "./components/utils/NotFound";
import Loader from "./components/utils/loader";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<MainPagebody />} />
            <Route path="/uk" element={<MainPagebody />} />
            <Route path="/en" element={<MainPagebody />} />
            <Route path="/aparts" element={<Aparts />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/book" element={<Book />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mini-hotel" element={<MiniHotel />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
