//This component as a search bar and a display bar combo.
import React from "react";
// import { SEARCH_BY_PLACE } from "../redux/types"
import { searchByPlace } from '../redux/actions'
import { connect } from "react-redux";

class fetchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevTyped: this.props.hydrator, // "Hydrates" the initial value with the passed name
            typed: this.props.hydrator, // "Hydrates" the initial value with the passed name
            prediction: "",
            coordinates: [],
            timerID: null,
            focus: false
        };

        this.serverFetch = this.serverFetch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onEnter = this.onEnter.bind(this);

        this.onFocus = this.onFocus.bind(this);
    }

    serverFetch() {
        //Fetches the most current place results from API if typed every one second. Sets this to the state
        this.setState({
            timer: setInterval(() => {
                if (
                    this.state.prevTyped !== this.state.typed &&
                    this.state.typed.length !== 0
                ) {
                    fetch(
                        `https://photon.komoot.de/api/?q=${
                        this.state.typed
                        }&osm_tag=place:city&limit=1`
                    )
                        .then(response => response.json())
                        .then(response => {
                            // console.log(response);
                            this.setState(prevState => ({
                                prevTyped: prevState.typed,
                                prediction: response.features[0].properties.name,
                                coordinates: response.features[0].geometry.coordinates
                            }));
                        });
                }
            }, 500) // Set's API request interval to 500ms
        })
    }

    componentDidMount() {
        //Start the API calls
        this.serverFetch();
    }
    componentWillUnmount() {
        //Safely end the API calls
        clearInterval(this.state.timerID)
    }

    onChange(e) {
        //When the user types something, updates state with value
        this.setState({ typed: e.target.value });
    }

    onClick() {
        //When the user clicks on a prediction set that to the city and call redux store
        this.setState(prevState => ({
            prevTyped: prevState.prediction,
            typed: prevState.prediction,
            focus: false // Only if user selects an option, let go
        }));
        this.props.setCity({ city: this.state.prediction, latitude: this.state.coordinates[1], longitude: this.state.coordinates[0] })

    }

    onEnter(e) {
        //Same as the onClick function but is executed when the uses presses the enter or the tab key
        if (e.key === "Enter" || e.key === 'Tab') {
            this.onClick();
        }
    }

    onFocus() {
        // If the user clicks inside region, show suggestions
        this.setState({
            focus: true
        })
    }

    render() {

        //Decides whether to show the predictions
        let predictionStyle =
            this.state.focus
                ? { display: "block" }
                : { display: "none" };

        predictionStyle = {
            ...predictionStyle,
            color: "grey",
            fontSize: "0.8em",
            cursor: "pointer",
            textAlign: 'center',
        };


        return (
            //Returns the combo
            <div className={'city'}>
                <input
                    type="text"
                    value={this.state.typed}
                    onChange={this.onChange}
                    onKeyDown={this.onEnter}
                    onFocus={this.onFocus}
                />
                <div
                    onClick={this.onClick}
                    style={{ ...predictionStyle }}
                >
                    {this.state.prediction}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    hydrator: state.location.city
})

const mapDispatchToProps = (dispatch) => ({
    setCity: (location) => dispatch(searchByPlace(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(fetchResults)