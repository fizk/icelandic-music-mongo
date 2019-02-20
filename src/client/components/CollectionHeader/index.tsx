import * as React from 'react';
import Hero from '../../elements/Hero';
import Poster from '../../elements/Poster';
import {GraphQLTypes} from "../../../../@types";
import './_index.scss';

interface Props {
    collection: GraphQLTypes.CollectionType;
}

export default class CollectionHeader extends React.Component<Props> {

    static defaultProps = {
        collection: {
            name: undefined,
            aka: [],
            genres: [],
            releaseDates: undefined,
            hero: {
                url: undefined,
                base64: undefined,
            },
            avatar: {
                url: undefined,
                base64: undefined,
            },
            releaseDate: 0,
        },
    };

    render() {
        return (
            <div className="collection-header">
                <div className="collection-header__hero">
                    <Hero src={this.props.collection.hero === null ? undefined : this.props.collection.hero} />
                </div>
                <div className="collection-header__headline">
                    <div>
                        <div className="collection-header__avatar-container">
                            <Poster variations={['lg']} src={this.props.collection.avatar === null ? undefined : this.props.collection.avatar}/>
                        </div>
                    </div>
                    <div>
                        <h1 className="collection-header__name">
                            {this.props.collection.name} {' - '}
                            {new Date(this.props.collection.releaseDates || 0).getFullYear()}
                        </h1>
                        <h4 className="collection-header__aka">
                            {(this.props.collection.aka || []).join(' | ')}
                        </h4>
                        {/*{(this.props.collection.genres || []).join(' | ')}*/}
                    </div>
                </div>
            </div>
        );
    }
}
