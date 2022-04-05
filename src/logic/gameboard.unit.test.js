import { Gameboard } from './gameboard'

let mockGameboard
let mockShip
let mockShip2
let mockGameboardShips
let mockGameboardGrid
let mockSendHittingCoordDOM
let mockSendMissingCoordDOM
let mockAddShipToBoardGrid

beforeEach(() =>{
    mockGameboard = Gameboard()
    mockShip = mockGameboard.createShip('A1','A2')
    mockShip2 = mockGameboard.createShip('A3','A4')
    mockGameboardShips = []
    mockGameboardShips.push(mockShip)
    mockGameboardShips.push(mockShip2)
    mockGameboard.removeShipFromShipsArray(mockShip)
    mockGameboardGrid = [{'A1': false,'A2': false,'A3': false,'A4': false,'H8':false}]
      
    // String for now, method when DOM gets created
    mockSendHittingCoordDOM =  'A1' 
    mockSendMissingCoordDOM =  'H8' 
})

test('createShip() - should create a ship object', () =>{
    expect(mockShip).toHaveProperty('getShipCoord')
    expect(mockShip).toHaveProperty('findHit')
    expect(mockShip).toHaveProperty('isSunk')
})

describe('receiveAttackFromDOM() - hits are detected and looked after on _boardGrid',() =>{
    test('the coords received are valid',()=>{
        const spyReceiveAttackFromDOM = jest.spyOn(mockGameboard, 'receiveAttackFromDOM')
        mockGameboard.receiveAttackFromDOM(mockSendHittingCoordDOM)
        expect(spyReceiveAttackFromDOM).toHaveBeenCalledWith('A1')
    })
  
    test('undefined is returned if the coords received belong to the ship ',() =>{
        expect(mockGameboard.receiveAttackFromDOM(mockSendHittingCoordDOM)).toBeUndefined()
    })
    
    test('a hit is detected falsy if the coords received do not belong to a ship',() =>{
        expect(mockGameboard.receiveAttackFromDOM(mockSendMissingCoordDOM)).toBe(false)
      
    })
})

// test('sends information to View on how to render the board with sendShipCoord')
// test('sends information to Gameflow on when to end game with checkPlayerShips')
// test('sends information to Ships array of the last hit registered')
// test('if not a single Ship was hit, will tell View to display it')