import styles from './ColumnHeader.css';
import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import ColumnActions from '../actions/ColumnActions';
import Editable from './Editable';

const ColumnHeader = ({column, ColumnActions, NoteActions, ...props}) => {
    const addNote = e => {
        e.stopPropagation();

        const noteId = uuid.v4();

        NoteActions.create({
            id: noteId,
            task: 'New task'
        });
        ColumnActions.attachToColumn({
            columnId: column.id,
            noteId
        });
    };

    const deleteColumn = e => {
        e.stopPropagation();

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
            <div className={styles.columnAddNote}>
                <button onClick={addNote}>+</button>
            </div>
            <Editable className={styles.columnName} value={column.name} onEdit={editName} editing={column.editing}/>
            <div className={styles.columnDelete}>
                <button onClick={deleteColumn}>x</button>
            </div>
        </div>
    );
};

export default connect(() => ({}), {
    NoteActions,
    ColumnActions
})(ColumnHeader);