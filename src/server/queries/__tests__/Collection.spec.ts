import {graphql} from 'graphql';
import schema from '../../schema';
import {DataSource} from '../../../../@types/database';
import {GraphQLTypes} from '../../../../@types';
import {ObjectID} from "bson";

type Partial<T> = { [P in keyof T]?: T[P]; };
type PartialCollection = Partial<DataSource.Collection>;
type PartialItem = Partial<DataSource.Item>;
type PartialImage = Partial<DataSource.Image>;
type PartialArtist = Partial<DataSource.Artist>;
type PartialPublisher = Partial<DataSource.Publisher>;

type PartialGQLCollection = Partial<GraphQLTypes.Collection>;

describe('DataSource.Collection', () => {

    const collectionID = new ObjectID('123456123456123412341234');
    const groupID = new ObjectID('507f1f77bcf86cd799439011');
    const imageID = new ObjectID('098765432112345678901956');
    const itemID = new ObjectID('567654323456789098761234');
    const publisherID = new ObjectID('192856142058374097541029');

    const artistGroupMockData: PartialArtist = {
        _id: groupID,
        __contentType: 'artist/group',
        __ref: [],
    };
    const collectionMockData: PartialCollection = {
        _id: collectionID,
        __contentType: "collection/album",
        name: 'Collection name',
        description: 'Collection description',
        __ref: [{
            __contentType: 'item/song',
            label: '',
            _id: {
                namespace: 'item',
                oid: itemID
            },
            position: 0,
            __uuid: '427dbe30-0001-11e9-b210-d663bd873d93',

        },{
            __contentType: 'image/avatar',
            _id: {
                namespace: 'media',
                oid: imageID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0001-11e9-b210-d663bd873d93'
        },{
            __contentType: 'image/hero',
            _id: {
                namespace: 'media',
                oid: imageID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0001-11e9-b210-d663bd873d93'
        }, {
            __contentType: 'publisher/publication',
            _id: {
                namespace: 'publisher',
                oid: publisherID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0001-11e9-b210-d663bd873d93',
            catalogNumber: '1',
            formats: ['lp'],
            date: '2001-01-01'

        }],
        aka: ['coll'],
        releaseDates: new Date('2001-01-01'),
        genres: ['rock/pop', 'rock']
    };
    const imageMockData: PartialImage = {
        __contentType: 'image/avatar',
        _id: imageID,
        __ref: [],
        url: 'http://some.jpg'
    };
    const itemMockDate: PartialItem = {
        _id: itemID,
        name: 'Item name'
    };
    const publisherMockData: PartialPublisher = {
        _id: publisherID,
        name: 'Publisher'
    };

    const databaseMock = {
        collection: () => ({
            findOne: ({_id}: {_id: ObjectID}) => ({
                [collectionID.toHexString()]: collectionMockData,
                [imageID.toHexString()]: imageMockData,
                [groupID.toHexString()]: artistGroupMockData,
                [itemID.toHexString()]: itemMockDate,
                [publisherID.toHexString()]: publisherMockData,
            }[_id.toHexString()]
            ),
            find: () => ({
                toArray: () => Promise.resolve([artistGroupMockData])
            })
        })
    };

    test('Collection Unit', async () => {
        const query = `
            query artist {
              Collection (id: "${collectionID.toHexString()}") {
                __typename
                ... on Unit {
                  _id
                }
              }
            }
        `;

        const expected: {data: {Collection: PartialGQLCollection}} = {
            data: {
                Collection: {
                    __typename: 'Collection',
                    _id: collectionID.toHexString()
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Collection', async () => {
        const query = `
            query artist {
              Collection (id: "${collectionID.toHexString()}") {
                __typename
                ... on Collection {
                    name
                    description
                    aka
                    genres {type style}
                    releaseDates
                    contentType {type subtype attribute}
                }
              }
            }
        `;

        const expected: {data: {Collection: PartialGQLCollection}} = {
            data: {
                Collection: {
                    __typename: 'Collection',
                    name: 'Collection name',
                    description: 'Collection description',
                    aka: ['coll'],
                    genres: [{type: 'rock', style: 'pop'}, {type: 'rock', style: null}],
                    releaseDates: '2001-01-01',
                    contentType: {type: 'collection', subtype: 'album', attribute: null}
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Collection images', async () => {
        const query = `
            query artist {
              Collection (id: "${collectionID.toHexString()}") {
                __typename
                ... on Collection {
                  _id
                  avatar {url}
                  hero {url}
                }
              }
            }
        `;

        const expected: {data: {Collection: PartialGQLCollection}} = {
            data: {
                Collection: {
                    __typename: 'Collection',
                    _id: collectionID.toHexString(),
                    avatar: {url: 'http://some.jpg'},
                    hero: {url: 'http://some.jpg'}
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Collection artists', async () => {
        const query = `
            query artist {
              Collection (id: "${collectionID.toHexString()}") {
                __typename
                ... on Collection {
                  _id
                  artists {
                    ... on Group {
                        _id
                    }
                  }
                }
              }
            }
        `;

        const expected: {data: {Collection: PartialGQLCollection}} = {
            data: {
                Collection: {
                    __typename: 'Collection',
                    _id: collectionID.toHexString(),
                    artists: [{_id: groupID.toHexString()}]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Collection songs', async () => {
        const query = `
            query artist {
              Collection (id: "${collectionID.toHexString()}") {
                __typename
                ... on Collection {
                  _id
                  songs {
                    position
                    song {__typename _id name}
                  }
                }
              }
            }
        `;

        const expected: {data: {Collection: PartialGQLCollection}} = {
            data: {
                Collection: {
                    __typename: 'Collection',
                    _id: collectionID.toHexString(),
                    songs: [
                        {
                            position: 0,
                            song: {
                                __typename: 'Item',
                                _id: itemID.toHexString(),
                                name: 'Item name'
                            }
                        }
                    ]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Collection publication', async () => {
        const query = `
            query artist {
              Collection (id: "${collectionID.toHexString()}") {
                __typename
                ... on Collection {
                  _id
                  publications {
                    catalogNumber
                    formats
                    date
                    publisher {__typename _id name}
                  }
                }
              }
            }
        `;

        const expected: {data: {Collection: PartialGQLCollection}} = {
            data: {
                Collection: {
                    __typename: 'Collection',
                    _id: collectionID.toHexString(),
                    publications: [{
                        catalogNumber: '1',
                        date: '2001-01-01',
                        formats: ['lp'],
                        publisher: {
                            __typename: 'Publisher',
                            _id: publisherID.toHexString(),
                            name: 'Publisher'
                        }
                    }]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });
});
