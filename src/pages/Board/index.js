import React, {useMemo, useState} from 'react';
import SlidingPane from "react-sliding-pane";
import Close from "monday-ui-react-core/dist/icons/Close";
import {Button} from "monday-ui-react-core";

import {ItemForm} from "../../components/ItemForm";
import ItemsTable from "../../components/ItemsTable";
import {useMonday} from "../../contexts/MondayContext";
import {ItemsProvider} from "../../contexts/ItemsContext";

import "react-sliding-pane/dist/react-sliding-pane.css";
import './style.css';

const Board = () => {
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [item, setItem] = useState({_id: '', name: '', description: '', status: ''});

    const togglePane = () => {
        resetItem();
        setIsAdd(true);
        setIsPaneOpen(!isPaneOpen);
    };

    const resetItem = () => {
        setItem({_id: '', name: '', description: '', status: ''});
    }

    const onRowClick = (row) => {
        setIsAdd(false);
        setItem(row);
        setIsPaneOpen(!isPaneOpen);
    }

    return (
        <div className="container mt-5">
            <ItemsProvider>
                <Button className="mb-3" size="small" onClick={togglePane}>New Item</Button>
                <SlidingPane
                    width="30%"
                    isOpen={isPaneOpen}
                    title="Item View"
                    onRequestClose={togglePane}
                    from="right"
                    closeIcon={<Close/>}
                >
                    <ItemForm togglePane={togglePane} item={item} isAdd={isAdd}/>
                </SlidingPane>
                <ItemsTable onRowClick={onRowClick}/>
            </ItemsProvider>
        </div>
    )
}

export default Board;