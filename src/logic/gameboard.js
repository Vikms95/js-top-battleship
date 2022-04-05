import { Ship } from './ship'

export function Gameboard(){

    let isGameOver = false
    
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

    // Incoming-query (assert result) X
    const createShip = (...coordinates) =>{
        const ship = Ship(...coordinates) 
        _boardShips = addShipToBoardShipsArray(ship)
        addShipToBoardGridObject(ship)
        return ship

    }
    
    // Incoming-query (assert result)
    const receiveAttackFromDOM = (sendCoordsDOM = 'A1')=>{
        // Store 'A1' until DOM methods are created
        const coords = sendCoordsDOM // Will be a method later

        if(isShipHit(coords)){
            const ship = findShipByCoords(coords)
            removeSquareFromBoardGridObject(coords)
            ship.removeSquareHit(coords)
            // Send info tot he DOM to mark that square as hit visually
            if(ship.isSunk()){
                removeShipFromShipsArray(ship)
            }
        }else{
            return false
        }
    }
 
    // Query & Command self x
    const addShipToBoardGridObject = (ship) =>{
        for (let i = 0; i < ship.getShipCoord().length; i++) {
            const coords = ship.getShipCoord()[i]
            for(const [key] of Object.entries(_boardGrid)){
                if(key === coords){
                    _boardGrid[key] = true
                }
            }       
        }
    }

    const addShipToBoardShipsArray = (ship) =>{
        return [..._boardShips,ship]
    }
    
    const removeShipFromShipsArray = (ship) =>{
        const index = findShipIndexByName(ship)
        console.log(index)
    }

    const removeSquareFromBoardGridObject = (coords) =>{
        for(const[key] of Object.entries(_boardGrid)){
            if(key === coords){
                _boardGrid[key] = 'Hit'
            }
        }
    }

    const isShipHit = (coords) =>{
        for(const [key] of Object.entries(_boardGrid)){
            if(key === coords && _boardGrid[key]){
                // Change value inside _boardgrid here?
                return true
            }
        }
        return false
    }
    
    const findShipByCoords = (coords) =>{
        // for now we pass an array with already inserted values
        // check the ships from the array to retrieve the name of the ship hit
        return _boardShips.find(ship =>{
            return ship.getShipCoord().includes(coords)    
        })
    }

    const findShipIndexByName = (ship) =>{
        return _boardShips.indexOf(ship.name)    
    }

    // Outgoing-query x
    const sendShipCoord = () =>{ 
        // Gets a Ship object and sends
        // it's coordinates to View
    }
    
    // Outgoing query x
    const sendHitCoord = () =>{
        // Send hit coordinates to the hit
        // ship
    }
  
    const isPlayerDefeated = () =>{
        return _boardShips.every(ship => ship.isSunk())
    }

    return {
        getBoardGrid,
        createShip,
        receiveAttackFromDOM,
        sendHitCoord,
        sendShipCoord
    }
}
