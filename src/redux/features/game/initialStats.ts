// src/redux/features/game/initialStats.ts
interface MatchState {
  P1: PlayerState[];
  P2: PlayerState[];
  P3: PlayerState[];
  P4: PlayerState[];
  players: Player[];
  totalPlayers: number;
  currentPlayer: 1 | 2 | 3 | 4;
  diceNo: number;
  winner?: string | null;
  isDiceRolled: boolean;
  isDiceRolling: boolean;
  touchDiceBlock: boolean;
  currentposition: PlayerState[];
  pileSelectionPlayer: number;
  cellSelectionPlayer: number;
  gameMode?: "classic" | "team";
  history: History[]
};

interface History {
  currentChancePlayer: 1 | 2 | 3 | 4;
  previousChancePlayer: 1 | 2 | 3 | 4;
  diceValue: number;
  isPileMoved?: boolean;
  isCollision?: boolean;
  colliedPiece?: {
    id: string;
    pos: number;
    travelCount: number;
  };
  movedPieceBeforeMove?: {
    id: string;
    pos: number;
    travelCount: number;
  };
}

export interface Player {
  name: string;
  id: string;
  team?: number;
  pieces: PlayerState[]
};

export interface PlayerState {
  id: string;
  pos: number;
  travelCount: number;
};

const player1InitialState: PlayerState[] = [
  {
    id: "A1",
    pos: 0,
    travelCount: 0
  },
  {
    id: "A2",
    pos: 0,
    travelCount: 0
  },
  {
    id: "A3",
    pos: 0,
    travelCount: 0
  },
  {
    id: "A4",
    pos: 0,
    travelCount: 0
  }
];

const player2InitialState: PlayerState[] = [
  {
    id: "B1",
    pos: 0,
    travelCount: 0
  },
  {
    id: "B2",
    pos: 0,
    travelCount: 0
  },
  {
    id: "B3",
    pos: 0,
    travelCount: 0
  },
  {
    id: "B4",
    pos: 0,
    travelCount: 0
  }
];

const player3InitialState: PlayerState[] = [
  {
    id: "C1",
    pos: 0,
    travelCount: 0
  },
  {
    id: "C2",
    pos: 0,
    travelCount: 0
  },
  {
    id: "C3",
    pos: 0,
    travelCount: 0
  },
  {
    id: "C4",
    pos: 0,
    travelCount: 0
  }
];

const player4InitialState: PlayerState[] = [
  {
    id: "D1",
    pos: 0,
    travelCount: 0
  },
  {
    id: "D2",
    pos: 0,
    travelCount: 0
  },
  {
    id: "D3",
    pos: 0,
    travelCount: 0
  },
  {
    id: "D4",
    pos: 0,
    travelCount: 0
  }
]

export const initialState: MatchState = {
  P1: player1InitialState,
  P2: player2InitialState,
  P3: player3InitialState,
  P4: player4InitialState,
  players: [],
  totalPlayers: 0,
  isDiceRolled: false,
  isDiceRolling: false,
  touchDiceBlock: false,
  currentposition: [],
  pileSelectionPlayer: -1,
  cellSelectionPlayer: -1,
  currentPlayer: 1,
  diceNo: 1,
  winner: null,
  gameMode: undefined,
  history: []
};