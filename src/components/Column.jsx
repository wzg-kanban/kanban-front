// Just for test purposes
import React from 'react';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import ColumnActions from '../actions/ColumnActions';
import Notes from './Notes';
import ColumnHeader from './ColumnHeader';

const Column = ({column, notes, ColumnActions, NoteActions, ...props}) => {

    const editNote = (id, task) => {
        NoteActions.update({id, task, editing: false});
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
            <ColumnHeader column={column}/>
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
