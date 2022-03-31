export function Ship(...coordinates){

    // The array automatically gets it's length 
    // thanks to the spread operator 
    let _shipCoord = [...coordinates]
    
    // Outgoing query x
    const getShipCoord = () =>{
        return _shipCoord
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
    }
}
