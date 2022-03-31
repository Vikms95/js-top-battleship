import { Gameboard } from './gameboard'

let gameboard
let ship
let mockSendCoordDOM
let mockBoardGrid
let mockAddShipToBoardGrid
beforeEach(() =>{
    gameboard = Gameboard()
  
    ship = gameboard.createShip('A1','A2')
    mockBoardGrid ={
        'A1': false,
        'A2': false,
        'A3': false
    } 
    // String for now, method when DOM gets created
    mockSendCoordDOM =  'A1' 
    mockAddShipToBoardGrid = jest.fn((ship) => {
      
    })
})

test('createShip should create a ship object', () =>{
    expect(ship).toHaveProperty('getShipCoord')
    expect(ship).toHaveProperty('findHit')
    expect(ship).toHaveProperty('isSunk')
})

test('the coord received are valid',()=>{
    const spyReceiveAttackFromDOM = jest.spyOn(gameboard, 'receiveAttackFromDOM')
    gameboard.receiveAttackFromDOM(mockSendCoordDOM)
    expect(spyReceiveAttackFromDOM).toHaveBeenCalledWith('A1')
})
  
test('a hit is detected if attack is from a Ship coord',() =>{
    expect(gameboard.receiveAttackFromDOM(mockSendCoordDOM)).toBeTruthy()
  
})

// test('atack is missed if coord received is not from Ship')
// test('sends information to View on how to render the board with sendShipCoord')
// test('sends information to Gameflow on when to end game with checkPlayerShips')
// test('sends information to Ships array of the last hit registered')
// test('if not a single Ship was hit, will tell View to display it')