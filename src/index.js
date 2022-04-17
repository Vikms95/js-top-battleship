import { Game,checkForGamePrepared} from './logic/game'
import {addEventListenersBoardClick} from './logic/handleEventListeners'

const prepareGame = (game) =>{
    game.addEventListenersDragShips(game)
}

const game = Game()
prepareGame(game)

