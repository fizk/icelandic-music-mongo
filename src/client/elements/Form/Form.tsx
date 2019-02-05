import * as React from 'react';
import classVariations from '../../helpers/classVariations';
import {StatelessComponent} from "react";
import './_form.scss';

type Props = {
    variations?: string[],
    onSubmit?: () => void
}

class Form extends React.Component<Props> {
    static defaultProps = {
        variations: [],
    };

    render() {
        const {variations, ...rest} = this.props;
        return (
            <form className={classVariations('form', variations)} {...rest}>{this.props.children}</form>
        );
    }
}

export {Form};


const TheForm: StatelessComponent<Props> = ({children, variations = [], ...rest}) => {
    return (
        <form className={classVariations('form', variations)} {...rest}>{children}</form>
    )
};

export default TheForm;

