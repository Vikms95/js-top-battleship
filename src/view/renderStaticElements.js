export function renderStaticElements(gameboard,player){
    renderShips(gameboard,player)
}

const renderShips = (gameboard,player) =>{
    let index = 0
    let gridNodeList = Array.from(document.querySelectorAll(`.${player} > .grid-square`))
    for(const [key] of Object.entries(gameboard.getBoardGrid())){
        if(gameboard.getBoardGrid()[key]){
            gridNodeList[index].classList.add('ship')
        }
        index++
    }
}

// Slices the array in 8 different arrays,
// reverse them and then joins them on one array

const renderPlayerNames = (player) =>{
    
}

