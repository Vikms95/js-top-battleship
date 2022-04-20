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
    const shipInPool     = document.getElementById(shipID)
    let indexToStyle     = boardGridArray.findIndex(el => el.id === squareID)

    return {boardGridArray,shipInPool, indexToStyle}
}

export const retrieveDataBoardHoriz = (squareID,shipID) =>{
    const elementToStyle         = document.getElementById(`${squareID}`)
    const shipInPool             = document.getElementById(shipID)

    return {elementToStyle, shipInPool}
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

export const checkIfRenderOrRestore = (currentSquare,originalIndex,coords) =>{
    if(isVertOverlap(currentSquare) ){
        restoreRenderVertOverlap(currentSquare,originalIndex,coords) 
        return true
    }
    coords.push(currentSquare.id)
    console.log(coords)
    currentSquare.classList.add('ship')
    return false
  
}

export const isVertPlacementValid = (indexToStyle,squaresToStyle, boardGridArray) =>{
    for (let index = 0; index < squaresToStyle; index++) {
        let element = boardGridArray[indexToStyle]
        if(element === undefined || element.classList.contains('ship')){
            return false
        }
        indexToStyle += 8
    }
    return true
}

export const isHorizPlacementValid = (element,squaresToStyle) =>{
    for (let index = 0; index < squaresToStyle; index++) {
        if(element === null || element.classList.contains('ship') || (element.classList.contains('row') && index !== 0)){
            return false
        }
        element = element.nextElementSibling
    }
    return true
} 

export const isNextSquareValid = (squaresToStyle,elementToStyle,originalSquaresToStyle) =>{
    return (squaresToStyle > 0)
        && (squaresToStyle >= 1 && elementToStyle.nextElementSibling * squaresToStyle !== null)
        && (!elementToStyle.classList.contains('ship')) 
        && (!elementToStyle.classList.contains('row') 
        || (squaresToStyle === originalSquaresToStyle))
}

export const isVertOverlap = (currentSquare) =>{
    return currentSquare.classList.contains('ship')
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
