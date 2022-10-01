import React, {useMemo, useState} from 'react';

import ItemsTable from "../../components/ItemsTable";
import {ItemsProvider} from "../../contexts/ItemsContext";

import "react-sliding-pane/dist/react-sliding-pane.css";
import './style.css';

const Board = () => {
    return (
        <div>
            <ItemsProvider>
                <ItemsTable/>
            </ItemsProvider>
        </div>
    )
}

export default Board;