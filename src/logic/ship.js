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

    }

    const setShipName = () =>{

    }
    // Receives coord hit from Gameboard and checks 
    // which position from squaresPlaced has been hit
    // Incoming query (assert result)
    const findHit = (hitCoord) =>{
        return _shipCoord.indexOf(hitCoord)    
    }
    
    // Removes square hit from _squaresPlaced
    // Self command x
    const removeSquareHit = (index) =>{
        _shipCoord.splice(index,1)
    }

    // Receives squaresPlaced length and if 0 returns 
    // the value to true
    // Pure / Outgoing query x
    const isSunk = () =>{
        return _shipCoord.length === 0 ? true : false
    }
    
    return {
        findHit,
        isSunk,
        getShipCoord,
        removeSquareHit
    }
}
