import { renderStaticElements } from '../view/renderStaticElements'
import { renderMatchResult } from '../view/renderDynamicElements'
import { removeEventListeners, addEventListenerDraggable, addEventListenersBoardDrag, addEventListenersBoardClick } from './handleEventListeners'
import { Player } from './player'
// import { executeGame } from '/src/index'

export function Game (){
    let coordsArray = []
    const el = document.querySelector('.gameboard-grid.player2')
    el.classList.remove('unclickable')

    const player1 = Player('Victor')
    player1.createGameBoard(
        ['G3'],
        ['C5','H6'],
        ['B7','D1','H1'],
        ['C6','A5','D8','D2'],
        ['E1','E2','E3','E4','A5']
    )
    const player2 = Player('Computer')
    player2.createGameBoard(
        ['G8'],
        ['B1','B2'],
        ['C1','C2','C3'],
        ['D1','D2','D3','D4'],
        ['E1','E2','E3','E4','E5']
    )

    let gameboard1     = player1.getGameboard()
    let gameboard2     = player2.getGameboard()
    let playerInTurn   = player1
    let enemyGameboard = gameboard2

    renderStaticElements(gameboard1, player1, player2)

    const gameTurn = (coords) =>{
        const playerCoords = playerInTurn.sendAttackCoordsToGame(coords)
        if(playerCoords === null) return null
  
        const isPlayerAttackMiss   = enemyGameboard.receiveAttackFromPlayer(playerCoords) 
        playerInTurn               = switchPlayers()
        enemyGameboard             = switchGameboards()
        
        const computerCoords       = playerInTurn.sendRandomAttackCoordsToGame(enemyGameboard)
        const isComputerAttackMiss = enemyGameboard.receiveAttackFromPlayer(computerCoords)
        playerInTurn               = switchPlayers()
        enemyGameboard             = switchGameboards()

        if(isAnyPlayerDefeated()){
            el.classList.add('unclickable')
            removeEventListeners()
            renderMatchResult({player1,player2})
            prepareNextMatch()
            
            return null
        }
        return {
            player1,
            isPlayerAttackMiss,
            isComputerAttackMiss,
            computerCoords
        }
    }

    const switchPlayers = () =>{
        return (playerInTurn === player2) ? player1 : player2
    }

    const switchGameboards = () =>{
        return (playerInTurn === player2) ? gameboard1 : gameboard2
    }   

    const isAnyPlayerDefeated = () =>{
        return player1.isPlayerDefeated() || player2.isPlayerDefeated()
    } 

    // const prepareNextMatch = () =>{
    //     // Remove event listeners from board
    //     setTimeout(,2000)
    // }

    const addEventListenersDragShips = (game) =>{
        addEventListenerDraggable()
        addEventListenersBoardDrag(game)
    }

    const setCoordsArray = (ship) =>{
        coordsArray.push(ship)
    }

    const getCoordsArray = () =>{
        return coordsArray
    }

    const checkForGamePrepared = (game) =>{
        if (game.getCoordsArray().length >= 9){
            addEventListenersBoardClick(game)
        }
    }

    return{gameTurn,addEventListenersDragShips,getCoordsArray,setCoordsArray,checkForGamePrepared}
}
