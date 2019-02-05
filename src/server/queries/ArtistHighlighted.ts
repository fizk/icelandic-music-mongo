import {GraphQLList, GraphQLInt} from "graphql";
import Artist from '../types/Artist';

export default {
    type: new GraphQLList(Artist),
    args: {
        limit: {
            name: 'limit',
            type: GraphQLInt,
        },
    },
    resolve (root: any, {limit}: any, {database}: any) {
        return {}
        // return new Promise((pass, fail) => {
        //     database.find({__contentType: {$regex: /ArtistType\/.*/}})
        //         .sort({__created: -1})
        //         .limit(limit || 4).toArray((error, items) => {
        //             if (error) {
        //                 fail(error)
        //             } else {
        //                 pass(items);
        //             }
        //     });
        //
        // });
    }
};
