import { Ship } from './ship'

// Mock object created for test
let ship 

beforeEach(() =>{
    ship = Ship('A2','A3')
})

test('finds hit index',() =>{
    expect(ship.findHit('A2')).toBe(0)
})

test('removes hit index from findHit',() =>{
    ship.removeSquareHit(0)
    expect(ship.getSquaresPlaced()).toEqual(['A3'])
})

test('isSunk triggers when _positions is 0',() =>{
    ship.removeSquareHit(0)
    ship.removeSquareHit(0)
    expect(ship.isSunk()).toBe(true)
})