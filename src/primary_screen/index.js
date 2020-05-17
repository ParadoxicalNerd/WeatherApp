import React from 'react'

import Search from './search'
import Skycon from './skyconsWrapper'

//Simple component that renders the main screen

export default (props) => {
    return (
        <div className='CurrentWeather'>
            <div className='temperature'>{props.temperature}&deg;</div>
            <Search />

            <div className='summary'>{props.summary}</div>
            <Skycon icon={props.icon} color={'black'} size={'100px'} animate={true} />
        </div>
    )
}