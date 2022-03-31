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

    const getBoardGrid = () =>{
        return _boardGrid
    }

    // Incoming-query (assert result) X
    const createShip = (...coordinates) =>{
        // Calls the Ship factory and
        // instantiates a ship object
        return Ship(...coordinates)
 
    }

    // Outgoing-command (expect to send)
    const addShipToPlayerArray = () =>{

    }

    // Query & Command self x
    const addShipToBoardGrid = (ship) =>{
        for (let i = 0; i < ship.getShipCoord().length; i++) {
            const coordToAdd = ship.getShipCoord()[i]
            // Sets Ship positions to true on the _boardGrid 
            for(const [key,value] of Object.entries(_boardGrid)){
                if(key === coordToAdd){
                    _boardGrid[key] = true
                }
            }       
        }
    }

    // Outgoing-query x
    const sendShipCoord = () =>{
        // Gets a Ship object and sends
        // it's coordinates to View
    }

    // Incoming-query (assert result)
    const receiveAttack = ()=>{
        // Receives coord from the DOM,
        // calls iteratePlayerShips to see
        // if a Ship was hit
    }
    
    // Both query and command, refactor?
    const iteratePlayerShips = (coord = null) =>{
        // 1. check if a ship was hit and send it ( true = sendHitCoord, false = isAttackMissed)
        // 2. check if a player has any remaining ships (false = isPlayerDefeated)
        // Iterates the player ship array
        // 
        // 
    }   

    // Outgoing query x
    const sendHitCoord = () =>{
        // Send hit coordinates to the hit
        // ship
    }

    // Outgoing query x
    const isAttackMissed = ()=>{
        // Returns true when checkPlayerShips
        // does not return any hit value  
    }
    

    const isPlayerDefeated = () =>{
        // Returns true when checkPlayerShips
        // returns 0 and send info to Gameflow

    }
    return {
        getBoardGrid,
        createShip,
        sendHitCoord,
        sendShipCoord,
        addShipToPlayerArray,
        addShipToBoardGrid
    }
}

const gb = Gameboard()
const ship = gb.createShip('A1','A2')
gb.addShipToBoardGrid(ship)
console.log(gb.getBoardGrid())