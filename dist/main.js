/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "executeGame": () => (/* binding */ executeGame)
/* harmony export */ });
/* harmony import */ var _logic_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic/game */ "./src/logic/game.js");
/* harmony import */ var _logic_addEventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/addEventListeners */ "./src/logic/addEventListeners.js");




const executeGame = () =>{
    const game = (0,_logic_game__WEBPACK_IMPORTED_MODULE_0__.Game)()
    ;(0,_logic_addEventListeners__WEBPACK_IMPORTED_MODULE_1__.addEventListeners)(game)
}

executeGame()



/***/ }),

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
    gridSquaresComputer.forEach(square =>{
        square.addEventListener('click',(event) =>{
            const turnData = game.gameTurn(event.target.id)
            if(turnData === null) return      
            ;(0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderTurn)(turnData,event)
        })
    })
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
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../src/index */ "./src/index.js");




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

    ;(0,_view_renderStaticElements__WEBPACK_IMPORTED_MODULE_0__.renderStaticElements)(gameboard1, player1, player2)

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

        if(isAnyPlayerDefeated()){
            console.log('hi')
            finishMatch()
            return
        }
        return {
            player1,
            isPlayerAttackMiss,
            isComputerAttackMiss,
            computerCoords
        }
    }

    const switchPlayers = () =>{
        return (playerInTurn === player2) ? player1 : player2
    }

    const switchGameboards = () =>{
        return (playerInTurn === player2) ? gameboard1 : gameboard2
    }   

    const isAnyPlayerDefeated = () =>{
        return player1.isPlayerDefeated() || player2.isPlayerDefeated()
    } 

    const finishMatch = () =>{
        // Remove event listeners from board
        // Call renderMatchInfo
        ;(0,_src_index__WEBPACK_IMPORTED_MODULE_2__.executeGame)()
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
                _boardShips = removeShipFromShipsArray(ship)
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
        return (_boardShips.length === 0) ? true : false
    }

    const isCoordsAvailable = (coords) =>{
        let indexArray = 0
        for(const [key] of Object.entries(_boardGrid)){
            if(key === coords[indexArray]){
                return (_boardGrid[key]) ? false : true
            }
        } 
    }
    
    const isAttackValid = (coords) =>{
        for(const [key] of Object.entries(_boardGrid)){
            if(key === coords){
                return (_boardGrid[key]) === 'Hit'? false : true
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

    const createGameBoard = (...coordinates) =>{
        _gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)()
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
        return (_gameboard.getBoardShips().length === 0) ? true : false
    }

    return{
        getName,
        getGameboard,
        setAttackedSquares,
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
/* harmony export */   "renderTurn": () => (/* binding */ renderTurn)
/* harmony export */ });
function renderTurn (turnData,event){
    const { playerData,computerData, attackedElement } = 
        retrieveTurnData(turnData)

    renderBoardSquares(playerData, event.target)
    renderBoardSquares(computerData, attackedElement)

    renderTurnInfo(turnData,turnData.player1)
}

const retrieveTurnData = (turnData) =>{
    const playerData      = turnData.isPlayerAttackMiss
    const computerData    = turnData.isComputerAttackMiss
    const computerCoords  = turnData.computerCoords
    const attackedElement = findHitElement(computerCoords)

    return { playerData,computerData, attackedElement }
}

const findHitElement = (coords) =>{
    return document.querySelector(`.player1 > #${coords}`)
}

const renderBoardSquares = (turnData, element) =>{
    if(isHitElement(element)) return  
    (turnData) ? renderSquareOnMiss(element) : renderSquareOnHit(element)
}

const isHitElement = (element) =>{
    return element.classList.contains('hit') 
}

const renderBoardOnReset = () =>{
  
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

const renderTurnInfo = (turnData,player1) =>{
    const matchInfoEl = document.querySelector('.match-info')
    matchInfoEl.textContent = `${player1.getName()} attack is a ` + 
    (turnData.isPlayerAttackMiss ? 'miss!' : 'hit!')
  
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
function renderStaticElements(gameboard, player1, player2){
    renderShips(gameboard)
    renderPlayerNames(player1, player2)
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

const renderPlayerNames = (player1, player2) =>{
    const player1Name = document.querySelector('.player1-name')
    const player2Name = document.querySelector('.player2-name')

    player1Name.textContent = player1.getName() + ' \'s fleet'
    player2Name.textContent = player2.getName() + ' \'s fleet'
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9hZGRFdmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvc2hpcC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlclN0YXRpY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2xvZ2ljL2dhbWUnXHJcbmltcG9ydCB7IGFkZEV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9sb2dpYy9hZGRFdmVudExpc3RlbmVycydcclxuXHJcblxyXG5jb25zdCBleGVjdXRlR2FtZSA9ICgpID0+e1xyXG4gICAgY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoZ2FtZSlcclxufVxyXG5cclxuZXhlY3V0ZUdhbWUoKVxyXG5cclxuZXhwb3J0IHtleGVjdXRlR2FtZX0iLCJpbXBvcnQgeyByZW5kZXJUdXJuIH0gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzIChnYW1lKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzQ29tcHV0ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc0NvbXB1dGVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGV2ZW50KSA9PntcclxuICAgICAgICAgICAgY29uc3QgdHVybkRhdGEgPSBnYW1lLmdhbWVUdXJuKGV2ZW50LnRhcmdldC5pZClcclxuICAgICAgICAgICAgaWYodHVybkRhdGEgPT09IG51bGwpIHJldHVybiAgICAgIFxyXG4gICAgICAgICAgICByZW5kZXJUdXJuKHR1cm5EYXRhLGV2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgcmVuZGVyU3RhdGljRWxlbWVudHMgfSBmcm9tICcuLi92aWV3L3JlbmRlclN0YXRpY0VsZW1lbnRzJ1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcclxuaW1wb3J0IHtleGVjdXRlR2FtZX0gZnJvbSAnL3NyYy9pbmRleCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lICgpe1xyXG5cclxuICAgIGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ1ZpY3RvcicpXHJcbiAgICBwbGF5ZXIxLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICBbJ0g4J10sXHJcbiAgICAgICAgWydDNScsJ0g2J10sXHJcbiAgICAgICAgWydCNycsJ0QxJywnSDEnXSxcclxuICAgICAgICBbJ0M2JywnQTUnLCdEOCcsJ0QyJ10sXHJcbiAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0E1J11cclxuICAgIClcclxuICAgIGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoJ0NvbXB1dGVyJylcclxuICAgIHBsYXllcjIuY3JlYXRlR2FtZUJvYXJkKFxyXG4gICAgICAgIFsnRzgnXSxcclxuICAgICAgICBbJ0IxJywnQjInXSxcclxuICAgICAgICBbJ0MxJywnQzInLCdDMyddLFxyXG4gICAgICAgIFsnRDEnLCdEMicsJ0QzJywnRDQnXSxcclxuICAgICAgICBbJ0UxJywnRTInLCdFMycsJ0U0JywnRTUnXVxyXG4gICAgKVxyXG5cclxuICAgIGxldCBnYW1lYm9hcmQxICAgICA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKClcclxuICAgIGxldCBnYW1lYm9hcmQyICAgICA9IHBsYXllcjIuZ2V0R2FtZWJvYXJkKClcclxuICAgIGxldCBwbGF5ZXJJblR1cm4gICA9IHBsYXllcjFcclxuICAgIGxldCBlbmVteUdhbWVib2FyZCA9IGdhbWVib2FyZDJcclxuXHJcbiAgICByZW5kZXJTdGF0aWNFbGVtZW50cyhnYW1lYm9hcmQxLCBwbGF5ZXIxLCBwbGF5ZXIyKVxyXG5cclxuICAgIGNvbnN0IGdhbWVUdXJuID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgY29uc3QgcGxheWVyQ29vcmRzID0gcGxheWVySW5UdXJuLnNlbmRBdHRhY2tDb29yZHNUb0dhbWUoY29vcmRzKVxyXG4gICAgICAgIGlmKHBsYXllckNvb3JkcyA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICBcclxuICAgICAgICBjb25zdCBpc1BsYXllckF0dGFja01pc3MgICA9IGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2tGcm9tUGxheWVyKHBsYXllckNvb3JkcykgXHJcbiAgICAgICAgcGxheWVySW5UdXJuICAgICAgICAgICAgICAgPSBzd2l0Y2hQbGF5ZXJzKClcclxuICAgICAgICBlbmVteUdhbWVib2FyZCAgICAgICAgICAgICA9IHN3aXRjaEdhbWVib2FyZHMoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ29vcmRzICAgICAgID0gcGxheWVySW5UdXJuLnNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUoZW5lbXlHYW1lYm9hcmQpXHJcbiAgICAgICAgY29uc3QgaXNDb21wdXRlckF0dGFja01pc3MgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihjb21wdXRlckNvb3JkcylcclxuICAgICAgICBwbGF5ZXJJblR1cm4gICAgICAgICAgICAgICA9IHN3aXRjaFBsYXllcnMoKVxyXG4gICAgICAgIGVuZW15R2FtZWJvYXJkICAgICAgICAgICAgID0gc3dpdGNoR2FtZWJvYXJkcygpXHJcblxyXG4gICAgICAgIGlmKGlzQW55UGxheWVyRGVmZWF0ZWQoKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaScpXHJcbiAgICAgICAgICAgIGZpbmlzaE1hdGNoKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBsYXllcjEsXHJcbiAgICAgICAgICAgIGlzUGxheWVyQXR0YWNrTWlzcyxcclxuICAgICAgICAgICAgaXNDb21wdXRlckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGNvbXB1dGVyQ29vcmRzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaFBsYXllcnMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKHBsYXllckluVHVybiA9PT0gcGxheWVyMikgPyBwbGF5ZXIxIDogcGxheWVyMlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaEdhbWVib2FyZHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKHBsYXllckluVHVybiA9PT0gcGxheWVyMikgPyBnYW1lYm9hcmQxIDogZ2FtZWJvYXJkMlxyXG4gICAgfSAgIFxyXG5cclxuICAgIGNvbnN0IGlzQW55UGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVyMS5pc1BsYXllckRlZmVhdGVkKCkgfHwgcGxheWVyMi5pc1BsYXllckRlZmVhdGVkKClcclxuICAgIH0gXHJcblxyXG4gICAgY29uc3QgZmluaXNoTWF0Y2ggPSAoKSA9PntcclxuICAgICAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZyb20gYm9hcmRcclxuICAgICAgICAvLyBDYWxsIHJlbmRlck1hdGNoSW5mb1xyXG4gICAgICAgIGV4ZWN1dGVHYW1lKClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57Z2FtZVR1cm59XHJcbn1cclxuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCdcclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWVib2FyZCgpeyAgICBcclxuICAgXHJcbiAgICBsZXQgX2JvYXJkR3JpZCA9IFxyXG4gICAge1xyXG4gICAgICAgICdBMSc6IGZhbHNlLCAnQTInOiBmYWxzZSwgJ0EzJzogZmFsc2UsICdBNCc6IGZhbHNlLCAnQTUnOiBmYWxzZSwgJ0E2JzogZmFsc2UsICdBNyc6IGZhbHNlLCAnQTgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0IxJzogZmFsc2UsICdCMic6IGZhbHNlLCAnQjMnOiBmYWxzZSwgJ0I0JzogZmFsc2UsICdCNSc6IGZhbHNlLCAnQjYnOiBmYWxzZSwgJ0I3JzogZmFsc2UsICdCOCc6IGZhbHNlLCBcclxuICAgICAgICAnQzEnOiBmYWxzZSwgJ0MyJzogZmFsc2UsICdDMyc6IGZhbHNlLCAnQzQnOiBmYWxzZSwgJ0M1JzogZmFsc2UsICdDNic6IGZhbHNlLCAnQzcnOiBmYWxzZSwgJ0M4JzogZmFsc2UsIFxyXG4gICAgICAgICdEMSc6IGZhbHNlLCAnRDInOiBmYWxzZSwgJ0QzJzogZmFsc2UsICdENCc6IGZhbHNlLCAnRDUnOiBmYWxzZSwgJ0Q2JzogZmFsc2UsICdENyc6IGZhbHNlLCAnRDgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0UxJzogZmFsc2UsICdFMic6IGZhbHNlLCAnRTMnOiBmYWxzZSwgJ0U0JzogZmFsc2UsICdFNSc6IGZhbHNlLCAnRTYnOiBmYWxzZSwgJ0U3JzogZmFsc2UsICdFOCc6IGZhbHNlLCBcclxuICAgICAgICAnRjEnOiBmYWxzZSwgJ0YyJzogZmFsc2UsICdGMyc6IGZhbHNlLCAnRjQnOiBmYWxzZSwgJ0Y1JzogZmFsc2UsICdGNic6IGZhbHNlLCAnRjcnOiBmYWxzZSwgJ0Y4JzogZmFsc2UsIFxyXG4gICAgICAgICdHMSc6IGZhbHNlLCAnRzInOiBmYWxzZSwgJ0czJzogZmFsc2UsICdHNCc6IGZhbHNlLCAnRzUnOiBmYWxzZSwgJ0c2JzogZmFsc2UsICdHNyc6IGZhbHNlLCAnRzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0gxJzogZmFsc2UsICdIMic6IGZhbHNlLCAnSDMnOiBmYWxzZSwgJ0g0JzogZmFsc2UsICdINSc6IGZhbHNlLCAnSDYnOiBmYWxzZSwgJ0g3JzogZmFsc2UsICdIOCc6IGZhbHNlIFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBfYm9hcmRTaGlwcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldEJvYXJkR3JpZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRHcmlkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0Qm9hcmRTaGlwcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBwb3B1bGF0ZUdhbWVib2FyZCA9IChjb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICAgIHdoaWxlKCBpbmRleCA8IGNvb3JkaW5hdGVzLmxlbmd0aCApe1xyXG4gICAgICAgICAgICBjcmVhdGVTaGlwKC4uLmNvb3JkaW5hdGVzW2luZGV4XSlcclxuICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJbmNvbWluZy1xdWVyeSAoYXNzZXJ0IHJlc3VsdCkgWFxyXG4gICAgY29uc3QgY3JlYXRlU2hpcCA9ICguLi5jb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgaWYoaXNDb29yZHNBdmFpbGFibGUoY29vcmRpbmF0ZXMpKXtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCAgPSBTaGlwKC4uLmNvb3JkaW5hdGVzKSBcclxuICAgICAgICAgICAgX2JvYXJkU2hpcHMgPSBhZGRTaGlwVG9TaGlwc0FycmF5KHNoaXApXHJcbiAgICAgICAgICAgIGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdChzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm4gc2hpcFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gSW5jb21pbmctcXVlcnkgKGFzc2VydCByZXN1bHQpXHJcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrRnJvbVBsYXllciA9IChjb29yZHMpPT57XHJcbiAgICAgICAgaWYoaXNBdHRhY2tWYWxpZChjb29yZHMpICYmIGlzU2hpcEhpdChjb29yZHMpKXtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGZpbmRTaGlwQnlDb29yZHMoY29vcmRzKVxyXG4gICAgICAgICAgICBpZihzaGlwLmlzU3Vua05leHRIaXQoKSl7XHJcbiAgICAgICAgICAgICAgICBfYm9hcmRTaGlwcyA9IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwU3F1YXJlID0gKGNvb3JkcyxzaGlwKSA9PntcclxuICAgICAgICBzaGlwLnJlbW92ZVNxdWFyZUhpdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBRdWVyeSAmIENvbW1hbmQgc2VsZiB4XHJcbiAgICBjb25zdCBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3QgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3QgY29vcmRzQXJyYXkgPSBzaGlwLmdldFNoaXBDb29yZCgpXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzQXJyYXlbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIF9ib2FyZEdyaWRba2V5XSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkU2hpcFRvU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gWy4uLl9ib2FyZFNoaXBzLHNoaXBdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsuLi5fYm9hcmRHcmlkfSwge1tgJHtjb29yZHN9YF06ICdIaXQnfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gZmluZFNoaXBJbmRleEJ5TmFtZShzaGlwKVxyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maWx0ZXIoYXJyYXlTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuaW5kZXhPZihhcnJheVNoaXApICE9PSBzaGlwSW5kZXggXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuIFxyXG4gICAgY29uc3QgZmluZFNoaXBCeUNvb3JkcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIC8vIGZvciBub3cgd2UgcGFzcyBhbiBhcnJheSB3aXRoIGFscmVhZHkgaW5zZXJ0ZWQgdmFsdWVzXHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmQoc2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXAuZ2V0U2hpcENvb3JkKCkuaW5jbHVkZXMoY29vcmRzKSAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbmRTaGlwSW5kZXhCeU5hbWUgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmRJbmRleChjdXJyZW50U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTaGlwLmdldFNoaXBOYW1lKCkgPT09IHNoaXAuZ2V0U2hpcE5hbWUoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNTaGlwSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMgJiYgX2JvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNBbGxTaGlwc1N1bmsgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKF9ib2FyZFNoaXBzLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0Nvb3Jkc0F2YWlsYWJsZSA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGxldCBpbmRleEFycmF5ID0gMFxyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzW2luZGV4QXJyYXldKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoX2JvYXJkR3JpZFtrZXldKSA/IGZhbHNlIDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgaXNBdHRhY2tWYWxpZCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoX2JvYXJkR3JpZFtrZXldKSA9PT0gJ0hpdCc/IGZhbHNlIDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG4gXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRCb2FyZEdyaWQsXHJcbiAgICAgICAgZ2V0Qm9hcmRTaGlwcyxcclxuICAgICAgICBjcmVhdGVTaGlwLFxyXG4gICAgICAgIHBvcHVsYXRlR2FtZWJvYXJkLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyLFxyXG4gICAgICAgIGlzQWxsU2hpcHNTdW5rLFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQbGF5ZXIobmFtZSl7XHJcbiAgICBjb25zdCBfcGxheWVyTmFtZSA9IG5hbWVcclxuXHJcbiAgICBsZXQgX2dhbWVib2FyZFxyXG5cclxuICAgIGxldCBfYXR0YWNrZWRTcXVhcmVzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfcGxheWVyTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfZ2FtZWJvYXJkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0QXR0YWNrZWRTcXVhcmVzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9hdHRhY2tlZFNxdWFyZXNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXRBdHRhY2tlZFNxdWFyZXMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBfYXR0YWNrZWRTcXVhcmVzLnB1c2goY29vcmRzKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUdhbWVCb2FyZCA9ICguLi5jb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgX2dhbWVib2FyZCA9IEdhbWVib2FyZCgpXHJcbiAgICAgICAgX2dhbWVib2FyZC5wb3B1bGF0ZUdhbWVib2FyZChjb29yZGluYXRlcylcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3Qgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGlmKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGNvb3JkcykpIHJldHVybiBudWxsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICAgICAgY29uc3QgYm9hcmRHcmlkID0gT2JqZWN0LmtleXMoZ2FtZWJvYXJkLmdldEJvYXJkR3JpZCgpKVxyXG4gICAgICAgIGNvbnN0IEJPQVJEX0dSSURfTEVOR1RIID0gYm9hcmRHcmlkLmxlbmd0aFxyXG5cclxuICAgICAgICBsZXQgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIHdoaWxlKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGJvYXJkR3JpZFtpbmRleF0pKXtcclxuICAgICAgICAgICAgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMoYm9hcmRHcmlkW2luZGV4XSlcclxuICAgICAgICByZXR1cm4gYm9hcmRHcmlkW2luZGV4XVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbU51bWJlciA9IChtYXgsbWluKSA9PntcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNQbGF5ZXJEZWZlYXRlZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAoX2dhbWVib2FyZC5nZXRCb2FyZFNoaXBzKCkubGVuZ3RoID09PSAwKSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybntcclxuICAgICAgICBnZXROYW1lLFxyXG4gICAgICAgIGdldEdhbWVib2FyZCxcclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMsXHJcbiAgICAgICAgY3JlYXRlR2FtZUJvYXJkLFxyXG4gICAgICAgIHNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUsXHJcbiAgICAgICAgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBpc1BsYXllckRlZmVhdGVkXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gU2hpcCguLi5jb29yZGluYXRlcyl7XHJcblxyXG4gICAgbGV0IF9zaGlwQ29vcmQgPSBjb29yZGluYXRlc1xyXG5cclxuICAgIGNvbnN0IF9TSElQX05BTUVTID0ge1xyXG4gICAgICAgIDEgOiAnU3B5JyxcclxuICAgICAgICAyIDogJ0Rlc3Ryb3llcicsXHJcbiAgICAgICAgMyA6ICdDcnVpc2VyJyxcclxuICAgICAgICA0IDogJ0JhdHRsZXNoaXAnLFxyXG4gICAgICAgIDUgOiAnQ2FycmllcidcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBfc2hpcE5hbWUgPSBfU0hJUF9OQU1FU1tfc2hpcENvb3JkLmxlbmd0aF1cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0U2hpcE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgZ2V0U2hpcENvb3JkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmRcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gSW5jb21pbmcgcXVlcnkgKGFzc2VydCByZXN1bHQgPiB0ZXN0ZWQgd2l0aCByZW1vdmVTcXVhcmVIaXQpXHJcbiAgICBjb25zdCBmaW5kSGl0SW5kZXggPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkcykgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFNlbGYgY29tbWFuZCB4XHJcbiAgICBjb25zdCByZW1vdmVTcXVhcmVIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBjb25zdCBpbmRleENvb3JkID0gZmluZEhpdEluZGV4KGNvb3JkcylcclxuICAgICAgICBfc2hpcENvb3JkID0gX3NoaXBDb29yZC5maWx0ZXIoY29vcmQgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmQpICE9PSBpbmRleENvb3JkIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHVyZSAvIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGlzU3Vua05leHRIaXQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5sZW5ndGggPT09IDEgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRTaGlwTmFtZSxcclxuICAgICAgICBnZXRTaGlwQ29vcmQsXHJcbiAgICAgICAgaXNTdW5rTmV4dEhpdCxcclxuICAgICAgICByZW1vdmVTcXVhcmVIaXRcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcmVuZGVyVHVybiAodHVybkRhdGEsZXZlbnQpe1xyXG4gICAgY29uc3QgeyBwbGF5ZXJEYXRhLGNvbXB1dGVyRGF0YSwgYXR0YWNrZWRFbGVtZW50IH0gPSBcclxuICAgICAgICByZXRyaWV2ZVR1cm5EYXRhKHR1cm5EYXRhKVxyXG5cclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhwbGF5ZXJEYXRhLCBldmVudC50YXJnZXQpXHJcbiAgICByZW5kZXJCb2FyZFNxdWFyZXMoY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQpXHJcblxyXG4gICAgcmVuZGVyVHVybkluZm8odHVybkRhdGEsdHVybkRhdGEucGxheWVyMSlcclxufVxyXG5cclxuY29uc3QgcmV0cmlldmVUdXJuRGF0YSA9ICh0dXJuRGF0YSkgPT57XHJcbiAgICBjb25zdCBwbGF5ZXJEYXRhICAgICAgPSB0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyRGF0YSAgICA9IHR1cm5EYXRhLmlzQ29tcHV0ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgPSB0dXJuRGF0YS5jb21wdXRlckNvb3Jkc1xyXG4gICAgY29uc3QgYXR0YWNrZWRFbGVtZW50ID0gZmluZEhpdEVsZW1lbnQoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgcmV0dXJuIHsgcGxheWVyRGF0YSxjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudCB9XHJcbn1cclxuXHJcbmNvbnN0IGZpbmRIaXRFbGVtZW50ID0gKGNvb3JkcykgPT57XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllcjEgPiAjJHtjb29yZHN9YClcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRTcXVhcmVzID0gKHR1cm5EYXRhLCBlbGVtZW50KSA9PntcclxuICAgIGlmKGlzSGl0RWxlbWVudChlbGVtZW50KSkgcmV0dXJuICBcclxuICAgICh0dXJuRGF0YSkgPyByZW5kZXJTcXVhcmVPbk1pc3MoZWxlbWVudCkgOiByZW5kZXJTcXVhcmVPbkhpdChlbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCBpc0hpdEVsZW1lbnQgPSAoZWxlbWVudCkgPT57XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJCb2FyZE9uUmVzZXQgPSAoKSA9PntcclxuICBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3F1YXJlT25IaXQgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uTWlzcyAgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwT25TaW5rID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5jb25zdCByZW5kZXJNYXRjaEluZm8gPSAoKSA9PntcclxufVxyXG5cclxuY29uc3QgcmVuZGVyVHVybkluZm8gPSAodHVybkRhdGEscGxheWVyMSkgPT57XHJcbiAgICBjb25zdCBtYXRjaEluZm9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXRjaC1pbmZvJylcclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5nZXROYW1lKCl9IGF0dGFjayBpcyBhIGAgKyBcclxuICAgICh0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3MgPyAnbWlzcyEnIDogJ2hpdCEnKVxyXG4gIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJXYXJuaW5nc0luZm8gPSAoKSA9PntcclxuXHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclN0YXRpY0VsZW1lbnRzKGdhbWVib2FyZCwgcGxheWVyMSwgcGxheWVyMil7XHJcbiAgICByZW5kZXJTaGlwcyhnYW1lYm9hcmQpXHJcbiAgICByZW5kZXJQbGF5ZXJOYW1lcyhwbGF5ZXIxLCBwbGF5ZXIyKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwcyA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgbGV0IGluZGV4ID0gMFxyXG4gICAgbGV0IGJvYXJkR3JpZCA9IGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKVxyXG4gICAgbGV0IGdyaWROb2RlTGlzdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhib2FyZEdyaWQpKXtcclxuICAgICAgICBpZihib2FyZEdyaWRba2V5XSl7XHJcbiAgICAgICAgICAgIGdyaWROb2RlTGlzdFtpbmRleF0uY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4KytcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgcmVuZGVyUGxheWVyTmFtZXMgPSAocGxheWVyMSwgcGxheWVyMikgPT57XHJcbiAgICBjb25zdCBwbGF5ZXIxTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxLW5hbWUnKVxyXG4gICAgY29uc3QgcGxheWVyMk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMi1uYW1lJylcclxuXHJcbiAgICBwbGF5ZXIxTmFtZS50ZXh0Q29udGVudCA9IHBsYXllcjEuZ2V0TmFtZSgpICsgJyBcXCdzIGZsZWV0J1xyXG4gICAgcGxheWVyMk5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXIyLmdldE5hbWUoKSArICcgXFwncyBmbGVldCdcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9