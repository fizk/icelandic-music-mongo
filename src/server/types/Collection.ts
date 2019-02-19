import {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLInputObjectType, GraphQLInt, GraphQLEnumType} from 'graphql';
import {GraphQLDateTime, GraphQLDate} from "graphql-iso-date";
import {GraphQlContext} from "../../../@types";
import {DataSource} from "../../../@types/database";
import {Unit} from "./Unit";
import {splitContentType, splitGenre} from "../utils/split";
import {Genre, GenreInput} from "./Genre";
import {Artist} from "./Artist";
import {ObjectID} from "bson";
import {Image} from "./Image";
import {ContentType} from "./ContentType";
import Publication from "./Publication";
import {GraphQLUUID} from "./GraphQLUUID";
import {Item} from "./Item";

export const Collection: GraphQLObjectType = new GraphQLObjectType<DataSource.Collection, GraphQlContext>({
    name: 'Collection',
    description: 'A single collection',
    interfaces: [Unit],
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
            resolve(root) {
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
            type: ContentType,
            resolve: (root) => splitContentType(root.__contentType)
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
                    .filter((item: any) => item.__contentType ===  "image/avatar")
                    .reduce((a: any, b: any) => b, undefined);

                return imagesReference
                    ? database.collection('media')
                        .findOne({_id: imagesReference._id.oid})
                    : null;
            }
        },
        hero: {
            name: 'hero',
            type: Image,
            resolve (root, _, {database}) {
                const imagesReference = root.__ref
                    .filter((item: any) => item.__contentType ===  "image/hero")
                    .reduce((a: any, b: any) => b, undefined);

                return imagesReference
                    ? database.collection('media')
                        .findOne({_id: imagesReference._id.oid})
                    : null;
            }
        },
        songs: {
            name: 'songs',
            type: new GraphQLList(new GraphQLObjectType({
                name: 'song',
                fields: () => ({
                    position: {
                        name: 'position',
                        type: GraphQLInt,
                    },
                    song: {
                        name: 'song',
                        type: Item,
                        resolve: (root, _, {database}) => database.collection('item').findOne({_id: root._id.oid})
                    }
                })
            })),
            resolve (root) {
                return root.__ref.filter(item => item.__contentType === 'item/song');
            }
        },
        publications: {
            name: 'publications',
            type: new GraphQLList(Publication),
            resolve(root) {
                return root.__ref.filter(item => item.__contentType === 'publisher/publication');
            }
        },
        // performers: {
        //     type: new GraphQLList(Artist),
        //     resolve(root, params, {database, }) {
        //         return [];
        //         // return new Promise((pass, fail) => {
        //         //     database.find({'__ref._id': new ObjectID(root._id)}).toArray((error, items) => {
        //         //         if (error) {
        //         //             fail(error)
        //         //         } else {
        //         //             pass(items);
        //         //         }
        //         //     });
        //         // });
        //
        //     }
        // },
    })
});

export const CollectionInput = new GraphQLInputObjectType({
    name: 'CollectionInput',
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        aka: {
            type: new GraphQLList(GraphQLString),
        },
        description: {
            type: GraphQLString,
        },
        releaseDates: {
            type: GraphQLDate,
        },
        genres: {
            type: new GraphQLList(GenreInput),
        },
    },
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

export const CollectionAssociation = new GraphQLObjectType<any, GraphQlContext>({
    name: 'CollectionAssociation',
    fields: () => ({
        collection: {
            name: 'collection',
            type: Collection,
            resolve: ({collection}) => collection
        },
        uuid: {
            type: new GraphQLNonNull(GraphQLUUID),
            resolve: ({collection, itemId}) => {
                return collection.__ref.find((item: any) => {
                    return item._id.oid.equals(itemId) && item.__contentType === 'item/song';
                }).__uuid;
            }
        }
    })
});
