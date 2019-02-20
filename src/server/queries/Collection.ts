import {GraphQLNonNull, GraphQLID} from "graphql";
import {Collection} from '../types/Collection';
import {ObjectID} from "mongodb";
import {GraphQlContext} from '../../../@types'
import {DataSource} from "../../../@types/database";

interface Params {
    id?: string;
}

export default {
    type: Collection,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root: DataSource.Unit, {id}: any, {database}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('collection').findOne({_id: new ObjectID(id)})
    }
};
