/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/logic/game.js":
/*!***************************!*\
  !*** ./src/logic/game.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/logic/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/logic/ship.js");


function Game (){

    const gameLoop = () =>{
        
        const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)('Victor')
        const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)('Olga')

        const gameboard1 = player1.createGameBoard(
            ['A1'],
            ['B1','B2'],
            ['C1','C2','C3'],
            ['D1','D2','D3','D4'],
            ['E1','E2','E3','E4','E5']
        )

        const gameboard2 = player2.createGameBoard(          
            ['G8'],
            ['B1','B2'],
            ['C1','C2','C3'],
            ['D1','D2','D3','D4'],
            ['E1','E2','E3','E4','E5']
        )
            
        let playerInTurn = player2
        let enemyGameboard = gameboard1
        let index = 0
        let coords
        let attack

        while(!player1.isPlayerDefeated(gameboard1)||!player2.isPlayerDefeated(gameboard2))
        {   
            
            coords = Object.keys(enemyGameboard.getBoardGrid())[index]
            // Test guard clause to avoid error
            if(coords === undefined){
                break
            }
            attack = playerInTurn.sendAttackCoordsToGame(coords)
            enemyGameboard.receiveAttackFromPlayer(attack)
            if(enemyGameboard.isAllShipsSunk()){
                break
            }
            console.log(enemyGameboard.getBoardGrid())
            playerInTurn = switchPlayers(player1,player2,playerInTurn)
            enemyGameboard = switchGameboards(gameboard1,gameboard2,playerInTurn,player2)
            index++
        }
    }

    const switchPlayers = (p1,p2,pt) =>{
        return pt === p2 ? p1 : p2
    }

    const switchGameboards = (gb1,gb2,pt,p2) =>{
        return pt === p2 ? gb1 : gb2
    }   

    return{gameLoop}
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
        const ship  = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(...coordinates) 
        _boardShips = addShipToShipsArray(ship)
        addShipToBoardGridObject(ship)
        return ship
    }
    
    // Incoming-query (assert result)
    const receiveAttackFromPlayer = (sendCoordsDOM)=>{
        const coords = sendCoordsDOM // Will be a method later
        if(isShipHit(coords)){
            const ship = findShipByCoords(coords)
            if(ship.isSunkNextHit()){
                // If ship is about to sink, remove hit and
                // remove ship from array
                _boardGrid  = removeShipSquare(coords,ship)
                _boardShips = removeShipFromShipsArray(ship)
                return
            }else{
                // 
                _boardGrid  = removeShipSquare(coords,ship)
                return
            }
        }
        // Send render info to the DOM or use another function?
        return coords
    }

    const removeShipSquare = (coords,ship) =>{
        ship.removeSquareHit(coords)
        return removeSquareFromBoardGridObject(coords)
    }
 
    // Query & Command self x
    const addShipToBoardGridObject = (ship) =>{
        const coordsArray = ship.getShipCoord()
        let indexArray    = 0
        for(const [key] of Object.entries(_boardGrid)){
            if(key === coordsArray[indexArray]){
                _boardGrid[key] = true
                indexArray++
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

    // // Outgoing-query x
    // const sendShipCoord = () =>{ 
    //     // Gets a Ship object and sends
    //     // it's coordinates to View
    // }
    
    // // Outgoing query x
    // const sendHitCoord = () =>{
    //     // Send hit coordinates to the hit
    //     // ship
    // }

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
  
    return {
        getBoardGrid,
        getBoardShips,
        createShip,
        populateGameboard,
        receiveAttackFromPlayer,
        removeShipFromShipsArray,
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

    const getName = () =>{
        return _playerName
    }

    const createGameBoard = (...coordinates) =>{
        const gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)()
        gameboard.populateGameboard(coordinates)
        return gameboard
    }

    const sendAttackCoordsToGame = (coords = 'A1') =>{
        // Receives coords from an event listener
        // and send it to game 
        return coords
    }

    const sendRandomAttackCoordsToGame = (gameboard) =>{
        // Select a random square from _boardGrid
        // and send it to the enemy gameboard.receiveAttackFromPlayer
        const BOARD_GRID_LENGTH  = 
            Object.keys(gameboard.getBoardGrid()).length
        const index = generateRandomNumber(0,BOARD_GRID_LENGTH)
        return Object.keys(gameboard.getBoardGrid())[index]
    }

    const generateRandomNumber = (max,min) =>{
        return Math.floor(Math.random() * (max - min)) + min
    }

    const isPlayerDefeated = (gameboard) =>{
        return gameboard.isAllShipsSunk()
    }

    return{
        getName,
        createGameBoard,
        sendAttackCoordsToGame,
        sendRandomAttackCoordsToGame,
        isPlayerDefeated
    }
}

// const p1 = Player()
// const gb = p1.createGameBoard(['A1','A2'])
// (p1.sendRandomAttackCoordsToGameboard(gb))

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

    // Incoming query (assert result)
    const findHitIndex = (coords) =>{
        return _shipCoord.indexOf(coords)    
    }
    
    // Self command x
    const removeSquareHit = (coords) =>{
        // Use filter and return a new array?
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


const game = (0,_logic_game__WEBPACK_IMPORTED_MODULE_0__.Game)()
game.gameLoop()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWlDO0FBQ0o7QUFDdEI7QUFDUDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0NBQU07QUFDOUIsd0JBQXdCLCtDQUFNO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7O0FDNUQ2QjtBQUM3QjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDJDQUFJO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWMsR0FBRyxJQUFJLE9BQU8sVUFBVTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9JdUM7QUFDdkM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHFEQUFTO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNqRE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2hEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm1DO0FBQ25DO0FBQ0EsYUFBYSxpREFBSTtBQUNqQixlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvcGxheWVyLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3NoaXAuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcclxuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCdcclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCl7XHJcblxyXG4gICAgY29uc3QgZ2FtZUxvb3AgPSAoKSA9PntcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBwbGF5ZXIxID0gUGxheWVyKCdWaWN0b3InKVxyXG4gICAgICAgIGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoJ09sZ2EnKVxyXG5cclxuICAgICAgICBjb25zdCBnYW1lYm9hcmQxID0gcGxheWVyMS5jcmVhdGVHYW1lQm9hcmQoXHJcbiAgICAgICAgICAgIFsnQTEnXSxcclxuICAgICAgICAgICAgWydCMScsJ0IyJ10sXHJcbiAgICAgICAgICAgIFsnQzEnLCdDMicsJ0MzJ10sXHJcbiAgICAgICAgICAgIFsnRDEnLCdEMicsJ0QzJywnRDQnXSxcclxuICAgICAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0U1J11cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVib2FyZDIgPSBwbGF5ZXIyLmNyZWF0ZUdhbWVCb2FyZCggICAgICAgICAgXHJcbiAgICAgICAgICAgIFsnRzgnXSxcclxuICAgICAgICAgICAgWydCMScsJ0IyJ10sXHJcbiAgICAgICAgICAgIFsnQzEnLCdDMicsJ0MzJ10sXHJcbiAgICAgICAgICAgIFsnRDEnLCdEMicsJ0QzJywnRDQnXSxcclxuICAgICAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0U1J11cclxuICAgICAgICApXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBwbGF5ZXJJblR1cm4gPSBwbGF5ZXIyXHJcbiAgICAgICAgbGV0IGVuZW15R2FtZWJvYXJkID0gZ2FtZWJvYXJkMVxyXG4gICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICBsZXQgY29vcmRzXHJcbiAgICAgICAgbGV0IGF0dGFja1xyXG5cclxuICAgICAgICB3aGlsZSghcGxheWVyMS5pc1BsYXllckRlZmVhdGVkKGdhbWVib2FyZDEpfHwhcGxheWVyMi5pc1BsYXllckRlZmVhdGVkKGdhbWVib2FyZDIpKVxyXG4gICAgICAgIHsgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvb3JkcyA9IE9iamVjdC5rZXlzKGVuZW15R2FtZWJvYXJkLmdldEJvYXJkR3JpZCgpKVtpbmRleF1cclxuICAgICAgICAgICAgLy8gVGVzdCBndWFyZCBjbGF1c2UgdG8gYXZvaWQgZXJyb3JcclxuICAgICAgICAgICAgaWYoY29vcmRzID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhdHRhY2sgPSBwbGF5ZXJJblR1cm4uc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZShjb29yZHMpXHJcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2tGcm9tUGxheWVyKGF0dGFjaylcclxuICAgICAgICAgICAgaWYoZW5lbXlHYW1lYm9hcmQuaXNBbGxTaGlwc1N1bmsoKSl7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVuZW15R2FtZWJvYXJkLmdldEJvYXJkR3JpZCgpKVxyXG4gICAgICAgICAgICBwbGF5ZXJJblR1cm4gPSBzd2l0Y2hQbGF5ZXJzKHBsYXllcjEscGxheWVyMixwbGF5ZXJJblR1cm4pXHJcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkID0gc3dpdGNoR2FtZWJvYXJkcyhnYW1lYm9hcmQxLGdhbWVib2FyZDIscGxheWVySW5UdXJuLHBsYXllcjIpXHJcbiAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoUGxheWVycyA9IChwMSxwMixwdCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHB0ID09PSBwMiA/IHAxIDogcDJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hHYW1lYm9hcmRzID0gKGdiMSxnYjIscHQscDIpID0+e1xyXG4gICAgICAgIHJldHVybiBwdCA9PT0gcDIgPyBnYjEgOiBnYjJcclxuICAgIH0gICBcclxuXHJcbiAgICByZXR1cm57Z2FtZUxvb3B9XHJcbn0iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWVib2FyZCgpe1xyXG4gICBcclxuICAgIGxldCBfYm9hcmRHcmlkID0gXHJcbiAgICB7XHJcbiAgICAgICAgJ0ExJzogZmFsc2UsICdBMic6IGZhbHNlLCAnQTMnOiBmYWxzZSwgJ0E0JzogZmFsc2UsICdBNSc6IGZhbHNlLCAnQTYnOiBmYWxzZSwgJ0E3JzogZmFsc2UsICdBOCc6IGZhbHNlLCBcclxuICAgICAgICAnQjEnOiBmYWxzZSwgJ0IyJzogZmFsc2UsICdCMyc6IGZhbHNlLCAnQjQnOiBmYWxzZSwgJ0I1JzogZmFsc2UsICdCNic6IGZhbHNlLCAnQjcnOiBmYWxzZSwgJ0I4JzogZmFsc2UsIFxyXG4gICAgICAgICdDMSc6IGZhbHNlLCAnQzInOiBmYWxzZSwgJ0MzJzogZmFsc2UsICdDNCc6IGZhbHNlLCAnQzUnOiBmYWxzZSwgJ0M2JzogZmFsc2UsICdDNyc6IGZhbHNlLCAnQzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0QxJzogZmFsc2UsICdEMic6IGZhbHNlLCAnRDMnOiBmYWxzZSwgJ0Q0JzogZmFsc2UsICdENSc6IGZhbHNlLCAnRDYnOiBmYWxzZSwgJ0Q3JzogZmFsc2UsICdEOCc6IGZhbHNlLCBcclxuICAgICAgICAnRTEnOiBmYWxzZSwgJ0UyJzogZmFsc2UsICdFMyc6IGZhbHNlLCAnRTQnOiBmYWxzZSwgJ0U1JzogZmFsc2UsICdFNic6IGZhbHNlLCAnRTcnOiBmYWxzZSwgJ0U4JzogZmFsc2UsIFxyXG4gICAgICAgICdGMSc6IGZhbHNlLCAnRjInOiBmYWxzZSwgJ0YzJzogZmFsc2UsICdGNCc6IGZhbHNlLCAnRjUnOiBmYWxzZSwgJ0Y2JzogZmFsc2UsICdGNyc6IGZhbHNlLCAnRjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0cxJzogZmFsc2UsICdHMic6IGZhbHNlLCAnRzMnOiBmYWxzZSwgJ0c0JzogZmFsc2UsICdHNSc6IGZhbHNlLCAnRzYnOiBmYWxzZSwgJ0c3JzogZmFsc2UsICdHOCc6IGZhbHNlLCBcclxuICAgICAgICAnSDEnOiBmYWxzZSwgJ0gyJzogZmFsc2UsICdIMyc6IGZhbHNlLCAnSDQnOiBmYWxzZSwgJ0g1JzogZmFsc2UsICdINic6IGZhbHNlLCAnSDcnOiBmYWxzZSwgJ0g4JzogZmFsc2UgXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IF9ib2FyZFNoaXBzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0Qm9hcmRHcmlkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZEdyaWRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRCb2FyZFNoaXBzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcHVsYXRlR2FtZWJvYXJkID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUoIGluZGV4IDwgY29vcmRpbmF0ZXMubGVuZ3RoICl7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXAoLi4uY29vcmRpbmF0ZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KSBYXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwID0gKC4uLmNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBjb25zdCBzaGlwICA9IFNoaXAoLi4uY29vcmRpbmF0ZXMpIFxyXG4gICAgICAgIF9ib2FyZFNoaXBzID0gYWRkU2hpcFRvU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgIGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdChzaGlwKVxyXG4gICAgICAgIHJldHVybiBzaGlwXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KVxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIgPSAoc2VuZENvb3Jkc0RPTSk9PntcclxuICAgICAgICBjb25zdCBjb29yZHMgPSBzZW5kQ29vcmRzRE9NIC8vIFdpbGwgYmUgYSBtZXRob2QgbGF0ZXJcclxuICAgICAgICBpZihpc1NoaXBIaXQoY29vcmRzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBmaW5kU2hpcEJ5Q29vcmRzKGNvb3JkcylcclxuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmtOZXh0SGl0KCkpe1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgc2hpcCBpcyBhYm91dCB0byBzaW5rLCByZW1vdmUgaGl0IGFuZFxyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHNoaXAgZnJvbSBhcnJheVxyXG4gICAgICAgICAgICAgICAgX2JvYXJkR3JpZCAgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICAgICAgX2JvYXJkU2hpcHMgPSByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICAgICAgX2JvYXJkR3JpZCAgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2VuZCByZW5kZXIgaW5mbyB0byB0aGUgRE9NIG9yIHVzZSBhbm90aGVyIGZ1bmN0aW9uP1xyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwU3F1YXJlID0gKGNvb3JkcyxzaGlwKSA9PntcclxuICAgICAgICBzaGlwLnJlbW92ZVNxdWFyZUhpdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBRdWVyeSAmIENvbW1hbmQgc2VsZiB4XHJcbiAgICBjb25zdCBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3QgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3QgY29vcmRzQXJyYXkgPSBzaGlwLmdldFNoaXBDb29yZCgpXHJcbiAgICAgICAgbGV0IGluZGV4QXJyYXkgICAgPSAwXHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHNBcnJheVtpbmRleEFycmF5XSl7XHJcbiAgICAgICAgICAgICAgICBfYm9hcmRHcmlkW2tleV0gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpbmRleEFycmF5KytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkU2hpcFRvU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gWy4uLl9ib2FyZFNoaXBzLHNoaXBdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsuLi5fYm9hcmRHcmlkfSwge1tgJHtjb29yZHN9YF06ICdIaXQnfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gZmluZFNoaXBJbmRleEJ5TmFtZShzaGlwKVxyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maWx0ZXIoYXJyYXlTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuaW5kZXhPZihhcnJheVNoaXApICE9PSBzaGlwSW5kZXggXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuIFxyXG4gICAgY29uc3QgZmluZFNoaXBCeUNvb3JkcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIC8vIGZvciBub3cgd2UgcGFzcyBhbiBhcnJheSB3aXRoIGFscmVhZHkgaW5zZXJ0ZWQgdmFsdWVzXHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmQoc2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXAuZ2V0U2hpcENvb3JkKCkuaW5jbHVkZXMoY29vcmRzKSAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbmRTaGlwSW5kZXhCeU5hbWUgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmRJbmRleChjdXJyZW50U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTaGlwLmdldFNoaXBOYW1lKCkgPT09IHNoaXAuZ2V0U2hpcE5hbWUoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gLy8gT3V0Z29pbmctcXVlcnkgeFxyXG4gICAgLy8gY29uc3Qgc2VuZFNoaXBDb29yZCA9ICgpID0+eyBcclxuICAgIC8vICAgICAvLyBHZXRzIGEgU2hpcCBvYmplY3QgYW5kIHNlbmRzXHJcbiAgICAvLyAgICAgLy8gaXQncyBjb29yZGluYXRlcyB0byBWaWV3XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vIC8vIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIC8vIGNvbnN0IHNlbmRIaXRDb29yZCA9ICgpID0+e1xyXG4gICAgLy8gICAgIC8vIFNlbmQgaGl0IGNvb3JkaW5hdGVzIHRvIHRoZSBoaXRcclxuICAgIC8vICAgICAvLyBzaGlwXHJcbiAgICAvLyB9XHJcblxyXG4gICAgY29uc3QgaXNTaGlwSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMgJiYgX2JvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNBbGxTaGlwc1N1bmsgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMubGVuZ3RoID09PSAwID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcbiAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEJvYXJkR3JpZCxcclxuICAgICAgICBnZXRCb2FyZFNoaXBzLFxyXG4gICAgICAgIGNyZWF0ZVNoaXAsXHJcbiAgICAgICAgcG9wdWxhdGVHYW1lYm9hcmQsXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIsXHJcbiAgICAgICAgcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5LFxyXG4gICAgICAgIGlzQWxsU2hpcHNTdW5rLFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQbGF5ZXIobmFtZSl7XHJcbiAgICBjb25zdCBfcGxheWVyTmFtZSA9IG5hbWVcclxuXHJcbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9wbGF5ZXJOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3JlYXRlR2FtZUJvYXJkID0gKC4uLmNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIGdhbWVib2FyZC5wb3B1bGF0ZUdhbWVib2FyZChjb29yZGluYXRlcylcclxuICAgICAgICByZXR1cm4gZ2FtZWJvYXJkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSA9IChjb29yZHMgPSAnQTEnKSA9PntcclxuICAgICAgICAvLyBSZWNlaXZlcyBjb29yZHMgZnJvbSBhbiBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIC8vIGFuZCBzZW5kIGl0IHRvIGdhbWUgXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgICAgICAvLyBTZWxlY3QgYSByYW5kb20gc3F1YXJlIGZyb20gX2JvYXJkR3JpZFxyXG4gICAgICAgIC8vIGFuZCBzZW5kIGl0IHRvIHRoZSBlbmVteSBnYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXJcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCAgPSBcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZ2FtZWJvYXJkLmdldEJvYXJkR3JpZCgpKS5sZW5ndGhcclxuICAgICAgICBjb25zdCBpbmRleCA9IGdlbmVyYXRlUmFuZG9tTnVtYmVyKDAsQk9BUkRfR1JJRF9MRU5HVEgpXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlbaW5kZXhdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGVSYW5kb21OdW1iZXIgPSAobWF4LG1pbikgPT57XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGxheWVyRGVmZWF0ZWQgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgICAgICByZXR1cm4gZ2FtZWJvYXJkLmlzQWxsU2hpcHNTdW5rKClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBjcmVhdGVHYW1lQm9hcmQsXHJcbiAgICAgICAgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIGlzUGxheWVyRGVmZWF0ZWRcclxuICAgIH1cclxufVxyXG5cclxuLy8gY29uc3QgcDEgPSBQbGF5ZXIoKVxyXG4vLyBjb25zdCBnYiA9IHAxLmNyZWF0ZUdhbWVCb2FyZChbJ0ExJywnQTInXSlcclxuLy8gKHAxLnNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWVib2FyZChnYikpIiwiZXhwb3J0IGZ1bmN0aW9uIFNoaXAoLi4uY29vcmRpbmF0ZXMpe1xyXG5cclxuICAgIGxldCBfc2hpcENvb3JkID0gY29vcmRpbmF0ZXNcclxuXHJcbiAgICBjb25zdCBfU0hJUF9OQU1FUyA9IHtcclxuICAgICAgICAxIDogJ1NweScsXHJcbiAgICAgICAgMiA6ICdEZXN0cm95ZXInLFxyXG4gICAgICAgIDMgOiAnQ3J1aXNlcicsXHJcbiAgICAgICAgNCA6ICdCYXR0bGVzaGlwJyxcclxuICAgICAgICA1IDogJ0NhcnJpZXInXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX3NoaXBOYW1lID0gX1NISVBfTkFNRVNbX3NoaXBDb29yZC5sZW5ndGhdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldFNoaXBOYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGdldFNoaXBDb29yZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkXHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5jb21pbmcgcXVlcnkgKGFzc2VydCByZXN1bHQpXHJcbiAgICBjb25zdCBmaW5kSGl0SW5kZXggPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkcykgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFNlbGYgY29tbWFuZCB4XHJcbiAgICBjb25zdCByZW1vdmVTcXVhcmVIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICAvLyBVc2UgZmlsdGVyIGFuZCByZXR1cm4gYSBuZXcgYXJyYXk/XHJcbiAgICAgICAgY29uc3QgaW5kZXhDb29yZCA9IGZpbmRIaXRJbmRleChjb29yZHMpXHJcbiAgICAgICAgX3NoaXBDb29yZCA9IF9zaGlwQ29vcmQuZmlsdGVyKGNvb3JkID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkKSAhPT0gaW5kZXhDb29yZCBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1cmUgLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBpc1N1bmtOZXh0SGl0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQubGVuZ3RoID09PSAxID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0U2hpcE5hbWUsXHJcbiAgICAgICAgZ2V0U2hpcENvb3JkLFxyXG4gICAgICAgIGlzU3Vua05leHRIaXQsXHJcbiAgICAgICAgcmVtb3ZlU3F1YXJlSGl0XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9sb2dpYy9nYW1lJ1xyXG5cclxuY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG5nYW1lLmdhbWVMb29wKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=