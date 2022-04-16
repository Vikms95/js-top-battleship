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
    setTimeout(() =>{
        event.target.classList.add('hide')
    },0)
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
    renderSquaresVertically(squareID,squaresToStyle)
    event.target.classList.remove('hide')
    // (shipDirection === 'vertical' ? renderSquaresVertically() : renderSquaresHorizontally())   
}
const renderShipOnDrop = (coord) =>{
    
}


const renderSquaresVertically = (squareID,squaresToStyle) =>{
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    let index = boardGridArray.findIndex(el => el.id === squareID)
    for (let i = 0; i < squaresToStyle; i++) {
        boardGridArray[index].classList.add('ship')
        index += 8
    }
}

const renderSquaresHorizontally = (squareID,squaresToStyle) =>{
    let element = document.getElementById(`${squareID}`)
    while(squaresToStyle > 0){
        element.classList.add('ship')
        element = element.nextElementSibling   
        squaresToStyle-- 
    }   
}