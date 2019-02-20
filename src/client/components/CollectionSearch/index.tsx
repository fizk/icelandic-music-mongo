import {Fragment} from 'react';
import * as React from 'react';
import AutoCompleteCollection from "../../elements/AutoComplete/AutoCompleteCollection";
import AutoCompleteCreateCollection from "../../elements/AutoComplete/AutoCompleteCreateCollection";
import AutoComplete from "../../elements/AutoComplete/AutoComplete";
import gql from "graphql-tag";
import {debounce} from 'throttle-debounce';
import ApolloClient from "apollo-client/ApolloClient";
import {FetchResult} from "apollo-link";
import {ApolloQueryResult} from "apollo-client";
import {artistQuery} from '../../sections/ArtistSection';
import './_index.scss';
import {ApolloConsumer} from 'react-apollo'

interface Props {
    id: string;
    type?: string;
    onSelect: (item: any) => void;
}

interface State {
    items: any[];
    term: string|undefined;
    isSearching: boolean;
    isCreate: boolean;
}

export default class CollectionSearch extends React.Component<Props, State, {client: ApolloClient<any>}> {
    static defaultProps = {
        id: undefined,
        type: 'album',
        onSelect: () => {}
    };

    static contextTypes = {
        client: () => {},
    };

    state = {
        items: [],
        term: undefined,
        isSearching: false,
        isCreate: false,
    };

    constructor(props: Props) {
        super(props);

        this.handleSearch = debounce(1000, this.handleSearch.bind(this));
        this.handleCreateCollection = this.handleCreateCollection.bind(this)
    }

    handleSearch(client: any, term: string)  {
        if (term.length === 0) {
            return;
        }

        this.setState({isSearching: true, term: term});
        client.query({
            query: collectionSearchQuery,
            variables: {term: term, type: this.props.type},
        }).then((result: ApolloQueryResult<any>) => {
            this.setState({
                items: result.data.CollectionSearch,
                isSearching: false,
                isCreate: result.data.CollectionSearch.length === 0 && term.length > 4
            });
        });
    }

    handleCreateCollection() {
        this.handleOnClear();

        this.context.client.mutate({
            mutation: collectionCreatehQuery,
            variables: {type: this.props.type, values: {name: this.state.term}},
            // update: (store, {data: {CollectionAdd}}) => {
            //     const data = store.readQuery({query: artistQuery, variables: {id: this.props.id}});
            //     console.log(data.Artist);
            //     data.Artist.albums.push(CollectionAdd);
            //     store.writeQuery({ query: artistQuery, data});
            // },
            // optimisticResponse: {
            //     __typename: "Mutation",
            //     CollectionAdd: {
            //         contentType: {
            //             type: "collection",
            //             subtype: "album",
            //             attribute: null,
            //             __typename: "Content"
            //         },
            //         name: this.state.term,
            //         releaseDates: null,
            //         __typename: "Collection",
            //         _id: "tmp-id",
            //     }
            // }
        }).then((result: FetchResult) => {
            this.props.onSelect(result && result.data && result.data.CollectionAdd);
        });
    }

    handleOnClear = () => {
        this.setState({
            items: [],
            term: undefined,
            isSearching: false,
            isCreate: false,
        })
    };

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <AutoComplete
                        loading={this.state.isSearching}
                        onType={(term: string) => this.handleSearch(client, term)}
                        onSelect={this.props.onSelect}
                        onClear={this.handleOnClear}
                    >
                        {this.state.items.map((item: any) => ( //@todo fix any
                            <AutoCompleteCollection key={item._id} value={item} />
                        ))}

                        {this.state.isCreate && (
                            <AutoCompleteCreateCollection onCreate={this.handleCreateCollection} />
                        )}
                    </AutoComplete>
                )}
            </ApolloConsumer>
        );
    }
}

export const collectionSearchQuery = gql`
    query search_collection ($term: String! $type: CollectionType) {
        CollectionSearch (term: $term type: $type) {
            _id
            contentType {type subtype attribute}
            name
            releaseDates
            avatar {base64, url}
        }
    }
`;

export const collectionCreatehQuery = gql`
    mutation create_collection ($values: CollectionInput!, $type: CollectionType!) {
        CollectionAdd (type: $type, values: $values) {
            _id
            contentType {type subtype attribute}
            name
            releaseDates
            avatar {base64, url}
            __typename
        }
    }
`;
