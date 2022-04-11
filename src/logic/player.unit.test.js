import { Player } from './player'

let mockGameboard
let player

beforeEach(() =>{
    player = Player()
    mockGameboard = player.createGameBoard(['A1','A2'])
})

test('createGameboard() - creates a gameboard object ', () =>{
    expect(mockGameboard).toHaveProperty('getBoardGrid')
    expect(mockGameboard).toHaveProperty('getBoardShips')
    expect(mockGameboard).toHaveProperty('createShip')
    expect(mockGameboard).toHaveProperty('populateGameboard')
    expect(mockGameboard).toHaveProperty('receiveAttackFromPlayer')
    expect(mockGameboard).toHaveProperty('isAllShipsSunk')
    expect(mockGameboard).not.toHaveProperty('removeShipSquare')
        
})

test('isPlayerDefeated() - returns false when at least one ship exists in the array', () =>{
    expect(player.isPlayerDefeated(mockGameboard)).toBe(false)
})
test('isPlayerDefeated() - returns true when the array is empty',() =>{
    mockGameboard.receiveAttackFromPlayer('A1')
    mockGameboard.receiveAttackFromPlayer('A2')
    expect(player.isPlayerDefeated(mockGameboard)).toBe(true)
})


