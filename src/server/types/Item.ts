import {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLEnumType} from "graphql";
import ArtistRole from './ArtistRole';
import {Item as DBItem, ReferenceUnit as DBReferenceUnit, Unit as DBUnit} from "../../../@types/database";
import Genre, {GenreInput} from "./Genre";
import {splitContentType, splitGenre} from "../utils/split";
import UnitInterface from "./Unit";
import Content from "./Content";
import GraphQLDateTime from "./GraphQLDateTime";
import {ObjectID} from "mongodb";
import {GraphQlContext} from "../../../@types";
import Collection from './Collection';
import Period from "./Period";
import Group from "./Group";
import GraphQLUUID from "./GraphQLUUID";

export default new GraphQLObjectType<DBItem, GraphQlContext>({
    name: 'Item',
    description: 'A part of a collection',
    interfaces: [UnitInterface],
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
            type: Content,
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
                return root.__ref.filter(item => item.__contentType == 'participant/instrument');
            }
        },
        authors: {
            type: new GraphQLList(ArtistRole),
            resolve(root) {
                return root.__ref.filter(item => item.__contentType == 'participant/author');
            }
        },
        engineers: {
            type: new GraphQLList(ArtistRole),
            resolve(root) {
                return root.__ref.filter(item => item.__contentType == 'participant/recording');
            }
        },
        appearsOn: {
            type: new GraphQLList(CollectionAssociation),
            resolve(root, params, {database}) {
                return database.collection('collection').find({"__ref": {
                        "$elemMatch": {
                            "_id.oid": new ObjectID(root._id),
                            "__contentType": "item/song"
                        }
                    }}).toArray().then(collections => {
                    return collections.map(collection => ({
                        collection,
                        itemId: root._id
                    }));
                });
            }
        }
    })
});


export const CollectionAssociation = new GraphQLObjectType<DBReferenceUnit, GraphQlContext>({
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

export const ItemType = new GraphQLEnumType({
    name: 'ItemType',
    values: {
        song: {value: 'song'},
    }
});
