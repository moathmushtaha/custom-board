import React, {createContext, useContext, useEffect, useState} from 'react';
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

    const getItems = async () => {
        let items = [];
        await monday.get("context").then(async res => {
            const boardId = res?.data?.boardId ?? "3312382486";
            const getItemsQuery = `query { boards (ids: ${boardId}) { columns {title type }  items { id name column_values {title text}} } }`

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
            });
        });
        return items;
    }
    const callback = (res) => {
        console.log("callback", res);
        const type = res.type;
        if (type === "new_items") {
            getItems().then(res => {
                setItems(res);
            });
        }
    };

    useEffect(() => {
        getItems().then(res => {
            setItems(res);
        });
        monday.listen("events", callback);
    }, []);


    const value = {
        items,
    }

    return (
        <ItemsContext.Provider value={value}>
            {children}
        </ItemsContext.Provider>
    );
}