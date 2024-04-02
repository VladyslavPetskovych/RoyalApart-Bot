import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Wubook from "./components/wubook";
import MainPagebody from "./components/mainpage/mainPagebody";
import Aparts from "./pages/aparts";
import Rules from "./pages/rules";
import Contact from "./pages/contact";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPagebody />} />
        <Route path="/aparts" element={<Aparts />} />
        <Route path="/book" element={<Wubook />}></Route>
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
