import * as React from 'react';
import './button.styles.scss';

/**
 * Button Optional Props
 *
 * @memberof Button
 */
interface ButtonOptionalProps {
    /**
     * The size of the button.
     */
    size?: 'mini' | 'small' | 'regular' | 'large',
    /**
     * The variant of button.
     */
    variant?: 'solid' | 'outline' | 'link',
    /**
     * The main color of the button. Only applies to the `solid` variant.
     */
    color?: 'tw' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger' | 'ig' | 'ig-alt' | 'pinterest' | 'tw-honeydew' | 'empty' | 'facebook' | 'cancel',
    /**
     * The action to take when the button is clicked
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    /**
     * Any html props to pass to the `button` element
     */
    [key: string]: any
}

/**
 * The Button component displays a button styled for the Tailwind brand.
 *
 * You can also pass any html props for the underlying `button` element.
 */
class Button extends React.Component<ButtonOptionalProps> {
    public static defaultProps: Partial<ButtonOptionalProps> = {
        size: 'regular',
        variant: 'solid',
        color: 'tw',
        onClick: (event) => {}
    };

    /**
     * Get the class for the provided size from props
     */
    getSize (): string {
        const {size} = this.props;
        switch(size) {
            case 'mini':
                return 'btn-bs4-mini';
            case 'small':
                return 'btn-bs4-sm';
            case 'large':
                return 'btn-bs4-lg';
            default:
                return ''
        }
    }

    /**
     * Get the class for the button type provided from props
     */
    getVariant (): string {
        const {variant, color} = this.props;
        switch(variant) {
            case 'outline':
                return `btn-bs4-tw-outline`;
            case 'link':
                return 'btn-bs4-link';
            default:
                return `btn-bs4-${color}`
        }
    }

    /**
     * Get any other props passed to the component, with specific props filtered out. These are
     * arbitrary props that are added to the button element.
     */
    getButtonProps (): Partial<ButtonOptionalProps> {
        const filterOutKeys = [
            'children', 'size', 'type', 'className', 'color', 'variant'
        ];
        return Object.keys(this.props)
            .filter(key => !filterOutKeys.includes(key))
            .reduce((obj: any, key: string) => {
                obj[key] = this.props[key];
                return obj;
            }, {});
    }

    /**
     * Render the button
     */
    render() {
        const {children, className = ''} = this.props;
        const buttonProps = this.getButtonProps();

        return (
            <button
                className={`btn-bs4 ${this.getSize()} ${this.getVariant()} ${className}`}
                {...buttonProps}
            >
                {children}
            </button>
        );
    }
}

export {Button}
