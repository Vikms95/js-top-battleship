import { Ship } from './ship'

// Mock object declared for test
let ship 

test('finds hit index',() =>{
    ship = Ship('A2','A3')
    expect(ship.findHit('A2')).toBe(0)
})
