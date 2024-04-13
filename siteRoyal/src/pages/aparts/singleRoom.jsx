/* eslint-disable react/prop-types */

function SingleRoom({ room }) {
  return (
    
<div className="bg-gray-300 h-[400px] w-[680px] m-2 p-1 rounded-lg text-lg flex flex-row ">
  <div className="relative overflow-hidden">
    <img
      className="object-cover h-96 w-96"
      src={`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/imgs/${room.imgurl[0]}`}
      alt=""
    />
  </div>

  <div className="w-[250px]">
    <p className="font-semibold">{room.name}</p>
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
