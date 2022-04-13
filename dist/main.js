/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/logic/addEventListeners.js":
/*!****************************************!*\
  !*** ./src/logic/addEventListeners.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEventListeners": () => (/* binding */ addEventListeners)
/* harmony export */ });
/* harmony import */ var _view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/renderDynamicElements */ "./src/view/renderDynamicElements.js");



function addEventListeners (game){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square=>{
        square.addEventListener('click',(event) =>{
            const playerCoords = event.target.id
            const turnData = game.gameTurn(playerCoords)
            if(turnData === null) return null
            ;(0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderDynamicElements)(turnData.isPlayerAttackMiss, event.target)
            const attackedElement = findHitElement(turnData.computerCoords)
            ;(0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderDynamicElements)(turnData.isComputerAttackMiss,attackedElement)
        })
    })
}

const findHitElement = (coords) =>{
    return  document.querySelector(`.player1 > #${coords}`)
}

/***/ }),

/***/ "./src/logic/game.js":
/*!***************************!*\
  !*** ./src/logic/game.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _view_renderStaticElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/renderStaticElements */ "./src/view/renderStaticElements.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/logic/player.js");



function Game (){

    const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('Victor')
    player1.createGameBoard(
        ['H8'],
        ['C5','H6'],
        ['B7','D1','H1'],
        ['C6','A5','D8','D2'],
        ['E1','E2','E3','E4','A5']
    )
    const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('Computer')
    player2.createGameBoard(
        ['G8'],
        ['B1','B2'],
        ['C1','C2','C3'],
        ['D1','D2','D3','D4'],
        ['E1','E2','E3','E4','E5']
    )

    let gameboard1     = player1.getGameboard()
    let gameboard2     = player2.getGameboard()
    let playerInTurn   = player1
    let enemyGameboard = gameboard2

    ;(0,_view_renderStaticElements__WEBPACK_IMPORTED_MODULE_0__.renderStaticElements)(gameboard1)

    const gameTurn = (coords) =>{
        const playerCoords = playerInTurn.sendAttackCoordsToGame(coords)
        if(playerCoords === null) return null
  
        const isPlayerAttackMiss   = enemyGameboard.receiveAttackFromPlayer(playerCoords)
        console.log('attack from' + playerInTurn.getName())
        
        playerInTurn               = switchPlayers()
        enemyGameboard             = switchGameboards()
        
        const computerCoords       = playerInTurn.sendRandomAttackCoordsToGame(enemyGameboard)
        let isComputerAttackMiss  = enemyGameboard.receiveAttackFromPlayer(computerCoords)
        console.log('attack from' + playerInTurn.getName())

        playerInTurn               = switchPlayers()
        enemyGameboard             = switchGameboards()

        if(player1.isPlayerDefeated() || player2.isPlayerDefeated()){
            console.log('Done!')
        }
        return {isPlayerAttackMiss,isComputerAttackMiss,computerCoords}
    }

    const switchPlayers = () =>{
        return playerInTurn === player2 ? player1 : player2
    }

    const switchGameboards = () =>{
        return playerInTurn === player2 ? gameboard1 : gameboard2
    }   

    return{gameTurn}
}


/***/ }),

/***/ "./src/logic/gameboard.js":
/*!********************************!*\
  !*** ./src/logic/gameboard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/logic/ship.js");

function Gameboard(){    
   
    let _boardGrid = 
    {
        'A1': false, 'A2': false, 'A3': false, 'A4': false, 'A5': false, 'A6': false, 'A7': false, 'A8': false, 
        'B1': false, 'B2': false, 'B3': false, 'B4': false, 'B5': false, 'B6': false, 'B7': false, 'B8': false, 
        'C1': false, 'C2': false, 'C3': false, 'C4': false, 'C5': false, 'C6': false, 'C7': false, 'C8': false, 
        'D1': false, 'D2': false, 'D3': false, 'D4': false, 'D5': false, 'D6': false, 'D7': false, 'D8': false, 
        'E1': false, 'E2': false, 'E3': false, 'E4': false, 'E5': false, 'E6': false, 'E7': false, 'E8': false, 
        'F1': false, 'F2': false, 'F3': false, 'F4': false, 'F5': false, 'F6': false, 'F7': false, 'F8': false, 
        'G1': false, 'G2': false, 'G3': false, 'G4': false, 'G5': false, 'G6': false, 'G7': false, 'G8': false, 
        'H1': false, 'H2': false, 'H3': false, 'H4': false, 'H5': false, 'H6': false, 'H7': false, 'H8': false 
    }

    let _boardShips = []
    
    const getBoardGrid = () =>{
        return _boardGrid
    }

    const getBoardShips = () =>{
        return _boardShips
    }
    
    const populateGameboard = (coordinates) =>{
        let index = 0
        while( index < coordinates.length ){
            createShip(...coordinates[index])
            index++
        }
    }

    // Incoming-query (assert result) X
    const createShip = (...coordinates) =>{
        if(isCoordsAvailable(coordinates)){
            const ship  = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(...coordinates) 
            _boardShips = addShipToShipsArray(ship)
            addShipToBoardGridObject(ship)
            return ship
        }
    }
    
    // Incoming-query (assert result)
    const receiveAttackFromPlayer = (coords)=>{
        if(isAttackValid(coords) && isShipHit(coords)){
            const ship = findShipByCoords(coords)
            if(ship.isSunkNextHit()){
                _boardGrid  = removeShipSquare(coords,ship)
                _boardShips = removeShipFromShipsArray(ship)
                return
            }
            _boardGrid = removeShipSquare(coords,ship)
            return
        }
        _boardGrid = removeSquareFromBoardGridObject(coords)
        return coords
    }

    const removeShipSquare = (coords,ship) =>{
        ship.removeSquareHit(coords)
        return removeSquareFromBoardGridObject(coords)
    }
 
    // Query & Command self x
    const addShipToBoardGridObject = (ship) =>{
        const coordsArray = ship.getShipCoord()
        for (let i = 0; i < coordsArray.length; i++) {
            for(const [key] of Object.entries(_boardGrid)){
                if(key === coordsArray[i]){
                    _boardGrid[key] = true
                }
            }       
        }
    }

    const addShipToShipsArray = (ship) =>{
        return [..._boardShips,ship]
    }

    const removeSquareFromBoardGridObject = (coords) =>{
        return Object.assign({..._boardGrid}, {[`${coords}`]: 'Hit'})
    }

    const removeShipFromShipsArray = (ship) =>{
        const shipIndex = findShipIndexByName(ship)
        return _boardShips.filter(arrayShip =>{
            return _boardShips.indexOf(arrayShip) !== shipIndex 
        })
    }
 
    const findShipByCoords = (coords) =>{
        // for now we pass an array with already inserted values
        return _boardShips.find(ship =>{
            return ship.getShipCoord().includes(coords)    
        })
    }

    const findShipIndexByName = (ship) =>{
        return _boardShips.findIndex(currentShip =>{
            return currentShip.getShipName() === ship.getShipName()
        })
    }

    const isShipHit = (coords) =>{
        for(const [key] of Object.entries(_boardGrid)){
            if(key === coords && _boardGrid[key]){
                return true
            }
        }
        return false
    }

    const isAllShipsSunk = () =>{
        return _boardShips.length === 0 ? true : false
    }

    const isCoordsAvailable = (coords) =>{
        let indexArray = 0
        for(const [key] of Object.entries(_boardGrid)){
            if(key === coords[indexArray]){
                return _boardGrid[key] ? false : true
            }
        } 
    }
    
    const isAttackValid = (coords) =>{
        for(const [key] of Object.entries(_boardGrid)){
            if(key === coords){
                return _boardGrid[key] === 'Hit'? false : true
            }
        }   
    }
 

    return {
        getBoardGrid,
        getBoardShips,
        createShip,
        populateGameboard,
        receiveAttackFromPlayer,
        isAllShipsSunk,
    }
}



/***/ }),

/***/ "./src/logic/player.js":
/*!*****************************!*\
  !*** ./src/logic/player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/logic/gameboard.js");


function Player(name){
    const _playerName = name

    let _gameboard

    let _attackedSquares = []
    
    const getName = () =>{
        return _playerName
    }

    const getGameboard = () =>{
        return _gameboard
    }

    const getAttackedSquares = () =>{
        return _attackedSquares
    }

    const setAttackedSquares = (coords) =>{
        _attackedSquares.push(coords)
    }

    const createPlayer = (name) =>{
        _playerName = name
    }

    const createGameBoard = (...coordinates) =>{
        _gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)()
        console.log(coordinates)
        _gameboard.populateGameboard(coordinates)
    }
    
    const sendAttackCoordsToGame = (coords) =>{
        if(getAttackedSquares().includes(coords)) return null
        setAttackedSquares(coords)
        return coords
    
    }

    const sendRandomAttackCoordsToGame = (gameboard) =>{
        // Select a random square from _boardGrid
        // and send it to the enemy gameboard.receiveAttackFromPlayer
        let boardGrid = Object.keys(gameboard.getBoardGrid())
        const BOARD_GRID_LENGTH = boardGrid.length
        let index = generateRandomNumber(0,BOARD_GRID_LENGTH)
        while(getAttackedSquares().includes(boardGrid[index])){
            index = generateRandomNumber(0,BOARD_GRID_LENGTH)
        }
        setAttackedSquares(boardGrid[index])
        return boardGrid[index]

    }

    const generateRandomNumber = (max,min) =>{
        return Math.floor(Math.random() * (max - min)) + min
    }

    const isPlayerDefeated = () =>{
        return _gameboard.getBoardShips().length === 0 ? true : false
    }

    return{
        getName,
        getGameboard,
        setAttackedSquares,
        createPlayer,
        createGameBoard,
        sendRandomAttackCoordsToGame,
        sendAttackCoordsToGame,
        isPlayerDefeated
    }
}

/***/ }),

/***/ "./src/logic/ship.js":
/*!***************************!*\
  !*** ./src/logic/ship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
function Ship(...coordinates){

    let _shipCoord = coordinates

    const _SHIP_NAMES = {
        1 : 'Spy',
        2 : 'Destroyer',
        3 : 'Cruiser',
        4 : 'Battleship',
        5 : 'Carrier'
    }

    const _shipName = _SHIP_NAMES[_shipCoord.length]
    
    const getShipName = () =>{
        return _shipName
    }

    // Outgoing query x
    const getShipCoord = () =>{
        return _shipCoord
    }


    // Incoming query (assert result > tested with removeSquareHit)
    const findHitIndex = (coords) =>{
        return _shipCoord.indexOf(coords)    
    }
    
    // Self command x
    const removeSquareHit = (coords) =>{
        const indexCoord = findHitIndex(coords)
        _shipCoord = _shipCoord.filter(coord =>{
            return _shipCoord.indexOf(coord) !== indexCoord 
        })
    }

    // Pure / Outgoing query x
    const isSunkNextHit = () =>{
        return _shipCoord.length === 1 ? true : false
    }
    
    return {
        getShipName,
        getShipCoord,
        isSunkNextHit,
        removeSquareHit
    }
}


/***/ }),

/***/ "./src/view/renderDynamicElements.js":
/*!*******************************************!*\
  !*** ./src/view/renderDynamicElements.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderDynamicElements": () => (/* binding */ renderDynamicElements)
/* harmony export */ });
function renderDynamicElements (turnData, element){
    if(turnData){
        if(element && element.classList.contains('hit')){
            return 
        }else{
            renderSquareOnMiss(element)
        }
    }
    renderSquareOnHit(element)
}

const renderSquareOnHit = (element) =>{
    element.classList.remove('ship')
    element.classList.add('hit')
}
  
const renderSquareOnMiss  = (element) =>{
    element.classList.add('miss')
  
}

const renderShipOnSink = () =>{

}

const renderMatchInfo = () =>{

}

const renderTurnInfo = () =>{
  
}

const renderWarningsInfo = () =>{

}


/***/ }),

/***/ "./src/view/renderStaticElements.js":
/*!******************************************!*\
  !*** ./src/view/renderStaticElements.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderStaticElements": () => (/* binding */ renderStaticElements)
/* harmony export */ });
function renderStaticElements(gameboard){
    renderShips(gameboard)
}

const renderShips = (gameboard) =>{
    let index = 0
    let boardGrid = gameboard.getBoardGrid()
    let gridNodeList = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    for(const [key] of Object.entries(boardGrid)){
        if(boardGrid[key]){
            gridNodeList[index].classList.add('ship')
        }
        index++
    }
}

const renderPlayerNames = (player) =>{
    
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic/game */ "./src/logic/game.js");
/* harmony import */ var _logic_addEventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/addEventListeners */ "./src/logic/addEventListeners.js");


const game = (0,_logic_game__WEBPACK_IMPORTED_MODULE_0__.Game)()
console.log('hi')
;(0,_logic_addEventListeners__WEBPACK_IMPORTED_MODULE_1__.addEventListeners)(game)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBbUU7QUFDbkU7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtRkFBcUI7QUFDakM7QUFDQSxZQUFZLG1GQUFxQjtBQUNqQyxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxPQUFPO0FBQ3pEOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkJtRTtBQUNsQztBQUNqQztBQUNPO0FBQ1A7QUFDQSxvQkFBb0IsK0NBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0NBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlGQUFvQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RDZCO0FBQ3RCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMkNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjLEdBQUcsSUFBSSxPQUFPLFVBQVU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEp1QztBQUN2QztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFEQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDMUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hETztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTm1DO0FBQzBCO0FBQzdELGFBQWEsaURBQUk7QUFDakI7QUFDQSw0RUFBaUIsTSIsInNvdXJjZXMiOlsid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2FkZEV2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWUuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3BsYXllci5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9zaGlwLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3JlbmRlckR5bmFtaWNFbGVtZW50c30gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzIChnYW1lKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzQ29tcHV0ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc0NvbXB1dGVyLmZvckVhY2goc3F1YXJlPT57XHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZXZlbnQpID0+e1xyXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJDb29yZHMgPSBldmVudC50YXJnZXQuaWRcclxuICAgICAgICAgICAgY29uc3QgdHVybkRhdGEgPSBnYW1lLmdhbWVUdXJuKHBsYXllckNvb3JkcylcclxuICAgICAgICAgICAgaWYodHVybkRhdGEgPT09IG51bGwpIHJldHVybiBudWxsXHJcbiAgICAgICAgICAgIHJlbmRlckR5bmFtaWNFbGVtZW50cyh0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3MsIGV2ZW50LnRhcmdldClcclxuICAgICAgICAgICAgY29uc3QgYXR0YWNrZWRFbGVtZW50ID0gZmluZEhpdEVsZW1lbnQodHVybkRhdGEuY29tcHV0ZXJDb29yZHMpXHJcbiAgICAgICAgICAgIHJlbmRlckR5bmFtaWNFbGVtZW50cyh0dXJuRGF0YS5pc0NvbXB1dGVyQXR0YWNrTWlzcyxhdHRhY2tlZEVsZW1lbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IGZpbmRIaXRFbGVtZW50ID0gKGNvb3JkcykgPT57XHJcbiAgICByZXR1cm4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIxID4gIyR7Y29vcmRzfWApXHJcbn0iLCJpbXBvcnQgeyByZW5kZXJTdGF0aWNFbGVtZW50cyB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMnXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCl7XHJcblxyXG4gICAgY29uc3QgcGxheWVyMSA9IFBsYXllcignVmljdG9yJylcclxuICAgIHBsYXllcjEuY3JlYXRlR2FtZUJvYXJkKFxyXG4gICAgICAgIFsnSDgnXSxcclxuICAgICAgICBbJ0M1JywnSDYnXSxcclxuICAgICAgICBbJ0I3JywnRDEnLCdIMSddLFxyXG4gICAgICAgIFsnQzYnLCdBNScsJ0Q4JywnRDInXSxcclxuICAgICAgICBbJ0UxJywnRTInLCdFMycsJ0U0JywnQTUnXVxyXG4gICAgKVxyXG4gICAgY29uc3QgcGxheWVyMiA9IFBsYXllcignQ29tcHV0ZXInKVxyXG4gICAgcGxheWVyMi5jcmVhdGVHYW1lQm9hcmQoXHJcbiAgICAgICAgWydHOCddLFxyXG4gICAgICAgIFsnQjEnLCdCMiddLFxyXG4gICAgICAgIFsnQzEnLCdDMicsJ0MzJ10sXHJcbiAgICAgICAgWydEMScsJ0QyJywnRDMnLCdENCddLFxyXG4gICAgICAgIFsnRTEnLCdFMicsJ0UzJywnRTQnLCdFNSddXHJcbiAgICApXHJcblxyXG4gICAgbGV0IGdhbWVib2FyZDEgICAgID0gcGxheWVyMS5nZXRHYW1lYm9hcmQoKVxyXG4gICAgbGV0IGdhbWVib2FyZDIgICAgID0gcGxheWVyMi5nZXRHYW1lYm9hcmQoKVxyXG4gICAgbGV0IHBsYXllckluVHVybiAgID0gcGxheWVyMVxyXG4gICAgbGV0IGVuZW15R2FtZWJvYXJkID0gZ2FtZWJvYXJkMlxyXG5cclxuICAgIHJlbmRlclN0YXRpY0VsZW1lbnRzKGdhbWVib2FyZDEpXHJcblxyXG4gICAgY29uc3QgZ2FtZVR1cm4gPSAoY29vcmRzKSA9PntcclxuICAgICAgICBjb25zdCBwbGF5ZXJDb29yZHMgPSBwbGF5ZXJJblR1cm4uc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZShjb29yZHMpXHJcbiAgICAgICAgaWYocGxheWVyQ29vcmRzID09PSBudWxsKSByZXR1cm4gbnVsbFxyXG4gIFxyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyQXR0YWNrTWlzcyAgID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIocGxheWVyQ29vcmRzKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhdHRhY2sgZnJvbScgKyBwbGF5ZXJJblR1cm4uZ2V0TmFtZSgpKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHBsYXllckluVHVybiAgICAgICAgICAgICAgID0gc3dpdGNoUGxheWVycygpXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgICAgICAgICAgICAgPSBzd2l0Y2hHYW1lYm9hcmRzKClcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgICAgICA9IHBsYXllckluVHVybi5zZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lKGVuZW15R2FtZWJvYXJkKVxyXG4gICAgICAgIGxldCBpc0NvbXB1dGVyQXR0YWNrTWlzcyAgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihjb21wdXRlckNvb3JkcylcclxuICAgICAgICBjb25zb2xlLmxvZygnYXR0YWNrIGZyb20nICsgcGxheWVySW5UdXJuLmdldE5hbWUoKSlcclxuXHJcbiAgICAgICAgcGxheWVySW5UdXJuICAgICAgICAgICAgICAgPSBzd2l0Y2hQbGF5ZXJzKClcclxuICAgICAgICBlbmVteUdhbWVib2FyZCAgICAgICAgICAgICA9IHN3aXRjaEdhbWVib2FyZHMoKVxyXG5cclxuICAgICAgICBpZihwbGF5ZXIxLmlzUGxheWVyRGVmZWF0ZWQoKSB8fCBwbGF5ZXIyLmlzUGxheWVyRGVmZWF0ZWQoKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdEb25lIScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7aXNQbGF5ZXJBdHRhY2tNaXNzLGlzQ29tcHV0ZXJBdHRhY2tNaXNzLGNvbXB1dGVyQ29vcmRzfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaFBsYXllcnMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVySW5UdXJuID09PSBwbGF5ZXIyID8gcGxheWVyMSA6IHBsYXllcjJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hHYW1lYm9hcmRzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluVHVybiA9PT0gcGxheWVyMiA/IGdhbWVib2FyZDEgOiBnYW1lYm9hcmQyXHJcbiAgICB9ICAgXHJcblxyXG4gICAgcmV0dXJue2dhbWVUdXJufVxyXG59XHJcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lYm9hcmQoKXsgICAgXHJcbiAgIFxyXG4gICAgbGV0IF9ib2FyZEdyaWQgPSBcclxuICAgIHtcclxuICAgICAgICAnQTEnOiBmYWxzZSwgJ0EyJzogZmFsc2UsICdBMyc6IGZhbHNlLCAnQTQnOiBmYWxzZSwgJ0E1JzogZmFsc2UsICdBNic6IGZhbHNlLCAnQTcnOiBmYWxzZSwgJ0E4JzogZmFsc2UsIFxyXG4gICAgICAgICdCMSc6IGZhbHNlLCAnQjInOiBmYWxzZSwgJ0IzJzogZmFsc2UsICdCNCc6IGZhbHNlLCAnQjUnOiBmYWxzZSwgJ0I2JzogZmFsc2UsICdCNyc6IGZhbHNlLCAnQjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0MxJzogZmFsc2UsICdDMic6IGZhbHNlLCAnQzMnOiBmYWxzZSwgJ0M0JzogZmFsc2UsICdDNSc6IGZhbHNlLCAnQzYnOiBmYWxzZSwgJ0M3JzogZmFsc2UsICdDOCc6IGZhbHNlLCBcclxuICAgICAgICAnRDEnOiBmYWxzZSwgJ0QyJzogZmFsc2UsICdEMyc6IGZhbHNlLCAnRDQnOiBmYWxzZSwgJ0Q1JzogZmFsc2UsICdENic6IGZhbHNlLCAnRDcnOiBmYWxzZSwgJ0Q4JzogZmFsc2UsIFxyXG4gICAgICAgICdFMSc6IGZhbHNlLCAnRTInOiBmYWxzZSwgJ0UzJzogZmFsc2UsICdFNCc6IGZhbHNlLCAnRTUnOiBmYWxzZSwgJ0U2JzogZmFsc2UsICdFNyc6IGZhbHNlLCAnRTgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0YxJzogZmFsc2UsICdGMic6IGZhbHNlLCAnRjMnOiBmYWxzZSwgJ0Y0JzogZmFsc2UsICdGNSc6IGZhbHNlLCAnRjYnOiBmYWxzZSwgJ0Y3JzogZmFsc2UsICdGOCc6IGZhbHNlLCBcclxuICAgICAgICAnRzEnOiBmYWxzZSwgJ0cyJzogZmFsc2UsICdHMyc6IGZhbHNlLCAnRzQnOiBmYWxzZSwgJ0c1JzogZmFsc2UsICdHNic6IGZhbHNlLCAnRzcnOiBmYWxzZSwgJ0c4JzogZmFsc2UsIFxyXG4gICAgICAgICdIMSc6IGZhbHNlLCAnSDInOiBmYWxzZSwgJ0gzJzogZmFsc2UsICdINCc6IGZhbHNlLCAnSDUnOiBmYWxzZSwgJ0g2JzogZmFsc2UsICdINyc6IGZhbHNlLCAnSDgnOiBmYWxzZSBcclxuICAgIH1cclxuXHJcbiAgICBsZXQgX2JvYXJkU2hpcHMgPSBbXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRCb2FyZEdyaWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkR3JpZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEJvYXJkU2hpcHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHNcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgcG9wdWxhdGVHYW1lYm9hcmQgPSAoY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICB3aGlsZSggaW5kZXggPCBjb29yZGluYXRlcy5sZW5ndGggKXtcclxuICAgICAgICAgICAgY3JlYXRlU2hpcCguLi5jb29yZGluYXRlc1tpbmRleF0pXHJcbiAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5jb21pbmctcXVlcnkgKGFzc2VydCByZXN1bHQpIFhcclxuICAgIGNvbnN0IGNyZWF0ZVNoaXAgPSAoLi4uY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGlmKGlzQ29vcmRzQXZhaWxhYmxlKGNvb3JkaW5hdGVzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgID0gU2hpcCguLi5jb29yZGluYXRlcykgXHJcbiAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gYWRkU2hpcFRvU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3Qoc2hpcClcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KVxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIgPSAoY29vcmRzKT0+e1xyXG4gICAgICAgIGlmKGlzQXR0YWNrVmFsaWQoY29vcmRzKSAmJiBpc1NoaXBIaXQoY29vcmRzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBmaW5kU2hpcEJ5Q29vcmRzKGNvb3JkcylcclxuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmtOZXh0SGl0KCkpe1xyXG4gICAgICAgICAgICAgICAgX2JvYXJkR3JpZCAgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICAgICAgX2JvYXJkU2hpcHMgPSByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwU3F1YXJlID0gKGNvb3JkcyxzaGlwKSA9PntcclxuICAgICAgICBzaGlwLnJlbW92ZVNxdWFyZUhpdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBRdWVyeSAmIENvbW1hbmQgc2VsZiB4XHJcbiAgICBjb25zdCBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3QgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3QgY29vcmRzQXJyYXkgPSBzaGlwLmdldFNoaXBDb29yZCgpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHNBcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHNBcnJheVtpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgX2JvYXJkR3JpZFtrZXldID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRTaGlwVG9TaGlwc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIHJldHVybiBbLi4uX2JvYXJkU2hpcHMsc2hpcF1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oey4uLl9ib2FyZEdyaWR9LCB7W2Ake2Nvb3Jkc31gXTogJ0hpdCd9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBmaW5kU2hpcEluZGV4QnlOYW1lKHNoaXApXHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbHRlcihhcnJheVNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5pbmRleE9mKGFycmF5U2hpcCkgIT09IHNoaXBJbmRleCBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gXHJcbiAgICBjb25zdCBmaW5kU2hpcEJ5Q29vcmRzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgLy8gZm9yIG5vdyB3ZSBwYXNzIGFuIGFycmF5IHdpdGggYWxyZWFkeSBpbnNlcnRlZCB2YWx1ZXNcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZChzaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gc2hpcC5nZXRTaGlwQ29vcmQoKS5pbmNsdWRlcyhjb29yZHMpICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmluZFNoaXBJbmRleEJ5TmFtZSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZEluZGV4KGN1cnJlbnRTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFNoaXAuZ2V0U2hpcE5hbWUoKSA9PT0gc2hpcC5nZXRTaGlwTmFtZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc1NoaXBIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3JkcyAmJiBfYm9hcmRHcmlkW2tleV0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0FsbFNoaXBzU3VuayA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5sZW5ndGggPT09IDAgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0Nvb3Jkc0F2YWlsYWJsZSA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGxldCBpbmRleEFycmF5ID0gMFxyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzW2luZGV4QXJyYXldKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfYm9hcmRHcmlkW2tleV0gPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGlzQXR0YWNrVmFsaWQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkcyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2JvYXJkR3JpZFtrZXldID09PSAnSGl0Jz8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbiBcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEJvYXJkR3JpZCxcclxuICAgICAgICBnZXRCb2FyZFNoaXBzLFxyXG4gICAgICAgIGNyZWF0ZVNoaXAsXHJcbiAgICAgICAgcG9wdWxhdGVHYW1lYm9hcmQsXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIsXHJcbiAgICAgICAgaXNBbGxTaGlwc1N1bmssXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBsYXllcihuYW1lKXtcclxuICAgIGNvbnN0IF9wbGF5ZXJOYW1lID0gbmFtZVxyXG5cclxuICAgIGxldCBfZ2FtZWJvYXJkXHJcblxyXG4gICAgbGV0IF9hdHRhY2tlZFNxdWFyZXMgPSBbXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9wbGF5ZXJOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9nYW1lYm9hcmRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRBdHRhY2tlZFNxdWFyZXMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2F0dGFja2VkU3F1YXJlc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNldEF0dGFja2VkU3F1YXJlcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIF9hdHRhY2tlZFNxdWFyZXMucHVzaChjb29yZHMpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3JlYXRlUGxheWVyID0gKG5hbWUpID0+e1xyXG4gICAgICAgIF9wbGF5ZXJOYW1lID0gbmFtZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUdhbWVCb2FyZCA9ICguLi5jb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgX2dhbWVib2FyZCA9IEdhbWVib2FyZCgpXHJcbiAgICAgICAgY29uc29sZS5sb2coY29vcmRpbmF0ZXMpXHJcbiAgICAgICAgX2dhbWVib2FyZC5wb3B1bGF0ZUdhbWVib2FyZChjb29yZGluYXRlcylcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3Qgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGlmKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGNvb3JkcykpIHJldHVybiBudWxsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICAgICAgLy8gU2VsZWN0IGEgcmFuZG9tIHNxdWFyZSBmcm9tIF9ib2FyZEdyaWRcclxuICAgICAgICAvLyBhbmQgc2VuZCBpdCB0byB0aGUgZW5lbXkgZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2tGcm9tUGxheWVyXHJcbiAgICAgICAgbGV0IGJvYXJkR3JpZCA9IE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCA9IGJvYXJkR3JpZC5sZW5ndGhcclxuICAgICAgICBsZXQgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIHdoaWxlKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGJvYXJkR3JpZFtpbmRleF0pKXtcclxuICAgICAgICAgICAgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMoYm9hcmRHcmlkW2luZGV4XSlcclxuICAgICAgICByZXR1cm4gYm9hcmRHcmlkW2luZGV4XVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbU51bWJlciA9IChtYXgsbWluKSA9PntcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNQbGF5ZXJEZWZlYXRlZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfZ2FtZWJvYXJkLmdldEJvYXJkU2hpcHMoKS5sZW5ndGggPT09IDAgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBnZXRHYW1lYm9hcmQsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzLFxyXG4gICAgICAgIGNyZWF0ZVBsYXllcixcclxuICAgICAgICBjcmVhdGVHYW1lQm9hcmQsXHJcbiAgICAgICAgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBzZW5kQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIGlzUGxheWVyRGVmZWF0ZWRcclxuICAgIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBTaGlwKC4uLmNvb3JkaW5hdGVzKXtcclxuXHJcbiAgICBsZXQgX3NoaXBDb29yZCA9IGNvb3JkaW5hdGVzXHJcblxyXG4gICAgY29uc3QgX1NISVBfTkFNRVMgPSB7XHJcbiAgICAgICAgMSA6ICdTcHknLFxyXG4gICAgICAgIDIgOiAnRGVzdHJveWVyJyxcclxuICAgICAgICAzIDogJ0NydWlzZXInLFxyXG4gICAgICAgIDQgOiAnQmF0dGxlc2hpcCcsXHJcbiAgICAgICAgNSA6ICdDYXJyaWVyJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IF9zaGlwTmFtZSA9IF9TSElQX05BTUVTW19zaGlwQ29vcmQubGVuZ3RoXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRTaGlwTmFtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcE5hbWVcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBnZXRTaGlwQ29vcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBJbmNvbWluZyBxdWVyeSAoYXNzZXJ0IHJlc3VsdCA+IHRlc3RlZCB3aXRoIHJlbW92ZVNxdWFyZUhpdClcclxuICAgIGNvbnN0IGZpbmRIaXRJbmRleCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmRzKSAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gU2VsZiBjb21tYW5kIHhcclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGNvbnN0IGluZGV4Q29vcmQgPSBmaW5kSGl0SW5kZXgoY29vcmRzKVxyXG4gICAgICAgIF9zaGlwQ29vcmQgPSBfc2hpcENvb3JkLmZpbHRlcihjb29yZCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZCkgIT09IGluZGV4Q29vcmQgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBQdXJlIC8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgaXNTdW5rTmV4dEhpdCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmxlbmd0aCA9PT0gMSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFNoaXBOYW1lLFxyXG4gICAgICAgIGdldFNoaXBDb29yZCxcclxuICAgICAgICBpc1N1bmtOZXh0SGl0LFxyXG4gICAgICAgIHJlbW92ZVNxdWFyZUhpdFxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJEeW5hbWljRWxlbWVudHMgKHR1cm5EYXRhLCBlbGVtZW50KXtcclxuICAgIGlmKHR1cm5EYXRhKXtcclxuICAgICAgICBpZihlbGVtZW50ICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmVuZGVyU3F1YXJlT25NaXNzKGVsZW1lbnQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyU3F1YXJlT25IaXQoZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3F1YXJlT25IaXQgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uTWlzcyAgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG4gIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwT25TaW5rID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5jb25zdCByZW5kZXJNYXRjaEluZm8gPSAoKSA9PntcclxuXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclR1cm5JbmZvID0gKCkgPT57XHJcbiAgXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlcldhcm5pbmdzSW5mbyA9ICgpID0+e1xyXG5cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RhdGljRWxlbWVudHMoZ2FtZWJvYXJkKXtcclxuICAgIHJlbmRlclNoaXBzKGdhbWVib2FyZClcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcHMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBpbmRleCA9IDBcclxuICAgIGxldCBib2FyZEdyaWQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmRHcmlkKClcclxuICAgIGxldCBncmlkTm9kZUxpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgaWYoYm9hcmRHcmlkW2tleV0pe1xyXG4gICAgICAgICAgICBncmlkTm9kZUxpc3RbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleCsrXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclBsYXllck5hbWVzID0gKHBsYXllcikgPT57XHJcbiAgICBcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2xvZ2ljL2dhbWUnXHJcbmltcG9ydCB7IGFkZEV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9sb2dpYy9hZGRFdmVudExpc3RlbmVycydcclxuY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG5jb25zb2xlLmxvZygnaGknKVxyXG5hZGRFdmVudExpc3RlbmVycyhnYW1lKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==