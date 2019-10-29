import {GraphQLString, GraphQLList, GraphQLInt} from "graphql";
import {GraphQlContext} from '../../../@types';
import {DataSource} from "../../../@types/database";
import {Item} from "../types/Item";

interface Params {
    type: string;
    start: number;
    end: number;
}

export default {
    type: new GraphQLList(Item),
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
        return database.collection('item').find().toArray();
    }
};
