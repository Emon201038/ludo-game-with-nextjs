"use client"
import React, { useEffect } from 'react'
import PlayerBase from './components/base'
import { Colors } from '@/helper/Colors'
import VerticalCell from './components/vertical-cell'
import { Plot1Data, Plot2Data, Plot3Data, Plot4Data } from '@/helper/PlotData'
import HorizontalCell from './components/horizontal-cell'
import Squar from './components/squar'
import Modal from './components/modal'
import WinnerModal from './components/WinnerModal'
import UpperDice from './components/upper-dices'
import LowerDice from './components/LowerDice'
import { useAppSelector } from '@/redux/hooks'
import { notFound, useParams } from 'next/navigation'

const LudoGamePage = () => {
  const { matchId } = useAppSelector(state => state.ludo);
  const [isExisting, setIsExisting] = React.useState(false);
  const params = useParams()

  useEffect(() => {
    if (matchId !== params.gameId && !isExisting) {
      notFound()
    }
  }, [matchId, params.gameId, isExisting])
  return (
    <div
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
      className='h-[100vh] w-screen flex relative justify-center object-center p-4 '>

      <div
        className='bg-wrapper w-[342px] h-full flex flex-col justify-center items-center gap-3 bg-contain'>
        <WinnerModal />
        <div className='absolute left-4 top-4'>
          <Modal setIsExisting={setIsExisting} />
        </div>
        <div className='w-[342px]'>
          <UpperDice />
        </div>
        <div id='ludo-board' className='size-[342px] bg-gray-200'>
          <div id='top-tier' className="h-[40%] w-full bg-slate-300 flex justify-center items-center">
            <PlayerBase player={2} color={Colors.red} />
            <VerticalCell cells={Plot2Data} color={Colors.green} />
            <PlayerBase player={3} color={Colors.green} />
          </div>
          <div id='middle-tier' className='h-[20%] w-full bg-white flex'>
            <HorizontalCell cells={Plot1Data} color={Colors.red} />
            <Squar />
            <HorizontalCell cells={Plot3Data} color={Colors.yellow} />
          </div>
          <div id='bottom-tier' className="h-[40%] w-full bg-slate-300 flex justify-center items-center">
            <PlayerBase player={1} color={Colors.blue} />
            <VerticalCell cells={Plot4Data} color={Colors.blue} />
            <PlayerBase player={4} color={Colors.yellow} />
          </div>
        </div>
        <div className='w-[342px]'>
          <LowerDice />
        </div>
      </div>
    </div>
  )
}

export default LudoGamePage