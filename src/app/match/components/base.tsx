"use client";
import { PlayerState } from '@/redux/features/game/initialStats';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useMemo } from 'react'
import Pile from './Pile';
import { startingPoints } from '@/helper/PlotData';
import { unfreezeDice, updatePlayerPieceValue } from '@/redux/features/game/ludoSlice';

const PlayerBase = ({ color, player }: { color: string, player: 1 | 2 | 3 | 4 }) => {

  const dispatch = useAppDispatch()
  const { [`P${player}` as "P1" | "P2" | "P3" | "P4"]: data, currentPlayer, players } = useAppSelector(state => state.ludo);

  const handleClick = async (value: { player: number, pieceId: string }) => {
    const playerNo = `P${value.player}` as "P1" | "P2" | "P3" | "P4";

    dispatch(updatePlayerPieceValue(
      {
        player: playerNo,
        pieceId: value.pieceId,
        pos: startingPoints[player - 1],
        travelCount: 1
      }));
    dispatch(unfreezeDice())
  };

  const playerName = useMemo(() => {
    return players.find(p => Number(p.id.slice(1)) === player)?.name
  }, [player, players])
  return (
    <div id={`player-${player}`} className={`relative w-[40%] h-full  flex items-center justify-center p-5 md:p-7`}>
      <div style={{ backgroundColor: color }} className={`absolute w-full h-full top-0 left-0 z-[5] text-center flex justify-center ${[1, 4].includes(player) ? "items-end" : "items-start"} ${player === currentPlayer ? "animate-[pulse_0.7s_ease-in-out_infinite]" : "animate-none"}`}>
        <p className={`text-sm ${[1, 4].includes(player) ? "" : "rotate-180"} text-black`}>{playerName}</p>
      </div>
      <div className='w-full h-full bg-white p-2 md:p-3 flex flex-col justify-between z-10'>
        <div className='w-full flex justify-between items-center'>
          <Pocket data={data} pieceNo={1} color={color} player={player} onClick={handleClick} />
          <Pocket data={data} pieceNo={2} color={color} player={player} onClick={handleClick} />
        </div>
        <div className='w-full flex justify-between items-center'>
          <Pocket data={data} pieceNo={3} color={color} player={player} onClick={handleClick} />
          <Pocket data={data} pieceNo={4} color={color} player={player} onClick={handleClick} />
        </div>
      </div>
    </div>
  )
};

const Pocket = ({ color, player, pieceNo, data, onClick }: { color: string; player: 1 | 2 | 3 | 4; onClick: (value: { player: number, pieceId: string }) => void; pieceNo: number; data: PlayerState[] }) => {
  return (
    <div style={{ backgroundColor: color }} className='size-6 rounded-full flex justify-center items-center animate-none' >
      {
        data && data[pieceNo - 1].pos === 0 &&
        (
          <Pile cell={false} pieceId={data[pieceNo - 1].id} color={color} player={player} onClick={() => onClick({ player, pieceId: data[pieceNo - 1].id })} />
        )
      }
    </div>
  )
}

export default PlayerBase