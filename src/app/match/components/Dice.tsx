"use client";
import { Circle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./dice.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { enableCellSelection, enablePileSelection, updateDiceRolling, updateDiceValue, updatePlayerChance } from "@/redux/features/game/ludoSlice";


const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));

const angleArr = [
  [0, 0, 0],
  [0, -90, 90],
  [0, 90, 0],
  [0, 90, 90],
  [90, 90, 90],
  [-180, -360, -90],
];

const Dice = ({ playerNo, }: { playerNo: 1 | 2 | 3 | 4 }) => {
  const cube = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const getPlayerKey = (): "P1" | "P2" | "P3" | "P4" => `P${playerNo}`
  const { isDiceRolled, diceNo, touchDiceBlock, [getPlayerKey()]: data, isDiceRolling } = useAppSelector(state => state.ludo);
  const [diceValue, setDiceValue] = useState(diceNo);

  useEffect(() => {
    setDiceValue(diceNo)
  }, [diceNo]);

  function biasedDiceRoll() {
    const rand = Math.random();

    if (rand < 0.2) return 1;          // 20%
    else if (rand < 0.2 + 0.13) return 2; // 13%
    else if (rand < 0.2 + 0.13 + 0.13) return 3; // 13%
    else if (rand < 0.2 + 0.13 + 0.13 + 0.13) return 4; // 13%
    else if (rand < 0.2 + 0.13 + 0.13 + 0.13 + 0.13) return 5; // 13%
    else return 6;                       // 30%
  }

  const handleDiceClick = async () => {
    dispatch(updateDiceRolling({ isDiceRolling: true }))
    // const value = 2;
    // const value = Math.floor(Math.random() * 6) + 1;
    const value = biasedDiceRoll();
    const diceSound = new Audio("/sfx/dice_roll.mp3");

    if (!cube.current) return;

    // Store face to rotate after animation
    cube.current.dataset.face = String(value);

    // Trigger animation
    cube.current.classList.remove("animate");
    void cube.current.offsetWidth; // force reflow
    cube.current.classList.add("animate");

    // Play sound
    diceSound.currentTime = 0;
    diceSound.play();

    await delay(1200);
    dispatch(updateDiceValue({ diceValue: value }));

    const isAnyPieceAlive = data?.findIndex(i => i.travelCount > 0 && i.travelCount <= 57);
    const isAnyPieceLock = data?.findIndex(i => i.travelCount === 0);
    console.log(isAnyPieceAlive, data)

    if (isAnyPieceAlive === -1) {
      if (value === 6) {
        dispatch(enablePileSelection({ player: playerNo }));
      } else {

        dispatch(updatePlayerChance({ player: playerNo }))
      }
    } else {
      const canMove = data?.some(i => i.travelCount + value <= 57 && i.pos !== 0);

      if (!canMove && value === 6 && isAnyPieceLock === -1 ||
        !canMove && value !== 6 && isAnyPieceLock !== -1 ||
        !canMove && value !== 6 && isAnyPieceLock === -1) {
        await delay(1200)
        dispatch(updatePlayerChance({ player: playerNo }));
        return;
      }

      if (value === 6) {

        dispatch(enablePileSelection({ player: playerNo }));
      }
      dispatch(enableCellSelection({ player: playerNo }));

    }
  };


  return (
    <div
      ref={cube}

      onAnimationEnd={() => {
        if (cube.current) {
          cube.current.classList.remove("animate");

          const face = Number(cube.current.dataset.face);
          const [x, y, z] = angleArr[face - 1];
          cube.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
        }
      }}
      onClick={() => {
        if (touchDiceBlock) return;
        if (isDiceRolled) return;
        if (isDiceRolling) return
        handleDiceClick();

      }}
      style={{
        transform: `rotateX(${angleArr[diceValue - 1][0]}deg) rotateY(${angleArr[diceValue - 1][1]}deg) rotateZ(${angleArr[diceValue - 1][2]}deg)`,
      }}
      className="cube cursor-pointer"
    >
      <div className="front 1">
        <span>
          <Circle fill="black" size={8} />
        </span>
      </div>
      <div className="back">
        <pre className="firstPre">
          <span>
            <Circle fill="black" size={8} />
          </span>
          <span>
            <Circle fill="black" size={8} />
          </span>
          <span>
            <Circle fill="black" size={8} />
          </span>
        </pre>
        <pre className="secondPre">
          <span>
            <Circle fill="black" size={8} />
          </span>
          <span>
            <Circle fill="black" size={8} />
          </span>
          <span>
            <Circle fill="black" size={8} />
          </span>
        </pre>
      </div>
      <div className="top 2">
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
      </div>
      <div className="left 3">
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
      </div>
      <div className="right 5">
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
      </div>
      <div className="bottom 4">
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
        <span>
          <Circle fill="black" size={8} />
        </span>
      </div>
    </div>
  );
};

export default Dice;
