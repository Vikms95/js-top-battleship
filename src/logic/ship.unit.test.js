import { Ship } from './ship'

// Mock object declared for test
let ship 
let mockSendHittingCoordDOM
let mockSendMissingCoordDOM




test('removes square hit', () =>{
    ship = Ship('A2','A3')
    ship.removeSquareHit('A2')
    expect(ship.getShipCoord()).toEqual(['A3'])
})


