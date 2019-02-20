import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import {Grid, Row, Column} from '../../elements/Grid';
import CollectionHeader from '../../components/CollectionHeader';
import ArtistListItem from '../../components/ArtistListItem';
import ItemsList from '../../components/ItemsList';
import {List} from '../../elements/List';
import LoadingStrip from '../../elements/LoadingStrip';
import PublicationTable from '../../components/PublicationTable';
import Paper from '../../elements/Paper/index';
import {GraphQLTypes} from "../../../../@types";
import ItemSearch from "../../components/ItemSearch";
import '../../elements/MarkDownContainer/_index.scss';

interface Props {
    album: GraphQLTypes.Collection;
    loading: boolean;
    connectItem?: () => void;
}

export default class CollectionSection extends React.Component<Props> {

    static defaultProps = {
        album: {
            _id: undefined,
            name: undefined,
            genres: [],
            aka: [],
            releaseDates: undefined,
            songs: [],
            avatar: undefined,
            hero: undefined,
            artists: [],
            performers: [],
            publications: [],
        },
        connectItem: () => {}
    };

    render() {
        return (
            <Grid>
                <Row>
                    <Column>
                        <LoadingStrip loading={this.props.loading} />
                        <CollectionHeader collection={this.props.album} />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Paper>
                            <ItemSearch id={this.props.album._id} type="song" onSelect={this.props.connectItem} />
                            <ItemsList items={this.props.album.songs} />
                        </Paper>
                    </Column>
                    <Column>
                        <List>
                            {this.props.album.artists.map((artist: any) => ( //@todo fix any
                                <ArtistListItem key={`performer-${artist._id}`} artist={artist} />
                            ))}
                        </List>
                        <ReactMarkdown source={this.props.album.description || ''} />
                        <PublicationTable publications={this.props.album.publications || []} />
                    </Column>
                </Row>
            </Grid>
        );
    }
}
