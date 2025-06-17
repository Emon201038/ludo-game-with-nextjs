import Image from "next/image";
import HomeWrapper from "./home-wrapper";
import GameModeModal from "@/components/game-mode-modal";

export default function Home() {
  const gameModes = [
    {
      id: "online",
      title: "ONLINE",
      icon: <Image src="/images/play-online.png" width={130} height={100} alt="pass-n-play" />,
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "friends",
      title: "FRIENDS",
      icon: <Image src="/images/play-with-friends.png" width={130} height={100} alt="pass-n-play" />,
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "computer",
      title: "COMPUTER",
      icon: <Image src="/images/play-with-bot.png" width={80} height={100} alt="pass-n-play" />,
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "pass-play",
      title: "PASS N PLAY",
      icon: <Image src="/images/pass-n-play.png" width={130} height={100} alt="pass-n-play" />,
      color: "from-blue-500 to-blue-700",
    },
  ]
  return (
    <HomeWrapper>
      <div style={{
        backgroundColor: '', backgroundImage: 'url("/images/bg.jpg")'
      }} className="w-[342px] h-screen shadow-[0_35px_35px_blue] p-2 bg-gradient-to-br from-purple-500/80 via-blue-500/80 to-teal-500/80 bg-cover bg-no-repeat bg-center shadow-blue-600">
        <button className="cursor-pointer filter">
          <Image src={"/images/menu.png"} width={25} height={25} alt="menue" />
        </button>
        <div className="w-full h-[calc(100%_-_25px)] flex justify-center items-center flex-col gap-3 font-semibold">
          <div className="grid grid-cols-2 gap-8 w-full">
            {gameModes.map((mode, index) => {
              return (
                <GameModeModal key={index} index={index} className={`relative  rounded-3xl h-40 border-4 border-b-transparent border-yellow-400 bg-gradient-to-b ${mode.color} hover:scale-105 transition-all duration-200 shadow-xl flex justify-center items-start`}>

                  <div
                    key={mode.id}
                    className="h-[calc(100%_-_50px)] w-full flex items-center justify-center "
                  >

                    {/* Icon Area */}
                    <div className="h-full">
                      <div className="flex h-full w-full items-center justify-center">
                        {mode.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <div className={`absolute w-[calc(100%_+_6px)] -bottom-1 -left-[3px] bg-yellow-400 py-2 border-b-8  border-b-amber-600 rounded-b-2xl ${mode.id === "pass-play" ? "px-2" : "px-4"}`}>
                      <span className={`text-black font-bold ${mode.id === "pass-play" ? "tracking-normal text-lg" : "text-lg tracking-wider"}`}>{mode.title}</span>
                    </div>

                  </div>
                </GameModeModal>
              )
            })}
          </div>
        </div>
      </div>
    </HomeWrapper>
  );
}
