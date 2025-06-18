"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { Modal, ModalClose, ModalContent, ModalTrigger } from './ui/modal'
import Image from 'next/image'
import { Check, } from 'lucide-react'
import { playSound } from '@/helper/SoundUtility'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { resetGame, startGame } from '@/redux/features/game/ludoSlice'
import ColorNameModal from './color-name-modal'
import { useRouter } from 'next/navigation'

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
  const [hasStarted, setHasStarted] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { matchId } = useAppSelector(state => state.ludo);

  useEffect(() => {
    if (matchId && hasStarted) {
      router.push(`/game/ludo/${matchId}`);
    }

    return () => {
      setHasStarted(false);
    }
  }, [hasStarted, matchId, router]);

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

  const handlePlay = async () => {
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
    setHasStarted(true);
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
              {matchId && <button onClick={() => router.push(`/game/ludo/${matchId}`)} className='relative cursor-pointer bg-gradient-to-b from-blue-600 to-blue-800 h-full px-4 py-0 rounded-2xl border-3 border-yellow-500 shadow-[0_0.5px_5px_yellow] backdrop-blur-3xl flex justify-center items-center text-center place-self-center text-white' style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)",
                fontFamily: "Luckiest Guy, cursive",
                fontSize: "20px",
                fontWeight: "bolder"
              }}>
                <div className="absolute inset-0 rounded-2xl border-2 border-black opacity-30 pointer-events-none"></div>
                Resume Previous Game
              </button>}
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
            }} className='relative cursor-pointer bg-gradient-to-b from-blue-600 to-blue-800 h-full px-4 py-0 rounded-2xl border-3 border-yellow-500 shadow-[0_0.5px_5px_yellow] backdrop-blur-3xl flex justify-center items-center text-white' style={{
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

      <ColorNameModal openColorModal={openColorModal} handlePlay={handlePlay} playerCount={playerCount} players={players} setOpenColorModal={setOpenColorModal} selectedMode={selectedMode} selectedTeam={selectedTeam} teams={teams} updatePlayerName={updatePlayerName} updateTeamPlayerName={updateTeamPlayerName} setOpenGameModeModal={setOpenGameModeModal} setPlayerCount={setPlayerCount} setSelectedMode={setSelectedMode} setSelectedTeam={setSelectedTeam} />
    </>
  )
}

export default GameModeModal