import { renderStaticElements } from '../view/renderStaticElements'
import { renderMatchResult } from '../view/renderDynamicElements'
import { removeEventListeners, addEventListenerDraggable, addEventListenersBoardDrag, addEventListenersBoardClick } from './handleEventListeners'
import { Player } from './player'
// import { executeGame } from '/src/index'

export function Game (){
    let shipDirection = 'Vertical'
    let coordsArray = []

    const el = document.querySelector('.gameboard-grid.player2')
    el.classList.remove('unclickable')

    const player1 = Player('Victor')
    const player2 = Player('Computer')
    let playerInTurn = player2
    let gameboard1 
    let gameboard2 
    let enemyGameboard = player1.getGameboard()

    renderStaticElements(player1, player2)

    const gameTurn = (coords) =>{ 
        playerInTurn = player1
        enemyGameboard = player2.getGameboard() 
        // let playerCoords = playerInTurn.sendAttackCoordsToGame(coords)

        const array = (Array.from(document.querySelectorAll('.player2 > .grid-square')))
        let isvalid = true
        array.forEach(square =>{
            if(square.id === coords){
                console.log(square)
                if(square.classList.contains('hit') ||square.classList.contains('miss')){
                    isvalid = false
                }
            }
        })

        if(!isvalid) return null
        // console.log(playerCoords)
        // if(playerCoords === null) return null
        let isPlayerAttackMiss   = enemyGameboard.receiveAttackFromPlayer(coords) 
        console.log(isPlayerAttackMiss)
        if(isPlayerAttackMiss === null) return null
        
        playerInTurn = player2
        enemyGameboard = player1.getGameboard()
        
        let computerCoords       = playerInTurn.sendRandomAttackCoordsToGame(enemyGameboard)
        let isComputerAttackMiss = enemyGameboard.receiveAttackFromComputer(computerCoords)

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

  
    const setCoordsArray = (ship) =>{
        coordsArray.push(ship)
    }

    const getCoordsArray = () =>{
        return coordsArray
    }

    const getDirection = () =>{
        return shipDirection 
    }

    const getPlayer1 = () =>{
        return player1
    }

    const getPlayer2 = () =>{
        return player2
    }

    const getPlayerInTurn = () =>{
        return playerInTurn
    }

    const getGameboard2 = () =>{
        return gameboard2
    }

    const setDirection = (direction,element) =>{
        shipDirection = direction
        element.textContent = direction
    }

    const checkForGamePrepared = (game) =>{
        if (game.getCoordsArray().length >= 9){
            game.getPlayer1().createGameBoard(
                game.getCoordsArray()
            )  

            game.getPlayer2().createGameBoard([
                ['A1'],
                ['B1'],
                ['C1'],
                ['D1','D2'],
                ['E1','E2'],
                ['F1','F2'],
                ['G1','G2','G3'],
                ['H1','H2','H3','H4'],
                ['A8','B8','C8','D8','E8']
            ]
            )
            game.gameboard1     = game.getPlayer1().getGameboard()
            game.gameboard2     = game.getPlayer2().getGameboard()
            game.playerInTurn   = game.getPlayer1()
            addEventListenersBoardClick(game)
        }
    }

    return{gameTurn,getCoordsArray,setCoordsArray,getDirection,setDirection,getPlayer1,getPlayer2,getPlayerInTurn,checkForGamePrepared,gameboard1,gameboard2,playerInTurn}
}
