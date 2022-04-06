import { Ship } from './ship'

// Mock object declared for test
let ship 

beforeEach(() =>{
    ship = Ship('A2','A3')
})

test('removes square hit', () =>{
    ship.removeSquareHit('A2')
    expect(ship.getShipCoord()).toEqual(['A3'])
})