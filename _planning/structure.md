- FILE MANAGEMENT(vague)
    -View-
        - renderGameboard
        - renderShips
    -Logic-
        - Game
            createPlayers
            switchPlayers
            startGame
            finishGame
        - Player
            createGameBoard                   > game
            sendAttackCoordsToGameboard       > game
            sendRandomAttackCoordsToGameboard > game
            generateRandomNumber <
       
        - Gameboard
            populateGameboard           > player
            createShip                  > player
            receiveAttack               > player
            isAllShipsSunk              > player
            destroyShipSquare           <
            removeShipFromShipsArray    <
            addShipToBoardGridObject    <
            addShipToShipsArray         <
            markSquareFromBoardGridObj  <
            removeShipFromShipsArray    <
            isShipHit                   <
            findShipByCoords            <
            findShipIndexByName         <
        - Ship
            isSunkNextHit   > gameboard
            removeSquareHit > gameboard
            findHitIndex <
    
#----------------------------------------------------------------#

- Queries: Return a result and do not change the observable state of the system (are free of side effects).

- Commands: Change the state of a system but do not return a value.

- COMMUNICATION

- ( ( ( (Ships) Gameboard1) Player1)  ( ( (Ships) Gameboard2) Player2) Game)

    -Game-
    -Will tell Player
        - When it's its turn 

    -Player-
    Will tell Game
        - To create a Gameboard (createGameBoard)
        - If they are done with the turn (isTurnOver)
        - If they lost the game (isPlayerDefeated)

    -Gameboard-
    Will tell Player
        - To create a Ship (createShip)
        - To populate the Gameboard (populateGameboard)
        - To receive an attack from the enemy (receiveAttackFromPlayer)

    Will tell DOM
        - To update display based on _boardGrid state (getBoardGrid)
    
    -Ship-
    Will tell Gameboard
        - To remove the square that got hit (removeSquareHit)
        - If it's sunk on the next hit (isSunkNextHit)

#----------------------------------------------------------------#

- COMPONENTS OF BATTLESHIP DISPLAY
 - Display
    - Two gameboards with it's ships placed
    - Lower part showing a form to enter usernames, and a
      score when the game has started

- Game
    - Ask for player's name
    - Ask for ship positions
    - 