import { useAppSelector } from '@/redux/hooks';
import { MapPinIcon } from 'lucide-react';
import React, { memo, useCallback, useMemo } from 'react';
import "./pile.css"
import { Colors } from '@/helper/Colors';

interface PileProps {
  cell: boolean;
  pieceId: string;
  color: string;
  player: 1 | 2 | 3 | 4;
  onClick: ({ player, pieceId }: { player: number, pieceId: string }) => void
}
const Pile = ({ cell, pieceId, color, player, onClick }: PileProps) => {
  const diceNo = useAppSelector(state => state.ludo.diceNo)
  const state = useAppSelector(state => state.ludo);
  const playerPieces = state[`P${player}`];

  const isPileEnabled = useMemo(() => player === state.pileSelectionPlayer, [player, state.pileSelectionPlayer]);
  const isCellEnabled = useMemo(() => player === state.cellSelectionPlayer, [player, state.cellSelectionPlayer]);

  const isForwardable = useCallback(() => {
    const piece = playerPieces.find(p => p.id === pieceId);
    return piece && piece.travelCount + diceNo <= 57;
  }, [diceNo, pieceId, playerPieces])
  return (
    <div
      key={`${player}-${pieceId}`}
      data-player={player}
      data-piece={pieceId}
      onClick={() => {
        if (cell) {
          if (!(isCellEnabled && isForwardable())) return;
          onClick({ player, pieceId });
        } else {
          if (!(isPileEnabled && isForwardable())) return;
          onClick({ player, pieceId });
        }
      }}
      className={`relative ${(isForwardable() && (isPileEnabled || isCellEnabled)) ? "cursor-pointer" : ""}`}
    >
      <div className="pin ">
        <div
          style={{ backgroundColor: color }}
          className={`absolute size-3.5  top-[11px] rounded-full left-[8px] border border-slate-400`}
        ></div>

        <div className=" z-50">
          <MapPinIcon
            color="gray"
            width={30}
            height={40}
            fill="white"
            className="z-50"
          />
        </div>
        {(isForwardable() && (cell ? isCellEnabled : isPileEnabled)) && <div style={{ animation: "highlightPiece 1s infinite linear" }} className={`absolute top-5 left-[5px] size-5 border-2 ${!cell && color === Colors.red ? "border-white" : "border-black"} shadow rounded-full -z-10 border-dashed`}></div>}
        {!(isForwardable() && (cell ? isCellEnabled : isPileEnabled)) && <div className="absolute top-5 left-[5px] size-5 border-2 border-black rounded-full -z-10"></div>}
      </div>
      {/* Your piece content here */}
    </div>
  )
}

export default memo(Pile)