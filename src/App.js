import React from "react";

import mondaySdk from "monday-sdk-js";
import Board from "./pages/Board";

import "monday-ui-react-core/dist/main.css"
import "./App.css";
import {MondayProvider} from "./contexts/MondayContext";

const monday = mondaySdk();
monday.setToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE4MjQwNzIyNCwidWlkIjozNDU0NjI5MSwiaWFkIjoiMjAyMi0wOS0yMlQxNToyMjozNi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTM1MTkxNTksInJnbiI6InVzZTEifQ.sfeetISjxxm-ZJFoatByva25t-NEV3gOBhZr1TiVwr4");

const App = () => {
    return (
        <MondayProvider value={monday}>
           <Board/>
        </MondayProvider>
    );
};

export default App;
