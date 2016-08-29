// Just for test purposes
import styles from './Column.css';
import React from 'react';
import connect from 'libs/connect';
import NoteActions from 'actions/NoteActions';
import ColumnActions from 'actions/ColumnActions';
import { DropTarget, DragSource } from 'react-dnd';
import ItemTypes from 'constants/itemTypes';
import { compose } from 'redux';
import Notes from './Notes';
import ColumnHeader from './ColumnHeader';
import ColumnFooter from './ColumnFooter';

const Column = ({
    connectNoteDropTarget, connectColumnDragSource, connectColumnDropTarget,
    column, notes, onMove, id, isDragging, isOver, ColumnActions,
    NoteActions, ...props}) => {

    const editNote = (id, task) => {
        NoteActions.update({id, task, editing: false});
    };
    const deleteNote = (noteId, e) => {
        e.stopPropagation();
        ColumnActions.detachFromColumn({noteId, columnId: column.id});
        NoteActions.delete(noteId);
    };
    const activateNoteEdit = id => {
        NoteActions.update({id, editing: true});
    };

    const move = (id, task) => {
        ColumnActions.move(task);
    };

    return compose(connectColumnDragSource, connectColumnDropTarget, connectNoteDropTarget)(
        <div style={{
                opacity: isDragging || isOver ? 0.4 : 1
            }} {...props} className={styles.column}>
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

const columnSource = {
    beginDrag(props) {
        return {
            id: props.id
        };
    }
};

const columnTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;

        if (sourceId !== targetId) {
            targetProps.onMove({sourceId, targetId});
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
        connectNoteDropTarget: connect.dropTarget()
    })),
    DragSource(ItemTypes.COLUMN, columnSource, connect => ({
        connectColumnDragSource: connect.dragSource()
    })),
    DropTarget(ItemTypes.COLUMN, columnTarget, connect => ({
        connectColumnDropTarget: connect.dropTarget()
    })),
    connect(({notes}) => ({
        notes
    }), {
        NoteActions,
        ColumnActions
    })
)(Column)
