import React, {useState , useEffect} from 'react';

import {ITableProps, kaReducer, Table} from 'ka-table';
import { selectSingleRow } from 'ka-table/actionCreators';
import {DataType, SortingMode} from 'ka-table/enums';
import {DispatchFunc} from 'ka-table/types';
import {useItems} from "../contexts/ItemsContext";

import "ka-table/style.css";

// initial value of the *props
const tablePropsInit: ITableProps = {
    columns: [
        {key: 'name', title: 'Name', dataType: DataType.String},
        {key: 'description', title: 'Description', dataType: DataType.String},
        {key: 'status', title: 'Status', dataType: DataType.String},
    ],
    rowKeyField: '_id',
    sortingMode: SortingMode.Single,
};

const ItemsTable = ({onRowClick}) => {
    const {items} = useItems();
    const [tableProps, changeTableProps] = useState(tablePropsInit);

    useEffect(() => {
        changeTableProps({
            ...tableProps,
            data: items,
        });
    }, [items]);

    const dispatch: DispatchFunc = (action) => {// dispatch has an *action as an argument
        // *kaReducer returns new *props according to previous state and *action, and saves new props to the state
        changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    };

    return (
        <div className='selection-single-demo'>
            <Table
                {...tableProps} // ka-table UI is rendered according to props
                dispatch={dispatch} // dispatch is required for obtain new actions from the UI
                childComponents={{
                    dataRow: {
                        elementAttributes: () => ({
                            onClick: (event, extendedEvent) => {
                                const selectedData = extendedEvent.childProps.rowData;
                                dispatch(selectSingleRow(selectedData._id));
                                onRowClick(selectedData);
                            },
                        })
                    },
                }}
            />
        </div>
    );
};

export default ItemsTable;