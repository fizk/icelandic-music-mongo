import {GraphQLError, GraphQLNonNull} from 'graphql';
import {Collection, CollectionInput, CollectionType} from '../types/Collection';
import {GraphQlContext, GraphQLTypes} from "../../../@types";
import {DataSource} from "../../../@types/database";

interface Params {
    value: GraphQLTypes.CollectionInput;
    type: 'album' | 'album+ep' | 'album+single' | 'album+compilation';
}

export default {
    type: Collection,
    args: {
        values: {
            type: new GraphQLNonNull(CollectionInput),
        },
        type: {
            name: 'type',
            type: new GraphQLNonNull(CollectionType)
        },
    },
    resolve (root: null, {values, type}: any, {database, event}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        const data: DataSource.Artist = Object.assign({
            __contentType: `collection/${type}`,
            __ref: [],
            aka: [],
            description: null,
            genres: [],
            periods: [],
            updateTime: new Date(),
            createTime: new Date(),
        }, values);

        return database.collection('collection').insertOne(data).then(result => {
            if (result.insertedCount > 0) {
                if (result.result.ok) {
                    event.emit('create', 'collection', result.ops[0]);
                    return result.ops[0];
                }

                throw new GraphQLError('Could\'t create Collection')

            }

        });
    }
};
