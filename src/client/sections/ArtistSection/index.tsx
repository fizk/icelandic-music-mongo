import * as React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import ArtistSection from './ArtistSection';

export const artistQuery = gql`
    fragment collection on Collection {
        _id
        name
        releaseDates
        contentType {type subtype attribute}
        avatar {_id base64 url}
    }
    
    fragment image on Image {
        _id
        url
        base64
    }
    
    query ($id: String!) {
        Artist(id: $id) {
            __typename
            ... on Group {
                _id
                name
                aka
                description
                genres {type style}
                periods {from to}
                contentType {type subtype attribute}
                avatar {...image}
                hero {base64 url}
                albums {
                    uuid
                    collection {
                        ...collection
                    }
                }
                compilations {
                    uuid
                    collection {
                        ...collection
                    }
                }
                eps {
                    uuid
                    collection {
                        ...collection
                    }
                }
                singles {
                    uuid
                    collection {
                        ...collection
                    }
                }
                members {
                    uuid
                    periods {from to}
                    artist{
                        _id
                        name
                        avatar {...image}
                    }
                    periods {
                        from
                        to
                    }
                }
            }
            ... on Person {
                _id
                name
                aka
                description
                genres {type style}
                periods {from to}
                contentType {type subtype attribute}
                avatar {...image}
                hero {...image}
                albums {
                    uuid
                    collection {
                        ...collection
                    }
                }
                compilations {
                    uuid
                    collection {
                        ...collection
                    }
                }
                eps {
                    uuid
                    collection {
                        ...collection
                    }
                }
                singles {
                    uuid
                    collection {
                        ...collection
                    }
                }
                association {
                    uuid
                    periods {from to}
                    group{
                        _id
                        name
                        avatar {...image}
                    }
                    periods {
                        from
                        to
                    }
                }
            }
        }
    }
`;

const artistAddCollection = gql`
    fragment collection on Collection {
        _id
        name
        releaseDates
        contentType {type subtype attribute}
        avatar {_id base64 url}
    }
    
    mutation ArtistAddCollection ($artist: ID! $collection: ID! $collectionType: CollectionType!) {
        ArtistAddCollection (artist: $artist collection: $collection collectionType: $collectionType) {
            __typename
            ... on Group {
                albums {...collection}
                eps {...collection}
                singles {...collection}
                compilations {...collection}
            }
            ... on Person {
                albums {...collection}
                eps {...collection}
                singles {...collection}
                compilations {...collection}
            }
        }
    }`;

const artistAddMember = gql`
    mutation artist_add_member ($artist: ID!, $member: ID!) {
        ArtistAddMember(artist: $artist, member: $member) {
            periods {from to}
            artist {
                _id
                name
                avatar {_id base64 url}
            }
            uuid
        }
    }
`;

export default compose(
    graphql(artistAddMember, {
        props: ({mutate, ownProps}: {mutate?: any, ownProps: any}) => ({
            connectMember: (vars: any) => { //@todo fix any
                mutate({
                    variables: {
                        artist: ownProps.id,
                        member: vars._id,
                        collectionType: vars.contentType.attribute ? vars.contentType.attribute : 'member'
                    },
                    update: (store: any, {data: {ArtistAddMember}}: any) => { //@todo fix any
                        const data = store.readQuery({query: artistQuery, variables: {id: ownProps.id}});
                        data.Artist.members.push(ArtistAddMember);
                        store.writeQuery({ query: artistQuery, data, });
                    },
                })
            },
        }),
    }),
    graphql(artistAddCollection, {
        props: ({mutate, ownProps}: {mutate?: any, ownProps: any}) => ({
            connectCollection: (vars: any) => { //@todo fix any
                mutate({
                    variables: {
                        artist: ownProps.id,
                        collection: vars._id,
                        collectionType: vars.contentType.attribute ? vars.contentType.attribute : 'album'
                    },
                    update: (store: any, {data: {ArtistAddCollection}}: any) => { //@todo fix any
                        const data = store.readQuery({query: artistQuery, variables: {id: ownProps.id}});

                        data.Artist.albums = ArtistAddCollection.albums;
                        data.Artist.singles = ArtistAddCollection.singles;
                        data.Artist.eps = ArtistAddCollection.eps;
                        data.Artist.compilations = ArtistAddCollection.compilations;

                        store.writeQuery({ query: artistQuery, data, });
                    },
                })
            },
        }),
    }),
    graphql(artistQuery, {
        props: (all: any) => ({
            artist: (all.data.Artist || undefined),
            isFound: (Boolean(all.data.Artist) || false),
            loading: all.data.loading
        }),
        options: ({id, }: {[key: string]: any}) => ({
            variables: {
                id: id,
            },
        }),
    })
)(ArtistSection);
