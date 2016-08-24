import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Note from '../src/components/Note';

describe('Component: Note', () => {
    it('renders without exploding', () => {
        expect(
            shallow(
                <Note />
            ).length
        ).toEqual(1);
    });
});