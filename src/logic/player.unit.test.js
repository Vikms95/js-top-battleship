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

describe('attackGameboard', () =>{
    test('handles enemy ships check when coords are hitting ', () =>{
    // input attackGameBoard, output mock
    })
    // test('handles enemy ships check when coords are missing ')
})
