export function Ship(...positions){

    // The array automatically gets it's length 
    // thanks to the spread operator 
    let _squaresPlaced = [...positions]
    
    const getSquaresPlaced = () =>{
        return _squaresPlaced
    }

    const removeSquarePlaced = (index) =>{
        _squaresPlaced.splice(index,1)
    }

    // Receives coord hit from Gameboard and checks 
    // which position from squaresPlaced has been hit
    const hit = (hitCoord) =>{

        // Finds where in the squaresPlaced that coord is
        const index = _squaresPlaced.indexOf(hitCoord)

        // Deletes the index from the array
        removeSquarePlaced(index)
    }

    // Receives squaresPlaced length and if 0 returns 
    // the value to true
    const isSunk = (_squaresPlaced) =>{
        return getSquaresPlaced().length === 0 ? true : false
    }
    
    return {
        hit,
        isSunk,
        getSquaresPlaced,
    }
}