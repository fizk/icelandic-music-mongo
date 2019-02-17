import {GraphQLID, GraphQLNonNull} from 'graphql';
import {Collection, CollectionInput} from '../types/Collection'
import {GraphQlContext} from '../../../@types'

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
    resolve (root: any, {values, collection}: any, {database,}: GraphQlContext) { //@todo fix any
        // const document = database.doc(`collections/${collection}`);
        //
        // return document.update(Object.assign({}, values))
        //     .then(() => document.get())
        //     .then(transformSnapshot);
    }
};
