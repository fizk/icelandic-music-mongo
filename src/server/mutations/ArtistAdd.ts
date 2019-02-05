import {GraphQLNonNull} from 'graphql';
import Artist, {ArtistInput, ArtistType} from '../types/Artist'
import {transformSnapshot} from "../utils/transform";

export default {
    type: Artist,
    args: {
        values: {
            type: new GraphQLNonNull(ArtistInput),
        },
        type: {
            name: 'type',
            type: new GraphQLNonNull(ArtistType)
        },
    },
    // resolve (root, {values, type}, {database,}) {
    //     const data: D.ArtistType = Object.assign({
    //         __contentType: `artist/${type}`,
    //         __ref: [],
    //         aka: [],
    //         description: null,
    //         genres: [],
    //         periods: [],
    //         from: null,
    //         to: null,
    //     }, values);
    //
    //     return database.collection('artists').add(data)
    //         .then(doc => doc.get())
    //         .then(transformSnapshot);
    // }
};
