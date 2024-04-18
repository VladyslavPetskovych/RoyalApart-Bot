/* eslint-disable react/prop-types */
import Slider from "./sliderRoom";

function SingleRoom({ room }) {
  return (
    <div className="border-2 border-orange-50 hover:shadow-lg hover:shadow-orange-300/30 m-3 h-[630px] w-[340px] md:h-[340px] md:w-[540px] mb-4 mx-2  text-lg flex md:flex-row flex-col ">
      <Slider room={room} />

      <div className="max-w-[254px] w-full h-[50%]">
        <p className="font-semibold text-2xl">{room.name}</p>
        <p>Категорія {room.category} грн</p>
        <p>Ціна: {room.price} грн</p>
        <p>Кількість кімнат: {room.numrooms}</p>
        <p>Поверх: {room.floor}</p>
        <p>Кількість гостей: {room.guests}</p>
        <p>Площа: {room.surface} м2</p>
        <p>Кількість ліжок: {room.beds}</p>
        <div className="w-[100%] mt-16">
          <button className=" h-10 bg-gradient-to-br from-amber-600 to-amber-400 rounded-md w-[70%] hover:shadow-lg shadow-md shadow-orange-500/90  hover:shadow-orange-500/90">Забронювати</button>
        </div>
      </div>
    </div>
  );
}

export default SingleRoom;
