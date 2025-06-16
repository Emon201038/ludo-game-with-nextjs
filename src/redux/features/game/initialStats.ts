interface MatchState {
  P1: PlayerState[];
  P2: PlayerState[];
  P3: PlayerState[];
  P4: PlayerState[];
  currentPlayer: 1 | 2 | 3 | 4;
  diceNo: number;
  winner?: string | null;
  isDiceRolled: boolean;
  isDiceRolling: boolean;
  touchDiceBlock: boolean;
  currentposition: PlayerState[];
  pileSelectionPlayer: number;
  cellSelectionPlayer: number;
}

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
  isDiceRolled: false,
  isDiceRolling: false,
  touchDiceBlock: false,
  currentposition: [],
  // [...player1InitialState, ...player2InitialState, ...player3InitialState, ...player4InitialState],
  pileSelectionPlayer: -1,
  cellSelectionPlayer: -1,
  currentPlayer: 1,
  diceNo: 1,
  winner: null
};