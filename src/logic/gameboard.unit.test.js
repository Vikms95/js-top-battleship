import { Gameboard } from './gameboard'

let mockGameboard
let mockShip
let mockGameboardShips
let mockSendHittingCoordDOM
let mockSendMissingCoordDOM
let mockAddShipToBoardGrid

beforeEach(() =>{
    mockGameboard = Gameboard()
    mockShip = mockGameboard.createShip('A1','A2')
    mockGameboardShips = []
    mockGameboardShips.push(mockShip)
    console.log(mockGameboardShips)
      
    // String for now, method when DOM gets created
    mockSendHittingCoordDOM =  'A1' 
    mockSendMissingCoordDOM =  'A3' 
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
  
    beforeEach(()=>{
        mockGameboard.addShipToBoardGrid(mockShip)
    })

    test('undefined is returned if the coords received belong to the ship ',() =>{
        expect(mockGameboard.receiveAttackFromDOM(mockSendHittingCoordDOM)).toBeUndefined()
    })
    
    test('a hit is detected falsy if the coords received do not belong to a ship',() =>{
        expect(mockGameboard.receiveAttackFromDOM(mockSendMissingCoordDOM)).toBe(false)
      
    })

    test('the hit makes findShipAndRemoveCoord remove the coords', () =>{
        const mockFindShipAndRemoveCoord = jest.fn((mockSendHittingCoordDOM, mockGameboardShips) =>{
            for (let i = 0; i < mockGameboardShips.length; i++) {
                if(mockGameboardShips[i].getShipCoord().includes(mockSendHittingCoordDOM)){
                    const index = mockGameboardShips[i].findHit(mockSendHittingCoordDOM)
                    mockGameboardShips[i].removeSquareHit(index)
                }
            }
        })
        mockFindShipAndRemoveCoord(mockSendHittingCoordDOM,mockGameboardShips)
        expect(mockGameboardShips[0].getShipCoord()).toEqual(['A2'])
    })
})

// test('atack is missed if coord received is not from Ship')
// test('sends information to View on how to render the board with sendShipCoord')
// test('sends information to Gameflow on when to end game with checkPlayerShips')
// test('sends information to Ships array of the last hit registered')
// test('if not a single Ship was hit, will tell View to display it')