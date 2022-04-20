import { Game,checkForGamePrepared} from './logic/game'
import {addEventListenersBoardClick,addEventListenerToggleDirection} from './logic/handleEventListeners'

const prepareGame = (game) =>{
    game.addEventListenersDragShips(game)
    addEventListenerToggleDirection(game)
    
}

const game = Game()
prepareGame(game)

