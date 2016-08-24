import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Notes from '../src/components/Notes';

describe('Component: Notes', () => {
    it('renders without exploding', () => {
        const notes = [];
        expect(
            shallow(
                <Notes notes={notes} />
            ).length
        ).toEqual(1);
    });

    it('renders with three notes', () => {
        const notes = [
            {"id":"1d88d7be-57be-4ad8-be8f-6edad11b7d4c","task":"New task 1"},
            {"id":"7c9ce563-92cb-40f6-a1e6-908868869fd3","task":"New task 2"},
            {"id":"dd4ded88-c9ac-4e08-b319-48c66d474e2b","task":"New task 3"},
            {"id":"1a39262c-2a2f-46f0-b250-019f6c0ae4a2","task":"New task 4"}
        ];
        expect(
            shallow(<Notes notes={notes} />).find('ul').children().length
        ).toEqual(4);
    });

});