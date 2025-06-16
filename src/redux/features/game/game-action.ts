import { AppThunk } from "@/redux/store/store";
import { PlayerState } from "./initialStats";
import { announceWinner, disableTouch, unfreezeDice, updatePlayerChance, updatePlayerPieceValue } from "./ludoSlice";
import { SafeSpots, StarSpots, startingPoints, turningPoints, victoryStart } from "@/helper/PlotData";
import { playSound } from "@/helper/SoundUtility";

const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));

function checkWinningCriteria(pieces: PlayerState[]) {
  for (const piece of pieces) {
    if (piece.travelCount < 57) return false
  }
  return true
}

export const handleForwardThunk = (playerNo: 1 | 2 | 3 | 4, id: string, pos: number): AppThunk => async (dispatch, getState) => {
  const state = getState().ludo;

  const plotedPieces = state.currentposition;
  const diceNo = state.diceNo;

  const piecesAtPosition = plotedPieces.filter(i => i.pos === pos);

  const alpha = playerNo === 1 ? "A" : playerNo === 2 ? "B" : playerNo === 3 ? "C" : "D";

  const piece = piecesAtPosition[piecesAtPosition.findIndex(p => p.id.slice(0, 1) === alpha)];

  dispatch(disableTouch());

  let finalPath = piece.pos
  const beforePiece = state[`P${playerNo}`].find(p => p.id === id);
  let travelCount = beforePiece ? beforePiece.travelCount : 0;

  //pile movement
  for (let i = 1; i <= diceNo; i++) {
    const updatedState = getState().ludo;
    const playerPieces = updatedState[`P${playerNo}`].find(p => p.id === id);


    let path = playerPieces ? playerPieces.pos + 1 : 1;
    if (turningPoints.includes(path) && turningPoints[playerNo - 1] === path) {
      path = victoryStart[playerNo - 1];
    }

    if (path === 53) {
      path = 1
    }

    finalPath = path;
    travelCount += 1;

    dispatch(updatePlayerPieceValue({ player: `P${playerNo}`, pieceId: id, pos: path, travelCount: travelCount }));
    dispatch(unfreezeDice());

    playSound("pile_move");
    await delay(200)
  }


  const finalState = getState().ludo;
  const updatedPlotedPieces = finalState.currentposition;

  const piecesAtFinalPosition = updatedPlotedPieces.filter(i => i.pos === finalPath);

  const ids = piecesAtFinalPosition.map(p => p.id[0]);
  const uniqueIds = new Set(ids);

  const hasDifferentId = uniqueIds.size > 1;

  if (SafeSpots.includes(finalPath) || StarSpots.includes(finalPath)) {
    playSound("safe_spot");
  }

  //check collision
  if (hasDifferentId && !SafeSpots.includes(piecesAtFinalPosition[0].pos) && !StarSpots.includes(piecesAtFinalPosition[0].pos)) {
    const enemyPiece = piecesAtFinalPosition.find(p => p.id[0] !== id[0]);
    if (!enemyPiece) return
    const enemyId = enemyPiece.id;
    const enemyPlayerNo: 1 | 2 | 3 | 4 = enemyId[0] === "A" ? 1 : enemyId[0] === "B" ? 2 : enemyId[0] === "C" ? 3 : 4;

    const backwardPath = startingPoints[enemyPlayerNo - 1];
    let i = enemyPiece?.pos;
    console.log(i, "enemy position")

    playSound("collide")
    while (i !== backwardPath) {
      i--;
      dispatch(updatePlayerPieceValue({ player: `P${enemyPlayerNo}`, pieceId: enemyId, pos: i, travelCount: 0 }));

      await delay(0.8)

      if (i === 0) {
        i = 52
      }
    }
    dispatch(updatePlayerPieceValue({ player: `P${enemyPlayerNo}`, pieceId: enemyPiece.id, pos: 0, travelCount: 0 }));
    dispatch(unfreezeDice());
    return;
  };

  if (diceNo === 6 || travelCount === 57) {
    dispatch(updatePlayerChance({ player: playerNo - 1 }));
    if (travelCount === 57) {
      playSound("home_win");

      const finalPlayerState = getState().ludo;
      const playerAllPieces = finalPlayerState[`P${playerNo}`];

      if (checkWinningCriteria(playerAllPieces)) {
        dispatch(announceWinner({ winner: `P${playerNo}` }));
        playSound("cheer");
        return;
      };

      dispatch(unfreezeDice());
      return;
    }
  } else {
    dispatch(updatePlayerChance({ player: playerNo }));
  }

}