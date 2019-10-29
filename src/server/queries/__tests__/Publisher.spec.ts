import {graphql} from 'graphql';
import schema from '../../schema';
import {DataSource} from '../../../../@types/database';
import {GraphQLTypes} from '../../../../@types';
import {ObjectID} from "bson";

type Partial<T> = { [P in keyof T]?: T[P]; };
type PartialPublisher = Partial<DataSource.Publisher>;
type PartialGQLPublisher = Partial<GraphQLTypes.Publisher>;
type PartialImage = Partial<DataSource.Image>;

describe('DataSource.Publisher', () => {

    const publisherID = new ObjectID('666666777777333344441111');
    const imageID = new ObjectID('098765432112345678901956');

    const imageMockData: PartialImage = {
        __contentType: 'image/avatar',
        _id: imageID,
        __ref: [],
        url: 'http://some.jpg'
    };
    const publisherMockData: PartialPublisher = {
        _id: publisherID,
        name: 'Publisher name',
        description: 'Publisher description',
        __contentType: 'publisher/publisher',
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

    const databaseMock = {
        collection: () => ({
            findOne: ({_id}: {_id: ObjectID}) => ({
                    [publisherID.toHexString()]: publisherMockData,
                    [imageID.toHexString()]: imageMockData,
                }[_id.toHexString()]
            )
        })
    };

    test('Publisher Unit', async () => {
        const query = `
            query artist {
              Publisher (id: "${publisherID.toHexString()}") {
                __typename
                ... on Unit {
                  _id
                }
              }
            }
        `;

        const expected: {data: {Publisher: PartialGQLPublisher}} = {
            data: {
                Publisher: {
                    __typename: 'Publisher',
                    _id: publisherID.toHexString()
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Publisher', async () => {
        const query = `
            query artist {
              Publisher (id: "${publisherID.toHexString()}") {
                __typename
                description
                contentType {type subtype attribute}
                name
              }
            }
        `;

        const expected: {data: {Publisher: PartialGQLPublisher}} = {
            data: {
                Publisher: {
                    __typename: 'Publisher',
                    name: 'Publisher name',
                    description: 'Publisher description',
                    contentType: {type: 'publisher', subtype: 'publisher', attribute: null},
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });

    test('Publisher images', async () => {
        const query = `
            query artist {
              Publisher (id: "${publisherID.toHexString()}") {
                __typename
                  _id
                  avatar {url}
                  hero {url}
              }
            }
        `;

        const expected: {data: {Publisher: PartialGQLPublisher}} = {
            data: {
                Publisher: {
                    __typename: 'Publisher',
                    _id: publisherID.toHexString(),
                    avatar: {url: 'http://some.jpg'},
                    hero: {url: 'http://some.jpg'}
                }
            }
        };
        const actual = await graphql(schema, query, {}, {database: databaseMock});
        expect(actual).toEqual(expected);
    });
});
