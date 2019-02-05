import {GraphQLNonNull, GraphQLID} from 'graphql';
import Artist, {ArtistInput} from '../types/Artist'
import {transformSnapshot} from "../utils/transform";

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
    // resolve (root, {values, artist}, {database,}) {
    //     const document = database.doc(`artists/${artist}`);
    //
    //     return document.update(Object.assign({}, values))
    //         .then(() => document.get())
    //         .then(transformSnapshot);
    // }
};
