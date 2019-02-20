import * as React from 'react';
import {Fragment} from 'react';
import ReactMarkdown from 'react-markdown';
import {Grid, Column, Row} from '../../elements/Grid';
import LoadingStrip from '../../elements/LoadingStrip';
import ArtistHeader from '../../components/ArtistHeader';
import ReleasesList from '../../components/ReleasesList';
import {List, ListGenres, ListHeader, ListPeriods} from '../../elements/List';
import PeriodYear from '../../elements/Period';
import ArtistListItem from '../../components/ArtistListItem';
import Paper from '../../elements/Paper';
import MemberTimeLine from '../../elements/MemberTimeLine';
import {GraphQLTypes} from "../../../../@types";
import CollectionSearch from '../../components/CollectionSearch';
import ArtistSearch from "../../components/ArtistSearch";
import SectionLoading from '../../elements/SectionLoading'
import '../../elements/MarkDownContainer/_index.scss';

interface Props {
    id: string;
    artist: GraphQLTypes.ArtistType;
    loading: boolean;
    isFound?: boolean;
    edit?: boolean;
    connectCollection?: () => void;
    connectMember?: () => void;
    isModals: {[key: string]: boolean};
    toggleModal: (object: {[key: string]: boolean}) => void;
}

export default class ArtistSection extends React.Component<Props> {
    static defaultProps = {
        artist: {
            _id: undefined,
            name: undefined,
            aka: [],
            description: undefined,
            periods: [],
            genres: [],
            contentType: {
                type: undefined,
                subtype: undefined,
            },
            albums: [],
            compilations: [],
            eps: [],
            singles: [],
            association: [],
            members: [],
            avatar: undefined,
            hero: undefined,
        },
        loading: false,
        isFound: true,
        edit: false,

        isModals: {},
        toggleModal: () => {},

        connectCollection: () => {},
        connectMember: () => {},
    };

    render() {
        return (
            <>
                <header>
                    <LoadingStrip loading={this.props.loading} />
                    <ArtistHeader artist={this.props.artist || undefined}/>
                </header>
                <main>
                    <Grid>
                        {this.props.loading && (
                            <Row>
                                <Column>
                                    <SectionLoading />
                                </Column>
                            </Row>
                        )}
                        {(this.props.loading === false && this.props.isFound === false) && (
                            <Row>
                                <Column>
                                    Couldn't find Artist
                                </Column>
                            </Row>
                        )}
                        {(this.props.loading === false && this.props.isFound) && (
                            <Row>
                                <Column>
                                    <Paper>
                                        <ReleasesList releases={this.props.artist.albums} />
                                        {this.props.isModals.album && (
                                            <>
                                                <CollectionSearch id={this.props.id} type="album" onSelect={this.props.connectCollection} />
                                                <button onClick={() => this.props.toggleModal({album: false})}>-</button>
                                            </>
                                        )}
                                        {!this.props.isModals.album && (
                                            <button onClick={() => this.props.toggleModal({album: true})}>+</button>
                                        )}

                                        <ListHeader><h3>Smáskífur</h3></ListHeader>
                                        <ReleasesList releases={this.props.artist.singles} />
                                        {this.props.isModals.single && (
                                            <>
                                                <CollectionSearch id={this.props.id}  type="single" onSelect={this.props.connectCollection} />
                                                <button onClick={() => this.props.toggleModal({single: false})}>-</button>
                                            </>
                                        )}
                                        {!this.props.isModals.single && (
                                            <button onClick={() => this.props.toggleModal({single: true})}>+</button>
                                        )}

                                        <ListHeader><h3>EP plötur</h3></ListHeader>
                                        <ReleasesList releases={this.props.artist.eps} />
                                        {this.props.isModals.ep && (
                                            <>
                                                <CollectionSearch id={this.props.id}  type="ep" onSelect={this.props.connectCollection} />
                                                <button onClick={() => this.props.toggleModal({ep: false})}>-</button>
                                            </>
                                        )}
                                        {!this.props.isModals.ep && (
                                            <button onClick={() => this.props.toggleModal({ep: true})}>+</button>
                                        )}

                                        <ListHeader><h3>Safnplötur</h3></ListHeader>
                                        <ReleasesList releases={this.props.artist.compilations} />
                                        {this.props.isModals.compilation && (
                                            <>
                                                <CollectionSearch id={this.props.id}  type="compilation" onSelect={this.props.connectCollection} />
                                                <button onClick={() => this.props.toggleModal({compilation: false})}>-</button>
                                            </>
                                        )}
                                        {!this.props.isModals.compilation && (
                                            <button onClick={() => this.props.toggleModal({compilation: true})}>+</button>
                                        )}
                                    </Paper>
                                </Column>
                                <Column>
                                    <List>
                                        {({
                                            'Person': (
                                                <Fragment>
                                                    {/*{(this.props.artist.association || []).map(artist => (*/}
                                                    {/*<ArtistListItem key={`artist-${artist.group._id}`} artist={artist.group}>*/}
                                                    {/*{artist.period.map((period, i) => (*/}
                                                    {/*<PeriodYear key={`${artist.group._id}-${period.from}-${i}`} from={period.from} to={period.to} />*/}
                                                    {/*))}*/}
                                                    {/*</ArtistListItem>*/}
                                                    {/*))}*/}
                                                </Fragment>
                                            ),
                                            'Group': (
                                                <Fragment>
                                                    {/*<ArtistSearch type="person" onSelect={this.props.connectMember} />*/}
                                                    {(this.props.artist.members || []).map(artist => (
                                                        <ArtistListItem key={`artist-${artist.artist._id}`} artist={artist.artist}>
                                                            {(artist.periods || []).map((period, i) => (
                                                                <PeriodYear key={`${artist.artist._id}-${period.from}-${i}`} from={period.from} to={period.to} />
                                                            ))}
                                                        </ArtistListItem>
                                                    ))}
                                                </Fragment>
                                            ),
                                        } as any)[this.props.artist.__typename]}
                                    </List>

                                    <ListHeader>
                                        <h3>Um {this.props.artist.name}</h3>
                                    </ListHeader>

                                    <div style={{width: '100%'}}>
                                        <div style={{float: 'right', width: '50%', maxWidth: 200, backgroundColor: 'white', padding: 16, marginLeft: 16, marginBottom: 16}}>
                                            <ListGenres genres={this.props.artist.genres}/>
                                            {({
                                                'Person': (<div>period</div>),
                                                'Group': (<ListPeriods periods={this.props.artist.periods || undefined}/>),
                                            } as any)[this.props.artist.__typename]}
                                        </div>
                                        <ReactMarkdown className="mark-down-container" source={this.props.artist.description || ''} />
                                    </div>
                                    {({
                                        'Group': (<MemberTimeLine
                                            albums={[
                                                ...(this.props.artist.albums || []).map(album => album.collection),
                                                ...(this.props.artist.singles || []).map(album => album.collection),
                                                ...(this.props.artist.eps || []).map(album => album.collection),
                                                ...(this.props.artist.compilations || []).map(album => album.collection)
                                            ]}
                                            artists={this.props.artist.members}
                                        />)
                                    } as any)[this.props.artist.__typename]}
                                </Column>
                            </Row>
                        )}
                    </Grid>
                </main>

            </>
        );
    }
}

