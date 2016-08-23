// Just for test purposes
import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import ColumnActions from '../actions/ColumnActions';
import Notes from './Notes';

const Column = ({column, notes, ColumnActions, NoteActions, ...props}) => {

    const editNote = (id, task) => {
        NoteActions.update({id, task, editing: false});
    };
    const addNote = e => {
        e.stopPropagation();

        const noteId = uuid.v4();
        NoteActions.create({
            id: noteId,
            task: 'New task'
        });
        ColumnActions.attachToColumn({
            columnId: column.id,
            noteId: noteId
        });

    };
    const deleteNote = (noteId, e) => {
        e.stopPropagation();
        ColumnActions.detachFromColumn(noteId, column.id);
        NoteActions.delete(noteId);
    };
    const activateNoteEdit = id => {
        NoteActions.update({id, editing: true});
    };

    return (
        <div {...props}>
            <div className="column-header">
                <div className="column-add-note">
                    <button onClick={addNote}>+</button>
                </div>
                <div className="column-name">{column.name}</div>
            </div>
            <Notes
                notes={selectNotesByIds(notes, column.notes)}
                onNoteClick={activateNoteEdit}
                onEdit={editNote}
                onDelete={deleteNote} />
        </div>
    );
};

function selectNotesByIds(allNotes, noteIds = []) {
    return noteIds.reduce((notes, id) =>
            notes.concat(
                allNotes.filter(note => note.id === id)
            )
        , []);
}

export default connect(
    ({notes}) => ({
        notes
    }), {
        NoteActions,
        ColumnActions
    }
)(Column)
