import React from 'react';
import { mount } from 'enzyme';
import { FloatingDrawer } from './floating-drawer';

describe('FloatingDrawer', () => {
    it('FloatingDrawer renders without crashing', () => {
        mount(<FloatingDrawer />);
    });

    it('FloatingDrawer displays the drawer when `visible` is true', () => {
        const wrapper = mount(
            <FloatingDrawer
                visible={true}
            />);
        const p = wrapper.find('.ant-drawer').first();
        expect(p.hasClass('ant-drawer-open')).toBeTruthy();
    });

    it('FloatingDrawer does not display the drawer when `visible` is false', () => {
        const wrapper = mount(
            <FloatingDrawer
                visible={false}
            />
        );
        const p = wrapper.find('.ant-drawer');
        expect(p.length).toBeFalsy();
    });

    it('FloatingDrawer displays a close icon when `dismissible` is true', () => {
        const wrapper = mount(
            <FloatingDrawer
                visible={true}
                dismissable={true}
                onClose={() => {}}
            />);
        const p = wrapper.find('.icon-close');
        expect(p.exists()).toBeTruthy();
    });

    it('FloatingDrawer calls the `onClose` handler when `dismissible` is true and the close icon is clicked.', () => {
        let counter = 0;
        const wrapper = mount(
            <FloatingDrawer
                visible={true}
                dismissable={true}
                onClose={() => { counter++ }}
            />);
        const p = wrapper.find('.icon-close');
        p.at(0).simulate('click');
        expect(counter).toBe(1);
    });

});
