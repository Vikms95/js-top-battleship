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
        'spy-1': 1,
        'spy-2': 1,
        'spy-3': 1,
        'destroyer-1': 2,
        'destroyer-2': 2,
        'destroyer-3': 2,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7O1VDM0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvaGFuZGxlRXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvcGxheWVyLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3NoaXAuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy9yZW5kZXJTdGF0aWNFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9sb2dpYy9nYW1lJ1xyXG5pbXBvcnQgeyBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlLCBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2ssIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnfSBmcm9tICcuL2xvZ2ljL2hhbmRsZUV2ZW50TGlzdGVuZXJzJ1xyXG5cclxuXHJcbmNvbnN0IGV4ZWN1dGVHYW1lID0gKCkgPT57XHJcbiAgICBjb25zdCBnYW1lID0gR2FtZSgpXHJcbiAgICBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2soZ2FtZSlcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJEcmFnZ2FibGUoKVxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcoKVxyXG59XHJcblxyXG5leGVjdXRlR2FtZSgpXHJcblxyXG5leHBvcnQge2V4ZWN1dGVHYW1lfSIsImltcG9ydCB7IHJlbmRlclN0YXRpY0VsZW1lbnRzIH0gZnJvbSAnLi4vdmlldy9yZW5kZXJTdGF0aWNFbGVtZW50cydcclxuaW1wb3J0IHsgcmVuZGVyTWF0Y2hSZXN1bHQgfSBmcm9tICcuLi92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cydcclxuaW1wb3J0IHsgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMgfSBmcm9tICcuL2hhbmRsZUV2ZW50TGlzdGVuZXJzJ1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcclxuaW1wb3J0IHsgZXhlY3V0ZUdhbWUgfSBmcm9tICcvc3JjL2luZGV4J1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCl7XHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQtZ3JpZC5wbGF5ZXIyJylcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VuY2xpY2thYmxlJylcclxuICAgIGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ1ZpY3RvcicpXHJcbiAgICBwbGF5ZXIxLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICBbJ0g4J10sXHJcbiAgICAgICAgWydDNScsJ0g2J10sXHJcbiAgICAgICAgWydCNycsJ0QxJywnSDEnXSxcclxuICAgICAgICBbJ0M2JywnQTUnLCdEOCcsJ0QyJ10sXHJcbiAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0E1J11cclxuICAgIClcclxuICAgIGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoJ0NvbXB1dGVyJylcclxuICAgIHBsYXllcjIuY3JlYXRlR2FtZUJvYXJkKFxyXG4gICAgICAgIFsnRzgnXSxcclxuICAgICAgICBbJ0IxJywnQjInXSxcclxuICAgICAgICBbJ0MxJywnQzInLCdDMyddLFxyXG4gICAgICAgIFsnRDEnLCdEMicsJ0QzJywnRDQnXSxcclxuICAgICAgICBbJ0UxJywnRTInLCdFMycsJ0U0JywnRTUnXVxyXG4gICAgKVxyXG5cclxuICAgIGxldCBnYW1lYm9hcmQxICAgICA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKClcclxuICAgIGxldCBnYW1lYm9hcmQyICAgICA9IHBsYXllcjIuZ2V0R2FtZWJvYXJkKClcclxuICAgIGxldCBwbGF5ZXJJblR1cm4gICA9IHBsYXllcjFcclxuICAgIGxldCBlbmVteUdhbWVib2FyZCA9IGdhbWVib2FyZDJcclxuXHJcbiAgICByZW5kZXJTdGF0aWNFbGVtZW50cyhnYW1lYm9hcmQxLCBwbGF5ZXIxLCBwbGF5ZXIyKVxyXG5cclxuICAgIGNvbnN0IGdhbWVUdXJuID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgY29uc3QgcGxheWVyQ29vcmRzID0gcGxheWVySW5UdXJuLnNlbmRBdHRhY2tDb29yZHNUb0dhbWUoY29vcmRzKVxyXG4gICAgICAgIGlmKHBsYXllckNvb3JkcyA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICBcclxuICAgICAgICBjb25zdCBpc1BsYXllckF0dGFja01pc3MgICA9IGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2tGcm9tUGxheWVyKHBsYXllckNvb3JkcykgXHJcbiAgICAgICAgcGxheWVySW5UdXJuICAgICAgICAgICAgICAgPSBzd2l0Y2hQbGF5ZXJzKClcclxuICAgICAgICBlbmVteUdhbWVib2FyZCAgICAgICAgICAgICA9IHN3aXRjaEdhbWVib2FyZHMoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ29vcmRzICAgICAgID0gcGxheWVySW5UdXJuLnNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUoZW5lbXlHYW1lYm9hcmQpXHJcbiAgICAgICAgY29uc3QgaXNDb21wdXRlckF0dGFja01pc3MgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihjb21wdXRlckNvb3JkcylcclxuICAgICAgICBwbGF5ZXJJblR1cm4gICAgICAgICAgICAgICA9IHN3aXRjaFBsYXllcnMoKVxyXG4gICAgICAgIGVuZW15R2FtZWJvYXJkICAgICAgICAgICAgID0gc3dpdGNoR2FtZWJvYXJkcygpXHJcblxyXG4gICAgICAgIGlmKGlzQW55UGxheWVyRGVmZWF0ZWQoKSl7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VuY2xpY2thYmxlJylcclxuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgICAgICAgICByZW5kZXJNYXRjaFJlc3VsdCh7cGxheWVyMSxwbGF5ZXIyfSlcclxuICAgICAgICAgICAgcHJlcGFyZU5leHRNYXRjaCgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwbGF5ZXIxLFxyXG4gICAgICAgICAgICBpc1BsYXllckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGlzQ29tcHV0ZXJBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBjb21wdXRlckNvb3Jkc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hQbGF5ZXJzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gcGxheWVyMSA6IHBsYXllcjJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hHYW1lYm9hcmRzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gZ2FtZWJvYXJkMSA6IGdhbWVib2FyZDJcclxuICAgIH0gICBcclxuXHJcbiAgICBjb25zdCBpc0FueVBsYXllckRlZmVhdGVkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIHx8IHBsYXllcjIuaXNQbGF5ZXJEZWZlYXRlZCgpXHJcbiAgICB9IFxyXG5cclxuICAgIGNvbnN0IHByZXBhcmVOZXh0TWF0Y2ggPSAoKSA9PntcclxuICAgICAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZyb20gYm9hcmRcclxuICAgICAgICBzZXRUaW1lb3V0KGV4ZWN1dGVHYW1lLDIwMDApXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue2dhbWVUdXJufVxyXG59XHJcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lYm9hcmQoKXsgICAgXHJcbiAgIFxyXG4gICAgbGV0IF9ib2FyZEdyaWQgPSBcclxuICAgIHtcclxuICAgICAgICAnQTEnOiBmYWxzZSwgJ0EyJzogZmFsc2UsICdBMyc6IGZhbHNlLCAnQTQnOiBmYWxzZSwgJ0E1JzogZmFsc2UsICdBNic6IGZhbHNlLCAnQTcnOiBmYWxzZSwgJ0E4JzogZmFsc2UsIFxyXG4gICAgICAgICdCMSc6IGZhbHNlLCAnQjInOiBmYWxzZSwgJ0IzJzogZmFsc2UsICdCNCc6IGZhbHNlLCAnQjUnOiBmYWxzZSwgJ0I2JzogZmFsc2UsICdCNyc6IGZhbHNlLCAnQjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0MxJzogZmFsc2UsICdDMic6IGZhbHNlLCAnQzMnOiBmYWxzZSwgJ0M0JzogZmFsc2UsICdDNSc6IGZhbHNlLCAnQzYnOiBmYWxzZSwgJ0M3JzogZmFsc2UsICdDOCc6IGZhbHNlLCBcclxuICAgICAgICAnRDEnOiBmYWxzZSwgJ0QyJzogZmFsc2UsICdEMyc6IGZhbHNlLCAnRDQnOiBmYWxzZSwgJ0Q1JzogZmFsc2UsICdENic6IGZhbHNlLCAnRDcnOiBmYWxzZSwgJ0Q4JzogZmFsc2UsIFxyXG4gICAgICAgICdFMSc6IGZhbHNlLCAnRTInOiBmYWxzZSwgJ0UzJzogZmFsc2UsICdFNCc6IGZhbHNlLCAnRTUnOiBmYWxzZSwgJ0U2JzogZmFsc2UsICdFNyc6IGZhbHNlLCAnRTgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0YxJzogZmFsc2UsICdGMic6IGZhbHNlLCAnRjMnOiBmYWxzZSwgJ0Y0JzogZmFsc2UsICdGNSc6IGZhbHNlLCAnRjYnOiBmYWxzZSwgJ0Y3JzogZmFsc2UsICdGOCc6IGZhbHNlLCBcclxuICAgICAgICAnRzEnOiBmYWxzZSwgJ0cyJzogZmFsc2UsICdHMyc6IGZhbHNlLCAnRzQnOiBmYWxzZSwgJ0c1JzogZmFsc2UsICdHNic6IGZhbHNlLCAnRzcnOiBmYWxzZSwgJ0c4JzogZmFsc2UsIFxyXG4gICAgICAgICdIMSc6IGZhbHNlLCAnSDInOiBmYWxzZSwgJ0gzJzogZmFsc2UsICdINCc6IGZhbHNlLCAnSDUnOiBmYWxzZSwgJ0g2JzogZmFsc2UsICdINyc6IGZhbHNlLCAnSDgnOiBmYWxzZSBcclxuICAgIH1cclxuXHJcbiAgICBsZXQgX2JvYXJkU2hpcHMgPSBbXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRCb2FyZEdyaWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkR3JpZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEJvYXJkU2hpcHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHNcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgcG9wdWxhdGVHYW1lYm9hcmQgPSAoY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICB3aGlsZSggaW5kZXggPCBjb29yZGluYXRlcy5sZW5ndGggKXtcclxuICAgICAgICAgICAgY3JlYXRlU2hpcCguLi5jb29yZGluYXRlc1tpbmRleF0pXHJcbiAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5jb21pbmctcXVlcnkgKGFzc2VydCByZXN1bHQpIFhcclxuICAgIGNvbnN0IGNyZWF0ZVNoaXAgPSAoLi4uY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGlmKGlzQ29vcmRzQXZhaWxhYmxlKGNvb3JkaW5hdGVzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgID0gU2hpcCguLi5jb29yZGluYXRlcykgXHJcbiAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gYWRkU2hpcFRvU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3Qoc2hpcClcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KVxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIgPSAoY29vcmRzKT0+e1xyXG4gICAgICAgIGlmKGlzQXR0YWNrVmFsaWQoY29vcmRzKSAmJiBpc1NoaXBIaXQoY29vcmRzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBmaW5kU2hpcEJ5Q29vcmRzKGNvb3JkcylcclxuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmtOZXh0SGl0KCkpe1xyXG4gICAgICAgICAgICAgICAgX2JvYXJkU2hpcHMgPSByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU2hpcFNxdWFyZShjb29yZHMsc2hpcClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU2hpcFNxdWFyZSA9IChjb29yZHMsc2hpcCkgPT57XHJcbiAgICAgICAgc2hpcC5yZW1vdmVTcXVhcmVIaXQoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgIH1cclxuIFxyXG4gICAgLy8gUXVlcnkgJiBDb21tYW5kIHNlbGYgeFxyXG4gICAgY29uc3QgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0ID0gKHNoaXApID0+e1xyXG4gICAgICAgIHNoaXAuZ2V0U2hpcENvb3JkKCkuZm9yRWFjaChjb29yZCA9PntcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoX2JvYXJkR3JpZCkuZm9yRWFjaChrZXkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihrZXkgPT09IGNvb3JkKSB7X2JvYXJkR3JpZFtrZXldID0gdHJ1ZX0gXHJcbiAgICAgICAgICAgIH0pICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkU2hpcFRvU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gWy4uLl9ib2FyZFNoaXBzLHNoaXBdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsuLi5fYm9hcmRHcmlkfSwge1tgJHtjb29yZHN9YF06ICdIaXQnfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gZmluZFNoaXBJbmRleEJ5TmFtZShzaGlwKVxyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maWx0ZXIoYXJyYXlTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuaW5kZXhPZihhcnJheVNoaXApICE9PSBzaGlwSW5kZXggXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuIFxyXG4gICAgY29uc3QgZmluZFNoaXBCeUNvb3JkcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maW5kKHNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBzaGlwLmdldFNoaXBDb29yZCgpLmluY2x1ZGVzKGNvb3JkcykgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaW5kU2hpcEluZGV4QnlOYW1lID0gKHNoaXApID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maW5kSW5kZXgoY3VycmVudFNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50U2hpcC5nZXRTaGlwTmFtZSgpID09PSBzaGlwLmdldFNoaXBOYW1lKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzU2hpcEhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzICYmIF9ib2FyZEdyaWRba2V5XSkgeyByZXR1cm4gdHJ1ZSB9ICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzQWxsU2hpcHNTdW5rID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChfYm9hcmRTaGlwcy5sZW5ndGggPT09IDApID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNDb29yZHNBdmFpbGFibGUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXhBcnJheSA9IDBcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkc1tpbmRleEFycmF5XSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9ib2FyZEdyaWRba2V5XSkgPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGlzQXR0YWNrVmFsaWQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkcyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9ib2FyZEdyaWRba2V5XSkgPT09ICdIaXQnPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRCb2FyZEdyaWQsXHJcbiAgICAgICAgZ2V0Qm9hcmRTaGlwcyxcclxuICAgICAgICBjcmVhdGVTaGlwLFxyXG4gICAgICAgIGdldFNoaXBMZW5ndGhCeU5hbWUsXHJcbiAgICAgICAgcG9wdWxhdGVHYW1lYm9hcmQsXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIsXHJcbiAgICAgICAgaXNBbGxTaGlwc1N1bmssXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTaGlwTGVuZ3RoQnlOYW1lID0gKHNoaXBOYW1lKSA9PntcclxuICAgIGNvbnN0IF9TSElQX05BTUVTID0ge1xyXG4gICAgICAgICdzcHktMSc6IDEsXHJcbiAgICAgICAgJ3NweS0yJzogMSxcclxuICAgICAgICAnc3B5LTMnOiAxLFxyXG4gICAgICAgICdkZXN0cm95ZXItMSc6IDIsXHJcbiAgICAgICAgJ2Rlc3Ryb3llci0yJzogMixcclxuICAgICAgICAnZGVzdHJveWVyLTMnOiAyLFxyXG4gICAgICAgICdjcnVpc2VyJzogMyxcclxuICAgICAgICAnYmF0dGxlc2hpcCc6IDQsXHJcbiAgICAgICAgJ2NhcnJpZXInOiA1XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX1NISVBfTkFNRVNbc2hpcE5hbWVdXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IHJlbmRlclR1cm4sZHJhZ0VudGVyLGRyYWdTdGFydCxkcmFnT3ZlcixkcmFnTGVhdmUsZHJvcCB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmRDbGljayAoZ2FtZSl7XHJcbiAgICBjb25zdCBncmlkU3F1YXJlc0NvbXB1dGVyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZ3JpZFNxdWFyZXNDb21wdXRlci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PntcclxuICAgICAgICAgICAgcHJvY2Vzc1R1cm5EYXRhKGdhbWUsZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHByb2Nlc3NUdXJuRGF0YSA9IChnYW1lLGV2ZW50KSA9PntcclxuICAgIGNvbnN0IHR1cm5EYXRhID0gZ2FtZS5nYW1lVHVybihldmVudC50YXJnZXQuaWQpXHJcbiAgICBpZih0dXJuRGF0YSA9PT0gbnVsbCkgcmV0dXJuICAgICAgXHJcbiAgICByZW5kZXJUdXJuKHR1cm5EYXRhLGV2ZW50KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcgKCl7XHJcbiAgICBjb25zdCBncmlkU3F1YXJlc1BsYXllciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzUGxheWVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLGRyYWdFbnRlcilcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLGRyYWdPdmVyKVxyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLGRyYWdMZWF2ZSlcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsZHJvcClcclxuXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSgpe1xyXG4gICAgY29uc3Qgc2hpcHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb29sLXNoaXAucGxheWVyMScpKVxyXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwPT5cclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsZHJhZ1N0YXJ0KSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzICgpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc1R1cm5EYXRhKVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQbGF5ZXIobmFtZSl7XHJcbiAgICBjb25zdCBfcGxheWVyTmFtZSA9IG5hbWVcclxuXHJcbiAgICBsZXQgX2dhbWVib2FyZFxyXG5cclxuICAgIGxldCBfYXR0YWNrZWRTcXVhcmVzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfcGxheWVyTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfZ2FtZWJvYXJkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0QXR0YWNrZWRTcXVhcmVzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9hdHRhY2tlZFNxdWFyZXNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXRBdHRhY2tlZFNxdWFyZXMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBfYXR0YWNrZWRTcXVhcmVzLnB1c2goY29vcmRzKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUdhbWVCb2FyZCA9ICguLi5jb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgX2dhbWVib2FyZCA9IEdhbWVib2FyZCgpXHJcbiAgICAgICAgX2dhbWVib2FyZC5wb3B1bGF0ZUdhbWVib2FyZChjb29yZGluYXRlcylcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3Qgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGlmKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGNvb3JkcykpIHJldHVybiBudWxsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICAgICAgY29uc3QgYm9hcmRHcmlkID0gT2JqZWN0LmtleXMoZ2FtZWJvYXJkLmdldEJvYXJkR3JpZCgpKVxyXG4gICAgICAgIGNvbnN0IEJPQVJEX0dSSURfTEVOR1RIID0gYm9hcmRHcmlkLmxlbmd0aFxyXG5cclxuICAgICAgICBsZXQgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIHdoaWxlKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGJvYXJkR3JpZFtpbmRleF0pKXtcclxuICAgICAgICAgICAgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMoYm9hcmRHcmlkW2luZGV4XSlcclxuICAgICAgICByZXR1cm4gYm9hcmRHcmlkW2luZGV4XVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbU51bWJlciA9IChtYXgsbWluKSA9PntcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNQbGF5ZXJEZWZlYXRlZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAoX2dhbWVib2FyZC5nZXRCb2FyZFNoaXBzKCkubGVuZ3RoID09PSAwKSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybntcclxuICAgICAgICBnZXROYW1lLFxyXG4gICAgICAgIGdldEdhbWVib2FyZCxcclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMsXHJcbiAgICAgICAgY3JlYXRlR2FtZUJvYXJkLFxyXG4gICAgICAgIHNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUsXHJcbiAgICAgICAgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBpc1BsYXllckRlZmVhdGVkXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gU2hpcCguLi5jb29yZGluYXRlcyl7XHJcblxyXG4gICAgbGV0IF9zaGlwQ29vcmQgPSBjb29yZGluYXRlc1xyXG5cclxuICAgIGNvbnN0IF9TSElQX05BTUVTID0ge1xyXG4gICAgICAgIDEgOiAnU3B5JyxcclxuICAgICAgICAyIDogJ0Rlc3Ryb3llcicsXHJcbiAgICAgICAgMyA6ICdDcnVpc2VyJyxcclxuICAgICAgICA0IDogJ0JhdHRsZXNoaXAnLFxyXG4gICAgICAgIDUgOiAnQ2FycmllcidcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBfc2hpcE5hbWUgPSBfU0hJUF9OQU1FU1tfc2hpcENvb3JkLmxlbmd0aF1cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0U2hpcE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgZ2V0U2hpcENvb3JkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmRcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gSW5jb21pbmcgcXVlcnkgKGFzc2VydCByZXN1bHQgPiB0ZXN0ZWQgd2l0aCByZW1vdmVTcXVhcmVIaXQpXHJcbiAgICBjb25zdCBmaW5kSGl0SW5kZXggPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkcykgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFNlbGYgY29tbWFuZCB4XHJcbiAgICBjb25zdCByZW1vdmVTcXVhcmVIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBjb25zdCBpbmRleENvb3JkID0gZmluZEhpdEluZGV4KGNvb3JkcylcclxuICAgICAgICBfc2hpcENvb3JkID0gX3NoaXBDb29yZC5maWx0ZXIoY29vcmQgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmQpICE9PSBpbmRleENvb3JkIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHVyZSAvIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGlzU3Vua05leHRIaXQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5sZW5ndGggPT09IDEgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRTaGlwTmFtZSxcclxuICAgICAgICBnZXRTaGlwQ29vcmQsXHJcbiAgICAgICAgaXNTdW5rTmV4dEhpdCxcclxuICAgICAgICByZW1vdmVTcXVhcmVIaXRcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBnZXRTaGlwTGVuZ3RoQnlOYW1lIH0gZnJvbSAnLi4vbG9naWMvZ2FtZWJvYXJkJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclR1cm4gKHR1cm5EYXRhLGV2ZW50KXtcclxuICAgIGNvbnN0IHsgcGxheWVyRGF0YSxjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudCB9ID0gXHJcbiAgICAgICAgcmV0cmlldmVUdXJuRGF0YSh0dXJuRGF0YSlcclxuXHJcbiAgICByZW5kZXJCb2FyZFNxdWFyZXMocGxheWVyRGF0YSwgZXZlbnQudGFyZ2V0KVxyXG4gICAgcmVuZGVyQm9hcmRTcXVhcmVzKGNvbXB1dGVyRGF0YSwgYXR0YWNrZWRFbGVtZW50KVxyXG5cclxuICAgIHJlbmRlclR1cm5JbmZvKHR1cm5EYXRhLHR1cm5EYXRhLnBsYXllcjEpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJNYXRjaFJlc3VsdCA9IChwbGF5ZXJEYXRhKSA9PntcclxuICAgIGNvbnN0IHdpbm5lciA9IHBsYXllckRhdGEucGxheWVyMS5pc1BsYXllckRlZmVhdGVkKCkgXHJcbiAgICAgICAgPyAnQ29tcHV0ZXInXHJcbiAgICAgICAgOiBwbGF5ZXJEYXRhLnBsYXllcjEuZ2V0TmFtZSgpICAgXHJcblxyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gYCR7d2lubmVyfWAgKyAnIGlzIHRoZSB3aW5uZXIhJyBcclxufVxyXG5cclxuY29uc3QgcmV0cmlldmVUdXJuRGF0YSA9ICh0dXJuRGF0YSkgPT57XHJcbiAgICBjb25zdCBwbGF5ZXJEYXRhICAgICAgPSB0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyRGF0YSAgICA9IHR1cm5EYXRhLmlzQ29tcHV0ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgPSB0dXJuRGF0YS5jb21wdXRlckNvb3Jkc1xyXG4gICAgY29uc3QgYXR0YWNrZWRFbGVtZW50ID0gZmluZEhpdEVsZW1lbnQoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgcmV0dXJuIHsgcGxheWVyRGF0YSxjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudCB9XHJcbn1cclxuXHJcbmNvbnN0IGZpbmRIaXRFbGVtZW50ID0gKGNvb3JkcykgPT57XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllcjEgPiAjJHtjb29yZHN9YClcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRTcXVhcmVzID0gKHR1cm5EYXRhLCBlbGVtZW50KSA9PntcclxuICAgIGlmKGlzSGl0RWxlbWVudChlbGVtZW50KSkgcmV0dXJuICBcclxuICAgICh0dXJuRGF0YSkgPyByZW5kZXJTcXVhcmVPbk1pc3MoZWxlbWVudCkgOiByZW5kZXJTcXVhcmVPbkhpdChlbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCBpc0hpdEVsZW1lbnQgPSAoZWxlbWVudCkgPT57XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTcXVhcmVPbkhpdCA9IChlbGVtZW50KSA9PntcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXHJcbn1cclxuICBcclxuY29uc3QgcmVuZGVyU3F1YXJlT25NaXNzICA9IChlbGVtZW50KSA9PntcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWlzcycpXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclR1cm5JbmZvID0gKHR1cm5EYXRhLHBsYXllcjEpID0+e1xyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5nZXROYW1lKCl9IGF0dGFjayBpcyBhIGAgKyBcclxuICAodHVybkRhdGEuaXNQbGF5ZXJBdHRhY2tNaXNzID8gJ21pc3MhJyA6ICdoaXQhJylcclxuICBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyV2FybmluZ3NJbmZvID0gKCkgPT57XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBPblNpbmsgPSAoKSA9PntcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmFnU3RhcnQgKGV2ZW50KSB7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsZXZlbnQudGFyZ2V0LmlkKVxyXG4gICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGlkZScpXHJcbiAgICB9LDApXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdFbnRlciAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkcmFnT3ZlciAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKVxyXG5cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0xlYXZlIChldmVudCkge1xyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpXHJcblxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkcm9wIChldmVudCkge1xyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpXHJcbiAgICBjb25zdCBzaGlwSUQgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpXHJcbiAgICBjb25zdCBzcXVhcmVJRCA9IGV2ZW50LnRhcmdldC5pZCBcclxuICAgIGxldCBzcXVhcmVzVG9TdHlsZSA9IGdldFNoaXBMZW5ndGhCeU5hbWUoc2hpcElEKVxyXG4gICAgLy8gT05MWSBBREQgU1RZTEUsIERPIE5PVCBNQU5BR0UgQk9BUkRHUklEIEZST00gSEVSRVxyXG4gICAgcmVuZGVyU3F1YXJlc0hvcml6b250YWxseShzcXVhcmVJRCxzcXVhcmVzVG9TdHlsZSxzaGlwSUQpXHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXHJcbiAgICAvLyAoc2hpcERpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/IHJlbmRlclNxdWFyZXNWZXJ0aWNhbGx5KCkgOiByZW5kZXJTcXVhcmVzSG9yaXpvbnRhbGx5KCkpICAgXHJcbn1cclxuY29uc3QgcmVuZGVyU2hpcE9uRHJvcCA9IChjb29yZCkgPT57XHJcbiAgICBcclxufVxyXG5cclxuXHJcbmNvbnN0IHJlbmRlclNxdWFyZXNWZXJ0aWNhbGx5ID0gKHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlLHNoaXBJRCkgPT57XHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IG9yaWdpbmFsSW5kZXggPSBib2FyZEdyaWRBcnJheS5maW5kSW5kZXgoZWwgPT4gZWwuaWQgPT09IHNxdWFyZUlEKVxyXG4gICAgbGV0IGluZGV4VG9TdHlsZSA9IG9yaWdpbmFsSW5kZXhcclxuICAgIHRyeXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNxdWFyZXNUb1N0eWxlOyBpKyspIHtcclxuICAgICAgICAgICAgYm9hcmRHcmlkQXJyYXlbaW5kZXhUb1N0eWxlXS5jbGFzc0xpc3QuYWRkKCdzaGlwJylcclxuICAgICAgICAgICAgaW5kZXhUb1N0eWxlICs9IDhcclxuICAgICAgICB9XHJcbiAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgIGluZGV4VG9TdHlsZSAtPThcclxuICAgICAgICB3aGlsZShpbmRleFRvU3R5bGUgPj0gb3JpZ2luYWxJbmRleCl7XHJcbiAgICAgICAgICAgIGJvYXJkR3JpZEFycmF5W2luZGV4VG9TdHlsZV0uY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgICAgIGluZGV4VG9TdHlsZSAtPSA4XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNoaXBJblBvb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwSUQpXHJcbiAgICAgICAgY29uc29sZS5sb2coc2hpcEluUG9vbC5jbGFzc0xpc3QpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNxdWFyZXNIb3Jpem9udGFsbHkgPSAoc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKSA9PntcclxuICAgIGNvbnN0IG9yaWdpbmFsSW5kZXggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzcXVhcmVJRH1gKVxyXG4gICAgY29uc3Qgb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSA9IHNxdWFyZXNUb1N0eWxlXHJcbiAgICBsZXQgZWxlbWVudFRvU3R5bGUgPSBvcmlnaW5hbEluZGV4XHJcbiAgICBjb25zdCBzaGlwSW5Qb29sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG5cclxuICAgIHdoaWxlKHNxdWFyZXNUb1N0eWxlID4gMCAmJiAhZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdyb3cnKSl7XHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tIFxyXG4gICAgfVxyXG4gICAgaWYoc3F1YXJlc1RvU3R5bGUgPiAwKXtcclxuICAgICAgICB3aGlsZShzcXVhcmVzVG9TdHlsZSA8PSBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKXtcclxuICAgICAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgICAgIGVsZW1lbnRUb1N0eWxlID0gZWxlbWVudFRvU3R5bGUucHJldmlvdXNFbGVtZW50U2libGluZ1xyXG4gICAgICAgICAgICBzcXVhcmVzVG9TdHlsZSsrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoaXBJblBvb2wuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHNoaXBJblBvb2wucmVtb3ZlQXR0cmlidXRlKCdkcmFnZ2FibGUnKVxyXG4gICAgfSAgIFxyXG5cclxufSIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdGF0aWNFbGVtZW50cyhnYW1lYm9hcmQsIHBsYXllcjEsIHBsYXllcjIpe1xyXG4gICAgcmVuZGVyQm9hcmRPblJlc2V0KClcclxuICAgIHJlbmRlclNoaXBzKGdhbWVib2FyZClcclxuICAgIHJlbmRlclBsYXllck5hbWVzKHBsYXllcjEsIHBsYXllcjIpXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBzID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICBsZXQgaW5kZXggPSAwXHJcbiAgICBjb25zdCBib2FyZEdyaWQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmRHcmlkKClcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKGJvYXJkR3JpZCkpe1xyXG4gICAgICAgIGlmKGJvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgYm9hcmRHcmlkQXJyYXlbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleCsrXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCByZW5kZXJQbGF5ZXJOYW1lcyA9IChwbGF5ZXIxLCBwbGF5ZXIyKSA9PntcclxuICAgIGNvbnN0IHBsYXllcjFOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEtbmFtZScpXHJcbiAgICBjb25zdCBwbGF5ZXIyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyLW5hbWUnKVxyXG5cclxuICAgIHBsYXllcjFOYW1lLnRleHRDb250ZW50ID0gcGxheWVyMS5nZXROYW1lKCkgKyAnIFxcJ3MgZmxlZXQnXHJcbiAgICBwbGF5ZXIyTmFtZS50ZXh0Q29udGVudCA9IHBsYXllcjIuZ2V0TmFtZSgpICsgJyBcXCdzIGZsZWV0J1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJCb2FyZE9uUmVzZXQgPSAoKSA9PntcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5MSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5MiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcblxyXG4gICAgYm9hcmRHcmlkQXJyYXkxLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaGl0JylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnbWlzcycpXHJcbiAgICB9KVxyXG4gICAgYm9hcmRHcmlkQXJyYXkyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJylcclxuICAgIH0pIFxyXG5cclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gICcnXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==