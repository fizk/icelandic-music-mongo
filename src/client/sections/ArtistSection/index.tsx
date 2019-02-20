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
        avatar {... image}
    }

    fragment collectionConnection on CollectionConnection {
        collection {...collection}
        uuid
    }

    fragment image on Image {
        _id
        url
        base64
    }

    fragment period on Period {
        from
        to
    }

    fragment person on Person {
        aka
        genres {type style}
        period {... period}
        avatar {...image}
        hero {...image}
        albums {... collectionConnection}
        compilations {... collectionConnection}
        eps {... collectionConnection}
        singles {... collectionConnection}
        association {
            uuid
            periods {... period}
            group{
                _id
                name
                avatar {...image}
            }
            periods {... period}
        }
    }

    fragment group on Group {
        aka
        genres {type style}
        periods {... period}
        avatar {...image}
        hero {...image}
        albums {...collectionConnection}
        compilations {...collectionConnection}
        eps {...collectionConnection}
        singles {...collectionConnection}
        members {
            uuid
            periods {... period}
            artist{
                _id
                name
                avatar {...image}
            }
            periods {... period}
        }
    }

    fragment unit on Unit {
        _id
        name
        description
        contentType {type subtype attribute}
    }

    query ($id: ID!) {
        Artist(id: $id) {
            __typename
            ... on Unit {
                ... unit
            }
            ... on Group {
                ... group
            }
            ... on Person {
                ... person
            }
        }
    }
`;

const artistAddCollection = gql`
    fragment album on Collection {
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
                albums {
                    uuid 
                    collection {... album}
                }
                eps {
                    uuid 
                    collection {... album}
                }
                singles {
                    uuid 
                    collection {... album}
                }
                compilations {
                    uuid 
                    collection {... album}
                }
            }
            ... on Person {
                albums {
                    uuid collection {... album}
                }
                eps {
                    uuid collection {... album}
                }
                singles {
                    uuid collection {... album}
                }
                compilations {
                    uuid collection {... album}
                }
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

const updateArtistSectionModal = gql`
  mutation updateArtistSectionModal($key: String, $value: Boolean) {
    updateArtistSectionModal(key: $key, value: $value) @client
  }
`;

const queryArtistSectionModal = gql`
  query {
    artistSectionModal @client {
      album
      single
      ep
      compilation
    }
  }
`;

export default compose(
    graphql(queryArtistSectionModal, {
        props: ({data: {artistSectionModal}}: any) => ({
            isModals: artistSectionModal,
        }),
    }),
    graphql(updateArtistSectionModal, {
        props: ({ mutate }) => ({
            toggleModal: (object: {[key: string]: boolean}) => {
                const [key, value] = Object.entries(object)[0];
                mutate!({ variables: { key, value } })
            },
        }),
    }),
    graphql(artistAddMember, {
        props: ({mutate, ownProps}: {mutate?: any; ownProps: any}) => ({
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
        props: ({mutate, ownProps}: {mutate?: any; ownProps: any}) => ({
            connectCollection: (vars: any) => { //@todo fix any
                mutate({
                    variables: {
                        artist: ownProps.id,
                        collection: vars._id,
                        collectionType: vars.contentType.attribute ? vars.contentType.attribute : 'album'
                    },
                    // optimisticResponse: {
                    //     __typename: "Mutation",
                    //     ArtistAddCollection: {
                    //         __typename: "Group",
                    //         _id: null,
                    //         albums: [{
                    //             uuid: 'null',
                    //             collection: {
                    //                 __typename: "Collection",
                    //                 _id: 'null',
                    //                 name: vars.name,
                    //                 releaseDates: null,
                    //                 contentType: {...vars.contentType, __typename: "ContentType",},
                    //                 avatar: {
                    //                     __typename: "Image",
                    //                     _id: 'null',
                    //                     base64: '',
                    //                     url: 'undefined'
                    //                 }
                    //             },
                    //             __typename: "CollectionConnection",
                    //         }],
                    //         eps: [],
                    //         singles: [],
                    //         compilations: [],
                    //
                    //     },
                    // },
                    update: (store: any, {data: {ArtistAddCollection}}: any) => { //@todo fix any
                        // if (ArtistAddCollection._id === null) {
                        //     const data = store.readQuery({query: artistQuery, variables: {id: ownProps.id}});
                        //
                        //     const contentType = vars.contentType.attribute ? vars.contentType.attribute : 'album';
                        //
                        //     switch (contentType) {
                        //         case 'album':
                        //             data.Artist.albums.push(ArtistAddCollection.albums[0]);
                        //             break;
                        //         case 'single':
                        //             data.Artist.singles.push(ArtistAddCollection.albums[0]);
                        //             break;
                        //         case 'ep':
                        //             data.Artist.eps.push(ArtistAddCollection.albums[0]);
                        //             break;
                        //         case 'compilation':
                        //             data.Artist.compilations.push(ArtistAddCollection.albums[0]);
                        //             break;
                        //     }
                        //
                        //     store.writeQuery({ query: artistQuery, data, });
                        // } else {
                        const data = store.readQuery({query: artistQuery, variables: {id: ownProps.id}});

                        data.Artist.albums = ArtistAddCollection.albums;
                        data.Artist.singles = ArtistAddCollection.singles;
                        data.Artist.eps = ArtistAddCollection.eps;
                        data.Artist.compilations = ArtistAddCollection.compilations;

                        store.writeQuery({ query: artistQuery, data, });
                        // }
                    }
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
