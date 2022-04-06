function Player(name){
    const _playerName = name

    const getName = () =>{
        return _playerName
    }


    const attackGameboard = () =>{
        // Receives coords from an event listener
        // Call the enemy Gameboard.receiveAttackFromPlayer with the coords
    }

    const receiveAttackFromPlayer = () =>{

    }

    return{
        getName,
        attackGameboard
    }
}