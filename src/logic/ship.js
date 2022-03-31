export function Ship(...positions){

    // The array automatically gets it's length 
    // thanks to the spread operator 
    let _squaresPlaced = [...positions]
    
    const getSquaresPlaced = () =>{
        return _squaresPlaced
    }

    // Receives coord hit from Gameboard and checks 
    // which position from squaresPlaced has been hit
    // Pure
    const findHit = (hitCoord) =>{
        return _squaresPlaced.indexOf(hitCoord)    
    }
    
    // Removes square hit from _squaresPlaced
    // Not pure?
    const removeSquareHit = (index) =>{
        _squaresPlaced.splice(index,1)
    }

    // Receives squaresPlaced length and if 0 returns 
    // the value to true
    // Pure
    const isSunk = () =>{
        return _squaresPlaced.length === 0 ? true : false
    }
    
    return {
        findHit,
        removeSquareHit,
        isSunk,
        getSquaresPlaced,
    }
}
