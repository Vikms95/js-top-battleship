import { Game } from './logic/game'
import { addEventListeners} from './logic/handleEventListeners'


const executeGame = () =>{
    const game = Game()
    addEventListeners(game)
}

executeGame()

export {executeGame}