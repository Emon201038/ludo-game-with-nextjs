"use client"
import React, { useMemo, useState } from 'react'
import { Modal, ModalClose, ModalContent, ModalTrigger } from './ui/modal'
import Image from 'next/image'
import { Check, Dice6 } from 'lucide-react'
import { playSound } from '@/helper/SoundUtility'
import { useAppDispatch } from '@/redux/hooks'
import { resetGame, startGame } from '@/redux/features/game/ludoSlice'

const GameModeModal = ({ children, index, className }: { children: React.ReactNode, index: number, className: string }) => {
  const [selectedMode, setSelectedMode] = useState<"classic" | "team">("classic");
  const [openGameModeModal, setOpenGameModeModal] = useState(false);
  const [openColorModal, setOpenColorModal] = useState(false);
  const [playerCount, setPlayerCount] = useState(4);
  const [selectedTeam, setSelectedTeam] = useState(0);
  const [players, setPlayers] = useState([
    { id: "P1", name: "Player 1", color: "blue" },
    { id: "P2", name: "Player 2", color: "red" },
    { id: "P3", name: "Player 3", color: "green" },
    { id: "P4", name: "Player 4", color: "yellow" },
  ])
  const [teams, setTeams] = useState([
    {
      name: "Team A",
      id: 1,
      players: [
        { id: "P1", name: "Player 1", color: "blue" },
        { id: "P3", name: "Player 3", color: "green" },
      ],
    },
    {
      name: "Team B",
      id: 2,
      players: [
        { id: "P2", name: "Player 2", color: "red" },
        { id: "P4", name: "Player 4", color: "yellow" },
      ],
    },
  ]);

  const dispatch = useAppDispatch()

  const updatePlayerName = (playerColor: string, name: string) => {
    const newPlayers = [...players];
    const index = newPlayers.findIndex(p => p.color === playerColor);
    newPlayers[index] = { ...newPlayers[index], name }
    setPlayers(newPlayers)
  }


  const gameMode = useMemo(() => {
    return [
      {
        id: "classic",
        name: "Classic",
        image: "/images/classic.png",
        subtitle: null
      },
      {
        id: "team",
        name: "Team Up",
        image: "/images/team.png",
        subtitle: "Classic"
      }
    ]
  }, []);

  const handlePlay = () => {
    playSound("click");
    dispatch(resetGame())
    let gameObj: {
      mode: "classic" | "team",
      players: { name: string, id: string, team?: number }[],
      playerCount: number
    }
    if (selectedMode === "classic") {
      gameObj = {
        mode: selectedMode,
        players: playerCount === 4 ? players : players.filter((p) => teams[selectedTeam].players.some(tp => tp.color === p.color)),
        playerCount
      }
    } else {
      gameObj = {
        mode: selectedMode,
        players: teams.flatMap(team =>
          team.players.map(player => ({
            name: player.name,
            team: team.id,
            id: player.id
          }))
        ),
        playerCount
      };

    };
    dispatch(startGame(gameObj));

  };

  const updateTeamPlayerName = (teamIndex: number, index: number, name: string) => {
    const newTeams = [...teams];
    newTeams[teamIndex].players[index] = { ...newTeams[teamIndex].players[index], name }
    setTeams(newTeams)
  }
  return (
    <>
      <Modal open={openGameModeModal} onOpenChange={setOpenGameModeModal}>
        <ModalTrigger className={className}>
          {children}
        </ModalTrigger>
        <ModalContent itemScope={false} className='w-[342px] bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 flex flex-col justify-center items-center rounded-md' >
          {
            index !== 3 ? <div>Comming soon</div> : <div className='space-y-4'>
              <h1
                className="text-white font-extrabold text-2xl tracking-wide text-center uppercase"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)",
                  fontFamily: "Luckiest Guy, cursive",
                }}
              >
                Selece Game
              </h1>
              {
                gameMode.map((game, index) => (
                  <div key={index} className='flex items-center gap-6' style={{ fontFamily: "Luckiest Guy, cursive", }}>
                    <div className='cursor-pointer'
                    >
                      <Image src={game.image} width={150} height={150} alt={game.name} className='flex-1' />
                    </div>
                    <div onClick={() => {
                      playSound("click");
                      setSelectedMode(game.id as "classic" | "team")
                    }} className='cursor-pointer'>
                      <button className="cursor-pointer relative inline-flex items-center gap-3 py-3 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full border-8 border-yellow-500 shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-opacity-50 pl-[70px] pr-4 h-[68px] w-[188px]">
                        {/* Black outline effect */}
                        <div className="absolute inset-0 rounded-full border-2 border-black opacity-30 pointer-events-none"></div>

                        {/* Checkmark icon with golden background */}
                        <div className="z-10 absolute -left-2.5 -top-2.5 flex items-center justify-center size-[74px] bg-gradient-to-b from-blue-700 to-blue-900 rounded-full border-8 border-yellow-500 shadow-[0_1px_15px_yellow]">
                          {selectedMode === game.id && <Check className="size-12 text-yellow-500 stroke-[4]" />}
                        </div>

                        {/* Classic text with text-shadow */}
                        <div className='leading-[-9px]'>
                          <h5
                            className="text-white  text-sm tracking-wide"
                          >
                            {game.subtitle}
                          </h5>
                          <h1
                            className={`text-white font-bold ${game.subtitle ? "text-lg" : "text-2xl"} tracking-wide whitespace-nowrap`}
                            style={{
                              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)",
                            }}
                          >
                            {game.name}
                          </h1>
                        </div>

                        {/* Inner highlight for glossy effect */}
                        <div className="absolute top-1 left-1 right-1 h-4 bg-gradient-to-b from-white/30 to-transparent rounded-full pointer-events-none"></div>
                      </button>
                    </div>
                  </div>
                ))
              }

            </div>
          }
          <div className='w-full mt-6 flex gap-4 justify-center items-center'>
            <ModalClose className='cursor-pointer w-[70px] h-[50px] flex justify-center items-center'>
              <Image src="/images/back.png" width={70} height={50} alt="close" />
            </ModalClose>
            {index === 3 && <button onClick={() => {
              playSound("click");
              setOpenColorModal(true);
              setOpenGameModeModal(false);
            }} className='relative cursor-pointer bg-gradient-to-b from-blue-600 to-blue-800 h-full px-4 py-0 rounded-2xl border-3 border-yellow-500 shadow-[0_0.5px_5px_yellow] backdrop-blur-3xl flex justify-center items-center' style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)",
              fontFamily: "Luckiest Guy, cursive",
              fontSize: "20px",
              fontWeight: "bolder"
            }}>
              <div className="absolute inset-0 rounded-2xl border-2 border-black opacity-30 pointer-events-none"></div>
              Next
            </button>}
          </div>
        </ModalContent>
      </Modal>

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
            <button onClick={() => handlePlay()} className='relative cursor-pointer bg-gradient-to-b from-blue-600 to-blue-800 h-full px-4 py-0 rounded-2xl border-3 border-yellow-500 shadow-[0_0.5px_5px_yellow] backdrop-blur-3xl flex justify-center items-center' style={{
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
    </>
  )
}

export default GameModeModal