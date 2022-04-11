import { Player } from './player'

export function Game (){

    const player1 = Player('Victor')
    player1.createGameBoard(
        ['A1'],
        ['B1','B2'],
        ['C1','C2','C3'],
        ['D1','D2','D3','D4'],
        ['E1','E2','E3','E4','E5']
    )
    const player2 = Player('Olga')
    player2.createGameBoard(
        ['G8'],
        ['B1','B2'],
        ['C1','C2','C3'],
        ['D1','D2','D3','D4'],
        ['E1','E2','E3','E4','E5']
    )

    let gameboard1 = player1.getGameboard()
    let gameboard2 = player2.getGameboard()
    let playerInTurn = player2
    let enemyGameboard = gameboard1

    const gameLoop = () =>{
              
        // Testing variables
        let index = 0
        let coords
        let attack

        while(!player1.isPlayerDefeated()||!player2.isPlayerDefeated())
        {   
            // Add the incremental index as testing
            coords = Object.keys(enemyGameboard.getBoardGrid())[index]
            // Testing guard clause to avoid error
            if(coords === undefined){
                break
            }
            attack = playerInTurn.sendAttackCoordsToGame(coords)
            enemyGameboard.receiveAttackFromPlayer(attack)
            playerInTurn = switchPlayers()
            enemyGameboard = switchGameboards()
            // Testing incremental index to auto attack
            index++
        }
    }

    const switchPlayers = () =>{
        return playerInTurn === player2 ? player1 : player2
    }

    const switchGameboards = () =>{
        return playerInTurn === player2 ? gameboard1 : gameboard2
    }   

    return{gameLoop}
}