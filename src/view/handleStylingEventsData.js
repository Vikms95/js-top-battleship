import { getShipLengthByName } from '../logic/gameboard'

export const retrieveTurnData = (turnData) =>{
    const playerData      = turnData.isPlayerAttackMiss
    const computerData    = turnData.isComputerAttackMiss
    const computerCoords  = turnData.computerCoords
    const attackedElement = findHitElement(computerCoords)

    return { playerData,computerData, attackedElement }
}

export const retrieveDataDrop = (event) =>{
    const shipID       = event.dataTransfer.getData('text/plain')
    const squareID     = event.target.id 
    let squaresToStyle = getShipLengthByName(shipID)

    return {shipID,squareID,squaresToStyle}
}

export const retrieveDataBoardVert = (squareID,shipID) =>{
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    const originalIndex  = boardGridArray.findIndex(el => el.id === squareID)
    const shipInPool     = document.getElementById(shipID)
    let indexToStyle     = originalIndex

    return {boardGridArray, originalIndex, shipInPool, indexToStyle}
}

export const retrieveDataBoardHoriz = (squareID,shipID,squaresToStyle) =>{
    const originalSquaresToStyle = squaresToStyle
    const originalIndex          = document.getElementById(`${squareID}`)
    const shipInPool             = document.getElementById(shipID)
    let elementToStyle           = originalIndex

    return {elementToStyle, originalIndex, shipInPool, originalSquaresToStyle}
}

export const restoreShipRender = (squaresToStyle,elementToStyle,originalSquaresToStyle,originalIndex) =>{
    if(isHorizOverlap(squaresToStyle,elementToStyle,originalIndex)){
        restoreRenderHorizlOverlap(squaresToStyle,originalSquaresToStyle,elementToStyle)
        return
    }

    if(isPlacedAboveOtherShip(squaresToStyle,elementToStyle,originalSquaresToStyle)){
        shipInPool.classList.remove('hide')
        return
    }

    if(isHorizOverflow(squaresToStyle,elementToStyle)){
        restoreRenderHorizOverflow(squaresToStyle,originalSquaresToStyle,elementToStyle)
        return
    }
}

export const restoreRenderVertOverflow = (indexToStyle,originalIndex,boardGridArray) =>{
    while(indexToStyle >= originalIndex){
        boardGridArray[indexToStyle].classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
}

export const restoreRenderVertOverlap = (currentSquare,originalIndex,coords) =>{
    coords = emptyCoordsArray(coords)
    indexToStyle = moveToPreviousRow(indexToStyle)
    while(indexToStyle >= originalIndex){
        currentSquare.classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
} 

export const restoreRenderHorizOverflow = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{
    while(squaresToStyle <= originalSquaresToStyle){
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
}

export const restoreRenderHorizlOverlap = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{

    const isAllSquaresNotRestored = 
        elementToStyle.classList.contains('row') 
            ? isSquaresHigher
            : isSquaresHigherOrEqual
        
    elementToStyle = elementToStyle.previousElementSibling

    while(isAllSquaresNotRestored(squaresToStyle,originalSquaresToStyle)){
        // When the ship is placed on first element
        // of array and it is not succesful
        if(elementToStyle === null) return
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
}


export const checkIfRenderOrRestore = (currentSquare,originalIndex,coords) =>{
    if(isVerticalOverlap(currentSquare) ){
        restoreRenderVertOverlap(currentSquare,originalIndex,coords) 
        return true
    }
    coords.push(currentSquare.id)
    console.log(coords)
    currentSquare.classList.add('ship')
    return false
  
}


export const isNextSquareValid = (squaresToStyle,elementToStyle,originalSquaresToStyle) =>{
    return (squaresToStyle > 0) 
        && (!elementToStyle.classList.contains('ship'))
        &&(!elementToStyle === null) 
        && (!elementToStyle.classList.contains('row') 
        || (squaresToStyle === originalSquaresToStyle))
}

export const isVerticalOverlap = (currentSquare) =>{
    return currentSquare.classList.contains('ship')
}

export const isHorizOverflow = (squaresToStyle,elementToStyle) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('row'))
}

export const isHorizOverlap = (squaresToStyle,elementToStyle,originalIndex) =>{
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

export const isRenderSuccesful = (squaresToStyle) =>{
    return squaresToStyle === 0
}

export const moveToNextRow = (indexToStyle) =>{
    return  indexToStyle += 8
}

export const moveToPreviousRow = (indexToStyle) =>{
    return  indexToStyle -= 8

}

export const moveToNextColumn = () =>{

}


export const emptyCoordsArray = (coords) =>{
    return coords.length = 0
}
