import { Game } from './logic/game'
import { addEventListenerDraggable, addEventListenersBoardClick, addEventListenersBoardDrag} from './logic/handleEventListeners'


const executeGame = () =>{
    const game = Game()
    addEventListenersBoardClick(game)
    addEventListenerDraggable()
    addEventListenersBoardDrag()
}

executeGame()

export {executeGame}