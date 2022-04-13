import { renderStaticElements } from '../view/renderStaticElements'
import { Player } from './player'

export function Game (){

    const player1 = Player('Victor')
    player1.createGameBoard(
        ['H8'],
        ['B5','B6'],
        ['E8','D8','C8'],
        ['D1','D2','D3','D4'],
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

    console.log(gameboard1.getBoardGrid())
    console.log(gameboard2.getBoardGrid())

    renderStaticElements(gameboard1,'player1')

    const gameTurn = (coords) =>{
        const playerCoords = playerInTurn.sendAttackCoordsToGame(coords)
        if(playerCoords === null) return null
  
        const isPlayerAttackMiss   = enemyGameboard.receiveAttackFromPlayer(playerCoords)
        console.log('attack from' + playerInTurn.getName())
        
        playerInTurn               = switchPlayers()
        enemyGameboard             = switchGameboards()
        
        const computerCoords       = playerInTurn.sendRandomAttackCoordsToGame(enemyGameboard)
        let isComputerAttackMiss  = enemyGameboard.receiveAttackFromPlayer(computerCoords)
        console.log('attack from' + playerInTurn.getName())

        playerInTurn               = switchPlayers()
        enemyGameboard             = switchGameboards()

        if(player1.isPlayerDefeated() || player2.isPlayerDefeated()){
            console.log('Done!')
        }
        return {isPlayerAttackMiss,isComputerAttackMiss,computerCoords}
    }

    const switchPlayers = () =>{
        return playerInTurn === player2 ? player1 : player2
    }

    const switchGameboards = () =>{
        return playerInTurn === player2 ? gameboard1 : gameboard2
    }   

    return{gameTurn}
}
