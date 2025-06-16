// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialStats';


export const matchSlice = createSlice({
  name: 'ludo',
  initialState: initialState,
  reducers: {
    resetGame: () => initialState,
    diceClick: (state, action: PayloadAction<{ player: number, diceValue: number }>) => {
      console.log(action.payload);
      const { player } = action.payload;
      state.diceNo = action.payload.diceValue
      let chancePlayer = player + 1 as 1 | 2 | 3 | 4;
      if (chancePlayer > 4) {
        chancePlayer = 1
      }

      state.currentPlayer = chancePlayer

    },
    updateDiceValue: (state, action: PayloadAction<{ diceValue: number }>) => {
      state.diceNo = action.payload.diceValue
      state.isDiceRolled = true
      state.isDiceRolling = false
    },
    updateDiceRolling: (state, action: PayloadAction<{ isDiceRolling: boolean }>) => {
      state.isDiceRolling = action.payload.isDiceRolling;
      state.isDiceRolled = false;
      state.touchDiceBlock = true
    },
    enablePileSelection: (state, action: PayloadAction<{ player: number }>) => {
      state.touchDiceBlock = true;
      state.pileSelectionPlayer = action.payload.player
    },
    updatePlayerChance: (state, action: PayloadAction<{ player: number }>) => {
      let chancePlayer = action.payload.player + 1;
      if (chancePlayer > 4) {
        chancePlayer = 1
      };

      state.currentPlayer = chancePlayer as 1 | 2 | 3 | 4;
      state.isDiceRolled = false;
      state.touchDiceBlock = false
    },

    enableCellSelection: (state, action: PayloadAction<{ player: number }>) => {
      state.touchDiceBlock = true;
      state.cellSelectionPlayer = action.payload.player
    },

    updatePlayerPieceValue: (state, action: PayloadAction<{ player: "P1" | "P2" | "P3" | "P4", pieceId: string, pos: number, travelCount: number }>) => {
      const player = state[action.payload.player];
      const piece = player.find(p => p.id === action.payload.pieceId);
      state.pileSelectionPlayer = -1;
      state.cellSelectionPlayer = -1;
      if (piece) {
        piece.pos = action.payload.pos;
        piece.travelCount = action.payload.travelCount;

        const currentPositionIndex = state.currentposition.findIndex(p => p.id === action.payload.pieceId);
        if (action.payload.pos === 0) {
          state.currentposition[currentPositionIndex] = piece;
          if (currentPositionIndex !== -1) {
            state.currentposition.splice(currentPositionIndex, 1);
          }
        } else {
          if (currentPositionIndex !== -1) {
            state.currentposition[currentPositionIndex] = piece;
          } else {
            state.currentposition.push(piece);
          }
        }
      }

      console.log({ pos: piece?.pos, id: piece?.id, travelCount: piece?.travelCount }, "payload:", action.payload);
    },

    unfreezeDice: (state) => {
      state.touchDiceBlock = false
      state.isDiceRolled = false;
    },

    disableTouch: (state) => {
      state.touchDiceBlock = true;
      state.cellSelectionPlayer = -1
      state.pileSelectionPlayer = -1
    },

    announceWinner: (state, action: PayloadAction<{ winner: string }>) => {
      state.winner = action.payload.winner;
    },
  },

});

export const { resetGame, diceClick, updateDiceValue, updateDiceRolling, enablePileSelection, updatePlayerChance, enableCellSelection, updatePlayerPieceValue, unfreezeDice, disableTouch, announceWinner } = matchSlice.actions;
export default matchSlice.reducer;
