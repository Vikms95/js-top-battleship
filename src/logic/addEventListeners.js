// Add event listeners to
import { Game } from './game'

//  - grid squares
export function addEventListeners (game){
    const gridSquaresNodeList = document.getElementsByClassName('grid-square')
    Array.from(gridSquaresNodeList).forEach(square=>{
        square.addEventListener('click',(event) =>{
            game.gameTurn(event.target.id)
        })
    })
}