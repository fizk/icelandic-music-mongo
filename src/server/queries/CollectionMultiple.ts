import {GraphQLString, GraphQLList, GraphQLInt} from "graphql";
import Collection from '../types/Collection';

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
    resolve (root: any, {type, limit}: any, {database}: any) {
        return {}
        // const regex = new RegExp(`collection/${type ? type.replace('+', '\\+') : '.*'}`);
        //
        // return new Promise((pass, fail) => {
        //     database.find({__contentType: {$regex: regex}}).limit(limit || 0).toArray((error, items: Unit[]) => {
        //         if (error) {
        //             fail(error)
        //         } else {
        //             pass(items);
        //         }
        //     });
        // });
    }
};
