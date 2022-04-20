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

export const isVertPlacementValid = (indexToStyle,squaresToStyle, boardGridArray) =>{
    for (let index = 0; index < squaresToStyle; index++) {
        let element = boardGridArray[indexToStyle]
        if( isOverflowBottom(element) || isOverlap(element)){
            return false
        }
        indexToStyle += 8
    }
    return true
}

export const isHorizPlacementValid = (element,squaresToStyle) =>{
    for (let index = 0; index < squaresToStyle; index++) {
        if(isOverflowBottomSide(element) || isOverlap(element) || isOverflowSide(element,index) ){
            return false
        }
        element = element.nextElementSibling
    }
    return true
} 

export const isOverlap = (element) =>{
    return element.classList.contains('ship')
}

export const isOverflowBottom = (element) =>{
    return element === undefined
}

export const isOverflowBottomSide = (element) => {
    return ((element === null) )
}

export const isOverflowSide = (element,index) => {
    return (element.classList.contains('row') && index !== 0)
}


export const findHitElement = (coords) =>{
    return document.querySelector(`.player1 > #${coords}`)
}
