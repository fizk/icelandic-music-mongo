import {GraphQLNonNull, GraphQLID} from 'graphql';
import {Item, ItemInput} from "../types/Item";
// import {GraphQlContext} from '../../../@types'

export default {
    type: Item,
    args: {
        item: {
            type: new GraphQLNonNull(GraphQLID),
        },
        values: {
            type: new GraphQLNonNull(ItemInput),
        },
    },
    // resolve (root: any, {values, item}: any, {database,}: GraphQlContext) { //@todo fix any
    //     const document = database.doc(`item/${item}`);
    //
    //     return document.update(Object.assign({}, values))
    //         .then(() => document.get())
    //         .then(transformSnapshot);
    // }
};
