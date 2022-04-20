import { Game,checkForGamePrepared} from './logic/game'
import {addEventListenersBoardClick,addEventListenerToggleDirection,addEventListenersDragShips} from './logic/handleEventListeners'

const prepareGame = (game) =>{
    addEventListenersDragShips(game)
    addEventListenerToggleDirection(game)
}

const game = Game()
prepareGame(game)

