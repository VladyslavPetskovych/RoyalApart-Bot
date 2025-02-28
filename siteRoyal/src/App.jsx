import Header from "./components/header";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import Footer from "./components/footer";
import Book from "./pages/book/book";
import MainPagebody from "./components/mainpage/mainPagebody";
import Aparts from "./pages/aparts/aparts";
import Rules from "./pages/rules/rules";
import Contact from "./pages/contact";
import RoomPage from "./pages/roomPage/roomPage";
import MiniHotel from "./pages/mini-hotel/MiniHotel";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPagebody />} />
        <Route path="/uk" element={<MainPagebody />} />
        <Route path="/en" element={<MainPagebody />} />
        <Route path="/aparts" element={<Aparts />} />
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/mini-hotel" element={<MiniHotel />}> </Route>
        <Route path="/room/:roomId" element={<RoomPage />} />
        
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
