export function Ship(...positions){

    // The array automatically gets it's length 
    // thanks to the spread operator 
    let _shipCoord = [...positions]
    
    const getShipCoord = () =>{
        return _shipCoord
    }

    // Receives coord hit from Gameboard and checks 
    // which position from squaresPlaced has been hit
    // Pure / Query
    const findHit = (hitCoord) =>{
        return _shipCoord.indexOf(hitCoord)    
    }
    
    // Removes square hit from _squaresPlaced
    // Not pure? / Command
    const removeSquareHit = (index) =>{
        _shipCoord.splice(index,1)
    }

    // Receives squaresPlaced length and if 0 returns 
    // the value to true
    // Pure / Query
    const isSunk = () =>{
        return _shipCoord.length === 0 ? true : false
    }
    
    return {
        findHit,
        removeSquareHit,
        isSunk,
        getShipCoord,
    }
}