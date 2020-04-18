
import React from 'react';
import {setAddon} from '@storybook/react';
import { action } from "@storybook/addon-actions";
import reactElementToJSXString from 'react-element-to-jsx-string';

//@ts-ignore no type definitions are available for this add-on
import { withLiveEdit } from 'storybook-addon-react-live-edit';

//@ts-ignore no type definitions are available for this add-on
import LiveEdit, { withLiveEditScope, setOptions } from 'storybook-addon-react-live-edit';

setOptions({ theme: 'darcula', presets: ['react'] });

setAddon(LiveEdit);

/**
 * Turns JSX into a string.  Needed for calling withLiveEdit (see below)
 * @param element React Node
 */
const jsxToString: (element: React.ReactNode) => string = (element) => {
  return 'return ' + reactElementToJSXString(element, { showFunctions: true });
};

export type StorybookAction = typeof action;
export const liveEdit = (element: React.ReactNode) => (action: StorybookAction) => withLiveEdit(jsxToString(element))(action);
export const liveEditScope = (scope: object) => withLiveEditScope({ action, React, ...scope });
