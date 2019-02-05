import * as React from 'react';
import {Grid, Column, Row} from '../../elements/Grid';
import ReleasesList from '../../components/ReleasesList';
import ArtistListItem from '../../components/ArtistListItem';
import {List} from '../../elements/List';
import {Time} from '../../elements/Time';
// import {ArtistSearchWithState} from '../../components/ArtistSearch';
import {ListFooter} from '../../elements/List';
import Paper from '../../elements/Paper';
import {GraphQLTypes} from "../../../../@types";

type Props = {
    item: GraphQLTypes.ItemType
}

export default class Item extends React.Component<Props> {

    static defaultProps = {
        item: {
            _id: undefined,
            description: undefined,
            duration: undefined,
            name: undefined,
            appearsOn: [],
            instruments: [],
            authors: [],
            engineers: [],
        },
    };

    render() {
        return (
            <Grid>
                <Row>
                    <Column>
                        <h1>{this.props.item.name}</h1>
                        <Time>{this.props.item.duration}</Time>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <h3>AppearsOn</h3>
                        {/*<ReleasesList releases={this.props.item.appearsOn} />*/}

                        {this.props.item.description}
                    </Column>
                    <Column>
                        <Paper>
                            <h3>Authors</h3>
                            <List>
                                {/*{this.props.item.authors.map(role => (*/}
                                    {/*<ArtistListItem key={`authors-${role.artist._id}`} artist={role.artist}>*/}
                                        {/*<p>{role.roles.join(', ')}</p>*/}
                                    {/*</ArtistListItem>*/}
                                {/*))}*/}
                            </List>
                            {/*{this.props.user.id && <ListFooter>*/}
                                {/*<ArtistSearchWithState*/}
                                    {/*section="authors"*/}
                                    {/*type="person"*/}
                                    {/*onSelect={artist => this.handleAddArtistForRole(artist, 'authors')}*/}
                                    {/*onCreate={value => this.handleCreateArtistForRole(value, 'authors')}*/}
                                {/*/>*/}
                            {/*</ListFooter>}*/}

                            <h3>Instruments</h3>
                            <List>
                                {/*{this.props.item.instruments.map(role => (*/}
                                    {/*<ArtistListItem key={`instruments-${role.artist._id}`} artist={role.artist}>*/}
                                        {/*<p>{role.roles.join(', ')}</p>*/}
                                    {/*</ArtistListItem>*/}
                                {/*))}*/}
                            </List>
                            {/*{this.props.user.id && <ListFooter>*/}
                                {/*<ArtistSearchWithState*/}
                                    {/*section="instruments"*/}
                                    {/*type="person"*/}
                                    {/*onSelect={artist => this.handleAddArtistForRole(artist, 'instruments')}*/}
                                    {/*onCreate={value => this.handleCreateArtistForRole(value, 'instruments')}*/}
                                {/*/>*/}
                            {/*</ListFooter>}*/}

                            <h3>Engineers</h3>
                            <List>
                                {/*{this.props.item.engineers.map(role => (*/}
                                    {/*<ArtistListItem key={`engineers-${role.artist._id}`} artist={role.artist}>*/}
                                        {/*<p>{role.roles.join(', ')}</p>*/}
                                    {/*</ArtistListItem>*/}
                                {/*))}*/}
                            </List>
                            {/*{this.props.user.id && <ListFooter>*/}
                                {/*<ArtistSearchWithState*/}
                                    {/*section="engineers"*/}
                                    {/*type="person"*/}
                                    {/*onSelect={artist => this.handleAddArtistForRole(artist, 'engineers')}*/}
                                    {/*onCreate={value => this.handleCreateArtistForRole(value, 'engineers')}*/}
                                {/*/>*/}
                            {/*</ListFooter>}*/}
                        </Paper>
                    </Column>
                </Row>
            </Grid>
        );
    }
}
