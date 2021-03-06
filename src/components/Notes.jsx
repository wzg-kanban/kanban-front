import styles from './Notes.css';
import React from 'react';
import Note from './Note';
import Editable from './Editable';

//TODO: change this dummy way of creating empty callback
export default ({
    notes,
    onDelete = () => {},
    onEdit = () => {},
    onNoteClick = () => {},
    onMove = () => {}}) => (
    <ul className={styles.notes}>{notes.map(({id, editing, task}) =>
        <li key={id}>
            <Note
                editing={editing}
                onClick={onNoteClick.bind(null,id)}
                id={id}
                onMove={onMove.bind(null,id)}>
                <Editable
                    editing={editing}
                    value={task}
                    onEdit={onEdit.bind(null, id)} />
                <button className={styles.noteDelete} onClick={onDelete.bind(null, id)}>x</button>
            </Note>

        </li>
    )}</ul>
);