import { RootState } from "@/redux/store/store"
export const selectCurrentPositions = (state: RootState) => state.ludo.currentPositions;

export const selectCurrentPlayer = (state: RootState) => state.ludo.currentPlayer;

export const selectWinner = (state: RootState) => state.ludo.winner;

export const selectIsDiceRolling = (state: RootState) => state.ludo.isDiceRolling;

export const selectIsDiceRolled = (state: RootState) => state.ludo.isDiceRolled;

export const selectTouchDiceBlock = (state: RootState) => state.ludo.touchDiceBlock;

export const selectDiceNo = (state: RootState) => state.ludo.diceNo;
