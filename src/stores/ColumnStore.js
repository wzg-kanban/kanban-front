import ColumnActions from '../actions/ColumnActions';
import update from 'react-addons-update';

export default class ColumnStore {
    constructor() {
        this.bindActions(ColumnActions);

        this.columns = [];
    }

    create(column) {
        column.notes = column.notes || [];

        this.setState({
            columns: [...this.columns, column]
        });
    }

    update(updatedColumn) {
        this.setState({
            columns: this.columns.map(column => {
                if(column.id === updatedColumn.id){
                    return Object.assign({}, column, updatedColumn);
                }
                return column;
            })
        });
    }

    delete(id) {
        this.setState({
            columns: this.columns.filter(column => column.id !== id)
        })
    }

    attachToColumn({columnId, noteId}) {
        this.setState({
            columns: this.columns.map(column => {
                if(column.notes.includes(noteId)) {
                    column.notes = column.notes.filter(note => note !== noteId);
                }
                if(column.id === columnId) {
                    column.notes = [...column.notes, noteId];
                }
                return column;
            })
        });
    }

    detachFromColumn(noteId, columnId) {
        this.setState({
            columns: this.columns.map(column => {
                if(column.id === columnId) {
                    column.notes = column.notes.filter(note => note !== noteId);
                }
                return column;
            })
        })
    }

    //TODO: It's late, but I need to understand it later (yes, I copied that. Sorry :( )
    move({sourceId, targetId}) {
        const columns = this.columns;
        const sourceColumn = columns.filter(column => column.notes.includes(sourceId))[0];
        const targetColumn = columns.filter(column => column.notes.includes(targetId))[0];
        const sourceNoteIndex = sourceColumn.notes.indexOf(sourceId);
        const targetNoteIndex = targetColumn.notes.indexOf(targetId);

        if(sourceColumn === targetColumn) {
            // move at once to avoid complications
            sourceColumn.notes = update(sourceColumn.notes, {
                $splice: [
                    [sourceNoteIndex, 1],
                    [targetNoteIndex, 0, sourceId]
                ]
            });
        }
        else {
            // get rid of the source
            sourceColumn.notes.splice(sourceNoteIndex, 1);

            // and move it to target
            targetColumn.notes.splice(targetNoteIndex, 0, sourceId);
        }

        this.setState({columns});
    }
}