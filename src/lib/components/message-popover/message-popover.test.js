import React from 'react';
import { mount } from 'enzyme';
import { MessagePopover } from './message-popover';

it('Popover renders without crashing', () => {
    const myTarget = document.createElement('div');
    myTarget.setAttribute('id', 'myTarget');
    mount(<MessagePopover target={'myTarget'} message={'My Message'} show={true} />);
});
