"use client"
import React from 'react'
import { Modal, ModalContent } from './ui/modal';
import { playSound } from '@/helper/SoundUtility';
import { Check, Dice6 } from 'lucide-react';
import Image from 'next/image';

interface IColorNameModalProps {
  openColorModal: boolean;
  setOpenColorModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMode: "classic" | "team";
  setSelectedMode: React.Dispatch<React.SetStateAction<"classic" | "team">>;
  playerCount: number;
  setPlayerCount: React.Dispatch<React.SetStateAction<number>>;
  selectedTeam: number;
  setSelectedTeam: React.Dispatch<React.SetStateAction<number>>;
  players: IPlayer[];
  teams: { name: string; id: number; players: IPlayer[] }[];
  updateTeamPlayerName: (teamIndex: number, index: number, name: string) => void;
  updatePlayerName: (playerColor: string, name: string) => void;
  setOpenGameModeModal: React.Dispatch<React.SetStateAction<boolean>>
  handlePlay: () => void
}
interface IPlayer {
  id: string;
  name: string;
  color: string;
}

const ColorNameModal = ({ openColorModal, setOpenColorModal, selectedMode, selectedTeam, playerCount, setPlayerCount, teams, setSelectedTeam, players, updateTeamPlayerName, updatePlayerName, setOpenGameModeModal, handlePlay }: IColorNameModalProps) => {
  return (
    <Modal open={openColorModal} onOpenChange={setOpenColorModal}>
      <ModalContent style={{ fontFamily: "Luckiest Guy, cursive", }} itemScope={false} className='w-[380px] bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 flex flex-col justify-center items-center rounded-md p-3'>
        <div className='w-full'>
          {/* Header */}
          <div className="flex items-center justify-between w-full mb-2">
            <h1 className="text-lg font-semibold text-yellow-400">CHOOSE COLOR AND NAME</h1>
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                <span className="text-xs">🏰</span>
              </div>
              <span className="text-2xl font-bold">0/0</span>
            </div>
          </div>

          <div>

            {/* Team Selection */}
            {(playerCount === 2 && selectedMode !== "team") && <div className="space-y-2 mb-3">
              {teams.map((team, teamIndex) => (
                <div
                  key={teamIndex}
                  onClick={() => {
                    playSound("click");
                    setSelectedTeam(teamIndex)
                  }}
                  className={`relative bg-blue-800/50 rounded-xl p-2 border-2 transition-all cursor-pointer border-blue-600 hover:border-blue-400
                    `}
                >
                  {/* Selection Indicator */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">
                    <div>
                      {selectedTeam === teamIndex ? (
                        <div className="size-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                          <Check className="w-8 h-8 text-white" />
                        </div>
                      ) : (
                        <div className="size-10 border-4 border-green-500 rounded-full bg-transparent" />
                      )}
                    </div>
                  </div>

                  {/* Players */}
                  <div className="ml-2 space-y-4">
                    {players.filter(p => team.players.some(tp => tp.color === p.color)).map((player, playerIndex) => (
                      <div key={playerIndex} className="flex justify-center items-center gap-1">
                        <Image width={20} height={20} src={`/images/piles/${player.color}.png`} alt='pile' />
                        {/* <MapPin
                          className={`w-8 h-8 ${playerIndex === 0
                            ? team.primary === "blue"
                              ? "text-blue-400"
                              : "text-red-500"
                            : team.secondary === "green"
                              ? "text-green-500"
                              : "text-yellow-500"
                            }`}
                        /> */}
                        <input
                          value={player.name}
                          onChange={(e) => {
                            updatePlayerName(player.color, e.target.value)
                          }}
                          className="bg-white/90 border-2 border-gray-400 rounded-lg px-4 py-0.5 text-black w-[150px]"
                          style={{
                            background: "linear-gradient(to bottom, #f0f0f0, #d0d0d0)",
                            border: "2px dashed #666",
                          }}
                        />
                        <Dice6 className="w-8 h-8 text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>}
            {/* Team Selection */}
            {(selectedMode === "team") && <div className="space-y-2 mb-3">
              {teams.map((team, teamIndex) => (
                <div
                  key={teamIndex}

                  className={`relative bg-blue-800/50 rounded-xl p-2 border-2 transition-all cursor-pointer border-blue-600 hover:border-blue-400
                    `}
                >
                  {/* Selection Indicator */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">
                    {selectedMode === "team" ? <span className="text-yellow-400">Team {teamIndex + 1}</span> : <div>
                      {selectedTeam === teamIndex ? (
                        <div className="size-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                          <Check className="w-8 h-8 text-white" />
                        </div>
                      ) : (
                        <div className="size-10 border-4 border-green-500 rounded-full bg-transparent" />
                      )}
                    </div>}

                  </div>

                  {/* Players */}
                  <div className="ml-2 space-y-4">
                    {team.players.map((player, playerIndex) => (
                      <div key={playerIndex} className="flex justify-center items-center gap-1">
                        <Image width={20} height={20} src={`/images/piles/${player.color}.png`} alt='pile' />
                        <input
                          value={player.name}
                          onChange={(e) => {
                            updateTeamPlayerName(teamIndex, playerIndex, e.target.value)
                          }}
                          className="bg-white/90 border-2 border-gray-400 rounded-lg px-4 py-0.5 text-black w-[150px]"
                          style={{
                            background: "linear-gradient(to bottom, #f0f0f0, #d0d0d0)",
                            border: "2px dashed #666",
                          }}
                        />
                        <Dice6 className="w-8 h-8 text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>}
            {playerCount === 4 && selectedMode === "classic" && (
              <div className="grid grid-cols-1 gap-2 mb-2 w-full max-w-md">
                {
                  players.map((player, playerIndex) => (
                    <div
                      key={`${playerIndex}`}
                      className=""
                    >
                      <div className="flex justify-center items-center gap-4">
                        <Image width={30} height={30} src={`/images/piles/${player.color}.png`} alt='pile' />
                        <input
                          value={player.name}
                          onChange={(e) => {
                            updatePlayerName(player.color, e.target.value)
                          }}
                          className="bg-white/90 border-2 border-gray-400 rounded-lg px-4 py-0.5 text-black w-[150px]"
                          style={{
                            background: "linear-gradient(to bottom, #f0f0f0, #d0d0d0)",
                            border: "2px dashed #666",
                          }}
                        />
                        <Dice6 className="w-8 h-8 text-gray-300" />
                      </div>
                    </div>
                  ),
                  )}
              </div>
            )}
          </div>

          {/* Player Count Selection */}
          {selectedMode !== "team" && <div className="flex justify-center items-center gap-2 mb-2">
            {[2, 3, 4].map((count) => (
              <button
                key={count}
                disabled={count !== 2 && count !== 4}
                onClick={() => {
                  playSound("click");
                  setPlayerCount(count)
                }}
                className={`w-16 h-16 rounded-xl text-2xl font-bold transition-all ${playerCount === count
                  ? "bg-gradient-to-b from-yellow-400 to-orange-500 text-black border-2 border-yellow-300 shadow-lg"
                  : "bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600"
                  }`}
              >
                {count}P
              </button>
            ))}
          </div>}
        </div>
        <div className='w-full mt-1 flex gap-4 justify-center items-center'>
          <button onClick={() => {
            playSound("click");
            setOpenColorModal(false);
            setOpenGameModeModal(true)
          }} className='cursor-pointer w-[70px] h-[50px] flex justify-center items-center'>
            <Image src="/images/back.png" width={70} height={50} alt="close" />
          </button>
          <button onClick={() => handlePlay()} className='relative cursor-pointer bg-gradient-to-b from-blue-600 to-blue-800 border-yellow-500 shadow-[0_0.5px_5px_yellow] backdrop-blur-3xl h-full px-4 py-0 rounded-2xl border-3 flex justify-center items-center text-white' style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)",
            fontFamily: "Luckiest Guy, cursive",
            fontSize: "20px",
            fontWeight: "bolder"
          }}>
            <div className="absolute inset-0 rounded-2xl border-2 border-black opacity-30 pointer-events-none"></div>
            Play
          </button>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ColorNameModal