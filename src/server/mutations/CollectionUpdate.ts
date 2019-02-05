import {GraphQLID, GraphQLNonNull} from 'graphql';
import Collection, {CollectionInput} from '../types/Collection'
import {transformSnapshot} from "../utils/transform";

export default {
    type: Collection,
    args: {
        collection: {
            type: new GraphQLNonNull(GraphQLID),
        },
        values: {
            type: new GraphQLNonNull(CollectionInput)
        },
    },
    // resolve (root, {values, collection}, {database,}) {
    //     const document = database.doc(`collections/${collection}`);
    //
    //     return document.update(Object.assign({}, values))
    //         .then(() => document.get())
    //         .then(transformSnapshot);
    // }
};
