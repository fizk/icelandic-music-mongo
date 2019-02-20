import {GraphQLString, GraphQLList, GraphQLInt} from "graphql";
import {GraphQlContext} from '../../../@types';
import {Artist} from '../types/Artist';
import {DataSource} from "../../../@types/database";

interface Params {
    type: string;
    start: number;
    end: number;
}

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
    // resolve (root: null, {type, start = 0, end = 10}: Params, {database}: GraphQlContext) {
    resolve (root: DataSource.Unit, params: any, {database}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('artist').find().toArray();
    }
};
