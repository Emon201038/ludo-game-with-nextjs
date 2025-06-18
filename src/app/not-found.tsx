"use client"

import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { Home, ArrowLeft, Dice1, Dice6, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Component() {
  const [diceValue, setDiceValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)

  const rollDice = () => {
    console.log("clicked")
    setIsRolling(true)
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      setDiceValue(Math.floor(Math.random() * 6) + 1)
      setIsRolling(false)
    }, 1000);

  }

  const DiceIcon = () => {
    const diceIcons = [Dice1, Dice1, Dice1, Dice1, Dice1, Dice6]
    const IconComponent = diceIcons[diceValue - 1] || Dice1
    return <IconComponent className="w-8 h-8 text-white" />
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Ludo Board Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bg.png')" }} />

      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Game Pieces Floating Animation */}
      {/* <div
        className="absolute top-10 left-10 w-6 h-6 bg-red-500 rounded-full animate-bounce shadow-lg"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-20 right-20 w-6 h-6 bg-blue-500 rounded-full animate-bounce shadow-lg"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-20 left-20 w-6 h-6 bg-green-500 rounded-full animate-bounce shadow-lg"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-10 right-10 w-6 h-6 bg-yellow-500 rounded-full animate-bounce shadow-lg"
        style={{ animationDelay: "1.5s" }}
      ></div> */}

      <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10 bg-white/80">
        {/* 404 with Ludo Colors */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-bold select-none">
            <span className="text-red-500">4</span>
            <span className="text-blue-500">0</span>
            <span className="text-green-500">4</span>
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-gray-200 dark:text-gray-700 -z-10 blur-sm">
            404
          </div>
        </div>

        {/* Interactive Dice */}
        <div className="flex justify-center">
          <div className="relative">
            <button
              onClick={rollDice}
              disabled={isRolling}
              className={`z-100 w-20 h-20 bg-gradient-to-br from-red-500 via-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 ${isRolling ? "animate-spin" : ""
                }`}
            >
              <DiceIcon />
            </button>
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 rounded-lg blur opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Game-themed message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            Oops! You rolled off the board!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
            Looks like your game piece landed on a square that doesn&apos;t exist. Don&apos;t worry, even the best Ludo players
            sometimes need to find their way back home!
          </p>
        </div>

        {/* Search with game theme */}
        {/* <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for games, rules, or players..."
              className="pl-10 h-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
            />
          </div>
        </div> */}

        {/* Game-themed action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-red-500 via-blue-500 to-green-500 hover:from-red-600 hover:via-blue-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 min-w-[160px]"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 min-w-[160px]"
        >
          <Link href="javascript:history.back()">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Link>
        </Button>

        {/* Game-related help links */}
        <div className="pt-8 border-t-2 border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            Looking for something? Try these game sections:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="#"
              className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              Play Game
            </Link>
            <Link
              href="#"
              className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              Game Rules
            </Link>
            <Link
              href="#"
              className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="#"
              className="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
            >
              Tournaments
            </Link>
          </div>
        </div>

        {/* Fun game stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">While you&apos;re here, did you know?</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            🎲 The probability of rolling a 6 to start your game piece is exactly 1/6 or 16.67%!
          </p>
        </div>
      </div>
    </div>
  )
}
