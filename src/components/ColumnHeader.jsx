import styles from './ColumnHeader.css';
import React from 'react';
import connect from '../libs/connect';
import ColumnActions from '../actions/ColumnActions';
import NoteActions from '../actions/NoteActions';
import Editable from './Editable';

const ColumnHeader = ({column, ColumnActions, NoteActions, ...props}) => {

    const deleteColumn = e => {
        e.stopPropagation();
        column.notes.forEach( note => {
            NoteActions.delete(note);
        });
        ColumnActions.delete(column.id);
    };

    const activateColumnEdit = () => {
        ColumnActions.update({
            id: column.id,
            editing: true
        });
    };
    const editName = name => {
        ColumnActions.update({
            id: column.id,
            name,
            editing: false
        });
    };

    return (
        <div className={styles.columnHeader} onClick={activateColumnEdit} {...props}>
            <Editable className={styles.columnName}
                      value={column.name}
                      onEdit={editName}
                      editing={column.editing}/>
            <div className={styles.columnDelete}>
                <button onClick={deleteColumn}>x</button>
            </div>
        </div>
    );
};

export default connect(() => ({}), {
    ColumnActions,
    NoteActions
})(ColumnHeader);