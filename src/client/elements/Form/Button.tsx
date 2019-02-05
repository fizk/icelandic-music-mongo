import * as React from 'react';
import classVariations from '../../helpers/classVariations';
import {StatelessComponent} from "react";
import './_button.scss';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    variations?: string[]
}

const Button: StatelessComponent<Props> =  ({children, variations = [], ...rest}) => {

    return (<button className={classVariations('button', variations)} {...rest}>{children}</button>);
};

export default Button;
export {Button}
