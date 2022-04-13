import {renderDynamicElements} from '../view/renderDynamicElements'


export function addEventListeners (game){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square=>{
        square.addEventListener('click',(event) =>{
            const playerCoords = event.target.id
            const turnData = game.gameTurn(playerCoords)
            renderDynamicElements(turnData.playerAttackIsMiss, event.target)
            const attackedElement = findHitElement(turnData.computerCoords)
            renderDynamicElements(turnData.computerAttackIsMiss,attackedElement)
        })
    })
}

const findHitElement = (coords) =>{
    return  document.querySelector(`.player1 > #${coords}`)
}