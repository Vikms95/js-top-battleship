import { Gameboard } from './gameboard'

let mockGameboard
let mockShip
let mockSendHittingCoordDOM
let mockSendMissingCoordDOM

beforeEach(() =>{
    mockGameboard = Gameboard()
    mockShip = mockGameboard.createShip('A1','A2')
    // String for now, method when DOM gets created
    mockSendHittingCoordDOM =  'A1' 
    mockSendMissingCoordDOM =  'A3' 
})

test('createShip should create a ship object', () =>{
    expect(mockShip).toHaveProperty('getShipCoord')
    expect(mockShip).toHaveProperty('findHit')
    expect(mockShip).toHaveProperty('isSunk')
})

describe('hits are detected and looked after on _boardGrid',() =>{
    test('the coords received are valid',()=>{
        const spyReceiveAttackFromDOM = jest.spyOn(mockGameboard, 'receiveAttackFromDOM')
        mockGameboard.receiveAttackFromDOM(mockSendHittingCoordDOM)
        expect(spyReceiveAttackFromDOM).toHaveBeenCalledWith('A1')
    })
  
    beforeEach(()=>{
        mockGameboard.addShipToBoardGrid(mockShip)
    })
    
    test('a hit is detected truthy if the coords received belong to a ship',() =>{
        expect(mockGameboard.receiveAttackFromDOM(mockSendHittingCoordDOM)).toBe(true)
    })

    test('a hit is detected falsy if the coords received do not belong to a ship',() =>{
        expect(mockGameboard.receiveAttackFromDOM(mockSendMissingCoordDOM)).toBe(false)
    })
  
})

// test('atack is missed if coord received is not from Ship')
// test('sends information to View on how to render the board with sendShipCoord')
// test('sends information to Gameflow on when to end game with checkPlayerShips')
// test('sends information to Ships array of the last hit registered')
// test('if not a single Ship was hit, will tell View to display it')