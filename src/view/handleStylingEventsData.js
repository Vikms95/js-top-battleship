import { getShipLengthByName } from '../logic/gameboard'

export const retrieveDataDrop = (event) =>{
    const shipID       = event.dataTransfer.getData('text/plain')
    const squareID     = event.target.id 
    let squaresToStyle = getShipLengthByName(shipID)

    return {shipID,squareID,squaresToStyle}
}

export const renderShipsAndReturnCoords = (squaresToStyle,boardGridArray) =>{

}

export const restoreShipRenderingOnOverflow = (indexToStyle,originalIndex,boardGridArray) =>{
    while(indexToStyle >= originalIndex){
        boardGridArray[indexToStyle].classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
}

export const restoreShipRenderingOnOverlap = (currentSquare,originalIndex,coords) =>{
    coords = emptyCoordsArray(coords)
    indexToStyle = moveToPreviousRow(indexToStyle)
    while(indexToStyle >= originalIndex){
        currentSquare.classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
} 

export const checkIfRenderOrRestore = (currentSquare,originalIndex,coords) =>{
    if(hasCurrentIndexShipClass(currentSquare) ){
        restoreShipRenderingOnOverlap(currentSquare,originalIndex,coords) 
        return true
        
    }else{
        coords = addCoordsToArray(coords,currentSquare.id)
        currentSquare.classList.add('ship')
        return false
    }
}

export const retrieveDataBoardVertically = (squareID,shipID) =>{
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    const originalIndex  = boardGridArray.findIndex(el => el.id === squareID)
    const shipInPool     = document.getElementById(shipID)
    let indexToStyle     = originalIndex

    return {boardGridArray, originalIndex, shipInPool, indexToStyle}
}

export const hasCurrentIndexShipClass = (currentSquare) =>{
    return currentSquare.classList.contains('ship')
}

export const moveToNextRow = (indexToStyle) =>{
    return  indexToStyle += 8
}

export const moveToPreviousRow = (indexToStyle) =>{
    return  indexToStyle -= 8

}

export const moveIndexToNextColumn = () =>{

}

export const addCoordsToArray = (coords,indexToAdd) =>{
    return [...coords,indexToAdd]
}

export const emptyCoordsArray = (coords) =>{
    return coords.length = 0
}
