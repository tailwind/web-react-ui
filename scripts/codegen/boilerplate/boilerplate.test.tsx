import React from 'react';
import { mount } from 'enzyme';
// @ts-ignore
import { Boilerplate } from './boilerplate';

it('Boilerplate renders without crashing', () => {
    mount(
        (<Boilerplate
            anOptionalProp={true}
        />));
});
