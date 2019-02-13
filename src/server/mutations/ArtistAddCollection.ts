import {GraphQLID, GraphQLNonNull} from 'graphql';
import {CollectionType} from '../types/Collection'
// import {v4 as uuid} from 'uuid';
import {transformSnapshot} from "../utils/transform";
import Artist from "../types/Artist";
import {GraphQlContext} from '../../../@types'
import {CollectionReference} from "../../../@types/database";

export default {
    type: Artist,
    args: {
        artist: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID)
        },
        collection: {
            name: 'collection',
            type: new GraphQLNonNull(GraphQLID)
        },
        collectionType: {
            name: 'collectionType',
            type: new GraphQLNonNull(CollectionType)
        }
    },
    resolve (root: any, {artist, collection, collectionType = 'album'}: any, {database}: GraphQlContext) {
        return database.collection('collection').insertOne({
            __contentType: `collection/${collectionType}`,
            name: collection.name,
            releaseDates: new Date(),
            description: new Date(),
            genres: [],
            aka: [],
            __ref: [],
        }).then((result: any) => {
            console.log(result, 'hey');

            return result.ops[0];
        })

        // database.collection('collection').insertOne({
        //     __contentType: `collection/${collectionType}`,
        //     name: collection.name,
        //     releaseDates: null,
        //     description: null,
        //     genres: [],
        //     aka: [],
        //     __ref: []
        // }).then((result) => {
        //     console.log(result);
        //     return null;
        // })


        // const artistReference = database.doc(`/artists/${artist}`);
        // return artistReference.get()
        //     .then((snapshot: QueryDocumentSnapshot) => {
        //         const data = snapshot.data();
        //         const reference: D.ReferenceUnit = {
        //             __contentType: `collection/${collectionType}`,
        //             _id: database.doc(`collections/${collection}`),
        //             __created: new Date(),
        //             __uuid: uuid()
        //         };
        //         return snapshot.ref.update('__ref', [...data.__ref, reference])
        //     })
        //     .then(() => artistReference.get())
        //     .then((snapshot: QueryDocumentSnapshot) => snapshot.exists ? transformSnapshot(snapshot) : null);
    }
};
