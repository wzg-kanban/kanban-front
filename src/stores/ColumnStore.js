import ColumnActions from '../actions/ColumnActions';

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

    attachToColumn({columnId, noteId}) {
        this.setState({
            columns: this.columns.map(column => {
                if(column.notes.includes(columnId)) {
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
}