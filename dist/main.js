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
/* harmony import */ var _logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/handleEventListeners */ "./src/logic/handleEventListeners.js");




const executeGame = () =>{
    const game = (0,_logic_game__WEBPACK_IMPORTED_MODULE_0__.Game)()
    ;(0,_logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__.addEventListenersBoardClick)(game)
    ;(0,_logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__.addEventListenerDraggable)()
    ;(0,_logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__.addEventListenersBoardDrag)()
}

executeGame()



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
/* harmony import */ var _handleEventListeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handleEventListeners */ "./src/logic/handleEventListeners.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/logic/player.js");
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../src/index */ "./src/index.js");






function Game (){
    const el = document.querySelector('.gameboard-grid.player2')
    el.classList.remove('unclickable')
    const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_3__.Player)('Victor')
    player1.createGameBoard(
        ['H8'],
        ['C5','H6'],
        ['B7','D1','H1'],
        ['C6','A5','D8','D2'],
        ['E1','E2','E3','E4','A5']
    )
    const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_3__.Player)('Computer')
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
            el.classList.add('unclickable')
            ;(0,_handleEventListeners__WEBPACK_IMPORTED_MODULE_2__.removeEventListeners)()
            ;(0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_1__.renderMatchResult)({player1,player2})
            prepareNextMatch()
            
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

    const prepareNextMatch = () =>{
        // Remove event listeners from board
        setTimeout(_src_index__WEBPACK_IMPORTED_MODULE_4__.executeGame,2000)
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

/***/ "./src/logic/handleEventListeners.js":
/*!*******************************************!*\
  !*** ./src/logic/handleEventListeners.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEventListenerDraggable": () => (/* binding */ addEventListenerDraggable),
/* harmony export */   "addEventListenersBoardClick": () => (/* binding */ addEventListenersBoardClick),
/* harmony export */   "addEventListenersBoardDrag": () => (/* binding */ addEventListenersBoardDrag),
/* harmony export */   "removeEventListeners": () => (/* binding */ removeEventListeners)
/* harmony export */ });
/* harmony import */ var _view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/renderDynamicElements */ "./src/view/renderDynamicElements.js");


function addEventListenersBoardClick (game){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square =>{
        square.addEventListener('click', event =>{
            processTurnData(game,event)
        })
    })
}

const processTurnData = (game,event) =>{
    const turnData = game.gameTurn(event.target.id)
    if(turnData === null) return      
    ;(0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderTurn)(turnData,event)
}

function addEventListenersBoardDrag (){
    const gridSquaresPlayer = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    gridSquaresPlayer.forEach(square =>{
        square.addEventListener('dragenter',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.dragEnter)
        square.addEventListener('dragover',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.dragOver)
        square.addEventListener('dragleave',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.dragLeave)
        square.addEventListener('drop',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.drop)

    })
}

function addEventListenerDraggable(){
    const ships = Array.from(document.querySelectorAll('.pool-ship.player1'))
    ships.forEach(ship=>
        ship.addEventListener('dragstart',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.dragStart))
}

function removeEventListeners (){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square =>{
        square.removeEventListener('click', processTurnData)
    })
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
/* harmony export */   "dragEnter": () => (/* binding */ dragEnter),
/* harmony export */   "dragLeave": () => (/* binding */ dragLeave),
/* harmony export */   "dragOver": () => (/* binding */ dragOver),
/* harmony export */   "dragStart": () => (/* binding */ dragStart),
/* harmony export */   "drop": () => (/* binding */ drop),
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

const renderMatchResult = (playerData) =>{
    const winner = playerData.player1.isPlayerDefeated() 
        ? 'Computer'
        : playerData.player1.getName()   

    const matchInfoEl = document.querySelector('.turn-info')
    matchInfoEl.textContent = `${winner}` + ' is the winner!' 
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

const renderTurnInfo = (turnData,player1) =>{
    const matchInfoEl = document.querySelector('.turn-info')
    matchInfoEl.textContent = `${player1.getName()} attack is a ` + 
  (turnData.isPlayerAttackMiss ? 'miss!' : 'hit!')
  
}

const renderWarningsInfo = () =>{
}

const renderShipOnSink = () =>{

}

function dragStart (event) {
    event.dataTransfer.setData('text/plain',event.target.id)
    setTimeout(() =>{
        event.target.classList.add('hide')
    },0)
}
function dragEnter (event) {
    event.preventDefault()
    event.target.classList.add('drag-over')
}
function dragOver (event) {
    event.preventDefault()
    event.target.classList.add('drag-over')

}
function dragLeave (event) {
    event.target.classList.remove('drag-over')

}
function drop (event) {
    event.target.classList.remove('drag-over')

    const id = event.dataTransfer.getData('text/plain')
    const draggable = document.getElementById(id)   
    event.target.appendChild(draggable)
    // TODO
    // if element carrier and vertical, add ship class to all 5 elements below the drop point
    // if element carrier and horizontal, add ship class to all 5 elements below the drop point
    event.target.classList.add('ship')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvaGFuZGxlRXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvcGxheWVyLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3NoaXAuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy9yZW5kZXJTdGF0aWNFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9sb2dpYy9nYW1lJ1xyXG5pbXBvcnQgeyBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlLCBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2ssIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnfSBmcm9tICcuL2xvZ2ljL2hhbmRsZUV2ZW50TGlzdGVuZXJzJ1xyXG5cclxuXHJcbmNvbnN0IGV4ZWN1dGVHYW1lID0gKCkgPT57XHJcbiAgICBjb25zdCBnYW1lID0gR2FtZSgpXHJcbiAgICBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2soZ2FtZSlcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJEcmFnZ2FibGUoKVxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcoKVxyXG59XHJcblxyXG5leGVjdXRlR2FtZSgpXHJcblxyXG5leHBvcnQge2V4ZWN1dGVHYW1lfSIsImltcG9ydCB7IHJlbmRlclN0YXRpY0VsZW1lbnRzIH0gZnJvbSAnLi4vdmlldy9yZW5kZXJTdGF0aWNFbGVtZW50cydcclxuaW1wb3J0IHsgcmVuZGVyTWF0Y2hSZXN1bHQgfSBmcm9tICcuLi92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cydcclxuaW1wb3J0IHsgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2hhbmRsZUV2ZW50TGlzdGVuZXJzJ1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcclxuaW1wb3J0IHsgZXhlY3V0ZUdhbWUgfSBmcm9tICcvc3JjL2luZGV4J1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCl7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQtZ3JpZC5wbGF5ZXIyJylcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VuY2xpY2thYmxlJylcclxuICAgIGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ1ZpY3RvcicpXHJcbiAgICBwbGF5ZXIxLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICBbJ0g4J10sXHJcbiAgICAgICAgWydDNScsJ0g2J10sXHJcbiAgICAgICAgWydCNycsJ0QxJywnSDEnXSxcclxuICAgICAgICBbJ0M2JywnQTUnLCdEOCcsJ0QyJ10sXHJcbiAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0E1J11cclxuICAgIClcclxuICAgIGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoJ0NvbXB1dGVyJylcclxuICAgIHBsYXllcjIuY3JlYXRlR2FtZUJvYXJkKFxyXG4gICAgICAgIFsnRzgnXSxcclxuICAgICAgICBbJ0IxJywnQjInXSxcclxuICAgICAgICBbJ0MxJywnQzInLCdDMyddLFxyXG4gICAgICAgIFsnRDEnLCdEMicsJ0QzJywnRDQnXSxcclxuICAgICAgICBbJ0UxJywnRTInLCdFMycsJ0U0JywnRTUnXVxyXG4gICAgKVxyXG5cclxuICAgIGxldCBnYW1lYm9hcmQxICAgICA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKClcclxuICAgIGxldCBnYW1lYm9hcmQyICAgICA9IHBsYXllcjIuZ2V0R2FtZWJvYXJkKClcclxuICAgIGxldCBwbGF5ZXJJblR1cm4gICA9IHBsYXllcjFcclxuICAgIGxldCBlbmVteUdhbWVib2FyZCA9IGdhbWVib2FyZDJcclxuXHJcbiAgICByZW5kZXJTdGF0aWNFbGVtZW50cyhnYW1lYm9hcmQxLCBwbGF5ZXIxLCBwbGF5ZXIyKVxyXG5cclxuICAgIGNvbnN0IGdhbWVUdXJuID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgY29uc3QgcGxheWVyQ29vcmRzID0gcGxheWVySW5UdXJuLnNlbmRBdHRhY2tDb29yZHNUb0dhbWUoY29vcmRzKVxyXG4gICAgICAgIGlmKHBsYXllckNvb3JkcyA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICBcclxuICAgICAgICBjb25zdCBpc1BsYXllckF0dGFja01pc3MgICA9IGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2tGcm9tUGxheWVyKHBsYXllckNvb3JkcykgXHJcbiAgICAgICAgcGxheWVySW5UdXJuICAgICAgICAgICAgICAgPSBzd2l0Y2hQbGF5ZXJzKClcclxuICAgICAgICBlbmVteUdhbWVib2FyZCAgICAgICAgICAgICA9IHN3aXRjaEdhbWVib2FyZHMoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ29vcmRzICAgICAgID0gcGxheWVySW5UdXJuLnNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUoZW5lbXlHYW1lYm9hcmQpXHJcbiAgICAgICAgY29uc3QgaXNDb21wdXRlckF0dGFja01pc3MgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihjb21wdXRlckNvb3JkcylcclxuICAgICAgICBwbGF5ZXJJblR1cm4gICAgICAgICAgICAgICA9IHN3aXRjaFBsYXllcnMoKVxyXG4gICAgICAgIGVuZW15R2FtZWJvYXJkICAgICAgICAgICAgID0gc3dpdGNoR2FtZWJvYXJkcygpXHJcblxyXG4gICAgICAgIGlmKGlzQW55UGxheWVyRGVmZWF0ZWQoKSl7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VuY2xpY2thYmxlJylcclxuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgICAgICAgICByZW5kZXJNYXRjaFJlc3VsdCh7cGxheWVyMSxwbGF5ZXIyfSlcclxuICAgICAgICAgICAgcHJlcGFyZU5leHRNYXRjaCgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwbGF5ZXIxLFxyXG4gICAgICAgICAgICBpc1BsYXllckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGlzQ29tcHV0ZXJBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBjb21wdXRlckNvb3Jkc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hQbGF5ZXJzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gcGxheWVyMSA6IHBsYXllcjJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hHYW1lYm9hcmRzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gZ2FtZWJvYXJkMSA6IGdhbWVib2FyZDJcclxuICAgIH0gICBcclxuXHJcbiAgICBjb25zdCBpc0FueVBsYXllckRlZmVhdGVkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIHx8IHBsYXllcjIuaXNQbGF5ZXJEZWZlYXRlZCgpXHJcbiAgICB9IFxyXG5cclxuICAgIGNvbnN0IHByZXBhcmVOZXh0TWF0Y2ggPSAoKSA9PntcclxuICAgICAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZyb20gYm9hcmRcclxuICAgICAgICBzZXRUaW1lb3V0KGV4ZWN1dGVHYW1lLDIwMDApXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue2dhbWVUdXJufVxyXG59XHJcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lYm9hcmQoKXsgICAgXHJcbiAgIFxyXG4gICAgbGV0IF9ib2FyZEdyaWQgPSBcclxuICAgIHtcclxuICAgICAgICAnQTEnOiBmYWxzZSwgJ0EyJzogZmFsc2UsICdBMyc6IGZhbHNlLCAnQTQnOiBmYWxzZSwgJ0E1JzogZmFsc2UsICdBNic6IGZhbHNlLCAnQTcnOiBmYWxzZSwgJ0E4JzogZmFsc2UsIFxyXG4gICAgICAgICdCMSc6IGZhbHNlLCAnQjInOiBmYWxzZSwgJ0IzJzogZmFsc2UsICdCNCc6IGZhbHNlLCAnQjUnOiBmYWxzZSwgJ0I2JzogZmFsc2UsICdCNyc6IGZhbHNlLCAnQjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0MxJzogZmFsc2UsICdDMic6IGZhbHNlLCAnQzMnOiBmYWxzZSwgJ0M0JzogZmFsc2UsICdDNSc6IGZhbHNlLCAnQzYnOiBmYWxzZSwgJ0M3JzogZmFsc2UsICdDOCc6IGZhbHNlLCBcclxuICAgICAgICAnRDEnOiBmYWxzZSwgJ0QyJzogZmFsc2UsICdEMyc6IGZhbHNlLCAnRDQnOiBmYWxzZSwgJ0Q1JzogZmFsc2UsICdENic6IGZhbHNlLCAnRDcnOiBmYWxzZSwgJ0Q4JzogZmFsc2UsIFxyXG4gICAgICAgICdFMSc6IGZhbHNlLCAnRTInOiBmYWxzZSwgJ0UzJzogZmFsc2UsICdFNCc6IGZhbHNlLCAnRTUnOiBmYWxzZSwgJ0U2JzogZmFsc2UsICdFNyc6IGZhbHNlLCAnRTgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0YxJzogZmFsc2UsICdGMic6IGZhbHNlLCAnRjMnOiBmYWxzZSwgJ0Y0JzogZmFsc2UsICdGNSc6IGZhbHNlLCAnRjYnOiBmYWxzZSwgJ0Y3JzogZmFsc2UsICdGOCc6IGZhbHNlLCBcclxuICAgICAgICAnRzEnOiBmYWxzZSwgJ0cyJzogZmFsc2UsICdHMyc6IGZhbHNlLCAnRzQnOiBmYWxzZSwgJ0c1JzogZmFsc2UsICdHNic6IGZhbHNlLCAnRzcnOiBmYWxzZSwgJ0c4JzogZmFsc2UsIFxyXG4gICAgICAgICdIMSc6IGZhbHNlLCAnSDInOiBmYWxzZSwgJ0gzJzogZmFsc2UsICdINCc6IGZhbHNlLCAnSDUnOiBmYWxzZSwgJ0g2JzogZmFsc2UsICdINyc6IGZhbHNlLCAnSDgnOiBmYWxzZSBcclxuICAgIH1cclxuXHJcbiAgICBsZXQgX2JvYXJkU2hpcHMgPSBbXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRCb2FyZEdyaWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkR3JpZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEJvYXJkU2hpcHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHNcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgcG9wdWxhdGVHYW1lYm9hcmQgPSAoY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICB3aGlsZSggaW5kZXggPCBjb29yZGluYXRlcy5sZW5ndGggKXtcclxuICAgICAgICAgICAgY3JlYXRlU2hpcCguLi5jb29yZGluYXRlc1tpbmRleF0pXHJcbiAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5jb21pbmctcXVlcnkgKGFzc2VydCByZXN1bHQpIFhcclxuICAgIGNvbnN0IGNyZWF0ZVNoaXAgPSAoLi4uY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGlmKGlzQ29vcmRzQXZhaWxhYmxlKGNvb3JkaW5hdGVzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgID0gU2hpcCguLi5jb29yZGluYXRlcykgXHJcbiAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gYWRkU2hpcFRvU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3Qoc2hpcClcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KVxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIgPSAoY29vcmRzKT0+e1xyXG4gICAgICAgIGlmKGlzQXR0YWNrVmFsaWQoY29vcmRzKSAmJiBpc1NoaXBIaXQoY29vcmRzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBmaW5kU2hpcEJ5Q29vcmRzKGNvb3JkcylcclxuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmtOZXh0SGl0KCkpe1xyXG4gICAgICAgICAgICAgICAgX2JvYXJkU2hpcHMgPSByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU2hpcFNxdWFyZShjb29yZHMsc2hpcClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU2hpcFNxdWFyZSA9IChjb29yZHMsc2hpcCkgPT57XHJcbiAgICAgICAgc2hpcC5yZW1vdmVTcXVhcmVIaXQoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgIH1cclxuIFxyXG4gICAgLy8gUXVlcnkgJiBDb21tYW5kIHNlbGYgeFxyXG4gICAgY29uc3QgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0ID0gKHNoaXApID0+e1xyXG4gICAgICAgIHNoaXAuZ2V0U2hpcENvb3JkKCkuZm9yRWFjaChjb29yZCA9PntcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoX2JvYXJkR3JpZCkuZm9yRWFjaChrZXkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihrZXkgPT09IGNvb3JkKSB7X2JvYXJkR3JpZFtrZXldID0gdHJ1ZX0gXHJcbiAgICAgICAgICAgIH0pICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkU2hpcFRvU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gWy4uLl9ib2FyZFNoaXBzLHNoaXBdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsuLi5fYm9hcmRHcmlkfSwge1tgJHtjb29yZHN9YF06ICdIaXQnfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gZmluZFNoaXBJbmRleEJ5TmFtZShzaGlwKVxyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maWx0ZXIoYXJyYXlTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuaW5kZXhPZihhcnJheVNoaXApICE9PSBzaGlwSW5kZXggXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuIFxyXG4gICAgY29uc3QgZmluZFNoaXBCeUNvb3JkcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maW5kKHNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBzaGlwLmdldFNoaXBDb29yZCgpLmluY2x1ZGVzKGNvb3JkcykgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaW5kU2hpcEluZGV4QnlOYW1lID0gKHNoaXApID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maW5kSW5kZXgoY3VycmVudFNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50U2hpcC5nZXRTaGlwTmFtZSgpID09PSBzaGlwLmdldFNoaXBOYW1lKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzU2hpcEhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzICYmIF9ib2FyZEdyaWRba2V5XSkgeyByZXR1cm4gdHJ1ZSB9ICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzQWxsU2hpcHNTdW5rID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChfYm9hcmRTaGlwcy5sZW5ndGggPT09IDApID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNDb29yZHNBdmFpbGFibGUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXhBcnJheSA9IDBcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkc1tpbmRleEFycmF5XSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9ib2FyZEdyaWRba2V5XSkgPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGlzQXR0YWNrVmFsaWQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkcyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9ib2FyZEdyaWRba2V5XSkgPT09ICdIaXQnPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRCb2FyZEdyaWQsXHJcbiAgICAgICAgZ2V0Qm9hcmRTaGlwcyxcclxuICAgICAgICBjcmVhdGVTaGlwLFxyXG4gICAgICAgIHBvcHVsYXRlR2FtZWJvYXJkLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyLFxyXG4gICAgICAgIGlzQWxsU2hpcHNTdW5rLFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyByZW5kZXJUdXJuLGRyYWdFbnRlcixkcmFnU3RhcnQsZHJhZ092ZXIsZHJhZ0xlYXZlLGRyb3AgfSBmcm9tICcuLi92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2sgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT57XHJcbiAgICAgICAgICAgIHByb2Nlc3NUdXJuRGF0YShnYW1lLGV2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBwcm9jZXNzVHVybkRhdGEgPSAoZ2FtZSxldmVudCkgPT57XHJcbiAgICBjb25zdCB0dXJuRGF0YSA9IGdhbWUuZ2FtZVR1cm4oZXZlbnQudGFyZ2V0LmlkKVxyXG4gICAgaWYodHVybkRhdGEgPT09IG51bGwpIHJldHVybiAgICAgIFxyXG4gICAgcmVuZGVyVHVybih0dXJuRGF0YSxldmVudClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnICgpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNQbGF5ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc1BsYXllci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJyxkcmFnRW50ZXIpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJyxkcmFnT3ZlcilcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxkcmFnTGVhdmUpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLGRyb3ApXHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJEcmFnZ2FibGUoKXtcclxuICAgIGNvbnN0IHNoaXBzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9vbC1zaGlwLnBsYXllcjEnKSlcclxuICAgIHNoaXBzLmZvckVhY2goc2hpcD0+XHJcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLGRyYWdTdGFydCkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyAoKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzQ29tcHV0ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc0NvbXB1dGVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc3NUdXJuRGF0YSlcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUpe1xyXG4gICAgY29uc3QgX3BsYXllck5hbWUgPSBuYW1lXHJcblxyXG4gICAgbGV0IF9nYW1lYm9hcmRcclxuXHJcbiAgICBsZXQgX2F0dGFja2VkU3F1YXJlcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3BsYXllck5hbWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2dhbWVib2FyZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEF0dGFja2VkU3F1YXJlcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYXR0YWNrZWRTcXVhcmVzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2V0QXR0YWNrZWRTcXVhcmVzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgX2F0dGFja2VkU3F1YXJlcy5wdXNoKGNvb3JkcylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoLi4uY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIF9nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIF9nYW1lYm9hcmQucG9wdWxhdGVHYW1lYm9hcmQoY29vcmRpbmF0ZXMpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNlbmRBdHRhY2tDb29yZHNUb0dhbWUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBpZihnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhjb29yZHMpKSByZXR1cm4gbnVsbFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgICAgIGNvbnN0IGJvYXJkR3JpZCA9IE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCA9IGJvYXJkR3JpZC5sZW5ndGhcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB3aGlsZShnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhib2FyZEdyaWRbaW5kZXhdKSl7XHJcbiAgICAgICAgICAgIGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGJvYXJkR3JpZFtpbmRleF0pXHJcbiAgICAgICAgcmV0dXJuIGJvYXJkR3JpZFtpbmRleF1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGVSYW5kb21OdW1iZXIgPSAobWF4LG1pbikgPT57XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKF9nYW1lYm9hcmQuZ2V0Qm9hcmRTaGlwcygpLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBnZXRHYW1lYm9hcmQsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzLFxyXG4gICAgICAgIGNyZWF0ZUdhbWVCb2FyZCxcclxuICAgICAgICBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIHNlbmRBdHRhY2tDb29yZHNUb0dhbWUsXHJcbiAgICAgICAgaXNQbGF5ZXJEZWZlYXRlZFxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIFNoaXAoLi4uY29vcmRpbmF0ZXMpe1xyXG5cclxuICAgIGxldCBfc2hpcENvb3JkID0gY29vcmRpbmF0ZXNcclxuXHJcbiAgICBjb25zdCBfU0hJUF9OQU1FUyA9IHtcclxuICAgICAgICAxIDogJ1NweScsXHJcbiAgICAgICAgMiA6ICdEZXN0cm95ZXInLFxyXG4gICAgICAgIDMgOiAnQ3J1aXNlcicsXHJcbiAgICAgICAgNCA6ICdCYXR0bGVzaGlwJyxcclxuICAgICAgICA1IDogJ0NhcnJpZXInXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX3NoaXBOYW1lID0gX1NISVBfTkFNRVNbX3NoaXBDb29yZC5sZW5ndGhdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldFNoaXBOYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGdldFNoaXBDb29yZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEluY29taW5nIHF1ZXJ5IChhc3NlcnQgcmVzdWx0ID4gdGVzdGVkIHdpdGggcmVtb3ZlU3F1YXJlSGl0KVxyXG4gICAgY29uc3QgZmluZEhpdEluZGV4ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZHMpICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTZWxmIGNvbW1hbmQgeFxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgY29uc3QgaW5kZXhDb29yZCA9IGZpbmRIaXRJbmRleChjb29yZHMpXHJcbiAgICAgICAgX3NoaXBDb29yZCA9IF9zaGlwQ29vcmQuZmlsdGVyKGNvb3JkID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkKSAhPT0gaW5kZXhDb29yZCBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1cmUgLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBpc1N1bmtOZXh0SGl0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQubGVuZ3RoID09PSAxID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0U2hpcE5hbWUsXHJcbiAgICAgICAgZ2V0U2hpcENvb3JkLFxyXG4gICAgICAgIGlzU3Vua05leHRIaXQsXHJcbiAgICAgICAgcmVtb3ZlU3F1YXJlSGl0XHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUdXJuICh0dXJuRGF0YSxldmVudCl7XHJcbiAgICBjb25zdCB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfSA9IFxyXG4gICAgICAgIHJldHJpZXZlVHVybkRhdGEodHVybkRhdGEpXHJcblxyXG4gICAgcmVuZGVyQm9hcmRTcXVhcmVzKHBsYXllckRhdGEsIGV2ZW50LnRhcmdldClcclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudClcclxuXHJcbiAgICByZW5kZXJUdXJuSW5mbyh0dXJuRGF0YSx0dXJuRGF0YS5wbGF5ZXIxKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTWF0Y2hSZXN1bHQgPSAocGxheWVyRGF0YSkgPT57XHJcbiAgICBjb25zdCB3aW5uZXIgPSBwbGF5ZXJEYXRhLnBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIFxyXG4gICAgICAgID8gJ0NvbXB1dGVyJ1xyXG4gICAgICAgIDogcGxheWVyRGF0YS5wbGF5ZXIxLmdldE5hbWUoKSAgIFxyXG5cclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3dpbm5lcn1gICsgJyBpcyB0aGUgd2lubmVyIScgXHJcbn1cclxuXHJcbmNvbnN0IHJldHJpZXZlVHVybkRhdGEgPSAodHVybkRhdGEpID0+e1xyXG4gICAgY29uc3QgcGxheWVyRGF0YSAgICAgID0gdHVybkRhdGEuaXNQbGF5ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckRhdGEgICAgPSB0dXJuRGF0YS5pc0NvbXB1dGVyQXR0YWNrTWlzc1xyXG4gICAgY29uc3QgY29tcHV0ZXJDb29yZHMgID0gdHVybkRhdGEuY29tcHV0ZXJDb29yZHNcclxuICAgIGNvbnN0IGF0dGFja2VkRWxlbWVudCA9IGZpbmRIaXRFbGVtZW50KGNvbXB1dGVyQ29vcmRzKVxyXG5cclxuICAgIHJldHVybiB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfVxyXG59XHJcblxyXG5jb25zdCBmaW5kSGl0RWxlbWVudCA9IChjb29yZHMpID0+e1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIxID4gIyR7Y29vcmRzfWApXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkU3F1YXJlcyA9ICh0dXJuRGF0YSwgZWxlbWVudCkgPT57XHJcbiAgICBpZihpc0hpdEVsZW1lbnQoZWxlbWVudCkpIHJldHVybiAgXHJcbiAgICAodHVybkRhdGEpID8gcmVuZGVyU3F1YXJlT25NaXNzKGVsZW1lbnQpIDogcmVuZGVyU3F1YXJlT25IaXQoZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgaXNIaXRFbGVtZW50ID0gKGVsZW1lbnQpID0+e1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3F1YXJlT25IaXQgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uTWlzcyAgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJUdXJuSW5mbyA9ICh0dXJuRGF0YSxwbGF5ZXIxKSA9PntcclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3BsYXllcjEuZ2V0TmFtZSgpfSBhdHRhY2sgaXMgYSBgICsgXHJcbiAgKHR1cm5EYXRhLmlzUGxheWVyQXR0YWNrTWlzcyA/ICdtaXNzIScgOiAnaGl0IScpXHJcbiAgXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlcldhcm5pbmdzSW5mbyA9ICgpID0+e1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwT25TaW5rID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ1N0YXJ0IChldmVudCkge1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLGV2ZW50LnRhcmdldC5pZClcclxuICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxyXG4gICAgfSwwKVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkcmFnRW50ZXIgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJylcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ092ZXIgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJylcclxuXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdMZWF2ZSAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG5cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJvcCAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG5cclxuICAgIGNvbnN0IGlkID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc3QgZHJhZ2dhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpICAgXHJcbiAgICBldmVudC50YXJnZXQuYXBwZW5kQ2hpbGQoZHJhZ2dhYmxlKVxyXG4gICAgLy8gVE9ET1xyXG4gICAgLy8gaWYgZWxlbWVudCBjYXJyaWVyIGFuZCB2ZXJ0aWNhbCwgYWRkIHNoaXAgY2xhc3MgdG8gYWxsIDUgZWxlbWVudHMgYmVsb3cgdGhlIGRyb3AgcG9pbnRcclxuICAgIC8vIGlmIGVsZW1lbnQgY2FycmllciBhbmQgaG9yaXpvbnRhbCwgYWRkIHNoaXAgY2xhc3MgdG8gYWxsIDUgZWxlbWVudHMgYmVsb3cgdGhlIGRyb3AgcG9pbnRcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdzaGlwJylcclxufVxyXG5cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclN0YXRpY0VsZW1lbnRzKGdhbWVib2FyZCwgcGxheWVyMSwgcGxheWVyMil7XHJcbiAgICByZW5kZXJCb2FyZE9uUmVzZXQoKVxyXG4gICAgcmVuZGVyU2hpcHMoZ2FtZWJvYXJkKVxyXG4gICAgcmVuZGVyUGxheWVyTmFtZXMocGxheWVyMSwgcGxheWVyMilcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcHMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBpbmRleCA9IDBcclxuICAgIGNvbnN0IGJvYXJkR3JpZCA9IGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgaWYoYm9hcmRHcmlkW2tleV0pe1xyXG4gICAgICAgICAgICBib2FyZEdyaWRBcnJheVtpbmRleF0uY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4KytcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgcmVuZGVyUGxheWVyTmFtZXMgPSAocGxheWVyMSwgcGxheWVyMikgPT57XHJcbiAgICBjb25zdCBwbGF5ZXIxTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxLW5hbWUnKVxyXG4gICAgY29uc3QgcGxheWVyMk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMi1uYW1lJylcclxuXHJcbiAgICBwbGF5ZXIxTmFtZS50ZXh0Q29udGVudCA9IHBsYXllcjEuZ2V0TmFtZSgpICsgJyBcXCdzIGZsZWV0J1xyXG4gICAgcGxheWVyMk5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXIyLmdldE5hbWUoKSArICcgXFwncyBmbGVldCdcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRPblJlc2V0ID0gKCkgPT57XHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheTEgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheTIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBjb25zdCBtYXRjaEluZm9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXJuLWluZm8nKVxyXG5cclxuICAgIGJvYXJkR3JpZEFycmF5MS5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKVxyXG4gICAgfSlcclxuICAgIGJvYXJkR3JpZEFycmF5Mi5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaGl0JylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnbWlzcycpXHJcbiAgICB9KSBcclxuXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9ICAnJ1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=