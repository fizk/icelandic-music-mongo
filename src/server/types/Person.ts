import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {Unit} from './Unit'
import {GraphQLDateTime} from "graphql-iso-date";
import {ContentType} from "./ContentType";
import {Genre} from "./Genre";
import {splitContentType, splitGenre} from "../utils/split";
import {DataSource} from "../../../@types/database";
import {Image} from "./Image";
import {CollectionConnection, Group} from "./Group";
import {Period} from "./Period";
import {GraphQLUUID} from "./GraphQLUUID";
import {ObjectID} from "bson";
import {GraphQlContext} from "../../../@types";

export const PersonAssociation: GraphQLObjectType<{association: DataSource.Artist, artistId: ObjectID}, GraphQlContext> = new GraphQLObjectType<{association: DataSource.Artist, artistId: ObjectID}, GraphQlContext>({
    name: 'PersonAssociation',
    fields: () => ({
        periods: {
            type: new GraphQLList(Period),
            resolve: ({association, artistId}) => {
                return association.__ref.find((item: any) => {
                    return item._id.oid.equals(artistId) && item.__contentType === 'artist/person+member';
                })!.periods;
            },
        },
        group: {
            name: 'group',
            type: Group,
            resolve: ({association}) => association
        },
        uuid: {
            type: new GraphQLNonNull(GraphQLUUID),
            resolve: ({association, artistId}) => {
                return association.__ref.find((item: any) => {
                    return item._id.oid.equals(artistId) && item.__contentType === 'artist/person+member';
                })!.__uuid;
            }
        }
    })
});

export const Person = new GraphQLObjectType<DataSource.Artist, GraphQlContext>({
    name: 'Person',
    description: 'A single Artist (a person)',
    interfaces: [Unit],
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        contentType: {
            type: ContentType,
            resolve: root => splitContentType(root.__contentType)
        },
        createTime: {
            type: GraphQLDateTime,
        },
        updateTime: {
            type: GraphQLDateTime,
        },
        aka: {
            name: 'aka',
            type: new GraphQLList(GraphQLString),
        },
        period: {
            name: 'period',
            type: Period,
            resolve: ({periods}) =>  periods.length === null ? {from: null, to: null} : periods[0]
        },
        genres: {
            name: 'genres',
            type: new GraphQLList(Genre),
            resolve: (root) => (root.genres || []).map(splitGenre)
        },
        albums: {
            name: 'albums',
            type: new GraphQLList(CollectionConnection),
            resolve: root => root.__ref
                .filter((item: DataSource.ArtistReference) => item.__contentType === 'collection/album')
        },
        compilations: {
            name: 'compilations',
            type: new GraphQLList(CollectionConnection),
            resolve: root => root.__ref
                .filter((item: DataSource.ArtistReference) => item.__contentType === 'collection/album+compilation')
        },
        eps: {
            name: 'eps',
            type: new GraphQLList(CollectionConnection),
            resolve: root => root.__ref
                .filter((item: DataSource.ArtistReference) => item.__contentType === "collection/album+ep")
        },
        singles: {
            name: 'singles',
            type: new GraphQLList(CollectionConnection),
            resolve: root => root.__ref
                .filter((item: DataSource.ArtistReference) => item.__contentType === 'collection/album+single')
        },
        association: {
            name: 'association',
            type: new GraphQLList(PersonAssociation),
            resolve(root, params, {database}) {
                return database.collection('artist').find({"__ref": {
                        "$elemMatch": {
                            "_id.oid": new ObjectID(root._id),
                            "__contentType": "artist/person+member"
                        }
                    }}).toArray().then((associations: DataSource.Artist[]) => {
                    return associations.map(association => ({
                        association,
                        artistId: root._id
                    }));
                });
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
    })
});
