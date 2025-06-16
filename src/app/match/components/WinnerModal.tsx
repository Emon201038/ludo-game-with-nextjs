"use client"
import { resetGame } from '@/redux/features/game/ludoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React from 'react'

const WinnerModal = () => {
  const { winner } = useAppSelector(state => state.ludo);
  const dispatch = useAppDispatch()

  if (!winner) return null;

  const handleClick = () => {
    dispatch(resetGame())
  }
  return (
    <div aria-label='modal'
      role='dialog'

      className=' inset-0 fixed top-0 left-0 z-50 w-screen h-screen bg-black/90 flex flex-col justify-center items-center'>
      <div className='bg-white p-2 text-black rounded-md shadow-md relative'>
        <div className=''>
          Children
          <button onClick={handleClick}>New Game</button>
        </div>
      </div>
    </div>
  )
}

export default WinnerModal