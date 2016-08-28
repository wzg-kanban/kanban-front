import NoteActions from 'actions/NoteActions';

export default class NoteStore {
    constructor() {
        this.bindActions(NoteActions);
        this.notes = [];
    }

    create(note) {
        //TODO: read more about immutable.js
        //Not using .push, because concatenating two arrays create new array and it's better than altering existing state
        //Check for immutable.js. It's highly connected to Functional Programming paradigm :)
        this.setState({
            notes: this.notes.concat(note)
        });
    }

    update(updatedNote) {
        this.setState({
            notes: this.notes.map(note => {
                if(note.id === updatedNote.id) {
                    return Object.assign({}, note, updatedNote);
                }

                return note;
            })
        });
    }

    delete(id) {
        this.setState({
            notes: this.notes.filter(note => note.id !== id)
        });
    }
}
