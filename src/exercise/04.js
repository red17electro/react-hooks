// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board() {
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

  function selectSquare(square) {
    if (winner || history[currentStep][square]) {
      return
    }

    const squaresCopy = [...history[currentStep]]
    squaresCopy[square] = nextValue
    const historyCopy = [...history]
    historyCopy[currentStep + 1] = squaresCopy
    setHistory(historyCopy)
    setCurrentStep(currentStep + 1)
  }

  function restart() {
    setCurrentStep(0)
    setHistory(Array(9).fill([]))
  }

  function goToHistory(step) {
    setCurrentStep(step)
    // setHistory([...history].slice(0, currentStep))
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {history[currentStep][i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      {
        <ul>
          {history
            .filter((array, index) => array.length > 0 || index === 0)
            .map((el, index) => (
              <li key={index}>
                <button
                  disabled={currentStep === index}
                  onClick={() => goToHistory(index)}
                >
                  Go to {index}
                </button>
              </li>
            ))}
        </ul>
      }
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
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
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
