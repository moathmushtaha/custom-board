import React, {useState} from 'react';
import SlidingPane from "react-sliding-pane";
import Close from "monday-ui-react-core/dist/icons/Close";
import {Button} from "monday-ui-react-core";

import {ItemForm} from "../../components/ItemForm";
import ItemsTable from "../../components/ItemsTable";
import {useMonday} from "../../contexts/MondayContext";
import {useMutation, gql} from '@apollo/client';

import "react-sliding-pane/dist/react-sliding-pane.css";
import './style.css';

const ADD_ITEM = gql`
    mutation CreateItem($name: String!, $description: String!, $status: String!) {
        createItem(itemInput: {name: $name, description: $description, status: $status}) {
            _id
            name
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
            name
        }
    }
`;

const Board = () => {
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [addItemMutateFunction, {addData, addLoading, addError}] = useMutation(ADD_ITEM);
    const [updateItemMutateFunction, {updateData, updateLoading, updateError}] = useMutation(UPDATE_ITEM);
    const [isAdd, setIsAdd] = useState(true);
    const [item, setItem] = useState({_id:'',name: '', description: '', status: ''});

    if (addError || updateError) {
        alert('Error');
    }

    const onSubmit = (values) => {
        if (isAdd) {
            addItemMutateFunction({
                variables: {
                    name: values.name,
                    description: values.description,
                    status: values.status
                }
            }).then(() => togglePane());;
        } else {
            console.log('update',item._id);
            updateItemMutateFunction({
                variables: {
                    _id: item._id,
                    name: values.name,
                    description: values.description,
                    status: values.status
                }
            }).then(() => togglePane());;
        }
    };

    const togglePane = () => {
        resetItem();
        setIsAdd(true);
        setIsPaneOpen(!isPaneOpen);
    };

    const resetItem = () => {
        setItem({_id:'',name: '', description: '', status: ''});
    }

    const onRowClick = (row) => {
        setIsAdd(false);
        setItem(row);
        setIsPaneOpen(!isPaneOpen);
    }

    return (
        <div className="container mt-5">
            <Button className="mb-3" size="small" onClick={togglePane}>New Item</Button>
            <SlidingPane
                width="30%"
                isOpen={isPaneOpen}
                title="Item View"
                onRequestClose={togglePane}
                from="right"
                closeIcon={<Close/>}
            >
                <ItemForm onSubmit={onSubmit} item={item} isAdd={isAdd}/>
            </SlidingPane>
            <ItemsTable onRowClick={onRowClick}/>
        </div>
    )
}

export default Board;