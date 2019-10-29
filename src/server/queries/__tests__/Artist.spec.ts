import {graphql} from 'graphql';
import schema from '../../schema';
import {DataSource} from '../../../../@types/database';
import {GraphQLTypes} from '../../../../@types';
import {ObjectID} from "bson";

type Partial<T> = { [P in keyof T]?: T[P]; };
type PartialArtist = Partial<DataSource.Artist>;
type PartialCollection = Partial<DataSource.Collection>;
type PartialImage = Partial<DataSource.Image>;
type PartialGQLArtist = Partial<GraphQLTypes.Artist>;

describe('DataSource.Artist', () => {

    const groupID = new ObjectID('507f1f77bcf86cd799439011');
    const personID = new ObjectID('313233313233313233313233');
    const collectionID = new ObjectID('123456123456123412341234');
    const imageID = new ObjectID('098765432112345678901956');

    const artistGroupMockData: PartialArtist = {
        _id: groupID,
        __contentType: 'artist/group',
        __ref: [{
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
        },{
            __contentType: 'artist/person+member',
            _id: {
                namespace: 'collection',
                oid: personID,
            },
            periods: [],
            __created: new Date(),
            __uuid: '427dbe30-0001-11e9-b210-d663bd873d93'
        },{
            __contentType: 'collection/album',
            _id: {
                namespace: 'collection',
                oid: collectionID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0001-11e9-b210-d663bd873d93'
        },{
            __contentType: 'collection/album+single',
            _id: {
                namespace: 'collection',
                oid: collectionID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0002-11e9-b210-d663bd873d93'
        },{
            __contentType: 'collection/album+ep',
            _id: {
                namespace: 'collection',
                oid: collectionID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0003-11e9-b210-d663bd873d93'
        },{
            __contentType: 'collection/album+compilation',
            _id: {
                namespace: 'collection',
                oid: collectionID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0004-11e9-b210-d663bd873d93'
        }],
        name: 'Group name',
        description: 'description',
        aka: ['aka'],
        genres: ['rock/pop', 'some'],
        periods: [{from: '2001-01-01', to: undefined}]
    };
    const artistPersonMockData: PartialArtist = {
        __contentType: 'artist/person',
        _id: personID,
        __ref: [{
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
        },{
            __contentType: 'collection/album',
            _id: {
                namespace: 'collection',
                oid: collectionID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0001-11e9-b210-d663bd873d93'
        },{
            __contentType: 'collection/album+single',
            _id: {
                namespace: 'collection',
                oid: collectionID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0002-11e9-b210-d663bd873d93'
        },{
            __contentType: 'collection/album+ep',
            _id: {
                namespace: 'collection',
                oid: collectionID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0003-11e9-b210-d663bd873d93'
        },{
            __contentType: 'collection/album+compilation',
            _id: {
                namespace: 'collection',
                oid: collectionID,
            },
            __created: new Date(),
            __uuid: '427dbe30-0004-11e9-b210-d663bd873d93'
        }],
        name: 'Person Name',
        periods: [{from: '2001-01-01', to: undefined}]
    };
    const collectionMockData: PartialCollection = {
        _id: collectionID,
        __contentType: "collection/album",
        name: 'collection name'
    };
    const imageMockData: PartialImage = {
        __contentType: 'image/avatar',
        _id: imageID,
        __ref: [],
        url: 'http://some.jpg'
    };

    const databaseMock = {
        collection: () => ({
            findOne: ({_id}: {_id: ObjectID}) => ({
                [groupID.toHexString()]: artistGroupMockData,
                [personID.toHexString()]: artistPersonMockData,
                [collectionID.toHexString()]: collectionMockData,
                [imageID.toHexString()]: imageMockData,
            }[_id.toHexString()]
            ),
            find: () => ({
                toArray: () => Promise.resolve([artistGroupMockData])
            })
        })
    };

    test('Artist Unit', async () => {
        const query = `
            query artist {
              Artist (id: "${groupID.toHexString()}") {
                __typename
                ... on Unit {
                  _id
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Group',
                    _id: groupID.toHexString()
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Artist not found', async () => {
        const query = `
            query artist {
              Artist (id: "102938475656473829101234") {
                __typename
                ... on Group {
                  _id
                  avatar {url}
                  hero {url}
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist | null}} = {
            data: {
                Artist: null
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Group images', async () => {
        const query = `
            query artist {
              Artist (id: "${groupID.toHexString()}") {
                __typename
                ... on Group {
                  _id
                  avatar {url}
                  hero {url}
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Group',
                    _id: groupID.toHexString(),
                    avatar: {url: 'http://some.jpg'},
                    hero: {url: 'http://some.jpg'}
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Person images', async () => {
        const query = `
            query artist {
              Artist (id: "${personID.toHexString()}") {
                __typename
                ... on Person {
                  _id
                  avatar {url}
                  hero {url}
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Person',
                    _id: personID.toHexString(),
                    avatar: {url: 'http://some.jpg'},
                    hero: {url: 'http://some.jpg'}
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Artist images in __ref, but not found', async () => {
        const ID = new ObjectID('285619563510876541234509');
        const artistData: PartialArtist = {
            _id: ID,
            __contentType: 'artist/group',
            __ref: [{
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
            }],
        };

        const database = {
            collection: () => ({
                findOne: ({_id}: {_id: ObjectID}) => ({
                    [ID.toHexString()]: artistData,
                }[_id.toHexString()]
                ),
            })
        };

        const query = `
            query artist {
              Artist (id: "${ID.toHexString()}") {
                __typename
                ... on Group {
                  _id
                  avatar {url}
                  hero {url}
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Group',
                    _id: ID.toHexString(),
                    avatar: null,
                    hero: null,
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: database});
        expect(actual).toEqual(expected);
    });

    test('Group', async () => {
        const query = `
            query artist {
              Artist (id: "${groupID.toHexString()}") {
                __typename
                ... on Group {
                    contentType {type subtype attribute}
                    name
                    description
                    aka
                    genres {type style}
                    periods {from to}
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Group',
                    name: 'Group name',
                    contentType: {type: 'artist', subtype: 'group', attribute: null},
                    description: 'description',
                    aka: ['aka'],
                    genres: [
                        {type: 'rock', style: 'pop'},
                        {type: 'some', style: null}
                    ],
                    periods: [
                        {from: '2001-01-01', to: null}
                    ],

                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Person', async () => {
        const query = `
            query artist {
              Artist (id: "${personID.toHexString()}") {
                __typename
                ... on Person {
                    contentType {type subtype attribute}
                    genres {type style}
                    period {from to}
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Person',
                    contentType: {
                        type: 'artist',
                        subtype: 'person',
                        attribute: null
                    },
                    period: {from: '2001-01-01', to: null},
                    genres: []
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Group albums', async () => {
        const query = `
            query artist {
              Artist (id: "${groupID.toHexString()}") {
                __typename
                ... on Group {
                    albums {
                        uuid
                        collection {__typename name}
                    }
                    singles {
                        uuid
                        collection {__typename name}
                    }
                    eps {
                        uuid
                        collection {__typename name}
                    }
                    compilations {
                        uuid
                        collection {__typename name}
                    }
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Group',
                    albums: [{
                        collection: {
                            __typename: 'Collection',
                            name: 'collection name'

                        },
                        uuid: '427dbe30-0001-11e9-b210-d663bd873d93'
                    }],
                    singles: [{
                        collection: {
                            __typename: 'Collection',
                            name: 'collection name'
                        },
                        uuid: '427dbe30-0002-11e9-b210-d663bd873d93'
                    }],
                    eps: [{
                        collection: {
                            __typename: 'Collection',
                            name: 'collection name'
                        },
                        uuid: '427dbe30-0003-11e9-b210-d663bd873d93'
                    }],
                    compilations: [{
                        collection: {
                            __typename: 'Collection',
                            name: 'collection name'
                        },
                        uuid: '427dbe30-0004-11e9-b210-d663bd873d93'
                    }],
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Person albums', async () => {
        const query = `
            query artist {
              Artist (id: "${personID.toHexString()}") {
                __typename
                ... on Person {
                    albums {
                        uuid
                        collection {__typename name}
                    }
                    singles {
                        uuid
                        collection {__typename name}
                    }
                    eps {
                        uuid
                        collection {__typename name}
                    }
                    compilations {
                        uuid
                        collection {__typename name}
                    }
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Person',
                    albums: [{
                        collection: {
                            __typename: 'Collection',
                            name: 'collection name'

                        },
                        uuid: '427dbe30-0001-11e9-b210-d663bd873d93'
                    }],
                    singles: [{
                        collection: {
                            __typename: 'Collection',
                            name: 'collection name'
                        },
                        uuid: '427dbe30-0002-11e9-b210-d663bd873d93'
                    }],
                    eps: [{
                        collection: {
                            __typename: 'Collection',
                            name: 'collection name'
                        },
                        uuid: '427dbe30-0003-11e9-b210-d663bd873d93'
                    }],
                    compilations: [{
                        collection: {
                            __typename: 'Collection',
                            name: 'collection name'
                        },
                        uuid: '427dbe30-0004-11e9-b210-d663bd873d93'
                    }],
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Group members', async () => {
        const query = `
            query artist {
              Artist (id: "${groupID.toHexString()}") {
                __typename
                ... on Unit {
                    _id
                }
                ... on Group {
                    members {
                        uuid
                        artist {__typename _id name}
                        periods {from to}
                    }
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Group',
                    _id: groupID.toHexString(),
                    members: [{
                        uuid: '427dbe30-0001-11e9-b210-d663bd873d93',
                        artist: {
                            __typename: 'Person',
                            _id: personID.toHexString(),
                            name: 'Person Name'
                        },
                        periods: []
                    }]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Person association', async () => {
        const query = `
            query artist {
              Artist (id: "${personID.toHexString()}") {
                __typename
                ... on Unit {
                    _id
                }
                ... on Person {
                    association {
                        uuid
                        group {__typename _id name}
                        periods {from to}
                    }
                }
              }
            }
        `;

        const expected: {data: {Artist: PartialGQLArtist}} = {
            data: {
                Artist: {
                    __typename: 'Person',
                    _id: personID.toHexString(),
                    association: [{
                        uuid: '427dbe30-0001-11e9-b210-d663bd873d93',
                        group: {
                            __typename: 'Group',
                            _id: groupID.toHexString(),
                            name: 'Group name'
                        },
                        periods: []
                    }]
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });
});
