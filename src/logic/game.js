import { Player } from './player'

export function Game (){

    const gameLoop = () =>{
        
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
        
        // Testing variables
        let index = 0
        let coords
        let attack

        // TODO  USE A 'DO WHILE LOOP'
        while(!player1.isPlayerDefeated()||!player2.isPlayerDefeated())
        {   
            coords = Object.keys(enemyGameboard.getBoardGrid())[index]
            // Testing guard clause to avoid error
            if(coords === undefined){
                break
            }
            attack = playerInTurn.sendAttackCoordsToGame(coords)
            enemyGameboard.receiveAttackFromPlayer(attack)
            console.log(enemyGameboard.getBoardGrid())
            playerInTurn = switchPlayers(player1,player2,playerInTurn)
            enemyGameboard = switchGameboards(gameboard1,gameboard2,playerInTurn,player2)
            index++
        }
    }

    const switchPlayers = (p1,p2,pt) =>{
        return pt === p2 ? p1 : p2
    }

    const switchGameboards = (gb1,gb2,pt,p2) =>{
        return pt === p2 ? gb1 : gb2
    }   

    return{gameLoop}
}