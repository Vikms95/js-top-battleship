import { Gameboard } from './gameboard'

let gameboard

test('Gameboard factory creates a ship by calling the Ship factory createShip method', () =>{
    gameboard = Gameboard()
    expect(gameboard.createShip('A1','A2')).toHaveProperty('findHit','isSunk','getShipCoord')
})

// test('sends information to View on how to render the board with sendShipCoord')
// test('sends information to Gameflow on when to end game with checkPlayerShips')
// test('sends information to to Ship array of the last hit registered')
// test('if not a single Ship was hit, will tell View to display it')