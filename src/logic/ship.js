export const Ship = function(length,...positions){
    let _length = length

    let squaresPlaced = [...positions]
    
    const getSquaresPlaces = () =>{
        return squaresPlaced
    }

    const hit = (hitCoord,squaresPlaced) =>{
        // Finds where in the squaresPlaced that coord is
        const indexToDelete = squaresPlaced.findIndex(index =>{
            index === hitCoord
        })

        // Deletes the index from the aray
        squaresPlaced.splice(indexToDelete,1)
        
        // Calls isSunk function to check if the ship is gone

        return getSquaresPlaces
    }

    const isSunk = () =>{

    }
    
    return {
        hit,
        isSunk
    }
}

const f = new Ship(2,'A2','A3')
console.log(f)