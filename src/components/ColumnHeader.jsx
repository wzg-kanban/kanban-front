import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import ColumnActions from '../actions/ColumnActions';

export default connect(() => ({}), {
    NoteActions,
    ColumnActions
})(({column, ColumnActions, NoteActions, ...props}) => {
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
        <div className="column-header" {...props}>
            <div className="column-add-note">
                <button onClick={addNote}>+</button>
            </div>
            <div className="column-name">{column.name}</div>
        </div>
    );
})