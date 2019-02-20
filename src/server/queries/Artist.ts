import {GraphQLID, GraphQLNonNull} from "graphql";
import {Artist} from '../types/Artist';
import {ObjectID,} from 'mongodb'
import {GraphQlContext} from '../../../@types'
import {DataSource} from '../../../@types/database'

interface Params {
    id: string;
}

export default {
    type: Artist,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root: DataSource.Unit, {id}: any, {database}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('artist').findOne({_id: new ObjectID(id)})
    }
};

