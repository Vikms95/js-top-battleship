import { Ship } from './ship'

// Mock object declared for test
let ship 

beforeEach(() =>{
    ship = Ship('A2','A3')
})

test('finds hit index',() =>{
    expect(ship.findHit('A2')).toBe(0)
})

test('removes square hit', () =>{
    ship.removeSquareHit('A2')
    expect(ship.getShipCoord()).toEqual(['A3'])
})