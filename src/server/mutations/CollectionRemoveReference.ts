import {GraphQLID, GraphQLNonNull} from 'graphql';
import {Artist} from "../types/Artist";
import {GraphQLUUID} from '../types/GraphQLUUID';
import {GraphQlContext} from "../../../@types";

export default {
    type: Artist,
    args: {
        collection: {
            type: new GraphQLNonNull(GraphQLID)
        },
        reference: {
            type: new GraphQLNonNull(GraphQLUUID)
        },
    },
    resolve (root: any, {collection, reference}: any, {database}: GraphQlContext) { //@todo fix any
        // return database.doc(`/collections/${collection}`).get()
        //     .then((snapshot: QueryDocumentSnapshot) => {
        //         const refArray: D.ReferenceUnit[] = snapshot.data().__ref.filter((item: D.ReferenceUnit) =>  item.__uuid !== reference);
        //         return snapshot.ref.update({__ref: refArray}).then(() => snapshot.ref.get());
        //     })
        //     .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);
    }
};
