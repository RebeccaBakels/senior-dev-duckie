import React from 'react'

function Duckies() {
    return(
        <>
       <img className='yellow-duck' src="assets\duckie.png" alt="yellow rubber duckie with record symbol" onClick={console.log('clicked')}/>
       <img className='red-duck' src="assets\stop.png" alt="red rubber duckie with stop symbol" />
       <img className='green-duck' src="assets\play.png" alt="green rubber duckie with play symbol" />
        </>
    )
}

export default Duckies