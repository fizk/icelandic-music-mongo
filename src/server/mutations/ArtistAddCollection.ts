import {GraphQLError, GraphQLID, GraphQLNonNull} from 'graphql';
import {CollectionType} from '../types/Collection'
import {GraphQlContext} from "../../../@types";
import {v4 as uuid} from 'uuid';
import {Artist} from "../types/Artist";
import {ObjectID} from "bson";

interface Params {
    artist: string;
    collection: string;
    collectionType: 'album' | 'ep' | 'single' | 'compilation';
}

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
    resolve (root: null, {artist, collection, collectionType = 'album'}: any, {database, event}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('artist').findOneAndUpdate(
            {_id: new ObjectID(artist)},
            { $push: {__ref: {
                __contentType: `collection/${collectionType}`,
                _id: {
                    namespace: 'collection',
                    oid: new ObjectID(collection),
                },
                __created: new Date(),
                __updated: new Date(),
                __uuid: uuid()
            }
            }
            },
            {returnOriginal: false}
        ).then(result => {
            if (result.ok) {
                event.emit('update', 'artist', result.value);
                return result.value
            }
            throw new GraphQLError(`Couldn't add Collection(${collection}) to Artist(${artist})`);
        });
    }
};
