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

    const sendAttackCoordsToGame = (coords = 'A1') =>{
        // Receives coords from an event listener
        // and send them to game 
        return coords
    }

    const sendRandomAttackCoordsToGame = (gameboard) =>{
        // Select a random square from _boardGrid
        // and send it to the enemy gameboard.receiveAttackFromPlayer
        const BOARD_GRID_LENGTH  = 
            Object.keys(gameboard.getBoardGrid()).length
        const index = generateRandomNumber(0,BOARD_GRID_LENGTH)
        return Object.keys(gameboard.getBoardGrid())[index]
    }

    const generateRandomNumber = (max,min) =>{
        return Math.floor(Math.random() * (max - min)) + min
    }

    const isPlayerDefeated = (gameboard) =>{
        return gameboard.isAllShipsSunk()
    }

    return{
        getName,
        createGameBoard,
        sendAttackCoordsToGame,
        sendRandomAttackCoordsToGame,
        isPlayerDefeated
    }
}

// const p1 = Player()
// const gb = p1.createGameBoard(['A1','A2'])
// console.log(p1.sendRandomAttackCoordsToGameboard(gb))