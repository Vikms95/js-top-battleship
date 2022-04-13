export function renderDynamicElements (attackIsMissed, element){
    if(attackIsMissed){
        if(element && element.classList.contains('hit')){
            // Need to make sure to not execute the whole script
            return 
        }else{
            renderSquareOnMiss(element)
        }
    }
    renderSquareOnHit(element)
}

const renderSquareOnHit = (element) =>{
    element.classList.remove('ship')
    element.classList.add('hit')
}
  
const renderSquareOnMiss  = (element) =>{
    element.classList.add('miss')
  
}

const renderShipOnSink = () =>{

}

const renderMatchInfo = () =>{

}

const renderTurnInfo = () =>{
  
}

const renderWarningsInfo = () =>{

}
