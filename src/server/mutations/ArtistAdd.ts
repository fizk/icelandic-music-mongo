import {GraphQLError, GraphQLNonNull} from 'graphql';
import {Artist, ArtistInput, ArtistType} from '../types/Artist'
import {DataSource} from "../../../@types/database";
import {GraphQlContext, GraphQLTypes} from "../../../@types";

interface Params {
    value: GraphQLTypes.ArtistInput;
    type: 'person' | 'group';
}

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
    resolve (root: null, {values, type}: any, {database, event}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        const data: DataSource.Artist = Object.assign({
            __contentType: `artist/${type}`,
            __ref: [],
            aka: [],
            description: null,
            genres: [],
            periods: [],
            updateTime: new Date(),
            createTime: new Date(),
        }, values);

        return database.collection('artist').insertOne(data).then(result => {
            if (result.insertedCount > 0) {
                if (result.result.ok) {
                    event.emit('create', 'artist', result.ops[0]);
                    return result.ops[0];
                }

                throw new GraphQLError('Could\'t create Artist')

            }
        });
    }
};
