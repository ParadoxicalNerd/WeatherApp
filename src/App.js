import React from 'react'

import PrimaryScreen from './primary_screen'
import SecondaryScreen from './secondary_screen'
import Footer from './Footer'

import { connect } from 'react-redux'
import { getCoordinates, fetchWeather, fetchPlaceName, searchByPlace } from './redux/actions'

import './index.scss'

class App extends React.Component {

    //These states enable for error checking
    state = {
        fetchingData: true,
        locationError: false,
        networkError: false,
        online: true
    }

    async componentDidMount() {
        // Try fetching all the data. In case of an error, set appropriate error parameter
        if (navigator.onLine) {
            try {
                await this.props.getCoordinates()
                await Promise.all([
                    this.props.fetchWeather(this.props.store.location),
                    this.props.fetchPlaceName(this.props.store.location)
                ])

            } catch (e) {
                if (e.type === 'geolocation') {
                    this.setState({ locationError: true })
                } else if (e.type === 'network') {
                    this.setState({ networkError: true })
                }
            } finally {
                this.setState({ fetchingData: false })
            }
        } else {
            this.setState({ online: false })
        }
    }

    async componentDidUpdate() {
        // Calls weather api after there is a change in location name
        if (this.props.store.searchByPlace) {
            await this.props.fetchWeather(this.props.store.location)
        }
    }

    render() {
        // Returns the various kinds of outputs
        if (!this.state.online) {
            return (<h1>Connect to the internet, please!</h1>)
        } else if (this.state.fetchingData) {
            return (<h1>Hold on!</h1>)
        } else if (this.state.locationError) {
            return (
                <>
                    <h1>Enable Location Access to continue.</h1>
                    <h3>You may be seeing this even after enabling location access. If you are, I'm sorry, but I'm too dumb to fix this. </h3>
                </>
            )
        } else if (this.state.networkError) {
            return (<h1>Error connecting to DarkCloud API. Check your firewall.</h1>)
        } else {
            return (
                <>
                    <PrimaryScreen
                        temperature={this.props.store.weather.currently.temperature}
                        units={this.props.store.weather.flags.units}
                        city={this.props.store.location.city}
                        summary={this.props.store.weather.currently.summary}
                        icon={this.props.store.weather.currently.icon}
                    />
                    <SecondaryScreen weather={this.props.store.weather.daily} />
                    <Footer />
                </>
            )
        }
    }
}

// Bridges Redux to React
const mapStateToProps = (state) => ({
    store: state
})

const mapDispatchToProps = (dispatch) => ({
    getCoordinates: () => dispatch(getCoordinates()),
    fetchWeather: (location) => dispatch(fetchWeather(location)),
    fetchPlaceName: (location) => dispatch(fetchPlaceName(location)),
    stopSearchingByPlace: () => dispatch(searchByPlace(null, false))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)