import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {GraphQLDateTime} from "graphql-iso-date";
import {Unit} from './Unit'
import {GraphQlContext} from '../../../@types'
import {DataSource} from '../../../@types/database'
import {ContentType} from "./ContentType";
import {splitContentType, splitGenre} from "../utils/split";
import {Genre} from "./Genre";
import {Period} from "./Period";
import {GraphQLUUID} from "./GraphQLUUID";
import {Person} from "./Person";
import {Image} from "./Image";
import {Collection} from "./Collection";

export const CollectionConnection: GraphQLObjectType<DataSource.ArtistReferenceCollection, GraphQlContext> = new GraphQLObjectType<DataSource.ArtistReferenceCollection, GraphQlContext>({
    name: 'CollectionConnection',
    fields: () => ({
        collection: {
            type: Collection,
            resolve: ({_id}, _, {database}) => database.collection('collection').findOne({_id: _id!.oid})
        },
        uuid: {
            type: new GraphQLNonNull(GraphQLUUID),
            resolve: ({__uuid}) => __uuid
        }
    })
});

export const GroupMember: GraphQLObjectType<DataSource.ArtistReferenceMember, GraphQlContext> = new GraphQLObjectType<DataSource.ArtistReferenceMember, GraphQlContext>({
    name: 'GroupMember',
    fields: () => ({
        periods: {
            type: new GraphQLList(Period),
            resolve: ({periods}) => periods || [],
        },
        artist: {
            name: 'Person',
            type: Person,
            resolve: ({_id}, _, {database}) => database.collection('artist').findOne({_id: _id!.oid})
        },
        uuid: {
            type: new GraphQLNonNull(GraphQLUUID),
            resolve: (root) => root.__uuid
        }
    })
});

export const Group = new GraphQLObjectType<DataSource.Artist, GraphQlContext>({
    name: 'Group',
    description: 'A single Group of artists (or artists)',
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
            type: new GraphQLList(GraphQLString),
        },
        genres: {
            type: new GraphQLList(Genre),
            resolve: (root) => (root.genres || []).map(splitGenre)
        },
        periods: {
            type: new GraphQLList(Period),
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
        members: {
            name: 'members',
            type: new GraphQLList(GroupMember),
            resolve: root => root.__ref
                .filter((item: DataSource.ArtistReference) => item.__contentType === "artist/person+member")
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
