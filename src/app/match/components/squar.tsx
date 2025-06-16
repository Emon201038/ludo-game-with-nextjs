import React from 'react'
import { Colors } from '@/helper/Colors'

const Squar = () => {
  return (
    <div className='w-[20%] h-full bg-white relative'>
      <div style={{
        clipPath: "polygon(50% 50%, 100% 100%, 0% 100%)",
        backgroundColor: Colors.blue
      }} className='w-full h-full absolute'></div>
      <div style={{
        clipPath: "polygon(50% 50%, 100% 0%, 0% 0%)",
        backgroundColor: Colors.green
      }} className='w-full h-full absolute'></div>
      <div style={{
        clipPath: "polygon(50% 50%, 100% 0%, 100% 100%)",
        backgroundColor: Colors.yellow
      }} className='w-full h-full absolute'></div>
      <div style={{
        clipPath: "polygon(50% 50%, 0% 0%, 0% 100%)",
        backgroundColor: Colors.red
      }} className='w-full h-full absolute'></div>
    </div>
  )
}

export default Squar