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


    const attackGameboard = (coords = 'A1') =>{
        // Receives coords from an event listener
        // Call the enemy Gameboard.receiveAttackFromPlayer with the coords
        
    }

    const isTurnOver = () =>{

    }

    return{
        getName,
        createGameBoard,
        attackGameboard
    }
}