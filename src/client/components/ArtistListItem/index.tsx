import * as React from 'react';
import {Link} from 'react-router-dom'
import {ListItemAvatar} from '../../elements/List';
import Avatar from '../../elements/Avatar';
import {GraphQLTypes} from "../../../../@types";

type Props = {
    artist: GraphQLTypes.ArtistType
}

export default class ArtistListItem extends React.Component<Props > {

    static defaultProps = {
        artist: {
            _id: undefined,
            name: undefined,
            avatar: {
                url: undefined,
                base64: undefined,
            },
        },
        editMode: false,
    };

    render() {
        return (
            <ListItemAvatar avatar={<Avatar src={this.props.artist.avatar === null ? undefined : this.props.artist.avatar} />}>
                <Link to={`/listamenn/${this.props.artist._id}`}>{this.props.artist.name}</Link>
                {this.props.children}
            </ListItemAvatar>
        );
    }
}
