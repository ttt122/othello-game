import { useState } from "react"
import "./App.css"

function App() {
  const EMPTY = 0
  const BLACK = 1
  const WHITE = 2

  const createInitialBoard = () => {
    const board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(EMPTY))

    board[3][3] = WHITE
    board[3][4] = BLACK
    board[4][3] = BLACK
    board[4][4] = WHITE

    return board
  }

  const [board, setBoard] = useState(createInitialBoard())

  const [currentPlayer, setCurrentPlayer] = useState(BLACK)

  const [playerColor, setPlayerColor] = useState("#0000ff")
  const [enemyColor, setEnemyColor] = useState("#ffffff")
  const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
]
function getFlippedPieces(board, row, col, player) {
  if (board[row][col] !== EMPTY) {
    return []
  }

  const opponent = player === BLACK ? WHITE : BLACK
  const flippedPieces = []

  for (const [dr, dc] of DIRECTIONS) {
    const temp = []

    let r = row + dr
    let c = col + dc

    while (
      r >= 0 &&
      r < 8 &&
      c >= 0 &&
      c < 8 &&
      board[r][c] === opponent
    ) {
      temp.push([r, c])

      r += dr
      c += dc
    }

    if (
      r >= 0 &&
      r < 8 &&
      c >= 0 &&
      c < 8 &&
      board[r][c] === player &&
      temp.length > 0
    ) {
      flippedPieces.push(...temp)
    }
  }

  return flippedPieces
}
  function handleCellClick(rowIndex, colIndex) {
  const flipped = getFlippedPieces(
    board,
    rowIndex,
    colIndex,
    currentPlayer
  )

  if (flipped.length === 0) {
    return
  }

  const newBoard = board.map((row) => [...row])

  newBoard[rowIndex][colIndex] = currentPlayer

  for (const [r, c] of flipped) {
    newBoard[r][c] = currentPlayer
  }

  setBoard(newBoard)

  if (currentPlayer === BLACK) {
    setCurrentPlayer(WHITE)
  } else {
    setCurrentPlayer(BLACK)
  }
}

  return (
    <div className="app">
      <h1>逆転オセロニア（劣化版）</h1>

      <p>自分の石の色</p>

      <input
        type="color"
        value={playerColor}
        onChange={(e) => setPlayerColor(e.target.value)}
      />

      <p>相手の石の色</p>

      <input
        type="color"
        value={enemyColor}
        onChange={(e) => setEnemyColor(e.target.value)}
      />

      <p>
        今のターン：
        {currentPlayer === BLACK ? "自分" : "相手"}
      </p>

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell === BLACK && (
                <div
                  className="piece"
                  style={{ backgroundColor: playerColor }}
                />
              )}

              {cell === WHITE && (
                <div
                  className="piece"
                  style={{ backgroundColor: enemyColor }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App