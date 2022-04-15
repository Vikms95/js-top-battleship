import { renderTurn } from '../view/renderDynamicElements'


export function addEventListeners (game){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square =>{
        square.addEventListener('click', event =>{
            const turnData = game.gameTurn(event.target.id)
            if(turnData === null) return      
            renderTurn(turnData,event)
        })
    })
}