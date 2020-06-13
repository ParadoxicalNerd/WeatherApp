import { GET_COORDINATES_FROM_BROWSER, FETCH_WEATHER, FETCH_NAME_FROM_COORDINATES, SEARCH_BY_PLACE } from "./types";

export const getCoordinates = () => {
    console.log('Getting coordinates from browser')
    return function (dispatch) { // Function is run by Thunk
        return new Promise((resolve, reject) => { // Promise is returned to the code, where it waits for completeion
            navigator.geolocation.getCurrentPosition( //Uses internal API to find location first
                position => {
                    dispatch(
                        {
                            type: GET_COORDINATES_FROM_BROWSER,
                            payload: {
                                error: null,
                                location: {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude
                                }
                            }
                        }
                    );
                    resolve();
                },
                error => {
                    // In case of an error, use external API. Kinda redundant as it finds location of server
                    // Assuming that server location is the closest to the user, its better than nothing
                    console.log("Internal Location Acess failed. Fetching location using external API")
                    fetch('/api/geolocation')
                        .then(response => response.json())
                        .then(response => {
                            dispatch({
                                type: GET_COORDINATES_FROM_BROWSER,
                                payload: {
                                    error: null,
                                    location: {
                                        latitude: response.lat,
                                        longitude: response.lon
                                    }
                                }
                            })
                            resolve()
                        })

                        // If even this fails, give up
                        .catch(
                            (error) => {
                                dispatch(
                                    {
                                        type: GET_COORDINATES_FROM_BROWSER,
                                        error: "Location not found!",
                                        location: {}
                                    }
                                )
                                reject({ error, type: 'geolocation' })
                            }
                        )
                },
                { timeout: 1000 } // The geolocation API sometimes takes inf amount of time. Use this to force breakout.
            );
        });
    };
};

export const fetchWeather = location => {
    console.log('Fetching Weather')
    // Gets the weather data from the DarkSky API
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            fetch(
                `/api/darksky/${
                location.latitude
                },${location.longitude}?extend=hourly&units=auto`
            )
                .then(response => response.json(), error => reject({ error, type: 'network' }))
                .then(
                    weather => {
                        dispatch({ type: FETCH_WEATHER, payload: weather });
                        resolve();
                    },
                    error => reject({ error, type: 'network' })
                );
        });
    };

};

export const fetchPlaceName = location => {
    console.log('Fetching Place Name')
    // Fetches place name from coordinates
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(
                `/api/openstreetmap/?lat=${
                location.latitude
                }&lon=${location.longitude}`
            )
                .then(response => response.json())
                .then(response => {
                    if (response.address.city) {
                        dispatch({ type: FETCH_NAME_FROM_COORDINATES, city: response.address.city });
                    } else {
                        // Sometimes there is no city name, like a sea or something.
                        // So use country name as fallback
                        dispatch({ type: FETCH_NAME_FROM_COORDINATES, city: response.address.country });
                    }
                    resolve();
                })
                .catch(
                    err => reject(err)
                )
        });
    };
};

export const searchByPlace = (location) => {
    console.log('Rewriting new place name');
    return { type: SEARCH_BY_PLACE, location }
}