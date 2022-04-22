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
    let playerInTurn = player2
    let gameboard1 
    let gameboard2 
    let enemyGameboard = player1.getGameboard()

    ;(0,_view_renderStaticElements__WEBPACK_IMPORTED_MODULE_0__.renderStaticElements)(player1, player2)

    const gameTurn = (coords) =>{ 
        playerInTurn = player1
        enemyGameboard = player2.getGameboard() 
        // let playerCoords = playerInTurn.sendAttackCoordsToGame(coords)

        const arrayPlay = (Array.from(document.querySelectorAll('.player2 > .grid-square')))
        let isValidPlay = true
        arrayPlay.forEach(square =>{
            if(square.id === coords){
                if(square.classList.contains('hit') ||square.classList.contains('miss')){
                    isValidPlay = false
                }
            }
        })

        if(!isValidPlay) return null
        // console.log(playerCoords)
        // if(playerCoords === null) return null
        let isPlayerAttackMiss   = enemyGameboard.receiveAttackFromPlayer(coords) 
        if(isPlayerAttackMiss === null) return null
        
        playerInTurn = player2
        enemyGameboard = player1.getGameboard()
        
        let computerCoords       = playerInTurn.sendRandomAttackCoordsToGame(enemyGameboard)
        const arrayComp = (Array.from(document.querySelectorAll('.player2 > .grid-square')))
        let isValidComp = true
        arrayComp.forEach(square =>{
            if(square.id === computerCoords){
                if(square.classList.contains('hit') ||square.classList.contains('miss')){
                    isValidComp = false
                }
            }
        })
        if(!isValidComp) return null
        let isComputerAttackMiss = enemyGameboard.receiveAttackFromComputer(computerCoords)

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

            game.getPlayer2().createGameBoard([
                ['A1'],
                ['B1'],
                ['C1'],
                ['D1','D2'],
                ['E1','E2'],
                ['F1','F2'],
                ['G1','G2','G3'],
                ['H1','H2','H3','H4'],
                ['A8','B8','C8','D8','E8']
            ]
            )
            game.gameboard1     = game.getPlayer1().getGameboard()
            game.gameboard2     = game.getPlayer2().getGameboard()
            game.playerInTurn   = game.getPlayer1()
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
            _boardShips = addShipToShipsArray(ship)
            addShipToBoardGridObject(ship)
            return ship
        }
    }
    
    // Incoming-query (assert result)
    const receiveAttackFromComputer = (coords)=>{
        debugger
        // isWithHitClass(coords)
        if(isAttackValid(coords) && isShipHit(coords)){
            const ship = findShipByCoords(coords)
            if(ship.isSunkNextHit()){
                _boardShips = removeShipFromShipsArray(ship,coords)
            }
            _boardGrid = removeShipSquare(coords,ship)
            return
        }
        _boardGrid = removeSquareFromBoardGridObject(coords)
        return coords
    }

    const receiveAttackFromPlayer = (coords)=>{
        console.dir(coords)
        // isWithHitClass(coords)
        if(isShipHit(coords)){
            const ship = findShipByCoords(coords)
            if(ship.isSunkNextHit()){
                _boardShips = removeShipFromShipsArray(ship,coords)
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

    const removeShipFromShipsArray = (ship,coords) =>{
        const shipIndex = findShipIndexByCoords(ship,coords) //FIND IT BY COORDINATE, NAME IS NOT RELIABLE NOW
        console.log(shipIndex)
        return _boardShips.filter(arrayShip =>{
            return _boardShips.indexOf(arrayShip) !== shipIndex 
        })
    }
 
    const findShipByCoords = (coords) =>{
        let hitShip = _boardShips.find(ship =>{
            if(ship.getShipCoord().includes(coords)){
                return ship.getShipCoord().includes(coords)    
            } 
        })
        if (hitShip) return hitShip
        if(!hitShip) return null
    }
    const findShipIndexByCoords = (ship,coords) =>{
        // traverse board_ship
        return _boardShips.findIndex(currentShip =>{
            return currentShip.getShipCoord().includes(coords)
        })
    }

    // const findShipIndexByName = (ship) =>{
    //     return _boardShips.findIndex(currentShip =>{
    //         return currentShip.getShipName() === ship.getShipName()
    //     })
    // }

    const isShipHit = (coords) =>{
        debugger
        // it needs to
        for(const [key] of Object.entries(_boardGrid)){
            if(key === coords){
                if(_boardGrid[key] === true && _boardGrid[key] !== false && _boardGrid[key] !== 'Hit' ){
                    return true 
                }else{
                    return false
                }   
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

    const isWithHitClass= (coords)=>{
        const array = Array.from(document.querySelectorAll('.player2 > .grid-square'))
        let coord =  array.find(square =>{
            square.id === coords && square.classList.contains('hit')
        })
        console.log(coord)
    } 
    
    const isAttackValid = (coords) =>{
        for(const [key] of Object.entries(_boardGrid)){
            if(key === coords){
                return (_boardGrid[key]) === 'Hit' || false ? false : true
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
        receiveAttackFromComputer,
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
    console.log(turnData)
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
        // debugger
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
        // setAttackedSquares(boardGrid[index])
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
        getAttackedSquares,
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
        return _shipCoord.length <= 1 ? true : false
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
    return element.classList.contains('hit') || element.classList.contains('miss')
}

const renderSquareOnHit = (element) =>{
    element.classList.remove('ship')
    element.classList.add('hit')
}
  
const renderSquareOnMiss  = (element) =>{
    element.classList.remove('ship')
    element.classList.add('hit')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVKTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7VUMxQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOdUQ7QUFDNEU7QUFDbkk7QUFDQTtBQUNBLElBQUksdUZBQTBCO0FBQzlCLElBQUksNkZBQStCO0FBQ25DO0FBQ0E7QUFDQSxhQUFhLGlEQUFJO0FBQ2pCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9nYW1lLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9oYW5kbGVFdmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9oYW5kbGVTdHlsaW5nRXZlbnRzRGF0YS5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvc2hpcC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy92aWV3L3JlbmRlclN0YXRpY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyU3RhdGljRWxlbWVudHMgfSBmcm9tICcuLi92aWV3L3JlbmRlclN0YXRpY0VsZW1lbnRzJ1xyXG5pbXBvcnQgeyByZW5kZXJNYXRjaFJlc3VsdCB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzJ1xyXG5pbXBvcnQgeyByZW1vdmVFdmVudExpc3RlbmVycywgYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSwgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcsIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmRDbGljayB9IGZyb20gJy4vaGFuZGxlRXZlbnRMaXN0ZW5lcnMnXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xyXG4vLyBpbXBvcnQgeyBleGVjdXRlR2FtZSB9IGZyb20gJy9zcmMvaW5kZXgnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2FtZSAoKXtcclxuICAgIGxldCBzaGlwRGlyZWN0aW9uID0gJ1ZlcnRpY2FsJ1xyXG4gICAgbGV0IGNvb3Jkc0FycmF5ID0gW11cclxuXHJcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmQtZ3JpZC5wbGF5ZXIyJylcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VuY2xpY2thYmxlJylcclxuXHJcbiAgICBjb25zdCBwbGF5ZXIxID0gUGxheWVyKCdWaWN0b3InKVxyXG4gICAgY29uc3QgcGxheWVyMiA9IFBsYXllcignQ29tcHV0ZXInKVxyXG4gICAgbGV0IHBsYXllckluVHVybiA9IHBsYXllcjJcclxuICAgIGxldCBnYW1lYm9hcmQxIFxyXG4gICAgbGV0IGdhbWVib2FyZDIgXHJcbiAgICBsZXQgZW5lbXlHYW1lYm9hcmQgPSBwbGF5ZXIxLmdldEdhbWVib2FyZCgpXHJcblxyXG4gICAgcmVuZGVyU3RhdGljRWxlbWVudHMocGxheWVyMSwgcGxheWVyMilcclxuXHJcbiAgICBjb25zdCBnYW1lVHVybiA9IChjb29yZHMpID0+eyBcclxuICAgICAgICBwbGF5ZXJJblR1cm4gPSBwbGF5ZXIxXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgPSBwbGF5ZXIyLmdldEdhbWVib2FyZCgpIFxyXG4gICAgICAgIC8vIGxldCBwbGF5ZXJDb29yZHMgPSBwbGF5ZXJJblR1cm4uc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZShjb29yZHMpXHJcblxyXG4gICAgICAgIGNvbnN0IGFycmF5UGxheSA9IChBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpKVxyXG4gICAgICAgIGxldCBpc1ZhbGlkUGxheSA9IHRydWVcclxuICAgICAgICBhcnJheVBsYXkuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgICAgIGlmKHNxdWFyZS5pZCA9PT0gY29vcmRzKXtcclxuICAgICAgICAgICAgICAgIGlmKHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIHx8c3F1YXJlLmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpKXtcclxuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkUGxheSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZighaXNWYWxpZFBsYXkpIHJldHVybiBudWxsXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGxheWVyQ29vcmRzKVxyXG4gICAgICAgIC8vIGlmKHBsYXllckNvb3JkcyA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICAgICAgICBsZXQgaXNQbGF5ZXJBdHRhY2tNaXNzICAgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihjb29yZHMpIFxyXG4gICAgICAgIGlmKGlzUGxheWVyQXR0YWNrTWlzcyA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICAgICAgICBcclxuICAgICAgICBwbGF5ZXJJblR1cm4gPSBwbGF5ZXIyXHJcbiAgICAgICAgZW5lbXlHYW1lYm9hcmQgPSBwbGF5ZXIxLmdldEdhbWVib2FyZCgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbXB1dGVyQ29vcmRzICAgICAgID0gcGxheWVySW5UdXJuLnNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUoZW5lbXlHYW1lYm9hcmQpXHJcbiAgICAgICAgY29uc3QgYXJyYXlDb21wID0gKEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSkpXHJcbiAgICAgICAgbGV0IGlzVmFsaWRDb21wID0gdHJ1ZVxyXG4gICAgICAgIGFycmF5Q29tcC5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICAgICAgaWYoc3F1YXJlLmlkID09PSBjb21wdXRlckNvb3Jkcyl7XHJcbiAgICAgICAgICAgICAgICBpZihzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSB8fHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoJ21pc3MnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZENvbXAgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZighaXNWYWxpZENvbXApIHJldHVybiBudWxsXHJcbiAgICAgICAgbGV0IGlzQ29tcHV0ZXJBdHRhY2tNaXNzID0gZW5lbXlHYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21Db21wdXRlcihjb21wdXRlckNvb3JkcylcclxuXHJcbiAgICAgICAgaWYoaXNBbnlQbGF5ZXJEZWZlYXRlZCgpKXtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndW5jbGlja2FibGUnKVxyXG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpXHJcbiAgICAgICAgICAgIHJlbmRlck1hdGNoUmVzdWx0KHtwbGF5ZXIxLHBsYXllcjJ9KVxyXG4gICAgICAgICAgICBwcmVwYXJlTmV4dE1hdGNoKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBsYXllcjEsXHJcbiAgICAgICAgICAgIGlzUGxheWVyQXR0YWNrTWlzcyxcclxuICAgICAgICAgICAgaXNDb21wdXRlckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGNvbXB1dGVyQ29vcmRzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaFBsYXllcnMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKHBsYXllckluVHVybiA9PT0gcGxheWVyMikgPyBwbGF5ZXIxIDogcGxheWVyMlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN3aXRjaEdhbWVib2FyZHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKHBsYXllckluVHVybiA9PT0gcGxheWVyMikgPyBnYW1lYm9hcmQxIDogZ2FtZWJvYXJkMlxyXG4gICAgfSAgIFxyXG5cclxuICAgIGNvbnN0IGlzQW55UGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVyMS5pc1BsYXllckRlZmVhdGVkKCkgfHwgcGxheWVyMi5pc1BsYXllckRlZmVhdGVkKClcclxuICAgIH0gXHJcblxyXG4gICAgLy8gY29uc3QgcHJlcGFyZU5leHRNYXRjaCA9ICgpID0+e1xyXG4gICAgLy8gICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgZnJvbSBib2FyZFxyXG4gICAgLy8gICAgIHNldFRpbWVvdXQoLDIwMDApXHJcbiAgICAvLyB9XHJcblxyXG4gIFxyXG4gICAgY29uc3Qgc2V0Q29vcmRzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29vcmRzQXJyYXkucHVzaChzaGlwKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldENvb3Jkc0FycmF5ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc0FycmF5XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0RGlyZWN0aW9uID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNoaXBEaXJlY3Rpb24gXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0UGxheWVyMSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXIxXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0UGxheWVyMiA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXIyXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0UGxheWVySW5UdXJuID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluVHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEdhbWVib2FyZDIgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gZ2FtZWJvYXJkMlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNldERpcmVjdGlvbiA9IChkaXJlY3Rpb24sZWxlbWVudCkgPT57XHJcbiAgICAgICAgc2hpcERpcmVjdGlvbiA9IGRpcmVjdGlvblxyXG4gICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBkaXJlY3Rpb25cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGVja0ZvckdhbWVQcmVwYXJlZCA9IChnYW1lKSA9PntcclxuICAgICAgICBpZiAoZ2FtZS5nZXRDb29yZHNBcnJheSgpLmxlbmd0aCA+PSA5KXtcclxuICAgICAgICAgICAgZ2FtZS5nZXRQbGF5ZXIxKCkuY3JlYXRlR2FtZUJvYXJkKFxyXG4gICAgICAgICAgICAgICAgZ2FtZS5nZXRDb29yZHNBcnJheSgpXHJcbiAgICAgICAgICAgICkgIFxyXG5cclxuICAgICAgICAgICAgZ2FtZS5nZXRQbGF5ZXIyKCkuY3JlYXRlR2FtZUJvYXJkKFtcclxuICAgICAgICAgICAgICAgIFsnQTEnXSxcclxuICAgICAgICAgICAgICAgIFsnQjEnXSxcclxuICAgICAgICAgICAgICAgIFsnQzEnXSxcclxuICAgICAgICAgICAgICAgIFsnRDEnLCdEMiddLFxyXG4gICAgICAgICAgICAgICAgWydFMScsJ0UyJ10sXHJcbiAgICAgICAgICAgICAgICBbJ0YxJywnRjInXSxcclxuICAgICAgICAgICAgICAgIFsnRzEnLCdHMicsJ0czJ10sXHJcbiAgICAgICAgICAgICAgICBbJ0gxJywnSDInLCdIMycsJ0g0J10sXHJcbiAgICAgICAgICAgICAgICBbJ0E4JywnQjgnLCdDOCcsJ0Q4JywnRTgnXVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgZ2FtZS5nYW1lYm9hcmQxICAgICA9IGdhbWUuZ2V0UGxheWVyMSgpLmdldEdhbWVib2FyZCgpXHJcbiAgICAgICAgICAgIGdhbWUuZ2FtZWJvYXJkMiAgICAgPSBnYW1lLmdldFBsYXllcjIoKS5nZXRHYW1lYm9hcmQoKVxyXG4gICAgICAgICAgICBnYW1lLnBsYXllckluVHVybiAgID0gZ2FtZS5nZXRQbGF5ZXIxKClcclxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrKGdhbWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybntnYW1lVHVybixnZXRDb29yZHNBcnJheSxzZXRDb29yZHNBcnJheSxnZXREaXJlY3Rpb24sc2V0RGlyZWN0aW9uLGdldFBsYXllcjEsZ2V0UGxheWVyMixnZXRQbGF5ZXJJblR1cm4sY2hlY2tGb3JHYW1lUHJlcGFyZWQsZ2FtZWJvYXJkMSxnYW1lYm9hcmQyLHBsYXllckluVHVybn1cclxufVxyXG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xyXG5leHBvcnQgZnVuY3Rpb24gR2FtZWJvYXJkKCl7ICAgIFxyXG4gICBcclxuICAgIGxldCBfYm9hcmRHcmlkID0gXHJcbiAgICB7XHJcbiAgICAgICAgJ0ExJzogZmFsc2UsICdBMic6IGZhbHNlLCAnQTMnOiBmYWxzZSwgJ0E0JzogZmFsc2UsICdBNSc6IGZhbHNlLCAnQTYnOiBmYWxzZSwgJ0E3JzogZmFsc2UsICdBOCc6IGZhbHNlLCBcclxuICAgICAgICAnQjEnOiBmYWxzZSwgJ0IyJzogZmFsc2UsICdCMyc6IGZhbHNlLCAnQjQnOiBmYWxzZSwgJ0I1JzogZmFsc2UsICdCNic6IGZhbHNlLCAnQjcnOiBmYWxzZSwgJ0I4JzogZmFsc2UsIFxyXG4gICAgICAgICdDMSc6IGZhbHNlLCAnQzInOiBmYWxzZSwgJ0MzJzogZmFsc2UsICdDNCc6IGZhbHNlLCAnQzUnOiBmYWxzZSwgJ0M2JzogZmFsc2UsICdDNyc6IGZhbHNlLCAnQzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0QxJzogZmFsc2UsICdEMic6IGZhbHNlLCAnRDMnOiBmYWxzZSwgJ0Q0JzogZmFsc2UsICdENSc6IGZhbHNlLCAnRDYnOiBmYWxzZSwgJ0Q3JzogZmFsc2UsICdEOCc6IGZhbHNlLCBcclxuICAgICAgICAnRTEnOiBmYWxzZSwgJ0UyJzogZmFsc2UsICdFMyc6IGZhbHNlLCAnRTQnOiBmYWxzZSwgJ0U1JzogZmFsc2UsICdFNic6IGZhbHNlLCAnRTcnOiBmYWxzZSwgJ0U4JzogZmFsc2UsIFxyXG4gICAgICAgICdGMSc6IGZhbHNlLCAnRjInOiBmYWxzZSwgJ0YzJzogZmFsc2UsICdGNCc6IGZhbHNlLCAnRjUnOiBmYWxzZSwgJ0Y2JzogZmFsc2UsICdGNyc6IGZhbHNlLCAnRjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0cxJzogZmFsc2UsICdHMic6IGZhbHNlLCAnRzMnOiBmYWxzZSwgJ0c0JzogZmFsc2UsICdHNSc6IGZhbHNlLCAnRzYnOiBmYWxzZSwgJ0c3JzogZmFsc2UsICdHOCc6IGZhbHNlLCBcclxuICAgICAgICAnSDEnOiBmYWxzZSwgJ0gyJzogZmFsc2UsICdIMyc6IGZhbHNlLCAnSDQnOiBmYWxzZSwgJ0g1JzogZmFsc2UsICdINic6IGZhbHNlLCAnSDcnOiBmYWxzZSwgJ0g4JzogZmFsc2UgXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IF9ib2FyZFNoaXBzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0Qm9hcmRHcmlkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZEdyaWRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRCb2FyZFNoaXBzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcHVsYXRlR2FtZWJvYXJkID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUoIGluZGV4IDwgY29vcmRpbmF0ZXMubGVuZ3RoICl7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXAoY29vcmRpbmF0ZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KSBYXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBpZihpc0Nvb3Jkc0F2YWlsYWJsZShjb29yZGluYXRlcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwICA9IFNoaXAoLi4uY29vcmRpbmF0ZXMpIFxyXG4gICAgICAgICAgICBfYm9hcmRTaGlwcyA9IGFkZFNoaXBUb1NoaXBzQXJyYXkoc2hpcClcclxuICAgICAgICAgICAgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0KHNoaXApXHJcbiAgICAgICAgICAgIHJldHVybiBzaGlwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBJbmNvbWluZy1xdWVyeSAoYXNzZXJ0IHJlc3VsdClcclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2tGcm9tQ29tcHV0ZXIgPSAoY29vcmRzKT0+e1xyXG4gICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgLy8gaXNXaXRoSGl0Q2xhc3MoY29vcmRzKVxyXG4gICAgICAgIGlmKGlzQXR0YWNrVmFsaWQoY29vcmRzKSAmJiBpc1NoaXBIaXQoY29vcmRzKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBmaW5kU2hpcEJ5Q29vcmRzKGNvb3JkcylcclxuICAgICAgICAgICAgaWYoc2hpcC5pc1N1bmtOZXh0SGl0KCkpe1xyXG4gICAgICAgICAgICAgICAgX2JvYXJkU2hpcHMgPSByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkoc2hpcCxjb29yZHMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNoaXBTcXVhcmUoY29vcmRzLHNoaXApXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyID0gKGNvb3Jkcyk9PntcclxuICAgICAgICBjb25zb2xlLmRpcihjb29yZHMpXHJcbiAgICAgICAgLy8gaXNXaXRoSGl0Q2xhc3MoY29vcmRzKVxyXG4gICAgICAgIGlmKGlzU2hpcEhpdChjb29yZHMpKXtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGZpbmRTaGlwQnlDb29yZHMoY29vcmRzKVxyXG4gICAgICAgICAgICBpZihzaGlwLmlzU3Vua05leHRIaXQoKSl7XHJcbiAgICAgICAgICAgICAgICBfYm9hcmRTaGlwcyA9IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheShzaGlwLGNvb3JkcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfYm9hcmRHcmlkID0gcmVtb3ZlU2hpcFNxdWFyZShjb29yZHMsc2hpcClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU2hpcFNxdWFyZSA9IChjb29yZHMsc2hpcCkgPT57XHJcbiAgICAgICAgc2hpcC5yZW1vdmVTcXVhcmVIaXQoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0KGNvb3JkcylcclxuICAgIH1cclxuIFxyXG4gICAgLy8gUXVlcnkgJiBDb21tYW5kIHNlbGYgeFxyXG4gICAgY29uc3QgYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0ID0gKHNoaXApID0+e1xyXG4gICAgICAgIHNoaXAuZ2V0U2hpcENvb3JkKCkuZm9yRWFjaChjb29yZCA9PntcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoX2JvYXJkR3JpZCkuZm9yRWFjaChrZXkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihrZXkgPT09IGNvb3JkKSB7X2JvYXJkR3JpZFtrZXldID0gdHJ1ZX0gXHJcbiAgICAgICAgICAgIH0pICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkU2hpcFRvU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gWy4uLl9ib2FyZFNoaXBzLHNoaXBdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsuLi5fYm9hcmRHcmlkfSwge1tgJHtjb29yZHN9YF06ICdIaXQnfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkgPSAoc2hpcCxjb29yZHMpID0+e1xyXG4gICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGZpbmRTaGlwSW5kZXhCeUNvb3JkcyhzaGlwLGNvb3JkcykgLy9GSU5EIElUIEJZIENPT1JESU5BVEUsIE5BTUUgSVMgTk9UIFJFTElBQkxFIE5PV1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNoaXBJbmRleClcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmlsdGVyKGFycmF5U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmluZGV4T2YoYXJyYXlTaGlwKSAhPT0gc2hpcEluZGV4IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiBcclxuICAgIGNvbnN0IGZpbmRTaGlwQnlDb29yZHMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBsZXQgaGl0U2hpcCA9IF9ib2FyZFNoaXBzLmZpbmQoc2hpcCA9PntcclxuICAgICAgICAgICAgaWYoc2hpcC5nZXRTaGlwQ29vcmQoKS5pbmNsdWRlcyhjb29yZHMpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzaGlwLmdldFNoaXBDb29yZCgpLmluY2x1ZGVzKGNvb3JkcykgICAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoaGl0U2hpcCkgcmV0dXJuIGhpdFNoaXBcclxuICAgICAgICBpZighaGl0U2hpcCkgcmV0dXJuIG51bGxcclxuICAgIH1cclxuICAgIGNvbnN0IGZpbmRTaGlwSW5kZXhCeUNvb3JkcyA9IChzaGlwLGNvb3JkcykgPT57XHJcbiAgICAgICAgLy8gdHJhdmVyc2UgYm9hcmRfc2hpcFxyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maW5kSW5kZXgoY3VycmVudFNoaXAgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50U2hpcC5nZXRTaGlwQ29vcmQoKS5pbmNsdWRlcyhjb29yZHMpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zdCBmaW5kU2hpcEluZGV4QnlOYW1lID0gKHNoaXApID0+e1xyXG4gICAgLy8gICAgIHJldHVybiBfYm9hcmRTaGlwcy5maW5kSW5kZXgoY3VycmVudFNoaXAgPT57XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBjdXJyZW50U2hpcC5nZXRTaGlwTmFtZSgpID09PSBzaGlwLmdldFNoaXBOYW1lKClcclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfVxyXG5cclxuICAgIGNvbnN0IGlzU2hpcEhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgLy8gaXQgbmVlZHMgdG9cclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkcyl7XHJcbiAgICAgICAgICAgICAgICBpZihfYm9hcmRHcmlkW2tleV0gPT09IHRydWUgJiYgX2JvYXJkR3JpZFtrZXldICE9PSBmYWxzZSAmJiBfYm9hcmRHcmlkW2tleV0gIT09ICdIaXQnICl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWUgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc0FsbFNoaXBzU3VuayA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiAoX2JvYXJkU2hpcHMubGVuZ3RoID09PSAwKSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzQ29vcmRzQXZhaWxhYmxlID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgbGV0IGluZGV4QXJyYXkgPSAwXHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHNbaW5kZXhBcnJheV0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzV2l0aEhpdENsYXNzPSAoY29vcmRzKT0+e1xyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgICAgIGxldCBjb29yZCA9ICBhcnJheS5maW5kKHNxdWFyZSA9PntcclxuICAgICAgICAgICAgc3F1YXJlLmlkID09PSBjb29yZHMgJiYgc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucygnaGl0JylcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkKVxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgY29uc3QgaXNBdHRhY2tWYWxpZCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGZvcihjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyhfYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmRzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoX2JvYXJkR3JpZFtrZXldKSA9PT0gJ0hpdCcgfHwgZmFsc2UgPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRCb2FyZEdyaWQsXHJcbiAgICAgICAgZ2V0Qm9hcmRTaGlwcyxcclxuICAgICAgICBjcmVhdGVTaGlwLFxyXG4gICAgICAgIGdldFNoaXBMZW5ndGhCeU5hbWUsXHJcbiAgICAgICAgcG9wdWxhdGVHYW1lYm9hcmQsXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIsXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFja0Zyb21Db21wdXRlcixcclxuICAgICAgICBpc0FsbFNoaXBzU3VuayxcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNoaXBMZW5ndGhCeU5hbWUgPSAoc2hpcE5hbWUpID0+e1xyXG4gICAgY29uc3QgX1NISVBfTkFNRVMgPSB7XHJcbiAgICAgICAgJ3NweS0xJzogMSxcclxuICAgICAgICAnc3B5LTInOiAxLFxyXG4gICAgICAgICdzcHktMyc6IDEsXHJcbiAgICAgICAgJ2Rlc3Ryb3llci0xJzogMixcclxuICAgICAgICAnZGVzdHJveWVyLTInOiAyLFxyXG4gICAgICAgICdkZXN0cm95ZXItMyc6IDIsXHJcbiAgICAgICAgJ2NydWlzZXInOiAzLFxyXG4gICAgICAgICdiYXR0bGVzaGlwJzogNCxcclxuICAgICAgICAnY2Fycmllcic6IDVcclxuICAgIH1cclxuICAgIHJldHVybiBfU0hJUF9OQU1FU1tzaGlwTmFtZV1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgXHJcbiAgICBcclxuICAgIHJlbmRlclR1cm4sXHJcbiAgICByZW5kZXJEcmFnRW50ZXIsXHJcbiAgICByZW5kZXJEcmFnU3RhcnQsXHJcbiAgICByZW5kZXJEcmFnT3ZlcixcclxuICAgIHJlbmRlckRyYWdMZWF2ZSxcclxuICAgIGhhbmRsZURyb3BFdmVudFxyXG5cclxufSBmcm9tICcuLi92aWV3L3JlbmRlckR5bmFtaWNFbGVtZW50cydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2sgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT57XHJcbiAgICAgICAgICAgIHByb2Nlc3NUdXJuRGF0YShnYW1lLGV2ZW50KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5jb25zdCBwcm9jZXNzVHVybkRhdGEgPSAoZ2FtZSxldmVudCkgPT57XHJcbiAgICBjb25zdCB0dXJuRGF0YSA9IGdhbWUuZ2FtZVR1cm4oZXZlbnQudGFyZ2V0LmlkKVxyXG4gICAgY29uc29sZS5sb2codHVybkRhdGEpXHJcbiAgICBpZih0dXJuRGF0YSA9PT0gbnVsbCkgcmV0dXJuICAgICAgXHJcbiAgICByZW5kZXJUdXJuKHR1cm5EYXRhLGV2ZW50KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHMgPSAoZ2FtZSkgPT57XHJcbiAgICBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlKClcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnKGdhbWUpXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZERyYWcgKGdhbWUpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNQbGF5ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc1BsYXllci5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJyxyZW5kZXJEcmFnRW50ZXIpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJyxyZW5kZXJEcmFnT3ZlcilcclxuICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJyxyZW5kZXJEcmFnTGVhdmUpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLChldmVudCkgPT57XHJcbiAgICAgICAgICAgIGhhbmRsZURyb3BFdmVudChldmVudCxnYW1lKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSgpe1xyXG4gICAgY29uc3Qgc2hpcHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb29sLXNoaXAucGxheWVyMScpKVxyXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwPT5cclxuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcscmVuZGVyRHJhZ1N0YXJ0KSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzICgpe1xyXG4gICAgY29uc3QgZ3JpZFNxdWFyZXNDb21wdXRlciA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGdyaWRTcXVhcmVzQ29tcHV0ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc1R1cm5EYXRhKVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJUb2dnbGVEaXJlY3Rpb24gKGdhbWUpe1xyXG4gICAgY29uc3QgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXHJcbiAgICB0b2dnbGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgIChnYW1lLmdldERpcmVjdGlvbigpID09PSAnVmVydGljYWwnKSBcclxuICAgICAgICAgICAgPyBnYW1lLnNldERpcmVjdGlvbignSG9yaXpvbnRhbCcsdG9nZ2xlQnV0dG9uKSBcclxuICAgICAgICAgICAgOiBnYW1lLnNldERpcmVjdGlvbignVmVydGljYWwnLHRvZ2dsZUJ1dHRvbilcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBnZXRTaGlwTGVuZ3RoQnlOYW1lIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVUdXJuRGF0YSA9ICh0dXJuRGF0YSkgPT57XHJcbiAgICBjb25zdCBwbGF5ZXJEYXRhICAgICAgPSB0dXJuRGF0YS5pc1BsYXllckF0dGFja01pc3NcclxuICAgIGNvbnN0IGNvbXB1dGVyRGF0YSAgICA9IHR1cm5EYXRhLmlzQ29tcHV0ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckNvb3JkcyAgPSB0dXJuRGF0YS5jb21wdXRlckNvb3Jkc1xyXG4gICAgY29uc3QgYXR0YWNrZWRFbGVtZW50ID0gZmluZEhpdEVsZW1lbnQoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgcmV0dXJuIHsgcGxheWVyRGF0YSxjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudCB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXRyaWV2ZURhdGFEcm9wID0gKGV2ZW50KSA9PntcclxuICAgIGNvbnN0IHNoaXBJRCAgICAgICA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJylcclxuICAgIGNvbnN0IHNxdWFyZUlEICAgICA9IGV2ZW50LnRhcmdldC5pZCBcclxuICAgIGxldCBzcXVhcmVzVG9TdHlsZSA9IGdldFNoaXBMZW5ndGhCeU5hbWUoc2hpcElEKVxyXG5cclxuICAgIHJldHVybiB7c2hpcElELHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVEYXRhQm9hcmRWZXJ0ID0gKHNxdWFyZUlELHNoaXBJRCkgPT57XHJcbiAgICBjb25zdCBib2FyZEdyaWRBcnJheSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjEgPiAuZ3JpZC1zcXVhcmUnKSlcclxuICAgIGNvbnN0IHNoaXBJblBvb2wgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG4gICAgbGV0IGluZGV4VG9TdHlsZSAgICAgPSBib2FyZEdyaWRBcnJheS5maW5kSW5kZXgoZWwgPT4gZWwuaWQgPT09IHNxdWFyZUlEKVxyXG5cclxuICAgIHJldHVybiB7Ym9hcmRHcmlkQXJyYXksc2hpcEluUG9vbCwgaW5kZXhUb1N0eWxlfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVEYXRhQm9hcmRIb3JpeiA9IChzcXVhcmVJRCxzaGlwSUQpID0+e1xyXG4gICAgY29uc3QgZWxlbWVudFRvU3R5bGUgICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NxdWFyZUlEfWApXHJcbiAgICBjb25zdCBzaGlwSW5Qb29sICAgICAgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2hpcElEKVxyXG5cclxuICAgIHJldHVybiB7ZWxlbWVudFRvU3R5bGUsIHNoaXBJblBvb2x9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc1ZlcnRQbGFjZW1lbnRWYWxpZCA9IChpbmRleFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsIGJvYXJkR3JpZEFycmF5KSA9PntcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzcXVhcmVzVG9TdHlsZTsgaW5kZXgrKykge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gYm9hcmRHcmlkQXJyYXlbaW5kZXhUb1N0eWxlXVxyXG4gICAgICAgIGlmKCBpc092ZXJmbG93Qm90dG9tKGVsZW1lbnQpIHx8IGlzT3ZlcmxhcChlbGVtZW50KSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleFRvU3R5bGUgKz0gOFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzSG9yaXpQbGFjZW1lbnRWYWxpZCA9IChlbGVtZW50LHNxdWFyZXNUb1N0eWxlKSA9PntcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzcXVhcmVzVG9TdHlsZTsgaW5kZXgrKykge1xyXG4gICAgICAgIGlmKGlzT3ZlcmZsb3dCb3R0b21TaWRlKGVsZW1lbnQpIHx8IGlzT3ZlcmxhcChlbGVtZW50KSB8fCBpc092ZXJmbG93U2lkZShlbGVtZW50LGluZGV4KSApe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59IFxyXG5cclxuZXhwb3J0IGNvbnN0IGlzT3ZlcmxhcCA9IChlbGVtZW50KSA9PntcclxuICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc2hpcCcpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc092ZXJmbG93Qm90dG9tID0gKGVsZW1lbnQpID0+e1xyXG4gICAgcmV0dXJuIGVsZW1lbnQgPT09IHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNPdmVyZmxvd0JvdHRvbVNpZGUgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgcmV0dXJuICgoZWxlbWVudCA9PT0gbnVsbCkgKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNPdmVyZmxvd1NpZGUgPSAoZWxlbWVudCxpbmRleCkgPT4ge1xyXG4gICAgcmV0dXJuIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncm93JykgJiYgaW5kZXggIT09IDApXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgZmluZEhpdEVsZW1lbnQgPSAoY29vcmRzKSA9PntcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucGxheWVyMSA+ICMke2Nvb3Jkc31gKVxyXG59IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUGxheWVyKG5hbWUpe1xyXG4gICAgY29uc3QgX3BsYXllck5hbWUgPSBuYW1lXHJcblxyXG4gICAgbGV0IF9nYW1lYm9hcmRcclxuXHJcbiAgICBsZXQgX2F0dGFja2VkU3F1YXJlcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3BsYXllck5hbWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2dhbWVib2FyZFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldEF0dGFja2VkU3F1YXJlcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYXR0YWNrZWRTcXVhcmVzXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2V0QXR0YWNrZWRTcXVhcmVzID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgX2F0dGFja2VkU3F1YXJlcy5wdXNoKGNvb3JkcylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoY29vcmRpbmF0ZXMpID0+e1xyXG4gICAgICAgIF9nYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIF9nYW1lYm9hcmQucG9wdWxhdGVHYW1lYm9hcmQoY29vcmRpbmF0ZXMpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHNlbmRBdHRhY2tDb29yZHNUb0dhbWUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICAvLyBkZWJ1Z2dlclxyXG4gICAgICAgIGlmKGdldEF0dGFja2VkU3F1YXJlcygpLmluY2x1ZGVzKGNvb3JkcykpIHJldHVybiBudWxsXHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGNvb3JkcylcclxuICAgICAgICByZXR1cm4gY29vcmRzXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICAgICAgY29uc3QgYm9hcmRHcmlkID0gT2JqZWN0LmtleXMoZ2FtZWJvYXJkLmdldEJvYXJkR3JpZCgpKVxyXG4gICAgICAgIGNvbnN0IEJPQVJEX0dSSURfTEVOR1RIID0gYm9hcmRHcmlkLmxlbmd0aFxyXG4gICAgICAgIGxldCBpbmRleCA9IGdlbmVyYXRlUmFuZG9tTnVtYmVyKDAsQk9BUkRfR1JJRF9MRU5HVEgpXHJcbiAgICAgICAgd2hpbGUoZ2V0QXR0YWNrZWRTcXVhcmVzKCkuaW5jbHVkZXMoYm9hcmRHcmlkW2luZGV4XSkpe1xyXG4gICAgICAgICAgICBpbmRleCA9IGdlbmVyYXRlUmFuZG9tTnVtYmVyKDAsQk9BUkRfR1JJRF9MRU5HVEgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNldEF0dGFja2VkU3F1YXJlcyhib2FyZEdyaWRbaW5kZXhdKVxyXG4gICAgICAgIHJldHVybiBib2FyZEdyaWRbaW5kZXhdXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tTnVtYmVyID0gKG1heCxtaW4pID0+e1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc1BsYXllckRlZmVhdGVkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChfZ2FtZWJvYXJkLmdldEJvYXJkU2hpcHMoKS5sZW5ndGggPT09IDApID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGdldE5hbWUsXHJcbiAgICAgICAgZ2V0R2FtZWJvYXJkLFxyXG4gICAgICAgIGdldEF0dGFja2VkU3F1YXJlcyxcclxuICAgICAgICBzZXRBdHRhY2tlZFNxdWFyZXMsXHJcbiAgICAgICAgY3JlYXRlR2FtZUJvYXJkLFxyXG4gICAgICAgIHNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUsXHJcbiAgICAgICAgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBpc1BsYXllckRlZmVhdGVkXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gU2hpcCguLi5jb29yZGluYXRlcyl7XHJcblxyXG4gICAgbGV0IF9zaGlwQ29vcmQgPSBjb29yZGluYXRlc1xyXG5cclxuICAgIGNvbnN0IF9TSElQX05BTUVTID0ge1xyXG4gICAgICAgIDEgOiAnU3B5JyxcclxuICAgICAgICAyIDogJ0Rlc3Ryb3llcicsXHJcbiAgICAgICAgMyA6ICdDcnVpc2VyJyxcclxuICAgICAgICA0IDogJ0JhdHRsZXNoaXAnLFxyXG4gICAgICAgIDUgOiAnQ2FycmllcidcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBfc2hpcE5hbWUgPSBfU0hJUF9OQU1FU1tfc2hpcENvb3JkLmxlbmd0aF1cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0U2hpcE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgZ2V0U2hpcENvb3JkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmRcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gSW5jb21pbmcgcXVlcnkgKGFzc2VydCByZXN1bHQgPiB0ZXN0ZWQgd2l0aCByZW1vdmVTcXVhcmVIaXQpXHJcbiAgICBjb25zdCBmaW5kSGl0SW5kZXggPSAoY29vcmRzKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5pbmRleE9mKGNvb3JkcykgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFNlbGYgY29tbWFuZCB4XHJcbiAgICBjb25zdCByZW1vdmVTcXVhcmVIaXQgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBjb25zdCBpbmRleENvb3JkID0gZmluZEhpdEluZGV4KGNvb3JkcylcclxuICAgICAgICBfc2hpcENvb3JkID0gX3NoaXBDb29yZC5maWx0ZXIoY29vcmQgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmQpICE9PSBpbmRleENvb3JkIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHVyZSAvIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGlzU3Vua05leHRIaXQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5sZW5ndGggPD0gMSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFNoaXBOYW1lLFxyXG4gICAgICAgIGdldFNoaXBDb29yZCxcclxuICAgICAgICBpc1N1bmtOZXh0SGl0LFxyXG4gICAgICAgIHJlbW92ZVNxdWFyZUhpdFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFxyXG5cclxuICAgIHJldHJpZXZlRGF0YURyb3AsXHJcbiAgICByZXRyaWV2ZVR1cm5EYXRhLFxyXG4gICAgcmV0cmlldmVEYXRhQm9hcmRWZXJ0LFxyXG4gICAgcmV0cmlldmVEYXRhQm9hcmRIb3JpeixcclxuICAgIGlzSG9yaXpQbGFjZW1lbnRWYWxpZCxcclxuICAgIGlzVmVydFBsYWNlbWVudFZhbGlkLFxyXG5cclxufSBmcm9tICcuLi9sb2dpYy9oYW5kbGVTdHlsaW5nRXZlbnRzRGF0YSdcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyVHVybiA9ICh0dXJuRGF0YSxldmVudCkgPT57XHJcbiAgICBjb25zdCB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfSA9IFxyXG4gICAgICAgIHJldHJpZXZlVHVybkRhdGEodHVybkRhdGEpXHJcblxyXG4gICAgcmVuZGVyQm9hcmRTcXVhcmVzKHBsYXllckRhdGEsIGV2ZW50LnRhcmdldClcclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudClcclxuXHJcbiAgICByZW5kZXJUdXJuSW5mbyh0dXJuRGF0YSx0dXJuRGF0YS5wbGF5ZXIxKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTWF0Y2hSZXN1bHQgPSAocGxheWVyRGF0YSkgPT57XHJcbiAgICBjb25zdCB3aW5uZXIgPSBwbGF5ZXJEYXRhLnBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIFxyXG4gICAgICAgID8gJ0NvbXB1dGVyJ1xyXG4gICAgICAgIDogcGxheWVyRGF0YS5wbGF5ZXIxLmdldE5hbWUoKSAgIFxyXG5cclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3dpbm5lcn1gICsgJyBpcyB0aGUgd2lubmVyIScgXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJEcmFnU3RhcnQgKGV2ZW50KSB7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsZXZlbnQudGFyZ2V0LmlkKVxyXG59XHJcbiAgICBcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRyYWdFbnRlciAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKVxyXG59XHJcbiAgICBcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRyYWdPdmVyIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJEcmFnTGVhdmUgKGV2ZW50KSB7XHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJylcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZURyb3BFdmVudCA9IChldmVudCxnYW1lKSA9PntcclxuICAgIGNvbnN0IHtzaGlwSUQsIHNxdWFyZUlEICxzcXVhcmVzVG9TdHlsZX0gPSByZXRyaWV2ZURhdGFEcm9wKGV2ZW50KVxyXG4gICAgY29uc3QgcmVuZGVyRGlyZWN0aW9uID0gKGdhbWUuZ2V0RGlyZWN0aW9uKCkgPT09ICdWZXJ0aWNhbCcpXHJcbiAgICAgICAgPyByZW5kZXJTaGlwVmVydCBcclxuICAgICAgICA6IHJlbmRlclNoaXBIb3JpelxyXG5cclxuICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZW5kZXJEaXJlY3Rpb24oc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKVxyXG4gICAgcmVtb3ZlQm9hcmRNYXJrKGV2ZW50KVxyXG4gICAgaWYoIXNoaXBDb29yZHMpIHJldHVyblxyXG5cclxuICAgIGdhbWUuc2V0Q29vcmRzQXJyYXkoc2hpcENvb3JkcylcclxuICAgIGdhbWUuY2hlY2tGb3JHYW1lUHJlcGFyZWQoZ2FtZSxnYW1lLmdldFBsYXllcjEoKSxnYW1lLmdldFBsYXllcjIoKSlcclxufVxyXG5cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBWZXJ0ID0gKHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlLHNoaXBJRCkgPT57XHJcbiAgICBsZXQgeyBib2FyZEdyaWRBcnJheSxzaGlwSW5Qb29sLCBpbmRleFRvU3R5bGUgfSA9XHJcbiAgICAgICAgcmV0cmlldmVEYXRhQm9hcmRWZXJ0KHNxdWFyZUlELHNoaXBJRClcclxuXHJcbiAgICBpZighaXNWZXJ0UGxhY2VtZW50VmFsaWQoaW5kZXhUb1N0eWxlLHNxdWFyZXNUb1N0eWxlLCBib2FyZEdyaWRBcnJheSkpIHJldHVyblxyXG4gICAgXHJcbiAgICBsZXQgY29vcmRzID0gW11cclxuICAgIHJlbmRlclNxdWFyZXNWZXJ0KGluZGV4VG9TdHlsZSxzcXVhcmVzVG9TdHlsZSxib2FyZEdyaWRBcnJheSxjb29yZHMpXHJcbiAgICByZW1vdmVQb29sU2hpcChzaGlwSW5Qb29sKVxyXG4gICAgcmV0dXJuIGNvb3Jkc1xyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZXNWZXJ0ID0gKGluZGV4VG9TdHlsZSxzcXVhcmVzVG9TdHlsZSxib2FyZEdyaWRBcnJheSxjb29yZHMpID0+e1xyXG4gICAgd2hpbGUoc3F1YXJlc1RvU3R5bGUgPiAwKXtcclxuICAgICAgICBsZXQgZWxlbWVudFRvU3R5bGUgPSBib2FyZEdyaWRBcnJheVtpbmRleFRvU3R5bGVdXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgY29vcmRzLnB1c2goZWxlbWVudFRvU3R5bGUuaWQpXHJcbiAgICAgICAgaW5kZXhUb1N0eWxlICs9IDhcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tXHJcbiAgICB9ICBcclxufVxyXG4gIFxyXG5jb25zdCByZW5kZXJTaGlwSG9yaXogPSAoc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKSA9PntcclxuICAgIGxldCB7ZWxlbWVudFRvU3R5bGUsIHNoaXBJblBvb2x9ID0gcmV0cmlldmVEYXRhQm9hcmRIb3JpeihzcXVhcmVJRCxzaGlwSUQpXHJcbiAgICBcclxuICAgIGlmKCFpc0hvcml6UGxhY2VtZW50VmFsaWQoZWxlbWVudFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUpKSByZXR1cm5cclxuICAgIFxyXG4gICAgbGV0IGNvb3JkcyA9IFtdXHJcbiAgICByZW5kZXJTcXVhcmVzSG9yaXooZWxlbWVudFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsY29vcmRzKVxyXG4gICAgcmVtb3ZlUG9vbFNoaXAoc2hpcEluUG9vbClcclxuICAgIFxyXG4gICAgcmV0dXJuIGNvb3JkcyAgICAgXHJcbn1cclxuICAgIFxyXG5jb25zdCByZW5kZXJTcXVhcmVzSG9yaXogPSAoZWxlbWVudFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsY29vcmRzKSA9PntcclxuICAgIHdoaWxlKHNxdWFyZXNUb1N0eWxlID4gMCl7XHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICBjb29yZHMucHVzaChlbGVtZW50VG9TdHlsZS5pZClcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tIFxyXG4gICAgfVxyXG59XHJcbiAgICBcclxuY29uc3QgcmVtb3ZlUG9vbFNoaXAgPSAoc2hpcEluUG9vbCkgPT57XHJcbiAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxyXG4gICAgc2hpcEluUG9vbC5yZW1vdmVBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpXHJcbn1cclxuXHJcbmNvbnN0IHJlbW92ZUJvYXJkTWFyayA9IChldmVudCkgPT57XHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJylcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRTcXVhcmVzID0gKHR1cm5EYXRhLCBlbGVtZW50KSA9PntcclxuICAgIGlmKGlzSGl0RWxlbWVudChlbGVtZW50KSkgcmV0dXJuICBcclxuICAgICh0dXJuRGF0YSkgPyByZW5kZXJTcXVhcmVPbk1pc3MoZWxlbWVudCkgOiByZW5kZXJTcXVhcmVPbkhpdChlbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCBpc0hpdEVsZW1lbnQgPSAoZWxlbWVudCkgPT57XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIHx8IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJylcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3F1YXJlT25IaXQgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uTWlzcyAgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtaXNzJylcclxufVxyXG5cclxuY29uc3QgcmVuZGVyVHVybkluZm8gPSAodHVybkRhdGEscGxheWVyMSkgPT57XHJcbiAgICBjb25zdCBtYXRjaEluZm9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXJuLWluZm8nKVxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLmdldE5hbWUoKX0gYXR0YWNrIGlzIGEgYCBcclxuICAgICsgKHR1cm5EYXRhLmlzUGxheWVyQXR0YWNrTWlzcykgPyAnbWlzcyEnIDogJ2hpdCEnXHJcbiAgXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlcldhcm5pbmdzSW5mbyA9ICgpID0+e1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwT25TaW5rID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RhdGljRWxlbWVudHMocGxheWVyMSwgcGxheWVyMil7XHJcbiAgICByZW5kZXJCb2FyZE9uUmVzZXQoKVxyXG4gICAgcmVuZGVyUGxheWVyTmFtZXMocGxheWVyMSwgcGxheWVyMilcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcHMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBpbmRleCA9IDBcclxuICAgIGNvbnN0IGJvYXJkR3JpZCA9IGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgaWYoYm9hcmRHcmlkW2tleV0pe1xyXG4gICAgICAgICAgICBib2FyZEdyaWRBcnJheVtpbmRleF0uY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4KytcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNvbnN0IHJlbmRlclBsYXllck5hbWVzID0gKHBsYXllcjEsIHBsYXllcjIpID0+e1xyXG4gICAgY29uc3QgcGxheWVyMU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMS1uYW1lJylcclxuICAgIGNvbnN0IHBsYXllcjJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjItbmFtZScpXHJcblxyXG4gICAgcGxheWVyMU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXIxLmdldE5hbWUoKSArICcgXFwncyBmbGVldCdcclxuICAgIHBsYXllcjJOYW1lLnRleHRDb250ZW50ID0gcGxheWVyMi5nZXROYW1lKCkgKyAnIFxcJ3MgZmxlZXQnXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkT25SZXNldCA9ICgpID0+e1xyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkxID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuXHJcbiAgICBib2FyZEdyaWRBcnJheTEuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJylcclxuICAgIH0pXHJcbiAgICBib2FyZEdyaWRBcnJheTIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKVxyXG4gICAgfSkgXHJcblxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSAgJydcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUsY2hlY2tGb3JHYW1lUHJlcGFyZWR9IGZyb20gJy4vbG9naWMvZ2FtZSdcclxuaW1wb3J0IHthZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2ssYWRkRXZlbnRMaXN0ZW5lclRvZ2dsZURpcmVjdGlvbixhZGRFdmVudExpc3RlbmVyc0RyYWdTaGlwc30gZnJvbSAnLi9sb2dpYy9oYW5kbGVFdmVudExpc3RlbmVycydcclxuXHJcbmNvbnN0IHByZXBhcmVHYW1lID0gKGdhbWUpID0+e1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHMoZ2FtZSlcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJUb2dnbGVEaXJlY3Rpb24oZ2FtZSlcclxufVxyXG5cclxuY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG5wcmVwYXJlR2FtZShnYW1lKVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9