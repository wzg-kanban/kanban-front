// Just for test purposes
import styles from './App.css';
import React from 'react';
import Notes from './Notes';
import uuid from 'uuid';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';

//TODO: App class doesn't have state no more. Change it to function base component!
class App extends React.Component {
    //TODO: try to use ESLint to force certain functions order (e.g. constructor, life cycle methods, render etc...)

    render() {
        const {notes} = this.props;

        return (
            <div>
                <button className={styles.noteAdd} onClick={this.addNote}>+</button>
                <Notes
                    notes={notes}
                    onDelete={this.deleteNote}
                    onEdit={this.editNote}
                    onNoteClick={this.activateNoteEdit}/>
            </div>
        );
    }

    addNote = () => {
        //TODO: read more about immutable.js
        //Not using .push, because concating two arrays create new array and it's better than altering existing state
        //Check for immutable.js. It's highly connected to Functional Programming paradigm :)
        this.props.NoteActions.create({
            id: uuid.v4(),
            task: 'New task'
        });
    };

    deleteNote = (id, e) => {
        e.stopPropagation();
        this.props.NoteActions.delete(id);
    };

    editNote = (id, task) => {
        this.props.NoteActions.update({id, task, editing: false});
    };

    activateNoteEdit = (id) => {
        this.props.NoteActions.update({id, editing: true});
    };
}

export default connect(({notes})=>({
    notes
}), {
    NoteActions
})(App)