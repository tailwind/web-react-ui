import React from 'react';
import {FloatingDrawer} from "./floating-drawer";
import { withKnobs, boolean, radios, object } from "@storybook/addon-knobs";

export default {
    title: 'FloatingDrawer',
    component: FloatingDrawer,
    decorators: [withKnobs]
};

const placementOptions = {
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left'
};

export const DefaultFloatingDrawer = () => (
    <div style={{
        height: '550px',
        margin: '10px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid #ebedf0',
        padding: '48px',
        background: '#ececec',
    }}>
        <div style={{
            fontSize: '700%',
            opacity: 0.1,
            textAlign: 'center'
        }}>Container</div>
        <FloatingDrawer
            visible={boolean("Visible", true)}
            dismissable={boolean("Dismissable", true)}
            // @ts-ignore
            getContainer={boolean('Attach To document.body', false)}
            // @ts-ignore
            placement={radios('Placement', placementOptions, 'bottom')}
            onClose={() => alert('Close Icon Clicked!\n\nProvide an `onClose` handler to update the value passed to the `visible` property to close the drawer.\n\n To test it out here, use the "Knobs" tab below to alter the `visible` property.')}
            style={object('Style', { width: '90%' })}
            closeIconStyle={object('Close Icon Style', { color: 'black' })}
        >
            <h2>Floating Drawer</h2>
            <p>Use the "Knobs" tab to change options.</p>
            <p style={{textAlign: 'center', fontSize: '700%'}}>😀</p>
        </FloatingDrawer>
    </div>
);
