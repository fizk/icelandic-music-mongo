import {GraphQLString, GraphQLList, GraphQLInt} from "graphql";
import Artist from '../types/Artist';
import {transformSnapshot} from "../utils/transform";

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
    resolve (root: any, {type, start = 0, end = 10}: any, {database}: any) {
        return database.collection('artists')
            .orderBy('name')
            .startAt(start)
            .endAt(end)
            .get().then((doc: any) => doc.docs.map(transformSnapshot));
    }
};
