"use client"
import React from 'react'
import PlayerBase from './components/base'
import { Colors } from '@/helper/Colors'
import VerticalCell from './components/vertical-cell'
import { Plot1Data, Plot2Data, Plot3Data, Plot4Data } from '@/helper/PlotData'
import HorizontalCell from './components/horizontal-cell'
import Squar from './components/squar'
import UpperDice from './upper-dices'
import LowerDice from './components/LowerDice'
import Modal from './components/modal'
import WinnerModal from './components/WinnerModal'

const LudoGamePage = () => {

  return (
    <div className='h-[100vh] w-screen flex relative justify-center object-center p-4'>

      <div className='w-[96vw] md:w-[96vh] h-full flex flex-col justify-center items-center gap-3'>
        <WinnerModal />
        <div className='absolute left-4 top-4'>
          <Modal />

        </div>
        <div className='w-full md:w-[70vh]'>
          <UpperDice />
        </div>
        <div id='ludo-board' className='w-full md:w-[70vh] h-[96vw] md:h-[70vh] bg-gray-200'>
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
        <div className='w-full md:w-[70vh]'>
          <LowerDice />
        </div>
      </div>
    </div>
  )
}

export default LudoGamePage