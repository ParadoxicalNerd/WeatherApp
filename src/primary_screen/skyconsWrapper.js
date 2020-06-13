import React from 'react'
import Mappings from './weatherIconMappings'
import Skycons from './skycons'

//Quick snappy wrapper for the Skycons library with React using refs
//See this:
//https://www.reddit.com/r/reactjs/comments/fdaw32/need_help_using_skycons/

export default class ReactSkycons extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            skycons: new Skycons({ color: props.color }),
            icon: Mappings(props.icon),
            ref: React.createRef(), //useRef works with functional componnets only
            size: props.size
        }
    }

    componentDidMount() {
        // Passes reference of the reference and icon needed to the API
        // This is because the API directly renders to the DOM
        this.state.skycons.add(this.state.ref.current, Skycons[this.state.icon])
        this.state.skycons.play()
    }

    componentWillUnmount() {
        this.state.skycons.pause()
        this.state.skycons.remove(this.state.ref.current)
    }

    render() {
        return (
            <canvas width={this.state.size} height={this.state.size} ref={this.state.ref} className='icon' />
        )
    }
}

// export default ({ icon, color, size }) => {
//     const canvas = React.useRef(null)
//     useEffect(() => {
//         const SkyIcon = new Skycons({ color })
//         // console.log(SkyIcon)
//         SkyIcon.prototype.add(canvas.current, Skycons[icon])
//         // SkyIcon.prototype.play()

//         return (
//             function () {
//                 SkyIcon.remove(canvas.current)
//             }
//         )
//     }, [icon, color, size])
//     return (<canvas ref={canvas} width={size} height={size} />)
// }