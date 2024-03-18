import axios from "axios";
import { useState } from "react";
function Header() {
  const [cooldown, setCooldown] = useState(false);
  function updtPrices() {
    if (!cooldown) {
      axios.get("http://localhost:3000/getprices/setPrice");
      // Show an alert
      alert("Ціни Оновлені!");

      // Set cooldown to true
      setCooldown(true);

      // Reset cooldown after 1 minute (60 seconds)
      setTimeout(() => {
        setCooldown(false);
      }, 60000);
    } else {
      alert("Зачекайте хвилину, щоб оновити ціни ще раз!");
    }
  }
  return (
    <nav className="sticky top-0 z-50 bg-black">
      <div className="p-4 ">
        <button className="bg-red-600 h-[60px] ml-[20px] p-2 font-serif text-2xl font-bold text-zinc-50 hover:bg-sky-700">
          Login
        </button>
        <button
          onClick={updtPrices}
          className="bg-green-600 ml-[90px] h-[60px] ml-[20px] p-2 font-serif text-2xl font-bold text-zinc-50 hover:bg-sky-700"
        >
          {" "}
          Оновити ціни
        </button>
      </div>
    </nav>
  );
}

export default Header;
