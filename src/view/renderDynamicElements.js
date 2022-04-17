import { getShipLengthByName } from '../logic/gameboard'

export function renderTurn (turnData,event){
    const { playerData,computerData, attackedElement } = 
        retrieveTurnData(turnData)

    renderBoardSquares(playerData, event.target)
    renderBoardSquares(computerData, attackedElement)

    renderTurnInfo(turnData,turnData.player1)
}

export const renderMatchResult = (playerData) =>{
    const winner = playerData.player1.isPlayerDefeated() 
        ? 'Computer'
        : playerData.player1.getName()   

    const matchInfoEl = document.querySelector('.turn-info')
    matchInfoEl.textContent = `${winner}` + ' is the winner!' 
}

const retrieveTurnData = (turnData) =>{
    const playerData      = turnData.isPlayerAttackMiss
    const computerData    = turnData.isComputerAttackMiss
    const computerCoords  = turnData.computerCoords
    const attackedElement = findHitElement(computerCoords)

    return { playerData,computerData, attackedElement }
}

const findHitElement = (coords) =>{
    return document.querySelector(`.player1 > #${coords}`)
}

const renderBoardSquares = (turnData, element) =>{
    if(isHitElement(element)) return  
    (turnData) ? renderSquareOnMiss(element) : renderSquareOnHit(element)
}

const isHitElement = (element) =>{
    return element.classList.contains('hit') 
}

const renderSquareOnHit = (element) =>{
    element.classList.remove('ship')
    element.classList.add('hit')
}
  
const renderSquareOnMiss  = (element) =>{
    element.classList.add('miss')
}

const renderTurnInfo = (turnData,player1) =>{
    const matchInfoEl = document.querySelector('.turn-info')
    matchInfoEl.textContent = `${player1.getName()} attack is a ` + 
  (turnData.isPlayerAttackMiss ? 'miss!' : 'hit!')
  
}

const renderWarningsInfo = () =>{
}

const renderShipOnSink = () =>{

}

export function dragStart (event) {
    event.dataTransfer.setData('text/plain',event.target.id)
}
export function dragEnter (event) {
    event.preventDefault()
    event.target.classList.add('drag-over')
}
export function dragOver (event) {
    event.preventDefault()
    event.target.classList.add('drag-over')

}
export function dragLeave (event) {
    event.target.classList.remove('drag-over')

}
export function drop (event) {
    event.target.classList.remove('drag-over')
    const shipID = event.dataTransfer.getData('text/plain')
    const squareID = event.target.id 
    let squaresToStyle = getShipLengthByName(shipID)
    // ONLY ADD STYLE, DO NOT MANAGE BOARDGRID FROM HERE
    renderSquaresVertically(squareID,squaresToStyle,shipID)
    event.target.classList.remove('hide')
    // (shipDirection === 'vertical' ? renderSquaresVertically() : renderSquaresHorizontally())   
}
const renderShipOnDrop = (coord) =>{
    
}


const renderSquaresVertically = (squareID,squaresToStyle,shipID) =>{
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    const originalIndex = boardGridArray.findIndex(el => el.id === squareID)
    const shipInPool = document.getElementById(shipID)
    let indexToStyle = originalIndex
    try{
        for (let i = 0; i < squaresToStyle; i++) {
            boardGridArray[indexToStyle].classList.add('ship')
            indexToStyle += 8
        }
        shipInPool.classList.add('hide')
        shipInPool.removeAttribute('draggable')
    }catch(error){
        indexToStyle -=8
        while(indexToStyle >= originalIndex){
            boardGridArray[indexToStyle].classList.remove('ship')
            indexToStyle -= 8
        }
        return
    }
}

const renderSquaresHorizontally = (squareID,squaresToStyle,shipID) =>{
    const originalIndex = document.getElementById(`${squareID}`)
    const originalSquaresToStyle = squaresToStyle
    const shipInPool = document.getElementById(shipID)
    let elementToStyle = originalIndex

    while(squaresToStyle > 0 && !elementToStyle.classList.contains('row')){
        elementToStyle.classList.add('ship')
        elementToStyle = elementToStyle.nextElementSibling
        squaresToStyle-- 
    }
    if(squaresToStyle > 0){
        while(squaresToStyle <= originalSquaresToStyle){
            elementToStyle.classList.remove('ship')
            elementToStyle = elementToStyle.previousElementSibling
            squaresToStyle++
        }
        shipInPool.classList.remove('hide')
    }
    else{
        shipInPool.classList.add('hide')
        shipInPool.removeAttribute('draggable')
    }   

}