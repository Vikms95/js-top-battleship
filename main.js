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
        enemyGameboard             = switchGameboards()
        
        const computerCoords       = getPlayerInTurn().sendRandomAttackCoordsToGame(enemyGameboard)
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
    console.log(game.playerInTurn)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051RDtBQUM0RTtBQUNuSTtBQUNBO0FBQ0EsSUFBSSx1RkFBMEI7QUFDOUIsSUFBSSw2RkFBK0I7QUFDbkM7QUFDQTtBQUNBLGFBQWEsaURBQUk7QUFDakI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWUuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2hhbmRsZUV2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2hhbmRsZVN0eWxpbmdFdmVudHNEYXRhLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3BsYXllci5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9zaGlwLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJTdGF0aWNFbGVtZW50cyB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMnXHJcbmltcG9ydCB7IHJlbmRlck1hdGNoUmVzdWx0IH0gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcbmltcG9ydCB7IHJlbW92ZUV2ZW50TGlzdGVuZXJzLCBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlLCBhZGRFdmVudExpc3RlbmVyc0JvYXJkRHJhZywgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrIH0gZnJvbSAnLi9oYW5kbGVFdmVudExpc3RlbmVycydcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInXHJcbi8vIGltcG9ydCB7IGV4ZWN1dGVHYW1lIH0gZnJvbSAnL3NyYy9pbmRleCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lICgpe1xyXG4gICAgbGV0IHNoaXBEaXJlY3Rpb24gPSAnVmVydGljYWwnXHJcbiAgICBsZXQgY29vcmRzQXJyYXkgPSBbXVxyXG5cclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZC1ncmlkLnBsYXllcjInKVxyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgndW5jbGlja2FibGUnKVxyXG5cclxuICAgIGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ1ZpY3RvcicpXHJcbiAgICBjb25zdCBwbGF5ZXIyID0gUGxheWVyKCdDb21wdXRlcicpXHJcbiAgICBsZXQgcGxheWVySW5UdXJuID0gcGxheWVyMVxyXG4gICAgbGV0IGdhbWVib2FyZDEgXHJcbiAgICBsZXQgZ2FtZWJvYXJkMiBcclxuICAgIFxyXG5cclxuICAgIHJlbmRlclN0YXRpY0VsZW1lbnRzKHBsYXllcjEsIHBsYXllcjIpXHJcblxyXG4gICAgY29uc3QgZ2FtZVR1cm4gPSAoY29vcmRzKSA9PntcclxuICAgICAgICBsZXQgZW5lbXlHYW1lYm9hcmQgPSBwbGF5ZXJJblR1cm4gPT09IHBsYXllcjEgPyBwbGF5ZXIyLmdldEdhbWVib2FyZCgpIDogcGxheWVyMS5nZXRHYW1lYm9hcmQoKSBcclxuICAgICAgICBjb25zdCBwbGF5ZXJDb29yZHMgPSBnZXRQbGF5ZXJJblR1cm4oKS5zZW5kQXR0YWNrQ29vcmRzVG9HYW1lKGNvb3JkcylcclxuICAgICAgICBpZihwbGF5ZXJDb29yZHMgPT09IG51bGwpIHJldHVybiBudWxsXHJcbiAgXHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJBdHRhY2tNaXNzICAgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihwbGF5ZXJDb29yZHMpIFxyXG4gICAgICAgIHBsYXllckluVHVybiAgICAgICAgICAgICAgID0gc3dpdGNoUGxheWVycygpXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgICAgICAgICAgICAgPSBzd2l0Y2hHYW1lYm9hcmRzKClcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgICAgICA9IGdldFBsYXllckluVHVybigpLnNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUoZW5lbXlHYW1lYm9hcmQpXHJcbiAgICAgICAgY29uc3QgaXNDb21wdXRlckF0dGFja01pc3MgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihjb21wdXRlckNvb3JkcylcclxuICAgICAgICBwbGF5ZXJJblR1cm4gICAgICAgICAgICAgICA9IHN3aXRjaFBsYXllcnMoKVxyXG4gICAgICAgIGVuZW15R2FtZWJvYXJkICAgICAgICAgICAgID0gc3dpdGNoR2FtZWJvYXJkcygpXHJcblxyXG4gICAgICAgIGlmKGlzQW55UGxheWVyRGVmZWF0ZWQoKSl7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VuY2xpY2thYmxlJylcclxuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgICAgICAgICByZW5kZXJNYXRjaFJlc3VsdCh7cGxheWVyMSxwbGF5ZXIyfSlcclxuICAgICAgICAgICAgcHJlcGFyZU5leHRNYXRjaCgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwbGF5ZXIxLFxyXG4gICAgICAgICAgICBpc1BsYXllckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGlzQ29tcHV0ZXJBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBjb21wdXRlckNvb3Jkc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hQbGF5ZXJzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gcGxheWVyMSA6IHBsYXllcjJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hHYW1lYm9hcmRzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gZ2FtZWJvYXJkMSA6IGdhbWVib2FyZDJcclxuICAgIH0gICBcclxuXHJcbiAgICBjb25zdCBpc0FueVBsYXllckRlZmVhdGVkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIHx8IHBsYXllcjIuaXNQbGF5ZXJEZWZlYXRlZCgpXHJcbiAgICB9IFxyXG5cclxuICAgIC8vIGNvbnN0IHByZXBhcmVOZXh0TWF0Y2ggPSAoKSA9PntcclxuICAgIC8vICAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZyb20gYm9hcmRcclxuICAgIC8vICAgICBzZXRUaW1lb3V0KCwyMDAwKVxyXG4gICAgLy8gfVxyXG5cclxuICBcclxuICAgIGNvbnN0IHNldENvb3Jkc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIGNvb3Jkc0FycmF5LnB1c2goc2hpcClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRDb29yZHNBcnJheSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjb29yZHNBcnJheVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldERpcmVjdGlvbiA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzaGlwRGlyZWN0aW9uIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFBsYXllcjEgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVyMVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFBsYXllcjIgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVyMlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFBsYXllckluVHVybiA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJJblR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQyID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGdhbWVib2FyZDJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXREaXJlY3Rpb24gPSAoZGlyZWN0aW9uLGVsZW1lbnQpID0+e1xyXG4gICAgICAgIHNoaXBEaXJlY3Rpb24gPSBkaXJlY3Rpb25cclxuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gZGlyZWN0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2hlY2tGb3JHYW1lUHJlcGFyZWQgPSAoZ2FtZSkgPT57XHJcbiAgICAgICAgaWYgKGdhbWUuZ2V0Q29vcmRzQXJyYXkoKS5sZW5ndGggPj0gOSl7XHJcbiAgICAgICAgICAgIGdhbWUuZ2V0UGxheWVyMSgpLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICAgICAgICAgIGdhbWUuZ2V0Q29vcmRzQXJyYXkoKVxyXG4gICAgICAgICAgICApICBcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWUuZ2V0Q29vcmRzQXJyYXkoKSlcclxuICAgICAgICAgICAgZ2FtZS5nZXRQbGF5ZXIyKCkuY3JlYXRlR2FtZUJvYXJkKFtcclxuICAgICAgICAgICAgICAgIFsnQTEnXSxcclxuICAgICAgICAgICAgICAgIFsnQjEnLCdCMiddLFxyXG4gICAgICAgICAgICAgICAgWydDMScsJ0MyJywnQzMnXSxcclxuICAgICAgICAgICAgICAgIFsnRDEnLCdEMicsJ0QzJywnRDQnXSxcclxuICAgICAgICAgICAgICAgIFsnRTEnLCdFMicsJ0UzJywnRTQnLCdFNSddLFxyXG4gICAgICAgICAgICAgICAgWydGMScsJ0YyJywnRjMnLCdGNCcsJ0Y1J10sXHJcbiAgICAgICAgICAgICAgICBbJ0cxJywnRzInLCdHMycsJ0c0JywnRzUnXSxcclxuICAgICAgICAgICAgICAgIFsnSDEnLCdIMicsJ0gzJywnSDQnLCdINSddLFxyXG4gICAgICAgICAgICAgICAgWydBOCcsJ0I4JywnQzgnLCdEOCcsJ0U4J11cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGdhbWUuZ2FtZWJvYXJkMSAgICAgPSBnYW1lLmdldFBsYXllcjEoKS5nZXRHYW1lYm9hcmQoKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lLmdhbWVib2FyZDEpXHJcbiAgICAgICAgICAgIGdhbWUuZ2FtZWJvYXJkMiAgICAgPSBnYW1lLmdldFBsYXllcjIoKS5nZXRHYW1lYm9hcmQoKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lLmdhbWVib2FyZDIpXHJcbiAgICAgICAgICAgIGdhbWUucGxheWVySW5UdXJuICAgPSBnYW1lLmdldFBsYXllcjEoKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lLnBsYXllckluVHVybilcclxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrKGdhbWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybntnYW1lVHVybixnZXRDb29yZHNBcnJheSxzZXRDb29yZHNBcnJheSxnZXREaXJlY3Rpb24sc2V0RGlyZWN0aW9uLGdldFBsYXllcjEsZ2V0UGxheWVyMixnZXRQbGF5ZXJJblR1cm4sY2hlY2tGb3JHYW1lUHJlcGFyZWQsZ2FtZWJvYXJkMSxnYW1lYm9hcmQyLHBsYXllckluVHVybn1cclxufVxyXG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xyXG5leHBvcnQgZnVuY3Rpb24gR2FtZWJvYXJkKCl7ICAgIFxyXG4gICBcclxuICAgIGxldCBfYm9hcmRHcmlkID0gXHJcbiAgICB7XHJcbiAgICAgICAgJ0ExJzogZmFsc2UsICdBMic6IGZhbHNlLCAnQTMnOiBmYWxzZSwgJ0E0JzogZmFsc2UsICdBNSc6IGZhbHNlLCAnQTYnOiBmYWxzZSwgJ0E3JzogZmFsc2UsICdBOCc6IGZhbHNlLCBcclxuICAgICAgICAnQjEnOiBmYWxzZSwgJ0IyJzogZmFsc2UsICdCMyc6IGZhbHNlLCAnQjQnOiBmYWxzZSwgJ0I1JzogZmFsc2UsICdCNic6IGZhbHNlLCAnQjcnOiBmYWxzZSwgJ0I4JzogZmFsc2UsIFxyXG4gICAgICAgICdDMSc6IGZhbHNlLCAnQzInOiBmYWxzZSwgJ0MzJzogZmFsc2UsICdDNCc6IGZhbHNlLCAnQzUnOiBmYWxzZSwgJ0M2JzogZmFsc2UsICdDNyc6IGZhbHNlLCAnQzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0QxJzogZmFsc2UsICdEMic6IGZhbHNlLCAnRDMnOiBmYWxzZSwgJ0Q0JzogZmFsc2UsICdENSc6IGZhbHNlLCAnRDYnOiBmYWxzZSwgJ0Q3JzogZmFsc2UsICdEOCc6IGZhbHNlLCBcclxuICAgICAgICAnRTEnOiBmYWxzZSwgJ0UyJzogZmFsc2UsICdFMyc6IGZhbHNlLCAnRTQnOiBmYWxzZSwgJ0U1JzogZmFsc2UsICdFNic6IGZhbHNlLCAnRTcnOiBmYWxzZSwgJ0U4JzogZmFsc2UsIFxyXG4gICAgICAgICdGMSc6IGZhbHNlLCAnRjInOiBmYWxzZSwgJ0YzJzogZmFsc2UsICdGNCc6IGZhbHNlLCAnRjUnOiBmYWxzZSwgJ0Y2JzogZmFsc2UsICdGNyc6IGZhbHNlLCAnRjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0cxJzogZmFsc2UsICdHMic6IGZhbHNlLCAnRzMnOiBmYWxzZSwgJ0c0JzogZmFsc2UsICdHNSc6IGZhbHNlLCAnRzYnOiBmYWxzZSwgJ0c3JzogZmFsc2UsICdHOCc6IGZhbHNlLCBcclxuICAgICAgICAnSDEnOiBmYWxzZSwgJ0gyJzogZmFsc2UsICdIMyc6IGZhbHNlLCAnSDQnOiBmYWxzZSwgJ0g1JzogZmFsc2UsICdINic6IGZhbHNlLCAnSDcnOiBmYWxzZSwgJ0g4JzogZmFsc2UgXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IF9ib2FyZFNoaXBzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0Qm9hcmRHcmlkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZEdyaWRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRCb2FyZFNoaXBzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcHVsYXRlR2FtZWJvYXJkID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUoIGluZGV4IDwgY29vcmRpbmF0ZXMubGVuZ3RoICl7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KSBYXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBpZihpc0Nvb3Jkc0F2YWlsYWJsZShjb29yZGluYXRlcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwICA9IFNoaXAoLi4uY29vcmRpbmF0ZXMpIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwLmdldFNoaXBDb29yZCgpKVxyXG4gICAgICAgICAgICBfYm9hcmRTaGlwcyA9IGFkZFNoaXBUb1NoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX2JvYXJkU2hpcHMpXHJcbiAgICAgICAgICAgIGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdChzaGlwKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhfYm9hcmRHcmlkKVxyXG4gICAgICAgICAgICByZXR1cm4gc2hpcFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gSW5jb21pbmctcXVlcnkgKGFzc2VydCByZXN1bHQpXHJcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrRnJvbVBsYXllciA9IChjb29yZHMpPT57XHJcbiAgICAgICAgaWYoaXNBdHRhY2tWYWxpZChjb29yZHMpICYmIGlzU2hpcEhpdChjb29yZHMpKXtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGZpbmRTaGlwQnlDb29yZHMoY29vcmRzKVxyXG4gICAgICAgICAgICBpZihzaGlwLmlzU3Vua05leHRIaXQoKSl7XHJcbiAgICAgICAgICAgICAgICBfYm9hcmRTaGlwcyA9IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwU3F1YXJlID0gKGNvb3JkcyxzaGlwKSA9PntcclxuICAgICAgICBzaGlwLnJlbW92ZVNxdWFyZUhpdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBRdWVyeSAmIENvbW1hbmQgc2VsZiB4XHJcbiAgICBjb25zdCBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3QgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgc2hpcC5nZXRTaGlwQ29vcmQoKS5mb3JFYWNoKGNvb3JkID0+e1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhfYm9hcmRHcmlkKS5mb3JFYWNoKGtleSA9PntcclxuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmQpIHtfYm9hcmRHcmlkW2tleV0gPSB0cnVlfSBcclxuICAgICAgICAgICAgfSkgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRTaGlwVG9TaGlwc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIHJldHVybiBbLi4uX2JvYXJkU2hpcHMsc2hpcF1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oey4uLl9ib2FyZEdyaWR9LCB7W2Ake2Nvb3Jkc31gXTogJ0hpdCd9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICBjb25zdCBzaGlwSW5kZXggPSBmaW5kU2hpcEluZGV4QnlOYW1lKHNoaXApXHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbHRlcihhcnJheVNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5pbmRleE9mKGFycmF5U2hpcCkgIT09IHNoaXBJbmRleCBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gXHJcbiAgICBjb25zdCBmaW5kU2hpcEJ5Q29vcmRzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmQoc2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXAuZ2V0U2hpcENvb3JkKCkuaW5jbHVkZXMoY29vcmRzKSAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbmRTaGlwSW5kZXhCeU5hbWUgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmRJbmRleChjdXJyZW50U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTaGlwLmdldFNoaXBOYW1lKCkgPT09IHNoaXAuZ2V0U2hpcE5hbWUoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNTaGlwSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMgJiYgX2JvYXJkR3JpZFtrZXldKSB7IHJldHVybiB0cnVlIH0gICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNBbGxTaGlwc1N1bmsgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKF9ib2FyZFNoaXBzLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0Nvb3Jkc0F2YWlsYWJsZSA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGxldCBpbmRleEFycmF5ID0gMFxyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzW2luZGV4QXJyYXldKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoX2JvYXJkR3JpZFtrZXldKSA/IGZhbHNlIDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgaXNBdHRhY2tWYWxpZCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoX2JvYXJkR3JpZFtrZXldKSA9PT0gJ0hpdCc/IGZhbHNlIDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgIFxyXG4gICAgfVxyXG4gXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEJvYXJkR3JpZCxcclxuICAgICAgICBnZXRCb2FyZFNoaXBzLFxyXG4gICAgICAgIGNyZWF0ZVNoaXAsXHJcbiAgICAgICAgZ2V0U2hpcExlbmd0aEJ5TmFtZSxcclxuICAgICAgICBwb3B1bGF0ZUdhbWVib2FyZCxcclxuICAgICAgICByZWNlaXZlQXR0YWNrRnJvbVBsYXllcixcclxuICAgICAgICBpc0FsbFNoaXBzU3VuayxcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNoaXBMZW5ndGhCeU5hbWUgPSAoc2hpcE5hbWUpID0+e1xyXG4gICAgY29uc3QgX1NISVBfTkFNRVMgPSB7XHJcbiAgICAgICAgJ3NweS0xJzogMSxcclxuICAgICAgICAnc3B5LTInOiAxLFxyXG4gICAgICAgICdzcHktMyc6IDEsXHJcbiAgICAgICAgJ2Rlc3Ryb3llci0xJzogMixcclxuICAgICAgICAnZGVzdHJveWVyLTInOiAyLFxyXG4gICAgICAgICdkZXN0cm95ZXItMyc6IDIsXHJcbiAgICAgICAgJ2NydWlzZXInOiAzLFxyXG4gICAgICAgICdiYXR0bGVzaGlwJzogNCxcclxuICAgICAgICAnY2Fycmllcic6IDVcclxuICAgIH1cclxuICAgIHJldHVybiBfU0hJUF9OQU1FU1tzaGlwTmFtZV1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgXHJcbiAgICBcclxuICAgIHJlbmRlclR1cm4sXHJcbiAgICByZW5kZXJEcmFnRW50ZXIsXHJcbiAgICByZW5kZXJEcmFnU3RhcnQsXHJcbiAgICByZW5kZXJEcmFnT3ZlcixcclxuICAgIHJlbmRlckRyYWdMZWF2ZSxcclxuICAgIGhhbmRsZURyb3BFdmVudFxyXG5cclxufSBmcm9tICcuLi92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2sgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT57XHJcbiAgICAgICAgICAgIHByb2Nlc3NUdXJuRGF0YShnYW1lLGV2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBwcm9jZXNzVHVybkRhdGEgPSAoZ2FtZSxldmVudCkgPT57XHJcbiAgICBjb25zb2xlLmxvZyhnYW1lLnBsYXllckluVHVybilcclxuICAgIGNvbnN0IHR1cm5EYXRhID0gZ2FtZS5nYW1lVHVybihldmVudC50YXJnZXQuaWQpXHJcbiAgICBpZih0dXJuRGF0YSA9PT0gbnVsbCkgcmV0dXJuICAgICAgXHJcbiAgICByZW5kZXJUdXJuKHR1cm5EYXRhLGV2ZW50KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHMgPSAoZ2FtZSkgPT57XHJcbiAgICBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlKClcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnKGdhbWUpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNQbGF5ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc1BsYXllci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJyxyZW5kZXJEcmFnRW50ZXIpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJyxyZW5kZXJEcmFnT3ZlcilcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxyZW5kZXJEcmFnTGVhdmUpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLChldmVudCkgPT57XHJcbiAgICAgICAgICAgIGhhbmRsZURyb3BFdmVudChldmVudCxnYW1lKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSgpe1xyXG4gICAgY29uc3Qgc2hpcHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb29sLXNoaXAucGxheWVyMScpKVxyXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwPT5cclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcscmVuZGVyRHJhZ1N0YXJ0KSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzICgpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc1R1cm5EYXRhKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJUb2dnbGVEaXJlY3Rpb24gKGdhbWUpe1xyXG4gICAgY29uc3QgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXHJcbiAgICB0b2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgIChnYW1lLmdldERpcmVjdGlvbigpID09PSAnVmVydGljYWwnKSBcclxuICAgICAgICAgICAgPyBnYW1lLnNldERpcmVjdGlvbignSG9yaXpvbnRhbCcsdG9nZ2xlQnV0dG9uKSBcclxuICAgICAgICAgICAgOiBnYW1lLnNldERpcmVjdGlvbignVmVydGljYWwnLHRvZ2dsZUJ1dHRvbilcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBnZXRTaGlwTGVuZ3RoQnlOYW1lIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVUdXJuRGF0YSA9ICh0dXJuRGF0YSkgPT57XHJcbiAgICBjb25zdCBwbGF5ZXJEYXRhICAgICAgPSB0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyRGF0YSAgICA9IHR1cm5EYXRhLmlzQ29tcHV0ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgPSB0dXJuRGF0YS5jb21wdXRlckNvb3Jkc1xyXG4gICAgY29uc3QgYXR0YWNrZWRFbGVtZW50ID0gZmluZEhpdEVsZW1lbnQoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgcmV0dXJuIHsgcGxheWVyRGF0YSxjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudCB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZURhdGFEcm9wID0gKGV2ZW50KSA9PntcclxuICAgIGNvbnN0IHNoaXBJRCAgICAgICA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgIGNvbnN0IHNxdWFyZUlEICAgICA9IGV2ZW50LnRhcmdldC5pZCBcclxuICAgIGxldCBzcXVhcmVzVG9TdHlsZSA9IGdldFNoaXBMZW5ndGhCeU5hbWUoc2hpcElEKVxyXG5cclxuICAgIHJldHVybiB7c2hpcElELHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVEYXRhQm9hcmRWZXJ0ID0gKHNxdWFyZUlELHNoaXBJRCkgPT57XHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IHNoaXBJblBvb2wgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG4gICAgbGV0IGluZGV4VG9TdHlsZSAgICAgPSBib2FyZEdyaWRBcnJheS5maW5kSW5kZXgoZWwgPT4gZWwuaWQgPT09IHNxdWFyZUlEKVxyXG5cclxuICAgIHJldHVybiB7Ym9hcmRHcmlkQXJyYXksc2hpcEluUG9vbCwgaW5kZXhUb1N0eWxlfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVEYXRhQm9hcmRIb3JpeiA9IChzcXVhcmVJRCxzaGlwSUQpID0+e1xyXG4gICAgY29uc3QgZWxlbWVudFRvU3R5bGUgICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NxdWFyZUlEfWApXHJcbiAgICBjb25zdCBzaGlwSW5Qb29sICAgICAgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudFRvU3R5bGUsIHNoaXBJblBvb2x9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1ZlcnRQbGFjZW1lbnRWYWxpZCA9IChpbmRleFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsIGJvYXJkR3JpZEFycmF5KSA9PntcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzcXVhcmVzVG9TdHlsZTsgaW5kZXgrKykge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gYm9hcmRHcmlkQXJyYXlbaW5kZXhUb1N0eWxlXVxyXG4gICAgICAgIGlmKCBpc092ZXJmbG93Qm90dG9tKGVsZW1lbnQpIHx8IGlzT3ZlcmxhcChlbGVtZW50KSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleFRvU3R5bGUgKz0gOFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzSG9yaXpQbGFjZW1lbnRWYWxpZCA9IChlbGVtZW50LHNxdWFyZXNUb1N0eWxlKSA9PntcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzcXVhcmVzVG9TdHlsZTsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmKGlzT3ZlcmZsb3dCb3R0b21TaWRlKGVsZW1lbnQpIHx8IGlzT3ZlcmxhcChlbGVtZW50KSB8fCBpc092ZXJmbG93U2lkZShlbGVtZW50LGluZGV4KSApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59IFxyXG5cclxuZXhwb3J0IGNvbnN0IGlzT3ZlcmxhcCA9IChlbGVtZW50KSA9PntcclxuICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc092ZXJmbG93Qm90dG9tID0gKGVsZW1lbnQpID0+e1xyXG4gICAgcmV0dXJuIGVsZW1lbnQgPT09IHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNPdmVyZmxvd0JvdHRvbVNpZGUgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgcmV0dXJuICgoZWxlbWVudCA9PT0gbnVsbCkgKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNPdmVyZmxvd1NpZGUgPSAoZWxlbWVudCxpbmRleCkgPT4ge1xyXG4gICAgcmV0dXJuIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncm93JykgJiYgaW5kZXggIT09IDApXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZmluZEhpdEVsZW1lbnQgPSAoY29vcmRzKSA9PntcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyMSA+ICMke2Nvb3Jkc31gKVxyXG59IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUpe1xyXG4gICAgY29uc3QgX3BsYXllck5hbWUgPSBuYW1lXHJcblxyXG4gICAgbGV0IF9nYW1lYm9hcmRcclxuXHJcbiAgICBsZXQgX2F0dGFja2VkU3F1YXJlcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3BsYXllck5hbWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2dhbWVib2FyZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEF0dGFja2VkU3F1YXJlcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYXR0YWNrZWRTcXVhcmVzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2V0QXR0YWNrZWRTcXVhcmVzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgX2F0dGFja2VkU3F1YXJlcy5wdXNoKGNvb3JkcylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIF9nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIF9nYW1lYm9hcmQucG9wdWxhdGVHYW1lYm9hcmQoY29vcmRpbmF0ZXMpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNlbmRBdHRhY2tDb29yZHNUb0dhbWUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBpZihnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhjb29yZHMpKSByZXR1cm4gbnVsbFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgICAgIGNvbnN0IGJvYXJkR3JpZCA9IE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCA9IGJvYXJkR3JpZC5sZW5ndGhcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB3aGlsZShnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhib2FyZEdyaWRbaW5kZXhdKSl7XHJcbiAgICAgICAgICAgIGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGJvYXJkR3JpZFtpbmRleF0pXHJcbiAgICAgICAgcmV0dXJuIGJvYXJkR3JpZFtpbmRleF1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGVSYW5kb21OdW1iZXIgPSAobWF4LG1pbikgPT57XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKF9nYW1lYm9hcmQuZ2V0Qm9hcmRTaGlwcygpLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBnZXRHYW1lYm9hcmQsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzLFxyXG4gICAgICAgIGNyZWF0ZUdhbWVCb2FyZCxcclxuICAgICAgICBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIHNlbmRBdHRhY2tDb29yZHNUb0dhbWUsXHJcbiAgICAgICAgaXNQbGF5ZXJEZWZlYXRlZFxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIFNoaXAoLi4uY29vcmRpbmF0ZXMpe1xyXG5cclxuICAgIGxldCBfc2hpcENvb3JkID0gY29vcmRpbmF0ZXNcclxuXHJcbiAgICBjb25zdCBfU0hJUF9OQU1FUyA9IHtcclxuICAgICAgICAxIDogJ1NweScsXHJcbiAgICAgICAgMiA6ICdEZXN0cm95ZXInLFxyXG4gICAgICAgIDMgOiAnQ3J1aXNlcicsXHJcbiAgICAgICAgNCA6ICdCYXR0bGVzaGlwJyxcclxuICAgICAgICA1IDogJ0NhcnJpZXInXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX3NoaXBOYW1lID0gX1NISVBfTkFNRVNbX3NoaXBDb29yZC5sZW5ndGhdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldFNoaXBOYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGdldFNoaXBDb29yZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEluY29taW5nIHF1ZXJ5IChhc3NlcnQgcmVzdWx0ID4gdGVzdGVkIHdpdGggcmVtb3ZlU3F1YXJlSGl0KVxyXG4gICAgY29uc3QgZmluZEhpdEluZGV4ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZHMpICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTZWxmIGNvbW1hbmQgeFxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgY29uc3QgaW5kZXhDb29yZCA9IGZpbmRIaXRJbmRleChjb29yZHMpXHJcbiAgICAgICAgX3NoaXBDb29yZCA9IF9zaGlwQ29vcmQuZmlsdGVyKGNvb3JkID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkKSAhPT0gaW5kZXhDb29yZCBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1cmUgLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBpc1N1bmtOZXh0SGl0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQubGVuZ3RoID09PSAxID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0U2hpcE5hbWUsXHJcbiAgICAgICAgZ2V0U2hpcENvb3JkLFxyXG4gICAgICAgIGlzU3Vua05leHRIaXQsXHJcbiAgICAgICAgcmVtb3ZlU3F1YXJlSGl0XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgXHJcblxyXG4gICAgcmV0cmlldmVEYXRhRHJvcCxcclxuICAgIHJldHJpZXZlVHVybkRhdGEsXHJcbiAgICByZXRyaWV2ZURhdGFCb2FyZFZlcnQsXHJcbiAgICByZXRyaWV2ZURhdGFCb2FyZEhvcml6LFxyXG4gICAgaXNIb3JpelBsYWNlbWVudFZhbGlkLFxyXG4gICAgaXNWZXJ0UGxhY2VtZW50VmFsaWQsXHJcblxyXG59IGZyb20gJy4uL2xvZ2ljL2hhbmRsZVN0eWxpbmdFdmVudHNEYXRhJ1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJUdXJuID0gKHR1cm5EYXRhLGV2ZW50KSA9PntcclxuICAgIGNvbnN0IHsgcGxheWVyRGF0YSxjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudCB9ID0gXHJcbiAgICAgICAgcmV0cmlldmVUdXJuRGF0YSh0dXJuRGF0YSlcclxuXHJcbiAgICByZW5kZXJCb2FyZFNxdWFyZXMocGxheWVyRGF0YSwgZXZlbnQudGFyZ2V0KVxyXG4gICAgcmVuZGVyQm9hcmRTcXVhcmVzKGNvbXB1dGVyRGF0YSwgYXR0YWNrZWRFbGVtZW50KVxyXG5cclxuICAgIHJlbmRlclR1cm5JbmZvKHR1cm5EYXRhLHR1cm5EYXRhLnBsYXllcjEpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJNYXRjaFJlc3VsdCA9IChwbGF5ZXJEYXRhKSA9PntcclxuICAgIGNvbnN0IHdpbm5lciA9IHBsYXllckRhdGEucGxheWVyMS5pc1BsYXllckRlZmVhdGVkKCkgXHJcbiAgICAgICAgPyAnQ29tcHV0ZXInXHJcbiAgICAgICAgOiBwbGF5ZXJEYXRhLnBsYXllcjEuZ2V0TmFtZSgpICAgXHJcblxyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuICAgIG1hdGNoSW5mb0VsLnRleHRDb250ZW50ID0gYCR7d2lubmVyfWAgKyAnIGlzIHRoZSB3aW5uZXIhJyBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRyYWdTdGFydCAoZXZlbnQpIHtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJyxldmVudC50YXJnZXQuaWQpXHJcbn1cclxuICAgIFxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyRHJhZ0VudGVyIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpXHJcbn1cclxuICAgIFxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyRHJhZ092ZXIgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZy1vdmVyJylcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRyYWdMZWF2ZSAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlRHJvcEV2ZW50ID0gKGV2ZW50LGdhbWUpID0+e1xyXG4gICAgY29uc3Qge3NoaXBJRCwgc3F1YXJlSUQgLHNxdWFyZXNUb1N0eWxlfSA9IHJldHJpZXZlRGF0YURyb3AoZXZlbnQpXHJcbiAgICBjb25zdCByZW5kZXJEaXJlY3Rpb24gPSAoZ2FtZS5nZXREaXJlY3Rpb24oKSA9PT0gJ1ZlcnRpY2FsJylcclxuICAgICAgICA/IHJlbmRlclNoaXBWZXJ0IFxyXG4gICAgICAgIDogcmVuZGVyU2hpcEhvcml6XHJcblxyXG4gICAgY29uc3Qgc2hpcENvb3JkcyA9IHJlbmRlckRpcmVjdGlvbihzcXVhcmVJRCxzcXVhcmVzVG9TdHlsZSxzaGlwSUQpXHJcbiAgICByZW1vdmVCb2FyZE1hcmsoZXZlbnQpXHJcbiAgICBpZighc2hpcENvb3JkcykgcmV0dXJuXHJcblxyXG4gICAgZ2FtZS5zZXRDb29yZHNBcnJheShzaGlwQ29vcmRzKVxyXG4gICAgZ2FtZS5jaGVja0ZvckdhbWVQcmVwYXJlZChnYW1lLGdhbWUuZ2V0UGxheWVyMSgpLGdhbWUuZ2V0UGxheWVyMigpKVxyXG59XHJcblxyXG5cclxuY29uc3QgcmVuZGVyU2hpcFZlcnQgPSAoc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKSA9PntcclxuICAgIGxldCB7IGJvYXJkR3JpZEFycmF5LHNoaXBJblBvb2wsIGluZGV4VG9TdHlsZSB9ID1cclxuICAgICAgICByZXRyaWV2ZURhdGFCb2FyZFZlcnQoc3F1YXJlSUQsc2hpcElEKVxyXG5cclxuICAgIGlmKCFpc1ZlcnRQbGFjZW1lbnRWYWxpZChpbmRleFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsIGJvYXJkR3JpZEFycmF5KSkgcmV0dXJuXHJcbiAgICBcclxuICAgIGxldCBjb29yZHMgPSBbXVxyXG4gICAgcmVuZGVyU3F1YXJlc1ZlcnQoaW5kZXhUb1N0eWxlLHNxdWFyZXNUb1N0eWxlLGJvYXJkR3JpZEFycmF5LGNvb3JkcylcclxuICAgIHJlbW92ZVBvb2xTaGlwKHNoaXBJblBvb2wpXHJcbiAgICByZXR1cm4gY29vcmRzXHJcbn1cclxuICBcclxuY29uc3QgcmVuZGVyU3F1YXJlc1ZlcnQgPSAoaW5kZXhUb1N0eWxlLHNxdWFyZXNUb1N0eWxlLGJvYXJkR3JpZEFycmF5LGNvb3JkcykgPT57XHJcbiAgICB3aGlsZShzcXVhcmVzVG9TdHlsZSA+IDApe1xyXG4gICAgICAgIGxldCBlbGVtZW50VG9TdHlsZSA9IGJvYXJkR3JpZEFycmF5W2luZGV4VG9TdHlsZV1cclxuICAgICAgICBlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QuYWRkKCdzaGlwJylcclxuICAgICAgICBjb29yZHMucHVzaChlbGVtZW50VG9TdHlsZS5pZClcclxuICAgICAgICBpbmRleFRvU3R5bGUgKz0gOFxyXG4gICAgICAgIHNxdWFyZXNUb1N0eWxlLS1cclxuICAgIH0gIFxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNoaXBIb3JpeiA9IChzcXVhcmVJRCxzcXVhcmVzVG9TdHlsZSxzaGlwSUQpID0+e1xyXG4gICAgbGV0IHtlbGVtZW50VG9TdHlsZSwgc2hpcEluUG9vbH0gPSByZXRyaWV2ZURhdGFCb2FyZEhvcml6KHNxdWFyZUlELHNoaXBJRClcclxuICAgIFxyXG4gICAgaWYoIWlzSG9yaXpQbGFjZW1lbnRWYWxpZChlbGVtZW50VG9TdHlsZSxzcXVhcmVzVG9TdHlsZSkpIHJldHVyblxyXG4gICAgXHJcbiAgICBsZXQgY29vcmRzID0gW11cclxuICAgIHJlbmRlclNxdWFyZXNIb3JpeihlbGVtZW50VG9TdHlsZSxzcXVhcmVzVG9TdHlsZSxjb29yZHMpXHJcbiAgICByZW1vdmVQb29sU2hpcChzaGlwSW5Qb29sKVxyXG4gICAgXHJcbiAgICByZXR1cm4gY29vcmRzICAgICBcclxufVxyXG4gICAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZXNIb3JpeiA9IChlbGVtZW50VG9TdHlsZSxzcXVhcmVzVG9TdHlsZSxjb29yZHMpID0+e1xyXG4gICAgd2hpbGUoc3F1YXJlc1RvU3R5bGUgPiAwKXtcclxuICAgICAgICBlbGVtZW50VG9TdHlsZS5jbGFzc0xpc3QuYWRkKCdzaGlwJylcclxuICAgICAgICBlbGVtZW50VG9TdHlsZSA9IGVsZW1lbnRUb1N0eWxlLm5leHRFbGVtZW50U2libGluZ1xyXG4gICAgICAgIGNvb3Jkcy5wdXNoKGVsZW1lbnRUb1N0eWxlLmlkKVxyXG4gICAgICAgIHNxdWFyZXNUb1N0eWxlLS0gXHJcbiAgICB9XHJcbn1cclxuICAgIFxyXG5jb25zdCByZW1vdmVQb29sU2hpcCA9IChzaGlwSW5Qb29sKSA9PntcclxuICAgIHNoaXBJblBvb2wuY2xhc3NMaXN0LmFkZCgnaGlkZScpXHJcbiAgICBzaGlwSW5Qb29sLnJlbW92ZUF0dHJpYnV0ZSgnZHJhZ2dhYmxlJylcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlQm9hcmRNYXJrID0gKGV2ZW50KSA9PntcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG59XHJcblxyXG5jb25zdCByZW5kZXJCb2FyZFNxdWFyZXMgPSAodHVybkRhdGEsIGVsZW1lbnQpID0+e1xyXG4gICAgaWYoaXNIaXRFbGVtZW50KGVsZW1lbnQpKSByZXR1cm4gIFxyXG4gICAgKHR1cm5EYXRhKSA/IHJlbmRlclNxdWFyZU9uTWlzcyhlbGVtZW50KSA6IHJlbmRlclNxdWFyZU9uSGl0KGVsZW1lbnQpXHJcbn1cclxuXHJcbmNvbnN0IGlzSGl0RWxlbWVudCA9IChlbGVtZW50KSA9PntcclxuICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnaGl0JykgXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uSGl0ID0gKGVsZW1lbnQpID0+e1xyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJylcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGl0JylcclxufVxyXG4gIFxyXG5jb25zdCByZW5kZXJTcXVhcmVPbk1pc3MgID0gKGVsZW1lbnQpID0+e1xyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtaXNzJylcclxufVxyXG5cclxuY29uc3QgcmVuZGVyVHVybkluZm8gPSAodHVybkRhdGEscGxheWVyMSkgPT57XHJcbiAgICBjb25zdCBtYXRjaEluZm9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXJuLWluZm8nKVxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLmdldE5hbWUoKX0gYXR0YWNrIGlzIGEgYCBcclxuICAgICsgKHR1cm5EYXRhLmlzUGxheWVyQXR0YWNrTWlzcykgPyAnbWlzcyEnIDogJ2hpdCEnXHJcbiAgXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlcldhcm5pbmdzSW5mbyA9ICgpID0+e1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwT25TaW5rID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RhdGljRWxlbWVudHMocGxheWVyMSwgcGxheWVyMil7XHJcbiAgICByZW5kZXJCb2FyZE9uUmVzZXQoKVxyXG4gICAgcmVuZGVyUGxheWVyTmFtZXMocGxheWVyMSwgcGxheWVyMilcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcHMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBpbmRleCA9IDBcclxuICAgIGNvbnN0IGJvYXJkR3JpZCA9IGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgaWYoYm9hcmRHcmlkW2tleV0pe1xyXG4gICAgICAgICAgICBib2FyZEdyaWRBcnJheVtpbmRleF0uY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4KytcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNvbnN0IHJlbmRlclBsYXllck5hbWVzID0gKHBsYXllcjEsIHBsYXllcjIpID0+e1xyXG4gICAgY29uc3QgcGxheWVyMU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMS1uYW1lJylcclxuICAgIGNvbnN0IHBsYXllcjJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjItbmFtZScpXHJcblxyXG4gICAgcGxheWVyMU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXIxLmdldE5hbWUoKSArICcgXFwncyBmbGVldCdcclxuICAgIHBsYXllcjJOYW1lLnRleHRDb250ZW50ID0gcGxheWVyMi5nZXROYW1lKCkgKyAnIFxcJ3MgZmxlZXQnXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkT25SZXNldCA9ICgpID0+e1xyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkxID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuXHJcbiAgICBib2FyZEdyaWRBcnJheTEuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJylcclxuICAgIH0pXHJcbiAgICBib2FyZEdyaWRBcnJheTIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKVxyXG4gICAgfSkgXHJcblxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSAgJydcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUsY2hlY2tGb3JHYW1lUHJlcGFyZWR9IGZyb20gJy4vbG9naWMvZ2FtZSdcclxuaW1wb3J0IHthZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2ssYWRkRXZlbnRMaXN0ZW5lclRvZ2dsZURpcmVjdGlvbixhZGRFdmVudExpc3RlbmVyc0RyYWdTaGlwc30gZnJvbSAnLi9sb2dpYy9oYW5kbGVFdmVudExpc3RlbmVycydcclxuXHJcbmNvbnN0IHByZXBhcmVHYW1lID0gKGdhbWUpID0+e1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHMoZ2FtZSlcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJUb2dnbGVEaXJlY3Rpb24oZ2FtZSlcclxufVxyXG5cclxuY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG5wcmVwYXJlR2FtZShnYW1lKVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9