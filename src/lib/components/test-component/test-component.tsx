import './test-component.styles.scss';
import React, { FC } from 'react';


/**
 * TestComponentProps
 *
 * @memberof TestComponent
 */
interface TestComponentProps {
    /**
     * Example optional prop. ~~ Replace this with your optional props
     */
    anOptionalProp?: boolean,
};

/**
 * A Simple Dropdown Component
 */
export const TestComponent: FC<TestComponentProps> = (
    {
        anOptionalProp = false, // default value is a no-op
        ...props
    }
) => {

    // Render
    return (
        <div className="test-component" >
            TestComponent Component
        </div>
    )
};
