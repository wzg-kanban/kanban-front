import styles from './App.css';
import React from 'react';
import uuid from 'uuid';
import connect from 'libs/connect';
import Columns from './Columns';
import ColumnActions from 'actions/ColumnActions';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

//TODO: FFFFFFUUUUUUUU I NEED TO USE COMPOSE INSTEAD OF DECORATORS SH**!
const App = ({columns, ColumnActions}) => {
    //TODO: try to use ESLint to force certain functions order (e.g. constructor, life cycle methods, render etc...)

    const addColumn = () => {
        ColumnActions.create({
            id: uuid.v4(),
            name: 'New column'
        });
    };

    return (
        <div>
            <button className={styles.columnAdd} onClick={addColumn}>+</button>
            <Columns columns={columns}/>
        </div>
    );
};

export default compose(
    DragDropContext(HTML5Backend),
    connect(({columns}) => ({
        columns
    }), {
        ColumnActions
    })
)(App);