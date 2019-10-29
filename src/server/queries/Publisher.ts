import {GraphQLID, GraphQLNonNull} from "graphql";
import {Publisher} from '../types/Publisher';
import {ObjectID,} from 'mongodb'
import {GraphQlContext} from '../../../@types'
import {DataSource} from '../../../@types/database'

interface Params {
    id: string;
}

export default {
    type: Publisher,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root: DataSource.Unit, {id}: any, {database}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('publisher').findOne({_id: new ObjectID(id)})
    }
};

