import React from "react";
import axios from "axios";
function siteCopyDB() {
  async function handleClick() {
    console.log("clicked");
    alert("Зміни завантажуються на сайт..... зачекайте 20секунд");
   const response =  await axios.get(
      "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/siteRoyal/copy-db"
    );
    console.log(response.data)
   
  }
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-amber-600 h-10 w-[240px] m-1 px-4 ml-4 text-lg font-semibold text-zinc-50 hover:bg-sky-700"
      >
        оновити дані на сайті
      </button>
    </div>
  );
}

export default siteCopyDB;
