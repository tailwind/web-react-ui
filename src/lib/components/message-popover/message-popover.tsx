import React, {Component, MouseEventHandler} from 'react';
import ReactDOM from 'react-dom';
import './message-popover.styles.scss';

/**
 * MessagePopoverProps
 * @memberof MessagePopover
 * @alias MessagePopoverProps
 */
export interface MessagePopoverProps {
    /**
     * This is the ID of the element under which the popover will display.
     */
    target: string,
    /**
     * This is the message to display within the popover.
     */
    message: string,
    /**
     * A boolean to determine whether or not to show the popover.
     */
    show: boolean,
    /**
     * A function to call when the button within the popover is clicked.
     */
    onBtnClick?: MouseEventHandler<HTMLButtonElement>,
}

/**
 * The MessagePopover component displays a small popup below the `target` element.
 */
class MessagePopover extends Component<MessagePopoverProps> {

    /**
     * Default properties
     */
    static defaultProps: Pick<MessagePopoverProps, "onBtnClick"> = {
        onBtnClick: event => { }
    };

    private self: Element | Text | null | undefined;

    private target: HTMLElement | null | undefined;

    getTargetElement = () => {
        // Get the element the message should appear next to
        if (this.self) {
            this.target = this.self!.ownerDocument!.getElementById(this.props.target);
        }
    };

    componentDidMount() {
        this.self = ReactDOM.findDOMNode(this);
        this.getTargetElement();
        this.forceUpdate();
    }

    getPopoverPosition = () => {
        if (this.target) {
            // Get the dimensions of the target
            const targetRect = this.target.getBoundingClientRect();
            // Position the message relative to the target
            return {
                top: targetRect.top + targetRect.height + 6,
                left: targetRect.left
            };
        } else {
            return {};
        }
    };

    render() {
        this.getTargetElement();
        const showClass = this.props.show ? 'show' : 'hide';
        const position = this.target ? this.getPopoverPosition() : null;
        // Use a portal to attach this to the body rather than wherever it is rendered
        // in order to make positioning this element possible.
        if (position) {
            const containingElement = this.target!.ownerDocument!.body;
            return ReactDOM.createPortal(
                <div className={`message-popover ${showClass}-message`} style={{ ...position }}>
                    <div className="message-content">{this.props.message}</div>
                    <button className="message-popover-btn btn-popover pull-right"
                        onClick={this.props.onBtnClick}>Got It!</button>
                </div>,
                containingElement
            );
        } else {
            return <div style={{ display: 'none' }} />;
        }
    }
}

export { MessagePopover };
