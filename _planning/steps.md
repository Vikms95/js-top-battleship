<!-- - Import babel to make E6 import usable -->
<!-- - Test hit function within the Ship factory -->
<!-- - Implement addShipToBoardGrid -->
<!-- - Implement receiveAttackFromPlayer: 
Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
 - Implement test -->
 <!-- - Debug findSHipIndexByName (returning -1) -->
 <!-- - Implement removeShipFromShipsArray -->
 <!-- - Test isPlayerDefeated -->
 <!-- - Test removeSquare... refactor works -->
<!-- TODO Add event listener check -->

- LAST: Created event listeners with console.log to know when a click is recorded as valid or not
<!-- - How to change event listener gameboard everytime a player is swapped(check tic tac toe) -->
- Work on event listeners from grid
- Even if hit ship is false, mark is as hit

 - List of ilegal moves(done, continue when event listeners):
  -Placing ships(tests at createShip)
    <!-- :an already filled square(check if square has class ship) -->
    :some ship squares are outside of grid boundaries(check grid boundaries)
    :outside of grid
  -Attacking(test at receiveAttack)
    <!-- :an already attacked square(check hit in boardgrid) -->
    :outside the grid
    :its own grid

<!-- - Attach gameboard to each player(make function createPlayer? and putting createGameboard inside?) -->
 - Make array modifiers to return a new array(addShipToBoardGridObject)

 -BUG-
 <!-- - switchBoards not switching boards -->
<!-- - _boardGrid not being marked correctly -->