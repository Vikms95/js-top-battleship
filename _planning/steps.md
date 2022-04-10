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
 - List of ilegal moves:
  -Placing ships
    :some ship squares are outside of grid boundaries(check grid boundaries)
    :outside of grid
    :an already filled square(check if square has class ship)
  -Attacking
    :outside the grid
    :an already attacked square(check hit in boardgrid)
    :its own grid

 - Make array modifiers to return a new array(addShipToBoardGridObject)

 -BUG-
 <!-- - switchBoards not switching boards -->
<!-- - _boardGrid not being marked correctly -->