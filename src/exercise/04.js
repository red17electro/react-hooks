// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState(
    'tic-tac-toe-history',
    () => Array(9).fill([]),
  )
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe-step',
    0,
  )

  const nextValue = calculateNextValue(history[currentStep])
  const winner = calculateWinner(history[currentStep])
  const status = calculateStatus(winner, history[currentStep], nextValue)

  function restart() {
    setCurrentStep(0)
    setHistory(Array(9).fill([]))
  }

  function selectSquare(square) {
    if (winner || history[currentStep][square]) {
      return
    }

    const squaresCopy = [...history[currentStep]]
    squaresCopy[square] = nextValue
    // my version
    // const historyCopy = [...history]
    // historyCopy[currentStep + 1] = squaresCopy
    // setHistory(historyCopy)
    // setCurrentStep(currentStep + 1)
    debugger
    const newHistory = history.slice(0, currentStep + 1)
    setHistory([...newHistory, squaresCopy])
    setCurrentStep(newHistory.length)
  }

  return (
    <div className="game">
      <div className="game-board">
        {
          <ul>
            {history
              .filter((array, index) => array.length > 0 || index === 0)
              .map((el, index) => (
                <li key={index}>
                  <button
                    disabled={currentStep === index}
                    onClick={() => setCurrentStep(index)}
                  >
                    Go to {index}
                  </button>
                </li>
              ))}
          </ul>
        }
        <Board onClick={selectSquare} squares={history[currentStep]} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  debugger
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
