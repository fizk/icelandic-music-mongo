import {GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLError} from 'graphql';
import {GraphQlContext} from "../../../@types";
import {Collection} from "../types/Collection";
import {ItemType} from "../types/Item";
import {ObjectID} from "bson";
import {v4 as uuid} from 'uuid';

export default {
    type: Collection,
    args: {
        collection: {
            type: new GraphQLNonNull(GraphQLID)
        },
        item: {
            type: new GraphQLNonNull(GraphQLID)
        },
        type: {
            type: new GraphQLNonNull(ItemType),
        },
        position: {
            type: GraphQLInt
        },
        orderLabel: {
            type: GraphQLString
        }
    },
    resolve (root: any, {collection, item, type, position = 0}: any, {database, event}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('collection').findOneAndUpdate(
            {_id: new ObjectID(collection)},
            { $push: {__ref: {
                        __contentType: `item/${type}`,
                        position: position,
                        label: 'string',
                        _id: {
                            namespace: 'item',
                            oid: new ObjectID(item),
                        },
                        __created: new Date(),
                        __updated: new Date(),
                        __uuid: uuid(),

                    }
                }
            },
            {returnOriginal: false}
        ).then(result => {
            if (result.ok) {
                event.emit('update', 'collection', result.value);
                return result.value
            }
            throw new GraphQLError(`Couldn't add Item(${item}) Collection(${collection})`);
        });
    }
};
