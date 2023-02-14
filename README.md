# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It uses the Giphy API to show image results to users.

## API Key

In order for the Giphy API to work properly, you must initialize the Giphy Fetch class with an appropriate API key.
Simply paste your key on line 8 of `App.js`:

```javascript
const gf = new GiphyFetch('<API_KEY>');
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.