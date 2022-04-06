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
    expect(mockShip).toHaveProperty('getShipName')
    expect(mockShip).toHaveProperty('getShipCoord')
    expect(mockShip).toHaveProperty('isSunk')
    expect(mockShip).toHaveProperty('removeSquareHit')
})

describe('receiveAttackFromPlayer',() =>{
    test('handles coords received validation',()=>{
        const spyreceiveAttackFromPlayer = jest.spyOn(mockGameboard, 'receiveAttackFromPlayer')
        mockGameboard.receiveAttackFromPlayer(mockSendHittingCoordDOM)
        expect(spyreceiveAttackFromPlayer).toHaveBeenCalledWith('A1')
    })
  
    test('handles hitting coords',() =>{
        expect(mockGameboard.receiveAttackFromPlayer(mockSendHittingCoordDOM)).toBeUndefined()
    })
    
    test('handles missing coords',() =>{
        expect(mockGameboard.receiveAttackFromPlayer(mockSendMissingCoordDOM)).toBe(false)
      
    })
})

// test('sends information to View on how to render the board with sendShipCoord')
// test('sends information to Gameflow on when to end game with checkPlayerShips')
// test('sends information to Ships array of the last hit registered')
// test('if not a single Ship was hit, will tell View to display it')