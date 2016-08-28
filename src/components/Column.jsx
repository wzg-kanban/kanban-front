// Just for test purposes
import styles from './Column.css';
import React from 'react';
import connect from 'libs/connect';
import NoteActions from 'actions/NoteActions';
import ColumnActions from 'actions/ColumnActions';
import { DropTarget } from 'react-dnd';
import ItemTypes from 'constants/itemTypes';
import { compose } from 'redux';
import Notes from './Notes';
import ColumnHeader from './ColumnHeader';
import ColumnFooter from './ColumnFooter';

const Column = ({connectDropTarget, column, notes, ColumnActions, NoteActions, ...props}) => {

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

    const move = (id, task) => {
        ColumnActions.move(task);
    };

    return connectDropTarget(
        <div {...props} className={styles.column}>
            <ColumnHeader column={column}/>
            <Notes
                notes={selectNotesByIds(notes, column.notes)}
                onNoteClick={activateNoteEdit}
                onEdit={editNote}
                onDelete={deleteNote}
                onMove={move}
            />
            <ColumnFooter column={column}/>
        </div>
    );
};

const noteTarget = {
    hover(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;

        if(!targetProps.column.notes.length) {
            // TODO: there is a bug in this one
            ColumnActions.attachToColumn({
                columnId: targetProps.column.id,
                noteId: sourceId
            });
        }
    }
};

function selectNotesByIds(allNotes, noteIds = []) {
    return noteIds.reduce((notes, id) =>
        notes.concat(
            allNotes.filter(note => note.id === id)
        ), []);
}

export default compose(
    DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    connect(({notes}) => ({
        notes
    }), {
        NoteActions,
        ColumnActions
    })
)(Column)
