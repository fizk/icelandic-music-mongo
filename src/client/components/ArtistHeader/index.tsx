import * as React from 'react';
import Hero from '../../elements/Hero';
import Avatar from '../../elements/Avatar';
import {GraphQLTypes} from "../../../../@types";
import './_index.scss';

interface Props {
    artist: GraphQLTypes.ArtistType;
}

export default class ArtistHeader extends React.Component<Props> {
    static defaultProps = {
        artist: {
            name: undefined,
            periods: [],
            genres: [],
            aka: [],
            hero: {
                url: undefined,
                base64: undefined,
            },
            avatar: {
                url: undefined,
                base64: undefined,
            },
        },
    };

    render() {
        return (
            <div className="artist-header">
                <div className="artist-header__hero">
                    <Hero src={this.props.artist.hero === null ? undefined : this.props.artist.hero} />
                </div>
                <div className="artist-header__headline">
                    <div className="artist-header__headline-avatar">
                        <div className="artist-header__avatar-container">
                            <Avatar src={this.props.artist.avatar === null ? undefined : this.props.artist.avatar}
                                variations={['lg']}
                            />
                        </div>
                    </div>
                    <div className="artist-header__headline-content">
                        <h1 className="artist-header__name">{this.props.artist.name}</h1>
                        <div>
                            <h4 className="artist-header__aka">
                                {(this.props.artist.aka || []).join(' | ')}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
