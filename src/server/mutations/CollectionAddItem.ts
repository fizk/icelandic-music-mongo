import {GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLString} from 'graphql';
// import uuid from 'uuid/v4';
// import {GraphQlContext} from "../../../@types";
import {Collection} from "../types/Collection";
import {ItemType} from "../types/Item";

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
    // resolve (root: any, {collection, item, type, position = 0}: any, {database}: GraphQlContext) { //@todo fix any
    //     const document = database.doc(`collections/${collection}`);
    //     return document.get()
    //         .then((snapshot: QueryDocumentSnapshot) => {
    //             const data = snapshot.data();
    //             const reference: D.ReferenceUnit = {
    //                 __contentType: `item/${type}`,
    //                 _id: database.doc(`items/${item}`),
    //                 __created: new Date(),
    //                 __uuid: uuid(),
    //                 position: position
    //             };
    //             return snapshot.ref.update({__ref: [...data.__ref, reference]})
    //         })
    //         .then(() => document.get())
    //         .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);
    //
    // }
};
