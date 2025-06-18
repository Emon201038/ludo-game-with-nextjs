"use client"
import Button from '@/components/Button';
import { Modal, ModalContent } from '@/components/ui/modal';
import { resetGame } from '@/redux/features/game/ludoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const WinnerModal = () => {
  const { winner } = useAppSelector(state => state.ludo);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (winner) {
      setIsOpen(true);
    }
  }, [winner])

  if (!winner) return null;

  const handleClick = () => {
    dispatch(resetGame());
    router.push('/');
  }
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent itemScope={false}>
        <h1 className='text-white'>
          {winner} won the game
        </h1>
        <Button onClick={handleClick} className='font-normal text-lg'>Return Home</Button>
      </ModalContent>
    </Modal>
  )
}

export default WinnerModal