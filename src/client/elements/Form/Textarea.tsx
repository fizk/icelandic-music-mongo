import * as React from 'react';
import classVariations from '../../helpers/classVariations';
import {StatelessComponent} from "react";
import './_textarea.scss';

const Textarea = (props: any) => { //@todo fix any
    const {variations, ...rest} = props;
    return (<textarea className={classVariations('textarea', variations)} {...rest} />);
};

export {Textarea};

type Props = {
    variations?: string[]
}

const TextArea: StatelessComponent<Props> = ({variations = [], ...rest}) => (
    <textarea className={classVariations('textarea', variations)} {...rest} />
);


export default TextArea
