import { retrieveDataDrop,
    retrieveDataBoardVert,
    retrieveDataBoardHoriz,
    restoreRenderVertOverflow,
    isPlacementValid,
    checkIfRenderOrRestore,
    moveToNextRow,
    moveToPreviousRow,
    emptyCoordsArray, 
} from './handleStylingEventsData'


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

export function handleDropEvent (event,game) {
    const {shipID, squareID ,squaresToStyle} = retrieveDataDrop(event)
    // Ship direction will change based on some DOM class?
    // (shipDirection === 'vertical' ? renderSquaresVertically() : renderSquaresHorizontally())   
    const shipCoords = renderShipHoriz(squareID,squaresToStyle,shipID)
  
    event.target.classList.remove('drag-over')
    event.target.classList.remove('hide')
    game.setCoordsArray(shipCoords)
    game.checkForGamePrepared(game)
}

const renderShipVert = (squareID,squaresToStyle,shipID) =>{
    let coords = []
    let { boardGridArray, originalIndex, shipInPool, indexToStyle } =
      retrieveDataBoardVert(squareID,shipID)
    
    try{
        for (let i = 0; i < squaresToStyle; i++) {
            let currentSquare = boardGridArray[indexToStyle]
            let isSquareInvalid =  checkIfRenderOrRestore(currentSquare,originalIndex,coords,indexToStyle)
            if(isSquareInvalid) return
            indexToStyle = moveToNextRow(indexToStyle)
        }
        shipInPool.classList.add('hide')
        shipInPool.removeAttribute('draggable')
        return coords
        
    }catch(error){
        // Will trigger if ship placement 
        // overflows from the bottom
        coords = emptyCoordsArray(coords)
        indexToStyle = moveToPreviousRow(indexToStyle)
        restoreRenderVertOverflow(indexToStyle,originalIndex,boardGridArray)
    } 
}

const renderSquareVert = () =>{
  
}



const renderShipHoriz = (squareID,squaresToStyle,shipID) =>{
    
    let {elementToStyle, shipInPool} = retrieveDataBoardHoriz(squareID,shipID)
    if(!isPlacementValid(elementToStyle,squaresToStyle)) return
    
    let coords = []
    renderSquaresHoriz(elementToStyle,squaresToStyle,coords)
    hideShipPool(shipInPool)
    console.log(coords)
    return coords     
}
    
const renderSquaresHoriz = (elementToStyle,squaresToStyle,coords) =>{
    while(squaresToStyle > 0){
        elementToStyle.classList.add('ship')
        elementToStyle = elementToStyle.nextElementSibling
        coords.push(elementToStyle.id)
        squaresToStyle-- 
    }
}
    
const hideShipPool = (shipInPool) =>{
    shipInPool.classList.add('hide')
    shipInPool.removeAttribute('draggable')
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
    matchInfoEl.textContent = `${player1.getName()} attack is a ` 
    + (turnData.isPlayerAttackMiss) ? 'miss!' : 'hit!'
  
}

const renderWarningsInfo = () =>{
}

const renderShipOnSink = () =>{

}







