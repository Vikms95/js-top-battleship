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
    let shipDirection = 'Vertical'
    let coordsArray = []

    const el = document.querySelector('.gameboard-grid.player2')
    el.classList.remove('unclickable')

    const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_3__.Player)('Victor')
    const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_3__.Player)('Computer')
    let playerInTurn = player1
    let gameboard1 
    let gameboard2 
    

    ;(0,_view_renderStaticElements__WEBPACK_IMPORTED_MODULE_0__.renderStaticElements)(player1, player2)

    const gameTurn = (coords) =>{
        let enemyGameboard = playerInTurn === player1 ? player2.getGameboard() : player1.getGameboard() 
        const playerCoords = getPlayerInTurn().sendAttackCoordsToGame(coords)
        if(playerCoords === null) return null
  
        const isPlayerAttackMiss   = enemyGameboard.receiveAttackFromPlayer(playerCoords) 
        playerInTurn               = switchPlayers()
        enemyGameboard = playerInTurn === player1 ? player2.getGameboard() : player1.getGameboard() 
        
        const computerCoords       = getPlayerInTurn().sendRandomAttackCoordsToGame(enemyGameboard)
        const isComputerAttackMiss = enemyGameboard.receiveAttackFromPlayer(computerCoords)
        playerInTurn               = switchPlayers()

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

  
    const setCoordsArray = (ship) =>{
        coordsArray.push(ship)
    }

    const getCoordsArray = () =>{
        return coordsArray
    }

    const getDirection = () =>{
        return shipDirection 
    }

    const getPlayer1 = () =>{
        return player1
    }

    const getPlayer2 = () =>{
        return player2
    }

    const getPlayerInTurn = () =>{
        return playerInTurn
    }

    const getGameboard2 = () =>{
        return gameboard2
    }

    const setDirection = (direction,element) =>{
        shipDirection = direction
        element.textContent = direction
    }

    const checkForGamePrepared = (game) =>{
        if (game.getCoordsArray().length >= 9){
            game.getPlayer1().createGameBoard(
                game.getCoordsArray()
            )  

            console.log(game.getCoordsArray())
            game.getPlayer2().createGameBoard([
                ['A1'],
                ['B1','B2'],
                ['C1','C2','C3'],
                ['D1','D2','D3','D4'],
                ['E1','E2','E3','E4','E5'],
                ['F1','F2','F3','F4','F5'],
                ['G1','G2','G3','G4','G5'],
                ['H1','H2','H3','H4','H5'],
                ['A8','B8','C8','D8','E8']
            ]
            )
            game.gameboard1     = game.getPlayer1().getGameboard()
            console.log(game.gameboard1)
            game.gameboard2     = game.getPlayer2().getGameboard()
            console.log(game.gameboard2)
            game.playerInTurn   = game.getPlayer1()
            console.log(game.playerInTurn)
            ;(0,_handleEventListeners__WEBPACK_IMPORTED_MODULE_2__.addEventListenersBoardClick)(game)
        }
    }

    return{gameTurn,getCoordsArray,setCoordsArray,getDirection,setDirection,getPlayer1,getPlayer2,getPlayerInTurn,checkForGamePrepared,gameboard1,gameboard2,playerInTurn}
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
            createShip(coordinates[index])
            index++
        }
    }

    // Incoming-query (assert result) X
    const createShip = (coordinates) =>{
        if(isCoordsAvailable(coordinates)){
            const ship  = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(...coordinates) 
            console.log(ship.getShipCoord())
            _boardShips = addShipToShipsArray(ship)
            console.log(_boardShips)
            addShipToBoardGridObject(ship)
            console.log(_boardGrid)
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
/* harmony export */   "addEventListenerToggleDirection": () => (/* binding */ addEventListenerToggleDirection),
/* harmony export */   "addEventListenersBoardClick": () => (/* binding */ addEventListenersBoardClick),
/* harmony export */   "addEventListenersBoardDrag": () => (/* binding */ addEventListenersBoardDrag),
/* harmony export */   "addEventListenersDragShips": () => (/* binding */ addEventListenersDragShips),
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

const addEventListenersDragShips = (game) =>{
    addEventListenerDraggable()
    addEventListenersBoardDrag(game)
}


function addEventListenersBoardDrag (game){
    const gridSquaresPlayer = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    gridSquaresPlayer.forEach(square =>{
        square.addEventListener('dragenter',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderDragEnter)
        square.addEventListener('dragover',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderDragOver)
        square.addEventListener('dragleave',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderDragLeave)
        square.addEventListener('drop',(event) =>{
            ;(0,_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.handleDropEvent)(event,game)
        })
    })
}

function addEventListenerDraggable(){
    const ships = Array.from(document.querySelectorAll('.pool-ship.player1'))
    ships.forEach(ship=>
        ship.addEventListener('dragstart',_view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__.renderDragStart))
}

function removeEventListeners (){
    const gridSquaresComputer = Array.from(document.querySelectorAll('.player2 > .grid-square'))
    gridSquaresComputer.forEach(square =>{
        square.removeEventListener('click', processTurnData)
    })
}

function addEventListenerToggleDirection (game){
    const toggleButton = document.querySelector('.toggle')
    toggleButton.addEventListener('click', ()=>{
        (game.getDirection() === 'Vertical') 
            ? game.setDirection('Horizontal',toggleButton) 
            : game.setDirection('Vertical',toggleButton)
    })
}




/***/ }),

/***/ "./src/logic/handleStylingEventsData.js":
/*!**********************************************!*\
  !*** ./src/logic/handleStylingEventsData.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findHitElement": () => (/* binding */ findHitElement),
/* harmony export */   "isHorizPlacementValid": () => (/* binding */ isHorizPlacementValid),
/* harmony export */   "isOverflowBottom": () => (/* binding */ isOverflowBottom),
/* harmony export */   "isOverflowBottomSide": () => (/* binding */ isOverflowBottomSide),
/* harmony export */   "isOverflowSide": () => (/* binding */ isOverflowSide),
/* harmony export */   "isOverlap": () => (/* binding */ isOverlap),
/* harmony export */   "isVertPlacementValid": () => (/* binding */ isVertPlacementValid),
/* harmony export */   "retrieveDataBoardHoriz": () => (/* binding */ retrieveDataBoardHoriz),
/* harmony export */   "retrieveDataBoardVert": () => (/* binding */ retrieveDataBoardVert),
/* harmony export */   "retrieveDataDrop": () => (/* binding */ retrieveDataDrop),
/* harmony export */   "retrieveTurnData": () => (/* binding */ retrieveTurnData)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/logic/gameboard.js");


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
    let squaresToStyle = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.getShipLengthByName)(shipID)

    return {shipID,squareID,squaresToStyle}
}

const retrieveDataBoardVert = (squareID,shipID) =>{
    const boardGridArray = Array.from(document.querySelectorAll('.player1 > .grid-square'))
    const shipInPool     = document.getElementById(shipID)
    let indexToStyle     = boardGridArray.findIndex(el => el.id === squareID)

    return {boardGridArray,shipInPool, indexToStyle}
}

const retrieveDataBoardHoriz = (squareID,shipID) =>{
    const elementToStyle         = document.getElementById(`${squareID}`)
    const shipInPool             = document.getElementById(shipID)

    return {elementToStyle, shipInPool}
}

const isVertPlacementValid = (indexToStyle,squaresToStyle, boardGridArray) =>{
    for (let index = 0; index < squaresToStyle; index++) {
        let element = boardGridArray[indexToStyle]
        if( isOverflowBottom(element) || isOverlap(element)){
            return false
        }
        indexToStyle += 8
    }
    return true
}

const isHorizPlacementValid = (element,squaresToStyle) =>{
    for (let index = 0; index < squaresToStyle; index++) {
        if(isOverflowBottomSide(element) || isOverlap(element) || isOverflowSide(element,index) ){
            return false
        }
        element = element.nextElementSibling
    }
    return true
} 

const isOverlap = (element) =>{
    return element.classList.contains('ship')
}

const isOverflowBottom = (element) =>{
    return element === undefined
}

const isOverflowBottomSide = (element) => {
    return ((element === null) )
}

const isOverflowSide = (element,index) => {
    return (element.classList.contains('row') && index !== 0)
}


const findHitElement = (coords) =>{
    return document.querySelector(`.player1 > #${coords}`)
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

    const createGameBoard = (coordinates) =>{
        _gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)()
        _gameboard.populateGameboard(coordinates)
    }
    
    const sendAttackCoordsToGame = (coords) =>{
        if(getAttackedSquares().includes(coords)) return null
        setAttackedSquares(coords)
        return coords
    
    }

    const sendRandomAttackCoordsToGame = (gameboard) =>{
        console.log(gameboard)
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
/* harmony export */   "handleDropEvent": () => (/* binding */ handleDropEvent),
/* harmony export */   "renderDragEnter": () => (/* binding */ renderDragEnter),
/* harmony export */   "renderDragLeave": () => (/* binding */ renderDragLeave),
/* harmony export */   "renderDragOver": () => (/* binding */ renderDragOver),
/* harmony export */   "renderDragStart": () => (/* binding */ renderDragStart),
/* harmony export */   "renderMatchResult": () => (/* binding */ renderMatchResult),
/* harmony export */   "renderTurn": () => (/* binding */ renderTurn)
/* harmony export */ });
/* harmony import */ var _logic_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logic/handleStylingEventsData */ "./src/logic/handleStylingEventsData.js");



const renderTurn = (turnData,event) =>{
    const { playerData,computerData, attackedElement } = 
        (0,_logic_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveTurnData)(turnData)

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

function renderDragStart (event) {
    event.dataTransfer.setData('text/plain',event.target.id)
}
    
function renderDragEnter (event) {
    event.preventDefault()
    event.target.classList.add('drag-over')
}
    
function renderDragOver (event) {
    event.preventDefault()
    event.target.classList.add('drag-over')
}

function renderDragLeave (event) {
    event.target.classList.remove('drag-over')
}

const handleDropEvent = (event,game) =>{
    const {shipID, squareID ,squaresToStyle} = (0,_logic_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataDrop)(event)
    const renderDirection = (game.getDirection() === 'Vertical')
        ? renderShipVert 
        : renderShipHoriz

    const shipCoords = renderDirection(squareID,squaresToStyle,shipID)
    removeBoardMark(event)
    if(!shipCoords) return

    game.setCoordsArray(shipCoords)
    game.checkForGamePrepared(game,game.getPlayer1(),game.getPlayer2())
}


const renderShipVert = (squareID,squaresToStyle,shipID) =>{
    let { boardGridArray,shipInPool, indexToStyle } =
        (0,_logic_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataBoardVert)(squareID,shipID)

    if(!(0,_logic_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.isVertPlacementValid)(indexToStyle,squaresToStyle, boardGridArray)) return
    
    let coords = []
    renderSquaresVert(indexToStyle,squaresToStyle,boardGridArray,coords)
    removePoolShip(shipInPool)
    return coords
}
  
const renderSquaresVert = (indexToStyle,squaresToStyle,boardGridArray,coords) =>{
    while(squaresToStyle > 0){
        let elementToStyle = boardGridArray[indexToStyle]
        elementToStyle.classList.add('ship')
        coords.push(elementToStyle.id)
        indexToStyle += 8
        squaresToStyle--
    }  
}
  
const renderShipHoriz = (squareID,squaresToStyle,shipID) =>{
    let {elementToStyle, shipInPool} = (0,_logic_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.retrieveDataBoardHoriz)(squareID,shipID)
    
    if(!(0,_logic_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__.isHorizPlacementValid)(elementToStyle,squaresToStyle)) return
    
    let coords = []
    renderSquaresHoriz(elementToStyle,squaresToStyle,coords)
    removePoolShip(shipInPool)
    
    return coords     
}
    
const renderSquaresHoriz = (elementToStyle,squaresToStyle,coords) =>{
    while(squaresToStyle > 0){
        elementToStyle.classList.add('ship')
        elementToStyle = elementToStyle.nextElementSibling
        coords.push(elementToStyle.id)
        squaresToStyle-- 
    }
}
    
const removePoolShip = (shipInPool) =>{
    shipInPool.classList.add('hide')
    shipInPool.removeAttribute('draggable')
}

const removeBoardMark = (event) =>{
    event.target.classList.remove('drag-over')
    event.target.classList.remove('hide')
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
function renderStaticElements(player1, player2){
    renderBoardOnReset()
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
    (0,_logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__.addEventListenersDragShips)(game)
    ;(0,_logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__.addEventListenerToggleDirection)(game)
}

const game = (0,_logic_game__WEBPACK_IMPORTED_MODULE_0__.Game)()
prepareGame(game)


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOdUQ7QUFDNEU7QUFDbkk7QUFDQTtBQUNBLElBQUksdUZBQTBCO0FBQzlCLElBQUksNkZBQStCO0FBQ25DO0FBQ0E7QUFDQSxhQUFhLGlEQUFJO0FBQ2pCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9oYW5kbGVFdmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9oYW5kbGVTdHlsaW5nRXZlbnRzRGF0YS5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvc2hpcC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlclN0YXRpY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyU3RhdGljRWxlbWVudHMgfSBmcm9tICcuLi92aWV3L3JlbmRlclN0YXRpY0VsZW1lbnRzJ1xyXG5pbXBvcnQgeyByZW5kZXJNYXRjaFJlc3VsdCB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzJ1xyXG5pbXBvcnQgeyByZW1vdmVFdmVudExpc3RlbmVycywgYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSwgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcsIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmRDbGljayB9IGZyb20gJy4vaGFuZGxlRXZlbnRMaXN0ZW5lcnMnXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xyXG4vLyBpbXBvcnQgeyBleGVjdXRlR2FtZSB9IGZyb20gJy9zcmMvaW5kZXgnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2FtZSAoKXtcclxuICAgIGxldCBzaGlwRGlyZWN0aW9uID0gJ1ZlcnRpY2FsJ1xyXG4gICAgbGV0IGNvb3Jkc0FycmF5ID0gW11cclxuXHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQtZ3JpZC5wbGF5ZXIyJylcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VuY2xpY2thYmxlJylcclxuXHJcbiAgICBjb25zdCBwbGF5ZXIxID0gUGxheWVyKCdWaWN0b3InKVxyXG4gICAgY29uc3QgcGxheWVyMiA9IFBsYXllcignQ29tcHV0ZXInKVxyXG4gICAgbGV0IHBsYXllckluVHVybiA9IHBsYXllcjFcclxuICAgIGxldCBnYW1lYm9hcmQxIFxyXG4gICAgbGV0IGdhbWVib2FyZDIgXHJcbiAgICBcclxuXHJcbiAgICByZW5kZXJTdGF0aWNFbGVtZW50cyhwbGF5ZXIxLCBwbGF5ZXIyKVxyXG5cclxuICAgIGNvbnN0IGdhbWVUdXJuID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgbGV0IGVuZW15R2FtZWJvYXJkID0gcGxheWVySW5UdXJuID09PSBwbGF5ZXIxID8gcGxheWVyMi5nZXRHYW1lYm9hcmQoKSA6IHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkgXHJcbiAgICAgICAgY29uc3QgcGxheWVyQ29vcmRzID0gZ2V0UGxheWVySW5UdXJuKCkuc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZShjb29yZHMpXHJcbiAgICAgICAgaWYocGxheWVyQ29vcmRzID09PSBudWxsKSByZXR1cm4gbnVsbFxyXG4gIFxyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyQXR0YWNrTWlzcyAgID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIocGxheWVyQ29vcmRzKSBcclxuICAgICAgICBwbGF5ZXJJblR1cm4gICAgICAgICAgICAgICA9IHN3aXRjaFBsYXllcnMoKVxyXG4gICAgICAgIGVuZW15R2FtZWJvYXJkID0gcGxheWVySW5UdXJuID09PSBwbGF5ZXIxID8gcGxheWVyMi5nZXRHYW1lYm9hcmQoKSA6IHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkgXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY29tcHV0ZXJDb29yZHMgICAgICAgPSBnZXRQbGF5ZXJJblR1cm4oKS5zZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lKGVuZW15R2FtZWJvYXJkKVxyXG4gICAgICAgIGNvbnN0IGlzQ29tcHV0ZXJBdHRhY2tNaXNzID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIoY29tcHV0ZXJDb29yZHMpXHJcbiAgICAgICAgcGxheWVySW5UdXJuICAgICAgICAgICAgICAgPSBzd2l0Y2hQbGF5ZXJzKClcclxuXHJcbiAgICAgICAgaWYoaXNBbnlQbGF5ZXJEZWZlYXRlZCgpKXtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndW5jbGlja2FibGUnKVxyXG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpXHJcbiAgICAgICAgICAgIHJlbmRlck1hdGNoUmVzdWx0KHtwbGF5ZXIxLHBsYXllcjJ9KVxyXG4gICAgICAgICAgICBwcmVwYXJlTmV4dE1hdGNoKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBsYXllcjEsXHJcbiAgICAgICAgICAgIGlzUGxheWVyQXR0YWNrTWlzcyxcclxuICAgICAgICAgICAgaXNDb21wdXRlckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGNvbXB1dGVyQ29vcmRzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaFBsYXllcnMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKHBsYXllckluVHVybiA9PT0gcGxheWVyMikgPyBwbGF5ZXIxIDogcGxheWVyMlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaEdhbWVib2FyZHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKHBsYXllckluVHVybiA9PT0gcGxheWVyMikgPyBnYW1lYm9hcmQxIDogZ2FtZWJvYXJkMlxyXG4gICAgfSAgIFxyXG5cclxuICAgIGNvbnN0IGlzQW55UGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVyMS5pc1BsYXllckRlZmVhdGVkKCkgfHwgcGxheWVyMi5pc1BsYXllckRlZmVhdGVkKClcclxuICAgIH0gXHJcblxyXG4gICAgLy8gY29uc3QgcHJlcGFyZU5leHRNYXRjaCA9ICgpID0+e1xyXG4gICAgLy8gICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgZnJvbSBib2FyZFxyXG4gICAgLy8gICAgIHNldFRpbWVvdXQoLDIwMDApXHJcbiAgICAvLyB9XHJcblxyXG4gIFxyXG4gICAgY29uc3Qgc2V0Q29vcmRzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29vcmRzQXJyYXkucHVzaChzaGlwKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldENvb3Jkc0FycmF5ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc0FycmF5XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0RGlyZWN0aW9uID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNoaXBEaXJlY3Rpb24gXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0UGxheWVyMSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXIxXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0UGxheWVyMiA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXIyXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0UGxheWVySW5UdXJuID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluVHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEdhbWVib2FyZDIgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gZ2FtZWJvYXJkMlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNldERpcmVjdGlvbiA9IChkaXJlY3Rpb24sZWxlbWVudCkgPT57XHJcbiAgICAgICAgc2hpcERpcmVjdGlvbiA9IGRpcmVjdGlvblxyXG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBkaXJlY3Rpb25cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGVja0ZvckdhbWVQcmVwYXJlZCA9IChnYW1lKSA9PntcclxuICAgICAgICBpZiAoZ2FtZS5nZXRDb29yZHNBcnJheSgpLmxlbmd0aCA+PSA5KXtcclxuICAgICAgICAgICAgZ2FtZS5nZXRQbGF5ZXIxKCkuY3JlYXRlR2FtZUJvYXJkKFxyXG4gICAgICAgICAgICAgICAgZ2FtZS5nZXRDb29yZHNBcnJheSgpXHJcbiAgICAgICAgICAgICkgIFxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZS5nZXRDb29yZHNBcnJheSgpKVxyXG4gICAgICAgICAgICBnYW1lLmdldFBsYXllcjIoKS5jcmVhdGVHYW1lQm9hcmQoW1xyXG4gICAgICAgICAgICAgICAgWydBMSddLFxyXG4gICAgICAgICAgICAgICAgWydCMScsJ0IyJ10sXHJcbiAgICAgICAgICAgICAgICBbJ0MxJywnQzInLCdDMyddLFxyXG4gICAgICAgICAgICAgICAgWydEMScsJ0QyJywnRDMnLCdENCddLFxyXG4gICAgICAgICAgICAgICAgWydFMScsJ0UyJywnRTMnLCdFNCcsJ0U1J10sXHJcbiAgICAgICAgICAgICAgICBbJ0YxJywnRjInLCdGMycsJ0Y0JywnRjUnXSxcclxuICAgICAgICAgICAgICAgIFsnRzEnLCdHMicsJ0czJywnRzQnLCdHNSddLFxyXG4gICAgICAgICAgICAgICAgWydIMScsJ0gyJywnSDMnLCdINCcsJ0g1J10sXHJcbiAgICAgICAgICAgICAgICBbJ0E4JywnQjgnLCdDOCcsJ0Q4JywnRTgnXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgZ2FtZS5nYW1lYm9hcmQxICAgICA9IGdhbWUuZ2V0UGxheWVyMSgpLmdldEdhbWVib2FyZCgpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWUuZ2FtZWJvYXJkMSlcclxuICAgICAgICAgICAgZ2FtZS5nYW1lYm9hcmQyICAgICA9IGdhbWUuZ2V0UGxheWVyMigpLmdldEdhbWVib2FyZCgpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWUuZ2FtZWJvYXJkMilcclxuICAgICAgICAgICAgZ2FtZS5wbGF5ZXJJblR1cm4gICA9IGdhbWUuZ2V0UGxheWVyMSgpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWUucGxheWVySW5UdXJuKVxyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2soZ2FtZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue2dhbWVUdXJuLGdldENvb3Jkc0FycmF5LHNldENvb3Jkc0FycmF5LGdldERpcmVjdGlvbixzZXREaXJlY3Rpb24sZ2V0UGxheWVyMSxnZXRQbGF5ZXIyLGdldFBsYXllckluVHVybixjaGVja0ZvckdhbWVQcmVwYXJlZCxnYW1lYm9hcmQxLGdhbWVib2FyZDIscGxheWVySW5UdXJufVxyXG59XHJcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lYm9hcmQoKXsgICAgXHJcbiAgIFxyXG4gICAgbGV0IF9ib2FyZEdyaWQgPSBcclxuICAgIHtcclxuICAgICAgICAnQTEnOiBmYWxzZSwgJ0EyJzogZmFsc2UsICdBMyc6IGZhbHNlLCAnQTQnOiBmYWxzZSwgJ0E1JzogZmFsc2UsICdBNic6IGZhbHNlLCAnQTcnOiBmYWxzZSwgJ0E4JzogZmFsc2UsIFxyXG4gICAgICAgICdCMSc6IGZhbHNlLCAnQjInOiBmYWxzZSwgJ0IzJzogZmFsc2UsICdCNCc6IGZhbHNlLCAnQjUnOiBmYWxzZSwgJ0I2JzogZmFsc2UsICdCNyc6IGZhbHNlLCAnQjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0MxJzogZmFsc2UsICdDMic6IGZhbHNlLCAnQzMnOiBmYWxzZSwgJ0M0JzogZmFsc2UsICdDNSc6IGZhbHNlLCAnQzYnOiBmYWxzZSwgJ0M3JzogZmFsc2UsICdDOCc6IGZhbHNlLCBcclxuICAgICAgICAnRDEnOiBmYWxzZSwgJ0QyJzogZmFsc2UsICdEMyc6IGZhbHNlLCAnRDQnOiBmYWxzZSwgJ0Q1JzogZmFsc2UsICdENic6IGZhbHNlLCAnRDcnOiBmYWxzZSwgJ0Q4JzogZmFsc2UsIFxyXG4gICAgICAgICdFMSc6IGZhbHNlLCAnRTInOiBmYWxzZSwgJ0UzJzogZmFsc2UsICdFNCc6IGZhbHNlLCAnRTUnOiBmYWxzZSwgJ0U2JzogZmFsc2UsICdFNyc6IGZhbHNlLCAnRTgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0YxJzogZmFsc2UsICdGMic6IGZhbHNlLCAnRjMnOiBmYWxzZSwgJ0Y0JzogZmFsc2UsICdGNSc6IGZhbHNlLCAnRjYnOiBmYWxzZSwgJ0Y3JzogZmFsc2UsICdGOCc6IGZhbHNlLCBcclxuICAgICAgICAnRzEnOiBmYWxzZSwgJ0cyJzogZmFsc2UsICdHMyc6IGZhbHNlLCAnRzQnOiBmYWxzZSwgJ0c1JzogZmFsc2UsICdHNic6IGZhbHNlLCAnRzcnOiBmYWxzZSwgJ0c4JzogZmFsc2UsIFxyXG4gICAgICAgICdIMSc6IGZhbHNlLCAnSDInOiBmYWxzZSwgJ0gzJzogZmFsc2UsICdINCc6IGZhbHNlLCAnSDUnOiBmYWxzZSwgJ0g2JzogZmFsc2UsICdINyc6IGZhbHNlLCAnSDgnOiBmYWxzZSBcclxuICAgIH1cclxuXHJcbiAgICBsZXQgX2JvYXJkU2hpcHMgPSBbXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRCb2FyZEdyaWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkR3JpZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEJvYXJkU2hpcHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHNcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgcG9wdWxhdGVHYW1lYm9hcmQgPSAoY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICB3aGlsZSggaW5kZXggPCBjb29yZGluYXRlcy5sZW5ndGggKXtcclxuICAgICAgICAgICAgY3JlYXRlU2hpcChjb29yZGluYXRlc1tpbmRleF0pXHJcbiAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSW5jb21pbmctcXVlcnkgKGFzc2VydCByZXN1bHQpIFhcclxuICAgIGNvbnN0IGNyZWF0ZVNoaXAgPSAoY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIGlmKGlzQ29vcmRzQXZhaWxhYmxlKGNvb3JkaW5hdGVzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgID0gU2hpcCguLi5jb29yZGluYXRlcykgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXAuZ2V0U2hpcENvb3JkKCkpXHJcbiAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gYWRkU2hpcFRvU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfYm9hcmRTaGlwcylcclxuICAgICAgICAgICAgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0KHNoaXApXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF9ib2FyZEdyaWQpXHJcbiAgICAgICAgICAgIHJldHVybiBzaGlwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBJbmNvbWluZy1xdWVyeSAoYXNzZXJ0IHJlc3VsdClcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyID0gKGNvb3Jkcyk9PntcclxuICAgICAgICBpZihpc0F0dGFja1ZhbGlkKGNvb3JkcykgJiYgaXNTaGlwSGl0KGNvb3Jkcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZmluZFNoaXBCeUNvb3Jkcyhjb29yZHMpXHJcbiAgICAgICAgICAgIGlmKHNoaXAuaXNTdW5rTmV4dEhpdCgpKXtcclxuICAgICAgICAgICAgICAgIF9ib2FyZFNoaXBzID0gcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5KHNoaXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNoaXBTcXVhcmUoY29vcmRzLHNoaXApXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNoaXBTcXVhcmUgPSAoY29vcmRzLHNoaXApID0+e1xyXG4gICAgICAgIHNoaXAucmVtb3ZlU3F1YXJlSGl0KGNvb3JkcylcclxuICAgICAgICByZXR1cm4gcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdChjb29yZHMpXHJcbiAgICB9XHJcbiBcclxuICAgIC8vIFF1ZXJ5ICYgQ29tbWFuZCBzZWxmIHhcclxuICAgIGNvbnN0IGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdCA9IChzaGlwKSA9PntcclxuICAgICAgICBzaGlwLmdldFNoaXBDb29yZCgpLmZvckVhY2goY29vcmQgPT57XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKF9ib2FyZEdyaWQpLmZvckVhY2goa2V5ID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZCkge19ib2FyZEdyaWRba2V5XSA9IHRydWV9IFxyXG4gICAgICAgICAgICB9KSAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZFNoaXBUb1NoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIFsuLi5fYm9hcmRTaGlwcyxzaGlwXVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QgPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7Li4uX2JvYXJkR3JpZH0sIHtbYCR7Y29vcmRzfWBdOiAnSGl0J30pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGZpbmRTaGlwSW5kZXhCeU5hbWUoc2hpcClcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmlsdGVyKGFycmF5U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmluZGV4T2YoYXJyYXlTaGlwKSAhPT0gc2hpcEluZGV4IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiBcclxuICAgIGNvbnN0IGZpbmRTaGlwQnlDb29yZHMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZChzaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gc2hpcC5nZXRTaGlwQ29vcmQoKS5pbmNsdWRlcyhjb29yZHMpICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmluZFNoaXBJbmRleEJ5TmFtZSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmluZEluZGV4KGN1cnJlbnRTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFNoaXAuZ2V0U2hpcE5hbWUoKSA9PT0gc2hpcC5nZXRTaGlwTmFtZSgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc1NoaXBIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3JkcyAmJiBfYm9hcmRHcmlkW2tleV0pIHsgcmV0dXJuIHRydWUgfSAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0FsbFNoaXBzU3VuayA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAoX2JvYXJkU2hpcHMubGVuZ3RoID09PSAwKSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzQ29vcmRzQXZhaWxhYmxlID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgbGV0IGluZGV4QXJyYXkgPSAwXHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHNbaW5kZXhBcnJheV0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBpc0F0dGFja1ZhbGlkID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID09PSAnSGl0Jz8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbiBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0Qm9hcmRHcmlkLFxyXG4gICAgICAgIGdldEJvYXJkU2hpcHMsXHJcbiAgICAgICAgY3JlYXRlU2hpcCxcclxuICAgICAgICBnZXRTaGlwTGVuZ3RoQnlOYW1lLFxyXG4gICAgICAgIHBvcHVsYXRlR2FtZWJvYXJkLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyLFxyXG4gICAgICAgIGlzQWxsU2hpcHNTdW5rLFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2hpcExlbmd0aEJ5TmFtZSA9IChzaGlwTmFtZSkgPT57XHJcbiAgICBjb25zdCBfU0hJUF9OQU1FUyA9IHtcclxuICAgICAgICAnc3B5LTEnOiAxLFxyXG4gICAgICAgICdzcHktMic6IDEsXHJcbiAgICAgICAgJ3NweS0zJzogMSxcclxuICAgICAgICAnZGVzdHJveWVyLTEnOiAyLFxyXG4gICAgICAgICdkZXN0cm95ZXItMic6IDIsXHJcbiAgICAgICAgJ2Rlc3Ryb3llci0zJzogMixcclxuICAgICAgICAnY3J1aXNlcic6IDMsXHJcbiAgICAgICAgJ2JhdHRsZXNoaXAnOiA0LFxyXG4gICAgICAgICdjYXJyaWVyJzogNVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9TSElQX05BTUVTW3NoaXBOYW1lXVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBcclxuICAgIFxyXG4gICAgcmVuZGVyVHVybixcclxuICAgIHJlbmRlckRyYWdFbnRlcixcclxuICAgIHJlbmRlckRyYWdTdGFydCxcclxuICAgIHJlbmRlckRyYWdPdmVyLFxyXG4gICAgcmVuZGVyRHJhZ0xlYXZlLFxyXG4gICAgaGFuZGxlRHJvcEV2ZW50XHJcblxyXG59IGZyb20gJy4uL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmRDbGljayAoZ2FtZSl7XHJcbiAgICBjb25zdCBncmlkU3F1YXJlc0NvbXB1dGVyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZ3JpZFNxdWFyZXNDb21wdXRlci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PntcclxuICAgICAgICAgICAgcHJvY2Vzc1R1cm5EYXRhKGdhbWUsZXZlbnQpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnN0IHByb2Nlc3NUdXJuRGF0YSA9IChnYW1lLGV2ZW50KSA9PntcclxuICAgIGNvbnN0IHR1cm5EYXRhID0gZ2FtZS5nYW1lVHVybihldmVudC50YXJnZXQuaWQpXHJcbiAgICBpZih0dXJuRGF0YSA9PT0gbnVsbCkgcmV0dXJuICAgICAgXHJcbiAgICByZW5kZXJUdXJuKHR1cm5EYXRhLGV2ZW50KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHMgPSAoZ2FtZSkgPT57XHJcbiAgICBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlKClcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnKGdhbWUpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNQbGF5ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc1BsYXllci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJyxyZW5kZXJEcmFnRW50ZXIpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJyxyZW5kZXJEcmFnT3ZlcilcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxyZW5kZXJEcmFnTGVhdmUpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLChldmVudCkgPT57XHJcbiAgICAgICAgICAgIGhhbmRsZURyb3BFdmVudChldmVudCxnYW1lKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSgpe1xyXG4gICAgY29uc3Qgc2hpcHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb29sLXNoaXAucGxheWVyMScpKVxyXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwPT5cclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcscmVuZGVyRHJhZ1N0YXJ0KSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzICgpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc1R1cm5EYXRhKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJUb2dnbGVEaXJlY3Rpb24gKGdhbWUpe1xyXG4gICAgY29uc3QgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXHJcbiAgICB0b2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgIChnYW1lLmdldERpcmVjdGlvbigpID09PSAnVmVydGljYWwnKSBcclxuICAgICAgICAgICAgPyBnYW1lLnNldERpcmVjdGlvbignSG9yaXpvbnRhbCcsdG9nZ2xlQnV0dG9uKSBcclxuICAgICAgICAgICAgOiBnYW1lLnNldERpcmVjdGlvbignVmVydGljYWwnLHRvZ2dsZUJ1dHRvbilcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBnZXRTaGlwTGVuZ3RoQnlOYW1lIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVUdXJuRGF0YSA9ICh0dXJuRGF0YSkgPT57XHJcbiAgICBjb25zdCBwbGF5ZXJEYXRhICAgICAgPSB0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyRGF0YSAgICA9IHR1cm5EYXRhLmlzQ29tcHV0ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgPSB0dXJuRGF0YS5jb21wdXRlckNvb3Jkc1xyXG4gICAgY29uc3QgYXR0YWNrZWRFbGVtZW50ID0gZmluZEhpdEVsZW1lbnQoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgcmV0dXJuIHsgcGxheWVyRGF0YSxjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudCB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZURhdGFEcm9wID0gKGV2ZW50KSA9PntcclxuICAgIGNvbnN0IHNoaXBJRCAgICAgICA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgIGNvbnN0IHNxdWFyZUlEICAgICA9IGV2ZW50LnRhcmdldC5pZCBcclxuICAgIGxldCBzcXVhcmVzVG9TdHlsZSA9IGdldFNoaXBMZW5ndGhCeU5hbWUoc2hpcElEKVxyXG5cclxuICAgIHJldHVybiB7c2hpcElELHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVEYXRhQm9hcmRWZXJ0ID0gKHNxdWFyZUlELHNoaXBJRCkgPT57XHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IHNoaXBJblBvb2wgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG4gICAgbGV0IGluZGV4VG9TdHlsZSAgICAgPSBib2FyZEdyaWRBcnJheS5maW5kSW5kZXgoZWwgPT4gZWwuaWQgPT09IHNxdWFyZUlEKVxyXG5cclxuICAgIHJldHVybiB7Ym9hcmRHcmlkQXJyYXksc2hpcEluUG9vbCwgaW5kZXhUb1N0eWxlfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVEYXRhQm9hcmRIb3JpeiA9IChzcXVhcmVJRCxzaGlwSUQpID0+e1xyXG4gICAgY29uc3QgZWxlbWVudFRvU3R5bGUgICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NxdWFyZUlEfWApXHJcbiAgICBjb25zdCBzaGlwSW5Qb29sICAgICAgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudFRvU3R5bGUsIHNoaXBJblBvb2x9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1ZlcnRQbGFjZW1lbnRWYWxpZCA9IChpbmRleFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsIGJvYXJkR3JpZEFycmF5KSA9PntcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzcXVhcmVzVG9TdHlsZTsgaW5kZXgrKykge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gYm9hcmRHcmlkQXJyYXlbaW5kZXhUb1N0eWxlXVxyXG4gICAgICAgIGlmKCBpc092ZXJmbG93Qm90dG9tKGVsZW1lbnQpIHx8IGlzT3ZlcmxhcChlbGVtZW50KSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleFRvU3R5bGUgKz0gOFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzSG9yaXpQbGFjZW1lbnRWYWxpZCA9IChlbGVtZW50LHNxdWFyZXNUb1N0eWxlKSA9PntcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzcXVhcmVzVG9TdHlsZTsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmKGlzT3ZlcmZsb3dCb3R0b21TaWRlKGVsZW1lbnQpIHx8IGlzT3ZlcmxhcChlbGVtZW50KSB8fCBpc092ZXJmbG93U2lkZShlbGVtZW50LGluZGV4KSApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59IFxyXG5cclxuZXhwb3J0IGNvbnN0IGlzT3ZlcmxhcCA9IChlbGVtZW50KSA9PntcclxuICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc092ZXJmbG93Qm90dG9tID0gKGVsZW1lbnQpID0+e1xyXG4gICAgcmV0dXJuIGVsZW1lbnQgPT09IHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNPdmVyZmxvd0JvdHRvbVNpZGUgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgcmV0dXJuICgoZWxlbWVudCA9PT0gbnVsbCkgKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNPdmVyZmxvd1NpZGUgPSAoZWxlbWVudCxpbmRleCkgPT4ge1xyXG4gICAgcmV0dXJuIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncm93JykgJiYgaW5kZXggIT09IDApXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZmluZEhpdEVsZW1lbnQgPSAoY29vcmRzKSA9PntcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyMSA+ICMke2Nvb3Jkc31gKVxyXG59IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUpe1xyXG4gICAgY29uc3QgX3BsYXllck5hbWUgPSBuYW1lXHJcblxyXG4gICAgbGV0IF9nYW1lYm9hcmRcclxuXHJcbiAgICBsZXQgX2F0dGFja2VkU3F1YXJlcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3BsYXllck5hbWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2dhbWVib2FyZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEF0dGFja2VkU3F1YXJlcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYXR0YWNrZWRTcXVhcmVzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2V0QXR0YWNrZWRTcXVhcmVzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgX2F0dGFja2VkU3F1YXJlcy5wdXNoKGNvb3JkcylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIF9nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIF9nYW1lYm9hcmQucG9wdWxhdGVHYW1lYm9hcmQoY29vcmRpbmF0ZXMpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNlbmRBdHRhY2tDb29yZHNUb0dhbWUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBpZihnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhjb29yZHMpKSByZXR1cm4gbnVsbFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGdhbWVib2FyZClcclxuICAgICAgICBjb25zdCBib2FyZEdyaWQgPSBPYmplY3Qua2V5cyhnYW1lYm9hcmQuZ2V0Qm9hcmRHcmlkKCkpXHJcbiAgICAgICAgY29uc3QgQk9BUkRfR1JJRF9MRU5HVEggPSBib2FyZEdyaWQubGVuZ3RoXHJcblxyXG4gICAgICAgIGxldCBpbmRleCA9IGdlbmVyYXRlUmFuZG9tTnVtYmVyKDAsQk9BUkRfR1JJRF9MRU5HVEgpXHJcbiAgICAgICAgd2hpbGUoZ2V0QXR0YWNrZWRTcXVhcmVzKCkuaW5jbHVkZXMoYm9hcmRHcmlkW2luZGV4XSkpe1xyXG4gICAgICAgICAgICBpbmRleCA9IGdlbmVyYXRlUmFuZG9tTnVtYmVyKDAsQk9BUkRfR1JJRF9MRU5HVEgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhib2FyZEdyaWRbaW5kZXhdKVxyXG4gICAgICAgIHJldHVybiBib2FyZEdyaWRbaW5kZXhdXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tTnVtYmVyID0gKG1heCxtaW4pID0+e1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc1BsYXllckRlZmVhdGVkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChfZ2FtZWJvYXJkLmdldEJvYXJkU2hpcHMoKS5sZW5ndGggPT09IDApID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGdldE5hbWUsXHJcbiAgICAgICAgZ2V0R2FtZWJvYXJkLFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyxcclxuICAgICAgICBjcmVhdGVHYW1lQm9hcmQsXHJcbiAgICAgICAgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBzZW5kQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIGlzUGxheWVyRGVmZWF0ZWRcclxuICAgIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBTaGlwKC4uLmNvb3JkaW5hdGVzKXtcclxuXHJcbiAgICBsZXQgX3NoaXBDb29yZCA9IGNvb3JkaW5hdGVzXHJcblxyXG4gICAgY29uc3QgX1NISVBfTkFNRVMgPSB7XHJcbiAgICAgICAgMSA6ICdTcHknLFxyXG4gICAgICAgIDIgOiAnRGVzdHJveWVyJyxcclxuICAgICAgICAzIDogJ0NydWlzZXInLFxyXG4gICAgICAgIDQgOiAnQmF0dGxlc2hpcCcsXHJcbiAgICAgICAgNSA6ICdDYXJyaWVyJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IF9zaGlwTmFtZSA9IF9TSElQX05BTUVTW19zaGlwQ29vcmQubGVuZ3RoXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRTaGlwTmFtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcE5hbWVcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBnZXRTaGlwQ29vcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBJbmNvbWluZyBxdWVyeSAoYXNzZXJ0IHJlc3VsdCA+IHRlc3RlZCB3aXRoIHJlbW92ZVNxdWFyZUhpdClcclxuICAgIGNvbnN0IGZpbmRIaXRJbmRleCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmRzKSAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gU2VsZiBjb21tYW5kIHhcclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGNvbnN0IGluZGV4Q29vcmQgPSBmaW5kSGl0SW5kZXgoY29vcmRzKVxyXG4gICAgICAgIF9zaGlwQ29vcmQgPSBfc2hpcENvb3JkLmZpbHRlcihjb29yZCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZCkgIT09IGluZGV4Q29vcmQgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBQdXJlIC8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgaXNTdW5rTmV4dEhpdCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmxlbmd0aCA9PT0gMSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFNoaXBOYW1lLFxyXG4gICAgICAgIGdldFNoaXBDb29yZCxcclxuICAgICAgICBpc1N1bmtOZXh0SGl0LFxyXG4gICAgICAgIHJlbW92ZVNxdWFyZUhpdFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFxyXG5cclxuICAgIHJldHJpZXZlRGF0YURyb3AsXHJcbiAgICByZXRyaWV2ZVR1cm5EYXRhLFxyXG4gICAgcmV0cmlldmVEYXRhQm9hcmRWZXJ0LFxyXG4gICAgcmV0cmlldmVEYXRhQm9hcmRIb3JpeixcclxuICAgIGlzSG9yaXpQbGFjZW1lbnRWYWxpZCxcclxuICAgIGlzVmVydFBsYWNlbWVudFZhbGlkLFxyXG5cclxufSBmcm9tICcuLi9sb2dpYy9oYW5kbGVTdHlsaW5nRXZlbnRzRGF0YSdcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyVHVybiA9ICh0dXJuRGF0YSxldmVudCkgPT57XHJcbiAgICBjb25zdCB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfSA9IFxyXG4gICAgICAgIHJldHJpZXZlVHVybkRhdGEodHVybkRhdGEpXHJcblxyXG4gICAgcmVuZGVyQm9hcmRTcXVhcmVzKHBsYXllckRhdGEsIGV2ZW50LnRhcmdldClcclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudClcclxuXHJcbiAgICByZW5kZXJUdXJuSW5mbyh0dXJuRGF0YSx0dXJuRGF0YS5wbGF5ZXIxKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTWF0Y2hSZXN1bHQgPSAocGxheWVyRGF0YSkgPT57XHJcbiAgICBjb25zdCB3aW5uZXIgPSBwbGF5ZXJEYXRhLnBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIFxyXG4gICAgICAgID8gJ0NvbXB1dGVyJ1xyXG4gICAgICAgIDogcGxheWVyRGF0YS5wbGF5ZXIxLmdldE5hbWUoKSAgIFxyXG5cclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3dpbm5lcn1gICsgJyBpcyB0aGUgd2lubmVyIScgXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJEcmFnU3RhcnQgKGV2ZW50KSB7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsZXZlbnQudGFyZ2V0LmlkKVxyXG59XHJcbiAgICBcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRyYWdFbnRlciAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKVxyXG59XHJcbiAgICBcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRyYWdPdmVyIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJEcmFnTGVhdmUgKGV2ZW50KSB7XHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJylcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZURyb3BFdmVudCA9IChldmVudCxnYW1lKSA9PntcclxuICAgIGNvbnN0IHtzaGlwSUQsIHNxdWFyZUlEICxzcXVhcmVzVG9TdHlsZX0gPSByZXRyaWV2ZURhdGFEcm9wKGV2ZW50KVxyXG4gICAgY29uc3QgcmVuZGVyRGlyZWN0aW9uID0gKGdhbWUuZ2V0RGlyZWN0aW9uKCkgPT09ICdWZXJ0aWNhbCcpXHJcbiAgICAgICAgPyByZW5kZXJTaGlwVmVydCBcclxuICAgICAgICA6IHJlbmRlclNoaXBIb3JpelxyXG5cclxuICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZW5kZXJEaXJlY3Rpb24oc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKVxyXG4gICAgcmVtb3ZlQm9hcmRNYXJrKGV2ZW50KVxyXG4gICAgaWYoIXNoaXBDb29yZHMpIHJldHVyblxyXG5cclxuICAgIGdhbWUuc2V0Q29vcmRzQXJyYXkoc2hpcENvb3JkcylcclxuICAgIGdhbWUuY2hlY2tGb3JHYW1lUHJlcGFyZWQoZ2FtZSxnYW1lLmdldFBsYXllcjEoKSxnYW1lLmdldFBsYXllcjIoKSlcclxufVxyXG5cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBWZXJ0ID0gKHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlLHNoaXBJRCkgPT57XHJcbiAgICBsZXQgeyBib2FyZEdyaWRBcnJheSxzaGlwSW5Qb29sLCBpbmRleFRvU3R5bGUgfSA9XHJcbiAgICAgICAgcmV0cmlldmVEYXRhQm9hcmRWZXJ0KHNxdWFyZUlELHNoaXBJRClcclxuXHJcbiAgICBpZighaXNWZXJ0UGxhY2VtZW50VmFsaWQoaW5kZXhUb1N0eWxlLHNxdWFyZXNUb1N0eWxlLCBib2FyZEdyaWRBcnJheSkpIHJldHVyblxyXG4gICAgXHJcbiAgICBsZXQgY29vcmRzID0gW11cclxuICAgIHJlbmRlclNxdWFyZXNWZXJ0KGluZGV4VG9TdHlsZSxzcXVhcmVzVG9TdHlsZSxib2FyZEdyaWRBcnJheSxjb29yZHMpXHJcbiAgICByZW1vdmVQb29sU2hpcChzaGlwSW5Qb29sKVxyXG4gICAgcmV0dXJuIGNvb3Jkc1xyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZXNWZXJ0ID0gKGluZGV4VG9TdHlsZSxzcXVhcmVzVG9TdHlsZSxib2FyZEdyaWRBcnJheSxjb29yZHMpID0+e1xyXG4gICAgd2hpbGUoc3F1YXJlc1RvU3R5bGUgPiAwKXtcclxuICAgICAgICBsZXQgZWxlbWVudFRvU3R5bGUgPSBib2FyZEdyaWRBcnJheVtpbmRleFRvU3R5bGVdXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgY29vcmRzLnB1c2goZWxlbWVudFRvU3R5bGUuaWQpXHJcbiAgICAgICAgaW5kZXhUb1N0eWxlICs9IDhcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tXHJcbiAgICB9ICBcclxufVxyXG4gIFxyXG5jb25zdCByZW5kZXJTaGlwSG9yaXogPSAoc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKSA9PntcclxuICAgIGxldCB7ZWxlbWVudFRvU3R5bGUsIHNoaXBJblBvb2x9ID0gcmV0cmlldmVEYXRhQm9hcmRIb3JpeihzcXVhcmVJRCxzaGlwSUQpXHJcbiAgICBcclxuICAgIGlmKCFpc0hvcml6UGxhY2VtZW50VmFsaWQoZWxlbWVudFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUpKSByZXR1cm5cclxuICAgIFxyXG4gICAgbGV0IGNvb3JkcyA9IFtdXHJcbiAgICByZW5kZXJTcXVhcmVzSG9yaXooZWxlbWVudFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsY29vcmRzKVxyXG4gICAgcmVtb3ZlUG9vbFNoaXAoc2hpcEluUG9vbClcclxuICAgIFxyXG4gICAgcmV0dXJuIGNvb3JkcyAgICAgXHJcbn1cclxuICAgIFxyXG5jb25zdCByZW5kZXJTcXVhcmVzSG9yaXogPSAoZWxlbWVudFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsY29vcmRzKSA9PntcclxuICAgIHdoaWxlKHNxdWFyZXNUb1N0eWxlID4gMCl7XHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICBjb29yZHMucHVzaChlbGVtZW50VG9TdHlsZS5pZClcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tIFxyXG4gICAgfVxyXG59XHJcbiAgICBcclxuY29uc3QgcmVtb3ZlUG9vbFNoaXAgPSAoc2hpcEluUG9vbCkgPT57XHJcbiAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxyXG4gICAgc2hpcEluUG9vbC5yZW1vdmVBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpXHJcbn1cclxuXHJcbmNvbnN0IHJlbW92ZUJvYXJkTWFyayA9IChldmVudCkgPT57XHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJylcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRTcXVhcmVzID0gKHR1cm5EYXRhLCBlbGVtZW50KSA9PntcclxuICAgIGlmKGlzSGl0RWxlbWVudChlbGVtZW50KSkgcmV0dXJuICBcclxuICAgICh0dXJuRGF0YSkgPyByZW5kZXJTcXVhcmVPbk1pc3MoZWxlbWVudCkgOiByZW5kZXJTcXVhcmVPbkhpdChlbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCBpc0hpdEVsZW1lbnQgPSAoZWxlbWVudCkgPT57XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJTcXVhcmVPbkhpdCA9IChlbGVtZW50KSA9PntcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpXHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXHJcbn1cclxuICBcclxuY29uc3QgcmVuZGVyU3F1YXJlT25NaXNzICA9IChlbGVtZW50KSA9PntcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWlzcycpXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclR1cm5JbmZvID0gKHR1cm5EYXRhLHBsYXllcjEpID0+e1xyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5nZXROYW1lKCl9IGF0dGFjayBpcyBhIGAgXHJcbiAgICArICh0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3MpID8gJ21pc3MhJyA6ICdoaXQhJ1xyXG4gIFxyXG59XHJcblxyXG5jb25zdCByZW5kZXJXYXJuaW5nc0luZm8gPSAoKSA9PntcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcE9uU2luayA9ICgpID0+e1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclN0YXRpY0VsZW1lbnRzKHBsYXllcjEsIHBsYXllcjIpe1xyXG4gICAgcmVuZGVyQm9hcmRPblJlc2V0KClcclxuICAgIHJlbmRlclBsYXllck5hbWVzKHBsYXllcjEsIHBsYXllcjIpXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBzID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICBsZXQgaW5kZXggPSAwXHJcbiAgICBjb25zdCBib2FyZEdyaWQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmRHcmlkKClcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKGJvYXJkR3JpZCkpe1xyXG4gICAgICAgIGlmKGJvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgYm9hcmRHcmlkQXJyYXlbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleCsrXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCByZW5kZXJQbGF5ZXJOYW1lcyA9IChwbGF5ZXIxLCBwbGF5ZXIyKSA9PntcclxuICAgIGNvbnN0IHBsYXllcjFOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEtbmFtZScpXHJcbiAgICBjb25zdCBwbGF5ZXIyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyLW5hbWUnKVxyXG5cclxuICAgIHBsYXllcjFOYW1lLnRleHRDb250ZW50ID0gcGxheWVyMS5nZXROYW1lKCkgKyAnIFxcJ3MgZmxlZXQnXHJcbiAgICBwbGF5ZXIyTmFtZS50ZXh0Q29udGVudCA9IHBsYXllcjIuZ2V0TmFtZSgpICsgJyBcXCdzIGZsZWV0J1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJCb2FyZE9uUmVzZXQgPSAoKSA9PntcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5MSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IGJvYXJkR3JpZEFycmF5MiA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcblxyXG4gICAgYm9hcmRHcmlkQXJyYXkxLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaGl0JylcclxuICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnbWlzcycpXHJcbiAgICB9KVxyXG4gICAgYm9hcmRHcmlkQXJyYXkyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJylcclxuICAgIH0pIFxyXG5cclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gICcnXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHYW1lLGNoZWNrRm9yR2FtZVByZXBhcmVkfSBmcm9tICcuL2xvZ2ljL2dhbWUnXHJcbmltcG9ydCB7YWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrLGFkZEV2ZW50TGlzdGVuZXJUb2dnbGVEaXJlY3Rpb24sYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHN9IGZyb20gJy4vbG9naWMvaGFuZGxlRXZlbnRMaXN0ZW5lcnMnXHJcblxyXG5jb25zdCBwcmVwYXJlR2FtZSA9IChnYW1lKSA9PntcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzRHJhZ1NoaXBzKGdhbWUpXHJcbiAgICBhZGRFdmVudExpc3RlbmVyVG9nZ2xlRGlyZWN0aW9uKGdhbWUpXHJcbn1cclxuXHJcbmNvbnN0IGdhbWUgPSBHYW1lKClcclxucHJlcGFyZUdhbWUoZ2FtZSlcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==