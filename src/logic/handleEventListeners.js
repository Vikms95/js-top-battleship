import { 
    
    renderTurn,
    renderDragEnter,
    renderDragStart,
    renderDragOver,
    renderDragLeave,
    handleDropEvent

} from '../view/renderDynamicElements'

export function addEventListenersBoardClick (game){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square =>{
        square.addEventListener('click', event =>{
            processTurnData(game,event)
        })
    })
}

const processTurnData = (game,event) =>{
    const turnData = game.gameTurn(event.target.id)
    console.log(turnData)
    if(turnData === null) return      
    renderTurn(turnData,event)
}

export const addEventListenersDragShips = (game) =>{
    addEventListenerDraggable()
    addEventListenersBoardDrag(game)
}


export function addEventListenersBoardDrag (game){
    const gridSquaresPlayer = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    gridSquaresPlayer.forEach(square =>{
        square.addEventListener('dragenter',renderDragEnter)
        square.addEventListener('dragover',renderDragOver)
        square.addEventListener('dragleave',renderDragLeave)
        square.addEventListener('drop',(event) =>{
            handleDropEvent(event,game)
        })
    })
}

export function addEventListenerDraggable(){
    const ships = Array.from(document.querySelectorAll('.pool-ship.player1'))
    ships.forEach(ship=>
        ship.addEventListener('dragstart',renderDragStart))
}

export function removeEventListeners (){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square =>{
        square.removeEventListener('click', processTurnData)
    })
}

export function addEventListenerToggleDirection (game){
    const toggleButton = document.querySelector('.toggle')
    toggleButton.addEventListener('click', ()=>{
        (game.getDirection() === 'Vertical') 
            ? game.setDirection('Horizontal',toggleButton) 
            : game.setDirection('Vertical',toggleButton)
    })
}


