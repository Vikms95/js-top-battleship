import { getShipLengthByName } from '../logic/gameboard'

export const retrieveDataDrop = (event) =>{
    const shipID       = event.dataTransfer.getData('text/plain')
    const squareID     = event.target.id 
    let squaresToStyle = getShipLengthByName(shipID)

    return {shipID,squareID,squaresToStyle}
}

export const renderShipsAndReturnCoords = (squaresToStyle,boardGridArray) =>{
}

export const restoreRenderingOnVerticalOverflow = (indexToStyle,originalIndex,boardGridArray) =>{
    while(indexToStyle >= originalIndex){
        boardGridArray[indexToStyle].classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
}

export const restoreRenderingOnVerticalOverlap = (currentSquare,originalIndex,coords) =>{
    coords = emptyCoordsArray(coords)
    indexToStyle = moveToPreviousRow(indexToStyle)
    while(indexToStyle >= originalIndex){
        currentSquare.classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
} 

export const restoreRenderingOnHorizontalOverflow = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{
    while(squaresToStyle <= originalSquaresToStyle){
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
}

export const restoreRenderingOnHorizontalOverlap = (squaresToStyle,originalSquaresToStyle,elementToStyle,shipInPool) =>{
    elementToStyle = elementToStyle.previousElementSibling
    while(squaresToStyle <= originalSquaresToStyle){
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
    shipInPool.classList.remove('hide')
}

export const checkIfRenderOrRestore = (currentSquare,originalIndex,coords) =>{
    if(isVerticalOverlapping(currentSquare) ){
        restoreRenderingOnVerticalOverlap(currentSquare,originalIndex,coords) 
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

export const isVerticalOverlapping = (currentSquare) =>{
    return currentSquare.classList.contains('ship')
}

export const isHorizontalOverflowing = (squaresToStyle,elementToStyle) =>{
    return squaresToStyle > 0 && elementToStyle.classList.contains('row')
}

export const isHorizontalOverlapping = (squaresToStyle,elementToStyle) =>{
    return squaresToStyle > 0 && elementToStyle.classList.contains('ship')
}

export const moveToNextRow = (indexToStyle) =>{
    return  indexToStyle += 8
}

export const moveToPreviousRow = (indexToStyle) =>{
    return  indexToStyle -= 8

}

export const moveToNextColumn = () =>{

}

export const addCoordsToArray = (coords,indexToAdd) =>{
    return [...coords,indexToAdd]
}

export const emptyCoordsArray = (coords) =>{
    return coords.length = 0
}
