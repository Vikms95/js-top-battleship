import { Gameboard } from './gameboard'

let gameboard
let ship

beforeEach(() =>{
    gameboard = Gameboard()
    ship = gameboard.createShip('A1','A2')

})
test('createShip should create a ship object', () =>{
    expect(ship).toHaveProperty('findHit')
    expect(ship).toHaveProperty('isSunk')
    expect(ship).toHaveProperty('getShipCoord')
})

// test('sends information to View on how to render the board with sendShipCoord')
// test('sends information to Gameflow on when to end game with checkPlayerShips')
// test('sends information to Ships array of the last hit registered')
// test('if not a single Ship was hit, will tell View to display it')