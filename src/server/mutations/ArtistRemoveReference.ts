import {GraphQLID, GraphQLNonNull} from 'graphql';
import {Artist} from "../types/Artist";
import {GraphQLUUID} from '../types/GraphQLUUID';
import {GraphQlContext} from '../../../@types'
import {ObjectID} from "bson";

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
    resolve (root: any, {artist, reference}: any, {database, event}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('artist').findOneAndUpdate(
            {_id: new ObjectID(artist)},
            {$pull: {__ref: {__uuid: reference}}},
            {returnOriginal: false},
        ).then(result => {
            if (result.ok === 1) {
                event.emit('update', 'artist', result.value);
                return result.value;
            }
            return null;
        });
    }
};
