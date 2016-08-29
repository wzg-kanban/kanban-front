import React from 'react';
import Column from './Column';

export default ({
    columns,
    onMove = () => {}}) => (
    //TODO: doesn't work - no idea why
    <ul>{columns.map(column =>
        <li key={column.id}>
            <Column
                className="column"
                column={column}
                id={column.id}
                onMove={onMove.bind(null,column.id)}/>
        </li>
    )}</ul>
);