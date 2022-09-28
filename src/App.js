import React from "react";

import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import mondaySdk from "monday-sdk-js";
import Board from "./pages/Board";

import "monday-ui-react-core/dist/main.css"
import "./App.css";
import {MondayProvider} from "./contexts/MondayContext";

const monday = mondaySdk();
monday.setToken(process.env.MONDAY_API_TOKEN);

const api_url = process.env.REACT_APP_API_URL;
const client = new ApolloClient({
    uri: api_url,
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <MondayProvider value={monday}>
            <ApolloProvider client={client}>
                <Board/>
            </ApolloProvider>
        </MondayProvider>
    );
};

export default App;
