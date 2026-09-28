import "./App.css"

function App() {
  const board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(0))

  return (
    <div className="app">
      <h1>逆転オセロニア(劣化版)</h1>

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App