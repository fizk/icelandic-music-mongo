import {GraphQLID, GraphQLNonNull} from 'graphql';
import {Artist} from "../types/Artist";
import {GraphQLUUID} from '../types/GraphQLUUID';
// import {GraphQlContext} from '../../../@types'

export default {
    type: Artist,
    args: {
        artist: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID)
        },
        reference: {
            name: 'reference',
            type: new GraphQLNonNull(GraphQLUUID)
        },
    },
    // resolve (root: any, {artist, reference}: any, {database}: GraphQlContext) {
    //     return database.doc(`/artists/${artist}`).get()
    //         .then((snapshot: QueryDocumentSnapshot) => {
    //             const refArray: D.ReferenceUnit[] = snapshot.data().__ref.filter((item: D.ReferenceUnit) =>  item.__uuid !== reference);
    //             return snapshot.ref.update({__ref: refArray}).then(() => snapshot.ref.get());
    //         })
    //         .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);
    // }
};
