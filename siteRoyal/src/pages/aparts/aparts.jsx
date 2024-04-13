import PickNumRoom from "./pickNumRoom";
import RoomCard from "./roomCard";
function aparts() {
  return (
    <div className="h-full  text-black bg-black flex flex-col">
      <div className="mt-[150px] flex flex-row">
        <RoomCard />
        <PickNumRoom />
      </div>
    </div>
  );
}

export default aparts;
