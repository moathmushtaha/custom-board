import React from "react";

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import mondaySdk from "monday-sdk-js";
import Board from "./pages/Board";

import "monday-ui-react-core/dist/main.css"
import "./App.css";
import {MondayProvider} from "./contexts/MondayContext";

const monday = mondaySdk();
monday.setToken(process.env.MONDAY_API_TOKEN);

const api_url = "http://localhost:8302/graphql";
const client = new ApolloClient({
    uri: api_url,
    cache: new InMemoryCache(),
});

const query = gql`
    query {
        items {
            _id
            name
            description
            status
        }
    }
`;
client.query({query}).then((result) => console.log('ApolloClient',result));

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
