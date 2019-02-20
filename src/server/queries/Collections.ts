import {GraphQLString, GraphQLList, GraphQLInt} from "graphql";
import {Collection} from '../types/Collection';
import {GraphQlContext} from '../../../@types'
import {DataSource} from "../../../@types/database";

interface Params {
    type: 'album' | 'album+ep' | 'album+single' | 'album+compilation';
    limit: number;
}

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
    // resolve (root: any, {type, limit}: any, {database}: GraphQlContext) {
    resolve (root: DataSource.Unit, params: any, {database}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('collection').find().toArray();
    }
};
