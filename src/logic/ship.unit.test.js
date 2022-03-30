import { Ship } from './ship'




test('finds hit index',() =>{
    const ship = Ship('A2','A3')
    expect(ship.findHit('A2')).toBe(0)
})

test('removes hit index from findHit',() =>{
    const ship = Ship('A2','A3')
    ship.removeSquareHit(0)
    expect(ship.getSquaresPlaced()).toEqual(['A3'])
})