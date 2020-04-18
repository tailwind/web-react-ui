import React from 'react';
import { mount } from 'enzyme';
import { TestComponent } from './test-component';

it('TestComponent renders without crashing', () => {
    mount(
        (<TestComponent
            anOptionalProp={true}
        />));
});
