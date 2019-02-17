import {GraphQLString, GraphQLList, GraphQLInt} from "graphql";
import {GraphQlContext} from '../../../@types';
import {Artist} from '../types/Artist';

export default {
    type: new GraphQLList(Artist),
    args: {
        type: {
            name: 'type',
            type: GraphQLString
        },
        start: {
            name: 'start',
            type: GraphQLInt
        },
        end: {
            name: 'start',
            type: GraphQLInt
        },
    },
    resolve (root: any, {type, start = 0, end = 10}: any, {database}: GraphQlContext) {
        return database.collection('artist').find().toArray();
    }
};
