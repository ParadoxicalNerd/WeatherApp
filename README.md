# Forecast

### Live showcase: https://private-weather-app.netlify.app/

A simple React app to show the weather to the user. The app fetches the user location from gps coordinates and fetches weather from the DarkSky API. 

User can search for a place by clicking on the current location and typing the new place there.
The temperature units can also be switched by clicking on the current temperature.

To make this work, get your API key from the DarkSky API page (no more API keys are available) and export it as an environmental variable by the name DarkSkyAPIKey.

Note, this project is now structured to directly work with netlify becuase I was sick of using CORS-ANYWHERE. You can change the API endpoints as seen in the netlify.toml package if you want, but I just found it to be too much of work. Plus, my goal was to actually deply the app.

```
netlify dev
```

TODO:

[x] Implement refreshing of page when new location is typed out

[x] Use external API to determine location if geocoding fails

[ ] Add graph for daily weather

[x] Create a potrait mode friendly UI.

[x] Deploy the application

[ ] Migrate from DarkSky to Open Weather

[x] Comment all logic of code

[x] Fix bug that caused refetching of weather data

[x] Ensuring that API keys are not leaked to the user