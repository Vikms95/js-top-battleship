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
/* harmony export */   "isSquaresHigher": () => (/* binding */ isSquaresHigher),
/* harmony export */   "isSquaresHigherOrEqual": () => (/* binding */ isSquaresHigherOrEqual),
/* harmony export */   "isVerticalOverlapping": () => (/* binding */ isVerticalOverlapping),
/* harmony export */   "moveToNextColumn": () => (/* binding */ moveToNextColumn),
/* harmony export */   "moveToNextRow": () => (/* binding */ moveToNextRow),
/* harmony export */   "moveToPreviousRow": () => (/* binding */ moveToPreviousRow),
/* harmony export */   "renderShipsAndReturnCoords": () => (/* binding */ renderShipsAndReturnCoords),
/* harmony export */   "restoreRenderHorizontalOverflow": () => (/* binding */ restoreRenderHorizontalOverflow),
/* harmony export */   "restoreRenderHorizontalOverlap": () => (/* binding */ restoreRenderHorizontalOverlap),
/* harmony export */   "restoreRenderVerticalOverflow": () => (/* binding */ restoreRenderVerticalOverflow),
/* harmony export */   "restoreRenderVerticalOverlap": () => (/* binding */ restoreRenderVerticalOverlap),
/* harmony export */   "restoreShipRender": () => (/* binding */ restoreShipRender),
/* harmony export */   "retrieveDataBoardHorizontally": () => (/* binding */ retrieveDataBoardHorizontally),
/* harmony export */   "retrieveDataBoardVertically": () => (/* binding */ retrieveDataBoardVertically),
/* harmony export */   "retrieveDataDrop": () => (/* binding */ retrieveDataDrop)
/* harmony export */ });
/* harmony import */ var _logic_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logic/gameboard */ "./src/logic/gameboard.js");


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

const renderShipsAndReturnCoords = (squaresToStyle,boardGridArray) =>{
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
        
    }else{
        coords.push(currentSquare.id)
        console.log(coords)
        currentSquare.classList.add('ship')
        return false
    }
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

const moveToNextRow = (indexToStyle) =>{
    return  indexToStyle += 8
}

const moveToPreviousRow = (indexToStyle) =>{
    return  indexToStyle -= 8

}

const moveToNextColumn = () =>{

}

// export const addCoordsToArray = (coords,indexToAdd) =>{
//     return [...coords,indexToAdd]
// }

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
    const shipCoords = renderShipVertically(squareID,squaresToStyle,shipID)
  
    event.target.classList.remove('drag-over')
    event.target.classList.remove('hide')
    game.setCoordsArray(shipCoords)
    game.checkForGamePrepared(game)
}

const renderShipVertically = (squareID,squaresToStyle,shipID) =>{
    let coords = []
    let { boardGridArray, originalIndex, shipInPool, indexToStyle } =
      (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataBoardHorizontally)(squareID,shipID)
    
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

const renderShipHorizontally = (squareID,squaresToStyle,shipID) =>{
    let coords = []
    let {elementToStyle, originalIndex, shipInPool, originalSquaresToStyle}=
    (0,_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataBoardHorizontally)(squareID,shipID,squaresToStyle)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZO0FBQ1o7QUFDQTtBQUNPO0FBQ1A7QUFDQSw4REFBOEQsU0FBUztBQUN2RTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSmtDO0FBQ2xDO0FBQ0E7QUFDTztBQUNQLFlBQVksMkNBQTJDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsT0FBTztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQLFdBQVcsa0NBQWtDLEVBQUUsMEVBQWdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsMERBQTBEO0FBQ3BFLE1BQU0sdUZBQTZCO0FBQ25DO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDO0FBQ0EsbUNBQW1DLGdGQUFzQjtBQUN6RDtBQUNBLDJCQUEyQix1RUFBYTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpQkFBaUIsMEVBQWdCO0FBQ2pDLHVCQUF1QiwyRUFBaUI7QUFDeEMsUUFBUSx3RkFBNkI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsa0VBQWtFO0FBQzNFLElBQUksdUZBQTZCO0FBQ2pDO0FBQ0EsVUFBVSwyRUFBaUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDJFQUFpQjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwwRUFBZ0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxPQUFPO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0S087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7VUMzQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOdUQ7QUFDaUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsaURBQUk7QUFDakI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWUuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2hhbmRsZUV2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3BsYXllci5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9zaGlwLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvaGFuZGxlU3R5bGluZ0V2ZW50c0RhdGEuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvdmlldy9yZW5kZXJTdGF0aWNFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlclN0YXRpY0VsZW1lbnRzIH0gZnJvbSAnLi4vdmlldy9yZW5kZXJTdGF0aWNFbGVtZW50cydcclxuaW1wb3J0IHsgcmVuZGVyTWF0Y2hSZXN1bHQgfSBmcm9tICcuLi92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cydcclxuaW1wb3J0IHsgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMsIGFkZEV2ZW50TGlzdGVuZXJEcmFnZ2FibGUsIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnLCBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2sgfSBmcm9tICcuL2hhbmRsZUV2ZW50TGlzdGVuZXJzJ1xyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcclxuLy8gaW1wb3J0IHsgZXhlY3V0ZUdhbWUgfSBmcm9tICcvc3JjL2luZGV4J1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWUgKCl7XHJcbiAgICBsZXQgY29vcmRzQXJyYXkgPSBbXVxyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkLWdyaWQucGxheWVyMicpXHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd1bmNsaWNrYWJsZScpXHJcblxyXG4gICAgY29uc3QgcGxheWVyMSA9IFBsYXllcignVmljdG9yJylcclxuICAgIHBsYXllcjEuY3JlYXRlR2FtZUJvYXJkKFxyXG4gICAgICAgIFsnRzMnXSxcclxuICAgICAgICBbJ0M1JywnSDYnXSxcclxuICAgICAgICBbJ0I3JywnRDEnLCdIMSddLFxyXG4gICAgICAgIFsnQzYnLCdBNScsJ0Q4JywnRDInXSxcclxuICAgICAgICBbJ0UxJywnRTInLCdFMycsJ0U0JywnQTUnXVxyXG4gICAgKVxyXG4gICAgY29uc3QgcGxheWVyMiA9IFBsYXllcignQ29tcHV0ZXInKVxyXG4gICAgcGxheWVyMi5jcmVhdGVHYW1lQm9hcmQoXHJcbiAgICAgICAgWydHOCddLFxyXG4gICAgICAgIFsnQjEnLCdCMiddLFxyXG4gICAgICAgIFsnQzEnLCdDMicsJ0MzJ10sXHJcbiAgICAgICAgWydEMScsJ0QyJywnRDMnLCdENCddLFxyXG4gICAgICAgIFsnRTEnLCdFMicsJ0UzJywnRTQnLCdFNSddXHJcbiAgICApXHJcblxyXG4gICAgbGV0IGdhbWVib2FyZDEgICAgID0gcGxheWVyMS5nZXRHYW1lYm9hcmQoKVxyXG4gICAgbGV0IGdhbWVib2FyZDIgICAgID0gcGxheWVyMi5nZXRHYW1lYm9hcmQoKVxyXG4gICAgbGV0IHBsYXllckluVHVybiAgID0gcGxheWVyMVxyXG4gICAgbGV0IGVuZW15R2FtZWJvYXJkID0gZ2FtZWJvYXJkMlxyXG5cclxuICAgIHJlbmRlclN0YXRpY0VsZW1lbnRzKGdhbWVib2FyZDEsIHBsYXllcjEsIHBsYXllcjIpXHJcblxyXG4gICAgY29uc3QgZ2FtZVR1cm4gPSAoY29vcmRzKSA9PntcclxuICAgICAgICBjb25zdCBwbGF5ZXJDb29yZHMgPSBwbGF5ZXJJblR1cm4uc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZShjb29yZHMpXHJcbiAgICAgICAgaWYocGxheWVyQ29vcmRzID09PSBudWxsKSByZXR1cm4gbnVsbFxyXG4gIFxyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyQXR0YWNrTWlzcyAgID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIocGxheWVyQ29vcmRzKSBcclxuICAgICAgICBwbGF5ZXJJblR1cm4gICAgICAgICAgICAgICA9IHN3aXRjaFBsYXllcnMoKVxyXG4gICAgICAgIGVuZW15R2FtZWJvYXJkICAgICAgICAgICAgID0gc3dpdGNoR2FtZWJvYXJkcygpXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY29tcHV0ZXJDb29yZHMgICAgICAgPSBwbGF5ZXJJblR1cm4uc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZShlbmVteUdhbWVib2FyZClcclxuICAgICAgICBjb25zdCBpc0NvbXB1dGVyQXR0YWNrTWlzcyA9IGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2tGcm9tUGxheWVyKGNvbXB1dGVyQ29vcmRzKVxyXG4gICAgICAgIHBsYXllckluVHVybiAgICAgICAgICAgICAgID0gc3dpdGNoUGxheWVycygpXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgICAgICAgICAgICAgPSBzd2l0Y2hHYW1lYm9hcmRzKClcclxuXHJcbiAgICAgICAgaWYoaXNBbnlQbGF5ZXJEZWZlYXRlZCgpKXtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndW5jbGlja2FibGUnKVxyXG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpXHJcbiAgICAgICAgICAgIHJlbmRlck1hdGNoUmVzdWx0KHtwbGF5ZXIxLHBsYXllcjJ9KVxyXG4gICAgICAgICAgICBwcmVwYXJlTmV4dE1hdGNoKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBsYXllcjEsXHJcbiAgICAgICAgICAgIGlzUGxheWVyQXR0YWNrTWlzcyxcclxuICAgICAgICAgICAgaXNDb21wdXRlckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGNvbXB1dGVyQ29vcmRzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaFBsYXllcnMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKHBsYXllckluVHVybiA9PT0gcGxheWVyMikgPyBwbGF5ZXIxIDogcGxheWVyMlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaEdhbWVib2FyZHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKHBsYXllckluVHVybiA9PT0gcGxheWVyMikgPyBnYW1lYm9hcmQxIDogZ2FtZWJvYXJkMlxyXG4gICAgfSAgIFxyXG5cclxuICAgIGNvbnN0IGlzQW55UGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVyMS5pc1BsYXllckRlZmVhdGVkKCkgfHwgcGxheWVyMi5pc1BsYXllckRlZmVhdGVkKClcclxuICAgIH0gXHJcblxyXG4gICAgLy8gY29uc3QgcHJlcGFyZU5leHRNYXRjaCA9ICgpID0+e1xyXG4gICAgLy8gICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgZnJvbSBib2FyZFxyXG4gICAgLy8gICAgIHNldFRpbWVvdXQoLDIwMDApXHJcbiAgICAvLyB9XHJcblxyXG4gICAgY29uc3QgYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHMgPSAoZ2FtZSkgPT57XHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSgpXHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcoZ2FtZSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXRDb29yZHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICBjb29yZHNBcnJheS5wdXNoKHNoaXApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0Q29vcmRzQXJyYXkgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gY29vcmRzQXJyYXlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGVja0ZvckdhbWVQcmVwYXJlZCA9IChnYW1lKSA9PntcclxuICAgICAgICBpZiAoZ2FtZS5nZXRDb29yZHNBcnJheSgpLmxlbmd0aCA+PSA5KXtcclxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrKGdhbWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybntnYW1lVHVybixhZGRFdmVudExpc3RlbmVyc0RyYWdTaGlwcyxnZXRDb29yZHNBcnJheSxzZXRDb29yZHNBcnJheSxjaGVja0ZvckdhbWVQcmVwYXJlZH1cclxufVxyXG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xyXG5leHBvcnQgZnVuY3Rpb24gR2FtZWJvYXJkKCl7ICAgIFxyXG4gICBcclxuICAgIGxldCBfYm9hcmRHcmlkID0gXHJcbiAgICB7XHJcbiAgICAgICAgJ0ExJzogZmFsc2UsICdBMic6IGZhbHNlLCAnQTMnOiBmYWxzZSwgJ0E0JzogZmFsc2UsICdBNSc6IGZhbHNlLCAnQTYnOiBmYWxzZSwgJ0E3JzogZmFsc2UsICdBOCc6IGZhbHNlLCBcclxuICAgICAgICAnQjEnOiBmYWxzZSwgJ0IyJzogZmFsc2UsICdCMyc6IGZhbHNlLCAnQjQnOiBmYWxzZSwgJ0I1JzogZmFsc2UsICdCNic6IGZhbHNlLCAnQjcnOiBmYWxzZSwgJ0I4JzogZmFsc2UsIFxyXG4gICAgICAgICdDMSc6IGZhbHNlLCAnQzInOiBmYWxzZSwgJ0MzJzogZmFsc2UsICdDNCc6IGZhbHNlLCAnQzUnOiBmYWxzZSwgJ0M2JzogZmFsc2UsICdDNyc6IGZhbHNlLCAnQzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0QxJzogZmFsc2UsICdEMic6IGZhbHNlLCAnRDMnOiBmYWxzZSwgJ0Q0JzogZmFsc2UsICdENSc6IGZhbHNlLCAnRDYnOiBmYWxzZSwgJ0Q3JzogZmFsc2UsICdEOCc6IGZhbHNlLCBcclxuICAgICAgICAnRTEnOiBmYWxzZSwgJ0UyJzogZmFsc2UsICdFMyc6IGZhbHNlLCAnRTQnOiBmYWxzZSwgJ0U1JzogZmFsc2UsICdFNic6IGZhbHNlLCAnRTcnOiBmYWxzZSwgJ0U4JzogZmFsc2UsIFxyXG4gICAgICAgICdGMSc6IGZhbHNlLCAnRjInOiBmYWxzZSwgJ0YzJzogZmFsc2UsICdGNCc6IGZhbHNlLCAnRjUnOiBmYWxzZSwgJ0Y2JzogZmFsc2UsICdGNyc6IGZhbHNlLCAnRjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0cxJzogZmFsc2UsICdHMic6IGZhbHNlLCAnRzMnOiBmYWxzZSwgJ0c0JzogZmFsc2UsICdHNSc6IGZhbHNlLCAnRzYnOiBmYWxzZSwgJ0c3JzogZmFsc2UsICdHOCc6IGZhbHNlLCBcclxuICAgICAgICAnSDEnOiBmYWxzZSwgJ0gyJzogZmFsc2UsICdIMyc6IGZhbHNlLCAnSDQnOiBmYWxzZSwgJ0g1JzogZmFsc2UsICdINic6IGZhbHNlLCAnSDcnOiBmYWxzZSwgJ0g4JzogZmFsc2UgXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IF9ib2FyZFNoaXBzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0Qm9hcmRHcmlkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZEdyaWRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRCb2FyZFNoaXBzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcHVsYXRlR2FtZWJvYXJkID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUoIGluZGV4IDwgY29vcmRpbmF0ZXMubGVuZ3RoICl7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXAoLi4uY29vcmRpbmF0ZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KSBYXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwID0gKC4uLmNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBpZihpc0Nvb3Jkc0F2YWlsYWJsZShjb29yZGluYXRlcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwICA9IFNoaXAoLi4uY29vcmRpbmF0ZXMpIFxyXG4gICAgICAgICAgICBfYm9hcmRTaGlwcyA9IGFkZFNoaXBUb1NoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0KHNoaXApXHJcbiAgICAgICAgICAgIHJldHVybiBzaGlwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBJbmNvbWluZy1xdWVyeSAoYXNzZXJ0IHJlc3VsdClcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyID0gKGNvb3Jkcyk9PntcclxuICAgICAgICBpZihpc0F0dGFja1ZhbGlkKGNvb3JkcykgJiYgaXNTaGlwSGl0KGNvb3Jkcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZmluZFNoaXBCeUNvb3Jkcyhjb29yZHMpXHJcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rTmV4dEhpdCgpKXtcclxuICAgICAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5KHNoaXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNoaXBTcXVhcmUoY29vcmRzLHNoaXApXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNoaXBTcXVhcmUgPSAoY29vcmRzLHNoaXApID0+e1xyXG4gICAgICAgIHNoaXAucmVtb3ZlU3F1YXJlSGl0KGNvb3JkcylcclxuICAgICAgICByZXR1cm4gcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdChjb29yZHMpXHJcbiAgICB9XHJcbiBcclxuICAgIC8vIFF1ZXJ5ICYgQ29tbWFuZCBzZWxmIHhcclxuICAgIGNvbnN0IGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdCA9IChzaGlwKSA9PntcclxuICAgICAgICBzaGlwLmdldFNoaXBDb29yZCgpLmZvckVhY2goY29vcmQgPT57XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKF9ib2FyZEdyaWQpLmZvckVhY2goa2V5ID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZCkge19ib2FyZEdyaWRba2V5XSA9IHRydWV9IFxyXG4gICAgICAgICAgICB9KSAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZFNoaXBUb1NoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIFsuLi5fYm9hcmRTaGlwcyxzaGlwXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QgPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7Li4uX2JvYXJkR3JpZH0sIHtbYCR7Y29vcmRzfWBdOiAnSGl0J30pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGZpbmRTaGlwSW5kZXhCeU5hbWUoc2hpcClcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmlsdGVyKGFycmF5U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmluZGV4T2YoYXJyYXlTaGlwKSAhPT0gc2hpcEluZGV4IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiBcclxuICAgIGNvbnN0IGZpbmRTaGlwQnlDb29yZHMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZChzaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gc2hpcC5nZXRTaGlwQ29vcmQoKS5pbmNsdWRlcyhjb29yZHMpICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmluZFNoaXBJbmRleEJ5TmFtZSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZEluZGV4KGN1cnJlbnRTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFNoaXAuZ2V0U2hpcE5hbWUoKSA9PT0gc2hpcC5nZXRTaGlwTmFtZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc1NoaXBIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3JkcyAmJiBfYm9hcmRHcmlkW2tleV0pIHsgcmV0dXJuIHRydWUgfSAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0FsbFNoaXBzU3VuayA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAoX2JvYXJkU2hpcHMubGVuZ3RoID09PSAwKSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzQ29vcmRzQXZhaWxhYmxlID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgbGV0IGluZGV4QXJyYXkgPSAwXHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHNbaW5kZXhBcnJheV0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBpc0F0dGFja1ZhbGlkID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID09PSAnSGl0Jz8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbiBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0Qm9hcmRHcmlkLFxyXG4gICAgICAgIGdldEJvYXJkU2hpcHMsXHJcbiAgICAgICAgY3JlYXRlU2hpcCxcclxuICAgICAgICBnZXRTaGlwTGVuZ3RoQnlOYW1lLFxyXG4gICAgICAgIHBvcHVsYXRlR2FtZWJvYXJkLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyLFxyXG4gICAgICAgIGlzQWxsU2hpcHNTdW5rLFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2hpcExlbmd0aEJ5TmFtZSA9IChzaGlwTmFtZSkgPT57XHJcbiAgICBjb25zdCBfU0hJUF9OQU1FUyA9IHtcclxuICAgICAgICAnc3B5LTEnOiAxLFxyXG4gICAgICAgICdzcHktMic6IDEsXHJcbiAgICAgICAgJ3NweS0zJzogMSxcclxuICAgICAgICAnZGVzdHJveWVyLTEnOiAyLFxyXG4gICAgICAgICdkZXN0cm95ZXItMic6IDIsXHJcbiAgICAgICAgJ2Rlc3Ryb3llci0zJzogMixcclxuICAgICAgICAnY3J1aXNlcic6IDMsXHJcbiAgICAgICAgJ2JhdHRsZXNoaXAnOiA0LFxyXG4gICAgICAgICdjYXJyaWVyJzogNVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9TSElQX05BTUVTW3NoaXBOYW1lXVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyByZW5kZXJUdXJuLGRyYWdFbnRlcixkcmFnU3RhcnQsZHJhZ092ZXIsZHJhZ0xlYXZlLGhhbmRsZURyb3BFdmVudCB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmRDbGljayAoZ2FtZSl7XHJcbiAgICBjb25zdCBncmlkU3F1YXJlc0NvbXB1dGVyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZ3JpZFNxdWFyZXNDb21wdXRlci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PntcclxuICAgICAgICAgICAgcHJvY2Vzc1R1cm5EYXRhKGdhbWUsZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHByb2Nlc3NUdXJuRGF0YSA9IChnYW1lLGV2ZW50KSA9PntcclxuICAgIGNvbnN0IHR1cm5EYXRhID0gZ2FtZS5nYW1lVHVybihldmVudC50YXJnZXQuaWQpXHJcbiAgICBpZih0dXJuRGF0YSA9PT0gbnVsbCkgcmV0dXJuICAgICAgXHJcbiAgICByZW5kZXJUdXJuKHR1cm5EYXRhLGV2ZW50KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNQbGF5ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc1BsYXllci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJyxkcmFnRW50ZXIpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJyxkcmFnT3ZlcilcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxkcmFnTGVhdmUpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLChldmVudCkgPT57XHJcbiAgICAgICAgICAgIGhhbmRsZURyb3BFdmVudChldmVudCxnYW1lKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSgpe1xyXG4gICAgY29uc3Qgc2hpcHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb29sLXNoaXAucGxheWVyMScpKVxyXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwPT5cclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsZHJhZ1N0YXJ0KSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzICgpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc1R1cm5EYXRhKVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQbGF5ZXIobmFtZSl7XHJcbiAgICBjb25zdCBfcGxheWVyTmFtZSA9IG5hbWVcclxuXHJcbiAgICBsZXQgX2dhbWVib2FyZFxyXG5cclxuICAgIGxldCBfYXR0YWNrZWRTcXVhcmVzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfcGxheWVyTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfZ2FtZWJvYXJkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0QXR0YWNrZWRTcXVhcmVzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9hdHRhY2tlZFNxdWFyZXNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXRBdHRhY2tlZFNxdWFyZXMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBfYXR0YWNrZWRTcXVhcmVzLnB1c2goY29vcmRzKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUdhbWVCb2FyZCA9ICguLi5jb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgX2dhbWVib2FyZCA9IEdhbWVib2FyZCgpXHJcbiAgICAgICAgX2dhbWVib2FyZC5wb3B1bGF0ZUdhbWVib2FyZChjb29yZGluYXRlcylcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3Qgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGlmKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGNvb3JkcykpIHJldHVybiBudWxsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICAgICAgY29uc3QgYm9hcmRHcmlkID0gT2JqZWN0LmtleXMoZ2FtZWJvYXJkLmdldEJvYXJkR3JpZCgpKVxyXG4gICAgICAgIGNvbnN0IEJPQVJEX0dSSURfTEVOR1RIID0gYm9hcmRHcmlkLmxlbmd0aFxyXG5cclxuICAgICAgICBsZXQgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIHdoaWxlKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGJvYXJkR3JpZFtpbmRleF0pKXtcclxuICAgICAgICAgICAgaW5kZXggPSBnZW5lcmF0ZVJhbmRvbU51bWJlcigwLEJPQVJEX0dSSURfTEVOR1RIKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMoYm9hcmRHcmlkW2luZGV4XSlcclxuICAgICAgICByZXR1cm4gYm9hcmRHcmlkW2luZGV4XVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZW5lcmF0ZVJhbmRvbU51bWJlciA9IChtYXgsbWluKSA9PntcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNQbGF5ZXJEZWZlYXRlZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAoX2dhbWVib2FyZC5nZXRCb2FyZFNoaXBzKCkubGVuZ3RoID09PSAwKSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybntcclxuICAgICAgICBnZXROYW1lLFxyXG4gICAgICAgIGdldEdhbWVib2FyZCxcclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMsXHJcbiAgICAgICAgY3JlYXRlR2FtZUJvYXJkLFxyXG4gICAgICAgIHNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUsXHJcbiAgICAgICAgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBpc1BsYXllckRlZmVhdGVkXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gU2hpcCguLi5jb29yZGluYXRlcyl7XHJcblxyXG4gICAgbGV0IF9zaGlwQ29vcmQgPSBjb29yZGluYXRlc1xyXG5cclxuICAgIGNvbnN0IF9TSElQX05BTUVTID0ge1xyXG4gICAgICAgIDEgOiAnU3B5JyxcclxuICAgICAgICAyIDogJ0Rlc3Ryb3llcicsXHJcbiAgICAgICAgMyA6ICdDcnVpc2VyJyxcclxuICAgICAgICA0IDogJ0JhdHRsZXNoaXAnLFxyXG4gICAgICAgIDUgOiAnQ2FycmllcidcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBfc2hpcE5hbWUgPSBfU0hJUF9OQU1FU1tfc2hpcENvb3JkLmxlbmd0aF1cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0U2hpcE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgZ2V0U2hpcENvb3JkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmRcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gSW5jb21pbmcgcXVlcnkgKGFzc2VydCByZXN1bHQgPiB0ZXN0ZWQgd2l0aCByZW1vdmVTcXVhcmVIaXQpXHJcbiAgICBjb25zdCBmaW5kSGl0SW5kZXggPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkcykgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFNlbGYgY29tbWFuZCB4XHJcbiAgICBjb25zdCByZW1vdmVTcXVhcmVIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBjb25zdCBpbmRleENvb3JkID0gZmluZEhpdEluZGV4KGNvb3JkcylcclxuICAgICAgICBfc2hpcENvb3JkID0gX3NoaXBDb29yZC5maWx0ZXIoY29vcmQgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmQpICE9PSBpbmRleENvb3JkIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHVyZSAvIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGlzU3Vua05leHRIaXQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5sZW5ndGggPT09IDEgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRTaGlwTmFtZSxcclxuICAgICAgICBnZXRTaGlwQ29vcmQsXHJcbiAgICAgICAgaXNTdW5rTmV4dEhpdCxcclxuICAgICAgICByZW1vdmVTcXVhcmVIaXRcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBnZXRTaGlwTGVuZ3RoQnlOYW1lIH0gZnJvbSAnLi4vbG9naWMvZ2FtZWJvYXJkJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHJldHJpZXZlRGF0YURyb3AgPSAoZXZlbnQpID0+e1xyXG4gICAgY29uc3Qgc2hpcElEICAgICAgID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKVxyXG4gICAgY29uc3Qgc3F1YXJlSUQgICAgID0gZXZlbnQudGFyZ2V0LmlkIFxyXG4gICAgbGV0IHNxdWFyZXNUb1N0eWxlID0gZ2V0U2hpcExlbmd0aEJ5TmFtZShzaGlwSUQpXHJcblxyXG4gICAgcmV0dXJuIHtzaGlwSUQsc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGV9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZURhdGFCb2FyZFZlcnRpY2FsbHkgPSAoc3F1YXJlSUQsc2hpcElEKSA9PntcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3Qgb3JpZ2luYWxJbmRleCAgPSBib2FyZEdyaWRBcnJheS5maW5kSW5kZXgoZWwgPT4gZWwuaWQgPT09IHNxdWFyZUlEKVxyXG4gICAgY29uc3Qgc2hpcEluUG9vbCAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwSUQpXHJcbiAgICBsZXQgaW5kZXhUb1N0eWxlICAgICA9IG9yaWdpbmFsSW5kZXhcclxuXHJcbiAgICByZXR1cm4ge2JvYXJkR3JpZEFycmF5LCBvcmlnaW5hbEluZGV4LCBzaGlwSW5Qb29sLCBpbmRleFRvU3R5bGV9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZURhdGFCb2FyZEhvcml6b250YWxseSA9IChzcXVhcmVJRCxzaGlwSUQsc3F1YXJlc1RvU3R5bGUpID0+e1xyXG4gICAgY29uc3Qgb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSA9IHNxdWFyZXNUb1N0eWxlXHJcbiAgICBjb25zdCBvcmlnaW5hbEluZGV4ICAgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7c3F1YXJlSUR9YClcclxuICAgIGNvbnN0IHNoaXBJblBvb2wgICAgICAgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzaGlwSUQpXHJcbiAgICBsZXQgZWxlbWVudFRvU3R5bGUgICAgICAgICAgID0gb3JpZ2luYWxJbmRleFxyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudFRvU3R5bGUsIG9yaWdpbmFsSW5kZXgsIHNoaXBJblBvb2wsIG9yaWdpbmFsU3F1YXJlc1RvU3R5bGV9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJTaGlwc0FuZFJldHVybkNvb3JkcyA9IChzcXVhcmVzVG9TdHlsZSxib2FyZEdyaWRBcnJheSkgPT57XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXN0b3JlU2hpcFJlbmRlciA9IChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlLG9yaWdpbmFsSW5kZXgpID0+e1xyXG4gICAgaWYoaXNIb3Jpem9udGFsT3ZlcmxhcHBpbmcoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxJbmRleCkpe1xyXG4gICAgICAgIHJlc3RvcmVSZW5kZXJIb3Jpem9udGFsT3ZlcmxhcChzcXVhcmVzVG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmKGlzUGxhY2VkQWJvdmVPdGhlclNoaXAoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkpe1xyXG4gICAgICAgIHNoaXBJblBvb2wuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgaWYoaXNIb3Jpem9udGFsT3ZlcmZsb3dpbmcoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUpKXtcclxuICAgICAgICByZXN0b3JlUmVuZGVySG9yaXpvbnRhbE92ZXJmbG93KHNxdWFyZXNUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXN0b3JlUmVuZGVyVmVydGljYWxPdmVyZmxvdyA9IChpbmRleFRvU3R5bGUsb3JpZ2luYWxJbmRleCxib2FyZEdyaWRBcnJheSkgPT57XHJcbiAgICB3aGlsZShpbmRleFRvU3R5bGUgPj0gb3JpZ2luYWxJbmRleCl7XHJcbiAgICAgICAgYm9hcmRHcmlkQXJyYXlbaW5kZXhUb1N0eWxlXS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJylcclxuICAgICAgICBpbmRleFRvU3R5bGUgPSBtb3ZlVG9QcmV2aW91c1JvdyhpbmRleFRvU3R5bGUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXN0b3JlUmVuZGVyVmVydGljYWxPdmVybGFwID0gKGN1cnJlbnRTcXVhcmUsb3JpZ2luYWxJbmRleCxjb29yZHMpID0+e1xyXG4gICAgY29vcmRzID0gZW1wdHlDb29yZHNBcnJheShjb29yZHMpXHJcbiAgICBpbmRleFRvU3R5bGUgPSBtb3ZlVG9QcmV2aW91c1JvdyhpbmRleFRvU3R5bGUpXHJcbiAgICB3aGlsZShpbmRleFRvU3R5bGUgPj0gb3JpZ2luYWxJbmRleCl7XHJcbiAgICAgICAgY3VycmVudFNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJylcclxuICAgICAgICBpbmRleFRvU3R5bGUgPSBtb3ZlVG9QcmV2aW91c1JvdyhpbmRleFRvU3R5bGUpXHJcbiAgICB9XHJcbn0gXHJcblxyXG5leHBvcnQgY29uc3QgcmVzdG9yZVJlbmRlckhvcml6b250YWxPdmVyZmxvdyA9IChzcXVhcmVzVG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlKSA9PntcclxuICAgIHdoaWxlKHNxdWFyZXNUb1N0eWxlIDw9IG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpe1xyXG4gICAgICAgIGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgICAgIGVsZW1lbnRUb1N0eWxlID0gZWxlbWVudFRvU3R5bGUucHJldmlvdXNFbGVtZW50U2libGluZ1xyXG4gICAgICAgIHNxdWFyZXNUb1N0eWxlKytcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlc3RvcmVSZW5kZXJIb3Jpem9udGFsT3ZlcmxhcCA9IChzcXVhcmVzVG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlLGVsZW1lbnRUb1N0eWxlKSA9PntcclxuICAgIGNvbnN0IGlzQWxsU3F1YXJlc05vdFJlc3RvcmVkID0gXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdyb3cnKSBcclxuICAgICAgICAgICAgPyBpc1NxdWFyZXNIaWdoZXJcclxuICAgICAgICAgICAgOiBpc1NxdWFyZXNIaWdoZXJPckVxdWFsXHJcbiAgICAgICAgXHJcbiAgICBlbGVtZW50VG9TdHlsZSA9IGVsZW1lbnRUb1N0eWxlLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcclxuXHJcbiAgICB3aGlsZShpc0FsbFNxdWFyZXNOb3RSZXN0b3JlZChzcXVhcmVzVG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKSl7XHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXHJcbiAgICAgICAgc3F1YXJlc1RvU3R5bGUrK1xyXG4gICAgfVxyXG59XHJcbiBcclxuZXhwb3J0IGNvbnN0IGNoZWNrSWZSZW5kZXJPclJlc3RvcmUgPSAoY3VycmVudFNxdWFyZSxvcmlnaW5hbEluZGV4LGNvb3JkcykgPT57XHJcbiAgICBpZihpc1ZlcnRpY2FsT3ZlcmxhcHBpbmcoY3VycmVudFNxdWFyZSkgKXtcclxuICAgICAgICByZXN0b3JlUmVuZGVyVmVydGljYWxPdmVybGFwKGN1cnJlbnRTcXVhcmUsb3JpZ2luYWxJbmRleCxjb29yZHMpIFxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBjb29yZHMucHVzaChjdXJyZW50U3F1YXJlLmlkKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkcylcclxuICAgICAgICBjdXJyZW50U3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBpc05leHRTcXVhcmVWYWxpZCA9IChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSxvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKSA9PntcclxuICAgIHJldHVybiAoc3F1YXJlc1RvU3R5bGUgPiAwKSBcclxuICAgICAgICAmJiAoIWVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpKSBcclxuICAgICAgICAmJiAoIWVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5jb250YWlucygncm93JykgXHJcbiAgICAgICAgfHwgKHNxdWFyZXNUb1N0eWxlID09PSBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzVmVydGljYWxPdmVybGFwcGluZyA9IChjdXJyZW50U3F1YXJlKSA9PntcclxuICAgIHJldHVybiBjdXJyZW50U3F1YXJlLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc0hvcml6b250YWxPdmVyZmxvd2luZyA9IChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gKHNxdWFyZXNUb1N0eWxlID4gMCkgXHJcbiAgICAgICAgJiYgKGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5jb250YWlucygncm93JykpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc0hvcml6b250YWxPdmVybGFwcGluZyA9IChzcXVhcmVzVG9TdHlsZSxlbGVtZW50VG9TdHlsZSxvcmlnaW5hbEluZGV4KSA9PntcclxuICAgIHJldHVybiAoc3F1YXJlc1RvU3R5bGUgPiAwKSBcclxuICAgICAgICAmJiAoZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGlwJylcclxuICAgICAgICB8fCAob3JpZ2luYWxJbmRleC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpKSkgICAgICBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzUGxhY2VkQWJvdmVPdGhlclNoaXAgPSAoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gKHNxdWFyZXNUb1N0eWxlID4gMCkgXHJcbiAgICAgICAgJiYgKGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpKSBcclxuICAgICAgICAmJiAoc3F1YXJlc1RvU3R5bGUgPT09IG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1NxdWFyZXNIaWdoZXIgPSAoc3F1YXJlc1RvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gc3F1YXJlc1RvU3R5bGUgPCBvcmlnaW5hbFNxdWFyZXNUb1N0eWxlXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1NxdWFyZXNIaWdoZXJPckVxdWFsID0gKHNxdWFyZXNUb1N0eWxlLG9yaWdpbmFsU3F1YXJlc1RvU3R5bGUpID0+e1xyXG4gICAgcmV0dXJuIHNxdWFyZXNUb1N0eWxlIDw9IG9yaWdpbmFsU3F1YXJlc1RvU3R5bGVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vdmVUb05leHRSb3cgPSAoaW5kZXhUb1N0eWxlKSA9PntcclxuICAgIHJldHVybiAgaW5kZXhUb1N0eWxlICs9IDhcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1vdmVUb1ByZXZpb3VzUm93ID0gKGluZGV4VG9TdHlsZSkgPT57XHJcbiAgICByZXR1cm4gIGluZGV4VG9TdHlsZSAtPSA4XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbW92ZVRvTmV4dENvbHVtbiA9ICgpID0+e1xyXG5cclxufVxyXG5cclxuLy8gZXhwb3J0IGNvbnN0IGFkZENvb3Jkc1RvQXJyYXkgPSAoY29vcmRzLGluZGV4VG9BZGQpID0+e1xyXG4vLyAgICAgcmV0dXJuIFsuLi5jb29yZHMsaW5kZXhUb0FkZF1cclxuLy8gfVxyXG5cclxuZXhwb3J0IGNvbnN0IGVtcHR5Q29vcmRzQXJyYXkgPSAoY29vcmRzKSA9PntcclxuICAgIHJldHVybiBjb29yZHMubGVuZ3RoID0gMFxyXG59XHJcbiIsImltcG9ydCB7IHJldHJpZXZlRGF0YURyb3AsXHJcbiAgICByZXRyaWV2ZURhdGFCb2FyZFZlcnRpY2FsbHksXHJcbiAgICByZXRyaWV2ZURhdGFCb2FyZEhvcml6b250YWxseSxcclxuICAgIHJlc3RvcmVSZW5kZXJWZXJ0aWNhbE92ZXJmbG93LFxyXG4gICAgcmVzdG9yZVNoaXBSZW5kZXIsXHJcbiAgICBpc05leHRTcXVhcmVWYWxpZCxcclxuICAgIGNoZWNrSWZSZW5kZXJPclJlc3RvcmUsXHJcbiAgICBtb3ZlVG9OZXh0Um93LFxyXG4gICAgbW92ZVRvUHJldmlvdXNSb3csXHJcbiAgICBlbXB0eUNvb3Jkc0FycmF5LCBcclxufSBmcm9tICcuL2hhbmRsZVN0eWxpbmdFdmVudHNEYXRhJ1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUdXJuICh0dXJuRGF0YSxldmVudCl7XHJcbiAgICBjb25zdCB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfSA9IFxyXG4gICAgICAgIHJldHJpZXZlVHVybkRhdGEodHVybkRhdGEpXHJcblxyXG4gICAgcmVuZGVyQm9hcmRTcXVhcmVzKHBsYXllckRhdGEsIGV2ZW50LnRhcmdldClcclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudClcclxuXHJcbiAgICByZW5kZXJUdXJuSW5mbyh0dXJuRGF0YSx0dXJuRGF0YS5wbGF5ZXIxKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTWF0Y2hSZXN1bHQgPSAocGxheWVyRGF0YSkgPT57XHJcbiAgICBjb25zdCB3aW5uZXIgPSBwbGF5ZXJEYXRhLnBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIFxyXG4gICAgICAgID8gJ0NvbXB1dGVyJ1xyXG4gICAgICAgIDogcGxheWVyRGF0YS5wbGF5ZXIxLmdldE5hbWUoKSAgIFxyXG5cclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3dpbm5lcn1gICsgJyBpcyB0aGUgd2lubmVyIScgXHJcbn1cclxuXHJcbmNvbnN0IHJldHJpZXZlVHVybkRhdGEgPSAodHVybkRhdGEpID0+e1xyXG4gICAgY29uc3QgcGxheWVyRGF0YSAgICAgID0gdHVybkRhdGEuaXNQbGF5ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckRhdGEgICAgPSB0dXJuRGF0YS5pc0NvbXB1dGVyQXR0YWNrTWlzc1xyXG4gICAgY29uc3QgY29tcHV0ZXJDb29yZHMgID0gdHVybkRhdGEuY29tcHV0ZXJDb29yZHNcclxuICAgIGNvbnN0IGF0dGFja2VkRWxlbWVudCA9IGZpbmRIaXRFbGVtZW50KGNvbXB1dGVyQ29vcmRzKVxyXG5cclxuICAgIHJldHVybiB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRHJvcEV2ZW50IChldmVudCxnYW1lKSB7XHJcbiAgICBjb25zdCB7c2hpcElELCBzcXVhcmVJRCAsc3F1YXJlc1RvU3R5bGV9ID0gcmV0cmlldmVEYXRhRHJvcChldmVudClcclxuICAgIC8vIFNoaXAgZGlyZWN0aW9uIHdpbGwgY2hhbmdlIGJhc2VkIG9uIHNvbWUgRE9NIGNsYXNzP1xyXG4gICAgLy8gKHNoaXBEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgPyByZW5kZXJTcXVhcmVzVmVydGljYWxseSgpIDogcmVuZGVyU3F1YXJlc0hvcml6b250YWxseSgpKSAgIFxyXG4gICAgY29uc3Qgc2hpcENvb3JkcyA9IHJlbmRlclNoaXBWZXJ0aWNhbGx5KHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlLHNoaXBJRClcclxuICBcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG4gICAgZ2FtZS5zZXRDb29yZHNBcnJheShzaGlwQ29vcmRzKVxyXG4gICAgZ2FtZS5jaGVja0ZvckdhbWVQcmVwYXJlZChnYW1lKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwVmVydGljYWxseSA9IChzcXVhcmVJRCxzcXVhcmVzVG9TdHlsZSxzaGlwSUQpID0+e1xyXG4gICAgbGV0IGNvb3JkcyA9IFtdXHJcbiAgICBsZXQgeyBib2FyZEdyaWRBcnJheSwgb3JpZ2luYWxJbmRleCwgc2hpcEluUG9vbCwgaW5kZXhUb1N0eWxlIH0gPVxyXG4gICAgICByZXRyaWV2ZURhdGFCb2FyZEhvcml6b250YWxseShzcXVhcmVJRCxzaGlwSUQpXHJcbiAgICBcclxuICAgIHRyeXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNxdWFyZXNUb1N0eWxlOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTcXVhcmUgPSBib2FyZEdyaWRBcnJheVtpbmRleFRvU3R5bGVdXHJcbiAgICAgICAgICAgIGxldCBpc1NxdWFyZUludmFsaWQgPSAgY2hlY2tJZlJlbmRlck9yUmVzdG9yZShjdXJyZW50U3F1YXJlLG9yaWdpbmFsSW5kZXgsY29vcmRzLGluZGV4VG9TdHlsZSlcclxuICAgICAgICAgICAgaWYoaXNTcXVhcmVJbnZhbGlkKSByZXR1cm5cclxuICAgICAgICAgICAgaW5kZXhUb1N0eWxlID0gbW92ZVRvTmV4dFJvdyhpbmRleFRvU3R5bGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoaXBJblBvb2wuY2xhc3NMaXN0LmFkZCgnaGlkZScpXHJcbiAgICAgICAgc2hpcEluUG9vbC5yZW1vdmVBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgICAgIFxyXG4gICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAvLyBXaWxsIHRyaWdnZXIgaWYgc2hpcCBwbGFjZW1lbnQgXHJcbiAgICAgICAgLy8gb3ZlcmZsb3dzIGZyb20gdGhlIGJvdHRvbVxyXG4gICAgICAgIGNvb3JkcyA9IGVtcHR5Q29vcmRzQXJyYXkoY29vcmRzKVxyXG4gICAgICAgIGluZGV4VG9TdHlsZSA9IG1vdmVUb1ByZXZpb3VzUm93KGluZGV4VG9TdHlsZSlcclxuICAgICAgICByZXN0b3JlUmVuZGVyVmVydGljYWxPdmVyZmxvdyhpbmRleFRvU3R5bGUsb3JpZ2luYWxJbmRleCxib2FyZEdyaWRBcnJheSlcclxuICAgIH0gXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBIb3Jpem9udGFsbHkgPSAoc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKSA9PntcclxuICAgIGxldCBjb29yZHMgPSBbXVxyXG4gICAgbGV0IHtlbGVtZW50VG9TdHlsZSwgb3JpZ2luYWxJbmRleCwgc2hpcEluUG9vbCwgb3JpZ2luYWxTcXVhcmVzVG9TdHlsZX09XHJcbiAgICByZXRyaWV2ZURhdGFCb2FyZEhvcml6b250YWxseShzcXVhcmVJRCxzaGlwSUQsc3F1YXJlc1RvU3R5bGUpXHJcblxyXG4gICAgd2hpbGUoaXNOZXh0U3F1YXJlVmFsaWQoc3F1YXJlc1RvU3R5bGUsZWxlbWVudFRvU3R5bGUsb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSkpe1xyXG4gICAgICAgIGVsZW1lbnRUb1N0eWxlLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIGVsZW1lbnRUb1N0eWxlID0gZWxlbWVudFRvU3R5bGUubmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICAgICAgY29vcmRzLnB1c2goZWxlbWVudFRvU3R5bGUuaWQpXHJcbiAgICAgICAgc3F1YXJlc1RvU3R5bGUtLSBcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYoc3F1YXJlc1RvU3R5bGUgIT0gMCl7XHJcbiAgICAgICAgcmVzdG9yZVNoaXBSZW5kZXIoXHJcbiAgICAgICAgICAgIHNxdWFyZXNUb1N0eWxlLFxyXG4gICAgICAgICAgICBlbGVtZW50VG9TdHlsZSxcclxuICAgICAgICAgICAgb3JpZ2luYWxTcXVhcmVzVG9TdHlsZSxcclxuICAgICAgICAgICAgb3JpZ2luYWxJbmRleClcclxuICAgICAgICBjb29yZHMgPSBlbXB0eUNvb3Jkc0FycmF5KGNvb3JkcylcclxuICAgICAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIHNoaXBJblBvb2wuY2xhc3NMaXN0LmFkZCgnaGlkZScpXHJcbiAgICBzaGlwSW5Qb29sLnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJylcclxuICAgIHJldHVybiBjb29yZHNcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmFnU3RhcnQgKGV2ZW50KSB7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsZXZlbnQudGFyZ2V0LmlkKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0VudGVyIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmFnT3ZlciAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhZ0xlYXZlIChldmVudCkge1xyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWctb3ZlcicpXHJcbn1cclxuXHJcbmNvbnN0IGZpbmRIaXRFbGVtZW50ID0gKGNvb3JkcykgPT57XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllcjEgPiAjJHtjb29yZHN9YClcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRTcXVhcmVzID0gKHR1cm5EYXRhLCBlbGVtZW50KSA9PntcclxuICAgIGlmKGlzSGl0RWxlbWVudChlbGVtZW50KSkgcmV0dXJuICBcclxuICAgICh0dXJuRGF0YSkgPyByZW5kZXJTcXVhcmVPbk1pc3MoZWxlbWVudCkgOiByZW5kZXJTcXVhcmVPbkhpdChlbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCBpc0hpdEVsZW1lbnQgPSAoZWxlbWVudCkgPT57XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTcXVhcmVPbkhpdCA9IChlbGVtZW50KSA9PntcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXHJcbn1cclxuICBcclxuY29uc3QgcmVuZGVyU3F1YXJlT25NaXNzICA9IChlbGVtZW50KSA9PntcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWlzcycpXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclR1cm5JbmZvID0gKHR1cm5EYXRhLHBsYXllcjEpID0+e1xyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5nZXROYW1lKCl9IGF0dGFjayBpcyBhIGAgXHJcbiAgICArICh0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3MpID8gJ21pc3MhJyA6ICdoaXQhJ1xyXG4gIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJXYXJuaW5nc0luZm8gPSAoKSA9PntcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcE9uU2luayA9ICgpID0+e1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclN0YXRpY0VsZW1lbnRzKGdhbWVib2FyZCwgcGxheWVyMSwgcGxheWVyMil7XHJcbiAgICByZW5kZXJCb2FyZE9uUmVzZXQoKVxyXG4gICAgcmVuZGVyU2hpcHMoZ2FtZWJvYXJkKVxyXG4gICAgcmVuZGVyUGxheWVyTmFtZXMocGxheWVyMSwgcGxheWVyMilcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcHMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBpbmRleCA9IDBcclxuICAgIGNvbnN0IGJvYXJkR3JpZCA9IGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgaWYoYm9hcmRHcmlkW2tleV0pe1xyXG4gICAgICAgICAgICBib2FyZEdyaWRBcnJheVtpbmRleF0uY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4KytcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNvbnN0IHJlbmRlclBsYXllck5hbWVzID0gKHBsYXllcjEsIHBsYXllcjIpID0+e1xyXG4gICAgY29uc3QgcGxheWVyMU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMS1uYW1lJylcclxuICAgIGNvbnN0IHBsYXllcjJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjItbmFtZScpXHJcblxyXG4gICAgcGxheWVyMU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXIxLmdldE5hbWUoKSArICcgXFwncyBmbGVldCdcclxuICAgIHBsYXllcjJOYW1lLnRleHRDb250ZW50ID0gcGxheWVyMi5nZXROYW1lKCkgKyAnIFxcJ3MgZmxlZXQnXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkT25SZXNldCA9ICgpID0+e1xyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkxID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuXHJcbiAgICBib2FyZEdyaWRBcnJheTEuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJylcclxuICAgIH0pXHJcbiAgICBib2FyZEdyaWRBcnJheTIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKVxyXG4gICAgfSkgXHJcblxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSAgJydcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUsY2hlY2tGb3JHYW1lUHJlcGFyZWR9IGZyb20gJy4vbG9naWMvZ2FtZSdcclxuaW1wb3J0IHthZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2t9IGZyb20gJy4vbG9naWMvaGFuZGxlRXZlbnRMaXN0ZW5lcnMnXHJcblxyXG5jb25zdCBwcmVwYXJlR2FtZSA9IChnYW1lKSA9PntcclxuICAgIGdhbWUuYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHMoZ2FtZSlcclxufVxyXG5cclxuY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG5wcmVwYXJlR2FtZShnYW1lKVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9