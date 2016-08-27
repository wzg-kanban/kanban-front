import React from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

const wrapInTestContext = (DecoratedComponent) =>
    DragDropContext(TestBackend)(
        React.createClass({
            render: function () {
                return <DecoratedComponent {...this.props} />;
            }
        })
    );

export default wrapInTestContext;