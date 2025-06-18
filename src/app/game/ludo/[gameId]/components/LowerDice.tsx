import { useAppSelector } from "@/redux/hooks";
import { Colors } from "@/helper/Colors";
import DicePocket from "./dice-pocket";

const LowerDice = () => {
  const { totalPlayers: playersCount, players } = useAppSelector(state => state.ludo);

  return (
    <div className={`flex ${playersCount === 4 ? "justify-between" : players.find(p => p.id === "P1") ? "justify-start" : "justify-end"} w-full`}>
      {players.find(p => p.id === "P1") && <DicePocket playerNo={1} color={Colors.blue} />}
      {players.find(p => p.id === "P4") && <DicePocket playerNo={4} color={Colors.yellow} isReversed />}
    </div>
  );
};

export default LowerDice;
