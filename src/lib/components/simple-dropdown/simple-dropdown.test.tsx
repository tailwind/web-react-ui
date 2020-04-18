import React from 'react';
import { mount } from 'enzyme';
import { SimpleDropdown } from './simple-dropdown';

it('SimpleDropdown renders without crashing', () => {
    mount(
        (<SimpleDropdown
            label="Fruits"
            options={["apple", "banana", "strawberries"]}
            onChange={event => console.log("Selected value: `${event.target.value)`")}
        />));
});
