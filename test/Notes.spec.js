import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Notes from '../src/components/Notes';

describe('Component: Notes', () => {
    const minNotes = [];

    it('renders without exploding', () => {
        expect(
            shallow(
                <Notes notes={minNotes} />
            ).length
        ).toEqual(1);
    });
});