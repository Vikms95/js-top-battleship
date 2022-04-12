import {renderDynamicElements} from '../view/renderDynamicElements'


export function addEventListeners (game){
    const gridSquaresNodeList = document.getElementsByClassName('grid-square')
    Array.from(gridSquaresNodeList).forEach(square=>{
        square.addEventListener('click',(event) =>{
            const coords = event.target.id
            const attackState = game.gameTurn(coords)
            renderDynamicElements(attackState, event.target)
        })
    })
}