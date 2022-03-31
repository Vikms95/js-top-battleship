function Gameboard(){

    let isGameOver = false
    let boardGrid = []

    const createShip = () =>{
        // Calls the Ship factory and
        // instantiates a ship object
    }

    const placeShip = () =>{
        // Gets a Ship object and
        // sets it's position to boardGrid      
    }

    const sendShipCoord = () =>{
        // Gets a Ship object and sends
        // it's coordinates to View
    }

    const receiveAttack = ()=>{
        // Receives coord from the DOM,
        // calls iteratePlayerShips to see
        // if a Ship was hit
    }
    
    const iteratePlayerShips = () =>{
        // Iterates the player ship array
        
    }   

    const isAttackMissed = ()=>{
        // Returns true when checkPlayerShips
        // does not return any hit value  
    }
    
    const isPlayerDefeated = () =>{
        // Returns true when checkPlayerShips
        // returns 0 and send info to Gameflow

    }
}