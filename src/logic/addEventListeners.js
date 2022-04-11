// Add event listeners to
//  - grid squares
export function addEventListeners (){
    const gridSquaresNodeList = document.getElementsByClassName('grid-square')
    Array.from(gridSquaresNodeList).forEach(square=>{
        square.addEventListener('click',(event) =>{
            console.log(event.target.id)
        })
    })
}