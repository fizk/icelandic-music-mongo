import * as React from 'react';
import {StatelessComponent} from 'react';
import classVariations from '../../helpers/classVariations';
import './_auto-complete-create-artist.scss';

type Props = {
    variations?: string[],
    onSelect?: (value: any) => void,
    onCreate?: (value: any) => void,
    value?: any,
    active?: boolean
}

const AutoCompleteCreateArtist: StatelessComponent<Props> = (
    {children, variations = [], onSelect = () => {}, onCreate = () => {}, value = undefined, active = false}
) => {
    return (
        <div className={classVariations('auto-complete-create-artist', active ? [...variations, 'active'] : variations )}
             onClick={() => onCreate(value)}>
            <h3 className="auto-complete-create-artist__title">Viltu ekki bara búa hana til?</h3>
        </div>
    )
};

export default AutoCompleteCreateArtist;
