/******/ (() => { // webpackBootstrap
/******/ 	'use strict'
    /******/ 	var __webpack_modules__ = ({

        /***/ './src/logic/game.js':
        /*!***************************!*\
  !*** ./src/logic/game.js ***!
  \***************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__)
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   'Game': () => (/* binding */ Game)
                /* harmony export */ })
            /* harmony import */ var _view_renderStaticElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/renderStaticElements */ './src/view/renderStaticElements.js')
            /* harmony import */ var _view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/renderDynamicElements */ './src/view/renderDynamicElements.js')
            /* harmony import */ var _handleEventListeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handleEventListeners */ './src/logic/handleEventListeners.js')
            /* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ './src/logic/player.js')




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

                    const array = (Array.from(document.querySelectorAll('.player2 > .grid-square')))
                    let isvalid = true
                    array.forEach(square =>{
                        if(square.id === coords){
                            console.log(square)
                            if(square.classList.contains('hit') ||square.classList.contains('miss')){
                                isvalid = false
                            }
                        }
                    })

                    if(!isvalid) return null
                    // console.log(playerCoords)
                    // if(playerCoords === null) return null
                    let isPlayerAttackMiss   = enemyGameboard.receiveAttackFromPlayer(coords) 
                    console.log(isPlayerAttackMiss)
                    if(isPlayerAttackMiss === null) return null
        
                    playerInTurn = player2
                    enemyGameboard = player1.getGameboard()
        
                    let computerCoords       = playerInTurn.sendRandomAttackCoordsToGame(enemyGameboard)
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

        /***/ './src/logic/gameboard.js':
        /*!********************************!*\
  !*** ./src/logic/gameboard.js ***!
  \********************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__)
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   'Gameboard': () => (/* binding */ Gameboard),
                /* harmony export */   'getShipLengthByName': () => (/* binding */ getShipLengthByName)
                /* harmony export */ })
            /* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ './src/logic/ship.js')

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
                    // isWithHitClass(coords)
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

                const receiveAttackFromPlayer = (coords)=>{
                    // isWithHitClass(coords)
                    if(isShipHit(coords)){
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
                    debugger
                    const shipIndex = findShipIndexByName(ship)
                    return _boardShips.filter(arrayShip =>{
                        return _boardShips.indexOf(arrayShip) !== shipIndex 
                    })
                }
 
                const findShipByCoords = (coords) =>{
                    debugger
                    // console.log('LOOKING FOR '+ coords)
                    // console.log(_boardShips.forEach(ship=>console.log(ship.getShipCoord())))
                    let hitShip = _boardShips.find(ship =>{
                        // console.log(ship.getShipCoord())
                        if(ship.getShipCoord().includes(coords)){
                            // console.log('FOUND')
                            return ship.getShipCoord().includes(coords)    
                        } 
                    })
                    if (hitShip) return hitShip
                    if(!hitShip) return null
                }

                const findShipIndexByName = (ship) =>{
                    return _boardShips.findIndex(currentShip =>{
                        return currentShip.getShipName() === ship.getShipName()
                    })
                }

                const isShipHit = (coords) =>{
                    for(const [key] of Object.entries(_boardGrid)){
                        if(key === coords){
                            if(_boardGrid[key]){
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

        /***/ './src/logic/handleEventListeners.js':
        /*!*******************************************!*\
  !*** ./src/logic/handleEventListeners.js ***!
  \*******************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__)
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   'addEventListenerDraggable': () => (/* binding */ addEventListenerDraggable),
                /* harmony export */   'addEventListenerToggleDirection': () => (/* binding */ addEventListenerToggleDirection),
                /* harmony export */   'addEventListenersBoardClick': () => (/* binding */ addEventListenersBoardClick),
                /* harmony export */   'addEventListenersBoardDrag': () => (/* binding */ addEventListenersBoardDrag),
                /* harmony export */   'addEventListenersDragShips': () => (/* binding */ addEventListenersDragShips),
                /* harmony export */   'removeEventListeners': () => (/* binding */ removeEventListeners)
                /* harmony export */ })
            /* harmony import */ var _view_renderDynamicElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/renderDynamicElements */ './src/view/renderDynamicElements.js')


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

        /***/ './src/logic/handleStylingEventsData.js':
        /*!**********************************************!*\
  !*** ./src/logic/handleStylingEventsData.js ***!
  \**********************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__)
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   'findHitElement': () => (/* binding */ findHitElement),
                /* harmony export */   'isHorizPlacementValid': () => (/* binding */ isHorizPlacementValid),
                /* harmony export */   'isOverflowBottom': () => (/* binding */ isOverflowBottom),
                /* harmony export */   'isOverflowBottomSide': () => (/* binding */ isOverflowBottomSide),
                /* harmony export */   'isOverflowSide': () => (/* binding */ isOverflowSide),
                /* harmony export */   'isOverlap': () => (/* binding */ isOverlap),
                /* harmony export */   'isVertPlacementValid': () => (/* binding */ isVertPlacementValid),
                /* harmony export */   'retrieveDataBoardHoriz': () => (/* binding */ retrieveDataBoardHoriz),
                /* harmony export */   'retrieveDataBoardVert': () => (/* binding */ retrieveDataBoardVert),
                /* harmony export */   'retrieveDataDrop': () => (/* binding */ retrieveDataDrop),
                /* harmony export */   'retrieveTurnData': () => (/* binding */ retrieveTurnData)
                /* harmony export */ })
            /* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ './src/logic/gameboard.js')


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

        /***/ './src/logic/player.js':
        /*!*****************************!*\
  !*** ./src/logic/player.js ***!
  \*****************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__)
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   'Player': () => (/* binding */ Player)
                /* harmony export */ })
            /* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ './src/logic/gameboard.js')


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
                    getAttackedSquares,
                    setAttackedSquares,
                    createGameBoard,
                    sendRandomAttackCoordsToGame,
                    sendAttackCoordsToGame,
                    isPlayerDefeated
                }
            }

            /***/ }),

        /***/ './src/logic/ship.js':
        /*!***************************!*\
  !*** ./src/logic/ship.js ***!
  \***************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__)
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   'Ship': () => (/* binding */ Ship)
                /* harmony export */ })
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

        /***/ './src/view/renderDynamicElements.js':
        /*!*******************************************!*\
  !*** ./src/view/renderDynamicElements.js ***!
  \*******************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__)
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   'handleDropEvent': () => (/* binding */ handleDropEvent),
                /* harmony export */   'renderDragEnter': () => (/* binding */ renderDragEnter),
                /* harmony export */   'renderDragLeave': () => (/* binding */ renderDragLeave),
                /* harmony export */   'renderDragOver': () => (/* binding */ renderDragOver),
                /* harmony export */   'renderDragStart': () => (/* binding */ renderDragStart),
                /* harmony export */   'renderMatchResult': () => (/* binding */ renderMatchResult),
                /* harmony export */   'renderTurn': () => (/* binding */ renderTurn)
                /* harmony export */ })
            /* harmony import */ var _logic_handleStylingEventsData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logic/handleStylingEventsData */ './src/logic/handleStylingEventsData.js')



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

        /***/ './src/view/renderStaticElements.js':
        /*!******************************************!*\
  !*** ./src/view/renderStaticElements.js ***!
  \******************************************/
        /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

            __webpack_require__.r(__webpack_exports__)
            /* harmony export */ __webpack_require__.d(__webpack_exports__, {
                /* harmony export */   'renderStaticElements': () => (/* binding */ renderStaticElements)
                /* harmony export */ })
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

        /******/ 	})
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {}
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
        /******/ 		// Check if module is in cache
        /******/ 		var cachedModule = __webpack_module_cache__[moduleId]
        /******/ 		if (cachedModule !== undefined) {
            /******/ 			return cachedModule.exports
            /******/ 		}
        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = __webpack_module_cache__[moduleId] = {
            /******/ 			// no module.id needed
            /******/ 			// no module.loaded needed
            /******/ 			exports: {}
            /******/ 		}
        /******/ 	
        /******/ 		// Execute the module function
        /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__)
        /******/ 	
        /******/ 		// Return the exports of the module
        /******/ 		return module.exports
        /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
        /******/ 		// define getter functions for harmony exports
        /******/ 		__webpack_require__.d = (exports, definition) => {
            /******/ 			for(var key in definition) {
                /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
                    /******/ 				}
                /******/ 			}
            /******/ 		}
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
                /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
                /******/ 			}
            /******/ 			Object.defineProperty(exports, '__esModule', { value: true })
            /******/ 		}
        /******/ 	})()
    /******/ 	
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
        /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
        __webpack_require__.r(__webpack_exports__)
        /* harmony import */ var _logic_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic/game */ './src/logic/game.js')
        /* harmony import */ var _logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/handleEventListeners */ './src/logic/handleEventListeners.js')



        const prepareGame = (game) =>{
            (0,_logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__.addEventListenersDragShips)(game)
            ;(0,_logic_handleEventListeners__WEBPACK_IMPORTED_MODULE_1__.addEventListenerToggleDirection)(game)
        }

        const game = (0,_logic_game__WEBPACK_IMPORTED_MODULE_0__.Game)()
        prepareGame(game)


    })()

/******/ })()

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7OztVQzFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051RDtBQUM0RTtBQUNuSTtBQUNBO0FBQ0EsSUFBSSx1RkFBMEI7QUFDOUIsSUFBSSw2RkFBK0I7QUFDbkM7QUFDQTtBQUNBLGFBQWEsaURBQUk7QUFDakI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWUuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2hhbmRsZUV2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2hhbmRsZVN0eWxpbmdFdmVudHNEYXRhLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL3BsYXllci5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9zaGlwLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyRHluYW1pY0VsZW1lbnRzLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJTdGF0aWNFbGVtZW50cyB9IGZyb20gJy4uL3ZpZXcvcmVuZGVyU3RhdGljRWxlbWVudHMnXHJcbmltcG9ydCB7IHJlbmRlck1hdGNoUmVzdWx0IH0gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcbmltcG9ydCB7IHJlbW92ZUV2ZW50TGlzdGVuZXJzLCBhZGRFdmVudExpc3RlbmVyRHJhZ2dhYmxlLCBhZGRFdmVudExpc3RlbmVyc0JvYXJkRHJhZywgYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrIH0gZnJvbSAnLi9oYW5kbGVFdmVudExpc3RlbmVycydcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInXHJcbi8vIGltcG9ydCB7IGV4ZWN1dGVHYW1lIH0gZnJvbSAnL3NyYy9pbmRleCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lICgpe1xyXG4gICAgbGV0IHNoaXBEaXJlY3Rpb24gPSAnVmVydGljYWwnXHJcbiAgICBsZXQgY29vcmRzQXJyYXkgPSBbXVxyXG5cclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVib2FyZC1ncmlkLnBsYXllcjInKVxyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgndW5jbGlja2FibGUnKVxyXG5cclxuICAgIGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ1ZpY3RvcicpXHJcbiAgICBjb25zdCBwbGF5ZXIyID0gUGxheWVyKCdDb21wdXRlcicpXHJcbiAgICBsZXQgcGxheWVySW5UdXJuID0gcGxheWVyMlxyXG4gICAgbGV0IGdhbWVib2FyZDEgXHJcbiAgICBsZXQgZ2FtZWJvYXJkMiBcclxuICAgIGxldCBlbmVteUdhbWVib2FyZCA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKClcclxuXHJcbiAgICByZW5kZXJTdGF0aWNFbGVtZW50cyhwbGF5ZXIxLCBwbGF5ZXIyKVxyXG5cclxuICAgIGNvbnN0IGdhbWVUdXJuID0gKGNvb3JkcykgPT57IFxyXG4gICAgICAgIHBsYXllckluVHVybiA9IHBsYXllcjFcclxuICAgICAgICBlbmVteUdhbWVib2FyZCA9IHBsYXllcjIuZ2V0R2FtZWJvYXJkKCkgXHJcbiAgICAgICAgLy8gbGV0IHBsYXllckNvb3JkcyA9IHBsYXllckluVHVybi5zZW5kQXR0YWNrQ29vcmRzVG9HYW1lKGNvb3JkcylcclxuXHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSAoQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKSlcclxuICAgICAgICBsZXQgaXN2YWxpZCA9IHRydWVcclxuICAgICAgICBhcnJheS5mb3JFYWNoKHNxdWFyZSA9PntcclxuICAgICAgICAgICAgaWYoc3F1YXJlLmlkID09PSBjb29yZHMpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3F1YXJlKVxyXG4gICAgICAgICAgICAgICAgaWYoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucygnaGl0JykgfHxzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzdmFsaWQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYoIWlzdmFsaWQpIHJldHVybiBudWxsXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGxheWVyQ29vcmRzKVxyXG4gICAgICAgIC8vIGlmKHBsYXllckNvb3JkcyA9PT0gbnVsbCkgcmV0dXJuIG51bGxcclxuICAgICAgICBsZXQgaXNQbGF5ZXJBdHRhY2tNaXNzICAgPSBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrRnJvbVBsYXllcihjb29yZHMpIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzUGxheWVyQXR0YWNrTWlzcylcclxuICAgICAgICBpZihpc1BsYXllckF0dGFja01pc3MgPT09IG51bGwpIHJldHVybiBudWxsXHJcbiAgICAgICAgXHJcbiAgICAgICAgcGxheWVySW5UdXJuID0gcGxheWVyMlxyXG4gICAgICAgIGVuZW15R2FtZWJvYXJkID0gcGxheWVyMS5nZXRHYW1lYm9hcmQoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjb21wdXRlckNvb3JkcyAgICAgICA9IHBsYXllckluVHVybi5zZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lKGVuZW15R2FtZWJvYXJkKVxyXG4gICAgICAgIGxldCBpc0NvbXB1dGVyQXR0YWNrTWlzcyA9IGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2tGcm9tQ29tcHV0ZXIoY29tcHV0ZXJDb29yZHMpXHJcblxyXG4gICAgICAgIGlmKGlzQW55UGxheWVyRGVmZWF0ZWQoKSl7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VuY2xpY2thYmxlJylcclxuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKVxyXG4gICAgICAgICAgICByZW5kZXJNYXRjaFJlc3VsdCh7cGxheWVyMSxwbGF5ZXIyfSlcclxuICAgICAgICAgICAgcHJlcGFyZU5leHRNYXRjaCgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwbGF5ZXIxLFxyXG4gICAgICAgICAgICBpc1BsYXllckF0dGFja01pc3MsXHJcbiAgICAgICAgICAgIGlzQ29tcHV0ZXJBdHRhY2tNaXNzLFxyXG4gICAgICAgICAgICBjb21wdXRlckNvb3Jkc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hQbGF5ZXJzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gcGxheWVyMSA6IHBsYXllcjJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hHYW1lYm9hcmRzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChwbGF5ZXJJblR1cm4gPT09IHBsYXllcjIpID8gZ2FtZWJvYXJkMSA6IGdhbWVib2FyZDJcclxuICAgIH0gICBcclxuXHJcbiAgICBjb25zdCBpc0FueVBsYXllckRlZmVhdGVkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIHx8IHBsYXllcjIuaXNQbGF5ZXJEZWZlYXRlZCgpXHJcbiAgICB9IFxyXG5cclxuICAgIC8vIGNvbnN0IHByZXBhcmVOZXh0TWF0Y2ggPSAoKSA9PntcclxuICAgIC8vICAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZyb20gYm9hcmRcclxuICAgIC8vICAgICBzZXRUaW1lb3V0KCwyMDAwKVxyXG4gICAgLy8gfVxyXG5cclxuICBcclxuICAgIGNvbnN0IHNldENvb3Jkc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIGNvb3Jkc0FycmF5LnB1c2goc2hpcClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRDb29yZHNBcnJheSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjb29yZHNBcnJheVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldERpcmVjdGlvbiA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzaGlwRGlyZWN0aW9uIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFBsYXllcjEgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVyMVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFBsYXllcjIgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVyMlxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFBsYXllckluVHVybiA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJJblR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQyID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGdhbWVib2FyZDJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXREaXJlY3Rpb24gPSAoZGlyZWN0aW9uLGVsZW1lbnQpID0+e1xyXG4gICAgICAgIHNoaXBEaXJlY3Rpb24gPSBkaXJlY3Rpb25cclxuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gZGlyZWN0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2hlY2tGb3JHYW1lUHJlcGFyZWQgPSAoZ2FtZSkgPT57XHJcbiAgICAgICAgaWYgKGdhbWUuZ2V0Q29vcmRzQXJyYXkoKS5sZW5ndGggPj0gOSl7XHJcbiAgICAgICAgICAgIGdhbWUuZ2V0UGxheWVyMSgpLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICAgICAgICAgIGdhbWUuZ2V0Q29vcmRzQXJyYXkoKVxyXG4gICAgICAgICAgICApICBcclxuXHJcbiAgICAgICAgICAgIGdhbWUuZ2V0UGxheWVyMigpLmNyZWF0ZUdhbWVCb2FyZChbXHJcbiAgICAgICAgICAgICAgICBbJ0ExJ10sXHJcbiAgICAgICAgICAgICAgICBbJ0IxJ10sXHJcbiAgICAgICAgICAgICAgICBbJ0MxJ10sXHJcbiAgICAgICAgICAgICAgICBbJ0QxJywnRDInXSxcclxuICAgICAgICAgICAgICAgIFsnRTEnLCdFMiddLFxyXG4gICAgICAgICAgICAgICAgWydGMScsJ0YyJ10sXHJcbiAgICAgICAgICAgICAgICBbJ0cxJywnRzInLCdHMyddLFxyXG4gICAgICAgICAgICAgICAgWydIMScsJ0gyJywnSDMnLCdINCddLFxyXG4gICAgICAgICAgICAgICAgWydBOCcsJ0I4JywnQzgnLCdEOCcsJ0U4J11cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIGdhbWUuZ2FtZWJvYXJkMSAgICAgPSBnYW1lLmdldFBsYXllcjEoKS5nZXRHYW1lYm9hcmQoKVxyXG4gICAgICAgICAgICBnYW1lLmdhbWVib2FyZDIgICAgID0gZ2FtZS5nZXRQbGF5ZXIyKCkuZ2V0R2FtZWJvYXJkKClcclxuICAgICAgICAgICAgZ2FtZS5wbGF5ZXJJblR1cm4gICA9IGdhbWUuZ2V0UGxheWVyMSgpXHJcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmRDbGljayhnYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57Z2FtZVR1cm4sZ2V0Q29vcmRzQXJyYXksc2V0Q29vcmRzQXJyYXksZ2V0RGlyZWN0aW9uLHNldERpcmVjdGlvbixnZXRQbGF5ZXIxLGdldFBsYXllcjIsZ2V0UGxheWVySW5UdXJuLGNoZWNrRm9yR2FtZVByZXBhcmVkLGdhbWVib2FyZDEsZ2FtZWJvYXJkMixwbGF5ZXJJblR1cm59XHJcbn1cclxuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCdcclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWVib2FyZCgpeyAgICBcclxuICAgXHJcbiAgICBsZXQgX2JvYXJkR3JpZCA9IFxyXG4gICAge1xyXG4gICAgICAgICdBMSc6IGZhbHNlLCAnQTInOiBmYWxzZSwgJ0EzJzogZmFsc2UsICdBNCc6IGZhbHNlLCAnQTUnOiBmYWxzZSwgJ0E2JzogZmFsc2UsICdBNyc6IGZhbHNlLCAnQTgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0IxJzogZmFsc2UsICdCMic6IGZhbHNlLCAnQjMnOiBmYWxzZSwgJ0I0JzogZmFsc2UsICdCNSc6IGZhbHNlLCAnQjYnOiBmYWxzZSwgJ0I3JzogZmFsc2UsICdCOCc6IGZhbHNlLCBcclxuICAgICAgICAnQzEnOiBmYWxzZSwgJ0MyJzogZmFsc2UsICdDMyc6IGZhbHNlLCAnQzQnOiBmYWxzZSwgJ0M1JzogZmFsc2UsICdDNic6IGZhbHNlLCAnQzcnOiBmYWxzZSwgJ0M4JzogZmFsc2UsIFxyXG4gICAgICAgICdEMSc6IGZhbHNlLCAnRDInOiBmYWxzZSwgJ0QzJzogZmFsc2UsICdENCc6IGZhbHNlLCAnRDUnOiBmYWxzZSwgJ0Q2JzogZmFsc2UsICdENyc6IGZhbHNlLCAnRDgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0UxJzogZmFsc2UsICdFMic6IGZhbHNlLCAnRTMnOiBmYWxzZSwgJ0U0JzogZmFsc2UsICdFNSc6IGZhbHNlLCAnRTYnOiBmYWxzZSwgJ0U3JzogZmFsc2UsICdFOCc6IGZhbHNlLCBcclxuICAgICAgICAnRjEnOiBmYWxzZSwgJ0YyJzogZmFsc2UsICdGMyc6IGZhbHNlLCAnRjQnOiBmYWxzZSwgJ0Y1JzogZmFsc2UsICdGNic6IGZhbHNlLCAnRjcnOiBmYWxzZSwgJ0Y4JzogZmFsc2UsIFxyXG4gICAgICAgICdHMSc6IGZhbHNlLCAnRzInOiBmYWxzZSwgJ0czJzogZmFsc2UsICdHNCc6IGZhbHNlLCAnRzUnOiBmYWxzZSwgJ0c2JzogZmFsc2UsICdHNyc6IGZhbHNlLCAnRzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0gxJzogZmFsc2UsICdIMic6IGZhbHNlLCAnSDMnOiBmYWxzZSwgJ0g0JzogZmFsc2UsICdINSc6IGZhbHNlLCAnSDYnOiBmYWxzZSwgJ0g3JzogZmFsc2UsICdIOCc6IGZhbHNlIFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBfYm9hcmRTaGlwcyA9IFtdXHJcbiAgICBcclxuICAgIGNvbnN0IGdldEJvYXJkR3JpZCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRHcmlkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0Qm9hcmRTaGlwcyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwc1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBwb3B1bGF0ZUdhbWVib2FyZCA9IChjb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICAgIHdoaWxlKCBpbmRleCA8IGNvb3JkaW5hdGVzLmxlbmd0aCApe1xyXG4gICAgICAgICAgICBjcmVhdGVTaGlwKGNvb3JkaW5hdGVzW2luZGV4XSlcclxuICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJbmNvbWluZy1xdWVyeSAoYXNzZXJ0IHJlc3VsdCkgWFxyXG4gICAgY29uc3QgY3JlYXRlU2hpcCA9IChjb29yZGluYXRlcykgPT57XHJcbiAgICAgICAgaWYoaXNDb29yZHNBdmFpbGFibGUoY29vcmRpbmF0ZXMpKXtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCAgPSBTaGlwKC4uLmNvb3JkaW5hdGVzKSBcclxuICAgICAgICAgICAgX2JvYXJkU2hpcHMgPSBhZGRTaGlwVG9TaGlwc0FycmF5KHNoaXApXHJcbiAgICAgICAgICAgIGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdChzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm4gc2hpcFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gSW5jb21pbmctcXVlcnkgKGFzc2VydCByZXN1bHQpXHJcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrRnJvbUNvbXB1dGVyID0gKGNvb3Jkcyk9PntcclxuICAgICAgICAvLyBpc1dpdGhIaXRDbGFzcyhjb29yZHMpXHJcbiAgICAgICAgaWYoaXNBdHRhY2tWYWxpZChjb29yZHMpICYmIGlzU2hpcEhpdChjb29yZHMpKXtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGZpbmRTaGlwQnlDb29yZHMoY29vcmRzKVxyXG4gICAgICAgICAgICBpZihzaGlwLmlzU3Vua05leHRIaXQoKSl7XHJcbiAgICAgICAgICAgICAgICBfYm9hcmRTaGlwcyA9IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZWNlaXZlQXR0YWNrRnJvbVBsYXllciA9IChjb29yZHMpPT57XHJcbiAgICAgICAgLy8gaXNXaXRoSGl0Q2xhc3MoY29vcmRzKVxyXG4gICAgICAgIGlmKGlzU2hpcEhpdChjb29yZHMpKXtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGZpbmRTaGlwQnlDb29yZHMoY29vcmRzKVxyXG4gICAgICAgICAgICBpZihzaGlwLmlzU3Vua05leHRIaXQoKSl7XHJcbiAgICAgICAgICAgICAgICBfYm9hcmRTaGlwcyA9IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9ib2FyZEdyaWQgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgX2JvYXJkR3JpZCA9IHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwU3F1YXJlID0gKGNvb3JkcyxzaGlwKSA9PntcclxuICAgICAgICBzaGlwLnJlbW92ZVNxdWFyZUhpdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBRdWVyeSAmIENvbW1hbmQgc2VsZiB4XHJcbiAgICBjb25zdCBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3QgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgc2hpcC5nZXRTaGlwQ29vcmQoKS5mb3JFYWNoKGNvb3JkID0+e1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhfYm9hcmRHcmlkKS5mb3JFYWNoKGtleSA9PntcclxuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gY29vcmQpIHtfYm9hcmRHcmlkW2tleV0gPSB0cnVlfSBcclxuICAgICAgICAgICAgfSkgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhZGRTaGlwVG9TaGlwc0FycmF5ID0gKHNoaXApID0+e1xyXG4gICAgICAgIHJldHVybiBbLi4uX2JvYXJkU2hpcHMsc2hpcF1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTcXVhcmVGcm9tQm9hcmRHcmlkT2JqZWN0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oey4uLl9ib2FyZEdyaWR9LCB7W2Ake2Nvb3Jkc31gXTogJ0hpdCd9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICBkZWJ1Z2dlclxyXG4gICAgICAgIGNvbnN0IHNoaXBJbmRleCA9IGZpbmRTaGlwSW5kZXhCeU5hbWUoc2hpcClcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuZmlsdGVyKGFycmF5U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmluZGV4T2YoYXJyYXlTaGlwKSAhPT0gc2hpcEluZGV4IFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiBcclxuICAgIGNvbnN0IGZpbmRTaGlwQnlDb29yZHMgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBkZWJ1Z2dlclxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdMT09LSU5HIEZPUiAnKyBjb29yZHMpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coX2JvYXJkU2hpcHMuZm9yRWFjaChzaGlwPT5jb25zb2xlLmxvZyhzaGlwLmdldFNoaXBDb29yZCgpKSkpXHJcbiAgICAgICAgbGV0IGhpdFNoaXAgPSBfYm9hcmRTaGlwcy5maW5kKHNoaXAgPT57XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNoaXAuZ2V0U2hpcENvb3JkKCkpXHJcbiAgICAgICAgICAgIGlmKHNoaXAuZ2V0U2hpcENvb3JkKCkuaW5jbHVkZXMoY29vcmRzKSl7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnRk9VTkQnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoaXAuZ2V0U2hpcENvb3JkKCkuaW5jbHVkZXMoY29vcmRzKSAgICBcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChoaXRTaGlwKSByZXR1cm4gaGl0U2hpcFxyXG4gICAgICAgIGlmKCFoaXRTaGlwKSByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbmRTaGlwSW5kZXhCeU5hbWUgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmRJbmRleChjdXJyZW50U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTaGlwLmdldFNoaXBOYW1lKCkgPT09IHNoaXAuZ2V0U2hpcE5hbWUoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNTaGlwSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMpe1xyXG4gICAgICAgICAgICAgICAgaWYoX2JvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZSBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzQWxsU2hpcHNTdW5rID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIChfYm9hcmRTaGlwcy5sZW5ndGggPT09IDApID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNDb29yZHNBdmFpbGFibGUgPSAoY29vcmRzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXhBcnJheSA9IDBcclxuICAgICAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoX2JvYXJkR3JpZCkpe1xyXG4gICAgICAgICAgICBpZihrZXkgPT09IGNvb3Jkc1tpbmRleEFycmF5XSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9ib2FyZEdyaWRba2V5XSkgPyBmYWxzZSA6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNXaXRoSGl0Q2xhc3M9IChjb29yZHMpPT57XHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICAgICAgbGV0IGNvb3JkID0gIGFycmF5LmZpbmQoc3F1YXJlID0+e1xyXG4gICAgICAgICAgICBzcXVhcmUuaWQgPT09IGNvb3JkcyAmJiBzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2coY29vcmQpXHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICBjb25zdCBpc0F0dGFja1ZhbGlkID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYm9hcmRHcmlkW2tleV0pID09PSAnSGl0Jz8gZmFsc2UgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbiBcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0Qm9hcmRHcmlkLFxyXG4gICAgICAgIGdldEJvYXJkU2hpcHMsXHJcbiAgICAgICAgY3JlYXRlU2hpcCxcclxuICAgICAgICBnZXRTaGlwTGVuZ3RoQnlOYW1lLFxyXG4gICAgICAgIHBvcHVsYXRlR2FtZWJvYXJkLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2tGcm9tUGxheWVyLFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2tGcm9tQ29tcHV0ZXIsXHJcbiAgICAgICAgaXNBbGxTaGlwc1N1bmssXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTaGlwTGVuZ3RoQnlOYW1lID0gKHNoaXBOYW1lKSA9PntcclxuICAgIGNvbnN0IF9TSElQX05BTUVTID0ge1xyXG4gICAgICAgICdzcHktMSc6IDEsXHJcbiAgICAgICAgJ3NweS0yJzogMSxcclxuICAgICAgICAnc3B5LTMnOiAxLFxyXG4gICAgICAgICdkZXN0cm95ZXItMSc6IDIsXHJcbiAgICAgICAgJ2Rlc3Ryb3llci0yJzogMixcclxuICAgICAgICAnZGVzdHJveWVyLTMnOiAyLFxyXG4gICAgICAgICdjcnVpc2VyJzogMyxcclxuICAgICAgICAnYmF0dGxlc2hpcCc6IDQsXHJcbiAgICAgICAgJ2NhcnJpZXInOiA1XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX1NISVBfTkFNRVNbc2hpcE5hbWVdXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFxyXG4gICAgXHJcbiAgICByZW5kZXJUdXJuLFxyXG4gICAgcmVuZGVyRHJhZ0VudGVyLFxyXG4gICAgcmVuZGVyRHJhZ1N0YXJ0LFxyXG4gICAgcmVuZGVyRHJhZ092ZXIsXHJcbiAgICByZW5kZXJEcmFnTGVhdmUsXHJcbiAgICBoYW5kbGVEcm9wRXZlbnRcclxuXHJcbn0gZnJvbSAnLi4vdmlldy9yZW5kZXJEeW5hbWljRWxlbWVudHMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnNCb2FyZENsaWNrIChnYW1lKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzQ29tcHV0ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc0NvbXB1dGVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+e1xyXG4gICAgICAgICAgICBwcm9jZXNzVHVybkRhdGEoZ2FtZSxldmVudClcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuY29uc3QgcHJvY2Vzc1R1cm5EYXRhID0gKGdhbWUsZXZlbnQpID0+e1xyXG4gICAgY29uc3QgdHVybkRhdGEgPSBnYW1lLmdhbWVUdXJuKGV2ZW50LnRhcmdldC5pZClcclxuICAgIGNvbnNvbGUubG9nKHR1cm5EYXRhKVxyXG4gICAgaWYodHVybkRhdGEgPT09IG51bGwpIHJldHVybiAgICAgIFxyXG4gICAgcmVuZGVyVHVybih0dXJuRGF0YSxldmVudClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGFkZEV2ZW50TGlzdGVuZXJzRHJhZ1NoaXBzID0gKGdhbWUpID0+e1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lckRyYWdnYWJsZSgpXHJcbiAgICBhZGRFdmVudExpc3RlbmVyc0JvYXJkRHJhZyhnYW1lKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzQm9hcmREcmFnIChnYW1lKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzUGxheWVyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgZ3JpZFNxdWFyZXNQbGF5ZXIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicscmVuZGVyRHJhZ0VudGVyKVxyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicscmVuZGVyRHJhZ092ZXIpXHJcbiAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScscmVuZGVyRHJhZ0xlYXZlKVxyXG4gICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywoZXZlbnQpID0+e1xyXG4gICAgICAgICAgICBoYW5kbGVEcm9wRXZlbnQoZXZlbnQsZ2FtZSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJEcmFnZ2FibGUoKXtcclxuICAgIGNvbnN0IHNoaXBzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9vbC1zaGlwLnBsYXllcjEnKSlcclxuICAgIHNoaXBzLmZvckVhY2goc2hpcD0+XHJcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLHJlbmRlckRyYWdTdGFydCkpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyAoKXtcclxuICAgIGNvbnN0IGdyaWRTcXVhcmVzQ29tcHV0ZXIgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIyID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBncmlkU3F1YXJlc0NvbXB1dGVyLmZvckVhY2goc3F1YXJlID0+e1xyXG4gICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc3NUdXJuRGF0YSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyVG9nZ2xlRGlyZWN0aW9uIChnYW1lKXtcclxuICAgIGNvbnN0IHRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUnKVxyXG4gICAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgICAoZ2FtZS5nZXREaXJlY3Rpb24oKSA9PT0gJ1ZlcnRpY2FsJykgXHJcbiAgICAgICAgICAgID8gZ2FtZS5zZXREaXJlY3Rpb24oJ0hvcml6b250YWwnLHRvZ2dsZUJ1dHRvbikgXHJcbiAgICAgICAgICAgIDogZ2FtZS5zZXREaXJlY3Rpb24oJ1ZlcnRpY2FsJyx0b2dnbGVCdXR0b24pXHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgZ2V0U2hpcExlbmd0aEJ5TmFtZSB9IGZyb20gJy4vZ2FtZWJvYXJkJ1xyXG5cclxuZXhwb3J0IGNvbnN0IHJldHJpZXZlVHVybkRhdGEgPSAodHVybkRhdGEpID0+e1xyXG4gICAgY29uc3QgcGxheWVyRGF0YSAgICAgID0gdHVybkRhdGEuaXNQbGF5ZXJBdHRhY2tNaXNzXHJcbiAgICBjb25zdCBjb21wdXRlckRhdGEgICAgPSB0dXJuRGF0YS5pc0NvbXB1dGVyQXR0YWNrTWlzc1xyXG4gICAgY29uc3QgY29tcHV0ZXJDb29yZHMgID0gdHVybkRhdGEuY29tcHV0ZXJDb29yZHNcclxuICAgIGNvbnN0IGF0dGFja2VkRWxlbWVudCA9IGZpbmRIaXRFbGVtZW50KGNvbXB1dGVyQ29vcmRzKVxyXG5cclxuICAgIHJldHVybiB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmVEYXRhRHJvcCA9IChldmVudCkgPT57XHJcbiAgICBjb25zdCBzaGlwSUQgICAgICAgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpXHJcbiAgICBjb25zdCBzcXVhcmVJRCAgICAgPSBldmVudC50YXJnZXQuaWQgXHJcbiAgICBsZXQgc3F1YXJlc1RvU3R5bGUgPSBnZXRTaGlwTGVuZ3RoQnlOYW1lKHNoaXBJRClcclxuXHJcbiAgICByZXR1cm4ge3NoaXBJRCxzcXVhcmVJRCxzcXVhcmVzVG9TdHlsZX1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJldHJpZXZlRGF0YUJvYXJkVmVydCA9IChzcXVhcmVJRCxzaGlwSUQpID0+e1xyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBjb25zdCBzaGlwSW5Qb29sICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXBJRClcclxuICAgIGxldCBpbmRleFRvU3R5bGUgICAgID0gYm9hcmRHcmlkQXJyYXkuZmluZEluZGV4KGVsID0+IGVsLmlkID09PSBzcXVhcmVJRClcclxuXHJcbiAgICByZXR1cm4ge2JvYXJkR3JpZEFycmF5LHNoaXBJblBvb2wsIGluZGV4VG9TdHlsZX1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJldHJpZXZlRGF0YUJvYXJkSG9yaXogPSAoc3F1YXJlSUQsc2hpcElEKSA9PntcclxuICAgIGNvbnN0IGVsZW1lbnRUb1N0eWxlICAgICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzcXVhcmVJRH1gKVxyXG4gICAgY29uc3Qgc2hpcEluUG9vbCAgICAgICAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNoaXBJRClcclxuXHJcbiAgICByZXR1cm4ge2VsZW1lbnRUb1N0eWxlLCBzaGlwSW5Qb29sfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNWZXJ0UGxhY2VtZW50VmFsaWQgPSAoaW5kZXhUb1N0eWxlLHNxdWFyZXNUb1N0eWxlLCBib2FyZEdyaWRBcnJheSkgPT57XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc3F1YXJlc1RvU3R5bGU7IGluZGV4KyspIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGJvYXJkR3JpZEFycmF5W2luZGV4VG9TdHlsZV1cclxuICAgICAgICBpZiggaXNPdmVyZmxvd0JvdHRvbShlbGVtZW50KSB8fCBpc092ZXJsYXAoZWxlbWVudCkpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXhUb1N0eWxlICs9IDhcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpc0hvcml6UGxhY2VtZW50VmFsaWQgPSAoZWxlbWVudCxzcXVhcmVzVG9TdHlsZSkgPT57XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc3F1YXJlc1RvU3R5bGU7IGluZGV4KyspIHtcclxuICAgICAgICBpZihpc092ZXJmbG93Qm90dG9tU2lkZShlbGVtZW50KSB8fCBpc092ZXJsYXAoZWxlbWVudCkgfHwgaXNPdmVyZmxvd1NpZGUoZWxlbWVudCxpbmRleCkgKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxufSBcclxuXHJcbmV4cG9ydCBjb25zdCBpc092ZXJsYXAgPSAoZWxlbWVudCkgPT57XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3NoaXAnKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXNPdmVyZmxvd0JvdHRvbSA9IChlbGVtZW50KSA9PntcclxuICAgIHJldHVybiBlbGVtZW50ID09PSB1bmRlZmluZWRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzT3ZlcmZsb3dCb3R0b21TaWRlID0gKGVsZW1lbnQpID0+IHtcclxuICAgIHJldHVybiAoKGVsZW1lbnQgPT09IG51bGwpIClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGlzT3ZlcmZsb3dTaWRlID0gKGVsZW1lbnQsaW5kZXgpID0+IHtcclxuICAgIHJldHVybiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3JvdycpICYmIGluZGV4ICE9PSAwKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGZpbmRIaXRFbGVtZW50ID0gKGNvb3JkcykgPT57XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBsYXllcjEgPiAjJHtjb29yZHN9YClcclxufSIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBsYXllcihuYW1lKXtcclxuICAgIGNvbnN0IF9wbGF5ZXJOYW1lID0gbmFtZVxyXG5cclxuICAgIGxldCBfZ2FtZWJvYXJkXHJcblxyXG4gICAgbGV0IF9hdHRhY2tlZFNxdWFyZXMgPSBbXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9wbGF5ZXJOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9nYW1lYm9hcmRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRBdHRhY2tlZFNxdWFyZXMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2F0dGFja2VkU3F1YXJlc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNldEF0dGFja2VkU3F1YXJlcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIF9hdHRhY2tlZFNxdWFyZXMucHVzaChjb29yZHMpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3JlYXRlR2FtZUJvYXJkID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBfZ2FtZWJvYXJkID0gR2FtZWJvYXJkKClcclxuICAgICAgICBfZ2FtZWJvYXJkLnBvcHVsYXRlR2FtZWJvYXJkKGNvb3JkaW5hdGVzKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBzZW5kQXR0YWNrQ29vcmRzVG9HYW1lID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgLy8gZGVidWdnZXJcclxuICAgICAgICBpZihnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhjb29yZHMpKSByZXR1cm4gbnVsbFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyhjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgICAgIGNvbnN0IGJvYXJkR3JpZCA9IE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCA9IGJvYXJkR3JpZC5sZW5ndGhcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB3aGlsZShnZXRBdHRhY2tlZFNxdWFyZXMoKS5pbmNsdWRlcyhib2FyZEdyaWRbaW5kZXhdKSl7XHJcbiAgICAgICAgICAgIGluZGV4ID0gZ2VuZXJhdGVSYW5kb21OdW1iZXIoMCxCT0FSRF9HUklEX0xFTkdUSClcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0QXR0YWNrZWRTcXVhcmVzKGJvYXJkR3JpZFtpbmRleF0pXHJcbiAgICAgICAgcmV0dXJuIGJvYXJkR3JpZFtpbmRleF1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGVSYW5kb21OdW1iZXIgPSAobWF4LG1pbikgPT57XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGxheWVyRGVmZWF0ZWQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gKF9nYW1lYm9hcmQuZ2V0Qm9hcmRTaGlwcygpLmxlbmd0aCA9PT0gMCkgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBnZXRHYW1lYm9hcmQsXHJcbiAgICAgICAgZ2V0QXR0YWNrZWRTcXVhcmVzLFxyXG4gICAgICAgIHNldEF0dGFja2VkU3F1YXJlcyxcclxuICAgICAgICBjcmVhdGVHYW1lQm9hcmQsXHJcbiAgICAgICAgc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBzZW5kQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIGlzUGxheWVyRGVmZWF0ZWRcclxuICAgIH1cclxufSIsImV4cG9ydCBmdW5jdGlvbiBTaGlwKC4uLmNvb3JkaW5hdGVzKXtcclxuXHJcbiAgICBsZXQgX3NoaXBDb29yZCA9IGNvb3JkaW5hdGVzXHJcblxyXG4gICAgY29uc3QgX1NISVBfTkFNRVMgPSB7XHJcbiAgICAgICAgMSA6ICdTcHknLFxyXG4gICAgICAgIDIgOiAnRGVzdHJveWVyJyxcclxuICAgICAgICAzIDogJ0NydWlzZXInLFxyXG4gICAgICAgIDQgOiAnQmF0dGxlc2hpcCcsXHJcbiAgICAgICAgNSA6ICdDYXJyaWVyJ1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IF9zaGlwTmFtZSA9IF9TSElQX05BTUVTW19zaGlwQ29vcmQubGVuZ3RoXVxyXG4gICAgXHJcbiAgICBjb25zdCBnZXRTaGlwTmFtZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcE5hbWVcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdXRnb2luZyBxdWVyeSB4XHJcbiAgICBjb25zdCBnZXRTaGlwQ29vcmQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBJbmNvbWluZyBxdWVyeSAoYXNzZXJ0IHJlc3VsdCA+IHRlc3RlZCB3aXRoIHJlbW92ZVNxdWFyZUhpdClcclxuICAgIGNvbnN0IGZpbmRIaXRJbmRleCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmRzKSAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gU2VsZiBjb21tYW5kIHhcclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIGNvbnN0IGluZGV4Q29vcmQgPSBmaW5kSGl0SW5kZXgoY29vcmRzKVxyXG4gICAgICAgIF9zaGlwQ29vcmQgPSBfc2hpcENvb3JkLmZpbHRlcihjb29yZCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmQuaW5kZXhPZihjb29yZCkgIT09IGluZGV4Q29vcmQgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBQdXJlIC8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgaXNTdW5rTmV4dEhpdCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmxlbmd0aCA9PT0gMSA/IHRydWUgOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFNoaXBOYW1lLFxyXG4gICAgICAgIGdldFNoaXBDb29yZCxcclxuICAgICAgICBpc1N1bmtOZXh0SGl0LFxyXG4gICAgICAgIHJlbW92ZVNxdWFyZUhpdFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFxyXG5cclxuICAgIHJldHJpZXZlRGF0YURyb3AsXHJcbiAgICByZXRyaWV2ZVR1cm5EYXRhLFxyXG4gICAgcmV0cmlldmVEYXRhQm9hcmRWZXJ0LFxyXG4gICAgcmV0cmlldmVEYXRhQm9hcmRIb3JpeixcclxuICAgIGlzSG9yaXpQbGFjZW1lbnRWYWxpZCxcclxuICAgIGlzVmVydFBsYWNlbWVudFZhbGlkLFxyXG5cclxufSBmcm9tICcuLi9sb2dpYy9oYW5kbGVTdHlsaW5nRXZlbnRzRGF0YSdcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyVHVybiA9ICh0dXJuRGF0YSxldmVudCkgPT57XHJcbiAgICBjb25zdCB7IHBsYXllckRhdGEsY29tcHV0ZXJEYXRhLCBhdHRhY2tlZEVsZW1lbnQgfSA9IFxyXG4gICAgICAgIHJldHJpZXZlVHVybkRhdGEodHVybkRhdGEpXHJcblxyXG4gICAgcmVuZGVyQm9hcmRTcXVhcmVzKHBsYXllckRhdGEsIGV2ZW50LnRhcmdldClcclxuICAgIHJlbmRlckJvYXJkU3F1YXJlcyhjb21wdXRlckRhdGEsIGF0dGFja2VkRWxlbWVudClcclxuXHJcbiAgICByZW5kZXJUdXJuSW5mbyh0dXJuRGF0YSx0dXJuRGF0YS5wbGF5ZXIxKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVuZGVyTWF0Y2hSZXN1bHQgPSAocGxheWVyRGF0YSkgPT57XHJcbiAgICBjb25zdCB3aW5uZXIgPSBwbGF5ZXJEYXRhLnBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZCgpIFxyXG4gICAgICAgID8gJ0NvbXB1dGVyJ1xyXG4gICAgICAgIDogcGxheWVyRGF0YS5wbGF5ZXIxLmdldE5hbWUoKSAgIFxyXG5cclxuICAgIGNvbnN0IG1hdGNoSW5mb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4taW5mbycpXHJcbiAgICBtYXRjaEluZm9FbC50ZXh0Q29udGVudCA9IGAke3dpbm5lcn1gICsgJyBpcyB0aGUgd2lubmVyIScgXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJEcmFnU3RhcnQgKGV2ZW50KSB7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsZXZlbnQudGFyZ2V0LmlkKVxyXG59XHJcbiAgICBcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRyYWdFbnRlciAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKVxyXG59XHJcbiAgICBcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckRyYWdPdmVyIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWctb3ZlcicpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJEcmFnTGVhdmUgKGV2ZW50KSB7XHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJylcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhhbmRsZURyb3BFdmVudCA9IChldmVudCxnYW1lKSA9PntcclxuICAgIGNvbnN0IHtzaGlwSUQsIHNxdWFyZUlEICxzcXVhcmVzVG9TdHlsZX0gPSByZXRyaWV2ZURhdGFEcm9wKGV2ZW50KVxyXG4gICAgY29uc3QgcmVuZGVyRGlyZWN0aW9uID0gKGdhbWUuZ2V0RGlyZWN0aW9uKCkgPT09ICdWZXJ0aWNhbCcpXHJcbiAgICAgICAgPyByZW5kZXJTaGlwVmVydCBcclxuICAgICAgICA6IHJlbmRlclNoaXBIb3JpelxyXG5cclxuICAgIGNvbnN0IHNoaXBDb29yZHMgPSByZW5kZXJEaXJlY3Rpb24oc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKVxyXG4gICAgcmVtb3ZlQm9hcmRNYXJrKGV2ZW50KVxyXG4gICAgaWYoIXNoaXBDb29yZHMpIHJldHVyblxyXG5cclxuICAgIGdhbWUuc2V0Q29vcmRzQXJyYXkoc2hpcENvb3JkcylcclxuICAgIGdhbWUuY2hlY2tGb3JHYW1lUHJlcGFyZWQoZ2FtZSxnYW1lLmdldFBsYXllcjEoKSxnYW1lLmdldFBsYXllcjIoKSlcclxufVxyXG5cclxuXHJcbmNvbnN0IHJlbmRlclNoaXBWZXJ0ID0gKHNxdWFyZUlELHNxdWFyZXNUb1N0eWxlLHNoaXBJRCkgPT57XHJcbiAgICBsZXQgeyBib2FyZEdyaWRBcnJheSxzaGlwSW5Qb29sLCBpbmRleFRvU3R5bGUgfSA9XHJcbiAgICAgICAgcmV0cmlldmVEYXRhQm9hcmRWZXJ0KHNxdWFyZUlELHNoaXBJRClcclxuXHJcbiAgICBpZighaXNWZXJ0UGxhY2VtZW50VmFsaWQoaW5kZXhUb1N0eWxlLHNxdWFyZXNUb1N0eWxlLCBib2FyZEdyaWRBcnJheSkpIHJldHVyblxyXG4gICAgXHJcbiAgICBsZXQgY29vcmRzID0gW11cclxuICAgIHJlbmRlclNxdWFyZXNWZXJ0KGluZGV4VG9TdHlsZSxzcXVhcmVzVG9TdHlsZSxib2FyZEdyaWRBcnJheSxjb29yZHMpXHJcbiAgICByZW1vdmVQb29sU2hpcChzaGlwSW5Qb29sKVxyXG4gICAgcmV0dXJuIGNvb3Jkc1xyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZXNWZXJ0ID0gKGluZGV4VG9TdHlsZSxzcXVhcmVzVG9TdHlsZSxib2FyZEdyaWRBcnJheSxjb29yZHMpID0+e1xyXG4gICAgd2hpbGUoc3F1YXJlc1RvU3R5bGUgPiAwKXtcclxuICAgICAgICBsZXQgZWxlbWVudFRvU3R5bGUgPSBib2FyZEdyaWRBcnJheVtpbmRleFRvU3R5bGVdXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgY29vcmRzLnB1c2goZWxlbWVudFRvU3R5bGUuaWQpXHJcbiAgICAgICAgaW5kZXhUb1N0eWxlICs9IDhcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tXHJcbiAgICB9ICBcclxufVxyXG4gIFxyXG5jb25zdCByZW5kZXJTaGlwSG9yaXogPSAoc3F1YXJlSUQsc3F1YXJlc1RvU3R5bGUsc2hpcElEKSA9PntcclxuICAgIGxldCB7ZWxlbWVudFRvU3R5bGUsIHNoaXBJblBvb2x9ID0gcmV0cmlldmVEYXRhQm9hcmRIb3JpeihzcXVhcmVJRCxzaGlwSUQpXHJcbiAgICBcclxuICAgIGlmKCFpc0hvcml6UGxhY2VtZW50VmFsaWQoZWxlbWVudFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUpKSByZXR1cm5cclxuICAgIFxyXG4gICAgbGV0IGNvb3JkcyA9IFtdXHJcbiAgICByZW5kZXJTcXVhcmVzSG9yaXooZWxlbWVudFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsY29vcmRzKVxyXG4gICAgcmVtb3ZlUG9vbFNoaXAoc2hpcEluUG9vbClcclxuICAgIFxyXG4gICAgcmV0dXJuIGNvb3JkcyAgICAgXHJcbn1cclxuICAgIFxyXG5jb25zdCByZW5kZXJTcXVhcmVzSG9yaXogPSAoZWxlbWVudFRvU3R5bGUsc3F1YXJlc1RvU3R5bGUsY29vcmRzKSA9PntcclxuICAgIHdoaWxlKHNxdWFyZXNUb1N0eWxlID4gMCl7XHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgZWxlbWVudFRvU3R5bGUgPSBlbGVtZW50VG9TdHlsZS5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICBjb29yZHMucHVzaChlbGVtZW50VG9TdHlsZS5pZClcclxuICAgICAgICBzcXVhcmVzVG9TdHlsZS0tIFxyXG4gICAgfVxyXG59XHJcbiAgICBcclxuY29uc3QgcmVtb3ZlUG9vbFNoaXAgPSAoc2hpcEluUG9vbCkgPT57XHJcbiAgICBzaGlwSW5Qb29sLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxyXG4gICAgc2hpcEluUG9vbC5yZW1vdmVBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpXHJcbn1cclxuXHJcbmNvbnN0IHJlbW92ZUJvYXJkTWFyayA9IChldmVudCkgPT57XHJcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJylcclxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJylcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQm9hcmRTcXVhcmVzID0gKHR1cm5EYXRhLCBlbGVtZW50KSA9PntcclxuICAgIGlmKGlzSGl0RWxlbWVudChlbGVtZW50KSkgcmV0dXJuICBcclxuICAgICh0dXJuRGF0YSkgPyByZW5kZXJTcXVhcmVPbk1pc3MoZWxlbWVudCkgOiByZW5kZXJTcXVhcmVPbkhpdChlbGVtZW50KVxyXG59XHJcblxyXG5jb25zdCBpc0hpdEVsZW1lbnQgPSAoZWxlbWVudCkgPT57XHJcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpIHx8IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaXNzJylcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU3F1YXJlT25IaXQgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG59XHJcbiAgXHJcbmNvbnN0IHJlbmRlclNxdWFyZU9uTWlzcyAgPSAoZWxlbWVudCkgPT57XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQnKVxyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtaXNzJylcclxufVxyXG5cclxuY29uc3QgcmVuZGVyVHVybkluZm8gPSAodHVybkRhdGEscGxheWVyMSkgPT57XHJcbiAgICBjb25zdCBtYXRjaEluZm9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50dXJuLWluZm8nKVxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLmdldE5hbWUoKX0gYXR0YWNrIGlzIGEgYCBcclxuICAgICsgKHR1cm5EYXRhLmlzUGxheWVyQXR0YWNrTWlzcykgPyAnbWlzcyEnIDogJ2hpdCEnXHJcbiAgXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlcldhcm5pbmdzSW5mbyA9ICgpID0+e1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJTaGlwT25TaW5rID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJleHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RhdGljRWxlbWVudHMocGxheWVyMSwgcGxheWVyMil7XHJcbiAgICByZW5kZXJCb2FyZE9uUmVzZXQoKVxyXG4gICAgcmVuZGVyUGxheWVyTmFtZXMocGxheWVyMSwgcGxheWVyMilcclxufVxyXG5cclxuY29uc3QgcmVuZGVyU2hpcHMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBpbmRleCA9IDBcclxuICAgIGNvbnN0IGJvYXJkR3JpZCA9IGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wbGF5ZXIxID4gLmdyaWQtc3F1YXJlJykpXHJcbiAgICBmb3IoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoYm9hcmRHcmlkKSl7XHJcbiAgICAgICAgaWYoYm9hcmRHcmlkW2tleV0pe1xyXG4gICAgICAgICAgICBib2FyZEdyaWRBcnJheVtpbmRleF0uY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4KytcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNvbnN0IHJlbmRlclBsYXllck5hbWVzID0gKHBsYXllcjEsIHBsYXllcjIpID0+e1xyXG4gICAgY29uc3QgcGxheWVyMU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMS1uYW1lJylcclxuICAgIGNvbnN0IHBsYXllcjJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjItbmFtZScpXHJcblxyXG4gICAgcGxheWVyMU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXIxLmdldE5hbWUoKSArICcgXFwncyBmbGVldCdcclxuICAgIHBsYXllcjJOYW1lLnRleHRDb250ZW50ID0gcGxheWVyMi5nZXROYW1lKCkgKyAnIFxcJ3MgZmxlZXQnXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckJvYXJkT25SZXNldCA9ICgpID0+e1xyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkxID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMSA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgYm9hcmRHcmlkQXJyYXkyID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxheWVyMiA+IC5ncmlkLXNxdWFyZScpKVxyXG4gICAgY29uc3QgbWF0Y2hJbmZvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudHVybi1pbmZvJylcclxuXHJcbiAgICBib2FyZEdyaWRBcnJheTEuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKVxyXG4gICAgICAgIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdtaXNzJylcclxuICAgIH0pXHJcbiAgICBib2FyZEdyaWRBcnJheTIuZm9yRWFjaChzcXVhcmUgPT57XHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpXHJcbiAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKVxyXG4gICAgfSkgXHJcblxyXG4gICAgbWF0Y2hJbmZvRWwudGV4dENvbnRlbnQgPSAgJydcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWUsY2hlY2tGb3JHYW1lUHJlcGFyZWR9IGZyb20gJy4vbG9naWMvZ2FtZSdcclxuaW1wb3J0IHthZGRFdmVudExpc3RlbmVyc0JvYXJkQ2xpY2ssYWRkRXZlbnRMaXN0ZW5lclRvZ2dsZURpcmVjdGlvbixhZGRFdmVudExpc3RlbmVyc0RyYWdTaGlwc30gZnJvbSAnLi9sb2dpYy9oYW5kbGVFdmVudExpc3RlbmVycydcclxuXHJcbmNvbnN0IHByZXBhcmVHYW1lID0gKGdhbWUpID0+e1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnNEcmFnU2hpcHMoZ2FtZSlcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJUb2dnbGVEaXJlY3Rpb24oZ2FtZSlcclxufVxyXG5cclxuY29uc3QgZ2FtZSA9IEdhbWUoKVxyXG5wcmVwYXJlR2FtZShnYW1lKVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9