import { Player } from './src/logic/player'
export function Game (){

    const setupGame = () =>{
        
        const player1 = Player('Victor')
        const player2 = Player('Olga')

        const gameboard1 = player1.createGameBoard(
            ['A1'],
            ['B1','B2'],
            ['C1','C2','C3'],
            ['D1','D2','D3','D4'],
            ['E1','E2','E3','E4','E5']
        )

        const gameboard2 = player2.createGameBoard(            
            ['A1'],
            ['B1','B2'],
            ['C1','C2','C3'],
            ['D1','D2','D3','D4'],
            ['E1','E2','E3','E4','E5']
        )
            
        let playerInTurn = player1
        let enemyGameboard = gameboard2

        while(!player1.isPlayerDefeated(gameboard1)||!player2.isPlayerDefeated(gameboard2))
        {
            const attack = playerInTurn.sendAttackCoordsToGame('A1')
            enemyGameboard.receiveAttackFromPlayer(attack)
            enemyGameboard.isAllShipsSunk()
            playerInTurn = switchPlayers(player1,player2)
            console.log(playerInTurn)
            enemyGameboard = switchGameboards(gameboard1,gameboard2)
            console.log(enemyGameboard)
        }
    }

    const switchPlayers = (player1,player2,playerInTurn) =>{
        return playerInTurn === player2 ? player1 : player2
    }

    const switchGameboards = (gameboard1,gameboard2,enemyGameboard) =>{
        return enemyGameboard === gameboard2 ? gameboard1 : gameboard2
    }   

    return{setupGame}
}