import * as React from 'react';
import AutoCompleteArtist from '../../elements/AutoComplete/AutoCompleteArtist';
import AutoCompleteCreateArtist from "../../elements/AutoComplete/AutoCompleteCreateArtist";
import AutoComplete from "../../elements/AutoComplete/AutoComplete";
import gql from "graphql-tag";
import {debounce} from 'throttle-debounce';
import ApolloClient from "apollo-client/ApolloClient";
import {FetchResult} from "apollo-link";
import {ApolloQueryResult} from "apollo-client";
import './_index.scss';

interface Props {
    type?: string;
    onSelect: (item: any) => void;
}

interface State {
    items: any[];
    term: string|undefined;
    isSearching: boolean;
    isCreate: boolean;
}

export default class ArtistSearch extends React.Component<Props, State, {client: ApolloClient<any>}> {
    static defaultProps = {
        type: 'person',
        onSelect: (item: any) => {}
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

    constructor(props: Props, context: any) { //@todo fix any
        super(props, context);

        this.handleSearch = debounce(1000, this.handleSearch.bind(this));
        this.handleCreateArtist = this.handleCreateArtist.bind(this)
    }

    handleSearch(term: string)  {
        if (term.length === 0) {
            return;
        }

        this.setState({isSearching: true, term: term});
        this.context.client.query({
            query: artistSearchQuery,
            variables: {term: term, type: this.props.type}
        }).then((result: ApolloQueryResult<any>) => {
            this.setState({
                items: result.data.ArtistSearch,
                isSearching: false,
                isCreate: result.data.ArtistSearch.length === 0 && term.length > 5
            });
        });
    }

    handleCreateArtist() {
        this.handleOnClear();
        this.context.client.mutate({
            mutation: artistCreateQuery,
            variables: {type: this.props.type, values: {name: this.state.term}}
        }).then((result: FetchResult) => {
            this.props.onSelect(result && result.data && result.data.ArtistAdd)
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
            <AutoComplete loading={this.state.isSearching}
                onType={this.handleSearch}
                onSelect={this.props.onSelect}
                onClear={this.handleOnClear}>
                {this.state.items.map((item: any) => ( //@todo fix any
                    <AutoCompleteArtist key={item._id} value={item} />
                ))}
                {this.state.isCreate && (
                    <AutoCompleteCreateArtist onCreate={this.handleCreateArtist} />
                )}
            </AutoComplete>
        );
    }
}

export const artistSearchQuery = gql`
    query search_artist ($term: String! $type: ArtistType) {
        ArtistSearch (term: $term type: $type) {
            __typename
            ... on Group {
                _id
                name
                avatar {base64 url}
                contentType {attribute subtype type }
                periods {from to}
            }
            ... on Person {
                _id
                name
                avatar {base64 url}
                contentType {attribute subtype type }
                periods {from to}
            }
        }
    }
`;

export const artistCreateQuery = gql`
    mutation create_artist ($values: ArtistInput!, $type: ArtistType!) {
        ArtistAdd (type: $type, values: $values ) {
            ... on Group {
                _id
                contentType {attribute subtype type }
            }
            ... on Person {
                _id
                contentType {attribute subtype type }
            }
        }
    }
`;
