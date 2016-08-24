import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Columns from '../src/components/Columns';

describe('Component: Columns', () => {
    const minProps = {
        columns: []
    };
    it('renders without exploding', () => {
        expect(
            shallow(
                <Columns {...minProps}/>
            ).length
        ).toEqual(1);
    });
});