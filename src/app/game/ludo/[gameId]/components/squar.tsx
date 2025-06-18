"use client"
import React, { useCallback, useMemo } from 'react'
import { Colors } from '@/helper/Colors'
import { PlayerState } from '@/redux/features/game/initialStats'
import Pile from './Pile'
import { useAppSelector } from '@/redux/hooks'

const Squar = () => {
  const { P1: player1, P2: player2, P3: player3, P4: player4 } = useAppSelector(state => state.ludo);
  const playersData: {
    player: PlayerState[];
    playerNO: 1 | 2 | 3 | 4;
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    pieceColor: string;
    translate: string;
  }[] = useMemo(() => {
    return [
      {
        player: player1,
        playerNO: 1,
        top: 35,
        left: 19,
        pieceColor: Colors.blue,
        translate: 'translateX'
      },
      {
        player: player3,
        playerNO: 3,
        top: -15,
        left: 15,
        pieceColor: Colors.green,
        translate: 'translateX'
      },
      {
        player: player2,
        playerNO: 2,
        top: -5,
        left: -2,
        pieceColor: Colors.red,
        translate: 'translateY'
      },
      {
        player: player4,
        playerNO: 4,
        top: 0,
        left: 60,
        pieceColor: Colors.yellow,
        translate: 'translateY'
      },
    ]
  }, [player1, player2, player3, player4]);

  const renderPlayerPieces = useCallback((data: {
    player: PlayerState[];
    playerNO: 1 | 2 | 3 | 4;
    top?: number;
    left?: number;
    pieceColor: string;
    translate: string;
    bottom?: number;
    right?: number;
  }, index: number) => {
    return (
      <PlayerPieces
        key={index}
        pieceColor={data.pieceColor} translate={data.translate} playerNo={data.playerNO}
        player={data.player.filter(i => i.travelCount === 57)}
        style={{
          top: data?.top,
          left: data?.left,
          bottom: data?.bottom,
          right: data?.right
        }}
      />
    )
  }, [])
  return (
    <div className='w-[20%] h-full relative'>
      <div style={{
        clipPath: "polygon(50% 50%, 100% 100%, 0% 100%)",
        backgroundColor: Colors.blue
      }} className='w-full h-full absolute top-0 left-0'></div>
      <div style={{
        clipPath: "polygon(50% 50%, 100% 0%, 0% 0%)",
        backgroundColor: Colors.green
      }} className='w-full h-full absolute top-0 left-0'></div>
      <div style={{
        clipPath: "polygon(50% 50%, 100% 0%, 100% 100%)",
        backgroundColor: Colors.yellow
      }} className='w-full h-full absolute top-0 left-0'></div>
      <div style={{
        clipPath: "polygon(50% 50%, 0% 0%, 0% 100%)",
        backgroundColor: Colors.red
      }} className='w-full h-full absolute top-0 left-0'></div>

      {
        playersData.map(renderPlayerPieces)
      }
    </div>
  )
}

const PlayerPieces = React.memo(({ player, style, pieceColor, translate, playerNo }: {
  player: PlayerState[],
  style: React.CSSProperties,
  pieceColor: string,
  translate: string,
  playerNo: 1 | 2 | 3 | 4
}) => {
  return (
    <div style={{ ...style, width: '100%', height: '100%', position: 'absolute' }}>
      {
        player.map((p, index) =>
          <div key={p.id} style={{
            top: 0,
            zIndex: 50,
            position: 'absolute',
            bottom: 0,
            transform: `scale(0.5) ${translate}(${index * 14}px)`,
          }}>
            <Pile cell={true} player={playerNo} pieceId={p.id} color={pieceColor} onClick={() => { }} />
          </div>
        )
      }
    </div>
  )
});

PlayerPieces.displayName = "PlayerPieces";

export default Squar