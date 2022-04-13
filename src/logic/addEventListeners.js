import {renderDynamicElements} from '../view/renderDynamicElements'


export function addEventListeners (game){
    const gridSquaresArray = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresArray.forEach(square=>{
        square.addEventListener('click',(event) =>{
            const coords = event.target.id
            const attackState = game.gameTurn(coords)
            renderDynamicElements(attackState, event.target)
        })
    })
}