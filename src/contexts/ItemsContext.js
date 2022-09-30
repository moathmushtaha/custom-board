import React, {createContext, useContext, useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {ADD_ITEM, GET_ITEMS, UPDATE_ITEM} from "../graghql/qql";
import {useMonday} from "./MondayContext";

const ItemsContext = createContext();

export function useItems() {
    const context = useContext(ItemsContext);
    if (context === undefined) {
        throw new Error('useItems must be used within ItemProvider');
    }

    return context;
}

export function ItemsProvider({children}) {
    const monday = useMonday();
    const [items, setItems] = useState([]);
    const [addItemMutateFunction] = useMutation(ADD_ITEM);
    const [updateItemMutateFunction] = useMutation(UPDATE_ITEM);

    const getBoardId = async () => {
        await monday.get("context").then(res => {
            //console.log("context", res);
            //const boardId = res.data.boardId;
            //console.log("boardId", boardId);
            getItems("3311908855");
            //return boardId;
        });
    };


    const getItems = async (boardsId) => {
        let items = [];
        const getItemsQuery = `query { boards (ids: ${boardsId}) { columns {title type }  items { id name column_values {title text}} } }`
        await monday.api(getItemsQuery).then(res => {
            const data = res.data.boards[0].items;
            for (const datum of data) {
                datum._id = datum.id;
                const columnValues = datum.column_values;
                for (const columnValue of columnValues) {
                    if (columnValue.title === "Status" || columnValue.title === "status") {
                        datum.status = columnValue.text;
                    }

                    if (columnValue.title === "Description" || columnValue.title === "description") {
                        datum.description = columnValue.text;
                    }
                }
                items.push(datum);
            }
            setItems(items);
        });
    };

    const callback = (res) => {
        console.log("callback", res);
        const type = res.type;
        if (type === "new_items") {
            let items = [];
            monday.get("context").then(res => {
                const boardId = res?.data?.boardId ?? "3312382486";
                const getItemsQuery = `query { boards (ids: ${boardId}) { columns {title type }  items { id name column_values {title text}} } }`

                monday.api(getItemsQuery).then(res => {
                    const data = res.data.boards[0].items;
                    for (const datum of data) {
                        datum._id = datum.id;
                        const columnValues = datum.column_values;
                        for (const columnValue of columnValues) {
                            if (columnValue.title === "Status" || columnValue.title === "status") {
                                datum.status = columnValue.text;
                            }

                            if (columnValue.title === "Description" || columnValue.title === "description") {
                                datum.description = columnValue.text;
                            }
                        }
                        items.push(datum);
                    }
                    setItems(items);
                });
            });
        }
    };

    useEffect(() => {
        let items = [];
        monday.get("context").then(res => {
            const boardId = res?.data?.boardId ?? "3312382486";
            const getItemsQuery = `query { boards (ids: ${boardId}) { columns {title type }  items { id name column_values {title text}} } }`

            monday.api(getItemsQuery).then(res => {
                const data = res.data.boards[0].items;
                for (const datum of data) {
                    datum._id = datum.id;
                    const columnValues = datum.column_values;
                    for (const columnValue of columnValues) {
                        if (columnValue.title === "Status" || columnValue.title === "status") {
                            datum.status = columnValue.text;
                        }

                        if (columnValue.title === "Description" || columnValue.title === "description") {
                            datum.description = columnValue.text;
                        }
                    }
                    items.push(datum);
                }
                setItems(items);
            });
        });

        monday.listen("events", callback);
    }, []);

    const addItem = (item) => {
        addItemMutateFunction({variables: item}).then((result) => {
            const newItem = result.data.createItem;
            setItems([newItem, ...items]);
        });
    }

    const updateItem = (_id, item) => {
        updateItemMutateFunction({variables: {_id, ...item}}).then((result) => {
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