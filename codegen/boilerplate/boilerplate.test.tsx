import React from 'react';
import { mount } from 'enzyme';
import { Boilerplate } from './boilerplate';

it('Boilerplate renders without crashing', () => {
    mount(
        (<Boilerplate
            aRequiredProp={true}
        />));
});
