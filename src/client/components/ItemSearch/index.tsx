import * as React from 'react';
import AutoCompleteCollection from "../../elements/AutoComplete/AutoCompleteCollection";
import AutoCompleteCreateCollection from "../../elements/AutoComplete/AutoCompleteCreateCollection";
import AutoComplete from "../../elements/AutoComplete/AutoComplete";
import gql from "graphql-tag";
import {debounce} from 'throttle-debounce';
import ApolloClient from "apollo-client/ApolloClient";
import {FetchResult} from "apollo-link";
import {ApolloQueryResult} from "apollo-client";
import {collectionQuery} from '../../sections/CollectionSection';
import './_index.scss';

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

export default class ItemSearch extends React.Component<Props, State, {client: ApolloClient<any>}> {
    static defaultProps = {
        id: undefined,
        type: 'song',
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
        this.handleCreateItem = this.handleCreateItem.bind(this)
    }

    handleSearch(term: string)  {
        if (term.length === 0) {
            return;
        }

        this.setState({isSearching: true, term: term});
        this.context.client.query({
            query: itemSearchQuery,
            variables: {term: term, type: this.props.type},
        }).then((result: ApolloQueryResult<any>) => {
            this.setState({
                items: result.data.ItemSearch,
                isSearching: false,
                isCreate: result.data.ItemSearch.length === 0 && term.length > 4
            });
        });
    }

    handleCreateItem() {
        this.handleOnClear();

        this.context.client.mutate({
            mutation: itemCreateQuery,
            variables: {type: this.props.type, values: {name: this.state.term}},
            // update: (store, {data: {ItemAdd}}) => {
            //     const data = store.readQuery({query: collectionQuery, variables: {id: this.props.id}});
            //     const stuff = {
            //         __typename: "song",
            //         position: null,
            //         song : ItemAdd
            //     };
            //     data.CollectionType.songs = [...data.CollectionType.songs, stuff];
            //     store.writeQuery({ query: collectionQuery, data});
            // },
            // optimisticResponse: {
            //     __typename: "Mutation",
            //     ItemAdd: {
            //         contentType: {
            //             attribute: null,
            //             subtype: "song",
            //             type: "item",
            //             __typename: "Content"
            //         },
            //         name: "that's the stuff",
            //         __typename: "Item",
            //         _id: "temp-id",
            //     }
            // }
        }).then((result: FetchResult) => {
            this.props.onSelect(result && result.data && result.data.ItemAdd);
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
            <AutoComplete loading={this.state.isSearching} onType={this.handleSearch} onSelect={this.props.onSelect} onClear={this.handleOnClear}>
                {this.state.items.map((item: any) => ( //@todo no any
                    <AutoCompleteCollection key={item._id} value={item} />
                ))}
                {this.state.isCreate && (
                    <AutoCompleteCreateCollection onCreate={this.handleCreateItem} />
                )}
            </AutoComplete>
        );
    }
}

export const itemSearchQuery = gql`
    query item_search ($term: String!) {
        ItemSearch(term: $term) {
            __typename
            _id
            name
            duration
            contentType {attribute subtype type}
        }
    }
`;

export const itemCreateQuery = gql`
    mutation create_item ($type: ItemType!, $values: ItemInput!) {
        ItemAdd (type: $type, values: $values) {
            __typename
            _id
            name
            duration
            contentType {attribute subtype type}
        }
    }
`;
