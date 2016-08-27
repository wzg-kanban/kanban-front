import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Note from '../src/components/Note';
import wrapInTestContext from './helpers';

describe('Component: Note', () => {
    it('renders without exploding', () => {
        const NoteContext = wrapInTestContext(Note);
        expect(
            shallow(
                <NoteContext />
            ).length
        ).toEqual(1);
    });
});