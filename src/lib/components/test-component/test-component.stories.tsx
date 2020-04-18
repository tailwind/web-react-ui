import React from 'react';
import {TestComponent} from "./test-component";
import { StorybookAction, liveEdit, liveEditScope } from '../../../storybook-utils';

export default {
    title: 'TestComponent',
    component: TestComponent,
    decorators: [liveEditScope({ TestComponent })]
};

export const LiveEdit = (action: StorybookAction) => liveEdit(
    <div style={{ width: '100%' }}>
        <TestComponent
            anOptionalProp={true}
        />
    </div>
)(action);
