import { Game } from './logic/game'
import { addEventListenerDraggable, addEventListenersBoardClick, addEventListenersBoardDragOver} from './logic/handleEventListeners'


const executeGame = () =>{
    const game = Game()
    addEventListenersBoardClick(game)
    addEventListenerDraggable()
    addEventListenersBoardDragOver()
}

executeGame()

export {executeGame}