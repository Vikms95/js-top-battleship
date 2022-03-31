- FILE MANAGEMENT(vague)
    -View-

        - renderGameboard
        - renderShips

    -Logic-

        - Game
            createGameBoards
            createPlayers
            switchPlayers
            startGame
            finishGame
        - Gameboard
            sendDataToView
            registerHit
            sendHitDataShipArray
            isGameOver
        - Player
            placeShip
            sendHitDataGameboard
            isTurnOver
            isAllShipsSunk
        - Ship
            isSunk
    
#----------------------------------------------------------------#

- COMMUNICATION
    -Gameflow-

        - Will create Players and Gameboard
        - Will tell Gameboard when to start and when to finish a game
        - Will tell Player when it's his turn

    -Gameboard-

        - Will tell View module how to render the Gameboard
        - Will tell Gameflow if the game is in state to end 
        - Will tell Ships which positions they belong to
        - Will tell Ships IF they got hit
        - Will tell Ships WHERE they got hit
        - Will tell itself if there was a missing hit
        
    -Player-

        - Will tell Gameflow if they are done with the turn
        - Will tell Gameboard where to hit within the grid
        - Will tell Gameboard if all their ships are sunk 
        - Will tell Ship when to be placed
    -Ship-
        - Will tell Gameboard where to place the Ships (getSquaresPlaced)
        - Will tell Player if the Ship is sunk (isSunk)

#----------------------------------------------------------------#

- COMPONENTS OF BATTLESHIP DISPLAY
 - Display
    - Two gameboards with it's ships placed
    - Lower part showing a form to enter usernames, and a
      score when the game has started

