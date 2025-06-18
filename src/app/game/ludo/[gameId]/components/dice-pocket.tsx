"use client"
import { useAppSelector } from '@/redux/hooks'
import React from 'react'
import Dice from './Dice';
import { MapPinIcon } from 'lucide-react';
import CurrentTurnArrow from './current-turn-arrow';

const DicePocket = ({ isReversed = false, playerNo, color }: { playerNo: number, color: string, isReversed?: boolean }) => {
  const { isDiceRolled, currentPlayer, touchDiceBlock } = useAppSelector(state => state.ludo);
  return (
    <div className='relative flex'>

      <div className={`flex ${isReversed ? 'flex-row-reverse' : ''}`}>
        <div className=" size-[35px] bg-gradient-to-r from-blue-700 to-sky-300 border-2 border-r-0 border-amber-300 relative flex  justify-center items-center">
          <div className="relative">
            <div style={{ backgroundColor: color }} className="absolute size-3.5 top-[11px] rounded-full left-[8px] z-50 border border-slate-400"></div>

            <div className="">
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
        <div className="size-[45px] bg-gradient-to-t from-green-200 to-teal-200 relative bottom-1 rounded-sm border border-l-0 border-amber-300 flex justify-center items-center">
          {playerNo === currentPlayer && !isDiceRolled && !touchDiceBlock && <CurrentTurnArrow playerNo={playerNo} />}
          <div className="relative size-[38px] bg-gradient-to-t from-rose-300 to-white flex justify-center items-center">

            {currentPlayer === playerNo && <Dice playerNo={playerNo} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DicePocket