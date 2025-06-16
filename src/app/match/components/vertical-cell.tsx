"use client"
import React, { memo, useMemo } from 'react'
import Cell from './cell'

const VerticalCell = ({ cells, color }: { cells: number[], color: string }) => {

  const groupedCells = useMemo(() => {
    const groups = []
    for (let i = 0; i < cells.length; i += 3) {
      const triplet = cells.slice(i, i + 3);
      groups.push(triplet);
    }
    return groups;
  }, [cells])
  return (
    <div className='w-[20%] h-full bg-white'>
      {groupedCells.map((group, index) => (
        <div key={index} className='flex items-center justify-center h-[16.7%] w-full'>
          {group.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              id={cell}
              color={color}
            />
          ))}
        </div>
      ))}
    </div>
  )
}


export default memo(VerticalCell)