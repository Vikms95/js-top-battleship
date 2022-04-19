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
        ['A4'],
        ['C5','C6'],
        ['B6','B7','B8'],
        ['F1','F2','F3','F4'],
        ['E1','E2','E3','E4','E5']
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
/* harmony export */   "isHorizOverflow": () => (/* binding */ isHorizOverflow),
/* harmony export */   "isHorizOverlap": () => (/* binding */ isHorizOverlap),
/* harmony export */   "isNextSquareValid": () => (/* binding */ isNextSquareValid),
/* harmony export */   "isPlacedAboveOtherShip": () => (/* binding */ isPlacedAboveOtherShip),
/* harmony export */   "isRenderSuccesful": () => (/* binding */ isRenderSuccesful),
/* harmony export */   "isSquaresHigher": () => (/* binding */ isSquaresHigher),
/* harmony export */   "isSquaresHigherOrEqual": () => (/* binding */ isSquaresHigherOrEqual),
/* harmony export */   "isVerticalOverlapping": () => (/* binding */ isVerticalOverlapping),
/* harmony export */   "moveToNextColumn": () => (/* binding */ moveToNextColumn),
/* harmony export */   "moveToNextRow": () => (/* binding */ moveToNextRow),
/* harmony export */   "moveToPreviousRow": () => (/* binding */ moveToPreviousRow),
/* harmony export */   "restoreRenderHorizOverflow": () => (/* binding */ restoreRenderHorizOverflow),
/* harmony export */   "restoreRenderHorizlOverlap": () => (/* binding */ restoreRenderHorizlOverlap),
/* harmony export */   "restoreRenderVertOverflow": () => (/* binding */ restoreRenderVertOverflow),
/* harmony export */   "restoreRenderVertOverlap": () => (/* binding */ restoreRenderVertOverlap),
/* harmony export */   "restoreShipRender": () => (/* binding */ restoreShipRender),
/* harmony export */   "retrieveDataBoardHoriz": () => (/* binding */ retrieveDataBoardHoriz),
/* harmony export */   "retrieveDataBoardVert": () => (/* binding */ retrieveDataBoardVert),
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

const retrieveDataBoardVert = (squareID,shipID) =>{
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    const originalIndex  = boardGridArray.findIndex(el => el.id === squareID)
    const shipInPool     = document.getElementById(shipID)
    let indexToStyle     = originalIndex

    return {boardGridArray, originalIndex, shipInPool, indexToStyle}
}

const retrieveDataBoardHoriz = (squareID,shipID,squaresToStyle) =>{
    const originalSquaresToStyle = squaresToStyle
    const originalIndex          = document.getElementById(`${squareID}`)
    const shipInPool             = document.getElementById(shipID)
    let elementToStyle           = originalIndex

    return {elementToStyle, originalIndex, shipInPool, originalSquaresToStyle}
}

const restoreShipRender = (squaresToStyle,elementToStyle,originalSquaresToStyle,originalIndex) =>{
    if(isHorizOverlap(squaresToStyle,elementToStyle,originalIndex)){
        restoreRenderHorizlOverlap(squaresToStyle,originalSquaresToStyle,elementToStyle)
        return
    }

    if(isPlacedAboveOtherShip(squaresToStyle,elementToStyle,originalSquaresToStyle)){
        shipInPool.classList.remove('hide')
        return
    }

    if(isHorizOverflow(squaresToStyle,elementToStyle)){
        restoreRenderHorizOverflow(squaresToStyle,originalSquaresToStyle,elementToStyle)
        return
    }
}

const restoreRenderVertOverflow = (indexToStyle,originalIndex,boardGridArray) =>{
    while(indexToStyle >= originalIndex){
        boardGridArray[indexToStyle].classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
}

const restoreRenderVertOverlap = (currentSquare,originalIndex,coords) =>{
    coords = emptyCoordsArray(coords)
    indexToStyle = moveToPreviousRow(indexToStyle)
    while(indexToStyle >= originalIndex){
        currentSquare.classList.remove('ship')
        indexToStyle = moveToPreviousRow(indexToStyle)
    }
} 

const restoreRenderHorizOverflow = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{
    while(squaresToStyle <= originalSquaresToStyle){
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
}

const restoreRenderHorizlOverlap = (squaresToStyle,originalSquaresToStyle,elementToStyle) =>{

    const isAllSquaresNotRestored = 
        elementToStyle.classList.contains('row') 
            ? isSquaresHigher
            : isSquaresHigherOrEqual
        
    elementToStyle = elementToStyle.previousElementSibling

    while(isAllSquaresNotRestored(squaresToStyle,originalSquaresToStyle)){
        // When the ship is placed on first element
        // of array and it is not succesful
        if(elementToStyle === null) return
        elementToStyle.classList.remove('ship')
        elementToStyle = elementToStyle.previousElementSibling
        squaresToStyle++
    }
}


const checkIfRenderOrRestore = (currentSquare,originalIndex,coords) =>{
    if(isVerticalOverlapping(currentSquare) ){
        restoreRenderVertOverlap(currentSquare,originalIndex,coords) 
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
        &&(!elementToStyle === null) 
        && (!elementToStyle.classList.contains('row') 
        || (squaresToStyle === originalSquaresToStyle))
}

const isVerticalOverlapping = (currentSquare) =>{
    return currentSquare.classList.contains('ship')
}

const isHorizOverflow = (squaresToStyle,elementToStyle) =>{
    return (squaresToStyle > 0) 
        && (elementToStyle.classList.contains('row'))
}

const isHorizOverlap = (squaresToStyle,elementToStyle,originalIndex) =>{
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
      (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataBoardVert)(squareID,shipID)
    
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
        ;(0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.restoreRenderVertOverflow)(indexToStyle,originalIndex,boardGridArray)
    } 
}

const renderSquareVertically = () =>{
  
}

const renderShipHorizontally = (squareID,squaresToStyle,shipID) =>{
    
    let {elementToStyle, originalIndex, shipInPool, originalSquaresToStyle}=
      (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataBoardHoriz)(squareID,shipID,squaresToStyle)
    let coords = []
    // Refactor
    while((0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.isNextSquareValid)(squaresToStyle,elementToStyle,originalSquaresToStyle)){
        elementToStyle.classList.add('ship')
        elementToStyle = elementToStyle.nextElementSibling
        if(elementToStyle === null) break
        coords.push(elementToStyle.id)
        squaresToStyle-- 
    }
         
    // Refactor
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
        
    // Refactor along with while loop
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFBWTtBQUNaO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNPO0FBQ1A7QUFDQSw4REFBOEQsU0FBUztBQUN2RTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlKa0M7QUFDbEM7QUFDQTtBQUNPO0FBQ1AsWUFBWSwyQ0FBMkM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNPO0FBQ1AsV0FBVyxrQ0FBa0MsRUFBRSwwRUFBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSwwREFBMEQ7QUFDcEUsTUFBTSwrRUFBcUI7QUFDM0I7QUFDQTtBQUNBLHdCQUF3QixvQkFBb0I7QUFDNUM7QUFDQSxtQ0FBbUMsZ0ZBQXNCO0FBQ3pEO0FBQ0EsMkJBQTJCLHVFQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlCQUFpQiwwRUFBZ0I7QUFDakMsdUJBQXVCLDJFQUFpQjtBQUN4QyxRQUFRLG9GQUF5QjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGtFQUFrRTtBQUMzRSxNQUFNLGdGQUFzQjtBQUM1QjtBQUNBO0FBQ0EsVUFBVSwyRUFBaUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyRUFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEVBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsMkVBQWlCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsT0FBTztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdkxPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7O1VDM0NBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVEO0FBQ2lCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGlEQUFJO0FBQ2pCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9oYW5kbGVFdmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvc2hpcC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L2hhbmRsZVN0eWxpbmdFdmVudHNEYXRhLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJTdGF0aWNFbGVtZW50cyB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMnXHJcbmltcG9ydCB7IHJlbmRlck1hdGNoUmVzdWx0IH0gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcbmltcG9ydCB7IHJlbW92ZUV2ZW50TGlzdGVuZXJzLCBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlLCBhZGRFdmVudExpc3RlbmVyc0JvYXJkRHJhZywgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrIH0gZnJvbSAnLi9oYW5kbGVFdmVudExpc3RlbmVycydcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInXHJcbi8vIGltcG9ydCB7IGV4ZWN1dGVHYW1lIH0gZnJvbSAnL3NyYy9pbmRleCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lICgpe1xyXG4gICAgbGV0IGNvb3Jkc0FycmF5ID0gW11cclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZC1ncmlkLnBsYXllcjInKVxyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgndW5jbGlja2FibGUnKVxyXG5cclxuICAgIGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ1ZpY3RvcicpXHJcbiAgICBwbGF5ZXIxLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICBbJ0E0J10sXHJcbiAgICAgICAgWydDNScsJ0M2J10sXHJcbiAgICAgICAgWydCNicsJ0I3JywnQjgnXSxcclxuICAgICAgICBbJ0YxJywnRjInLCdGMycsJ0Y0J10sXHJcbiAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0U1J11cclxuICAgIClcclxuICAgIGNvbnN0IHBsYXllcjIgPSBQbGF5ZXIoJ0NvbXB1dGVyJylcclxuICAgIHBsYXllcjIuY3JlYXRlR2FtZUJvYXJkKFxyXG4gICAgICAgIFsnRzgnXSxcclxuICAgICAgICBbJ0IxJywnQjInXSxcclxuICAgICAgICBbJ0MxJywnQzInLCdDMyddLFxyXG4gICAgICAgIFsnRDEnLCdEMicsJ0QzJywnRDQnXSxcclxuICAgICAgICBbJ0UxJywnRTInLCdFMycsJ0U0JywnRTUnXVxyXG4gICAgKVxyXG5cclxuICAgIGxldCBnYW1lYm9hcmQxICAgICA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKClcclxuICAgIGxldCBnYW1lYm9hcmQyICAgICA9IHBsYXllcjIuZ2V0R2FtZWJvYXJkKClcclxuICAgIGxldCBwbGF5ZXJJblR1cm4gICA9IHBsYXllcjFcclxuICAgIGxldCBlbmVteUdhbWVib2FyZCA9IGdhbWVib2FyZDJcclxuXHJcbiAgICByZW5kZXJTdGF0aWNFbGVtZW50cyhnYW1lYm9hcmQxLCBwbGF5ZXIxLCBwbGF5ZXIyKVxyXG5cclxuICAgIGNvbnN0IGdhbWVUdXJuID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgY29uc3QgcGxheWVyQ29vcmRzID0gcGxheWVySW5UdXJuLnNlbmRBdHRhY2tDb29yZHNUb0dhbWUoY29vcmRzKVxyXG4gICAgICAgIGlmKHBsYXllckNvb3JkcyA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICBcclxuICAgICAgICBjb25zdCBpc1BsYXllckF0dGFja01pc3MgICA9IGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2tGcm9tUGxheWVyKHBsYXllckNvb3JkcykgXHJcbiAgICAgICAgcGxheWVySW5UdXJuICAgICAgICAgICAgICAgPSBzd2l0Y2hQbGF5ZXJzKClcclxuICAgICAgICBlbmVteUdhbWVib2FyZCAgICAgICAgICAgICA9IHN3aXRjaEdhbWVib2FyZHMoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVyQ29vcmRzICAgICAgID0gcGxheWVySW5UdXJuLnNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUoZW5lbXlHYW1lYm9hcmQpXHJcbiAgICAgICAgY29uc3QgaXNDb21wdXRlckF0dGFja01pc3MgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihjb21wdXRlckNvb3JkcylcclxuICAgICAgICBwbGF5ZXJJblR1cm4gICAgICAgICAgICAgICA9IHN3aXRjaFBsYXllcnMoKVxyXG4gICAgICAgIGVuZW15R2FtZWJvYXJkICAgICAgICAgICAgID0gc3dpdGNoR2FtZWJvYXJkcygpXHJcblxyXG4gICAgICAgIGlmKGlzQW55UGxheWVyRGVmZWF0ZWQoKSl7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VuY2xpY2thYmxlJylcclxuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgICAgICAgICByZW5kZXJNYXRjaFJlc3VsdCh7cGxheWVyMSxwbGF5ZXIyfSlcclxuICAgICAgICAgICAgcHJlcGFyZU5leHRNYXRjaCgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwbGF5ZXIxLFxyXG4gICAgICAgICAgICBpc1BsYXllckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGlzQ29tcHV0ZXJBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBjb21wdXRlckNvb3Jkc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hQbGF5ZXJzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gcGxheWVyMSA6IHBsYXllcjJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hHYW1lYm9hcmRzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gZ2FtZWJvYXJkMSA6IGdhbWVib2FyZDJcclxuICAgIH0gICBcclxuXHJcbiAgICBjb25zdCBpc0FueVBsYXllckRlZmVhdGVkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIHx8IHBsYXllcjIuaXNQbGF5ZXJEZWZlYXRlZCgpXHJcbiAgICB9IFxyXG5cclxuICAgIC8vIGNvbnN0IHByZXBhcmVOZXh0TWF0Y2ggPSAoKSA9PntcclxuICAgIC8vICAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZyb20gYm9hcmRcclxuICAgIC8vICAgICBzZXRUaW1lb3V0KCwyMDAwKVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGNvbnN0IGFkZEV2ZW50TGlzdGVuZXJzRHJhZ1NoaXBzID0gKGdhbWUpID0+e1xyXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJEcmFnZ2FibGUoKVxyXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnKGdhbWUpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2V0Q29vcmRzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29vcmRzQXJyYXkucHVzaChzaGlwKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldENvb3Jkc0FycmF5ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc0FycmF5XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2hlY2tGb3JHYW1lUHJlcGFyZWQgPSAoZ2FtZSkgPT57XHJcbiAgICAgICAgaWYgKGdhbWUuZ2V0Q29vcmRzQXJyYXkoKS5sZW5ndGggPj0gOSl7XHJcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmRDbGljayhnYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57Z2FtZVR1cm4sYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHMsZ2V0Q29vcmRzQXJyYXksc2V0Q29vcmRzQXJyYXksY2hlY2tGb3JHYW1lUHJlcGFyZWR9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCdcclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWVib2FyZCgpeyAgICBcclxuICAgXHJcbiAgICBsZXQgX2JvYXJkR3JpZCA9IFxyXG4gICAge1xyXG4gICAgICAgICdBMSc6IGZhbHNlLCAnQTInOiBmYWxzZSwgJ0EzJzogZmFsc2UsICdBNCc6IGZhbHNlLCAnQTUnOiBmYWxzZSwgJ0E2JzogZmFsc2UsICdBNyc6IGZhbHNlLCAnQTgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0IxJzogZmFsc2UsICdCMic6IGZhbHNlLCAnQjMnOiBmYWxzZSwgJ0I0JzogZmFsc2UsICdCNSc6IGZhbHNlLCAnQjYnOiBmYWxzZSwgJ0I3JzogZmFsc2UsICdCOCc6IGZhbHNlLCBcclxuICAgICAgICAnQzEnOiBmYWxzZSwgJ0MyJzogZmFsc2UsICdDMyc6IGZhbHNlLCAnQzQnOiBmYWxzZSwgJ0M1JzogZmFsc2UsICdDNic6IGZhbHNlLCAnQzcnOiBmYWxzZSwgJ0M4JzogZmFsc2UsIFxyXG4gICAgICAgICdEMSc6IGZhbHNlLCAnRDInOiBmYWxzZSwgJ0QzJzogZmFsc2UsICdENCc6IGZhbHNlLCAnRDUnOiBmYWxzZSwgJ0Q2JzogZmFsc2UsICdENyc6IGZhbHNlLCAnRDgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0UxJzogZmFsc2UsICdFMic6IGZhbHNlLCAnRTMnOiBmYWxzZSwgJ0U0JzogZmFsc2UsICdFNSc6IGZhbHNlLCAnRTYnOiBmYWxzZSwgJ0U3JzogZmFsc2UsICdFOCc6IGZhbHNlLCBcclxuICAgICAgICAnRjEnOiBmYWxzZSwgJ0YyJzogZmFsc2UsICdGMyc6IGZhbHNlLCAnRjQnOiBmYWxzZSwgJ0Y1JzogZmFsc2UsICdGNic6IGZhbHNlLCAnRjcnOiBmYWxzZSwgJ0Y4JzogZmFsc2UsIFxyXG4gICAgICAgICdHMSc6IGZhbHNlLCAnRzInOiBmYWxzZSwgJ0czJzogZmFsc2UsICdHNCc6IGZhbHNlLCAnRzUnOiBmYWxzZSwgJ0c2JzogZmFsc2UsICdHNyc6IGZhbHNlLCAnRzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0gxJzogZmFsc2UsICdIMic6IGZhbHNlLCAnSDMnOiBmYWxzZSwgJ0g0JzogZmFsc2UsICdINSc6IGZhbHNlLCAnSDYnOiBmYWxzZSwgJ0g3JzogZmFsc2UsICdIOCc6IGZhbHNlIFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBfYm9hcmRTaGlwcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldEJvYXJkR3JpZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRHcmlkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0Qm9hcmRTaGlwcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBwb3B1bGF0ZUdhbWVib2FyZCA9IChjb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICAgIHdoaWxlKCBpbmRleCA8IGNvb3JkaW5hdGVzLmxlbmd0aCApe1xyXG4gICAgICAgICAgICBjcmVhdGVTaGlwKC4uLmNvb3JkaW5hdGVzW2luZGV4XSlcclxuICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJbmNvbWluZy1xdWVyeSAoYXNzZXJ0IHJlc3VsdCkgWFxyXG4gICAgY29uc3QgY3JlYXRlU2hpcCA9ICguLi5jb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgaWYoaXNDb29yZHNBdmFpbGFibGUoY29vcmRpbmF0ZXMpKXtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCAgPSBTaGlwKC4uLmNvb3JkaW5hdGVzKSBcclxuICAgICAgICAgICAgX2JvYXJkU2hpcHMgPSBhZGRTaGlwVG9TaGlwc0FycmF5KHNoaXApXHJcbiAgICAgICAgICAgIGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdChzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm4gc2hpcFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gSW5jb21pbmctcXVlcnkgKGFzc2VydCByZXN1bHQpXHJcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrRnJvbVBsYXllciA9IChjb29yZHMpPT57XHJcbiAgICAgICAgaWYoaXNBdHRhY2tWYWxpZChjb29yZHMpICYmIGlzU2hpcEhpdChjb29yZHMpKXtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGZpbmRTaGlwQnlDb29yZHMoY29vcmRzKVxyXG4gICAgICAgICAgICBpZihzaGlwLmlzU3Vua05leHRIaXQoKSl7XHJcbiAgICAgICAgICAgICAgICBfYm9hcmRTaGlwcyA9IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwU3F1YXJlID0gKGNvb3JkcyxzaGlwKSA9PntcclxuICAgICAgICBzaGlwLnJlbW92ZVNxdWFyZUhpdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBRdWVyeSAmIENvbW1hbmQgc2VsZiB4XHJcbiAgICBjb25zdCBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3QgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgc2hpcC5nZXRTaGlwQ29vcmQoKS5mb3JFYWNoKGNvb3JkID0+e1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhfYm9hcmRHcmlkKS5mb3JFYWNoKGtleSA9PntcclxuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmQpIHtfYm9hcmRHcmlkW2tleV0gPSB0cnVlfSBcclxuICAgICAgICAgICAgfSkgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRTaGlwVG9TaGlwc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIHJldHVybiBbLi4uX2JvYXJkU2hpcHMsc2hpcF1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oey4uLl9ib2FyZEdyaWR9LCB7W2Ake2Nvb3Jkc31gXTogJ0hpdCd9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBmaW5kU2hpcEluZGV4QnlOYW1lKHNoaXApXHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbHRlcihhcnJheVNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5pbmRleE9mKGFycmF5U2hpcCkgIT09IHNoaXBJbmRleCBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gXHJcbiAgICBjb25zdCBmaW5kU2hpcEJ5Q29vcmRzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmQoc2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXAuZ2V0U2hpcENvb3JkKCkuaW5jbHVkZXMoY29vcmRzKSAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbmRTaGlwSW5kZXhCeU5hbWUgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmRJbmRleChjdXJyZW50U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTaGlwLmdldFNoaXBOYW1lKCkgPT09IHNoaXAuZ2V0U2hpcE5hbWUoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNTaGlwSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMgJiYgX2JvYXJkR3JpZFtrZXldKSB7IHJldHVybiB0cnVlIH0gICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNBbGxTaGlwc1N1bmsgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKF9ib2FyZFNoaXBzLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0Nvb3Jkc0F2YWlsYWJsZSA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGxldCBpbmRleEFycmF5ID0gMFxyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzW2luZGV4QXJyYXldKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoX2JvYXJkR3JpZFtrZXldKSA/IGZhbHNlIDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgaXNBdHRhY2tWYWxpZCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoX2JvYXJkR3JpZFtrZXldKSA9PT0gJ0hpdCc/IGZhbHNlIDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG4gXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEJvYXJkR3JpZCxcclxuICAgICAgICBnZXRCb2FyZFNoaXBzLFxyXG4gICAgICAgIGNyZWF0ZVNoaXAsXHJcbiAgICAgICAgZ2V0U2hpcExlbmd0aEJ5TmFtZSxcclxuICAgICAgICBwb3B1bGF0ZUdhbWVib2FyZCxcclxuICAgICAgICByZWNlaXZlQXR0YWNrRnJvbVBsYXllcixcclxuICAgICAgICBpc0FsbFNoaXBzU3VuayxcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNoaXBMZW5ndGhCeU5hbWUgPSAoc2hpcE5hbWUpID0+e1xyXG4gICAgY29uc3QgX1NISVBfTkFNRVMgPSB7XHJcbiAgICAgICAgJ3NweS0xJzogMSxcclxuICAgICAgICAnc3B5LTInOiAxLFxyXG4gICAgICAgICdzcHktMyc6IDEsXHJcbiAgICAgICAgJ2Rlc3Ryb3llci0xJzogMixcclxuICAgICAgICAnZGVzdHJveWVyLTInOiAyLFxyXG4gICAgICAgICdkZXN0cm95ZXItMyc6IDIsXHJcbiAgICAgICAgJ2NydWlzZXInOiAzLFxyXG4gICAgICAgICdiYXR0bGVzaGlwJzogNCxcclxuICAgICAgICAnY2Fycmllcic6IDVcclxuICAgIH1cclxuICAgIHJldHVybiBfU0hJUF9OQU1FU1tzaGlwTmFtZV1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgcmVuZGVyVHVybixkcmFnRW50ZXIsZHJhZ1N0YXJ0LGRyYWdPdmVyLGRyYWdMZWF2ZSxoYW5kbGVEcm9wRXZlbnQgfSBmcm9tICcuLi92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2sgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT57XHJcbiAgICAgICAgICAgIHByb2Nlc3NUdXJuRGF0YShnYW1lLGV2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBwcm9jZXNzVHVybkRhdGEgPSAoZ2FtZSxldmVudCkgPT57XHJcbiAgICBjb25zdCB0dXJuRGF0YSA9IGdhbWUuZ2FtZVR1cm4oZXZlbnQudGFyZ2V0LmlkKVxyXG4gICAgaWYodHVybkRhdGEgPT09IG51bGwpIHJldHVybiAgICAgIFxyXG4gICAgcmVuZGVyVHVybih0dXJuRGF0YSxldmVudClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnIChnYW1lKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzUGxheWVyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZ3JpZFNxdWFyZXNQbGF5ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsZHJhZ0VudGVyKVxyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsZHJhZ092ZXIpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsZHJhZ0xlYXZlKVxyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywoZXZlbnQpID0+e1xyXG4gICAgICAgICAgICBoYW5kbGVEcm9wRXZlbnQoZXZlbnQsZ2FtZSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJEcmFnZ2FibGUoKXtcclxuICAgIGNvbnN0IHNoaXBzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9vbC1zaGlwLnBsYXllcjEnKSlcclxuICAgIHNoaXBzLmZvckVhY2goc2hpcD0+XHJcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLGRyYWdTdGFydCkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyAoKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzQ29tcHV0ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc0NvbXB1dGVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc3NUdXJuRGF0YSlcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUpe1xyXG4gICAgY29uc3QgX3BsYXllck5hbWUgPSBuYW1lXHJcblxyXG4gICAgbGV0IF9nYW1lYm9hcmRcclxuXHJcbiAgICBsZXQgX2F0dGFja2VkU3F1YXJlcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3BsYXllck5hbWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2dhbWVib2FyZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEF0dGFja2VkU3F1YXJlcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYXR0YWNrZWRTcXVhcmVzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2V0QXR0YWNrZWRTcXVhcmVzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgX2F0dGFja2VkU3F1YXJlcy5wdXNoKGNvb3JkcylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoLi4uY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIF9nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIF9nYW1lYm9hcmQucG9wdWxhdGVHYW1lYm9hcmQoY29vcmRpbmF0ZXMpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNlbmRBdHRhY2tDb29yZHNUb0dhbWUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBpZihnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhjb29yZHMpKSByZXR1cm4gbnVsbFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgICAgIGNvbnN0IGJvYXJkR3JpZCA9IE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCA9IGJvYXJkR3JpZC5sZW5ndGhcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB3aGlsZShnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhib2FyZEdyaWRbaW5kZXhdKSl7XHJcbiAgICAgICAgICAgIGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGJvYXJkR3JpZFtpbmRleF0pXHJcbiAgICAgICAgcmV0dXJuIGJvYXJkR3JpZFtpbmRleF1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGVSYW5kb21OdW1iZXIgPSAobWF4LG1pbikgPT57XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKF9nYW1lYm9hcmQuZ2V0Qm9hcmRTaGlwcygpLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBnZXRHYW1lYm9hcmQsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzLFxyXG4gICAgICAgIGNyZWF0ZUdhbWVCb2FyZCxcclxuICAgICAgICBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIHNlbmRBdHRhY2tDb29yZHNUb0dhbWUsXHJcbiAgICAgICAgaXNQbGF5ZXJEZWZlYXRlZFxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIFNoaXAoLi4uY29vcmRpbmF0ZXMpe1xyXG5cclxuICAgIGxldCBfc2hpcENvb3JkID0gY29vcmRpbmF0ZXNcclxuXHJcbiAgICBjb25zdCBfU0hJUF9OQU1FUyA9IHtcclxuICAgICAgICAxIDogJ1NweScsXHJcbiAgICAgICAgMiA6ICdEZXN0cm95ZXInLFxyXG4gICAgICAgIDMgOiAnQ3J1aXNlcicsXHJcbiAgICAgICAgNCA6ICdCYXR0bGVzaGlwJyxcclxuICAgICAgICA1IDogJ0NhcnJpZXInXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX3NoaXBOYW1lID0gX1NISVBfTkFNRVNbX3NoaXBDb29yZC5sZW5ndGhdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldFNoaXBOYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGdldFNoaXBDb29yZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEluY29taW5nIHF1ZXJ5IChhc3NlcnQgcmVzdWx0ID4gdGVzdGVkIHdpdGggcmVtb3ZlU3F1YXJlSGl0KVxyXG4gICAgY29uc3QgZmluZEhpdEluZGV4ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZHMpICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTZWxmIGNvbW1hbmQgeFxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgY29uc3QgaW5kZXhDb29yZCA9IGZpbmRIaXRJbmRleChjb29yZHMpXHJcbiAgICAgICAgX3NoaXBDb29yZCA9IF9zaGlwQ29vcmQuZmlsdGVyKGNvb3JkID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkKSAhPT0gaW5kZXhDb29yZCBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1cmUgLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBpc1N1bmtOZXh0SGl0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQubGVuZ3RoID09PSAxID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0U2hpcE5hbWUsXHJcbiAgICAgICAgZ2V0U2hpcENvb3JkLFxyXG4gICAgICAgIGlzU3Vua05leHRIaXQsXHJcbiAgICAgICAgcmVtb3ZlU3F1YXJlSGl0XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ2V0U2hpcExlbmd0aEJ5TmFtZSB9IGZyb20gJy4uL2xvZ2ljL2dhbWVib2FyZCdcclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZVR1cm5EYXRhID0gKHR1cm5EYXRhKSA9PntcclxuICAgIGNvbnN0IHBsYXllckRhdGEgICAgICA9IHR1cm5EYXRhLmlzUGxheWVyQXR0YWNrTWlzc1xyXG4gICAgY29uc3QgY29tcHV0ZXJEYXRhICAgID0gdHVybkRhdGEuaXNDb21wdXRlckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyQ29vcmRzICA9IHR1cm5EYXRhLmNvbXB1dGVyQ29vcmRzXHJcbiAgICBjb25zdCBhdHRhY2tlZEVsZW1lbnQgPSBmaW5kSGl0RWxlbWVudChjb21wdXRlckNvb3JkcylcclxuXHJcbiAgICByZXR1cm4geyBwbGF5ZXJEYXRhLGNvbXB1dGVyRGF0YSwgYXR0YWNrZWRFbGVtZW50IH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJldHJpZXZlRGF0YURyb3AgPSAoZXZlbnQpID0+e1xyXG4gICAgY29uc3Qgc2hpcElEICAgICAgID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc3Qgc3F1YXJlSUQgICAgID0gZXZlbnQudGFyZ2V0LmlkIFxyXG4gICAgbGV0IHNxdWFyZXNUb1N0eWxlID0gZ2V0U2hpcExlbmd0aEJ5TmFtZShzaGlwSUQpXHJcblxyXG4gICAgcmV0dXJuIHtzaGlwSUQsc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGV9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZURhdGFCb2FyZFZlcnQgPSAoc3F1YXJlSUQsc2hpcElEKSA9PntcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3Qgb3JpZ2luYWxJbmRleCAgPSBib2FyZEdyaWRBcnJheS5maW5kSW5kZXgoZWwgPT4gZWwuaWQgPT09IHNxdWFyZUlEKVxyXG4gICAgY29uc3Qgc2hpcEluUG9vbCAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwSUQpXHJcbiAgICBsZXQgaW5kZXhUb1N0eWxlICAgICA9IG9yaWdpbmFsSW5kZXhcclxuXHJcbiAgICByZXR1cm4ge2JvYXJkR3JpZEFycmF5LCBvcmlnaW5hbEluZGV4LCBzaGlwSW5Qb29sLCBpbmRleFRvU3R5bGV9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZURhdGFCb2FyZEhvcml6ID0gKHNxdWFyZUlELHNoaXBJRCxzcXVhcmVzVG9TdHlsZSkgPT57XHJcbiAgICBjb25zdCBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlID0gc3F1YXJlc1RvU3R5bGVcclxuICAgIGNvbnN0IG9yaWdpbmFsSW5kZXggICAgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzcXVhcmVJRH1gKVxyXG4gICAgY29uc3Qgc2hpcEluUG9vbCAgICAgICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXBJRClcclxuICAgIGxldCBlbGVtZW50VG9TdHlsZSAgICAgICAgICAgPSBvcmlnaW5hbEluZGV4XHJcblxyXG4gICAgcmV0dXJuIHtlbGVtZW50VG9TdHlsZSwgb3JpZ2luYWxJbmRleCwgc2hpcEluUG9vbCwgb3JpZ2luYWxTcXVhcmVzVG9TdHlsZX1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3RvcmVTaGlwUmVuZGVyID0gKHNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUsb3JpZ2luYWxJbmRleCkgPT57XHJcbiAgICBpZihpc0hvcml6T3ZlcmxhcChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSxvcmlnaW5hbEluZGV4KSl7XHJcbiAgICAgICAgcmVzdG9yZVJlbmRlckhvcml6bE92ZXJsYXAoc3F1YXJlc1RvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSlcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBpZihpc1BsYWNlZEFib3ZlT3RoZXJTaGlwKHNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpKXtcclxuICAgICAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmKGlzSG9yaXpPdmVyZmxvdyhzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSkpe1xyXG4gICAgICAgIHJlc3RvcmVSZW5kZXJIb3Jpek92ZXJmbG93KHNxdWFyZXNUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXN0b3JlUmVuZGVyVmVydE92ZXJmbG93ID0gKGluZGV4VG9TdHlsZSxvcmlnaW5hbEluZGV4LGJvYXJkR3JpZEFycmF5KSA9PntcclxuICAgIHdoaWxlKGluZGV4VG9TdHlsZSA+PSBvcmlnaW5hbEluZGV4KXtcclxuICAgICAgICBib2FyZEdyaWRBcnJheVtpbmRleFRvU3R5bGVdLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgICAgIGluZGV4VG9TdHlsZSA9IG1vdmVUb1ByZXZpb3VzUm93KGluZGV4VG9TdHlsZSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3RvcmVSZW5kZXJWZXJ0T3ZlcmxhcCA9IChjdXJyZW50U3F1YXJlLG9yaWdpbmFsSW5kZXgsY29vcmRzKSA9PntcclxuICAgIGNvb3JkcyA9IGVtcHR5Q29vcmRzQXJyYXkoY29vcmRzKVxyXG4gICAgaW5kZXhUb1N0eWxlID0gbW92ZVRvUHJldmlvdXNSb3coaW5kZXhUb1N0eWxlKVxyXG4gICAgd2hpbGUoaW5kZXhUb1N0eWxlID49IG9yaWdpbmFsSW5kZXgpe1xyXG4gICAgICAgIGN1cnJlbnRTcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgaW5kZXhUb1N0eWxlID0gbW92ZVRvUHJldmlvdXNSb3coaW5kZXhUb1N0eWxlKVxyXG4gICAgfVxyXG59IFxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3RvcmVSZW5kZXJIb3Jpek92ZXJmbG93ID0gKHNxdWFyZXNUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUpID0+e1xyXG4gICAgd2hpbGUoc3F1YXJlc1RvU3R5bGUgPD0gb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSl7XHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXHJcbiAgICAgICAgc3F1YXJlc1RvU3R5bGUrK1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzdG9yZVJlbmRlckhvcml6bE92ZXJsYXAgPSAoc3F1YXJlc1RvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSkgPT57XHJcblxyXG4gICAgY29uc3QgaXNBbGxTcXVhcmVzTm90UmVzdG9yZWQgPSBcclxuICAgICAgICBlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3JvdycpIFxyXG4gICAgICAgICAgICA/IGlzU3F1YXJlc0hpZ2hlclxyXG4gICAgICAgICAgICA6IGlzU3F1YXJlc0hpZ2hlck9yRXF1YWxcclxuICAgICAgICBcclxuICAgIGVsZW1lbnRUb1N0eWxlID0gZWxlbWVudFRvU3R5bGUucHJldmlvdXNFbGVtZW50U2libGluZ1xyXG5cclxuICAgIHdoaWxlKGlzQWxsU3F1YXJlc05vdFJlc3RvcmVkKHNxdWFyZXNUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpKXtcclxuICAgICAgICAvLyBXaGVuIHRoZSBzaGlwIGlzIHBsYWNlZCBvbiBmaXJzdCBlbGVtZW50XHJcbiAgICAgICAgLy8gb2YgYXJyYXkgYW5kIGl0IGlzIG5vdCBzdWNjZXNmdWxcclxuICAgICAgICBpZihlbGVtZW50VG9TdHlsZSA9PT0gbnVsbCkgcmV0dXJuXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXHJcbiAgICAgICAgc3F1YXJlc1RvU3R5bGUrK1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGNoZWNrSWZSZW5kZXJPclJlc3RvcmUgPSAoY3VycmVudFNxdWFyZSxvcmlnaW5hbEluZGV4LGNvb3JkcykgPT57XHJcbiAgICBpZihpc1ZlcnRpY2FsT3ZlcmxhcHBpbmcoY3VycmVudFNxdWFyZSkgKXtcclxuICAgICAgICByZXN0b3JlUmVuZGVyVmVydE92ZXJsYXAoY3VycmVudFNxdWFyZSxvcmlnaW5hbEluZGV4LGNvb3JkcykgXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxuICAgIGNvb3Jkcy5wdXNoKGN1cnJlbnRTcXVhcmUuaWQpXHJcbiAgICBjb25zb2xlLmxvZyhjb29yZHMpXHJcbiAgICBjdXJyZW50U3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgaXNOZXh0U3F1YXJlVmFsaWQgPSAoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gKHNxdWFyZXNUb1N0eWxlID4gMCkgXHJcbiAgICAgICAgJiYgKCFlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKSlcclxuICAgICAgICAmJighZWxlbWVudFRvU3R5bGUgPT09IG51bGwpIFxyXG4gICAgICAgICYmICghZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdyb3cnKSBcclxuICAgICAgICB8fCAoc3F1YXJlc1RvU3R5bGUgPT09IG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNWZXJ0aWNhbE92ZXJsYXBwaW5nID0gKGN1cnJlbnRTcXVhcmUpID0+e1xyXG4gICAgcmV0dXJuIGN1cnJlbnRTcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJylcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzSG9yaXpPdmVyZmxvdyA9IChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gKHNxdWFyZXNUb1N0eWxlID4gMCkgXHJcbiAgICAgICAgJiYgKGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5jb250YWlucygncm93JykpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc0hvcml6T3ZlcmxhcCA9IChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSxvcmlnaW5hbEluZGV4KSA9PntcclxuICAgIHJldHVybiAoc3F1YXJlc1RvU3R5bGUgPiAwKSBcclxuICAgICAgICAmJiAoZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJylcclxuICAgICAgICB8fCAob3JpZ2luYWxJbmRleC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpKSkgICAgICBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzUGxhY2VkQWJvdmVPdGhlclNoaXAgPSAoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gKHNxdWFyZXNUb1N0eWxlID4gMCkgXHJcbiAgICAgICAgJiYgKGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpKSBcclxuICAgICAgICAmJiAoc3F1YXJlc1RvU3R5bGUgPT09IG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1NxdWFyZXNIaWdoZXIgPSAoc3F1YXJlc1RvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gc3F1YXJlc1RvU3R5bGUgPCBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1NxdWFyZXNIaWdoZXJPckVxdWFsID0gKHNxdWFyZXNUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpID0+e1xyXG4gICAgcmV0dXJuIHNxdWFyZXNUb1N0eWxlIDw9IG9yaWdpbmFsU3F1YXJlc1RvU3R5bGVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzUmVuZGVyU3VjY2VzZnVsID0gKHNxdWFyZXNUb1N0eWxlKSA9PntcclxuICAgIHJldHVybiBzcXVhcmVzVG9TdHlsZSA9PT0gMFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbW92ZVRvTmV4dFJvdyA9IChpbmRleFRvU3R5bGUpID0+e1xyXG4gICAgcmV0dXJuICBpbmRleFRvU3R5bGUgKz0gOFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbW92ZVRvUHJldmlvdXNSb3cgPSAoaW5kZXhUb1N0eWxlKSA9PntcclxuICAgIHJldHVybiAgaW5kZXhUb1N0eWxlIC09IDhcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtb3ZlVG9OZXh0Q29sdW1uID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGVtcHR5Q29vcmRzQXJyYXkgPSAoY29vcmRzKSA9PntcclxuICAgIHJldHVybiBjb29yZHMubGVuZ3RoID0gMFxyXG59XHJcbiIsImltcG9ydCB7IHJldHJpZXZlRGF0YURyb3AsXHJcbiAgICByZXRyaWV2ZURhdGFCb2FyZFZlcnQsXHJcbiAgICByZXRyaWV2ZURhdGFCb2FyZEhvcml6LFxyXG4gICAgcmVzdG9yZVJlbmRlclZlcnRPdmVyZmxvdyxcclxuICAgIHJlc3RvcmVTaGlwUmVuZGVyLFxyXG4gICAgaXNOZXh0U3F1YXJlVmFsaWQsXHJcbiAgICBjaGVja0lmUmVuZGVyT3JSZXN0b3JlLFxyXG4gICAgbW92ZVRvTmV4dFJvdyxcclxuICAgIG1vdmVUb1ByZXZpb3VzUm93LFxyXG4gICAgZW1wdHlDb29yZHNBcnJheSwgXHJcbn0gZnJvbSAnLi9oYW5kbGVTdHlsaW5nRXZlbnRzRGF0YSdcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVHVybiAodHVybkRhdGEsZXZlbnQpe1xyXG4gICAgY29uc3QgeyBwbGF5ZXJEYXRhLGNvbXB1dGVyRGF0YSwgYXR0YWNrZWRFbGVtZW50IH0gPSBcclxuICAgICAgICByZXRyaWV2ZVR1cm5EYXRhKHR1cm5EYXRhKVxyXG5cclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhwbGF5ZXJEYXRhLCBldmVudC50YXJnZXQpXHJcbiAgICByZW5kZXJCb2FyZFNxdWFyZXMoY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQpXHJcblxyXG4gICAgcmVuZGVyVHVybkluZm8odHVybkRhdGEsdHVybkRhdGEucGxheWVyMSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlck1hdGNoUmVzdWx0ID0gKHBsYXllckRhdGEpID0+e1xyXG4gICAgY29uc3Qgd2lubmVyID0gcGxheWVyRGF0YS5wbGF5ZXIxLmlzUGxheWVyRGVmZWF0ZWQoKSBcclxuICAgICAgICA/ICdDb21wdXRlcidcclxuICAgICAgICA6IHBsYXllckRhdGEucGxheWVyMS5nZXROYW1lKCkgICBcclxuXHJcbiAgICBjb25zdCBtYXRjaEluZm9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXJuLWluZm8nKVxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9YCArICcgaXMgdGhlIHdpbm5lciEnIFxyXG59XHJcblxyXG5jb25zdCByZXRyaWV2ZVR1cm5EYXRhID0gKHR1cm5EYXRhKSA9PntcclxuICAgIGNvbnN0IHBsYXllckRhdGEgICAgICA9IHR1cm5EYXRhLmlzUGxheWVyQXR0YWNrTWlzc1xyXG4gICAgY29uc3QgY29tcHV0ZXJEYXRhICAgID0gdHVybkRhdGEuaXNDb21wdXRlckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyQ29vcmRzICA9IHR1cm5EYXRhLmNvbXB1dGVyQ29vcmRzXHJcbiAgICBjb25zdCBhdHRhY2tlZEVsZW1lbnQgPSBmaW5kSGl0RWxlbWVudChjb21wdXRlckNvb3JkcylcclxuXHJcbiAgICByZXR1cm4geyBwbGF5ZXJEYXRhLGNvbXB1dGVyRGF0YSwgYXR0YWNrZWRFbGVtZW50IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZURyb3BFdmVudCAoZXZlbnQsZ2FtZSkge1xyXG4gICAgY29uc3Qge3NoaXBJRCwgc3F1YXJlSUQgLHNxdWFyZXNUb1N0eWxlfSA9IHJldHJpZXZlRGF0YURyb3AoZXZlbnQpXHJcbiAgICAvLyBTaGlwIGRpcmVjdGlvbiB3aWxsIGNoYW5nZSBiYXNlZCBvbiBzb21lIERPTSBjbGFzcz9cclxuICAgIC8vIChzaGlwRGlyZWN0aW9uID09PSAndmVydGljYWwnID8gcmVuZGVyU3F1YXJlc1ZlcnRpY2FsbHkoKSA6IHJlbmRlclNxdWFyZXNIb3Jpem9udGFsbHkoKSkgICBcclxuICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZW5kZXJTaGlwSG9yaXpvbnRhbGx5KHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlLHNoaXBJRClcclxuICBcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG4gICAgZ2FtZS5zZXRDb29yZHNBcnJheShzaGlwQ29vcmRzKVxyXG4gICAgZ2FtZS5jaGVja0ZvckdhbWVQcmVwYXJlZChnYW1lKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwVmVydGljYWxseSA9IChzcXVhcmVJRCxzcXVhcmVzVG9TdHlsZSxzaGlwSUQpID0+e1xyXG4gICAgbGV0IGNvb3JkcyA9IFtdXHJcbiAgICBsZXQgeyBib2FyZEdyaWRBcnJheSwgb3JpZ2luYWxJbmRleCwgc2hpcEluUG9vbCwgaW5kZXhUb1N0eWxlIH0gPVxyXG4gICAgICByZXRyaWV2ZURhdGFCb2FyZFZlcnQoc3F1YXJlSUQsc2hpcElEKVxyXG4gICAgXHJcbiAgICB0cnl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcXVhcmVzVG9TdHlsZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U3F1YXJlID0gYm9hcmRHcmlkQXJyYXlbaW5kZXhUb1N0eWxlXVxyXG4gICAgICAgICAgICBsZXQgaXNTcXVhcmVJbnZhbGlkID0gIGNoZWNrSWZSZW5kZXJPclJlc3RvcmUoY3VycmVudFNxdWFyZSxvcmlnaW5hbEluZGV4LGNvb3JkcyxpbmRleFRvU3R5bGUpXHJcbiAgICAgICAgICAgIGlmKGlzU3F1YXJlSW52YWxpZCkgcmV0dXJuXHJcbiAgICAgICAgICAgIGluZGV4VG9TdHlsZSA9IG1vdmVUb05leHRSb3coaW5kZXhUb1N0eWxlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxyXG4gICAgICAgIHNoaXBJblBvb2wucmVtb3ZlQXR0cmlidXRlKCdkcmFnZ2FibGUnKVxyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgICAgICBcclxuICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgLy8gV2lsbCB0cmlnZ2VyIGlmIHNoaXAgcGxhY2VtZW50IFxyXG4gICAgICAgIC8vIG92ZXJmbG93cyBmcm9tIHRoZSBib3R0b21cclxuICAgICAgICBjb29yZHMgPSBlbXB0eUNvb3Jkc0FycmF5KGNvb3JkcylcclxuICAgICAgICBpbmRleFRvU3R5bGUgPSBtb3ZlVG9QcmV2aW91c1JvdyhpbmRleFRvU3R5bGUpXHJcbiAgICAgICAgcmVzdG9yZVJlbmRlclZlcnRPdmVyZmxvdyhpbmRleFRvU3R5bGUsb3JpZ2luYWxJbmRleCxib2FyZEdyaWRBcnJheSlcclxuICAgIH0gXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNxdWFyZVZlcnRpY2FsbHkgPSAoKSA9PntcclxuICBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcEhvcml6b250YWxseSA9IChzcXVhcmVJRCxzcXVhcmVzVG9TdHlsZSxzaGlwSUQpID0+e1xyXG4gICAgXHJcbiAgICBsZXQge2VsZW1lbnRUb1N0eWxlLCBvcmlnaW5hbEluZGV4LCBzaGlwSW5Qb29sLCBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlfT1cclxuICAgICAgcmV0cmlldmVEYXRhQm9hcmRIb3JpeihzcXVhcmVJRCxzaGlwSUQsc3F1YXJlc1RvU3R5bGUpXHJcbiAgICBsZXQgY29vcmRzID0gW11cclxuICAgIC8vIFJlZmFjdG9yXHJcbiAgICB3aGlsZShpc05leHRTcXVhcmVWYWxpZChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKSl7XHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICBpZihlbGVtZW50VG9TdHlsZSA9PT0gbnVsbCkgYnJlYWtcclxuICAgICAgICBjb29yZHMucHVzaChlbGVtZW50VG9TdHlsZS5pZClcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tIFxyXG4gICAgfVxyXG4gICAgICAgICBcclxuICAgIC8vIFJlZmFjdG9yXHJcbiAgICBpZihzcXVhcmVzVG9TdHlsZSAhPSAwKXtcclxuICAgICAgICByZXN0b3JlU2hpcFJlbmRlcihcclxuICAgICAgICAgICAgc3F1YXJlc1RvU3R5bGUsXHJcbiAgICAgICAgICAgIGVsZW1lbnRUb1N0eWxlLFxyXG4gICAgICAgICAgICBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlLFxyXG4gICAgICAgICAgICBvcmlnaW5hbEluZGV4KVxyXG4gICAgICAgIGNvb3JkcyA9IGVtcHR5Q29vcmRzQXJyYXkoY29vcmRzKVxyXG4gICAgICAgIHNoaXBJblBvb2wuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyBSZWZhY3RvciBhbG9uZyB3aXRoIHdoaWxlIGxvb3BcclxuICAgIHNoaXBJblBvb2wuY2xhc3NMaXN0LmFkZCgnaGlkZScpXHJcbiAgICBzaGlwSW5Qb29sLnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJylcclxuICAgIHJldHVybiBjb29yZHNcclxuICAgICAgXHJcbn1cclxuICAgIFxyXG5jb25zdCByZW5kZXJTcXVhcmVzSG9yaXpvbnRhbGx5ID0gKGVsZW1lbnRUb1N0eWxlLHNxdWFyZXNUb1N0eWxlLGNvb3JkcykgPT57XHJcbiAgICB3aGlsZShpc05leHRTcXVhcmVWYWxpZChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKSl7XHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICBjb29yZHMucHVzaChlbGVtZW50VG9TdHlsZS5pZClcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tIFxyXG4gICAgfVxyXG59XHJcbiAgICBcclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdTdGFydCAoZXZlbnQpIHtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJyxldmVudC50YXJnZXQuaWQpXHJcbn1cclxuICAgIFxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0VudGVyIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpXHJcbn1cclxuICAgIFxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ092ZXIgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJylcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdMZWF2ZSAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG59XHJcblxyXG5jb25zdCBmaW5kSGl0RWxlbWVudCA9IChjb29yZHMpID0+e1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wbGF5ZXIxID4gIyR7Y29vcmRzfWApXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkU3F1YXJlcyA9ICh0dXJuRGF0YSwgZWxlbWVudCkgPT57XHJcbiAgICBpZihpc0hpdEVsZW1lbnQoZWxlbWVudCkpIHJldHVybiAgXHJcbiAgICAodHVybkRhdGEpID8gcmVuZGVyU3F1YXJlT25NaXNzKGVsZW1lbnQpIDogcmVuZGVyU3F1YXJlT25IaXQoZWxlbWVudClcclxufVxyXG5cclxuY29uc3QgaXNIaXRFbGVtZW50ID0gKGVsZW1lbnQpID0+e1xyXG4gICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3F1YXJlT25IaXQgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uTWlzcyAgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJUdXJuSW5mbyA9ICh0dXJuRGF0YSxwbGF5ZXIxKSA9PntcclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3BsYXllcjEuZ2V0TmFtZSgpfSBhdHRhY2sgaXMgYSBgIFxyXG4gICAgKyAodHVybkRhdGEuaXNQbGF5ZXJBdHRhY2tNaXNzKSA/ICdtaXNzIScgOiAnaGl0ISdcclxuICBcclxufVxyXG5cclxuY29uc3QgcmVuZGVyV2FybmluZ3NJbmZvID0gKCkgPT57XHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBPblNpbmsgPSAoKSA9PntcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdGF0aWNFbGVtZW50cyhnYW1lYm9hcmQsIHBsYXllcjEsIHBsYXllcjIpe1xyXG4gICAgcmVuZGVyQm9hcmRPblJlc2V0KClcclxuICAgIHJlbmRlclNoaXBzKGdhbWVib2FyZClcclxuICAgIHJlbmRlclBsYXllck5hbWVzKHBsYXllcjEsIHBsYXllcjIpXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBzID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICBsZXQgaW5kZXggPSAwXHJcbiAgICBjb25zdCBib2FyZEdyaWQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmRHcmlkKClcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKGJvYXJkR3JpZCkpe1xyXG4gICAgICAgIGlmKGJvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgYm9hcmRHcmlkQXJyYXlbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleCsrXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCByZW5kZXJQbGF5ZXJOYW1lcyA9IChwbGF5ZXIxLCBwbGF5ZXIyKSA9PntcclxuICAgIGNvbnN0IHBsYXllcjFOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEtbmFtZScpXHJcbiAgICBjb25zdCBwbGF5ZXIyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyLW5hbWUnKVxyXG5cclxuICAgIHBsYXllcjFOYW1lLnRleHRDb250ZW50ID0gcGxheWVyMS5nZXROYW1lKCkgKyAnIFxcJ3MgZmxlZXQnXHJcbiAgICBwbGF5ZXIyTmFtZS50ZXh0Q29udGVudCA9IHBsYXllcjIuZ2V0TmFtZSgpICsgJyBcXCdzIGZsZWV0J1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJCb2FyZE9uUmVzZXQgPSAoKSA9PntcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5MSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5MiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcblxyXG4gICAgYm9hcmRHcmlkQXJyYXkxLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaGl0JylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnbWlzcycpXHJcbiAgICB9KVxyXG4gICAgYm9hcmRHcmlkQXJyYXkyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJylcclxuICAgIH0pIFxyXG5cclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gICcnXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lLGNoZWNrRm9yR2FtZVByZXBhcmVkfSBmcm9tICcuL2xvZ2ljL2dhbWUnXHJcbmltcG9ydCB7YWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrfSBmcm9tICcuL2xvZ2ljL2hhbmRsZUV2ZW50TGlzdGVuZXJzJ1xyXG5cclxuY29uc3QgcHJlcGFyZUdhbWUgPSAoZ2FtZSkgPT57XHJcbiAgICBnYW1lLmFkZEV2ZW50TGlzdGVuZXJzRHJhZ1NoaXBzKGdhbWUpXHJcbn1cclxuXHJcbmNvbnN0IGdhbWUgPSBHYW1lKClcclxucHJlcGFyZUdhbWUoZ2FtZSlcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==