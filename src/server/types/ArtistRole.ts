import {GraphQLObjectType, GraphQLString, GraphQLList} from "graphql";
import {ItemReferenceParticipant} from '../../../@types/database';
import {GraphQlContext} from '../../../@types';
import Artist from './Artist';

export default new GraphQLObjectType<ItemReferenceParticipant, GraphQlContext>({
    name: 'ArtistRole',
    fields: () => ({
        artist: {
            name: 'artist',
            type: Artist,
            resolve(root, params, {database}) {
                return database.collection('artist').findOne({_id: root._id.oid});
            }
        },
        roles: {
            name: 'roles',
            type: new GraphQLList(GraphQLString),
            resolve: (root) => root.roles
        },
    }),
});
