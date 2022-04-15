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
        square.addEventListener('click', event =>{
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
/* harmony import */ var _view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/renderDynamicElements */ "./src/view/renderDynamicElements.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/logic/player.js");
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../src/index */ "./src/index.js");





function Game (){

    const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_2__.Player)('Victor')
    player1.createGameBoard(
        ['H8'],
        ['C5','H6'],
        ['B7','D1','H1'],
        ['C6','A5','D8','D2'],
        ['E1','E2','E3','E4','A5']
    )
    const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_2__.Player)('Computer')
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
            (0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_1__.renderMatchResult)({player1,player2})
            finishMatch()
            return null
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
        setTimeout(_src_index__WEBPACK_IMPORTED_MODULE_3__.executeGame,2000)
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
        ship.getShipCoord().forEach(coord =>{
            Object.keys(_boardGrid).forEach(key =>{
                if(key === coord) {_boardGrid[key] = true} 
            })       
        })
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
            if(key === coords && _boardGrid[key]) { return true }   
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
/* harmony export */   "renderMatchResult": () => (/* binding */ renderMatchResult),
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

const renderSquareOnHit = (element) =>{
    element.classList.remove('ship')
    element.classList.add('hit')
}
  
const renderSquareOnMiss  = (element) =>{
    element.classList.add('miss')
}

const renderMatchResult = (playerData) =>{
    const winner = playerData.player1.isPlayerDefeated() 
        ? 'Computer'
        : playerData.player1.getName()   

    const matchInfoEl = document.querySelector('.turn-info')
    matchInfoEl.textContent = `${winner}` + ' is the winner!' 
}

const renderTurnInfo = (turnData,player1) =>{
    const matchInfoEl = document.querySelector('.turn-info')
    matchInfoEl.textContent = `${player1.getName()} attack is a ` + 
  (turnData.isPlayerAttackMiss ? 'miss!' : 'hit!')
  
}


const dragShips = () =>{

}

const renderWarningsInfo = () =>{
}

const renderShipOnSink = () =>{

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
    renderBoardOnReset()
    renderShips(gameboard)
    renderPlayerNames(player1, player2)
}

const renderShips = (gameboard) =>{
    let index = 0
    const boardGrid = gameboard.getBoardGrid()
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    for(const [key] of Object.entries(boardGrid)){
        if(boardGrid[key]){
            boardGridArray[index].classList.add('ship')
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

const renderBoardOnReset = () =>{
    const boardGridArray1 = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    const boardGridArray2 = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    const matchInfoEl = document.querySelector('.turn-info')

    boardGridArray1.forEach(square =>{
        square.classList.remove('ship')
        square.classList.remove('hit')
        square.classList.remove('miss')
    })
    boardGridArray2.forEach(square =>{
        square.classList.remove('hit')
        square.classList.remove('miss')
    }) 

    matchInfoEl.textContent =  ''
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7VUMxQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9hZGRFdmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvc2hpcC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlclN0YXRpY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2xvZ2ljL2dhbWUnXHJcbmltcG9ydCB7IGFkZEV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9sb2dpYy9hZGRFdmVudExpc3RlbmVycydcclxuXHJcblxyXG5jb25zdCBleGVjdXRlR2FtZSA9ICgpID0+e1xyXG4gICAgY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoZ2FtZSlcclxufVxyXG5cclxuZXhlY3V0ZUdhbWUoKVxyXG5cclxuZXhwb3J0IHtleGVjdXRlR2FtZX0iLCJpbXBvcnQgeyByZW5kZXJUdXJuIH0gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzIChnYW1lKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzQ29tcHV0ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc0NvbXB1dGVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+e1xyXG4gICAgICAgICAgICBjb25zdCB0dXJuRGF0YSA9IGdhbWUuZ2FtZVR1cm4oZXZlbnQudGFyZ2V0LmlkKVxyXG4gICAgICAgICAgICBpZih0dXJuRGF0YSA9PT0gbnVsbCkgcmV0dXJuICAgICAgXHJcbiAgICAgICAgICAgIHJlbmRlclR1cm4odHVybkRhdGEsZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn0iLCJpbXBvcnQgeyByZW5kZXJTdGF0aWNFbGVtZW50cyB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMnXHJcbmltcG9ydCB7IHJlbmRlck1hdGNoUmVzdWx0IH0gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xyXG5pbXBvcnQgeyBleGVjdXRlR2FtZSB9IGZyb20gJy9zcmMvaW5kZXgnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2FtZSAoKXtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXIxID0gUGxheWVyKCdWaWN0b3InKVxyXG4gICAgcGxheWVyMS5jcmVhdGVHYW1lQm9hcmQoXHJcbiAgICAgICAgWydIOCddLFxyXG4gICAgICAgIFsnQzUnLCdINiddLFxyXG4gICAgICAgIFsnQjcnLCdEMScsJ0gxJ10sXHJcbiAgICAgICAgWydDNicsJ0E1JywnRDgnLCdEMiddLFxyXG4gICAgICAgIFsnRTEnLCdFMicsJ0UzJywnRTQnLCdBNSddXHJcbiAgICApXHJcbiAgICBjb25zdCBwbGF5ZXIyID0gUGxheWVyKCdDb21wdXRlcicpXHJcbiAgICBwbGF5ZXIyLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICBbJ0c4J10sXHJcbiAgICAgICAgWydCMScsJ0IyJ10sXHJcbiAgICAgICAgWydDMScsJ0MyJywnQzMnXSxcclxuICAgICAgICBbJ0QxJywnRDInLCdEMycsJ0Q0J10sXHJcbiAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0U1J11cclxuICAgIClcclxuXHJcbiAgICBsZXQgZ2FtZWJvYXJkMSAgICAgPSBwbGF5ZXIxLmdldEdhbWVib2FyZCgpXHJcbiAgICBsZXQgZ2FtZWJvYXJkMiAgICAgPSBwbGF5ZXIyLmdldEdhbWVib2FyZCgpXHJcbiAgICBsZXQgcGxheWVySW5UdXJuICAgPSBwbGF5ZXIxXHJcbiAgICBsZXQgZW5lbXlHYW1lYm9hcmQgPSBnYW1lYm9hcmQyXHJcblxyXG4gICAgcmVuZGVyU3RhdGljRWxlbWVudHMoZ2FtZWJvYXJkMSwgcGxheWVyMSwgcGxheWVyMilcclxuXHJcbiAgICBjb25zdCBnYW1lVHVybiA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGNvbnN0IHBsYXllckNvb3JkcyA9IHBsYXllckluVHVybi5zZW5kQXR0YWNrQ29vcmRzVG9HYW1lKGNvb3JkcylcclxuICAgICAgICBpZihwbGF5ZXJDb29yZHMgPT09IG51bGwpIHJldHVybiBudWxsXHJcbiAgXHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJBdHRhY2tNaXNzICAgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihwbGF5ZXJDb29yZHMpIFxyXG4gICAgICAgIHBsYXllckluVHVybiAgICAgICAgICAgICAgID0gc3dpdGNoUGxheWVycygpXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgICAgICAgICAgICAgPSBzd2l0Y2hHYW1lYm9hcmRzKClcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgICAgICA9IHBsYXllckluVHVybi5zZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lKGVuZW15R2FtZWJvYXJkKVxyXG4gICAgICAgIGNvbnN0IGlzQ29tcHV0ZXJBdHRhY2tNaXNzID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIoY29tcHV0ZXJDb29yZHMpXHJcbiAgICAgICAgcGxheWVySW5UdXJuICAgICAgICAgICAgICAgPSBzd2l0Y2hQbGF5ZXJzKClcclxuICAgICAgICBlbmVteUdhbWVib2FyZCAgICAgICAgICAgICA9IHN3aXRjaEdhbWVib2FyZHMoKVxyXG5cclxuICAgICAgICBpZihpc0FueVBsYXllckRlZmVhdGVkKCkpe1xyXG4gICAgICAgICAgICByZW5kZXJNYXRjaFJlc3VsdCh7cGxheWVyMSxwbGF5ZXIyfSlcclxuICAgICAgICAgICAgZmluaXNoTWF0Y2goKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwbGF5ZXIxLFxyXG4gICAgICAgICAgICBpc1BsYXllckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGlzQ29tcHV0ZXJBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBjb21wdXRlckNvb3Jkc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hQbGF5ZXJzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gcGxheWVyMSA6IHBsYXllcjJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hHYW1lYm9hcmRzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gZ2FtZWJvYXJkMSA6IGdhbWVib2FyZDJcclxuICAgIH0gICBcclxuXHJcbiAgICBjb25zdCBpc0FueVBsYXllckRlZmVhdGVkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIHx8IHBsYXllcjIuaXNQbGF5ZXJEZWZlYXRlZCgpXHJcbiAgICB9IFxyXG5cclxuICAgIGNvbnN0IGZpbmlzaE1hdGNoID0gKCkgPT57XHJcbiAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmcm9tIGJvYXJkXHJcbiAgICAgICAgc2V0VGltZW91dChleGVjdXRlR2FtZSwyMDAwKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybntnYW1lVHVybn1cclxufVxyXG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xyXG5leHBvcnQgZnVuY3Rpb24gR2FtZWJvYXJkKCl7ICAgIFxyXG4gICBcclxuICAgIGxldCBfYm9hcmRHcmlkID0gXHJcbiAgICB7XHJcbiAgICAgICAgJ0ExJzogZmFsc2UsICdBMic6IGZhbHNlLCAnQTMnOiBmYWxzZSwgJ0E0JzogZmFsc2UsICdBNSc6IGZhbHNlLCAnQTYnOiBmYWxzZSwgJ0E3JzogZmFsc2UsICdBOCc6IGZhbHNlLCBcclxuICAgICAgICAnQjEnOiBmYWxzZSwgJ0IyJzogZmFsc2UsICdCMyc6IGZhbHNlLCAnQjQnOiBmYWxzZSwgJ0I1JzogZmFsc2UsICdCNic6IGZhbHNlLCAnQjcnOiBmYWxzZSwgJ0I4JzogZmFsc2UsIFxyXG4gICAgICAgICdDMSc6IGZhbHNlLCAnQzInOiBmYWxzZSwgJ0MzJzogZmFsc2UsICdDNCc6IGZhbHNlLCAnQzUnOiBmYWxzZSwgJ0M2JzogZmFsc2UsICdDNyc6IGZhbHNlLCAnQzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0QxJzogZmFsc2UsICdEMic6IGZhbHNlLCAnRDMnOiBmYWxzZSwgJ0Q0JzogZmFsc2UsICdENSc6IGZhbHNlLCAnRDYnOiBmYWxzZSwgJ0Q3JzogZmFsc2UsICdEOCc6IGZhbHNlLCBcclxuICAgICAgICAnRTEnOiBmYWxzZSwgJ0UyJzogZmFsc2UsICdFMyc6IGZhbHNlLCAnRTQnOiBmYWxzZSwgJ0U1JzogZmFsc2UsICdFNic6IGZhbHNlLCAnRTcnOiBmYWxzZSwgJ0U4JzogZmFsc2UsIFxyXG4gICAgICAgICdGMSc6IGZhbHNlLCAnRjInOiBmYWxzZSwgJ0YzJzogZmFsc2UsICdGNCc6IGZhbHNlLCAnRjUnOiBmYWxzZSwgJ0Y2JzogZmFsc2UsICdGNyc6IGZhbHNlLCAnRjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0cxJzogZmFsc2UsICdHMic6IGZhbHNlLCAnRzMnOiBmYWxzZSwgJ0c0JzogZmFsc2UsICdHNSc6IGZhbHNlLCAnRzYnOiBmYWxzZSwgJ0c3JzogZmFsc2UsICdHOCc6IGZhbHNlLCBcclxuICAgICAgICAnSDEnOiBmYWxzZSwgJ0gyJzogZmFsc2UsICdIMyc6IGZhbHNlLCAnSDQnOiBmYWxzZSwgJ0g1JzogZmFsc2UsICdINic6IGZhbHNlLCAnSDcnOiBmYWxzZSwgJ0g4JzogZmFsc2UgXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IF9ib2FyZFNoaXBzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0Qm9hcmRHcmlkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZEdyaWRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRCb2FyZFNoaXBzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcHVsYXRlR2FtZWJvYXJkID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUoIGluZGV4IDwgY29vcmRpbmF0ZXMubGVuZ3RoICl7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXAoLi4uY29vcmRpbmF0ZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KSBYXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwID0gKC4uLmNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBpZihpc0Nvb3Jkc0F2YWlsYWJsZShjb29yZGluYXRlcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwICA9IFNoaXAoLi4uY29vcmRpbmF0ZXMpIFxyXG4gICAgICAgICAgICBfYm9hcmRTaGlwcyA9IGFkZFNoaXBUb1NoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0KHNoaXApXHJcbiAgICAgICAgICAgIHJldHVybiBzaGlwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBJbmNvbWluZy1xdWVyeSAoYXNzZXJ0IHJlc3VsdClcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyID0gKGNvb3Jkcyk9PntcclxuICAgICAgICBpZihpc0F0dGFja1ZhbGlkKGNvb3JkcykgJiYgaXNTaGlwSGl0KGNvb3Jkcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZmluZFNoaXBCeUNvb3Jkcyhjb29yZHMpXHJcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rTmV4dEhpdCgpKXtcclxuICAgICAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5KHNoaXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNoaXBTcXVhcmUoY29vcmRzLHNoaXApXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNoaXBTcXVhcmUgPSAoY29vcmRzLHNoaXApID0+e1xyXG4gICAgICAgIHNoaXAucmVtb3ZlU3F1YXJlSGl0KGNvb3JkcylcclxuICAgICAgICByZXR1cm4gcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdChjb29yZHMpXHJcbiAgICB9XHJcbiBcclxuICAgIC8vIFF1ZXJ5ICYgQ29tbWFuZCBzZWxmIHhcclxuICAgIGNvbnN0IGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdCA9IChzaGlwKSA9PntcclxuICAgICAgICBzaGlwLmdldFNoaXBDb29yZCgpLmZvckVhY2goY29vcmQgPT57XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKF9ib2FyZEdyaWQpLmZvckVhY2goa2V5ID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZCkge19ib2FyZEdyaWRba2V5XSA9IHRydWV9IFxyXG4gICAgICAgICAgICB9KSAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZFNoaXBUb1NoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIFsuLi5fYm9hcmRTaGlwcyxzaGlwXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QgPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7Li4uX2JvYXJkR3JpZH0sIHtbYCR7Y29vcmRzfWBdOiAnSGl0J30pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGZpbmRTaGlwSW5kZXhCeU5hbWUoc2hpcClcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmlsdGVyKGFycmF5U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmluZGV4T2YoYXJyYXlTaGlwKSAhPT0gc2hpcEluZGV4IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiBcclxuICAgIGNvbnN0IGZpbmRTaGlwQnlDb29yZHMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZChzaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gc2hpcC5nZXRTaGlwQ29vcmQoKS5pbmNsdWRlcyhjb29yZHMpICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmluZFNoaXBJbmRleEJ5TmFtZSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZEluZGV4KGN1cnJlbnRTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFNoaXAuZ2V0U2hpcE5hbWUoKSA9PT0gc2hpcC5nZXRTaGlwTmFtZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc1NoaXBIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3JkcyAmJiBfYm9hcmRHcmlkW2tleV0pIHsgcmV0dXJuIHRydWUgfSAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0FsbFNoaXBzU3VuayA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAoX2JvYXJkU2hpcHMubGVuZ3RoID09PSAwKSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzQ29vcmRzQXZhaWxhYmxlID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgbGV0IGluZGV4QXJyYXkgPSAwXHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHNbaW5kZXhBcnJheV0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBpc0F0dGFja1ZhbGlkID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID09PSAnSGl0Jz8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbiBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0Qm9hcmRHcmlkLFxyXG4gICAgICAgIGdldEJvYXJkU2hpcHMsXHJcbiAgICAgICAgY3JlYXRlU2hpcCxcclxuICAgICAgICBwb3B1bGF0ZUdhbWVib2FyZCxcclxuICAgICAgICByZWNlaXZlQXR0YWNrRnJvbVBsYXllcixcclxuICAgICAgICBpc0FsbFNoaXBzU3VuayxcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUpe1xyXG4gICAgY29uc3QgX3BsYXllck5hbWUgPSBuYW1lXHJcblxyXG4gICAgbGV0IF9nYW1lYm9hcmRcclxuXHJcbiAgICBsZXQgX2F0dGFja2VkU3F1YXJlcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3BsYXllck5hbWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2dhbWVib2FyZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEF0dGFja2VkU3F1YXJlcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYXR0YWNrZWRTcXVhcmVzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2V0QXR0YWNrZWRTcXVhcmVzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgX2F0dGFja2VkU3F1YXJlcy5wdXNoKGNvb3JkcylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoLi4uY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIF9nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIF9nYW1lYm9hcmQucG9wdWxhdGVHYW1lYm9hcmQoY29vcmRpbmF0ZXMpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNlbmRBdHRhY2tDb29yZHNUb0dhbWUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBpZihnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhjb29yZHMpKSByZXR1cm4gbnVsbFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgICAgIGNvbnN0IGJvYXJkR3JpZCA9IE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCA9IGJvYXJkR3JpZC5sZW5ndGhcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB3aGlsZShnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhib2FyZEdyaWRbaW5kZXhdKSl7XHJcbiAgICAgICAgICAgIGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGJvYXJkR3JpZFtpbmRleF0pXHJcbiAgICAgICAgcmV0dXJuIGJvYXJkR3JpZFtpbmRleF1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGVSYW5kb21OdW1iZXIgPSAobWF4LG1pbikgPT57XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKF9nYW1lYm9hcmQuZ2V0Qm9hcmRTaGlwcygpLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBnZXRHYW1lYm9hcmQsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzLFxyXG4gICAgICAgIGNyZWF0ZUdhbWVCb2FyZCxcclxuICAgICAgICBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIHNlbmRBdHRhY2tDb29yZHNUb0dhbWUsXHJcbiAgICAgICAgaXNQbGF5ZXJEZWZlYXRlZFxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIFNoaXAoLi4uY29vcmRpbmF0ZXMpe1xyXG5cclxuICAgIGxldCBfc2hpcENvb3JkID0gY29vcmRpbmF0ZXNcclxuXHJcbiAgICBjb25zdCBfU0hJUF9OQU1FUyA9IHtcclxuICAgICAgICAxIDogJ1NweScsXHJcbiAgICAgICAgMiA6ICdEZXN0cm95ZXInLFxyXG4gICAgICAgIDMgOiAnQ3J1aXNlcicsXHJcbiAgICAgICAgNCA6ICdCYXR0bGVzaGlwJyxcclxuICAgICAgICA1IDogJ0NhcnJpZXInXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX3NoaXBOYW1lID0gX1NISVBfTkFNRVNbX3NoaXBDb29yZC5sZW5ndGhdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldFNoaXBOYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGdldFNoaXBDb29yZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEluY29taW5nIHF1ZXJ5IChhc3NlcnQgcmVzdWx0ID4gdGVzdGVkIHdpdGggcmVtb3ZlU3F1YXJlSGl0KVxyXG4gICAgY29uc3QgZmluZEhpdEluZGV4ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZHMpICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTZWxmIGNvbW1hbmQgeFxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgY29uc3QgaW5kZXhDb29yZCA9IGZpbmRIaXRJbmRleChjb29yZHMpXHJcbiAgICAgICAgX3NoaXBDb29yZCA9IF9zaGlwQ29vcmQuZmlsdGVyKGNvb3JkID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkKSAhPT0gaW5kZXhDb29yZCBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1cmUgLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBpc1N1bmtOZXh0SGl0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQubGVuZ3RoID09PSAxID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0U2hpcE5hbWUsXHJcbiAgICAgICAgZ2V0U2hpcENvb3JkLFxyXG4gICAgICAgIGlzU3Vua05leHRIaXQsXHJcbiAgICAgICAgcmVtb3ZlU3F1YXJlSGl0XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IGludGVyYWN0IGZyb20gJ2ludGVyYWN0anMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVHVybiAodHVybkRhdGEsZXZlbnQpe1xyXG4gICAgY29uc3QgeyBwbGF5ZXJEYXRhLGNvbXB1dGVyRGF0YSwgYXR0YWNrZWRFbGVtZW50IH0gPSBcclxuICAgICAgICByZXRyaWV2ZVR1cm5EYXRhKHR1cm5EYXRhKVxyXG5cclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhwbGF5ZXJEYXRhLCBldmVudC50YXJnZXQpXHJcbiAgICByZW5kZXJCb2FyZFNxdWFyZXMoY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQpXHJcblxyXG4gICAgcmVuZGVyVHVybkluZm8odHVybkRhdGEsdHVybkRhdGEucGxheWVyMSlcclxufVxyXG5cclxuY29uc3QgcmV0cmlldmVUdXJuRGF0YSA9ICh0dXJuRGF0YSkgPT57XHJcbiAgICBjb25zdCBwbGF5ZXJEYXRhICAgICAgPSB0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyRGF0YSAgICA9IHR1cm5EYXRhLmlzQ29tcHV0ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgPSB0dXJuRGF0YS5jb21wdXRlckNvb3Jkc1xyXG4gICAgY29uc3QgYXR0YWNrZWRFbGVtZW50ID0gZmluZEhpdEVsZW1lbnQoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgcmV0dXJuIHsgcGxheWVyRGF0YSxjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudCB9XHJcbn1cclxuXHJcbmNvbnN0IGZpbmRIaXRFbGVtZW50ID0gKGNvb3JkcykgPT57XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllcjEgPiAjJHtjb29yZHN9YClcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRTcXVhcmVzID0gKHR1cm5EYXRhLCBlbGVtZW50KSA9PntcclxuICAgIGlmKGlzSGl0RWxlbWVudChlbGVtZW50KSkgcmV0dXJuICBcclxuICAgICh0dXJuRGF0YSkgPyByZW5kZXJTcXVhcmVPbk1pc3MoZWxlbWVudCkgOiByZW5kZXJTcXVhcmVPbkhpdChlbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCBpc0hpdEVsZW1lbnQgPSAoZWxlbWVudCkgPT57XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTcXVhcmVPbkhpdCA9IChlbGVtZW50KSA9PntcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXHJcbn1cclxuICBcclxuY29uc3QgcmVuZGVyU3F1YXJlT25NaXNzICA9IChlbGVtZW50KSA9PntcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWlzcycpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJNYXRjaFJlc3VsdCA9IChwbGF5ZXJEYXRhKSA9PntcclxuICAgIGNvbnN0IHdpbm5lciA9IHBsYXllckRhdGEucGxheWVyMS5pc1BsYXllckRlZmVhdGVkKCkgXHJcbiAgICAgICAgPyAnQ29tcHV0ZXInXHJcbiAgICAgICAgOiBwbGF5ZXJEYXRhLnBsYXllcjEuZ2V0TmFtZSgpICAgXHJcblxyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gYCR7d2lubmVyfWAgKyAnIGlzIHRoZSB3aW5uZXIhJyBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyVHVybkluZm8gPSAodHVybkRhdGEscGxheWVyMSkgPT57XHJcbiAgICBjb25zdCBtYXRjaEluZm9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXJuLWluZm8nKVxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLmdldE5hbWUoKX0gYXR0YWNrIGlzIGEgYCArIFxyXG4gICh0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3MgPyAnbWlzcyEnIDogJ2hpdCEnKVxyXG4gIFxyXG59XHJcblxyXG5cclxuY29uc3QgZHJhZ1NoaXBzID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5jb25zdCByZW5kZXJXYXJuaW5nc0luZm8gPSAoKSA9PntcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcE9uU2luayA9ICgpID0+e1xyXG5cclxufSIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdGF0aWNFbGVtZW50cyhnYW1lYm9hcmQsIHBsYXllcjEsIHBsYXllcjIpe1xyXG4gICAgcmVuZGVyQm9hcmRPblJlc2V0KClcclxuICAgIHJlbmRlclNoaXBzKGdhbWVib2FyZClcclxuICAgIHJlbmRlclBsYXllck5hbWVzKHBsYXllcjEsIHBsYXllcjIpXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBzID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICBsZXQgaW5kZXggPSAwXHJcbiAgICBjb25zdCBib2FyZEdyaWQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmRHcmlkKClcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKGJvYXJkR3JpZCkpe1xyXG4gICAgICAgIGlmKGJvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgYm9hcmRHcmlkQXJyYXlbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleCsrXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclBsYXllck5hbWVzID0gKHBsYXllcjEsIHBsYXllcjIpID0+e1xyXG4gICAgY29uc3QgcGxheWVyMU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMS1uYW1lJylcclxuICAgIGNvbnN0IHBsYXllcjJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjItbmFtZScpXHJcblxyXG4gICAgcGxheWVyMU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXIxLmdldE5hbWUoKSArICcgXFwncyBmbGVldCdcclxuICAgIHBsYXllcjJOYW1lLnRleHRDb250ZW50ID0gcGxheWVyMi5nZXROYW1lKCkgKyAnIFxcJ3MgZmxlZXQnXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkT25SZXNldCA9ICgpID0+e1xyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkxID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuXHJcbiAgICBib2FyZEdyaWRBcnJheTEuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJylcclxuICAgIH0pXHJcbiAgICBib2FyZEdyaWRBcnJheTIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKVxyXG4gICAgfSkgXHJcblxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSAgJydcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9