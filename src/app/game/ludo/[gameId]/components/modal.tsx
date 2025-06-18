"use client"
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { resetGame } from '@/redux/features/game/ludoSlice';
import { useAppDispatch } from '@/redux/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Modal = ({ setIsExisting }: { setIsExisting: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();


  // React.useEffect(() => {
  //   //trigger outside click
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (event.target instanceof HTMLElement && !event.target.closest('.modal')) {
  //       setIsOpen(false);
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener('click', handleOutsideClick);
  //   } else {
  //     document.removeEventListener('click', handleOutsideClick);
  //   }

  //   return () => {
  //     if (isOpen) {
  //       document.removeEventListener('click', handleOutsideClick);
  //     }
  //   }
  // }, [isOpen])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} className='flex items-center gap-2 size-6 cursor-pointer'>
          <Image src={"/images/menu.png"} width={25} height={25} alt="menue" className='w-full h-full' />
          <span className='sr-only'>Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent side='right' className='w-16 p-0 bg-transparent border-none shadow-nones justify-center items-center h-full'>
        <Button onClick={() => {
          setIsExisting(true)
          dispatch(resetGame());
          router.push("/");
        }} className='relative w-full h-full py-1 px-2 bg-gradient-to-b from-blue-600 to-blue-800 border-3 rounded-3xl border-yellow-500 shadow-[0_0.5px_5px_yellow] backdrop-blur-3xl justify-center gap-px'>
          <div className="absolute inset-0 rounded-2xl border-2 border-black opacity-30 pointer-events-none"></div>
          <Image src={"/images/cross.png"} alt="exit" width={20} height={20} />
          Exit
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default Modal