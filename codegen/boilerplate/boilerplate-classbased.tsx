import * as React from 'react';
import './boilerplate.styles.scss';


/**
 * Boilerplate Optional Props
 *
 * @memberof Boilerplate
 */
interface BoilerplateOptionalProps {
    /**
     * Example optional prop. ~~ Replace this with your optional props
     */
    anOptionalProp?: boolean,
}

/**
 * Boilerplate Props
 *
 * @memberof Boilerplate
 */
interface BoilerplateProps extends Required<BoilerplateOptionalProps> {
    /**
     * Example required prop. ~~ Replace this with your required props
     */
    aRequiredProp: boolean,
};

/**
 * Boilerplate State
 * @memberof Boilerplate
 */
interface BoilerplateState {
    /**
     * A State prop. ~~ Replace this with your state props
     */
    aStateProp: boolean
};

/**
 * The Boilerplate component.
 */
class Boilerplate extends React.Component<BoilerplateProps, BoilerplateState> {

    /**
     * Default properties
     */
    static defaultProps: Required<BoilerplateOptionalProps> = {
        anOptionalProp: false
    };

    constructor(props: BoilerplateProps) {
        super(props);
        this.state = { aStateProp: true };
    }

    render() {
        return (
            <div className="boilerplate">
                Boilerplate Component
            </div>
        );
    }
}

export { Boilerplate };
