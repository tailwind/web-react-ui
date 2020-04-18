import './boilerplate.styles.scss';
import React, { FC } from 'react';


/**
 * BoilerplateProps
 *
 * @memberof Boilerplate
 */
interface BoilerplateProps {
    /**
     * Example optional prop. ~~ Replace this with your optional props
     */
    anOptionalProp?: boolean,
};

/**
 * A Simple Dropdown Component
 */
export const Boilerplate: FC<BoilerplateProps> = (
    {
        anOptionalProp = false, // default value is a no-op
        ...props
    }
) => {

    // Render
    return (
        <div className="boilerplate" >
            Boilerplate Component
        </div>
    )
};
