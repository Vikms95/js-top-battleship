import { Game } from './logic/game'
import {addEventListenersBoardClick} from './logic/handleEventListeners'


const executeGame = () =>{
    const game = Game()
    game.prepareShips()
    addEventListenersBoardClick(game)
}

executeGame()

export {executeGame}