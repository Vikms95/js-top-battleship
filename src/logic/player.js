import { Gameboard } from './gameboard'

export function Player(name){
    const _playerName = name

    const getName = () =>{
        return _playerName
    }

    const createGameBoard = (...coordinates) =>{
        const gameboard = Gameboard()
        gameboard.populateGameboard(coordinates)
        return gameboard
    }

    const sendAttackCoordsToGameboard = (coords = 'A1') =>{
        // Receives coords from an event listener
        return coords
    }

    const sendRandomAttackCoordsToGameboard = (gameboard) =>{
        // Select a random square from _boardGrid
        const index = getRandomNumber(0,64)
        return gameboard.getBoardGrid()[1]
  
    }

    const getRandomNumber = (max,min) =>{
        return Math.floor(Math.random() * (max - min)) + min
    }

    const isTurnOver = () =>{

    }

    return{
        getName,
        createGameBoard,
        sendAttackCoordsToGameboard,
        sendRandomAttackCoordsToGameboard
    }
}

const p1 = Player()
const gb = p1.createGameBoard()
console.log(p1.sendRandomAttackCoordsToGameboard(gb))