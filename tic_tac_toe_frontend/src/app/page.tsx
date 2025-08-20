'use client';

import { useState, useCallback } from 'react';

type Player = 'X' | 'O';
type Board = (Player | null)[];

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const checkWinner = useCallback((squares: Board): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Player;
      }
    }

    if (squares.every(square => square !== null)) {
      return 'Draw';
    }

    return null;
  }, []);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const getStatusMessage = () => {
    if (winner === 'Draw') return 'Game Over - It\'s a Draw!';
    if (winner) return `Game Over - ${winner} Wins!`;
    return `Current Player: ${currentPlayer}`;
  };

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Tic Tac Toe
        </h1>
        
        <div className="text-lg text-center mb-4 font-semibold text-primary">
          {getStatusMessage()}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              className="board-cell"
              onClick={() => handleClick(index)}
              disabled={!!winner}
            >
              <span className={cell === 'X' ? 'text-primary' : 'text-accent'}>
                {cell}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          Restart Game
        </button>
      </div>
    </main>
  );
}
