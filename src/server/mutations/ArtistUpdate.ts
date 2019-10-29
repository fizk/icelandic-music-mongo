import {GraphQLNonNull, GraphQLID} from 'graphql';
import {Artist, ArtistInput} from '../types/Artist'
import {GraphQlContext} from "../../../@types";
import {ObjectID} from "bson";

export default {
    type: Artist,
    args: {
        artist: {
            type: new GraphQLNonNull(GraphQLID),
        },
        values: {
            type: new GraphQLNonNull(ArtistInput),
        },
    },
    resolve (root: any, {artist, values}: any, {database, event}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('artist').findOneAndUpdate(
            {_id: new ObjectID(artist)},
            {$set: values},
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
