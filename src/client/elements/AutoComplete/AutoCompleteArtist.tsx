import * as React from 'react';
import {StatelessComponent} from 'react';
import classVariations from '../../helpers/classVariations';
import Avatar from '../Avatar'
import {GraphQLTypes} from "../../../../@types";
import {validDate} from '../../helpers/date';
import './_auto-complete-artist.scss';

interface Props {
    variations?: string[];
    onSelect?: (value: any) => void;
    value?: GraphQLTypes.Artist;
    active?: boolean;
}

const AutoCompleteArtist: StatelessComponent<Props> = (
    {children, variations = [], onSelect = () => {}, value = undefined, active = false}
) => {
    const fromDates = (value!.periods || []).map(period => period.from).filter(validDate).map(date => new Date(date).getTime()); //@todo fix !
    const toDates = (value!.periods || []).map(period => period.to).filter(validDate).map(date => new Date(date).getTime()); //@todo fix !
    const minDate = Math.min(...fromDates);
    const maxDate = Math.max(...toDates);

    return (
        <div className={classVariations('auto-complete-artist', active ? [...variations, 'active'] : variations )}
            onClick={() => onSelect(value)}>
            <div className="auto-complete-artist__icon">
                <Avatar src={value!.avatar || undefined} variations={['sm']} />
            </div>
            <div className="auto-complete-artist__content">
                <h3 className="auto-complete-artist__title">{value!.name}</h3>
                <time className="auto-complete-artist__time">
                    {minDate !== Infinity && new Date(minDate).getFullYear()} - {maxDate !== -Infinity && new Date(maxDate).getFullYear()}
                </time>
            </div>
        </div>
    )
};

export default AutoCompleteArtist;
