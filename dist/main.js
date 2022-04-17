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
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../src/index */ "./src/index.js");






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
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard),
/* harmony export */   "getShipLengthByName": () => (/* binding */ getShipLengthByName)
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
        getShipLengthByName,
        populateGameboard,
        receiveAttackFromPlayer,
        isAllShipsSunk,
    }
}

const getShipLengthByName = (shipName) =>{
    const _SHIP_NAMES = {
        'spy': 1,
        'destroyer': 2,
        'cruiser': 3,
        'battleship': 4,
        'carrier': 5
    }
    return _SHIP_NAMES[shipName]
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
/* harmony import */ var _logic_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logic/gameboard */ "./src/logic/gameboard.js");


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
    const shipID = event.dataTransfer.getData('text/plain')
    const squareID = event.target.id 
    let squaresToStyle = (0,_logic_gameboard__WEBPACK_IMPORTED_MODULE_0__.getShipLengthByName)(shipID)
    // ONLY ADD STYLE, DO NOT MANAGE BOARDGRID FROM HERE
    renderSquaresHorizontally(squareID,squaresToStyle,shipID)
    event.target.classList.remove('hide')
    // (shipDirection === 'vertical' ? renderSquaresVertically() : renderSquaresHorizontally())   
}
const renderShipOnDrop = (coord) =>{
    
}


const renderSquaresVertically = (squareID,squaresToStyle,shipID) =>{
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    const originalIndex = boardGridArray.findIndex(el => el.id === squareID)
    let indexToStyle = originalIndex
    try{
        for (let i = 0; i < squaresToStyle; i++) {
            boardGridArray[indexToStyle].classList.add('ship')
            indexToStyle += 8
        }
    }catch(error){
        indexToStyle -=8
        while(indexToStyle >= originalIndex){
            boardGridArray[indexToStyle].classList.remove('ship')
            indexToStyle -= 8
        }
        const shipInPool = document.getElementById(shipID)
        console.log(shipInPool.classList)
        return
    }
}

const renderSquaresHorizontally = (squareID,squaresToStyle,shipID) =>{
    const originalIndex = document.getElementById(`${squareID}`)
    const originalSquaresToStyle = squaresToStyle
    let elementToStyle = originalIndex
    const shipInPool = document.getElementById(shipID)

    while(squaresToStyle > 0 && !elementToStyle.classList.contains('row')){
        elementToStyle.classList.add('ship')
        elementToStyle = elementToStyle.nextElementSibling
        squaresToStyle-- 
    }
    if(squaresToStyle > 0){
        while(squaresToStyle <= originalSquaresToStyle){
            elementToStyle.classList.remove('ship')
            elementToStyle = elementToStyle.previousElementSibling
            squaresToStyle++
        }
        shipInPool.classList.remove('hide')
    }
    else{
        shipInPool.removeAttribute('draggable')
    }   

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW1DO0FBQzZGO0FBQ2hJO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpREFBSTtBQUNyQixJQUFJLHlGQUEyQjtBQUMvQixJQUFJLHVGQUF5QjtBQUM3QixJQUFJLHdGQUEwQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNabUU7QUFDRjtBQUNKO0FBQzVCO0FBQ087QUFDeEM7QUFDTztBQUNQO0FBQ0E7QUFDQSxvQkFBb0IsK0NBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0NBQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlGQUFvQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNEVBQW9CO0FBQ2hDLFlBQVksK0VBQWlCLEVBQUUsZ0JBQWdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbURBQVc7QUFDOUI7QUFDQTtBQUNBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRjZCO0FBQ3RCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMkNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGNBQWMsR0FBRyxJQUFJLE9BQU8sVUFBVTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSnNHO0FBQ3RHO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0VBQVU7QUFDZDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsNENBQTRDLGtFQUFTO0FBQ3JELDJDQUEyQyxpRUFBUTtBQUNuRCw0Q0FBNEMsa0VBQVM7QUFDckQsdUNBQXVDLDZEQUFJO0FBQzNDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSwwQ0FBMEMsa0VBQVM7QUFDbkQ7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUN1QztBQUN2QztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxREFBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25FTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaER3RDtBQUN4RDtBQUNPO0FBQ1AsWUFBWSwyQ0FBMkM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIscUVBQW1CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvQkFBb0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxTQUFTO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2hKTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7OztVQzNDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWUuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2hhbmRsZUV2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3BsYXllci5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9zaGlwLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vbG9naWMvZ2FtZSdcclxuaW1wb3J0IHsgYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSwgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrLCBhZGRFdmVudExpc3RlbmVyc0JvYXJkRHJhZ30gZnJvbSAnLi9sb2dpYy9oYW5kbGVFdmVudExpc3RlbmVycydcclxuXHJcblxyXG5jb25zdCBleGVjdXRlR2FtZSA9ICgpID0+e1xyXG4gICAgY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrKGdhbWUpXHJcbiAgICBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlKClcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnKClcclxufVxyXG5cclxuZXhlY3V0ZUdhbWUoKVxyXG5cclxuZXhwb3J0IHtleGVjdXRlR2FtZX0iLCJpbXBvcnQgeyByZW5kZXJTdGF0aWNFbGVtZW50cyB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMnXHJcbmltcG9ydCB7IHJlbmRlck1hdGNoUmVzdWx0IH0gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcbmltcG9ydCB7IHJlbW92ZUV2ZW50TGlzdGVuZXJzIH0gZnJvbSAnLi9oYW5kbGVFdmVudExpc3RlbmVycydcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInXHJcbmltcG9ydCB7IGV4ZWN1dGVHYW1lIH0gZnJvbSAnL3NyYy9pbmRleCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lICgpe1xyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkLWdyaWQucGxheWVyMicpXHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd1bmNsaWNrYWJsZScpXHJcbiAgICBjb25zdCBwbGF5ZXIxID0gUGxheWVyKCdWaWN0b3InKVxyXG4gICAgcGxheWVyMS5jcmVhdGVHYW1lQm9hcmQoXHJcbiAgICAgICAgWydIOCddLFxyXG4gICAgICAgIFsnQzUnLCdINiddLFxyXG4gICAgICAgIFsnQjcnLCdEMScsJ0gxJ10sXHJcbiAgICAgICAgWydDNicsJ0E1JywnRDgnLCdEMiddLFxyXG4gICAgICAgIFsnRTEnLCdFMicsJ0UzJywnRTQnLCdBNSddXHJcbiAgICApXHJcbiAgICBjb25zdCBwbGF5ZXIyID0gUGxheWVyKCdDb21wdXRlcicpXHJcbiAgICBwbGF5ZXIyLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICBbJ0c4J10sXHJcbiAgICAgICAgWydCMScsJ0IyJ10sXHJcbiAgICAgICAgWydDMScsJ0MyJywnQzMnXSxcclxuICAgICAgICBbJ0QxJywnRDInLCdEMycsJ0Q0J10sXHJcbiAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0U1J11cclxuICAgIClcclxuXHJcbiAgICBsZXQgZ2FtZWJvYXJkMSAgICAgPSBwbGF5ZXIxLmdldEdhbWVib2FyZCgpXHJcbiAgICBsZXQgZ2FtZWJvYXJkMiAgICAgPSBwbGF5ZXIyLmdldEdhbWVib2FyZCgpXHJcbiAgICBsZXQgcGxheWVySW5UdXJuICAgPSBwbGF5ZXIxXHJcbiAgICBsZXQgZW5lbXlHYW1lYm9hcmQgPSBnYW1lYm9hcmQyXHJcblxyXG4gICAgcmVuZGVyU3RhdGljRWxlbWVudHMoZ2FtZWJvYXJkMSwgcGxheWVyMSwgcGxheWVyMilcclxuXHJcbiAgICBjb25zdCBnYW1lVHVybiA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGNvbnN0IHBsYXllckNvb3JkcyA9IHBsYXllckluVHVybi5zZW5kQXR0YWNrQ29vcmRzVG9HYW1lKGNvb3JkcylcclxuICAgICAgICBpZihwbGF5ZXJDb29yZHMgPT09IG51bGwpIHJldHVybiBudWxsXHJcbiAgXHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJBdHRhY2tNaXNzICAgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihwbGF5ZXJDb29yZHMpIFxyXG4gICAgICAgIHBsYXllckluVHVybiAgICAgICAgICAgICAgID0gc3dpdGNoUGxheWVycygpXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgICAgICAgICAgICAgPSBzd2l0Y2hHYW1lYm9hcmRzKClcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgICAgICA9IHBsYXllckluVHVybi5zZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lKGVuZW15R2FtZWJvYXJkKVxyXG4gICAgICAgIGNvbnN0IGlzQ29tcHV0ZXJBdHRhY2tNaXNzID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIoY29tcHV0ZXJDb29yZHMpXHJcbiAgICAgICAgcGxheWVySW5UdXJuICAgICAgICAgICAgICAgPSBzd2l0Y2hQbGF5ZXJzKClcclxuICAgICAgICBlbmVteUdhbWVib2FyZCAgICAgICAgICAgICA9IHN3aXRjaEdhbWVib2FyZHMoKVxyXG5cclxuICAgICAgICBpZihpc0FueVBsYXllckRlZmVhdGVkKCkpe1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd1bmNsaWNrYWJsZScpXHJcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKClcclxuICAgICAgICAgICAgcmVuZGVyTWF0Y2hSZXN1bHQoe3BsYXllcjEscGxheWVyMn0pXHJcbiAgICAgICAgICAgIHByZXBhcmVOZXh0TWF0Y2goKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGxheWVyMSxcclxuICAgICAgICAgICAgaXNQbGF5ZXJBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBpc0NvbXB1dGVyQXR0YWNrTWlzcyxcclxuICAgICAgICAgICAgY29tcHV0ZXJDb29yZHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoUGxheWVycyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAocGxheWVySW5UdXJuID09PSBwbGF5ZXIyKSA/IHBsYXllcjEgOiBwbGF5ZXIyXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoR2FtZWJvYXJkcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAocGxheWVySW5UdXJuID09PSBwbGF5ZXIyKSA/IGdhbWVib2FyZDEgOiBnYW1lYm9hcmQyXHJcbiAgICB9ICAgXHJcblxyXG4gICAgY29uc3QgaXNBbnlQbGF5ZXJEZWZlYXRlZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXIxLmlzUGxheWVyRGVmZWF0ZWQoKSB8fCBwbGF5ZXIyLmlzUGxheWVyRGVmZWF0ZWQoKVxyXG4gICAgfSBcclxuXHJcbiAgICBjb25zdCBwcmVwYXJlTmV4dE1hdGNoID0gKCkgPT57XHJcbiAgICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmcm9tIGJvYXJkXHJcbiAgICAgICAgc2V0VGltZW91dChleGVjdXRlR2FtZSwyMDAwKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybntnYW1lVHVybn1cclxufVxyXG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xyXG5leHBvcnQgZnVuY3Rpb24gR2FtZWJvYXJkKCl7ICAgIFxyXG4gICBcclxuICAgIGxldCBfYm9hcmRHcmlkID0gXHJcbiAgICB7XHJcbiAgICAgICAgJ0ExJzogZmFsc2UsICdBMic6IGZhbHNlLCAnQTMnOiBmYWxzZSwgJ0E0JzogZmFsc2UsICdBNSc6IGZhbHNlLCAnQTYnOiBmYWxzZSwgJ0E3JzogZmFsc2UsICdBOCc6IGZhbHNlLCBcclxuICAgICAgICAnQjEnOiBmYWxzZSwgJ0IyJzogZmFsc2UsICdCMyc6IGZhbHNlLCAnQjQnOiBmYWxzZSwgJ0I1JzogZmFsc2UsICdCNic6IGZhbHNlLCAnQjcnOiBmYWxzZSwgJ0I4JzogZmFsc2UsIFxyXG4gICAgICAgICdDMSc6IGZhbHNlLCAnQzInOiBmYWxzZSwgJ0MzJzogZmFsc2UsICdDNCc6IGZhbHNlLCAnQzUnOiBmYWxzZSwgJ0M2JzogZmFsc2UsICdDNyc6IGZhbHNlLCAnQzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0QxJzogZmFsc2UsICdEMic6IGZhbHNlLCAnRDMnOiBmYWxzZSwgJ0Q0JzogZmFsc2UsICdENSc6IGZhbHNlLCAnRDYnOiBmYWxzZSwgJ0Q3JzogZmFsc2UsICdEOCc6IGZhbHNlLCBcclxuICAgICAgICAnRTEnOiBmYWxzZSwgJ0UyJzogZmFsc2UsICdFMyc6IGZhbHNlLCAnRTQnOiBmYWxzZSwgJ0U1JzogZmFsc2UsICdFNic6IGZhbHNlLCAnRTcnOiBmYWxzZSwgJ0U4JzogZmFsc2UsIFxyXG4gICAgICAgICdGMSc6IGZhbHNlLCAnRjInOiBmYWxzZSwgJ0YzJzogZmFsc2UsICdGNCc6IGZhbHNlLCAnRjUnOiBmYWxzZSwgJ0Y2JzogZmFsc2UsICdGNyc6IGZhbHNlLCAnRjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0cxJzogZmFsc2UsICdHMic6IGZhbHNlLCAnRzMnOiBmYWxzZSwgJ0c0JzogZmFsc2UsICdHNSc6IGZhbHNlLCAnRzYnOiBmYWxzZSwgJ0c3JzogZmFsc2UsICdHOCc6IGZhbHNlLCBcclxuICAgICAgICAnSDEnOiBmYWxzZSwgJ0gyJzogZmFsc2UsICdIMyc6IGZhbHNlLCAnSDQnOiBmYWxzZSwgJ0g1JzogZmFsc2UsICdINic6IGZhbHNlLCAnSDcnOiBmYWxzZSwgJ0g4JzogZmFsc2UgXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IF9ib2FyZFNoaXBzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0Qm9hcmRHcmlkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZEdyaWRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRCb2FyZFNoaXBzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcHVsYXRlR2FtZWJvYXJkID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUoIGluZGV4IDwgY29vcmRpbmF0ZXMubGVuZ3RoICl7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXAoLi4uY29vcmRpbmF0ZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KSBYXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwID0gKC4uLmNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBpZihpc0Nvb3Jkc0F2YWlsYWJsZShjb29yZGluYXRlcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwICA9IFNoaXAoLi4uY29vcmRpbmF0ZXMpIFxyXG4gICAgICAgICAgICBfYm9hcmRTaGlwcyA9IGFkZFNoaXBUb1NoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0KHNoaXApXHJcbiAgICAgICAgICAgIHJldHVybiBzaGlwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBJbmNvbWluZy1xdWVyeSAoYXNzZXJ0IHJlc3VsdClcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyID0gKGNvb3Jkcyk9PntcclxuICAgICAgICBpZihpc0F0dGFja1ZhbGlkKGNvb3JkcykgJiYgaXNTaGlwSGl0KGNvb3Jkcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZmluZFNoaXBCeUNvb3Jkcyhjb29yZHMpXHJcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rTmV4dEhpdCgpKXtcclxuICAgICAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5KHNoaXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNoaXBTcXVhcmUoY29vcmRzLHNoaXApXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNoaXBTcXVhcmUgPSAoY29vcmRzLHNoaXApID0+e1xyXG4gICAgICAgIHNoaXAucmVtb3ZlU3F1YXJlSGl0KGNvb3JkcylcclxuICAgICAgICByZXR1cm4gcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdChjb29yZHMpXHJcbiAgICB9XHJcbiBcclxuICAgIC8vIFF1ZXJ5ICYgQ29tbWFuZCBzZWxmIHhcclxuICAgIGNvbnN0IGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdCA9IChzaGlwKSA9PntcclxuICAgICAgICBzaGlwLmdldFNoaXBDb29yZCgpLmZvckVhY2goY29vcmQgPT57XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKF9ib2FyZEdyaWQpLmZvckVhY2goa2V5ID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZCkge19ib2FyZEdyaWRba2V5XSA9IHRydWV9IFxyXG4gICAgICAgICAgICB9KSAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZFNoaXBUb1NoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIFsuLi5fYm9hcmRTaGlwcyxzaGlwXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QgPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7Li4uX2JvYXJkR3JpZH0sIHtbYCR7Y29vcmRzfWBdOiAnSGl0J30pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGZpbmRTaGlwSW5kZXhCeU5hbWUoc2hpcClcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmlsdGVyKGFycmF5U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmluZGV4T2YoYXJyYXlTaGlwKSAhPT0gc2hpcEluZGV4IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiBcclxuICAgIGNvbnN0IGZpbmRTaGlwQnlDb29yZHMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZChzaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gc2hpcC5nZXRTaGlwQ29vcmQoKS5pbmNsdWRlcyhjb29yZHMpICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmluZFNoaXBJbmRleEJ5TmFtZSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZEluZGV4KGN1cnJlbnRTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFNoaXAuZ2V0U2hpcE5hbWUoKSA9PT0gc2hpcC5nZXRTaGlwTmFtZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc1NoaXBIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3JkcyAmJiBfYm9hcmRHcmlkW2tleV0pIHsgcmV0dXJuIHRydWUgfSAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0FsbFNoaXBzU3VuayA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAoX2JvYXJkU2hpcHMubGVuZ3RoID09PSAwKSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzQ29vcmRzQXZhaWxhYmxlID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgbGV0IGluZGV4QXJyYXkgPSAwXHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHNbaW5kZXhBcnJheV0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBpc0F0dGFja1ZhbGlkID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID09PSAnSGl0Jz8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbiBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0Qm9hcmRHcmlkLFxyXG4gICAgICAgIGdldEJvYXJkU2hpcHMsXHJcbiAgICAgICAgY3JlYXRlU2hpcCxcclxuICAgICAgICBnZXRTaGlwTGVuZ3RoQnlOYW1lLFxyXG4gICAgICAgIHBvcHVsYXRlR2FtZWJvYXJkLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyLFxyXG4gICAgICAgIGlzQWxsU2hpcHNTdW5rLFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2hpcExlbmd0aEJ5TmFtZSA9IChzaGlwTmFtZSkgPT57XHJcbiAgICBjb25zdCBfU0hJUF9OQU1FUyA9IHtcclxuICAgICAgICAnc3B5JzogMSxcclxuICAgICAgICAnZGVzdHJveWVyJzogMixcclxuICAgICAgICAnY3J1aXNlcic6IDMsXHJcbiAgICAgICAgJ2JhdHRsZXNoaXAnOiA0LFxyXG4gICAgICAgICdjYXJyaWVyJzogNVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9TSElQX05BTUVTW3NoaXBOYW1lXVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyByZW5kZXJUdXJuLGRyYWdFbnRlcixkcmFnU3RhcnQsZHJhZ092ZXIsZHJhZ0xlYXZlLGRyb3AgfSBmcm9tICcuLi92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2sgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT57XHJcbiAgICAgICAgICAgIHByb2Nlc3NUdXJuRGF0YShnYW1lLGV2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBwcm9jZXNzVHVybkRhdGEgPSAoZ2FtZSxldmVudCkgPT57XHJcbiAgICBjb25zdCB0dXJuRGF0YSA9IGdhbWUuZ2FtZVR1cm4oZXZlbnQudGFyZ2V0LmlkKVxyXG4gICAgaWYodHVybkRhdGEgPT09IG51bGwpIHJldHVybiAgICAgIFxyXG4gICAgcmVuZGVyVHVybih0dXJuRGF0YSxldmVudClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnICgpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNQbGF5ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc1BsYXllci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJyxkcmFnRW50ZXIpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJyxkcmFnT3ZlcilcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxkcmFnTGVhdmUpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLGRyb3ApXHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJEcmFnZ2FibGUoKXtcclxuICAgIGNvbnN0IHNoaXBzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9vbC1zaGlwLnBsYXllcjEnKSlcclxuICAgIHNoaXBzLmZvckVhY2goc2hpcD0+XHJcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLGRyYWdTdGFydCkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyAoKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzQ29tcHV0ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc0NvbXB1dGVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc3NUdXJuRGF0YSlcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUpe1xyXG4gICAgY29uc3QgX3BsYXllck5hbWUgPSBuYW1lXHJcblxyXG4gICAgbGV0IF9nYW1lYm9hcmRcclxuXHJcbiAgICBsZXQgX2F0dGFja2VkU3F1YXJlcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3BsYXllck5hbWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2dhbWVib2FyZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEF0dGFja2VkU3F1YXJlcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYXR0YWNrZWRTcXVhcmVzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2V0QXR0YWNrZWRTcXVhcmVzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgX2F0dGFja2VkU3F1YXJlcy5wdXNoKGNvb3JkcylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoLi4uY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIF9nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIF9nYW1lYm9hcmQucG9wdWxhdGVHYW1lYm9hcmQoY29vcmRpbmF0ZXMpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNlbmRBdHRhY2tDb29yZHNUb0dhbWUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBpZihnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhjb29yZHMpKSByZXR1cm4gbnVsbFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgICAgIGNvbnN0IGJvYXJkR3JpZCA9IE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCA9IGJvYXJkR3JpZC5sZW5ndGhcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB3aGlsZShnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhib2FyZEdyaWRbaW5kZXhdKSl7XHJcbiAgICAgICAgICAgIGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGJvYXJkR3JpZFtpbmRleF0pXHJcbiAgICAgICAgcmV0dXJuIGJvYXJkR3JpZFtpbmRleF1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGVSYW5kb21OdW1iZXIgPSAobWF4LG1pbikgPT57XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKF9nYW1lYm9hcmQuZ2V0Qm9hcmRTaGlwcygpLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBnZXRHYW1lYm9hcmQsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzLFxyXG4gICAgICAgIGNyZWF0ZUdhbWVCb2FyZCxcclxuICAgICAgICBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIHNlbmRBdHRhY2tDb29yZHNUb0dhbWUsXHJcbiAgICAgICAgaXNQbGF5ZXJEZWZlYXRlZFxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIFNoaXAoLi4uY29vcmRpbmF0ZXMpe1xyXG5cclxuICAgIGxldCBfc2hpcENvb3JkID0gY29vcmRpbmF0ZXNcclxuXHJcbiAgICBjb25zdCBfU0hJUF9OQU1FUyA9IHtcclxuICAgICAgICAxIDogJ1NweScsXHJcbiAgICAgICAgMiA6ICdEZXN0cm95ZXInLFxyXG4gICAgICAgIDMgOiAnQ3J1aXNlcicsXHJcbiAgICAgICAgNCA6ICdCYXR0bGVzaGlwJyxcclxuICAgICAgICA1IDogJ0NhcnJpZXInXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX3NoaXBOYW1lID0gX1NISVBfTkFNRVNbX3NoaXBDb29yZC5sZW5ndGhdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldFNoaXBOYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGdldFNoaXBDb29yZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEluY29taW5nIHF1ZXJ5IChhc3NlcnQgcmVzdWx0ID4gdGVzdGVkIHdpdGggcmVtb3ZlU3F1YXJlSGl0KVxyXG4gICAgY29uc3QgZmluZEhpdEluZGV4ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZHMpICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTZWxmIGNvbW1hbmQgeFxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgY29uc3QgaW5kZXhDb29yZCA9IGZpbmRIaXRJbmRleChjb29yZHMpXHJcbiAgICAgICAgX3NoaXBDb29yZCA9IF9zaGlwQ29vcmQuZmlsdGVyKGNvb3JkID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkKSAhPT0gaW5kZXhDb29yZCBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1cmUgLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBpc1N1bmtOZXh0SGl0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQubGVuZ3RoID09PSAxID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0U2hpcE5hbWUsXHJcbiAgICAgICAgZ2V0U2hpcENvb3JkLFxyXG4gICAgICAgIGlzU3Vua05leHRIaXQsXHJcbiAgICAgICAgcmVtb3ZlU3F1YXJlSGl0XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ2V0U2hpcExlbmd0aEJ5TmFtZSB9IGZyb20gJy4uL2xvZ2ljL2dhbWVib2FyZCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUdXJuICh0dXJuRGF0YSxldmVudCl7XHJcbiAgICBjb25zdCB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfSA9IFxyXG4gICAgICAgIHJldHJpZXZlVHVybkRhdGEodHVybkRhdGEpXHJcblxyXG4gICAgcmVuZGVyQm9hcmRTcXVhcmVzKHBsYXllckRhdGEsIGV2ZW50LnRhcmdldClcclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudClcclxuXHJcbiAgICByZW5kZXJUdXJuSW5mbyh0dXJuRGF0YSx0dXJuRGF0YS5wbGF5ZXIxKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTWF0Y2hSZXN1bHQgPSAocGxheWVyRGF0YSkgPT57XHJcbiAgICBjb25zdCB3aW5uZXIgPSBwbGF5ZXJEYXRhLnBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIFxyXG4gICAgICAgID8gJ0NvbXB1dGVyJ1xyXG4gICAgICAgIDogcGxheWVyRGF0YS5wbGF5ZXIxLmdldE5hbWUoKSAgIFxyXG5cclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3dpbm5lcn1gICsgJyBpcyB0aGUgd2lubmVyIScgXHJcbn1cclxuXHJcbmNvbnN0IHJldHJpZXZlVHVybkRhdGEgPSAodHVybkRhdGEpID0+e1xyXG4gICAgY29uc3QgcGxheWVyRGF0YSAgICAgID0gdHVybkRhdGEuaXNQbGF5ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckRhdGEgICAgPSB0dXJuRGF0YS5pc0NvbXB1dGVyQXR0YWNrTWlzc1xyXG4gICAgY29uc3QgY29tcHV0ZXJDb29yZHMgID0gdHVybkRhdGEuY29tcHV0ZXJDb29yZHNcclxuICAgIGNvbnN0IGF0dGFja2VkRWxlbWVudCA9IGZpbmRIaXRFbGVtZW50KGNvbXB1dGVyQ29vcmRzKVxyXG5cclxuICAgIHJldHVybiB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfVxyXG59XHJcblxyXG5jb25zdCBmaW5kSGl0RWxlbWVudCA9IChjb29yZHMpID0+e1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIxID4gIyR7Y29vcmRzfWApXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkU3F1YXJlcyA9ICh0dXJuRGF0YSwgZWxlbWVudCkgPT57XHJcbiAgICBpZihpc0hpdEVsZW1lbnQoZWxlbWVudCkpIHJldHVybiAgXHJcbiAgICAodHVybkRhdGEpID8gcmVuZGVyU3F1YXJlT25NaXNzKGVsZW1lbnQpIDogcmVuZGVyU3F1YXJlT25IaXQoZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgaXNIaXRFbGVtZW50ID0gKGVsZW1lbnQpID0+e1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3F1YXJlT25IaXQgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uTWlzcyAgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJUdXJuSW5mbyA9ICh0dXJuRGF0YSxwbGF5ZXIxKSA9PntcclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3BsYXllcjEuZ2V0TmFtZSgpfSBhdHRhY2sgaXMgYSBgICsgXHJcbiAgKHR1cm5EYXRhLmlzUGxheWVyQXR0YWNrTWlzcyA/ICdtaXNzIScgOiAnaGl0IScpXHJcbiAgXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlcldhcm5pbmdzSW5mbyA9ICgpID0+e1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwT25TaW5rID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ1N0YXJ0IChldmVudCkge1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLGV2ZW50LnRhcmdldC5pZClcclxuICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxyXG4gICAgfSwwKVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkcmFnRW50ZXIgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJylcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ092ZXIgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJylcclxuXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdMZWF2ZSAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG5cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJvcCAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG4gICAgY29uc3Qgc2hpcElEID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc3Qgc3F1YXJlSUQgPSBldmVudC50YXJnZXQuaWQgXHJcbiAgICBsZXQgc3F1YXJlc1RvU3R5bGUgPSBnZXRTaGlwTGVuZ3RoQnlOYW1lKHNoaXBJRClcclxuICAgIC8vIE9OTFkgQUREIFNUWUxFLCBETyBOT1QgTUFOQUdFIEJPQVJER1JJRCBGUk9NIEhFUkVcclxuICAgIHJlbmRlclNxdWFyZXNIb3Jpem9udGFsbHkoc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG4gICAgLy8gKHNoaXBEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgPyByZW5kZXJTcXVhcmVzVmVydGljYWxseSgpIDogcmVuZGVyU3F1YXJlc0hvcml6b250YWxseSgpKSAgIFxyXG59XHJcbmNvbnN0IHJlbmRlclNoaXBPbkRyb3AgPSAoY29vcmQpID0+e1xyXG4gICAgXHJcbn1cclxuXHJcblxyXG5jb25zdCByZW5kZXJTcXVhcmVzVmVydGljYWxseSA9IChzcXVhcmVJRCxzcXVhcmVzVG9TdHlsZSxzaGlwSUQpID0+e1xyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBjb25zdCBvcmlnaW5hbEluZGV4ID0gYm9hcmRHcmlkQXJyYXkuZmluZEluZGV4KGVsID0+IGVsLmlkID09PSBzcXVhcmVJRClcclxuICAgIGxldCBpbmRleFRvU3R5bGUgPSBvcmlnaW5hbEluZGV4XHJcbiAgICB0cnl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVzVG9TdHlsZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJvYXJkR3JpZEFycmF5W2luZGV4VG9TdHlsZV0uY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgICAgIGluZGV4VG9TdHlsZSArPSA4XHJcbiAgICAgICAgfVxyXG4gICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICBpbmRleFRvU3R5bGUgLT04XHJcbiAgICAgICAgd2hpbGUoaW5kZXhUb1N0eWxlID49IG9yaWdpbmFsSW5kZXgpe1xyXG4gICAgICAgICAgICBib2FyZEdyaWRBcnJheVtpbmRleFRvU3R5bGVdLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgICAgICAgICBpbmRleFRvU3R5bGUgLT0gOFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaGlwSW5Qb29sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBJblBvb2wuY2xhc3NMaXN0KVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTcXVhcmVzSG9yaXpvbnRhbGx5ID0gKHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlLHNoaXBJRCkgPT57XHJcbiAgICBjb25zdCBvcmlnaW5hbEluZGV4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7c3F1YXJlSUR9YClcclxuICAgIGNvbnN0IG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUgPSBzcXVhcmVzVG9TdHlsZVxyXG4gICAgbGV0IGVsZW1lbnRUb1N0eWxlID0gb3JpZ2luYWxJbmRleFxyXG4gICAgY29uc3Qgc2hpcEluUG9vbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXBJRClcclxuXHJcbiAgICB3aGlsZShzcXVhcmVzVG9TdHlsZSA+IDAgJiYgIWVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5jb250YWlucygncm93Jykpe1xyXG4gICAgICAgIGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIGVsZW1lbnRUb1N0eWxlID0gZWxlbWVudFRvU3R5bGUubmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICAgICAgc3F1YXJlc1RvU3R5bGUtLSBcclxuICAgIH1cclxuICAgIGlmKHNxdWFyZXNUb1N0eWxlID4gMCl7XHJcbiAgICAgICAgd2hpbGUoc3F1YXJlc1RvU3R5bGUgPD0gb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgICAgICAgICBlbGVtZW50VG9TdHlsZSA9IGVsZW1lbnRUb1N0eWxlLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcclxuICAgICAgICAgICAgc3F1YXJlc1RvU3R5bGUrK1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBzaGlwSW5Qb29sLnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJylcclxuICAgIH0gICBcclxuXHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RhdGljRWxlbWVudHMoZ2FtZWJvYXJkLCBwbGF5ZXIxLCBwbGF5ZXIyKXtcclxuICAgIHJlbmRlckJvYXJkT25SZXNldCgpXHJcbiAgICByZW5kZXJTaGlwcyhnYW1lYm9hcmQpXHJcbiAgICByZW5kZXJQbGF5ZXJOYW1lcyhwbGF5ZXIxLCBwbGF5ZXIyKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwcyA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgbGV0IGluZGV4ID0gMFxyXG4gICAgY29uc3QgYm9hcmRHcmlkID0gZ2FtZWJvYXJkLmdldEJvYXJkR3JpZCgpXHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhib2FyZEdyaWQpKXtcclxuICAgICAgICBpZihib2FyZEdyaWRba2V5XSl7XHJcbiAgICAgICAgICAgIGJvYXJkR3JpZEFycmF5W2luZGV4XS5jbGFzc0xpc3QuYWRkKCdzaGlwJylcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXgrK1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY29uc3QgcmVuZGVyUGxheWVyTmFtZXMgPSAocGxheWVyMSwgcGxheWVyMikgPT57XHJcbiAgICBjb25zdCBwbGF5ZXIxTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxLW5hbWUnKVxyXG4gICAgY29uc3QgcGxheWVyMk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMi1uYW1lJylcclxuXHJcbiAgICBwbGF5ZXIxTmFtZS50ZXh0Q29udGVudCA9IHBsYXllcjEuZ2V0TmFtZSgpICsgJyBcXCdzIGZsZWV0J1xyXG4gICAgcGxheWVyMk5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXIyLmdldE5hbWUoKSArICcgXFwncyBmbGVldCdcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRPblJlc2V0ID0gKCkgPT57XHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheTEgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheTIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBjb25zdCBtYXRjaEluZm9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXJuLWluZm8nKVxyXG5cclxuICAgIGJvYXJkR3JpZEFycmF5MS5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKVxyXG4gICAgfSlcclxuICAgIGJvYXJkR3JpZEFycmF5Mi5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaGl0JylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnbWlzcycpXHJcbiAgICB9KSBcclxuXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9ICAnJ1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=