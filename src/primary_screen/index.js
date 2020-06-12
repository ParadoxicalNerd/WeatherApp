import React from 'react'

import Search from './search'
import Skycon from './skyconsWrapper'
import Temperature from './temperature'

//Simple component that renders the main screen

export default (props) => {
    return (
        <div className='CurrentWeather'>
            <Temperature temperature={props.temperature} units={props.units} key={props.temperature} />
            <Search />

            <div className='summary'>{props.summary}</div>
            <Skycon icon={props.icon} color={'black'} size={'100px'} animate={true} />
        </div>
    )
}