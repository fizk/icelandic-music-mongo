import {GraphQLNonNull, GraphQLID} from 'graphql';
import {Artist, ArtistInput} from '../types/Artist'
// import {GraphQlContext} from '../../../@types'

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
    // resolve (root: any, {values, artist}: any, {database,}: GraphQlContext) { //@todo fix any
    //     const document = database.doc(`artists/${artist}`);
    //
    //     return document.update(Object.assign({}, values))
    //         .then(() => document.get())
    //         .then(transformSnapshot);
    // }
};
