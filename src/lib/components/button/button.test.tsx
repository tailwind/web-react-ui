import React from 'react';
import { mount } from 'enzyme';
import { Button } from './button';

it('Button renders without crashing', () => {
    mount(
        (<Button
            onClick={event => console.log("clicked")}
        >Button</Button>));
});
