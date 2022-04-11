import { Gameboard } from './gameboard'
import { Player } from './player'

let mockGameboard
let mockShip
let mockShip2
let mockGameboardShips
let player
let mockSendHittingCoordDOM 
let mockSendMissingCoordDOM  

beforeEach(() =>{
    player = Player()
    mockGameboard = Gameboard()
    mockShip = mockGameboard.createShip('A1','A2')
    mockShip2 = mockGameboard.createShip('A3','A4','A5','A6')
    mockGameboardShips = []
    mockGameboardShips.push(mockShip)
    mockGameboardShips.push(mockShip2)
      
    // String for now, method when DOM gets created
    mockSendHittingCoordDOM =  'A1' 
    mockSendMissingCoordDOM =  'H8' 
})

describe('createGameBoard', () =>{
    test('handles gameboard properly populated ', () =>{
    // input attackGameBoard, output mockGameboard
        const mockGameboard = player.createGameBoard(
            ['A1'],
            ['B1','B2'],
            ['C1','C2','C3'],
            ['D1','D2','D3','D4'],
            ['E1','E2','E3','E4','E5']
        )
        expect(mockGameboard.getBoardShips()).toHaveLength(5)
        expect(mockGameboard.getBoardShips()[0].getShipCoord()).toHaveLength(1)
        expect(mockGameboard.getBoardShips()[4].getShipCoord()).toHaveLength(5)
    })
    // test('handles enemy ships check when coords are missing ')
})
