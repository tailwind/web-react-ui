import React from 'react';
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from '@storybook/addon-knobs';
import { MessagePopover } from './message-popover';

export default {
  title: 'Message Popover',
  component: MessagePopover,
  decorators: [withKnobs]
};

export const DefaultUse = () => (
    <div style={{textAlign: 'center', height: '150px'}}>
        <div id={'myLeftTarget'} style={{float: 'left'}}>My Left Target</div>
        <div id={'myRightTarget'} style={{float: 'right'}}>My Right Target</div>
        <MessagePopover
            message={text('message', 'My Message')}
            show={true}
            target={text('target','myLeftTarget')}
            onBtnClick={action('Button has been clicked')}
        />
    </div>
);
