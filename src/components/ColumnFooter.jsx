import styles from './ColumnFooter.css';
import React from 'react';
import uuid from 'uuid';
import connect from 'libs/connect';
import NoteActions from 'actions/NoteActions';
import ColumnActions from 'actions/ColumnActions';

const ColumnFooter = ({column, ColumnActions, NoteActions, ...props}) => {
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

    return (
        <div className={styles.columnFooter} {...props}>
            <div className={styles.columnAddNote}>
                <a onClick={addNote}>Dodaj nową kartę</a>
            </div>
        </div>
    );
};

export default connect(() => ({}), {
    NoteActions,
    ColumnActions
})(ColumnFooter);