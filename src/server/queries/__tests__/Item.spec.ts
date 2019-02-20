import {graphql} from 'graphql';
import schema from '../../schema';
import {DataSource} from '../../../../@types/database';
import {GraphQLTypes} from '../../../../@types';
import {ObjectID} from "bson";

type Partial<T> = { [P in keyof T]?: T[P]; };
type PartialCollection = Partial<DataSource.Collection>;
type PartialItem = Partial<DataSource.Item>;
type PartialArtist = Partial<DataSource.Artist>;
type ItemGQLCollection = Partial<GraphQLTypes.ItemType>;

describe('DataSource.Item', () => {

    const collectionID = new ObjectID('123456123456123412341234');
    const personID = new ObjectID('111111111122222222223333');
    const itemID = new ObjectID('567654323456789098761234');

    const itemMockDate: PartialItem = {
        _id: itemID,
        name: 'Item Song',
        duration: 1900,
        description: 'Collection description',
        genres: ['rock/pop', 'rock'],
        __contentType: 'item/song',
        __ref: [{
            __contentType: "participant/author",
            _id: {
                oid: personID,
                namespace: 'artist'
            },
            __uuid: '7c1870a0-3427-11e9-b210-d663bd873d93',
            __created: new Date(),
            roles: []
        },{
            __contentType: "participant/instrument",
            _id: {
                oid: personID,
                namespace: 'artist'
            },
            __uuid: '7c1870a0-3427-11e9-b210-d663bd873d93',
            __created: new Date(),
            roles: []
        },{
            __contentType: "participant/recording",
            _id: {
                oid: personID,
                namespace: 'artist'
            },
            __uuid: '7c1870a0-3427-11e9-b210-d663bd873d93',
            __created: new Date(),
            roles: []
        },]
    };
    const collectionMockData: PartialCollection = {
        _id: collectionID,
        __contentType: "collection/album",
        name: 'Collection name',
    };
    const artistPersonMockData: PartialArtist = {
        _id: personID,
        __contentType: 'artist/person',
        name: 'Artist Person Name',
        __ref: [],
    };

    const databaseMock = {
        collection: () => ({
            findOne: ({_id}: {_id: ObjectID}) => ({
                [collectionID.toHexString()]: collectionMockData,
                [itemID.toHexString()]: itemMockDate,
                [personID.toHexString()]: artistPersonMockData,
            }[_id.toHexString()]
            ),
            find: () => ({
                toArray: () => Promise.resolve([collectionMockData])
            })
        })
    };

    test('Item Unit', async () => {
        const query = `
            query artist {
              Item (id: "${itemID.toHexString()}") {
                __typename
                ... on Unit {
                  _id
                }
              }
            }
        `;

        const expected: {data: {Item: ItemGQLCollection}} = {
            data: {
                Item: {
                    __typename: 'Item',
                    _id: itemID.toHexString()
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Item', async () => {
        const query = `
            query artist {
              Item (id: "${itemID.toHexString()}") {
                __typename
                description
                duration
                contentType {type subtype attribute}
                genres {type style}
                name
              }
            }
        `;

        const expected: {data: {Item: ItemGQLCollection}} = {
            data: {
                Item: {
                    __typename: 'Item',
                    name: 'Item Song',
                    duration: 1900,
                    description: 'Collection description',
                    genres: [{type: 'rock', style: 'pop'}, {type: 'rock', style: null}],
                    contentType: {type: 'item', subtype: 'song', attribute: null},
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Item person', async () => {
        const query = `
            query artist {
              Item (id: "${itemID.toHexString()}") {
                __typename
                instruments {
                    artist {
                        ... on Person {
                            _id
                            name
                        }
                    } 
                    roles 
                }
                authors {
                    artist {
                        ... on Person {
                            _id
                            name
                        }
                    } 
                    roles 
                }
                engineers {
                    artist {
                        ... on Person {
                            _id
                            name
                        }
                    } 
                    roles 
                }
              }
            }
        `;

        const expected: {data: {Item: ItemGQLCollection}} = {
            data: {
                Item: {
                    __typename: 'Item',
                    instruments: [{
                        artist: {
                            _id: personID.toHexString(),
                            name: 'Artist Person Name'
                        },
                        roles: []
                    }],
                    authors: [{
                        artist: {
                            _id: personID.toHexString(),
                            name: 'Artist Person Name'
                        },
                        roles: []
                    }],
                    engineers: [{
                        artist: {
                            _id: personID.toHexString(),
                            name: 'Artist Person Name'
                        },
                        roles: []
                    }],
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Item appearsOn', async () => {
        const query = `
            query artist {
              Item (id: "${itemID.toHexString()}") {
                appearsOn {_id name}
              }
            }
        `;

        const expected: {data: {Item: ItemGQLCollection}} = {
            data: {
                Item: {
                    appearsOn: [{
                        _id: collectionID.toHexString(),
                        name: 'Collection name',
                    }]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });
});
