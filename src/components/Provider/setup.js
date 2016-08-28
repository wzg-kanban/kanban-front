import NoteStore from 'stores/NoteStore';
import ColumnStore from 'stores/ColumnStore';
import storage from 'libs/storage';
import persist from 'libs/persist';

export default alt => {
    alt.addStore('NoteStore', NoteStore);
    alt.addStore('ColumnStore', ColumnStore);
    persist(alt, storage(localStorage), 'app');
}