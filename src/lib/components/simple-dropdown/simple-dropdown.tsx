import React, {ChangeEventHandler, FC, useState, ChangeEvent} from 'react';
import './simple-dropdown.styles.scss';

/**
 * SimpleDropdownProps
 *
 * @memberof SimpleDropdown
 */
interface SimpleDropdownProps {
    /**
     * Label displayed on the left of the drop down.
     */
    label: string,
    /**
     * This is the list of values to be displayed on the Dropdown.
     */
    options: string[],

    /**
     * Event to fire when the value of the select element changes
     */
    onChange?: ChangeEventHandler<HTMLSelectElement>
};

/**
 * A Simple Dropdown Component
 */
export const SimpleDropdown: FC<SimpleDropdownProps> = (
    {
        onChange = event => { }, // default value is a no-op
        ...props
    }
) => {
    // Use State Hooks
    const [value, setValue] = useState(props.options.length > 0 ? props.options[0] : '');

    // Handle Change Function
    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event: ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
        onChange(event);
    };

    // Render
    return (
        <div className="simple-dropdown" >
            <label>
                {props.label}:
                <select value={value} onChange={handleChange}>
                    {
                        props.options.map(element =>
                            (
                                <option key={element} value={element}>{element}</option>
                            )
                        )
                    }
                </select>
            </label >
        </div >
    )
};
