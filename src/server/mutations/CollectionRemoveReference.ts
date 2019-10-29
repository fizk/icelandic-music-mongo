import {GraphQLID, GraphQLNonNull} from 'graphql';
import {GraphQLUUID} from '../types/GraphQLUUID';
import {GraphQlContext} from "../../../@types";
import {ObjectID} from "bson";
import {Collection} from "../types/Collection";

export default {
    type: Collection,
    args: {
        collection: {
            type: new GraphQLNonNull(GraphQLID)
        },
        reference: {
            type: new GraphQLNonNull(GraphQLUUID)
        },
    },
    resolve (root: any, {collection, reference}: any, {database, event}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('collection').findOneAndUpdate(
            {_id: new ObjectID(collection)},
            {$pull: {__ref: {__uuid: reference}}},
            {returnOriginal: false},
        ).then(result => {
            if (result.ok === 1) {
                event.emit('update', 'collection', result.value);
                return result.value;
            }
            return null;
        });
    }
};
