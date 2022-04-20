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
<!-- Add event listener check -->
<!-- - How to change event listener gameboard everytime a player is swapped(check tic tac toe) -->
<!-- - Attach gameboard to each player(make function createPlayer? and putting createGameboard inside?) -->
 <!-- - switchBoards not switching boards -->
<!-- - _boardGrid not being marked correctly -->
<!-- - Player 2 rendering needs to be backwards
  :divide in 8 arrays and reverse the arrays to later join them? -->
<!-- - Even if hit ship is false, mark is as hit -->
  <!-- -Attacking(test at receiveAttack) -->
  <!-- -an already attacked square(check hit in boardgrid -->
<!-- - All squares are being rendered red? -->
<!-- - Setup game with computer -->
  <!-- :handle object that send report of the attacks on gameLoop -->
  <!-- - Find within boardGrid the square with the coords send -->
  <!-- - Make computer not attack the same coords twice
    :store number selected and exclude it from future generations -->
  <!-- - If player click is on hit square, return the whole process so the computer does not get a free chance to attack -->

<!-- - Check square ship rendering and ship coordinates placing(seems to not be consistent)
  :player > gameboard ship placement and gameboard ship rendering should be the same
  :computer > only place ships, no rendering
    :addShipToBoardGridObject! not printing after iterating boardGrid object
      :when a coord is found, does not look the following coord from the beggining of the boardGrid -->

<!-- - Computer ships not being placed correctly -->

<!-- - Clean code to make it more functional styled -->

<!-- - Create function to end match -->

<!-- - Ideas on applying drag and drop for ship placement
  :drag div to grid, change property within the object on grid
  :lookup interact.js sourcecode
  :https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/#:~:text=Introduction%20to%20JavaScript%20Drag%20and%20Drop%20API&text=By%20default%2C%20only%20image%20and,you%20would%20drag%20an%20image. -->

- GAME SETUP - PLACE SHIPS AND CREATE
  <!-- - Query selector the items to be dragged
  - Add event listener drag start
  - Add hide class when dragstart is triggered
  - Add event listeners to the squares for all 4 properties
  - Create all 4 functions taking an event, preventing default and adding or removing the drag-over class to the elements
  - Last function, drop, will remove the drag-over property, get a reference to it with it's ID and append the draggable element to the drop target
  - Here I need to get the coordinate/s of the square/s where the draggable is dropped to
  - Store the values on an array, and create a ship with this
  - Remove the hide element from the draggable so the ship sticks there -->
<!-- // if element carrier and vertical, add ship class to all 5 elements below the drop point -->
  <!-- // if element carrier and horizontal, add ship class to all 5 elements to the right of the drop point -->
  <!-- // if element gets out of it's parent, do not allow! -->
  <!-- :renderSquaresHorizontally > if any element after the first has the "row" class, return  -->
  <!-- :renderSquaresVertically > if error giving undefined, return and reincorportate opacity of ship on the pool -->
  <!-- :get reference to the element previously dragged and remove its opacity property -->
  <!-- // if ship is placed outside of any square, it does not get places nor it reappears on the pool -->
  - SETUP PREPARE GAME FUNCTION -
  -Before starting game, function to let the player place their name and ships

  <!-- // HOW TO GET THE ARRAY OUT OF THE DROP EVENT LISTENER
  You'd have to do it from inside render..() because you cannot otherwise access a local variable from outside a function -->

  <!-- -For each placement of ship, add the values of ID's of each one to an array within an array of arrays -->
  <!-- -Do not start or add click event listeners to the board before having all the ships placed -->
<!-- 
  - Check if original square to style previous sibling had the ship class -->

  <!-- -If ship placed in a row with "row" class, it does not get placed because of the while loop -->
  <!-- : iterate anyway if the original squaresToStyle is the same as the current -->

<!-- - Vertical placement check
  :if it is succesful, check if any of the squares has the ship class
  :it is not succesful and the last square had the ship class, do not remove it
  : -->
<!-- - Refactor renderSquaresVertically and renderSquaresHorizontally -->

- Create a button to tell if place vertical or horizontal

  -Use that to create the gameboard later on
  make the gameboard with the arrays stored while placing the ships

  -Placing out of bounds or totally not on the board is handled, but need to check about placing the ship on a square which already has a ship class added to it, in that case, return
<!-- - Make ships in the pool be one element only! (Make them span multiple grid areas) -->

- Bug when one game ends and any square is clicked afterwards (I need to remove the event listeners while the game is not active)
  :game is passing by as a player is defeated again!

- Absolute positioned elements take hit
- Make letter appear one by one on turn-info