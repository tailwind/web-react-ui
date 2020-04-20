import * as React from 'react';
import './floating-drawer.styles.scss';
import {Drawer} from "../ant-design";
import {DrawerProps} from 'antd/es/drawer';
import 'antd/es/drawer/style/index.css';
import {omitProps} from "../../utilities";

/**
 * Type for the getContainer property function that returns an HTMLElement
 */
type getContainerFunc = () => HTMLElement;

interface FloatingDrawerProps extends DrawerProps {
    /**
     * If `dismissable` is true, then a close icon will display in the top right of drawer. You must
     * provide an `onClose` handler to update the `visible` property passed to this component in order
     * to dismiss the drawer.
     */
    dismissable?: boolean;
    /**
     * `closable` is a property used by the Ant Design Drawer component. We override that property
     * and force a `false` value as using this property throws an error in our main application.
     * Please ignore the `closable` property and instead use `dismissable` along with `onClose`.
     */
    closable?: boolean;
    /**
     * `mask` is a property for the original Ant Design Drawer component that we omit in this
     * component. We force a value of `false` here. Please just ignore this property.
     */
    mask?: boolean;
    /**
     * Use the `style` property to provide custom styles to the FloatingDrawer component wrapper.
     * This wrapper will have a class of `floating-drawer`.
     */
    style?: React.CSSProperties;
    /**
     * The Floating Drawer can be nested inside a container or appended to `body`. If
     * omitted, the drawer will be attached to the `body` and
     */
    getContainer?: string | false | HTMLElement | getContainerFunc;

    closeIconStyle?: React.CSSProperties;
}

/**
 * A panel that slides in from one of the edges of a container or viewport.
 *
 * Under the hood, this component uses the Ant Design Drawer component
 * @see https://ant.design/components/drawer/
 *
 * We pass these properties directly to the And Design Drawer instance.
 *
 */
class FloatingDrawer extends React.Component<FloatingDrawerProps> {
    /**
     * Default properties
     */
    static defaultProps: FloatingDrawerProps = {
        dismissable: false,
        closeIconStyle: {}
    };

    /**
     * FloatingDrawer constructor
     * @param props
     */
    constructor(props: FloatingDrawerProps) {
        super(props);
        if (props.dismissable && !props.onClose) {
            console.error("If the drawer is dismissable, you must provide an `onClose` handler to update the value of the `visible` property.")
        }
    }

    /**
     * Displays a close icon within the drawer.
     */
    renderCloseIcon () {
        const {onClose, closeIconStyle} = this.props;
        return (
          <div className={'icon-close'} style={closeIconStyle} onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              if (onClose) {
                  onClose(event);
              }
          }}>X</div>
        );
    }

    /**
     * Renders the component
     */
    render() {
        const {placement, children, dismissable} = this.props;
        /**
         * this.props contains some properties that we do not want to pass down to the Ant Design Drawer
         * component, so we omit those properites here.
         */
        const propsToPassDown = {...omitProps(this.props, ['dismissable', 'closeIconStyle'])};
        return (
            <div className={'floating-drawer-container'}>
                <Drawer
                    className={`floating-drawer ${placement}`}
                    {
                        ...propsToPassDown
                    }
                    closable={false}
                    mask={false}
                >
                    {dismissable && this.renderCloseIcon()}
                    {children}
                </Drawer>
            </div>
        );
    }
}

export { FloatingDrawer };
