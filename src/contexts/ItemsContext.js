import React, {createContext, useContext, useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {ADD_ITEM, GET_ITEMS, UPDATE_ITEM} from "../graghql/qql";

const ItemsContext = createContext();

export function useItems() {
    const context = useContext(ItemsContext);
    if (context === undefined) {
        throw new Error('useItems must be used within ItemProvider');
    }

    return context;
}

export function ItemsProvider({children}) {
    const [items, setItems] = useState([]);
    const {data} = useQuery(GET_ITEMS);
    const [addItemMutateFunction] = useMutation(ADD_ITEM);
    const [updateItemMutateFunction] = useMutation(UPDATE_ITEM);

    useEffect(() => {
        if (data) {
            setItems(data.items);
        }
    }, [data]);

    const addItem = (item) => {
        addItemMutateFunction({variables: item}).then((result) => {
            const newItem = result.data.createItem;
            setItems([newItem, ...items]);
        });
    }

    const updateItem = (_id,item) => {
        updateItemMutateFunction({variables: {_id,...item}}).then((result) => {
            setItems(items.map(item => item._id === result.data.updateItem._id ? result.data.updateItem : item));
        });
    }

    const value = {
        items,
        addItem,
        updateItem,
    }

    return (
        <ItemsContext.Provider value={value}>
            {children}
        </ItemsContext.Provider>
    );
}