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

export const hasCurrentIndexShipClass = (currentSquare) =>{
    return currentSquare.classList.contains('ship')
}

export const moveIndexToNextRow = (indexToStyle) =>{
    return  indexToStyle += 8
}

export const moveIndexToPreviousRow = (indexToStyle) =>{
    return  indexToStyle -= 8

}

export const moveIndexToNextColumn = () =>{

}

export const emptyCoordsArray = (coords) =>{
    return coords.length = 0
}
