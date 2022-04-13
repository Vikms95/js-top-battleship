import { renderStaticElements } from '../view/renderStaticElements'
import { Player } from './player'

export function Game (){

    const player1 = Player('Victor')
    player1.createGameBoard(
        ['F1'],
        ['B1','B2'],
        ['C1','C2','C3'],
        ['D1','D2','D3','D4'],
        ['E1','E2','E3','E4','E5']
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
    let playerInTurn   = player2
    let enemyGameboard = gameboard1

    renderStaticElements(gameboard1,'player1')

    const gameTurn = (coords) =>{
        const playerCoords = playerInTurn.sendAttackCoordsToGame(coords)
        if(playerCoords === null){
            return null
        }
        const isPlayerAttackMiss   = enemyGameboard.receiveAttackFromPlayer(playerCoords)
        playerInTurn               = switchPlayers()
        enemyGameboard             = switchGameboards()

        const computerCoords       = playerInTurn.sendRandomAttackCoordsToGame(enemyGameboard)
        let isComputerAttackMiss  = enemyGameboard.receiveAttackFromPlayer(computerCoords)

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