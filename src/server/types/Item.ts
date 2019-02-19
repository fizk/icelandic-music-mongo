import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt,
    GraphQLEnumType,
    GraphQLInputObjectType
} from 'graphql';
import {Unit} from "./Unit";
import {GraphQLDateTime} from "graphql-iso-date";
import {DataSource} from '../../../@types/database';
import {GraphQlContext} from '../../../@types';
import {ContentType} from "./ContentType";
import {splitContentType, splitGenre} from "../utils/split";
import {Genre, GenreInput} from "./Genre";
import {Collection, CollectionAssociation} from "./Collection";
import {ObjectID} from "bson";
import {ArtistRole} from "./ArtistRole";

export const Item = new GraphQLObjectType<DataSource.Item, GraphQlContext>({
    name: 'Item',
    description: 'A part of a collection',
    interfaces: [Unit],
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        createTime: {
            type: GraphQLDateTime,
        },
        updateTime: {
            type: GraphQLDateTime,
        },
        description: {
            type: GraphQLString
        },
        duration: {
            type: GraphQLInt
        },
        contentType: {
            name: 'contentType',
            type: ContentType,
            resolve: (root) => splitContentType(root.__contentType)
        },
        genres: {
            name: 'genres',
            type: new GraphQLList(Genre),
            resolve: (root) => (root.genres || []).map(splitGenre)
        },
        instruments: {
            type: new GraphQLList(ArtistRole),
            resolve(root) {
                return root.__ref.filter(item => item.__contentType === 'participant/instrument');
            }
        },
        authors: {
            type: new GraphQLList(ArtistRole),
            resolve(root) {
                return root.__ref.filter(item => item.__contentType === 'participant/author');
            }
        },
        engineers: {
            type: new GraphQLList(ArtistRole),
            resolve(root) {
                return root.__ref.filter(item => item.__contentType === 'participant/recording');
            }
        },
        appearsOn: {
            type: new GraphQLList(Collection),
            resolve(root, params, {database}) {
                return database.collection('collection').find({"__ref": {
                        "$elemMatch": {
                            "_id.oid": new ObjectID(root._id),
                            "__contentType": "item/song"
                        }
                    }}).toArray();
            }
        }
        // appearsOn: {
        //     type: new GraphQLList(CollectionAssociation),
        //     resolve(root, params, {database}) {
        //         return database.collection('collection').find({"__ref": {
        //                 "$elemMatch": {
        //                     "_id.oid": new ObjectID(root._id),
        //                     "__contentType": "item/song"
        //                 }
        //             }}).toArray().then(collections => {
        //             return collections.map(collection => ({
        //                 collection,
        //                 itemId: root._id
        //             }));
        //         });
        //     }
        // }
    })
});

export const ItemType = new GraphQLEnumType({
    name: 'ItemType',
    values: {
        song: {value: 'song'},
    }
});

export const ItemInput = new GraphQLInputObjectType({
    name: 'ItemInput',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString,
        },
        duration: {
            type: GraphQLInt
        },
        genres: {
            type: new GraphQLList(GenreInput)
        }
    })
});
