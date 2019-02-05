import {GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLString} from 'graphql';
import {transformSnapshot} from "../utils/transform";
import Collection from "../types/Collection";
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
    // resolve (root, {collection, item, type, position = 0}, {database}) {
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
