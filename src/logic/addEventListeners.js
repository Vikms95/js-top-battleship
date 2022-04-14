import {renderDynamicElements} from '../view/renderDynamicElements'


export function addEventListeners (game){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square=>{
        square.addEventListener('click',(event) =>{
            const turnData = game.gameTurn(event.target.id)
            if(turnData === null) return null

            const {dataPlayer,dataComputer,attackedElement} = retrieveTurnData(turnData)
            console.log(dataPlayer)
            renderDynamicElements(dataPlayer, event.target)
            renderDynamicElements(dataComputer, attackedElement)
        })
    })
}

const findHitElement = (coords) =>{
    return document.querySelector(`.player1 > #${coords}`)
}

const retrieveTurnData = (turnData) =>{
    const dataPlayer = turnData.isPlayerAttackMiss
    const dataComputer = turnData.isComputerAttackMiss
    const computerCoords = turnData.computerCoords
    const attackedElement = findHitElement(computerCoords)

    return {dataPlayer,dataComputer,attackedElement}
}