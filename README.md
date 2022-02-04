# Waracle Cats

[waracle-cats.netlify.app](https://waracle-cats.netlify.app)

Developer test for Waracle, notes below on technologies deployed

### Javscript: 
Create React App - React, Redux, Redux Toolkit, Typescript

Notable packages - nanoid, react-dropzone, react-icons, react-router-dom

### CSS:
SASS & BEM - chosen to demonstrates knowledge of css methodologies, could have also used vanilla css and styled components

### Tests:
Jest - A simple set of unit tests for component logic

### Performace:
When considering performance the additional practices have been deployed;

- Lazy loading CSS & Javascript bundles dependant on route
- Lazy loading images
- Lighthouse testing

### Accessibility:
When considering accessibility the additional practices have been deployed;

- Aria labels on all user elements
- Focus states on all interactive elements
- Landmarks added
- Lighthouse testing

### Support:
This test has been built without the requirments of legacy browsers support, its been tested on the latest versions of;

- Chrome Mac Desktop
- Chrome Android
- Safari Mac Desktop

### Possible improvments:
Whilst there are limits to what can be achieved within the scope of this technical test, the following are areas that could improve the application;

- pagination, currently only supports 100 images
- error handling and user feedback for events and votes
- file upload validation on client side
- refactor user service into redux slice
- units testing of services and dispatch
- offline support

## Project setup
Installs dependencies, basic setup using parcel-bundler

#### `yarn`

Please add .env.local file to the project this must contain the following, with you own api key

#### `REACT_APP_API_KEY=XXXX`
#### `REACT_APP_API_BASE_URL=https://api.thecatapi.com/v1`

This does not stop the API key being compiled within the Javascript but does mean the key is not committed to GitHub. A real world app should have the key loaded via the server.

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn test`

Launches the test runner in the interactive watch mode.

#### `yarn build`

Builds the app for production to the `build` folder
