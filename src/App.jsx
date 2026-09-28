import { useState } from "react"
import "./App.css"

function App() {
  const EMPTY = 0
  const BLACK = 1
  const WHITE = 2

  const [playerColor, setPlayerColor] = useState("#000000")
  const [enemyColor, setEnemyColor] = useState("#ffffff")

  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(EMPTY))

  board[3][3] = WHITE
  board[3][4] = BLACK
  board[4][3] = BLACK
  board[4][4] = WHITE

  return (
    <div className="app">
      <h1>逆転オセロニア（劣化版）</h1>

      <div>
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
      </div>

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
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