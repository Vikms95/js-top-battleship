import { Player } from './src/logic/player'
export function Game (){

    const setupGame = () =>{
        let playerInTurn = player1
        let enemyGameboard = gameboard2
    
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

        while(
            !player1.isPlayerDefeated()
            ||
            !player2.isPlayerDefeated()
        ){
            const attack = playerInTurn.sendAttackCoordsToGame('A1')
            enemyGameboard.receiveAttackFromPlayer(attack)
            enemyGameboard.isAllShipsSunk()
            enemyGameboard.sendStateToDOM()
            playerInTurn = switchPlayers(player1,player2)
            enemyGameboard = switchGameboards(gameboard1,gameboard2)
        }
    }

    const switchPlayers = (player1,player2) =>{
        return playerInTurn === player2 ? player1 : player2
    }

    const switchGameboards = (player2,gameboard1,gameboard2) =>{
        return playerInTurn === player2 ? gameboard1 : gameboard2
    }   

    return{setupGame}
}