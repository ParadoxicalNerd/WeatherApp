import React from 'react'

export default class Temperature extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            temperature: props.temperature,
            units: props.units
        }

        this.onClick = this.onClick.bind(this)
    }

    // static getDerivedStateFromProps(props, state) {
    //     return ({ ...props })
    // }

    onClick() {

        if (this.state.units === 'us') {
            let temp = (this.state.temperature - 32) * 5 / 9
            this.setState((prevState) => ({
                temperature: temp,
                units: 'ca'
            }))
        } else {
            let temp = (this.state.temperature * 9 / 5) + 32
            this.setState((prevState) => ({
                temperature: temp,
                units: 'us'
            }))
        }

    }

    render() {
        let units = {
            'ca': "℃",
            'us': '℉',
            'uk2': '℃',
            'si': '℃'
        }
        return (
            <div className='temperature' onClick={this.onClick}>
                {this.state.temperature.toFixed(1)}{units[this.state.units]}
            </div>
        )
    }
}

