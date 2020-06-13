import React from 'react'

import Search from './search'
import Skycon from './skyconsWrapper'
import Temperature from './temperature'

//Simple component that renders the main screen

export default (props) => {
    return (
        <div className='CurrentWeather'>
            {/*Using the key prop, we not only prevent unnecsary rerendering but also reset the state.
            See this: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component
            If you can understand this enough in future to actually fix this, please actually fix it*/}
            <Temperature temperature={props.temperature} units={props.units} key={props.temperature} />
            <Search />

            <div className='summary'>{props.summary}</div>
            <Skycon icon={props.icon} color={'black'} size={'100px'} animate={true} />
        </div>
    )
}