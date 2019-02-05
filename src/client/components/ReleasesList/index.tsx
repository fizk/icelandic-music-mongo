import * as React from 'react';
import {List, ListItemAvatar} from '../../elements/List';
import {Link} from 'react-router-dom';
import Poster from '../../elements/Poster';
import {Time} from '../../elements/Time';
import {GraphQLTypes} from "../../../../@types";

type Props = {
    releases: {uuid: string, collection: GraphQLTypes.CollectionType}[] | undefined,
}

export default class ReleasesList extends React.Component<Props> {

    static defaultProps = {
        releases: [],
    };

    render() {
        return (
            <List>
                {(this.props.releases || []).map(release => (
                    <ListItemAvatar key={`release-id-${release.collection._id}`} avatar={<Poster src={release.collection.avatar === null ? undefined : release.collection.avatar} />}>
                        <Link to={`/verk/${release.collection._id}`}>{release.collection.name}</Link>
                        <div>
                            {release.collection.releaseDates && (<Time>{new Date(release.collection.releaseDates).getFullYear()}</Time>)}
                            {!release.collection.releaseDates && <Time>-</Time>}
                        </div>
                        {release.collection.artists && release.collection.artists.length > 0 && release.collection.artists.map((artist: any) => ( //@todo fix any
                            <Link key={`listamenn-${artist._id}`} to={`/listamenn/${artist._id}`}>{artist.name}</Link>
                        ))}
                    </ListItemAvatar>
                ))}
            </List>
        );
    }
}
