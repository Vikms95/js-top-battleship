export function Ship(...coordinates){

    // The array automatically gets it's length 
    // thanks to the spread operator 
    let _shipCoord = [...coordinates]
    // TODO set up name according to its length and how many of it's same kind there are

    const _shipNames = {
        1 : 'Spy',
        2 : 'Destroyer',
        3 : 'Cruiser',
        4 : 'Battleship',
        5 : 'Carrier'
    }

    const _shipName = 'Ship'

    // Outgoing query x
    const getShipCoord = () =>{
        return _shipCoord
    }

    const getShipName = () =>{
        return _shipName
    }

    // Incoming query (assert result)
    const findHitIndex = (coords) =>{
        return _shipCoord.indexOf(coords)    
    }
    
    // Self command x
    const removeSquareHit = (coords) =>{
        // Use filter and return a new array?
        const indexCoord = findHitIndex(coords)
        _shipCoord = _shipCoord.filter(coord =>{
            return _shipCoord.indexOf(coord) !== indexCoord 
        })
    }

    // Pure / Outgoing query x
    const isSunk = () =>{
        return _shipCoord.length === 0 ? true : false
    }
    
    return {
        getShipName,
        getShipCoord,
        isSunk,
        removeSquareHit
    }
}
