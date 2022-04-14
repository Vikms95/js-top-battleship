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
            const turnData = game.gameTurn(event.target.id)
            if(turnData === null) return null

            const {dataPlayer,dataComputer,attackedElement} = retrieveTurnData(turnData)
            console.log(dataPlayer)
            ;(0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderDynamicElements)(dataPlayer, event.target)
            ;(0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderDynamicElements)(dataComputer, attackedElement)
        })
    })
}

const findHitElement = (coords) =>{
    return document.querySelector(`.player1 > #${coords}`)
}

const retrieveTurnData = (turnData) =>{
    const dataPlayer = turnData.isPlayerAttackMiss
    const dataComputer = turnData.isComputerAttackMiss
    const computerCoords = turnData.computerCoords
    const attackedElement = findHitElement(computerCoords)

    return {dataPlayer,dataComputer,attackedElement}
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
        
        playerInTurn               = switchPlayers()
        enemyGameboard             = switchGameboards()
        
        const computerCoords       = playerInTurn.sendRandomAttackCoordsToGame(enemyGameboard)
        const isComputerAttackMiss = enemyGameboard.receiveAttackFromPlayer(computerCoords)

        playerInTurn               = switchPlayers()
        enemyGameboard             = switchGameboards()

        if(player1.isPlayerDefeated() || player2.isPlayerDefeated()){
            console.log('Done!')
        }
        return {
            isPlayerAttackMiss,
            isComputerAttackMiss,
            computerCoords
        }
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
        const boardGrid = Object.keys(gameboard.getBoardGrid())
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBbUU7QUFDbkU7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlDQUF5QztBQUM1RDtBQUNBLFlBQVksbUZBQXFCO0FBQ2pDLFlBQVksbUZBQXFCO0FBQ2pDLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7Ozs7Ozs7Ozs7Ozs7OztBQzdCbUU7QUFDbEM7QUFDakM7QUFDTztBQUNQO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpRkFBb0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRDZCO0FBQ3RCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMkNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjLEdBQUcsSUFBSSxPQUFPLFVBQVU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEp1QztBQUN2QztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFEQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN4RU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaERPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNuQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNsQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNObUM7QUFDMEI7QUFDN0QsYUFBYSxpREFBSTtBQUNqQjtBQUNBLDRFQUFpQixNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvYWRkRXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvcGxheWVyLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3NoaXAuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy9yZW5kZXJTdGF0aWNFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cmVuZGVyRHluYW1pY0VsZW1lbnRzfSBmcm9tICcuLi92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cydcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmU9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChldmVudCkgPT57XHJcbiAgICAgICAgICAgIGNvbnN0IHR1cm5EYXRhID0gZ2FtZS5nYW1lVHVybihldmVudC50YXJnZXQuaWQpXHJcbiAgICAgICAgICAgIGlmKHR1cm5EYXRhID09PSBudWxsKSByZXR1cm4gbnVsbFxyXG5cclxuICAgICAgICAgICAgY29uc3Qge2RhdGFQbGF5ZXIsZGF0YUNvbXB1dGVyLGF0dGFja2VkRWxlbWVudH0gPSByZXRyaWV2ZVR1cm5EYXRhKHR1cm5EYXRhKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhUGxheWVyKVxyXG4gICAgICAgICAgICByZW5kZXJEeW5hbWljRWxlbWVudHMoZGF0YVBsYXllciwgZXZlbnQudGFyZ2V0KVxyXG4gICAgICAgICAgICByZW5kZXJEeW5hbWljRWxlbWVudHMoZGF0YUNvbXB1dGVyLCBhdHRhY2tlZEVsZW1lbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IGZpbmRIaXRFbGVtZW50ID0gKGNvb3JkcykgPT57XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllcjEgPiAjJHtjb29yZHN9YClcclxufVxyXG5cclxuY29uc3QgcmV0cmlldmVUdXJuRGF0YSA9ICh0dXJuRGF0YSkgPT57XHJcbiAgICBjb25zdCBkYXRhUGxheWVyID0gdHVybkRhdGEuaXNQbGF5ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBkYXRhQ29tcHV0ZXIgPSB0dXJuRGF0YS5pc0NvbXB1dGVyQXR0YWNrTWlzc1xyXG4gICAgY29uc3QgY29tcHV0ZXJDb29yZHMgPSB0dXJuRGF0YS5jb21wdXRlckNvb3Jkc1xyXG4gICAgY29uc3QgYXR0YWNrZWRFbGVtZW50ID0gZmluZEhpdEVsZW1lbnQoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgcmV0dXJuIHtkYXRhUGxheWVyLGRhdGFDb21wdXRlcixhdHRhY2tlZEVsZW1lbnR9XHJcbn0iLCJpbXBvcnQgeyByZW5kZXJTdGF0aWNFbGVtZW50cyB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMnXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCl7XHJcblxyXG4gICAgY29uc3QgcGxheWVyMSA9IFBsYXllcignVmljdG9yJylcclxuICAgIHBsYXllcjEuY3JlYXRlR2FtZUJvYXJkKFxyXG4gICAgICAgIFsnSDgnXSxcclxuICAgICAgICBbJ0M1JywnSDYnXSxcclxuICAgICAgICBbJ0I3JywnRDEnLCdIMSddLFxyXG4gICAgICAgIFsnQzYnLCdBNScsJ0Q4JywnRDInXSxcclxuICAgICAgICBbJ0UxJywnRTInLCdFMycsJ0U0JywnQTUnXVxyXG4gICAgKVxyXG4gICAgY29uc3QgcGxheWVyMiA9IFBsYXllcignQ29tcHV0ZXInKVxyXG4gICAgcGxheWVyMi5jcmVhdGVHYW1lQm9hcmQoXHJcbiAgICAgICAgWydHOCddLFxyXG4gICAgICAgIFsnQjEnLCdCMiddLFxyXG4gICAgICAgIFsnQzEnLCdDMicsJ0MzJ10sXHJcbiAgICAgICAgWydEMScsJ0QyJywnRDMnLCdENCddLFxyXG4gICAgICAgIFsnRTEnLCdFMicsJ0UzJywnRTQnLCdFNSddXHJcbiAgICApXHJcblxyXG4gICAgbGV0IGdhbWVib2FyZDEgICAgID0gcGxheWVyMS5nZXRHYW1lYm9hcmQoKVxyXG4gICAgbGV0IGdhbWVib2FyZDIgICAgID0gcGxheWVyMi5nZXRHYW1lYm9hcmQoKVxyXG4gICAgbGV0IHBsYXllckluVHVybiAgID0gcGxheWVyMVxyXG4gICAgbGV0IGVuZW15R2FtZWJvYXJkID0gZ2FtZWJvYXJkMlxyXG5cclxuICAgIHJlbmRlclN0YXRpY0VsZW1lbnRzKGdhbWVib2FyZDEpXHJcblxyXG4gICAgY29uc3QgZ2FtZVR1cm4gPSAoY29vcmRzKSA9PntcclxuICAgICAgICBjb25zdCBwbGF5ZXJDb29yZHMgPSBwbGF5ZXJJblR1cm4uc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZShjb29yZHMpXHJcbiAgICAgICAgaWYocGxheWVyQ29vcmRzID09PSBudWxsKSByZXR1cm4gbnVsbFxyXG4gIFxyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyQXR0YWNrTWlzcyAgID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIocGxheWVyQ29vcmRzKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHBsYXllckluVHVybiAgICAgICAgICAgICAgID0gc3dpdGNoUGxheWVycygpXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgICAgICAgICAgICAgPSBzd2l0Y2hHYW1lYm9hcmRzKClcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgICAgICA9IHBsYXllckluVHVybi5zZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lKGVuZW15R2FtZWJvYXJkKVxyXG4gICAgICAgIGNvbnN0IGlzQ29tcHV0ZXJBdHRhY2tNaXNzID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgICAgIHBsYXllckluVHVybiAgICAgICAgICAgICAgID0gc3dpdGNoUGxheWVycygpXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgICAgICAgICAgICAgPSBzd2l0Y2hHYW1lYm9hcmRzKClcclxuXHJcbiAgICAgICAgaWYocGxheWVyMS5pc1BsYXllckRlZmVhdGVkKCkgfHwgcGxheWVyMi5pc1BsYXllckRlZmVhdGVkKCkpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRG9uZSEnKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc1BsYXllckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGlzQ29tcHV0ZXJBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBjb21wdXRlckNvb3Jkc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hQbGF5ZXJzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluVHVybiA9PT0gcGxheWVyMiA/IHBsYXllcjEgOiBwbGF5ZXIyXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoR2FtZWJvYXJkcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIgPyBnYW1lYm9hcmQxIDogZ2FtZWJvYXJkMlxyXG4gICAgfSAgIFxyXG5cclxuICAgIHJldHVybntnYW1lVHVybn1cclxufVxyXG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xyXG5leHBvcnQgZnVuY3Rpb24gR2FtZWJvYXJkKCl7ICAgIFxyXG4gICBcclxuICAgIGxldCBfYm9hcmRHcmlkID0gXHJcbiAgICB7XHJcbiAgICAgICAgJ0ExJzogZmFsc2UsICdBMic6IGZhbHNlLCAnQTMnOiBmYWxzZSwgJ0E0JzogZmFsc2UsICdBNSc6IGZhbHNlLCAnQTYnOiBmYWxzZSwgJ0E3JzogZmFsc2UsICdBOCc6IGZhbHNlLCBcclxuICAgICAgICAnQjEnOiBmYWxzZSwgJ0IyJzogZmFsc2UsICdCMyc6IGZhbHNlLCAnQjQnOiBmYWxzZSwgJ0I1JzogZmFsc2UsICdCNic6IGZhbHNlLCAnQjcnOiBmYWxzZSwgJ0I4JzogZmFsc2UsIFxyXG4gICAgICAgICdDMSc6IGZhbHNlLCAnQzInOiBmYWxzZSwgJ0MzJzogZmFsc2UsICdDNCc6IGZhbHNlLCAnQzUnOiBmYWxzZSwgJ0M2JzogZmFsc2UsICdDNyc6IGZhbHNlLCAnQzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0QxJzogZmFsc2UsICdEMic6IGZhbHNlLCAnRDMnOiBmYWxzZSwgJ0Q0JzogZmFsc2UsICdENSc6IGZhbHNlLCAnRDYnOiBmYWxzZSwgJ0Q3JzogZmFsc2UsICdEOCc6IGZhbHNlLCBcclxuICAgICAgICAnRTEnOiBmYWxzZSwgJ0UyJzogZmFsc2UsICdFMyc6IGZhbHNlLCAnRTQnOiBmYWxzZSwgJ0U1JzogZmFsc2UsICdFNic6IGZhbHNlLCAnRTcnOiBmYWxzZSwgJ0U4JzogZmFsc2UsIFxyXG4gICAgICAgICdGMSc6IGZhbHNlLCAnRjInOiBmYWxzZSwgJ0YzJzogZmFsc2UsICdGNCc6IGZhbHNlLCAnRjUnOiBmYWxzZSwgJ0Y2JzogZmFsc2UsICdGNyc6IGZhbHNlLCAnRjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0cxJzogZmFsc2UsICdHMic6IGZhbHNlLCAnRzMnOiBmYWxzZSwgJ0c0JzogZmFsc2UsICdHNSc6IGZhbHNlLCAnRzYnOiBmYWxzZSwgJ0c3JzogZmFsc2UsICdHOCc6IGZhbHNlLCBcclxuICAgICAgICAnSDEnOiBmYWxzZSwgJ0gyJzogZmFsc2UsICdIMyc6IGZhbHNlLCAnSDQnOiBmYWxzZSwgJ0g1JzogZmFsc2UsICdINic6IGZhbHNlLCAnSDcnOiBmYWxzZSwgJ0g4JzogZmFsc2UgXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IF9ib2FyZFNoaXBzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0Qm9hcmRHcmlkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZEdyaWRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRCb2FyZFNoaXBzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcHVsYXRlR2FtZWJvYXJkID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUoIGluZGV4IDwgY29vcmRpbmF0ZXMubGVuZ3RoICl7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXAoLi4uY29vcmRpbmF0ZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KSBYXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwID0gKC4uLmNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBpZihpc0Nvb3Jkc0F2YWlsYWJsZShjb29yZGluYXRlcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwICA9IFNoaXAoLi4uY29vcmRpbmF0ZXMpIFxyXG4gICAgICAgICAgICBfYm9hcmRTaGlwcyA9IGFkZFNoaXBUb1NoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0KHNoaXApXHJcbiAgICAgICAgICAgIHJldHVybiBzaGlwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBJbmNvbWluZy1xdWVyeSAoYXNzZXJ0IHJlc3VsdClcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyID0gKGNvb3Jkcyk9PntcclxuICAgICAgICBpZihpc0F0dGFja1ZhbGlkKGNvb3JkcykgJiYgaXNTaGlwSGl0KGNvb3Jkcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZmluZFNoaXBCeUNvb3Jkcyhjb29yZHMpXHJcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rTmV4dEhpdCgpKXtcclxuICAgICAgICAgICAgICAgIF9ib2FyZEdyaWQgID0gcmVtb3ZlU2hpcFNxdWFyZShjb29yZHMsc2hpcClcclxuICAgICAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5KHNoaXApXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU2hpcFNxdWFyZShjb29yZHMsc2hpcClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU2hpcFNxdWFyZSA9IChjb29yZHMsc2hpcCkgPT57XHJcbiAgICAgICAgc2hpcC5yZW1vdmVTcXVhcmVIaXQoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgIH1cclxuIFxyXG4gICAgLy8gUXVlcnkgJiBDb21tYW5kIHNlbGYgeFxyXG4gICAgY29uc3QgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0ID0gKHNoaXApID0+e1xyXG4gICAgICAgIGNvbnN0IGNvb3Jkc0FycmF5ID0gc2hpcC5nZXRTaGlwQ29vcmQoKVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzQXJyYXlbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIF9ib2FyZEdyaWRba2V5XSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkU2hpcFRvU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gWy4uLl9ib2FyZFNoaXBzLHNoaXBdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsuLi5fYm9hcmRHcmlkfSwge1tgJHtjb29yZHN9YF06ICdIaXQnfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gZmluZFNoaXBJbmRleEJ5TmFtZShzaGlwKVxyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maWx0ZXIoYXJyYXlTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuaW5kZXhPZihhcnJheVNoaXApICE9PSBzaGlwSW5kZXggXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuIFxyXG4gICAgY29uc3QgZmluZFNoaXBCeUNvb3JkcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIC8vIGZvciBub3cgd2UgcGFzcyBhbiBhcnJheSB3aXRoIGFscmVhZHkgaW5zZXJ0ZWQgdmFsdWVzXHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmQoc2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXAuZ2V0U2hpcENvb3JkKCkuaW5jbHVkZXMoY29vcmRzKSAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbmRTaGlwSW5kZXhCeU5hbWUgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmRJbmRleChjdXJyZW50U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTaGlwLmdldFNoaXBOYW1lKCkgPT09IHNoaXAuZ2V0U2hpcE5hbWUoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNTaGlwSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMgJiYgX2JvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNBbGxTaGlwc1N1bmsgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMubGVuZ3RoID09PSAwID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNDb29yZHNBdmFpbGFibGUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXhBcnJheSA9IDBcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkc1tpbmRleEFycmF5XSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2JvYXJkR3JpZFtrZXldID8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBpc0F0dGFja1ZhbGlkID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9ib2FyZEdyaWRba2V5XSA9PT0gJ0hpdCc/IGZhbHNlIDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG4gXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRCb2FyZEdyaWQsXHJcbiAgICAgICAgZ2V0Qm9hcmRTaGlwcyxcclxuICAgICAgICBjcmVhdGVTaGlwLFxyXG4gICAgICAgIHBvcHVsYXRlR2FtZWJvYXJkLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyLFxyXG4gICAgICAgIGlzQWxsU2hpcHNTdW5rLFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQbGF5ZXIobmFtZSl7XHJcbiAgICBjb25zdCBfcGxheWVyTmFtZSA9IG5hbWVcclxuXHJcbiAgICBsZXQgX2dhbWVib2FyZFxyXG5cclxuICAgIGxldCBfYXR0YWNrZWRTcXVhcmVzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfcGxheWVyTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfZ2FtZWJvYXJkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0QXR0YWNrZWRTcXVhcmVzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9hdHRhY2tlZFNxdWFyZXNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXRBdHRhY2tlZFNxdWFyZXMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBfYXR0YWNrZWRTcXVhcmVzLnB1c2goY29vcmRzKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZVBsYXllciA9IChuYW1lKSA9PntcclxuICAgICAgICBfcGxheWVyTmFtZSA9IG5hbWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoLi4uY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIF9nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKVxyXG4gICAgICAgIF9nYW1lYm9hcmQucG9wdWxhdGVHYW1lYm9hcmQoY29vcmRpbmF0ZXMpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNlbmRBdHRhY2tDb29yZHNUb0dhbWUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBpZihnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhjb29yZHMpKSByZXR1cm4gbnVsbFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgICAgIGNvbnN0IGJvYXJkR3JpZCA9IE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCA9IGJvYXJkR3JpZC5sZW5ndGhcclxuICAgICAgICBsZXQgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIHdoaWxlKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGJvYXJkR3JpZFtpbmRleF0pKXtcclxuICAgICAgICAgICAgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMoYm9hcmRHcmlkW2luZGV4XSlcclxuICAgICAgICByZXR1cm4gYm9hcmRHcmlkW2luZGV4XVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbU51bWJlciA9IChtYXgsbWluKSA9PntcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNQbGF5ZXJEZWZlYXRlZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfZ2FtZWJvYXJkLmdldEJvYXJkU2hpcHMoKS5sZW5ndGggPT09IDAgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBnZXRHYW1lYm9hcmQsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzLFxyXG4gICAgICAgIGNyZWF0ZVBsYXllcixcclxuICAgICAgICBjcmVhdGVHYW1lQm9hcmQsXHJcbiAgICAgICAgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBzZW5kQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIGlzUGxheWVyRGVmZWF0ZWRcclxuICAgIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBTaGlwKC4uLmNvb3JkaW5hdGVzKXtcclxuXHJcbiAgICBsZXQgX3NoaXBDb29yZCA9IGNvb3JkaW5hdGVzXHJcblxyXG4gICAgY29uc3QgX1NISVBfTkFNRVMgPSB7XHJcbiAgICAgICAgMSA6ICdTcHknLFxyXG4gICAgICAgIDIgOiAnRGVzdHJveWVyJyxcclxuICAgICAgICAzIDogJ0NydWlzZXInLFxyXG4gICAgICAgIDQgOiAnQmF0dGxlc2hpcCcsXHJcbiAgICAgICAgNSA6ICdDYXJyaWVyJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IF9zaGlwTmFtZSA9IF9TSElQX05BTUVTW19zaGlwQ29vcmQubGVuZ3RoXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRTaGlwTmFtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcE5hbWVcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBnZXRTaGlwQ29vcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBJbmNvbWluZyBxdWVyeSAoYXNzZXJ0IHJlc3VsdCA+IHRlc3RlZCB3aXRoIHJlbW92ZVNxdWFyZUhpdClcclxuICAgIGNvbnN0IGZpbmRIaXRJbmRleCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmRzKSAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gU2VsZiBjb21tYW5kIHhcclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGNvbnN0IGluZGV4Q29vcmQgPSBmaW5kSGl0SW5kZXgoY29vcmRzKVxyXG4gICAgICAgIF9zaGlwQ29vcmQgPSBfc2hpcENvb3JkLmZpbHRlcihjb29yZCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZCkgIT09IGluZGV4Q29vcmQgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBQdXJlIC8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgaXNTdW5rTmV4dEhpdCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmxlbmd0aCA9PT0gMSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFNoaXBOYW1lLFxyXG4gICAgICAgIGdldFNoaXBDb29yZCxcclxuICAgICAgICBpc1N1bmtOZXh0SGl0LFxyXG4gICAgICAgIHJlbW92ZVNxdWFyZUhpdFxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJEeW5hbWljRWxlbWVudHMgKHR1cm5EYXRhLCBlbGVtZW50KXtcclxuICAgIGlmKHR1cm5EYXRhKXtcclxuICAgICAgICBpZihlbGVtZW50ICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSl7XHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmVuZGVyU3F1YXJlT25NaXNzKGVsZW1lbnQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyU3F1YXJlT25IaXQoZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3F1YXJlT25IaXQgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uTWlzcyAgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG4gIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwT25TaW5rID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5jb25zdCByZW5kZXJNYXRjaEluZm8gPSAoKSA9PntcclxuXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclR1cm5JbmZvID0gKCkgPT57XHJcbiAgXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlcldhcm5pbmdzSW5mbyA9ICgpID0+e1xyXG5cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RhdGljRWxlbWVudHMoZ2FtZWJvYXJkKXtcclxuICAgIHJlbmRlclNoaXBzKGdhbWVib2FyZClcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcHMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBpbmRleCA9IDBcclxuICAgIGxldCBib2FyZEdyaWQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmRHcmlkKClcclxuICAgIGxldCBncmlkTm9kZUxpc3QgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgaWYoYm9hcmRHcmlkW2tleV0pe1xyXG4gICAgICAgICAgICBncmlkTm9kZUxpc3RbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleCsrXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclBsYXllck5hbWVzID0gKHBsYXllcikgPT57XHJcbiAgICBcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2xvZ2ljL2dhbWUnXHJcbmltcG9ydCB7IGFkZEV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9sb2dpYy9hZGRFdmVudExpc3RlbmVycydcclxuY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG5jb25zb2xlLmxvZygnaGknKVxyXG5hZGRFdmVudExpc3RlbmVycyhnYW1lKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==