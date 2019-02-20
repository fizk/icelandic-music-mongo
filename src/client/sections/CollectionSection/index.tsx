import * as React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import CollectionSection from './CollectionSection';
import {artistQuery} from "../ArtistSection";

export const collectionQuery = gql`
    query ($id: ID!) {
        Collection (id: $id) {
            _id
            name
            description
            aka
            genres {type style}
            releaseDates
            contentType {type subtype attribute}
            publications {
                catalogNumber
                date
                formats
                publisher {
                    _id
                    name
                }
            }
            artists {
                __typename
                ... on Person {
                    _id
                    name
                    avatar {_id base64 url}
                }
                ... on Group {
                    _id
                    name
                    avatar {_id base64 url}
                }
            }
            avatar {_id base64 url}
            hero {_id base64 url}
            songs {
                position
                song {
                    _id
                    name
                    duration
                }
            }
        }
    }
`;

const collectionAddItem = gql`
    mutation item_add ($collection: ID!, $item: ID!, $type: ItemType!) {
      CollectionAddItem (collection: $collection, item: $item, type: $type) {
          songs {
              position
              song {
                  _id
                  name
                  duration
              }
          }
      }
    }
`;

export default compose(
    graphql(collectionAddItem, {
        props: ({mutate, ownProps}: {mutate?: any; ownProps: any}) => ({
            connectItem: (vars: any) => { //@todo fix any
                mutate({
                    variables: {
                        collection: ownProps.id,
                        item: vars._id,
                        type: vars.contentType.attribute ? vars.contentType.attribute : 'song'
                    },
                    update: (store: any, {data: {CollectionAddItem}}: any) => { //@todo fix any
                        const data = store.readQuery({query: collectionQuery, variables: {id: ownProps.id}});
                        data.Collection.songs = CollectionAddItem.songs;

                        store.writeQuery({ query: collectionQuery, data, });
                    },
                })
            },
        }),
    }),
    graphql(collectionQuery, {
        props: (all: any) => ({album: all.data.loading === false ? all.data.Collection : undefined, }),
        options: ({id, }: {[key: string]: any}) => ({variables: {id: id, }, }),
    })
)(CollectionSection);
