import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import ColumnActions from '../actions/ColumnActions';
import Editable from './Editable';

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
        <div className="column-header" onClick={activateColumnEdit} {...props}>
            <div className="column-add-note">
                <button onClick={addNote}>+</button>
            </div>
            <Editable className="column-name" value={column.name} onEdit={editName} editing={column.editing}/>
        </div>
    );
})