import React from 'react';
import {Boilerplate} from "./boilerplate";
import { StorybookAction, liveEdit, liveEditScope } from '../../../storybook-utils';

export default {
    title: 'Boilerplate',
    component: Boilerplate,
    decorators: [liveEditScope({ Boilerplate })]
};

export const LiveEdit = (action: StorybookAction) => liveEdit(
    <div style={{ width: '100%' }}>
        <Boilerplate
            anOptionalProp={true}
        />
    </div>
)(action);
