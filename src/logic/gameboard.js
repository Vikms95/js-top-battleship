function Gameboard(){

    let isGameOver = false
    let boardGrid = []

    // Incoming-query (assert result)
    const createShip = () =>{
        // Calls the Ship factory and
        // instantiates a ship object
    }

    // Query & Command self x
    const placeShip = () =>{
        // Gets a Ship object and
        // sets it's position to boardGrid      
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
}