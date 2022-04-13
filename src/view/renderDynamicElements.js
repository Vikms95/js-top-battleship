export function renderDynamicElements (attackIsMissed, element){
    console.log(attackIsMissed.playerAttackIsMissed)
    if(attackIsMissed.playerAttackIsMissed && element.classList.contains('hit')){
        return
    }else if(attackIsMissed.playerAttackIsMissed){
        renderSquareOnMiss(element)
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
