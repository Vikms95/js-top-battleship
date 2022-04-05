export function Ship(...coordinates){

    // The array automatically gets it's length 
    // thanks to the spread operator 
    const _shipCoord = [...coordinates]
    // TODO set up name according to its length and how many of it's same kind there are
    const _shipName = 'Ship'
    // Outgoing query x
    const getShipCoord = () =>{
        return _shipCoord
    }

    const getShipName = () =>{
        return _shipName
    }

    const setShipName = () =>{

    }
    // Receives coord hit from Gameboard and checks 
    // which position from _shipCoords has been hit
    // Incoming query (assert result)
    const findHit = (coords) =>{
        return _shipCoord.indexOf(coords)    
    }
    
    // Removes square hit from _shipCoords
    // Self command x
    const removeSquareHit = (coords) =>{
        // Use filter and return a new array?
        const index = findHit(coords)
        _shipCoord.splice(index,1)
    }

    // Receives _shipCoords length and if 0 returns 
    // the value to true
    // Pure / Outgoing query x
    const isSunk = () =>{
        return _shipCoord.length === 0 ? true : false
    }
    
    return {
        getShipName,
        findHit,
        isSunk,
        getShipCoord,
        removeSquareHit
    }
}
