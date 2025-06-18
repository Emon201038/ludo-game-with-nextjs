"use client"
import React from 'react'
import Cell from './cell'

const HorizontalCell = ({ cells, color }: { cells: number[], color: string }) => {
  const groupedCells = React.useMemo(() => {
    const groups = []
    for (let i = 0; i < cells.length; i += 6) {
      const triplet = cells.slice(i, i + 6);
      groups.push(triplet);
    }
    return groups;
  }, [cells])
  return (
    <div className='w-[40%] h-full bg-white'>
      {groupedCells.map((group, index) => (
        <div key={index} className='flex items-center justify-center h-1/3 w-full'>
          {group.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              id={cell}
              color={color}
              orientation='vertical'
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default HorizontalCell