import * as React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import ItemSections from './ItemSections';

const itemQuery = gql`
    query getAnItem ($id: ID!) {
        Item (id: $id) {
            _id
            description
            duration
            name
            genres {style type}
            appearsOn {
                collection {
                    _id
                    name
                    releaseDates
                    avatar {url base64}
                    artists {
                        ... on Person {
                            _id
                            name
                        }
                        ... on Group {
                            _id
                            name
                        }
                    }                    
                }
                uuid

            }
        }
    }
`;

export default compose(
    graphql(itemQuery, {
        props: (all: any) => ({
            item: all.data.loading === false ? all.data.Item : undefined,
            loading: all.data.loading,
        }),
        options: ({id, }: {[key: string]: any}) => ({
            variables: {
                id: id,
            },
        }),
    })
)(ItemSections);
