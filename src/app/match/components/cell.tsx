"use client"
import { Colors } from '@/helper/Colors'
import { ArrowSpot, SafeSpots, StarSpots } from '@/helper/PlotData'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ArrowRight, Star } from 'lucide-react';
import React, { useCallback, useMemo } from 'react'
import Pile from './Pile';
import { handleForwardThunk } from '@/redux/features/game/game-action';

const Cell = ({ id, color, orientation = "horizontal" }: { id: number, color: string, orientation?: 'horizontal' | 'vertical' }) => {
  const isStarSpot = StarSpots.includes(id);
  const isArrowSpot = ArrowSpot.includes(id);
  const { currentposition } = useAppSelector(state => state.ludo);
  const dispatch = useAppDispatch()

  const piecesAtPosition = useMemo(() => currentposition.filter(i => i.pos === id), [currentposition, id]);

  const handleClick = useCallback(({ player, pieceId }: { player: number, pieceId: string }) => {
    // const playerNo = `P${player}` as "P1" | "P2" | "P3" | "P4";
    dispatch(handleForwardThunk(player as 1 | 2 | 3 | 4, pieceId, id));
  }, [id, dispatch])
  return (
    <div
      id={`cell-${id}`}
      className={`relative ${orientation === "horizontal" ? "w-1/3 h-full" : "w-1/6 h-1/3"} h-full flex items-center gap-0 justify-center border `}
      style={{ borderColor: Colors.borderColor, backgroundColor: SafeSpots.includes(id) ? color : "white" }}
    >
      {isStarSpot && (
        <Star color='gray' />
      )}
      {
        isArrowSpot && (
          <ArrowRight rotate={id === 25 ? 90 : 0} color={color} className={`${id === 25 ? "rotate-90" : id === 38 ? "rotate-180" : id === 51 ? "-rotate-90" : ""}`} />
        )
      }
      {
        piecesAtPosition.map((p, index) => {
          const playerNo = p.id.slice(0, 1) === "A" ? 1 : p.id.slice(0, 1) === "B" ? 2 : p.id.slice(0, 1) === "C" ? 3 : 4;

          const pieceColor = p.id.slice(0, 1) === "A" ? Colors.blue : p.id.slice(0, 1) === "B" ? Colors.red : p.id.slice(0, 1) === "C" ? Colors.green : Colors.yellow;

          return (
            <div style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: 30,
              transform: `translateX(${piecesAtPosition.length === 1 ? 0 : index % 2 === 0 ? -6 : 6}px) 
              translateY(${piecesAtPosition.length === 1 ? 0 : index < 2 ? -5 : 5}px) 
              scale(${piecesAtPosition.length === 1 ? 1 : piecesAtPosition.length > 2 ? 0.6 : 0.7})`,
            }} key={p.id} className='flex justify-center items-center'>

              <Pile cell={true} key={p.id} pieceId={p.id} color={pieceColor} player={playerNo} onClick={handleClick} cellId={id} index={index} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Cell