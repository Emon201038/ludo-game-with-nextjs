// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, Player } from './initialStats';


export const matchSlice = createSlice({
  name: 'ludo',
  initialState: initialState,
  reducers: {
    startGame: (state, action: PayloadAction<{ players: Omit<Player, "pieces">[], mode: "classic" | "team", playerCount: number }>) => {
      state.matchId = crypto.randomUUID();
      state.gameMode = action.payload.mode;
      const player = action.payload.players.map(p => ({
        ...p,
        pieces: [...Array(4)].map(() => ({
          id: p.id,
          pos: 0,
          travelCount: 0,
        }))
      }));

      state.players = player;
      state.totalPlayers = action.payload.playerCount;
      if (action.payload.playerCount !== 4) {
        const playersId = action.payload.players.map(p => Number(p.id.slice(1)));
        state.currentPlayer = Math.min(...playersId) as 1 | 2 | 3 | 4
      }
    },
    resetGame: () => initialState,

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
      if (state.totalPlayers === 4) {
        let chancePlayer = action.payload.player + 1;
        if (chancePlayer > state.totalPlayers) {
          chancePlayer = 1;
        };
        state.currentPlayer = chancePlayer as 1 | 2 | 3 | 4;
      } else {
        const currentPlayer = action.payload.player;
        if (currentPlayer === 1) {
          state.currentPlayer = 3;
        } else if (currentPlayer === 3) {
          state.currentPlayer = 1;
        } else if (currentPlayer === 2) {
          state.currentPlayer = 4;
        } else if (currentPlayer === 4) {
          state.currentPlayer = 2;
        }
      }
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

export const { resetGame, updateDiceValue, updateDiceRolling, enablePileSelection, updatePlayerChance, enableCellSelection, updatePlayerPieceValue, unfreezeDice, disableTouch, announceWinner, startGame } = matchSlice.actions;
export default matchSlice.reducer;
