import {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLInputObjectType, GraphQLInt, GraphQLEnumType} from 'graphql';
import {Collection as DBCollection, Unit as DBUnit, ReferenceUnit as DBReferenceUnit, Image as DBImage} from "../../../@types/database";
import GraphQLDate from './GraphQLDate';
import Item from './Item';
import Image from './Image';
import Publication from './Publication';
import Content from './Content'
import Artist from './Artist';
import Genre, {GenreInput} from "./Genre";
import {splitContentType, splitGenre} from '../utils/split'
import UnitInterface from "./Unit";
import GraphQLDateTime from "./GraphQLDateTime";
import GraphQLUUID from "./GraphQLUUID";
import {GraphQlContext} from "../../../@types";
import {ObjectID} from "mongodb";

const Collection: GraphQLObjectType = new GraphQLObjectType<DBCollection, GraphQlContext>({
    name: 'Collection',
    description: 'A single collection',
    interfaces: [UnitInterface],
    fields: () => ({
        _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            name: 'description',
            type: GraphQLString
        },
        aka: {
            name: 'aka',
            type: new GraphQLList(GraphQLString),
        },
        genres: {
            name: 'genres',
            type: new GraphQLList(Genre),
            resolve(root: DBCollection) {
                return (root.genres || []).map(splitGenre)
            }
        },
        releaseDates: {
            name: 'releaseDates',
            type: GraphQLDate,
        },
        createTime: {
            name: 'createTime',
            type: GraphQLDateTime,
        },
        updateTime: {
            name: 'updateTime',
            type: GraphQLDateTime,
        },
        contentType: {
            name: 'contentType',
            type: Content,
            resolve: (root: DBUnit) => splitContentType(root.__contentType)
        },
        artists: {
            name: 'artists',
            type: new GraphQLList(Artist),
            resolve(root, params, {database}) {
                return database.collection('artist').find({"__ref": {
                        "$elemMatch": {
                            "_id.oid": new ObjectID(root._id),
                            "__contentType": root.__contentType
                        }
                    }}).toArray();
            },
        },
        avatar: {
            name: 'avatar',
            type: Image,
            resolve (root, _, {database}) {
                const imagesReference = root.__ref
                    .filter((item: any) => item.__contentType === 'image/avatar')
                    .reduce((a: any, b: DBReferenceUnit|undefined) => b, undefined);

                return imagesReference
                    ? database.collection(imagesReference._id.namespace)
                        .findOne({_id: imagesReference._id.oid})
                        .then((data: DBImage) => ({...data, dimensions: {height: data.height, width: data.width}}))
                    : null;
            }
        },
        hero: {
            name: 'hero',
            type: Image,
            resolve (root, _, {database}) {
                const imagesReference = root.__ref
                    .filter((item: any) => item.__contentType === 'image/hero')
                    .reduce((a: any, b: DBReferenceUnit|undefined) => b, undefined);

                return imagesReference
                    ? database.collection(imagesReference._id.namespace)
                        .findOne({_id: imagesReference._id.oid})
                        .then((data: DBImage) => ({...data, dimensions: {height: data.height, width: data.width}}))
                    : null;
            }
        },
        songs: {
            name: 'songs',
            type: new GraphQLList(new GraphQLObjectType({
                name: 'song',
                fields: {
                    position: {
                        name: 'position',
                        type: GraphQLInt,
                    },
                    song: {
                        name: 'song',
                        type: Item,
                        resolve: (root: DBReferenceUnit, _, {database}) => database.collection('item').findOne({_id: root._id.oid})
                    }
                }
            })),
            resolve (root) {
                return root.__ref.filter(item => item.__contentType === 'item/song');
            }
        },
        publications: {
            name: 'publication',
            type: new GraphQLList(Publication),
            resolve(root) {
                return [];
                // const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                //     .filter((item: D.ReferenceUnit) => item.__contentType === 'publisher/publication')
                //     .map(item => item._id.get());
                //
                // return Promise.all(referenceUnits).then((items: DocumentSnapshot[]) => items.map(transformSnapshot));
            }
        },
        performers: {
            type: new GraphQLList(Artist),
            resolve(root, params, {database, }) {
                return [];
                // return new Promise((pass, fail) => {
                //     database.find({'__ref._id': new ObjectID(root._id)}).toArray((error, items) => {
                //         if (error) {
                //             fail(error)
                //         } else {
                //             pass(items);
                //         }
                //     });
                // });

            }
        },
    })
});

export default Collection;

export const CollectionInput = new GraphQLInputObjectType({
    name: 'CollectionInput',
    fields: () => ({
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        aka: {
            name: 'aka',
            type: new GraphQLList(GraphQLString),
        },
        description: {
            name: 'description',
            type: GraphQLString,
        },
        releaseDates: {
            name: 'releaseDates',
            type: GraphQLDate,
        },
        genres: {
            name: 'genre',
            type: new GraphQLList(GenreInput),
        },
    }),
});

export const CollectionType = new GraphQLEnumType({
    name: 'CollectionType',
    values: {
        album: {value: 'album'},
        ep: {value: 'album+ep'},
        single: {value: 'album+single'},
        compilation: {value: 'album+compilation'},
    }
});

export const CollectionConnection: GraphQLObjectType = new GraphQLObjectType<DBReferenceUnit, GraphQlContext>({
    name: 'CollectionConnection',
    fields: () => ({
        collection: {
            type: Collection,
            resolve: (root, _, {database}) => database.collection('collection').findOne({_id: root._id.oid})
        },
        uuid: {
            type: new GraphQLNonNull(GraphQLUUID),
            resolve: ({__uuid}) => __uuid
        }
    })
});

