import { getShipLengthByName } from '../logic/gameboard'

export const retrieveDataDrop = (event) =>{
    const shipID       = event.dataTransfer.getData('text/plain')
    const squareID     = event.target.id 
    let squaresToStyle = getShipLengthByName(shipID)

    return {shipID,squareID,squaresToStyle}
}

export const renderShipsAndReturnCoords = (squaresToStyle,boardGridArray) =>{
}

export const restoreRenderVerticalOverflow = (indexToStyle,originalIndex,boardGridArray) =>{
    while(indexToStyle >= originalIndex){
        boardGridArray[indexToStyle].classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
}

export const restoreRenderVerticalOverlap = (currentSquare,originalIndex,coords) =>{
    coords = emptyCoordsArray(coords)
    indexToStyle = moveToPreviousRow(indexToStyle)
    while(indexToStyle >= originalIndex){
        currentSquare.classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
} 

export const restoreRenderHorizontalOverflow = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{
    while(squaresToStyle <= originalSquaresToStyle){
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
}

export const restoreRenderHorizontalOverlap = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{
    const isAllSquaresNotRestored = 
        elementToStyle.classList.contains('row') 
            ? isSquaresHigher
            : isSquaresHigherOrEqual
        
    elementToStyle = elementToStyle.previousElementSibling

    while(isAllSquaresNotRestored(squaresToStyle,originalSquaresToStyle)){
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
}
  
// export const restoreRenderHorizontalAfterShip = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{
//     elementToStyle = elementToStyle.previousElementSibling
//     while(squaresToStyle < originalSquaresToStyle){
//         elementToStyle.classList.remove('ship')
//         elementToStyle = elementToStyle.previousElementSibling
//         squaresToStyle++
//     } 
// }
 
export const checkIfRenderOrRestore = (currentSquare,originalIndex,coords) =>{
    if(isVerticalOverlapping(currentSquare) ){
        restoreRenderVerticalOverlap(currentSquare,originalIndex,coords) 
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
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('row'))
}

export const isHorizontalOverlapping = (squaresToStyle,elementToStyle) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('ship'))
}

export const isPlacedAboveOtherShip = (squaresToStyle,elementToStyle,originalSquaresToStyle) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('ship')) 
        && (squaresToStyle === originalSquaresToStyle)
}

export const isPlacementInvalidAndBehindAShip = (squaresToStyle,originalIndex)=>{
    return (squaresToStyle > 0) 
        && (originalIndex.previousElementSibling.classList.contains('ship'))
}

export const isSquaresHigher = (squaresToStyle,originalSquaresToStyle) =>{
    return squaresToStyle < originalSquaresToStyle
}

export const isSquaresHigherOrEqual = (squaresToStyle,originalSquaresToStyle) =>{
    return squaresToStyle <= originalSquaresToStyle
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
