import { Ship } from './ship'

// Mock object created for test
let ship 

beforeAll(() =>{
    ship = Ship('A2','A3')
})

test('finds hit index',() =>{
    expect(ship.findHit('A2')).toBe(0)
})

test('removes hit index from findHit',() =>{
    ship.removeSquareHit(0)
    expect(ship.getSquaresPlaced()).toEqual(['A3'])
})