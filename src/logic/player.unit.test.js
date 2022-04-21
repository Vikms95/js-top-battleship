import { Player } from './player'

let mockPlayer

beforeEach(() =>{
    mockPlayer = Player()
    mockPlayer.createGameBoard('A1','A2')
})

test('createGameboard() - creates a gameboard object ', () =>{
    expect(mockPlayer.getGameboard()).toHaveProperty('getBoardGrid')
    expect(mockPlayer.getGameboard()).toHaveProperty('getBoardShips')
    expect(mockPlayer.getGameboard()).toHaveProperty('createShip')
    expect(mockPlayer.getGameboard()).toHaveProperty('populateGameboard')
    expect(mockPlayer.getGameboard()).toHaveProperty('receiveAttackFromPlayer')
    expect(mockPlayer.getGameboard()).toHaveProperty('isAllShipsSunk')
    expect(mockPlayer.getGameboard()).not.toHaveProperty('removeShipSquare')
        
})

test('isPlayerDefeated() - returns false when at least one ship exists in the array', () =>{
    expect(mockPlayer.isPlayerDefeated()).toBe(false)
})
test('isPlayerDefeated() - returns true when the array is empty',() =>{
    mockPlayer.getGameboard().receiveAttackFromPlayer('A1')
    mockPlayer.getGameboard().receiveAttackFromPlayer('A2')
    expect(mockPlayer.isPlayerDefeated()).toBe(true)
})


