import { Gameboard } from './gameboard'

let mockGameboard
let mockShip
let mockShip2
let mockSendHittingCoordDOM
let mockSendMissingCoordDOM

beforeEach(() =>{
    mockGameboard = Gameboard()
    mockSendHittingCoordDOM =  'A1' 
    mockSendMissingCoordDOM =  'H8' 
    mockShip = mockGameboard.createShip(['A1','A2'])
    mockShip2 = mockGameboard.createShip(['A3','A4'])      
})
  
describe('populateGameboard()', () =>{
    let mockGameboard = Gameboard()  
    mockGameboard.populateGameboard([
        ['C1','C2','C3'],
        ['D1','D2','D3','D4'],
        ['E1','E2','E3','E4','E5']
    ])
        
    test('coordinates are add properly to the ship array',() =>{
        expect(mockGameboard.getBoardShips()[0].getShipCoord()).toEqual(['C1','C2','C3'])
    })
    test('the right amount of ships are added within the array', ()=>{
        expect(mockGameboard.getBoardShips().length).toBe(3)
    })
})

describe('createShip()', () =>{
    test.only('should create a ship object', () =>{
        expect(mockShip).toHaveProperty('getShipName')
        expect(mockShip).toHaveProperty('getShipCoord')
        expect(mockShip).toHaveProperty('isSunkNextHit')
        expect(mockShip).toHaveProperty('removeSquareHit')
    })
  
    test('addShipToShipsArray() - should add the proper ship coordinate', () =>{
        expect(mockGameboard.getBoardShips()[0].getShipCoord()).toEqual(['A1','A2'])
        expect(mockGameboard.getBoardShips()[1].getShipCoord()).toEqual(['A3','A4'])
    } )
  
    test('addShipToBoardGridObject() - should mark the proper ship coordinate as true', () =>{
        expect(Object.values(mockGameboard.getBoardGrid())[0]).toEqual(true)
        expect(Object.values(mockGameboard.getBoardGrid())[1]).toEqual(true)
        expect(Object.values(mockGameboard.getBoardGrid())[10]).toEqual(false)
        expect(Object.values(mockGameboard.getBoardGrid())[25]).toEqual(false)

    })
})

describe('receiveAttackFromPlayer()',() =>{
    test('handles coords received validation',()=>{
        const spyreceiveAttackFromPlayer = jest.spyOn(mockGameboard, 'receiveAttackFromPlayer')
        mockGameboard.receiveAttackFromPlayer(mockSendHittingCoordDOM)
        expect(spyreceiveAttackFromPlayer).toHaveBeenCalledWith('A1')
    })
  
    test('handles hitting coords',() =>{
        expect(mockGameboard.receiveAttackFromPlayer(mockSendHittingCoordDOM)).toBeUndefined()
    })
    
    test('handles missing coords',() =>{
        expect(mockGameboard.receiveAttackFromPlayer(mockSendMissingCoordDOM)).toBe(mockSendMissingCoordDOM)
    })

    test('removeShipSquare() - removes ship coordinate and marks square',() =>{
        mockGameboard.receiveAttackFromPlayer(mockSendHittingCoordDOM)
        expect(mockGameboard.getBoardShips()[0].getShipCoord()).toEqual(['A2'])
        expect(Object.values(mockGameboard.getBoardGrid())[0]).toEqual('Hit')
    })

    test('removeShipsFromShipsArray() - removes ship from array and marks square',()=>{
        mockGameboard.receiveAttackFromPlayer('A1')
        mockGameboard.receiveAttackFromPlayer('A2')
        expect(mockGameboard.getBoardShips().length).toBe(1)

    })
})

describe('isAttackValid()',() =>{
    test('returns true when coordinate is not hit',()=>{        
        expect(mockGameboard.receiveAttackFromPlayer(mockSendHittingCoordDOM)).toBeUndefined()
    })
    test('returns false when coordinate is hit',()=>{        
        mockGameboard.receiveAttackFromPlayer('A1')
        expect(mockGameboard.receiveAttackFromPlayer('A1')).toBe('A1')
    })
})

describe('isCoordsAvailable()',() =>{
    test('returns true and returns a ship when coordinate is false',()=>{    
        expect(mockGameboard.createShip('A5','A6')).toHaveProperty('getShipName')   
    })
    test('returns false and does not create it when coordinate is true',()=>{        
        expect(mockGameboard.createShip('A1','A2')).toBeUndefined()
    })
})


// test('sends information to View on how to render the board with sendShipCoord')
// test('sends information to Gameflow on when to end game with checkPlayerShips')
// test('sends information to Ships array of the last hit registered')
// test('if not a single Ship was hit, will tell View to display it')