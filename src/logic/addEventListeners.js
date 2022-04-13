import {renderDynamicElements} from '../view/renderDynamicElements'


export function addEventListeners (game){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square=>{
        square.addEventListener('click',(event) =>{
            const playerCoords = event.target.id
            const turnData = game.gameTurn(playerCoords)
            if(turnData === null) return null
            renderDynamicElements(turnData.isPlayerAttackMiss, event.target)
            const attackedElement = findHitElement(turnData.computerCoords)
            renderDynamicElements(turnData.isComputerAttackMiss,attackedElement)
        })
    })
}

const findHitElement = (coords) =>{
    return  document.querySelector(`.player1 > #${coords}`)
}