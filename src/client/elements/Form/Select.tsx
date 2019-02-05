import * as React from 'react';
import {StatelessComponent} from 'react';
import classVariations from '../../helpers/classVariations';

const Select: StatelessComponent<{variations: string[], defaultValue?: any, name?: string}> = ({children, variations = [], ...rest}) => {
    return (
        <select {...rest} className={classVariations('select', variations)}>{children}</select>
    );
};

export {Select};
