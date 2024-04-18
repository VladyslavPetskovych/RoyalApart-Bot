/* eslint-disable react/prop-types */
import Slider from "./sliderRoom";

function SingleRoom({ room }) {
  return (
    <div className="bg-slate-100 h-[630px] w-[340px] md:h-[400px] md:w-[640px] mb-4 mx-2  text-lg flex md:flex-row flex-col ">
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
        <div className="w-[100%] mt-24">
          <button className="bg-amber-500 w-full">Забронювати</button>
        </div>
      </div>
    </div>
  );
}

export default SingleRoom;
