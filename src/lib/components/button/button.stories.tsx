import React from 'react';
import { action } from "@storybook/addon-actions";
import { withKnobs } from '@storybook/addon-knobs';
// @ts-ignore
import {withLiveEditScope, withLiveEdit} from 'storybook-addon-react-live-edit';
import { Button } from './button';

export default {
  title: 'Tailwind Buttons',
  component: Button,
  // @ts-ignore
  decorators: [withKnobs, _ => withLiveEditScope({React, Button})(_, {React, Button}) ]
};

export const SolidButtons = () => (
    <div>
        <div>
            <Button size={'mini'} onClick={action('button has been clicked')}>Mini Solid Button</Button><br /><br />
        </div>
        <div>
            <Button size={'small'} color={'ig-alt'} onClick={action('button has been clicked')}>Small IG-Alt Button</Button><br /><br />
        </div>
        <div>
            <Button color={'danger'} onClick={action('button has been clicked')}>Solid Danger Button</Button><br /><br />
        </div>
        <div>
            <Button size={'large'} color={'tw-honeydew'} onClick={action('button has been clicked')}>Large Honeydew Button</Button><br /><br />
        </div>
    </div>
);
export const OutlineButtons = () => (
    <div>
        <div>
            <Button variant={'outline'} size={'mini'}>Mini Outline Button</Button><br /><br />
        </div>
        <div>
            <Button variant={'outline'} size={'small'}>Small Outline Button</Button><br /><br />
        </div>
        <div>
            <Button variant={'outline'}>Outline Button</Button><br /><br />
        </div>
        <div>
            <Button variant={'outline'} color={'tw-honeydew'} size={'large'}>Large Outline Button</Button><br /><br />
        </div>
    </div>
);

export const LinkButtons = () => (
    <div>
        <div>
            <Button variant={'link'} size={'mini'}>Mini Link Button</Button><br /><br />
        </div>
        <div>
            <Button variant={'link'} size={'small'}>Small Link Button</Button><br /><br />
        </div>
        <div>
            <Button variant={'link'}>Link Button</Button><br /><br />
        </div>
        <div>
            <Button variant={'link'} size={'large'}>Large Link Button</Button><br /><br />
        </div>
    </div>
);

// @ts-ignore
export const Playground = (_) => withLiveEdit("return " +
    "<Button size={'mini'}>Mini Solid Button</Button>"
)(_);
