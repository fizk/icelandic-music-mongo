import {GraphQLNonNull, GraphQLID} from 'graphql';
import {transformSnapshot} from "../utils/transform";
import Item, {ItemInput} from "../types/Item";

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
    // resolve (root, {values, item}, {database,}) {
    //     const document = database.doc(`item/${item}`);
    //
    //     return document.update(Object.assign({}, values))
    //         .then(() => document.get())
    //         .then(transformSnapshot);
    // }
};
