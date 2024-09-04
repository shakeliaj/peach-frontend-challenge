This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Necessary Scripts

In the project directory, run:

#### `npm install`

To install all the packages necessary to start the application.

Then run,

#### `npm start`

Which will run the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Details about the project

I chose to use the following external packages when building this application.
- [Axios](https://axios-http.com/) for API requests/responses
- [Material UI](https://mui.com/material-ui/getting-started/) for its Pagination and Modal components
- [Redux](https://redux.js.org/) for state management
- [Sass](https://sass-lang.com/) for styling

__Notes:__

I spent a lot of time working on this so for the most part, I believe I had the opportunity to clean up the majority of the things that came to mind while developing this, but some of the improvements I would make are:
- fixing the aspect ratio of the images when the modal is open so that the images show more clearly and so that the size of the modal can be updated to more closely match the designs,
- making the pagination & query params on the **/search** page bi-directionally functional,
- potentially using styled-components for a little more dynamism,
- updating the rating stars UI to be more accurate (show half and 3/4 stars for decimal ratings),
- and writing some reusable SCSS (mixins, variables, etc.)





