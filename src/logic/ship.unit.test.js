const ship = require('./ship')

test('ship gets created', () =>{
    expect(ship.Ship(2,'A2','A3')).toBe({
        hit: function hit(){},
        isSunk: function isSunk(){}
    })
})

