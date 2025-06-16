"use client"
import { Menu, X } from 'lucide-react';
import React from 'react'

const Modal = () => {
  const [isOpen, setIsOpen] = React.useState(false);


  React.useEffect(() => {
    //trigger outside click
    const handleOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && !event.target.closest('.modal')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      if (isOpen) {
        document.removeEventListener('click', handleOutsideClick);
      }
    }
  }, [isOpen])

  return (
    <div>
      <button onClick={() => setIsOpen(true)}><Menu /></button>

      {isOpen && <div aria-label='modal'
        role='dialog'

        className=' inset-0 fixed top-0 left-0 z-50 w-screen h-screen bg-black/90 flex flex-col justify-center items-center'>
        <div className='bg-white p-2 text-black rounded-md shadow-md relative'>
          <div onClick={() => setIsOpen(false)} className='absolute top-2 right-2 cursor-pointer'><X className='w-4 h-4 opacity-70' /></div>
          <div className='mt-2 mr-2'>
            Children
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Modal