import * as React from 'react';
import {StatelessComponent} from 'react';
import classVariations from '../../helpers/classVariations';
import './_auto-complete-create-collection.scss';

type Props = {
    variations?: string[],
    onSelect?: (value: any) => void,
    onCreate?: (value: any) => void,
    value?: any,
    active?: boolean
}

const AutoCompleteCreateCollection: StatelessComponent<Props> = (
    {children, variations = [], onSelect = () => {}, onCreate = () => {}, value = undefined, active = false}
) => {
    return (
        <div className={classVariations('auto-complete-create-collection', active ? [...variations, 'active'] : variations )}
             onClick={() => onCreate(value)}>
            <h3 className="auto-complete-create-collection__title">Viltu ekki bara búa hana til?</h3>
        </div>
    )
};

export default AutoCompleteCreateCollection;
