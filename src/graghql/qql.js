import {gql} from "@apollo/client";

//qql for all queries and mutations
const GET_ITEMS = gql`
    query GetItems {
        items {
            _id
            name
            description
            status
        }
    }
`;

const ADD_ITEM = gql`
    mutation CreateItem($name: String!, $description: String!, $status: String!) {
        createItem(itemInput: {name: $name, description: $description, status: $status}) {
            _id
            name
            description
            status
        }
    }
`;

const UPDATE_ITEM = gql`
    mutation CreateItem($_id:ID!,$name: String!, $description: String!, $status: String!) {
        updateItem(_id:$_id,itemInput:{
            name: $name,
            description: $description,
            status: $status
        }){
            _id
            name
            description
            status
        }
    }
`;


export {GET_ITEMS, ADD_ITEM, UPDATE_ITEM};
