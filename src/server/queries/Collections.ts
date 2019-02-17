import {GraphQLString, GraphQLList, GraphQLInt} from "graphql";
import {Collection} from '../types/Collection';
import {GraphQlContext} from '../../../@types'

export default  {
    type: new GraphQLList(Collection),
    args: {
        type: {
            name: 'type',
            type: GraphQLString
        },
        limit: {
            name: 'limit',
            type: GraphQLInt
        },
    },
    resolve (root: any, {type, limit}: any, {database}: GraphQlContext) {
        return database.collection('collection').find().toArray();
    }
};
