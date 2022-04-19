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
/* harmony import */ var _view_renderStaticElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/renderStaticElements */ "./src/view/renderStaticElements.js");
/* harmony import */ var _view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/renderDynamicElements */ "./src/view/renderDynamicElements.js");
/* harmony import */ var _handleEventListeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handleEventListeners */ "./src/logic/handleEventListeners.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/logic/player.js");




// import { executeGame } from '/src/index'

function Game (){
    let coordsArray = []
    const el = document.querySelector('.gameboard-grid.player2')
    el.classList.remove('unclickable')

    const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_3__.Player)('Victor')
    player1.createGameBoard(
        ['G3'],
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

    // const prepareNextMatch = () =>{
    //     // Remove event listeners from board
    //     setTimeout(,2000)
    // }

    const addEventListenersDragShips = (game) =>{
        ;(0,_handleEventListeners__WEBPACK_IMPORTED_MODULE_2__.addEventListenerDraggable)()
        ;(0,_handleEventListeners__WEBPACK_IMPORTED_MODULE_2__.addEventListenersBoardDrag)(game)
    }

    const setCoordsArray = (ship) =>{
        coordsArray.push(ship)
    }

    const getCoordsArray = () =>{
        return coordsArray
    }

    const checkForGamePrepared = (game) =>{
        if (game.getCoordsArray().length >= 9){
            (0,_handleEventListeners__WEBPACK_IMPORTED_MODULE_2__.addEventListenersBoardClick)(game)
        }
    }

    return{gameTurn,addEventListenersDragShips,getCoordsArray,setCoordsArray,checkForGamePrepared}
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

function addEventListenersBoardDrag (game){
    const gridSquaresPlayer = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    gridSquaresPlayer.forEach(square =>{
        square.addEventListener('dragenter',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.dragEnter)
        square.addEventListener('dragover',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.dragOver)
        square.addEventListener('dragleave',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.dragLeave)
        square.addEventListener('drop',(event) =>{
            ;(0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.handleDropEvent)(event,game)
        })
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

/***/ "./src/view/handleStylingEventsData.js":
/*!*********************************************!*\
  !*** ./src/view/handleStylingEventsData.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkIfRenderOrRestore": () => (/* binding */ checkIfRenderOrRestore),
/* harmony export */   "emptyCoordsArray": () => (/* binding */ emptyCoordsArray),
/* harmony export */   "isHorizontalOverflowing": () => (/* binding */ isHorizontalOverflowing),
/* harmony export */   "isHorizontalOverlapping": () => (/* binding */ isHorizontalOverlapping),
/* harmony export */   "isNextSquareValid": () => (/* binding */ isNextSquareValid),
/* harmony export */   "isPlacedAboveOtherShip": () => (/* binding */ isPlacedAboveOtherShip),
/* harmony export */   "isRenderSuccesful": () => (/* binding */ isRenderSuccesful),
/* harmony export */   "isSquaresHigher": () => (/* binding */ isSquaresHigher),
/* harmony export */   "isSquaresHigherOrEqual": () => (/* binding */ isSquaresHigherOrEqual),
/* harmony export */   "isVerticalOverlapping": () => (/* binding */ isVerticalOverlapping),
/* harmony export */   "moveToNextColumn": () => (/* binding */ moveToNextColumn),
/* harmony export */   "moveToNextRow": () => (/* binding */ moveToNextRow),
/* harmony export */   "moveToPreviousRow": () => (/* binding */ moveToPreviousRow),
/* harmony export */   "restoreRenderHorizontalOverflow": () => (/* binding */ restoreRenderHorizontalOverflow),
/* harmony export */   "restoreRenderHorizontalOverlap": () => (/* binding */ restoreRenderHorizontalOverlap),
/* harmony export */   "restoreRenderVerticalOverflow": () => (/* binding */ restoreRenderVerticalOverflow),
/* harmony export */   "restoreRenderVerticalOverlap": () => (/* binding */ restoreRenderVerticalOverlap),
/* harmony export */   "restoreShipRender": () => (/* binding */ restoreShipRender),
/* harmony export */   "retrieveDataBoardHorizontally": () => (/* binding */ retrieveDataBoardHorizontally),
/* harmony export */   "retrieveDataBoardVertically": () => (/* binding */ retrieveDataBoardVertically),
/* harmony export */   "retrieveDataDrop": () => (/* binding */ retrieveDataDrop),
/* harmony export */   "retrieveTurnData": () => (/* binding */ retrieveTurnData)
/* harmony export */ });
/* harmony import */ var _logic_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logic/gameboard */ "./src/logic/gameboard.js");


const retrieveTurnData = (turnData) =>{
    const playerData      = turnData.isPlayerAttackMiss
    const computerData    = turnData.isComputerAttackMiss
    const computerCoords  = turnData.computerCoords
    const attackedElement = findHitElement(computerCoords)

    return { playerData,computerData, attackedElement }
}

const retrieveDataDrop = (event) =>{
    const shipID       = event.dataTransfer.getData('text/plain')
    const squareID     = event.target.id 
    let squaresToStyle = (0,_logic_gameboard__WEBPACK_IMPORTED_MODULE_0__.getShipLengthByName)(shipID)

    return {shipID,squareID,squaresToStyle}
}

const retrieveDataBoardVertically = (squareID,shipID) =>{
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    const originalIndex  = boardGridArray.findIndex(el => el.id === squareID)
    const shipInPool     = document.getElementById(shipID)
    let indexToStyle     = originalIndex

    return {boardGridArray, originalIndex, shipInPool, indexToStyle}
}

const retrieveDataBoardHorizontally = (squareID,shipID,squaresToStyle) =>{
    const originalSquaresToStyle = squaresToStyle
    const originalIndex          = document.getElementById(`${squareID}`)
    const shipInPool             = document.getElementById(shipID)
    let elementToStyle           = originalIndex

    return {elementToStyle, originalIndex, shipInPool, originalSquaresToStyle}
}

const restoreShipRender = (squaresToStyle,elementToStyle,originalSquaresToStyle,originalIndex) =>{
    if(isHorizontalOverlapping(squaresToStyle,elementToStyle,originalIndex)){
        restoreRenderHorizontalOverlap(squaresToStyle,originalSquaresToStyle,elementToStyle)
        return
    }

    if(isPlacedAboveOtherShip(squaresToStyle,elementToStyle,originalSquaresToStyle)){
        shipInPool.classList.remove('hide')
        return
    }

    if(isHorizontalOverflowing(squaresToStyle,elementToStyle)){
        restoreRenderHorizontalOverflow(squaresToStyle,originalSquaresToStyle,elementToStyle)
        return
    }
}

const restoreRenderVerticalOverflow = (indexToStyle,originalIndex,boardGridArray) =>{
    while(indexToStyle >= originalIndex){
        boardGridArray[indexToStyle].classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
}

const restoreRenderVerticalOverlap = (currentSquare,originalIndex,coords) =>{
    coords = emptyCoordsArray(coords)
    indexToStyle = moveToPreviousRow(indexToStyle)
    while(indexToStyle >= originalIndex){
        currentSquare.classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
} 

const restoreRenderHorizontalOverflow = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{
    while(squaresToStyle <= originalSquaresToStyle){
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
}

const restoreRenderHorizontalOverlap = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{

    const isAllSquaresNotRestored = 
        elementToStyle.classList.contains('row') 
            ? isSquaresHigher
            : isSquaresHigherOrEqual
        
    elementToStyle = elementToStyle.previousElementSibling

    while(isAllSquaresNotRestored(squaresToStyle,originalSquaresToStyle)){
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
}


const checkIfRenderOrRestore = (currentSquare,originalIndex,coords) =>{
    if(isVerticalOverlapping(currentSquare) ){
        restoreRenderVerticalOverlap(currentSquare,originalIndex,coords) 
        return true
    }
    coords.push(currentSquare.id)
    console.log(coords)
    currentSquare.classList.add('ship')
    return false
  
}


const isNextSquareValid = (squaresToStyle,elementToStyle,originalSquaresToStyle) =>{
    return (squaresToStyle > 0) 
        && (!elementToStyle.classList.contains('ship')) 
        && (!elementToStyle.classList.contains('row') 
        || (squaresToStyle === originalSquaresToStyle))
}

const isVerticalOverlapping = (currentSquare) =>{
    return currentSquare.classList.contains('ship')
}

const isHorizontalOverflowing = (squaresToStyle,elementToStyle) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('row'))
}

const isHorizontalOverlapping = (squaresToStyle,elementToStyle,originalIndex) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('ship')
        || (originalIndex.previousElementSibling.classList.contains('ship')))      
}

const isPlacedAboveOtherShip = (squaresToStyle,elementToStyle,originalSquaresToStyle) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('ship')) 
        && (squaresToStyle === originalSquaresToStyle)
}

const isSquaresHigher = (squaresToStyle,originalSquaresToStyle) =>{
    return squaresToStyle < originalSquaresToStyle
}

const isSquaresHigherOrEqual = (squaresToStyle,originalSquaresToStyle) =>{
    return squaresToStyle <= originalSquaresToStyle
}

const isRenderSuccesful = (squaresToStyle) =>{
    return squaresToStyle === 0
}

const moveToNextRow = (indexToStyle) =>{
    return  indexToStyle += 8
}

const moveToPreviousRow = (indexToStyle) =>{
    return  indexToStyle -= 8

}

const moveToNextColumn = () =>{

}


const emptyCoordsArray = (coords) =>{
    return coords.length = 0
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
/* harmony export */   "handleDropEvent": () => (/* binding */ handleDropEvent),
/* harmony export */   "renderMatchResult": () => (/* binding */ renderMatchResult),
/* harmony export */   "renderTurn": () => (/* binding */ renderTurn)
/* harmony export */ });
/* harmony import */ var _handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handleStylingEventsData */ "./src/view/handleStylingEventsData.js");



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

function handleDropEvent (event,game) {
    const {shipID, squareID ,squaresToStyle} = (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataDrop)(event)
    // Ship direction will change based on some DOM class?
    // (shipDirection === 'vertical' ? renderSquaresVertically() : renderSquaresHorizontally())   
    const shipCoords = renderShipHorizontally(squareID,squaresToStyle,shipID)
  
    event.target.classList.remove('drag-over')
    event.target.classList.remove('hide')
    game.setCoordsArray(shipCoords)
    game.checkForGamePrepared(game)
}

const renderShipVertically = (squareID,squaresToStyle,shipID) =>{
    let coords = []
    let { boardGridArray, originalIndex, shipInPool, indexToStyle } =
      (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataBoardVertically)(squareID,shipID)
    
    try{
        for (let i = 0; i < squaresToStyle; i++) {
            let currentSquare = boardGridArray[indexToStyle]
            let isSquareInvalid =  (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.checkIfRenderOrRestore)(currentSquare,originalIndex,coords,indexToStyle)
            if(isSquareInvalid) return
            indexToStyle = (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.moveToNextRow)(indexToStyle)
        }
        shipInPool.classList.add('hide')
        shipInPool.removeAttribute('draggable')
        return coords
        
    }catch(error){
        // Will trigger if ship placement 
        // overflows from the bottom
        coords = (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.emptyCoordsArray)(coords)
        indexToStyle = (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.moveToPreviousRow)(indexToStyle)
        ;(0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.restoreRenderVerticalOverflow)(indexToStyle,originalIndex,boardGridArray)
    } 
}

const renderSquareVertically = () =>{
  
}

const renderShipHorizontally = (squareID,squaresToStyle,shipID) =>{
    
    let {elementToStyle, originalIndex, shipInPool, originalSquaresToStyle}=
      (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataBoardHorizontally)(squareID,shipID,squaresToStyle)
    let coords = []
  
    while((0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.isNextSquareValid)(squaresToStyle,elementToStyle,originalSquaresToStyle)){
        elementToStyle.classList.add('ship')
        elementToStyle = elementToStyle.nextElementSibling
        coords.push(elementToStyle.id)
        squaresToStyle-- 
    }
    
    if(squaresToStyle != 0){
        (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.restoreShipRender)(
            squaresToStyle,
            elementToStyle,
            originalSquaresToStyle,
            originalIndex)
        coords = (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.emptyCoordsArray)(coords)
        shipInPool.classList.remove('hide')
        return
    }
      
    shipInPool.classList.add('hide')
    shipInPool.removeAttribute('draggable')
    return coords
      
}
    
const renderSquaresHorizontally = (elementToStyle,squaresToStyle,coords) =>{
    while((0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.isNextSquareValid)(squaresToStyle,elementToStyle,originalSquaresToStyle)){
        elementToStyle.classList.add('ship')
        elementToStyle = elementToStyle.nextElementSibling
        coords.push(elementToStyle.id)
        squaresToStyle-- 
    }
}
    
function dragStart (event) {
    event.dataTransfer.setData('text/plain',event.target.id)
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
    matchInfoEl.textContent = `${player1.getName()} attack is a ` 
    + (turnData.isPlayerAttackMiss) ? 'miss!' : 'hit!'
  
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic/game */ "./src/logic/game.js");
/* harmony import */ var _logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/handleEventListeners */ "./src/logic/handleEventListeners.js");



const prepareGame = (game) =>{
    game.addEventListenersDragShips(game)
}

const game = (0,_logic_game__WEBPACK_IMPORTED_MODULE_0__.Game)()
prepareGame(game)


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUU7QUFDRjtBQUNnRjtBQUNoSDtBQUNqQyxZQUFZLGNBQWM7QUFDMUI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFNO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpRkFBb0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDRFQUFvQjtBQUNoQyxZQUFZLCtFQUFpQixFQUFFLGdCQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlGQUF5QjtBQUNqQyxRQUFRLGtGQUEwQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGtGQUEyQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckc2QjtBQUN0QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDJDQUFJO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkMsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjLEdBQUcsSUFBSSxPQUFPLFVBQVU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SmlIO0FBQ2pIO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0VBQVU7QUFDZDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsNENBQTRDLGtFQUFTO0FBQ3JELDJDQUEyQyxpRUFBUTtBQUNuRCw0Q0FBNEMsa0VBQVM7QUFDckQ7QUFDQSxZQUFZLDZFQUFlO0FBQzNCLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLDBDQUEwQyxrRUFBUztBQUNuRDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ3VDO0FBQ3ZDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFEQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRHdEO0FBQ3hEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSx5QkFBeUIscUVBQW1CO0FBQzVDO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNPO0FBQ1A7QUFDQSw4REFBOEQsU0FBUztBQUN2RTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSmtDO0FBQ2xDO0FBQ0E7QUFDTztBQUNQLFlBQVksMkNBQTJDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsT0FBTztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQLFdBQVcsa0NBQWtDLEVBQUUsMEVBQWdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsMERBQTBEO0FBQ3BFLE1BQU0scUZBQTJCO0FBQ2pDO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDO0FBQ0EsbUNBQW1DLGdGQUFzQjtBQUN6RDtBQUNBLDJCQUEyQix1RUFBYTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpQkFBaUIsMEVBQWdCO0FBQ2pDLHVCQUF1QiwyRUFBaUI7QUFDeEMsUUFBUSx3RkFBNkI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxrRUFBa0U7QUFDM0UsTUFBTSx1RkFBNkI7QUFDbkM7QUFDQTtBQUNBLFVBQVUsMkVBQWlCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyRUFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEVBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDJFQUFpQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELE9BQU87QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3BMTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7OztVQzNDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051RDtBQUNpQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxpREFBSTtBQUNqQjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvaGFuZGxlRXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvcGxheWVyLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3NoaXAuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy9oYW5kbGVTdHlsaW5nRXZlbnRzRGF0YS5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlclN0YXRpY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyU3RhdGljRWxlbWVudHMgfSBmcm9tICcuLi92aWV3L3JlbmRlclN0YXRpY0VsZW1lbnRzJ1xyXG5pbXBvcnQgeyByZW5kZXJNYXRjaFJlc3VsdCB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzJ1xyXG5pbXBvcnQgeyByZW1vdmVFdmVudExpc3RlbmVycywgYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSwgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcsIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmRDbGljayB9IGZyb20gJy4vaGFuZGxlRXZlbnRMaXN0ZW5lcnMnXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xyXG4vLyBpbXBvcnQgeyBleGVjdXRlR2FtZSB9IGZyb20gJy9zcmMvaW5kZXgnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2FtZSAoKXtcclxuICAgIGxldCBjb29yZHNBcnJheSA9IFtdXHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQtZ3JpZC5wbGF5ZXIyJylcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VuY2xpY2thYmxlJylcclxuXHJcbiAgICBjb25zdCBwbGF5ZXIxID0gUGxheWVyKCdWaWN0b3InKVxyXG4gICAgcGxheWVyMS5jcmVhdGVHYW1lQm9hcmQoXHJcbiAgICAgICAgWydHMyddLFxyXG4gICAgICAgIFsnQzUnLCdINiddLFxyXG4gICAgICAgIFsnQjcnLCdEMScsJ0gxJ10sXHJcbiAgICAgICAgWydDNicsJ0E1JywnRDgnLCdEMiddLFxyXG4gICAgICAgIFsnRTEnLCdFMicsJ0UzJywnRTQnLCdBNSddXHJcbiAgICApXHJcbiAgICBjb25zdCBwbGF5ZXIyID0gUGxheWVyKCdDb21wdXRlcicpXHJcbiAgICBwbGF5ZXIyLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICBbJ0c4J10sXHJcbiAgICAgICAgWydCMScsJ0IyJ10sXHJcbiAgICAgICAgWydDMScsJ0MyJywnQzMnXSxcclxuICAgICAgICBbJ0QxJywnRDInLCdEMycsJ0Q0J10sXHJcbiAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0U1J11cclxuICAgIClcclxuXHJcbiAgICBsZXQgZ2FtZWJvYXJkMSAgICAgPSBwbGF5ZXIxLmdldEdhbWVib2FyZCgpXHJcbiAgICBsZXQgZ2FtZWJvYXJkMiAgICAgPSBwbGF5ZXIyLmdldEdhbWVib2FyZCgpXHJcbiAgICBsZXQgcGxheWVySW5UdXJuICAgPSBwbGF5ZXIxXHJcbiAgICBsZXQgZW5lbXlHYW1lYm9hcmQgPSBnYW1lYm9hcmQyXHJcblxyXG4gICAgcmVuZGVyU3RhdGljRWxlbWVudHMoZ2FtZWJvYXJkMSwgcGxheWVyMSwgcGxheWVyMilcclxuXHJcbiAgICBjb25zdCBnYW1lVHVybiA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGNvbnN0IHBsYXllckNvb3JkcyA9IHBsYXllckluVHVybi5zZW5kQXR0YWNrQ29vcmRzVG9HYW1lKGNvb3JkcylcclxuICAgICAgICBpZihwbGF5ZXJDb29yZHMgPT09IG51bGwpIHJldHVybiBudWxsXHJcbiAgXHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJBdHRhY2tNaXNzICAgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihwbGF5ZXJDb29yZHMpIFxyXG4gICAgICAgIHBsYXllckluVHVybiAgICAgICAgICAgICAgID0gc3dpdGNoUGxheWVycygpXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgICAgICAgICAgICAgPSBzd2l0Y2hHYW1lYm9hcmRzKClcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgICAgICA9IHBsYXllckluVHVybi5zZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lKGVuZW15R2FtZWJvYXJkKVxyXG4gICAgICAgIGNvbnN0IGlzQ29tcHV0ZXJBdHRhY2tNaXNzID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIoY29tcHV0ZXJDb29yZHMpXHJcbiAgICAgICAgcGxheWVySW5UdXJuICAgICAgICAgICAgICAgPSBzd2l0Y2hQbGF5ZXJzKClcclxuICAgICAgICBlbmVteUdhbWVib2FyZCAgICAgICAgICAgICA9IHN3aXRjaEdhbWVib2FyZHMoKVxyXG5cclxuICAgICAgICBpZihpc0FueVBsYXllckRlZmVhdGVkKCkpe1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd1bmNsaWNrYWJsZScpXHJcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKClcclxuICAgICAgICAgICAgcmVuZGVyTWF0Y2hSZXN1bHQoe3BsYXllcjEscGxheWVyMn0pXHJcbiAgICAgICAgICAgIHByZXBhcmVOZXh0TWF0Y2goKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGxheWVyMSxcclxuICAgICAgICAgICAgaXNQbGF5ZXJBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBpc0NvbXB1dGVyQXR0YWNrTWlzcyxcclxuICAgICAgICAgICAgY29tcHV0ZXJDb29yZHNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoUGxheWVycyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAocGxheWVySW5UdXJuID09PSBwbGF5ZXIyKSA/IHBsYXllcjEgOiBwbGF5ZXIyXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoR2FtZWJvYXJkcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAocGxheWVySW5UdXJuID09PSBwbGF5ZXIyKSA/IGdhbWVib2FyZDEgOiBnYW1lYm9hcmQyXHJcbiAgICB9ICAgXHJcblxyXG4gICAgY29uc3QgaXNBbnlQbGF5ZXJEZWZlYXRlZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXIxLmlzUGxheWVyRGVmZWF0ZWQoKSB8fCBwbGF5ZXIyLmlzUGxheWVyRGVmZWF0ZWQoKVxyXG4gICAgfSBcclxuXHJcbiAgICAvLyBjb25zdCBwcmVwYXJlTmV4dE1hdGNoID0gKCkgPT57XHJcbiAgICAvLyAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmcm9tIGJvYXJkXHJcbiAgICAvLyAgICAgc2V0VGltZW91dCgsMjAwMClcclxuICAgIC8vIH1cclxuXHJcbiAgICBjb25zdCBhZGRFdmVudExpc3RlbmVyc0RyYWdTaGlwcyA9IChnYW1lKSA9PntcclxuICAgICAgICBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlKClcclxuICAgICAgICBhZGRFdmVudExpc3RlbmVyc0JvYXJkRHJhZyhnYW1lKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNldENvb3Jkc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIGNvb3Jkc0FycmF5LnB1c2goc2hpcClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRDb29yZHNBcnJheSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjb29yZHNBcnJheVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoZWNrRm9yR2FtZVByZXBhcmVkID0gKGdhbWUpID0+e1xyXG4gICAgICAgIGlmIChnYW1lLmdldENvb3Jkc0FycmF5KCkubGVuZ3RoID49IDkpe1xyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2soZ2FtZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue2dhbWVUdXJuLGFkZEV2ZW50TGlzdGVuZXJzRHJhZ1NoaXBzLGdldENvb3Jkc0FycmF5LHNldENvb3Jkc0FycmF5LGNoZWNrRm9yR2FtZVByZXBhcmVkfVxyXG59XHJcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lYm9hcmQoKXsgICAgXHJcbiAgIFxyXG4gICAgbGV0IF9ib2FyZEdyaWQgPSBcclxuICAgIHtcclxuICAgICAgICAnQTEnOiBmYWxzZSwgJ0EyJzogZmFsc2UsICdBMyc6IGZhbHNlLCAnQTQnOiBmYWxzZSwgJ0E1JzogZmFsc2UsICdBNic6IGZhbHNlLCAnQTcnOiBmYWxzZSwgJ0E4JzogZmFsc2UsIFxyXG4gICAgICAgICdCMSc6IGZhbHNlLCAnQjInOiBmYWxzZSwgJ0IzJzogZmFsc2UsICdCNCc6IGZhbHNlLCAnQjUnOiBmYWxzZSwgJ0I2JzogZmFsc2UsICdCNyc6IGZhbHNlLCAnQjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0MxJzogZmFsc2UsICdDMic6IGZhbHNlLCAnQzMnOiBmYWxzZSwgJ0M0JzogZmFsc2UsICdDNSc6IGZhbHNlLCAnQzYnOiBmYWxzZSwgJ0M3JzogZmFsc2UsICdDOCc6IGZhbHNlLCBcclxuICAgICAgICAnRDEnOiBmYWxzZSwgJ0QyJzogZmFsc2UsICdEMyc6IGZhbHNlLCAnRDQnOiBmYWxzZSwgJ0Q1JzogZmFsc2UsICdENic6IGZhbHNlLCAnRDcnOiBmYWxzZSwgJ0Q4JzogZmFsc2UsIFxyXG4gICAgICAgICdFMSc6IGZhbHNlLCAnRTInOiBmYWxzZSwgJ0UzJzogZmFsc2UsICdFNCc6IGZhbHNlLCAnRTUnOiBmYWxzZSwgJ0U2JzogZmFsc2UsICdFNyc6IGZhbHNlLCAnRTgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0YxJzogZmFsc2UsICdGMic6IGZhbHNlLCAnRjMnOiBmYWxzZSwgJ0Y0JzogZmFsc2UsICdGNSc6IGZhbHNlLCAnRjYnOiBmYWxzZSwgJ0Y3JzogZmFsc2UsICdGOCc6IGZhbHNlLCBcclxuICAgICAgICAnRzEnOiBmYWxzZSwgJ0cyJzogZmFsc2UsICdHMyc6IGZhbHNlLCAnRzQnOiBmYWxzZSwgJ0c1JzogZmFsc2UsICdHNic6IGZhbHNlLCAnRzcnOiBmYWxzZSwgJ0c4JzogZmFsc2UsIFxyXG4gICAgICAgICdIMSc6IGZhbHNlLCAnSDInOiBmYWxzZSwgJ0gzJzogZmFsc2UsICdINCc6IGZhbHNlLCAnSDUnOiBmYWxzZSwgJ0g2JzogZmFsc2UsICdINyc6IGZhbHNlLCAnSDgnOiBmYWxzZSBcclxuICAgIH1cclxuXHJcbiAgICBsZXQgX2JvYXJkU2hpcHMgPSBbXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRCb2FyZEdyaWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkR3JpZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEJvYXJkU2hpcHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHNcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgcG9wdWxhdGVHYW1lYm9hcmQgPSAoY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICB3aGlsZSggaW5kZXggPCBjb29yZGluYXRlcy5sZW5ndGggKXtcclxuICAgICAgICAgICAgY3JlYXRlU2hpcCguLi5jb29yZGluYXRlc1tpbmRleF0pXHJcbiAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5jb21pbmctcXVlcnkgKGFzc2VydCByZXN1bHQpIFhcclxuICAgIGNvbnN0IGNyZWF0ZVNoaXAgPSAoLi4uY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGlmKGlzQ29vcmRzQXZhaWxhYmxlKGNvb3JkaW5hdGVzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgID0gU2hpcCguLi5jb29yZGluYXRlcykgXHJcbiAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gYWRkU2hpcFRvU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3Qoc2hpcClcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KVxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIgPSAoY29vcmRzKT0+e1xyXG4gICAgICAgIGlmKGlzQXR0YWNrVmFsaWQoY29vcmRzKSAmJiBpc1NoaXBIaXQoY29vcmRzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBmaW5kU2hpcEJ5Q29vcmRzKGNvb3JkcylcclxuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmtOZXh0SGl0KCkpe1xyXG4gICAgICAgICAgICAgICAgX2JvYXJkU2hpcHMgPSByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU2hpcFNxdWFyZShjb29yZHMsc2hpcClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU2hpcFNxdWFyZSA9IChjb29yZHMsc2hpcCkgPT57XHJcbiAgICAgICAgc2hpcC5yZW1vdmVTcXVhcmVIaXQoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgIH1cclxuIFxyXG4gICAgLy8gUXVlcnkgJiBDb21tYW5kIHNlbGYgeFxyXG4gICAgY29uc3QgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0ID0gKHNoaXApID0+e1xyXG4gICAgICAgIHNoaXAuZ2V0U2hpcENvb3JkKCkuZm9yRWFjaChjb29yZCA9PntcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoX2JvYXJkR3JpZCkuZm9yRWFjaChrZXkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihrZXkgPT09IGNvb3JkKSB7X2JvYXJkR3JpZFtrZXldID0gdHJ1ZX0gXHJcbiAgICAgICAgICAgIH0pICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkU2hpcFRvU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gWy4uLl9ib2FyZFNoaXBzLHNoaXBdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsuLi5fYm9hcmRHcmlkfSwge1tgJHtjb29yZHN9YF06ICdIaXQnfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gZmluZFNoaXBJbmRleEJ5TmFtZShzaGlwKVxyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maWx0ZXIoYXJyYXlTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuaW5kZXhPZihhcnJheVNoaXApICE9PSBzaGlwSW5kZXggXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuIFxyXG4gICAgY29uc3QgZmluZFNoaXBCeUNvb3JkcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maW5kKHNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBzaGlwLmdldFNoaXBDb29yZCgpLmluY2x1ZGVzKGNvb3JkcykgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmaW5kU2hpcEluZGV4QnlOYW1lID0gKHNoaXApID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maW5kSW5kZXgoY3VycmVudFNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50U2hpcC5nZXRTaGlwTmFtZSgpID09PSBzaGlwLmdldFNoaXBOYW1lKClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzU2hpcEhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzICYmIF9ib2FyZEdyaWRba2V5XSkgeyByZXR1cm4gdHJ1ZSB9ICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzQWxsU2hpcHNTdW5rID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChfYm9hcmRTaGlwcy5sZW5ndGggPT09IDApID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNDb29yZHNBdmFpbGFibGUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXhBcnJheSA9IDBcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkc1tpbmRleEFycmF5XSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9ib2FyZEdyaWRba2V5XSkgPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IGlzQXR0YWNrVmFsaWQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkcyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9ib2FyZEdyaWRba2V5XSkgPT09ICdIaXQnPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRCb2FyZEdyaWQsXHJcbiAgICAgICAgZ2V0Qm9hcmRTaGlwcyxcclxuICAgICAgICBjcmVhdGVTaGlwLFxyXG4gICAgICAgIGdldFNoaXBMZW5ndGhCeU5hbWUsXHJcbiAgICAgICAgcG9wdWxhdGVHYW1lYm9hcmQsXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIsXHJcbiAgICAgICAgaXNBbGxTaGlwc1N1bmssXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTaGlwTGVuZ3RoQnlOYW1lID0gKHNoaXBOYW1lKSA9PntcclxuICAgIGNvbnN0IF9TSElQX05BTUVTID0ge1xyXG4gICAgICAgICdzcHktMSc6IDEsXHJcbiAgICAgICAgJ3NweS0yJzogMSxcclxuICAgICAgICAnc3B5LTMnOiAxLFxyXG4gICAgICAgICdkZXN0cm95ZXItMSc6IDIsXHJcbiAgICAgICAgJ2Rlc3Ryb3llci0yJzogMixcclxuICAgICAgICAnZGVzdHJveWVyLTMnOiAyLFxyXG4gICAgICAgICdjcnVpc2VyJzogMyxcclxuICAgICAgICAnYmF0dGxlc2hpcCc6IDQsXHJcbiAgICAgICAgJ2NhcnJpZXInOiA1XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX1NISVBfTkFNRVNbc2hpcE5hbWVdXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IHJlbmRlclR1cm4sZHJhZ0VudGVyLGRyYWdTdGFydCxkcmFnT3ZlcixkcmFnTGVhdmUsaGFuZGxlRHJvcEV2ZW50IH0gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrIChnYW1lKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzQ29tcHV0ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc0NvbXB1dGVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+e1xyXG4gICAgICAgICAgICBwcm9jZXNzVHVybkRhdGEoZ2FtZSxldmVudClcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgcHJvY2Vzc1R1cm5EYXRhID0gKGdhbWUsZXZlbnQpID0+e1xyXG4gICAgY29uc3QgdHVybkRhdGEgPSBnYW1lLmdhbWVUdXJuKGV2ZW50LnRhcmdldC5pZClcclxuICAgIGlmKHR1cm5EYXRhID09PSBudWxsKSByZXR1cm4gICAgICBcclxuICAgIHJlbmRlclR1cm4odHVybkRhdGEsZXZlbnQpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyc0JvYXJkRHJhZyAoZ2FtZSl7XHJcbiAgICBjb25zdCBncmlkU3F1YXJlc1BsYXllciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzUGxheWVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLGRyYWdFbnRlcilcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLGRyYWdPdmVyKVxyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLGRyYWdMZWF2ZSlcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsKGV2ZW50KSA9PntcclxuICAgICAgICAgICAgaGFuZGxlRHJvcEV2ZW50KGV2ZW50LGdhbWUpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlKCl7XHJcbiAgICBjb25zdCBzaGlwcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvb2wtc2hpcC5wbGF5ZXIxJykpXHJcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXA9PlxyXG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JyxkcmFnU3RhcnQpKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMgKCl7XHJcbiAgICBjb25zdCBncmlkU3F1YXJlc0NvbXB1dGVyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZ3JpZFNxdWFyZXNDb21wdXRlci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzVHVybkRhdGEpXHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBsYXllcihuYW1lKXtcclxuICAgIGNvbnN0IF9wbGF5ZXJOYW1lID0gbmFtZVxyXG5cclxuICAgIGxldCBfZ2FtZWJvYXJkXHJcblxyXG4gICAgbGV0IF9hdHRhY2tlZFNxdWFyZXMgPSBbXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9wbGF5ZXJOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9nYW1lYm9hcmRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRBdHRhY2tlZFNxdWFyZXMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2F0dGFja2VkU3F1YXJlc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNldEF0dGFja2VkU3F1YXJlcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIF9hdHRhY2tlZFNxdWFyZXMucHVzaChjb29yZHMpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3JlYXRlR2FtZUJvYXJkID0gKC4uLmNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBfZ2FtZWJvYXJkID0gR2FtZWJvYXJkKClcclxuICAgICAgICBfZ2FtZWJvYXJkLnBvcHVsYXRlR2FtZWJvYXJkKGNvb3JkaW5hdGVzKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBzZW5kQXR0YWNrQ29vcmRzVG9HYW1lID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgaWYoZ2V0QXR0YWNrZWRTcXVhcmVzKCkuaW5jbHVkZXMoY29vcmRzKSkgcmV0dXJuIG51bGxcclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgICAgICBjb25zdCBib2FyZEdyaWQgPSBPYmplY3Qua2V5cyhnYW1lYm9hcmQuZ2V0Qm9hcmRHcmlkKCkpXHJcbiAgICAgICAgY29uc3QgQk9BUkRfR1JJRF9MRU5HVEggPSBib2FyZEdyaWQubGVuZ3RoXHJcblxyXG4gICAgICAgIGxldCBpbmRleCA9IGdlbmVyYXRlUmFuZG9tTnVtYmVyKDAsQk9BUkRfR1JJRF9MRU5HVEgpXHJcbiAgICAgICAgd2hpbGUoZ2V0QXR0YWNrZWRTcXVhcmVzKCkuaW5jbHVkZXMoYm9hcmRHcmlkW2luZGV4XSkpe1xyXG4gICAgICAgICAgICBpbmRleCA9IGdlbmVyYXRlUmFuZG9tTnVtYmVyKDAsQk9BUkRfR1JJRF9MRU5HVEgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhib2FyZEdyaWRbaW5kZXhdKVxyXG4gICAgICAgIHJldHVybiBib2FyZEdyaWRbaW5kZXhdXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tTnVtYmVyID0gKG1heCxtaW4pID0+e1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc1BsYXllckRlZmVhdGVkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChfZ2FtZWJvYXJkLmdldEJvYXJkU2hpcHMoKS5sZW5ndGggPT09IDApID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGdldE5hbWUsXHJcbiAgICAgICAgZ2V0R2FtZWJvYXJkLFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyxcclxuICAgICAgICBjcmVhdGVHYW1lQm9hcmQsXHJcbiAgICAgICAgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBzZW5kQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIGlzUGxheWVyRGVmZWF0ZWRcclxuICAgIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBTaGlwKC4uLmNvb3JkaW5hdGVzKXtcclxuXHJcbiAgICBsZXQgX3NoaXBDb29yZCA9IGNvb3JkaW5hdGVzXHJcblxyXG4gICAgY29uc3QgX1NISVBfTkFNRVMgPSB7XHJcbiAgICAgICAgMSA6ICdTcHknLFxyXG4gICAgICAgIDIgOiAnRGVzdHJveWVyJyxcclxuICAgICAgICAzIDogJ0NydWlzZXInLFxyXG4gICAgICAgIDQgOiAnQmF0dGxlc2hpcCcsXHJcbiAgICAgICAgNSA6ICdDYXJyaWVyJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IF9zaGlwTmFtZSA9IF9TSElQX05BTUVTW19zaGlwQ29vcmQubGVuZ3RoXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRTaGlwTmFtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcE5hbWVcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBnZXRTaGlwQ29vcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBJbmNvbWluZyBxdWVyeSAoYXNzZXJ0IHJlc3VsdCA+IHRlc3RlZCB3aXRoIHJlbW92ZVNxdWFyZUhpdClcclxuICAgIGNvbnN0IGZpbmRIaXRJbmRleCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmRzKSAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gU2VsZiBjb21tYW5kIHhcclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGNvbnN0IGluZGV4Q29vcmQgPSBmaW5kSGl0SW5kZXgoY29vcmRzKVxyXG4gICAgICAgIF9zaGlwQ29vcmQgPSBfc2hpcENvb3JkLmZpbHRlcihjb29yZCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZCkgIT09IGluZGV4Q29vcmQgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBQdXJlIC8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgaXNTdW5rTmV4dEhpdCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmxlbmd0aCA9PT0gMSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFNoaXBOYW1lLFxyXG4gICAgICAgIGdldFNoaXBDb29yZCxcclxuICAgICAgICBpc1N1bmtOZXh0SGl0LFxyXG4gICAgICAgIHJlbW92ZVNxdWFyZUhpdFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IGdldFNoaXBMZW5ndGhCeU5hbWUgfSBmcm9tICcuLi9sb2dpYy9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVUdXJuRGF0YSA9ICh0dXJuRGF0YSkgPT57XHJcbiAgICBjb25zdCBwbGF5ZXJEYXRhICAgICAgPSB0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyRGF0YSAgICA9IHR1cm5EYXRhLmlzQ29tcHV0ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgPSB0dXJuRGF0YS5jb21wdXRlckNvb3Jkc1xyXG4gICAgY29uc3QgYXR0YWNrZWRFbGVtZW50ID0gZmluZEhpdEVsZW1lbnQoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgcmV0dXJuIHsgcGxheWVyRGF0YSxjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudCB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZURhdGFEcm9wID0gKGV2ZW50KSA9PntcclxuICAgIGNvbnN0IHNoaXBJRCAgICAgICA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgIGNvbnN0IHNxdWFyZUlEICAgICA9IGV2ZW50LnRhcmdldC5pZCBcclxuICAgIGxldCBzcXVhcmVzVG9TdHlsZSA9IGdldFNoaXBMZW5ndGhCeU5hbWUoc2hpcElEKVxyXG5cclxuICAgIHJldHVybiB7c2hpcElELHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVEYXRhQm9hcmRWZXJ0aWNhbGx5ID0gKHNxdWFyZUlELHNoaXBJRCkgPT57XHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IG9yaWdpbmFsSW5kZXggID0gYm9hcmRHcmlkQXJyYXkuZmluZEluZGV4KGVsID0+IGVsLmlkID09PSBzcXVhcmVJRClcclxuICAgIGNvbnN0IHNoaXBJblBvb2wgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG4gICAgbGV0IGluZGV4VG9TdHlsZSAgICAgPSBvcmlnaW5hbEluZGV4XHJcblxyXG4gICAgcmV0dXJuIHtib2FyZEdyaWRBcnJheSwgb3JpZ2luYWxJbmRleCwgc2hpcEluUG9vbCwgaW5kZXhUb1N0eWxlfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVEYXRhQm9hcmRIb3Jpem9udGFsbHkgPSAoc3F1YXJlSUQsc2hpcElELHNxdWFyZXNUb1N0eWxlKSA9PntcclxuICAgIGNvbnN0IG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUgPSBzcXVhcmVzVG9TdHlsZVxyXG4gICAgY29uc3Qgb3JpZ2luYWxJbmRleCAgICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NxdWFyZUlEfWApXHJcbiAgICBjb25zdCBzaGlwSW5Qb29sICAgICAgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG4gICAgbGV0IGVsZW1lbnRUb1N0eWxlICAgICAgICAgICA9IG9yaWdpbmFsSW5kZXhcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnRUb1N0eWxlLCBvcmlnaW5hbEluZGV4LCBzaGlwSW5Qb29sLCBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzdG9yZVNoaXBSZW5kZXIgPSAoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSxvcmlnaW5hbEluZGV4KSA9PntcclxuICAgIGlmKGlzSG9yaXpvbnRhbE92ZXJsYXBwaW5nKHNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlLG9yaWdpbmFsSW5kZXgpKXtcclxuICAgICAgICByZXN0b3JlUmVuZGVySG9yaXpvbnRhbE92ZXJsYXAoc3F1YXJlc1RvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSlcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBpZihpc1BsYWNlZEFib3ZlT3RoZXJTaGlwKHNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpKXtcclxuICAgICAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmKGlzSG9yaXpvbnRhbE92ZXJmbG93aW5nKHNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlKSl7XHJcbiAgICAgICAgcmVzdG9yZVJlbmRlckhvcml6b250YWxPdmVyZmxvdyhzcXVhcmVzVG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzdG9yZVJlbmRlclZlcnRpY2FsT3ZlcmZsb3cgPSAoaW5kZXhUb1N0eWxlLG9yaWdpbmFsSW5kZXgsYm9hcmRHcmlkQXJyYXkpID0+e1xyXG4gICAgd2hpbGUoaW5kZXhUb1N0eWxlID49IG9yaWdpbmFsSW5kZXgpe1xyXG4gICAgICAgIGJvYXJkR3JpZEFycmF5W2luZGV4VG9TdHlsZV0uY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgaW5kZXhUb1N0eWxlID0gbW92ZVRvUHJldmlvdXNSb3coaW5kZXhUb1N0eWxlKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzdG9yZVJlbmRlclZlcnRpY2FsT3ZlcmxhcCA9IChjdXJyZW50U3F1YXJlLG9yaWdpbmFsSW5kZXgsY29vcmRzKSA9PntcclxuICAgIGNvb3JkcyA9IGVtcHR5Q29vcmRzQXJyYXkoY29vcmRzKVxyXG4gICAgaW5kZXhUb1N0eWxlID0gbW92ZVRvUHJldmlvdXNSb3coaW5kZXhUb1N0eWxlKVxyXG4gICAgd2hpbGUoaW5kZXhUb1N0eWxlID49IG9yaWdpbmFsSW5kZXgpe1xyXG4gICAgICAgIGN1cnJlbnRTcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgaW5kZXhUb1N0eWxlID0gbW92ZVRvUHJldmlvdXNSb3coaW5kZXhUb1N0eWxlKVxyXG4gICAgfVxyXG59IFxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3RvcmVSZW5kZXJIb3Jpem9udGFsT3ZlcmZsb3cgPSAoc3F1YXJlc1RvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSkgPT57XHJcbiAgICB3aGlsZShzcXVhcmVzVG9TdHlsZSA8PSBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKXtcclxuICAgICAgICBlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJylcclxuICAgICAgICBlbGVtZW50VG9TdHlsZSA9IGVsZW1lbnRUb1N0eWxlLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZSsrXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXN0b3JlUmVuZGVySG9yaXpvbnRhbE92ZXJsYXAgPSAoc3F1YXJlc1RvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSkgPT57XHJcblxyXG4gICAgY29uc3QgaXNBbGxTcXVhcmVzTm90UmVzdG9yZWQgPSBcclxuICAgICAgICBlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3JvdycpIFxyXG4gICAgICAgICAgICA/IGlzU3F1YXJlc0hpZ2hlclxyXG4gICAgICAgICAgICA6IGlzU3F1YXJlc0hpZ2hlck9yRXF1YWxcclxuICAgICAgICBcclxuICAgIGVsZW1lbnRUb1N0eWxlID0gZWxlbWVudFRvU3R5bGUucHJldmlvdXNFbGVtZW50U2libGluZ1xyXG5cclxuICAgIHdoaWxlKGlzQWxsU3F1YXJlc05vdFJlc3RvcmVkKHNxdWFyZXNUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpKXtcclxuICAgICAgICBlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJylcclxuICAgICAgICBlbGVtZW50VG9TdHlsZSA9IGVsZW1lbnRUb1N0eWxlLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZSsrXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tJZlJlbmRlck9yUmVzdG9yZSA9IChjdXJyZW50U3F1YXJlLG9yaWdpbmFsSW5kZXgsY29vcmRzKSA9PntcclxuICAgIGlmKGlzVmVydGljYWxPdmVybGFwcGluZyhjdXJyZW50U3F1YXJlKSApe1xyXG4gICAgICAgIHJlc3RvcmVSZW5kZXJWZXJ0aWNhbE92ZXJsYXAoY3VycmVudFNxdWFyZSxvcmlnaW5hbEluZGV4LGNvb3JkcykgXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIGNvb3Jkcy5wdXNoKGN1cnJlbnRTcXVhcmUuaWQpXHJcbiAgICBjb25zb2xlLmxvZyhjb29yZHMpXHJcbiAgICBjdXJyZW50U3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgaXNOZXh0U3F1YXJlVmFsaWQgPSAoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gKHNxdWFyZXNUb1N0eWxlID4gMCkgXHJcbiAgICAgICAgJiYgKCFlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKSkgXHJcbiAgICAgICAgJiYgKCFlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3JvdycpIFxyXG4gICAgICAgIHx8IChzcXVhcmVzVG9TdHlsZSA9PT0gb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1ZlcnRpY2FsT3ZlcmxhcHBpbmcgPSAoY3VycmVudFNxdWFyZSkgPT57XHJcbiAgICByZXR1cm4gY3VycmVudFNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNIb3Jpem9udGFsT3ZlcmZsb3dpbmcgPSAoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUpID0+e1xyXG4gICAgcmV0dXJuIChzcXVhcmVzVG9TdHlsZSA+IDApIFxyXG4gICAgICAgICYmIChlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3JvdycpKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNIb3Jpem9udGFsT3ZlcmxhcHBpbmcgPSAoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxJbmRleCkgPT57XHJcbiAgICByZXR1cm4gKHNxdWFyZXNUb1N0eWxlID4gMCkgXHJcbiAgICAgICAgJiYgKGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpXHJcbiAgICAgICAgfHwgKG9yaWdpbmFsSW5kZXgucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKSkpICAgICAgXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1BsYWNlZEFib3ZlT3RoZXJTaGlwID0gKHNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpID0+e1xyXG4gICAgcmV0dXJuIChzcXVhcmVzVG9TdHlsZSA+IDApIFxyXG4gICAgICAgICYmIChlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKSkgXHJcbiAgICAgICAgJiYgKHNxdWFyZXNUb1N0eWxlID09PSBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNTcXVhcmVzSGlnaGVyID0gKHNxdWFyZXNUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpID0+e1xyXG4gICAgcmV0dXJuIHNxdWFyZXNUb1N0eWxlIDwgb3JpZ2luYWxTcXVhcmVzVG9TdHlsZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNTcXVhcmVzSGlnaGVyT3JFcXVhbCA9IChzcXVhcmVzVG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKSA9PntcclxuICAgIHJldHVybiBzcXVhcmVzVG9TdHlsZSA8PSBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1JlbmRlclN1Y2Nlc2Z1bCA9IChzcXVhcmVzVG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gc3F1YXJlc1RvU3R5bGUgPT09IDBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vdmVUb05leHRSb3cgPSAoaW5kZXhUb1N0eWxlKSA9PntcclxuICAgIHJldHVybiAgaW5kZXhUb1N0eWxlICs9IDhcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vdmVUb1ByZXZpb3VzUm93ID0gKGluZGV4VG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gIGluZGV4VG9TdHlsZSAtPSA4XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbW92ZVRvTmV4dENvbHVtbiA9ICgpID0+e1xyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBlbXB0eUNvb3Jkc0FycmF5ID0gKGNvb3JkcykgPT57XHJcbiAgICByZXR1cm4gY29vcmRzLmxlbmd0aCA9IDBcclxufVxyXG4iLCJpbXBvcnQgeyByZXRyaWV2ZURhdGFEcm9wLFxyXG4gICAgcmV0cmlldmVEYXRhQm9hcmRWZXJ0aWNhbGx5LFxyXG4gICAgcmV0cmlldmVEYXRhQm9hcmRIb3Jpem9udGFsbHksXHJcbiAgICByZXN0b3JlUmVuZGVyVmVydGljYWxPdmVyZmxvdyxcclxuICAgIHJlc3RvcmVTaGlwUmVuZGVyLFxyXG4gICAgaXNOZXh0U3F1YXJlVmFsaWQsXHJcbiAgICBjaGVja0lmUmVuZGVyT3JSZXN0b3JlLFxyXG4gICAgbW92ZVRvTmV4dFJvdyxcclxuICAgIG1vdmVUb1ByZXZpb3VzUm93LFxyXG4gICAgZW1wdHlDb29yZHNBcnJheSwgXHJcbn0gZnJvbSAnLi9oYW5kbGVTdHlsaW5nRXZlbnRzRGF0YSdcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVHVybiAodHVybkRhdGEsZXZlbnQpe1xyXG4gICAgY29uc3QgeyBwbGF5ZXJEYXRhLGNvbXB1dGVyRGF0YSwgYXR0YWNrZWRFbGVtZW50IH0gPSBcclxuICAgICAgICByZXRyaWV2ZVR1cm5EYXRhKHR1cm5EYXRhKVxyXG5cclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhwbGF5ZXJEYXRhLCBldmVudC50YXJnZXQpXHJcbiAgICByZW5kZXJCb2FyZFNxdWFyZXMoY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQpXHJcblxyXG4gICAgcmVuZGVyVHVybkluZm8odHVybkRhdGEsdHVybkRhdGEucGxheWVyMSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlck1hdGNoUmVzdWx0ID0gKHBsYXllckRhdGEpID0+e1xyXG4gICAgY29uc3Qgd2lubmVyID0gcGxheWVyRGF0YS5wbGF5ZXIxLmlzUGxheWVyRGVmZWF0ZWQoKSBcclxuICAgICAgICA/ICdDb21wdXRlcidcclxuICAgICAgICA6IHBsYXllckRhdGEucGxheWVyMS5nZXROYW1lKCkgICBcclxuXHJcbiAgICBjb25zdCBtYXRjaEluZm9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXJuLWluZm8nKVxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9YCArICcgaXMgdGhlIHdpbm5lciEnIFxyXG59XHJcblxyXG5jb25zdCByZXRyaWV2ZVR1cm5EYXRhID0gKHR1cm5EYXRhKSA9PntcclxuICAgIGNvbnN0IHBsYXllckRhdGEgICAgICA9IHR1cm5EYXRhLmlzUGxheWVyQXR0YWNrTWlzc1xyXG4gICAgY29uc3QgY29tcHV0ZXJEYXRhICAgID0gdHVybkRhdGEuaXNDb21wdXRlckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyQ29vcmRzICA9IHR1cm5EYXRhLmNvbXB1dGVyQ29vcmRzXHJcbiAgICBjb25zdCBhdHRhY2tlZEVsZW1lbnQgPSBmaW5kSGl0RWxlbWVudChjb21wdXRlckNvb3JkcylcclxuXHJcbiAgICByZXR1cm4geyBwbGF5ZXJEYXRhLGNvbXB1dGVyRGF0YSwgYXR0YWNrZWRFbGVtZW50IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZURyb3BFdmVudCAoZXZlbnQsZ2FtZSkge1xyXG4gICAgY29uc3Qge3NoaXBJRCwgc3F1YXJlSUQgLHNxdWFyZXNUb1N0eWxlfSA9IHJldHJpZXZlRGF0YURyb3AoZXZlbnQpXHJcbiAgICAvLyBTaGlwIGRpcmVjdGlvbiB3aWxsIGNoYW5nZSBiYXNlZCBvbiBzb21lIERPTSBjbGFzcz9cclxuICAgIC8vIChzaGlwRGlyZWN0aW9uID09PSAndmVydGljYWwnID8gcmVuZGVyU3F1YXJlc1ZlcnRpY2FsbHkoKSA6IHJlbmRlclNxdWFyZXNIb3Jpem9udGFsbHkoKSkgICBcclxuICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZW5kZXJTaGlwSG9yaXpvbnRhbGx5KHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlLHNoaXBJRClcclxuICBcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG4gICAgZ2FtZS5zZXRDb29yZHNBcnJheShzaGlwQ29vcmRzKVxyXG4gICAgZ2FtZS5jaGVja0ZvckdhbWVQcmVwYXJlZChnYW1lKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwVmVydGljYWxseSA9IChzcXVhcmVJRCxzcXVhcmVzVG9TdHlsZSxzaGlwSUQpID0+e1xyXG4gICAgbGV0IGNvb3JkcyA9IFtdXHJcbiAgICBsZXQgeyBib2FyZEdyaWRBcnJheSwgb3JpZ2luYWxJbmRleCwgc2hpcEluUG9vbCwgaW5kZXhUb1N0eWxlIH0gPVxyXG4gICAgICByZXRyaWV2ZURhdGFCb2FyZFZlcnRpY2FsbHkoc3F1YXJlSUQsc2hpcElEKVxyXG4gICAgXHJcbiAgICB0cnl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVzVG9TdHlsZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U3F1YXJlID0gYm9hcmRHcmlkQXJyYXlbaW5kZXhUb1N0eWxlXVxyXG4gICAgICAgICAgICBsZXQgaXNTcXVhcmVJbnZhbGlkID0gIGNoZWNrSWZSZW5kZXJPclJlc3RvcmUoY3VycmVudFNxdWFyZSxvcmlnaW5hbEluZGV4LGNvb3JkcyxpbmRleFRvU3R5bGUpXHJcbiAgICAgICAgICAgIGlmKGlzU3F1YXJlSW52YWxpZCkgcmV0dXJuXHJcbiAgICAgICAgICAgIGluZGV4VG9TdHlsZSA9IG1vdmVUb05leHRSb3coaW5kZXhUb1N0eWxlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxyXG4gICAgICAgIHNoaXBJblBvb2wucmVtb3ZlQXR0cmlidXRlKCdkcmFnZ2FibGUnKVxyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgICAgICBcclxuICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgLy8gV2lsbCB0cmlnZ2VyIGlmIHNoaXAgcGxhY2VtZW50IFxyXG4gICAgICAgIC8vIG92ZXJmbG93cyBmcm9tIHRoZSBib3R0b21cclxuICAgICAgICBjb29yZHMgPSBlbXB0eUNvb3Jkc0FycmF5KGNvb3JkcylcclxuICAgICAgICBpbmRleFRvU3R5bGUgPSBtb3ZlVG9QcmV2aW91c1JvdyhpbmRleFRvU3R5bGUpXHJcbiAgICAgICAgcmVzdG9yZVJlbmRlclZlcnRpY2FsT3ZlcmZsb3coaW5kZXhUb1N0eWxlLG9yaWdpbmFsSW5kZXgsYm9hcmRHcmlkQXJyYXkpXHJcbiAgICB9IFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTcXVhcmVWZXJ0aWNhbGx5ID0gKCkgPT57XHJcbiAgXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBIb3Jpem9udGFsbHkgPSAoc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKSA9PntcclxuICAgIFxyXG4gICAgbGV0IHtlbGVtZW50VG9TdHlsZSwgb3JpZ2luYWxJbmRleCwgc2hpcEluUG9vbCwgb3JpZ2luYWxTcXVhcmVzVG9TdHlsZX09XHJcbiAgICAgIHJldHJpZXZlRGF0YUJvYXJkSG9yaXpvbnRhbGx5KHNxdWFyZUlELHNoaXBJRCxzcXVhcmVzVG9TdHlsZSlcclxuICAgIGxldCBjb29yZHMgPSBbXVxyXG4gIFxyXG4gICAgd2hpbGUoaXNOZXh0U3F1YXJlVmFsaWQoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkpe1xyXG4gICAgICAgIGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIGVsZW1lbnRUb1N0eWxlID0gZWxlbWVudFRvU3R5bGUubmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICAgICAgY29vcmRzLnB1c2goZWxlbWVudFRvU3R5bGUuaWQpXHJcbiAgICAgICAgc3F1YXJlc1RvU3R5bGUtLSBcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYoc3F1YXJlc1RvU3R5bGUgIT0gMCl7XHJcbiAgICAgICAgcmVzdG9yZVNoaXBSZW5kZXIoXHJcbiAgICAgICAgICAgIHNxdWFyZXNUb1N0eWxlLFxyXG4gICAgICAgICAgICBlbGVtZW50VG9TdHlsZSxcclxuICAgICAgICAgICAgb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSxcclxuICAgICAgICAgICAgb3JpZ2luYWxJbmRleClcclxuICAgICAgICBjb29yZHMgPSBlbXB0eUNvb3Jkc0FycmF5KGNvb3JkcylcclxuICAgICAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgICBcclxuICAgIHNoaXBJblBvb2wuY2xhc3NMaXN0LmFkZCgnaGlkZScpXHJcbiAgICBzaGlwSW5Qb29sLnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJylcclxuICAgIHJldHVybiBjb29yZHNcclxuICAgICAgXHJcbn1cclxuICAgIFxyXG5jb25zdCByZW5kZXJTcXVhcmVzSG9yaXpvbnRhbGx5ID0gKGVsZW1lbnRUb1N0eWxlLHNxdWFyZXNUb1N0eWxlLGNvb3JkcykgPT57XHJcbiAgICB3aGlsZShpc05leHRTcXVhcmVWYWxpZChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKSl7XHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICBjb29yZHMucHVzaChlbGVtZW50VG9TdHlsZS5pZClcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tIFxyXG4gICAgfVxyXG59XHJcbiAgICBcclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdTdGFydCAoZXZlbnQpIHtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJyxldmVudC50YXJnZXQuaWQpXHJcbn1cclxuICAgIFxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0VudGVyIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpXHJcbn1cclxuICAgIFxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ092ZXIgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJylcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdMZWF2ZSAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG59XHJcblxyXG5jb25zdCBmaW5kSGl0RWxlbWVudCA9IChjb29yZHMpID0+e1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIxID4gIyR7Y29vcmRzfWApXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkU3F1YXJlcyA9ICh0dXJuRGF0YSwgZWxlbWVudCkgPT57XHJcbiAgICBpZihpc0hpdEVsZW1lbnQoZWxlbWVudCkpIHJldHVybiAgXHJcbiAgICAodHVybkRhdGEpID8gcmVuZGVyU3F1YXJlT25NaXNzKGVsZW1lbnQpIDogcmVuZGVyU3F1YXJlT25IaXQoZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgaXNIaXRFbGVtZW50ID0gKGVsZW1lbnQpID0+e1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3F1YXJlT25IaXQgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uTWlzcyAgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJUdXJuSW5mbyA9ICh0dXJuRGF0YSxwbGF5ZXIxKSA9PntcclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3BsYXllcjEuZ2V0TmFtZSgpfSBhdHRhY2sgaXMgYSBgIFxyXG4gICAgKyAodHVybkRhdGEuaXNQbGF5ZXJBdHRhY2tNaXNzKSA/ICdtaXNzIScgOiAnaGl0ISdcclxuICBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyV2FybmluZ3NJbmZvID0gKCkgPT57XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBPblNpbmsgPSAoKSA9PntcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdGF0aWNFbGVtZW50cyhnYW1lYm9hcmQsIHBsYXllcjEsIHBsYXllcjIpe1xyXG4gICAgcmVuZGVyQm9hcmRPblJlc2V0KClcclxuICAgIHJlbmRlclNoaXBzKGdhbWVib2FyZClcclxuICAgIHJlbmRlclBsYXllck5hbWVzKHBsYXllcjEsIHBsYXllcjIpXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBzID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICBsZXQgaW5kZXggPSAwXHJcbiAgICBjb25zdCBib2FyZEdyaWQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmRHcmlkKClcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKGJvYXJkR3JpZCkpe1xyXG4gICAgICAgIGlmKGJvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgYm9hcmRHcmlkQXJyYXlbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleCsrXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCByZW5kZXJQbGF5ZXJOYW1lcyA9IChwbGF5ZXIxLCBwbGF5ZXIyKSA9PntcclxuICAgIGNvbnN0IHBsYXllcjFOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEtbmFtZScpXHJcbiAgICBjb25zdCBwbGF5ZXIyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyLW5hbWUnKVxyXG5cclxuICAgIHBsYXllcjFOYW1lLnRleHRDb250ZW50ID0gcGxheWVyMS5nZXROYW1lKCkgKyAnIFxcJ3MgZmxlZXQnXHJcbiAgICBwbGF5ZXIyTmFtZS50ZXh0Q29udGVudCA9IHBsYXllcjIuZ2V0TmFtZSgpICsgJyBcXCdzIGZsZWV0J1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJCb2FyZE9uUmVzZXQgPSAoKSA9PntcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5MSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5MiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcblxyXG4gICAgYm9hcmRHcmlkQXJyYXkxLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaGl0JylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnbWlzcycpXHJcbiAgICB9KVxyXG4gICAgYm9hcmRHcmlkQXJyYXkyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJylcclxuICAgIH0pIFxyXG5cclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gICcnXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lLGNoZWNrRm9yR2FtZVByZXBhcmVkfSBmcm9tICcuL2xvZ2ljL2dhbWUnXHJcbmltcG9ydCB7YWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrfSBmcm9tICcuL2xvZ2ljL2hhbmRsZUV2ZW50TGlzdGVuZXJzJ1xyXG5cclxuY29uc3QgcHJlcGFyZUdhbWUgPSAoZ2FtZSkgPT57XHJcbiAgICBnYW1lLmFkZEV2ZW50TGlzdGVuZXJzRHJhZ1NoaXBzKGdhbWUpXHJcbn1cclxuXHJcbmNvbnN0IGdhbWUgPSBHYW1lKClcclxucHJlcGFyZUdhbWUoZ2FtZSlcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==