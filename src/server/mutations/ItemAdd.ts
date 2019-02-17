import {GraphQLNonNull} from 'graphql';
import {Item, ItemInput, ItemType} from '../types/Item';
import {GraphQlContext} from "../../../@types";

export default {
    type: Item,
    args: {
        values: {
            name: 'item',
            type: new GraphQLNonNull(ItemInput),
        },
        type: {
            type: new GraphQLNonNull(ItemType),
        }
    },
    resolve (root: any, {values, type}: any, {database}: GraphQlContext) { //@todo fix any
        // const data: D.Item = Object.assign({
        //     __contentType: `item/${type}`,
        //     __ref: [],
        //     name: null,
        //     description: null,
        //     duration: 0,
        //     genres: [],
        // }, values);
        //
        // return database.collection('items').add(data)
        //     .then(doc => doc.get())
        //     .then(transformSnapshot);
    }
};
