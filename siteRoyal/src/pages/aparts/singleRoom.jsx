/* eslint-disable react/prop-types */
import Slider from './sliderRoom'

function SingleRoom({ room }) {
  return (
    <div className="bg-slate-100 h-[400px] w-[680px] mb-4 mx-2  text-lg flex flex-row ">
      <Slider room={room} />

      <div className="w-[250px]">
        <p className="font-semibold text-2xl">{room.name}</p>
        <p>Категорія {room.category} грн</p>
        <p>Ціна: {room.price} грн</p>
        <p>Кількість кімнат: {room.numrooms}</p>
        <p>Поверх: {room.floor}</p>
        <p>Кількість гостей: {room.guests}</p>
        <p>Площа: {room.surface} м2</p>
        <p>Кількість ліжок: {room.beds}</p>
      </div>
    </div>
  );
}

export default SingleRoom;
