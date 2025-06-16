import { MapPinIcon } from "lucide-react";
import Dice from "./Dice";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentPlayer } from "@/redux/features/selector/gameSelector";
import { Colors } from "@/helper/Colors";

const LowerDice = () => {
  const turn = useAppSelector(selectCurrentPlayer);


  return (
    <div className="flex justify-between w-full">
      <div className="dice-placement-blue flex">
        <div className="dice-placement-blue size-[35px] bg-gradient-to-r from-blue-700 to-sky-300 border-2 border-r-0 border-amber-300  relative flex justify-center items-center">
          <div className="relative ">
            <div style={{ backgroundColor: Colors.blue }} className="absolute size-3.5  top-[11px] rounded-full left-[8px] z-50 border border-slate-400"></div>

            <MapPinIcon
              color="gray"
              width={30}
              height={40}
              fill="white"
              className="z-50"
            />
          </div>
        </div>
        <div className="size-[45px] bg-gradient-to-t from-green-200 to-teal-200 relative bottom-1 rounded-sm border border-l-0 border-amber-300 flex justify-center items-center">
          <div className="size-[38px] bg-gradient-to-t from-rose-300 to-white relative flex justify-center items-center">
            {turn === 1 && <Dice playerNo={1} />}
          </div>
        </div>
      </div>
      <div className="dice-placement-yellow flex">
        <div className="dice-placement-red size-[45px] bg-gradient-to-t from-green-200 to-teal-200 relative bottom-1 rounded-sm border border-r-0 border-amber-300 flex justify-center items-center ">
          <div className="size-[38px] bg-gradient-to-t from-rose-300 to-white flex justify-center items-center">
            {turn === 4 && <Dice playerNo={4} />}
          </div>
        </div>
        <div className=" size-[35px] bg-gradient-to-l from-blue-700 to-sky-300 border-2 border-l-0 border-amber-300 relative flex  justify-center items-center">
          <div className="relative ">
            <div style={{ backgroundColor: Colors.yellow }} className="absolute size-3.5 top-[11px] rounded-full left-[8px] z-50 border border-slate-400"></div>

            <MapPinIcon
              color="gray"
              width={30}
              height={40}
              fill="white"
              className="z-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowerDice;
