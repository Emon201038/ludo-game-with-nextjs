import { useAppSelector } from "@/redux/hooks";
import { Colors } from "@/helper/Colors";
import DicePocket from "./dice-pocket";

const UpperDice = () => {
  const { totalPlayers: playersCount, players } = useAppSelector(state => state.ludo);

  return (
    <div className={`flex ${playersCount === 4 ? "justify-between" : players.find(p => p.id === "P2") ? "justify-start" : "justify-end"} w-full`}>
      {players.find(p => p.id === "P2") && <DicePocket playerNo={2} color={Colors.red} />}
      {players.find(p => p.id === "P3") && <DicePocket playerNo={3} color={Colors.green} isReversed />}
    </div>
  );
};

export default UpperDice;
