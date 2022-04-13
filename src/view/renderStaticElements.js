export function renderStaticElements(gameboard,player){
    renderShips(gameboard,player)
}

const renderShips = (gameboard,player) =>{
    let index = 0
    let gridNodeList = Array.from(document.querySelectorAll(`.${player} > .grid-square`))
    if(player === 'player2'){
        gridNodeList = modifyArrayPlayer2(gridNodeList)
    }
    for(const [key] of Object.entries(gameboard.getBoardGrid())){
        if(gameboard.getBoardGrid()[key]){
            gridNodeList[index].classList.add('ship')
        }
        index++
    }
}

// Slices the array in 8 different arrays,
// reverse them and then joins them on one array
const modifyArrayPlayer2 = (array) =>{
    let index = 0
    let slicedArrays = []
    while(index < array.length){
        const arraySlice = array.slice(index, index + 8)
        arraySlice.reverse()
        slicedArrays.push(arraySlice)
        index += 8
    }
    return slicedArrays.flat()
}

const renderPlayerNames = (player) =>{
    
}

