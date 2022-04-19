import { getShipLengthByName } from '../logic/gameboard'

export const retrieveDataDrop = (event) =>{
    const shipID       = event.dataTransfer.getData('text/plain')
    const squareID     = event.target.id 
    let squaresToStyle = getShipLengthByName(shipID)

    return {shipID,squareID,squaresToStyle}
}

export const retrieveDataBoardVertically = (squareID,shipID) =>{
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    const originalIndex  = boardGridArray.findIndex(el => el.id === squareID)
    const shipInPool     = document.getElementById(shipID)
    let indexToStyle     = originalIndex

    return {boardGridArray, originalIndex, shipInPool, indexToStyle}
}

export const retrieveDataBoardHorizontally = (squareID,shipID,squaresToStyle) =>{
    const originalSquaresToStyle = squaresToStyle
    const originalIndex          = document.getElementById(`${squareID}`)
    const shipInPool             = document.getElementById(shipID)
    let elementToStyle           = originalIndex

    return {elementToStyle, originalIndex, shipInPool, originalSquaresToStyle}
}

export const renderShipsAndReturnCoords = (squaresToStyle,boardGridArray) =>{
}

export const restoreShipRender = (squaresToStyle,elementToStyle,originalSquaresToStyle,originalIndex) =>{
    if(isHorizontalOverlapping(squaresToStyle,elementToStyle,originalIndex)){
        restoreRenderHorizontalOverlap(squaresToStyle,originalSquaresToStyle,elementToStyle)
        return
    }

    if(isPlacedAboveOtherShip(squaresToStyle,elementToStyle,originalSquaresToStyle)){
        shipInPool.classList.remove('hide')
        return
    }

    if(isHorizontalOverflowing(squaresToStyle,elementToStyle)){
        restoreRenderHorizontalOverflow(squaresToStyle,originalSquaresToStyle,elementToStyle)
        return
    }
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
 
export const checkIfRenderOrRestore = (currentSquare,originalIndex,coords) =>{
    if(isVerticalOverlapping(currentSquare) ){
        restoreRenderVerticalOverlap(currentSquare,originalIndex,coords) 
        return true
        
    }else{
        coords.push(currentSquare.id)
        console.log(coords)
        currentSquare.classList.add('ship')
        return false
    }
}



export const isNextSquareValid = (squaresToStyle,elementToStyle,originalSquaresToStyle) =>{
    return (squaresToStyle > 0) 
        && (!elementToStyle.classList.contains('ship')) 
        && (!elementToStyle.classList.contains('row') 
        || (squaresToStyle === originalSquaresToStyle))
}

export const isVerticalOverlapping = (currentSquare) =>{
    return currentSquare.classList.contains('ship')
}

export const isHorizontalOverflowing = (squaresToStyle,elementToStyle) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('row'))
}

export const isHorizontalOverlapping = (squaresToStyle,elementToStyle,originalIndex) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('ship')
        || (originalIndex.previousElementSibling.classList.contains('ship')))      
}

export const isPlacedAboveOtherShip = (squaresToStyle,elementToStyle,originalSquaresToStyle) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('ship')) 
        && (squaresToStyle === originalSquaresToStyle)
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

// export const addCoordsToArray = (coords,indexToAdd) =>{
//     return [...coords,indexToAdd]
// }

export const emptyCoordsArray = (coords) =>{
    return coords.length = 0
}
