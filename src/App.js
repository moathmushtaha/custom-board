import React from "react";

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import mondaySdk from "monday-sdk-js";
import Board from "./pages/Board";

import "monday-ui-react-core/dist/main.css"
import "./App.css";
import {MondayProvider} from "./contexts/MondayContext";

const monday = mondaySdk();
monday.setToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE4MjQwNzIyNCwidWlkIjozNDU0NjI5MSwiaWFkIjoiMjAyMi0wOS0yMlQxNToyMjozNi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTM1MTkxNTksInJnbiI6InVzZTEifQ.sfeetISjxxm-ZJFoatByva25t-NEV3gOBhZr1TiVwr4");



// When an item/s are created on the board:
// => { type: "new_items", itemIds: [5543, 5544, 5545], boardId: 3425 }

// When a column value changes for one of the items:
// => { type: "change_column_value", itemId: 12342, value: {...} }

/*
async function createBoard() {
    let boardId = null;
    let groupId = null;
    let itemId = null;

    await monday.api(`mutation {create_board (board_name: "my board", board_kind: public) {id}}`).then((res) => {
        boardId = res.data.create_board.id;
    });

    if (boardId) {
        await monday.api(`mutation { create_group (board_id: ${boardId}, group_name: "group 1") { id } }`).then(res => {
            groupId = res.data.create_group.id
        });

        await monday.api(`mutation { create_item (board_id:  ${boardId}, group_id:  ${groupId}, item_name: "Item 1") { id }}`).then(res => {
            itemId = res.data.create_item.id
        });

        let params = [
            {title: "Name", description: "name", type: "text"},
            {title: "Description", description: "description", type: "text"},
            {title: "Status", description: "status", type: "text"},
        ]

        for (let i = 0; i < params.length; i++) {
            await monday.api(`
                mutation{
                  create_column(board_id: ${boardId}, title:"${params[i].title}", description: "${params[i].description}", column_type:text ) {
                    id
                    title
                    description
                  }
                }
            `)
        }
    }
}
*/


const api_url = "https://cd96-5-133-31-183.eu.ngrok.io/graphql";
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
