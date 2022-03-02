import { useState } from "react";

const choice = function<T>(arr: T[]){
  return arr[Math.floor(arr.length * Math.random())];
}

const pieces = [
  "King",
  "Queen",
  "Rook",
  "Knight",
  "Bishop",
  "Pawn"
]

export default function ChessRandomizer() {
  const [currentPiece, setCurrentPiece] = useState("[none yet]");
  return <div>
    <h2>Hi Eric Rosen and Ben Finegold!</h2>
    <p>Clicking below will select a chess piece (or pawn) randomly.</p>
    <button onClick={() => {
      setCurrentPiece("...");
      setTimeout(() => setCurrentPiece(choice(pieces)), 100);
    }}>Choose a random piece (including pawns)!</button>
    <h2>Piece: {currentPiece}</h2>
  </div>
}