export function renderTurn (game,event){
    const turnData = game.gameTurn(event.target.id)
    if(turnData === null) return

    const {playerData,computerData, attackedElement} = 
        retrieveTurnData(turnData)
        
    renderBoardSquares(playerData, event.target)
    renderBoardSquares(computerData, attackedElement)
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
    if(turnData && isHitElement(element)) return
    turnData ? renderSquareOnMiss(element) : renderSquareOnHit(element)
}

const isHitElement = (element) =>{
    return element && element.classList.contains('hit') 
}

const renderSquareOnHit = (element) =>{
    element.classList.remove('ship')
    element.classList.add('hit')
}
  
const renderSquareOnMiss  = (element) =>{
    element.classList.add('miss')
}

const renderShipOnSink = () =>{

}

const renderMatchInfo = () =>{

}

const renderTurnInfo = () =>{
  
}

const renderWarningsInfo = () =>{

}
