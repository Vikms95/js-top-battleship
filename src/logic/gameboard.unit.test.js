import { Gameboard } from './gameboard'
let mockGameboard
let mockShip
let mockShip2
let mockGameboardShips
let mockGameboardGrid
let mockSendHittingCoordDOM
let mockSendMissingCoordDOM
let mockAddShipToBoardGrid
const c = console.log.bind(console)
beforeEach(() =>{
    // String for now, method when DOM gets created
    mockSendHittingCoordDOM =  'A1' 
    mockSendMissingCoordDOM =  'H8' 

    mockGameboard = Gameboard()
    mockShip = mockGameboard.createShip('A1','A2')
    mockShip2 = mockGameboard.createShip('A3','A4')
    // mockGameboardShips = []
    // mockGameboardShips.push(mockShip)
    // mockGameboardShips.push(mockShip2)
    // mockGameboardGrid = [{'A1': false,'A2': false,'A3': false,'A4': false,'H8':false}]
      
})
describe('createShip()', () =>{
    test('createShip() - should create a ship object', () =>{
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

// test('sends information to View on how to render the board with sendShipCoord')
// test('sends information to Gameflow on when to end game with checkPlayerShips')
// test('sends information to Ships array of the last hit registered')
// test('if not a single Ship was hit, will tell View to display it')