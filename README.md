This is a Pokemon app which is built with React, Redux, ag-grid, Material-UI. Below are the steps to run this application
## **1** `npm install`
got to the app folder and run above command. This will install all the dependencies.

### **2** `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Branches
* There 2 branches in this repo master and develop branches
* change branch to develop branch before running the app since develop branch will have latest changes

## Impediments
* Can not implement search by weight, height, abilites of a pokemon since API doesn't provide all the details for the list display

## Screens
* http://localhost:3000/ - This is the home screen where list of pokemons will be displayed along with the option to set the limit for the list of pokemons to display.
User can filter based on name. Once user click on any of the pokemon in the grid app will navigate to details screen.

* http://localhost:3000/details - This screen will display the details of Pokemon like name, height, weight and abilities. next and previous options are avilable to view next/prev pokemon. On click of back button on top of card user will navigate back to home screen
