import {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList,GraphQLID} from "graphql";
import {
    Artist as DBArtist,
    Image as DBImage,
    ArtistReference as DBArtistReference,
    ReferenceUnit as DBReferenceUnit,
    PictureReference as DBPictureReference
} from "../../../@types/database";
import {GraphQlContext} from "../../../@types";
import Period from "./Period";
import Image from "./Image";
import Genre from "./Genre";
import Content from "./Content";
import Person from "./Person";
import {splitContentType, splitGenre} from '../utils/split';
import UnitInterface from "./Unit";
import GraphQLDateTime from "./GraphQLDateTime";
import GraphQLUUID from './GraphQLUUID';
import {CollectionConnection} from "./Collection";

export const GroupMember = new GraphQLObjectType<DBReferenceUnit, GraphQlContext>({
    name: 'GroupMember',
    fields: () => ({
        periods: {
            type: new GraphQLList(Period),
            resolve(root) {
                return root.period || []
            },
        },
        artist: {
            name: 'Person',
            type: Person,
            resolve: (root, _, {database}) => database.collection('artist').findOne({_id: root._id.oid})
        },
        uuid: {
            type: new GraphQLNonNull(GraphQLUUID),
            resolve: (root) => root.__uuid
        }
    })
});

const Group: GraphQLObjectType = new GraphQLObjectType<any, GraphQlContext>({
    name: 'Group',
    description: 'A single Group (or artists)',
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
            type: GraphQLDateTime,
        },
        updateTime: {
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
        members: {
            name: 'members',
            type: new GraphQLList(GroupMember),
            resolve: (root) => {
                return root.__ref.filter((item: DBArtistReference) => item.__contentType === 'artist/person+member');
            },
        },
        // avatar: {
        //     name: 'avatar',
        //     type: Image,
        //     resolve (root, _, {database}) {
        //         const imagesReference = root.__ref
        //             .filter((item: any) => item.__contentType === 'image/avatar')
        //             .reduce((a: any, b: DBArtistReference|undefined) => b, undefined);
        //
        //         return imagesReference
        //             ? database.collection('media')
        //                 .findOne({_id: imagesReference._id.oid})
        //                 .then((data: DBImage) => ({...data, dimensions: {height: data.height, width: data.width}}))
        //             : null;
        //     }
        // },
        // hero: {
        //     name: 'hero',
        //     type: Image,
        //     resolve (root, _, {database}) {
        //         const imagesReference = root.__ref
        //             .filter((item: any) => item.__contentType === 'image/hero')
        //             .reduce((a: any, b: DBReferenceUnit|undefined) => b, undefined);
        //
        //         return imagesReference
        //             ? database.collection('media')
        //                 .findOne({_id: imagesReference._id.oid})
        //                 .then((data: DBImage) => ({...data, dimensions: {height: data.height, width: data.width}}))
        //             : null;
        //     }
        // },
    })
});

export default Group;
