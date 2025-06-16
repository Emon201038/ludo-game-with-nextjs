import Image from 'next/image'
import React from 'react'

const CurrentTurnArrow = ({ playerNo }: { playerNo: number }) => {

  return (
    <div className={`absolute ${[3, 4].includes(playerNo) ? "-left-[30px]  animate-left-right" : "-right-[30px] animate-right-left"}`}><Image src="/images/arrow.png" width={30} height={30} alt='arrow' color='red' className={`${[3, 4].includes(playerNo) ? "rotate-180" : "-right-[30px]"}`} /></div>
  )
}

export default CurrentTurnArrow