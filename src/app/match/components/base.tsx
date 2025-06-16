"use client";
import { PlayerState } from '@/redux/features/game/initialStats';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react'
import Pile from './Pile';
import { startingPoints } from '@/helper/PlotData';
import { unfreezeDice, updatePlayerPieceValue } from '@/redux/features/game/ludoSlice';

const PlayerBase = ({ color, player }: { color: string, player: 1 | 2 | 3 | 4 }) => {

  const dispatch = useAppDispatch()
  const { [`P${player}` as "P1" | "P2" | "P3" | "P4"]: data, currentPlayer } = useAppSelector(state => state.ludo);

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
  }
  return (
    <div id={`player-${player}`} style={{ backgroundColor: color }} className={`w-[40%] h-full ${player === currentPlayer ? "animate-[pulse_0.7s_ease-in-out_infinite]" : "animate-none"} flex items-center justify-center p-5 md:p-7`}>
      <div className='w-full h-full bg-white p-4 flex flex-col justify-between'>
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
    <div style={{ backgroundColor: color }} className='size-8 rounded-full flex justify-center items-center animate-none' >
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