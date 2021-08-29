# trakt-app
Movie api consumer mobile app made with React Native

# Set-up
Before running the project, you'll need to create a file `secret/appConfig.json` in the root of the project. This file must contain your `Trakt.tv API ClientID` and your `OMDb API Key`. You can get those by following the steps on https://trakt.docs.apiary.io/# and https://www.omdbapi.com/apikey.aspx, respectively. Those are necessary for outputing movie data and image.
## secret/appConfig.json
```
{
  "TRAKT_API_CLIENT_ID": "YOUR_CLIENT_ID",
  "OMDB_API_KEY": "YOUR_API_KEY"
}
```

# Scripts

#### `yarn expo` or `npm expo`
Runs app on Expo.

#### `yarn test` or `npm test`
Runs Jest test config.
