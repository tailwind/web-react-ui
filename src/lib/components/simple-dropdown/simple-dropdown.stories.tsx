import React from 'react';
import { SimpleDropdown } from './simple-dropdown';
import { StorybookAction, liveEdit, liveEditScope } from '../../../storybook-utils';

export default {
    title: 'Simple Dropdown',
    component: SimpleDropdown,
    decorators: [liveEditScope({ SimpleDropdown })]
};

export const LiveEdit = (action: StorybookAction) => liveEdit(
    <div style={{ width: '100%' }}>
        <SimpleDropdown
            label="Fruits"
            options={["apple", "banana", "pear", "strawberries"]}
            onChange={event => action("Selected value is: " + event.target.value)(event)}
        />
    </div>
)(action);
