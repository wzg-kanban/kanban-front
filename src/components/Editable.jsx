import React from 'react';

const Editable = ({editing, value, onEdit}) => {
    return editing ?
        <Editable.Edit value={value} onEdit={onEdit} /> :
        <Editable.Value value={value} />;
};

class Edit extends React.Component {
    render() {
        const {value, onEdit, ...props} = this.props;

        return <input
            type="text"
            autoFocus={true}
            defaultValue={value}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter}
            {...props} />;
    }
    checkEnter = (e) => {
        if(e.key === 'Enter') {
            this.finishEdit(e);
        }
    };

    finishEdit = (e) => {
        const value = e.target.value;

        if(this.props.onEdit) {
            this.props.onEdit(value);
        }
    };
}

const Value = ({value, ...props}) =>
    <span {...props}>
        {value}
    </span>;

Editable.Edit = Edit;
Editable.Value = Value;

export default Editable;