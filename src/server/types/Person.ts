import {GraphQLNonNull, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLID} from "graphql";
import {
    ReferenceUnit as DBReferenceUnit,
    Image as DBImage,
    Artist as DBArtist,
    ArtistReference as DBArtistReference,
    PictureReference as DBPictureReference
} from "../../../@types/database";
import {GraphQlContext} from "../../../@types";
import {splitContentType, splitGenre} from "../utils/split";
import Period from "./Period";
import Image from "./Image";
import Genre from "./Genre";
import Content from "./Content";
import Group from "./Group";
import UnitInterface from "./Unit";
import GraphQLDateTime from "./GraphQLDateTime";
import GraphQLUUID from './GraphQLUUID';
import {CollectionConnection} from "./Collection";
import {ObjectID} from "mongodb";

export const PersonAssociation = new GraphQLObjectType<DBReferenceUnit, GraphQlContext>({
    name: 'PersonAssociation',
    fields: () => ({
        periods: {
            type: new GraphQLList(Period),
            resolve: ({association, artistId}) => {
                return association.__ref.find((item: any) => {
                    return item._id.oid.equals(artistId) && item.__contentType === 'artist/person+member';
                }).periods;
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
                return 'hundur';
                // return association.__ref.find((item: any) => {
                //     return item._id.oid.equals(artistId) && item.__contentType === 'artist/person+member';
                // }).__uuid;
            }
        }
    })
});

const Person = new GraphQLObjectType<DBArtist, GraphQlContext>({
    name: 'Person',
    description: 'A single ArtistType (a human)',
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
        createTime: {
            name: 'createTime',
            type: GraphQLDateTime,
        },
        updateTime: {
            name: 'updateTime',
            type: GraphQLDateTime,
        },
        description: {
            name: 'description',
            type: GraphQLString,
        },
        aka: {
            name: 'aka',
            type: new GraphQLList(GraphQLString),
        },
        genres: {
            name: 'genres',
            type: new GraphQLList(Genre),
            resolve: (root) => (root.genres || []).map(splitGenre)
        },
        periods: {
            name: 'periods',
            type: new GraphQLList(Period),
            resolve: (root) => ([{
                from: root.from,
                to: root.to,
            }])
        },
        contentType: {
            name: 'contentType',
            type: Content,
            resolve: root => splitContentType(root.__contentType)
        },
        albums: {
            name: 'albums',
            type: new GraphQLList(CollectionConnection),
            resolve: root => root.__ref
                .filter((item: DBArtistReference) => item.__contentType === 'collection/album')
        },
        compilations: {
            name: 'compilations',
            type: new GraphQLList(CollectionConnection),
            resolve: root => root.__ref
                .filter((item: DBArtistReference) => item.__contentType === 'collection/album+compilation')
        },
        eps: {
            name: 'eps',
            type: new GraphQLList(CollectionConnection),
            resolve: root => root.__ref
                .filter((item: DBArtistReference) => item.__contentType === 'collection/album+ep')
        },
        singles: {
            name: 'singles',
            type: new GraphQLList(CollectionConnection),
            resolve: root => root.__ref
                .filter((item: DBArtistReference) => item.__contentType === 'collection/album+single')
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
                    }}).toArray().then(associations => {
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
                    .filter((item: any) => item.__contentType === 'image/avatar')
                    .reduce((a: any, b: DBArtistReference|undefined) => b, undefined);

                return imagesReference
                    ? database.collection('media')
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
                    .reduce((a: any, b: DBArtistReference|undefined) => b, undefined);

                return imagesReference
                    ? database.collection('media')
                        .findOne({_id: imagesReference._id.oid})
                        .then((data: DBImage) => ({...data, dimensions: {height: data.height, width: data.width}}))
                    : null;
            }
        },
    })
});

export default Person;

