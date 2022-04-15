import { Game } from './logic/game'
import { addEventListeners } from './logic/addEventListeners'


const executeGame = () =>{
    const game = Game()
    addEventListeners(game)
}

executeGame()

export {executeGame}