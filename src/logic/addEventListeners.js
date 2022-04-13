import {renderDynamicElements} from '../view/renderDynamicElements'


export function addEventListeners (game){
    const gridSquaresNodeList = document.getElementsByClassName('grid-square')
    Array.from(gridSquaresNodeList).forEach(square=>{
        square.addEventListener('click',(event) =>{
            const coords = event.target.id
            const clickedGameboard = event.target.parentNode
            const attackState = game.gameTurn(coords,clickedGameboard)
            renderDynamicElements(attackState, event.target)
        })
    })
}