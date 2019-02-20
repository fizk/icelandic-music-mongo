import * as React from 'react';
import {StatelessComponent} from 'react';
import classVariations from '../../helpers/classVariations';
import {GraphQLTypes} from "../../../../@types";
import './_index.scss';

export const List = ({children}: any) => ( //@todo fix any
    <ul className="list">{children}</ul>
);

export const ListHeader = ({children}: any) => (  //@todo fix any
    <div className="list-header">{children}</div>
);
export const ListFooter = ({children}: any) => (  //@todo fix any
    <div className="list-footer">{children}</div>
);

export const ListItemAvatar: StatelessComponent<{avatar: any; action?: string}> = ({children, avatar, action = undefined}) => (
    <li className="list-item">
        <div className="list-item__avatar">{avatar}</div>
        <div className="list-item__content">
            {children}
        </div>
        {action && <div className="list-item__action">{action}</div>}
    </li>
);

interface ListItemAvatarSelectProps {
    avatar: any;
    active?: boolean;
    onSelect?: (event: any) => void;
}

export const ListItemAvatarSelect: StatelessComponent<ListItemAvatarSelectProps> = ({children, avatar, active = false, onSelect = () => {}}) => (
    <li className={classVariations('list-item', active ? ['active'] : [])} onClick={onSelect}>
        <div className="list-item__avatar">{avatar}</div>
        <div className="list-item__content">
            {children}
        </div>
    </li>
);


export const ListItem = ({children}: any) => (  //@todo fix any
    <li className="list-item">
        <div className="list-item__content">
            {children}
        </div>
    </li>
);

export const ListItemNumbered: StatelessComponent<{action?: string}> = ({children, action = undefined}) => (
    <li className="list-item list-item--numbered">
        <div className="list-item__content">
            {children}
        </div>
        {action && <div className="list-item__action">{action}</div>}
    </li>
);

export const ListGenres: StatelessComponent<{genres?: GraphQLTypes.Genre[]}> = ({genres = []}) => (
    <List>
        {genres.map((genre, i) => (
            <li key={`genre-${genre.type}-${genre.style}-${i}`}>{genre.type}/{genre.style}</li>
        ))}
    </List>
);
export const ListPeriods: StatelessComponent<{periods?: GraphQLTypes.Period[]}> = ({periods = []}) => (
    <List>
        {periods.map((period, i) => (
            <li key={`periods-${i}`}>
                <time>{period.from && new Date(period.from).getFullYear()}</time> - <time>{period.to && new Date(period.to).getFullYear()}</time>
            </li>
        ))}
    </List>
);
