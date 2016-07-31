// Just for test purposes
import React from 'react';
import Notes from './Notes';
import uuid from 'uuid';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Learn React'
                },
                {
                    id: uuid.v4(),
                    task: 'Learn Webpack'
                },
                {
                    id: uuid.v4(),
                    task: 'Do laundry'
                }
            ]
        };

        //TODO: find solution to keep right context. Right now we need this :/
        //one that might help is: https://www.npmjs.com/package/autobind-decorator
        this.addNote = this.addNote.bind(this);
    }

    render() {
        const {notes} = this.state;

        return (
            <div>
                <button onClick={this.addNote}>+</button>
                <Notes notes={notes} />
            </div>
        );
    }

    addNote() {
        //TODO: read more about immutable.js
        //Not using .push, because concating two arrays create new array and it's better than altering existing state
        //Check for immutable.js. It's highly connected to Functional Programming paradigm :)
        this.setState({
            notes: this.state.notes.concat([{
                id: uuid.v4(),
                task: 'new task'
            }])
        });
    }
}