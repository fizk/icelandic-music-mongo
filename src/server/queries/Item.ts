import {GraphQLID, GraphQLNonNull} from "graphql";
import {Item} from '../types/Item';
import {GraphQlContext} from "../../../@types";
import {ObjectID} from "mongodb";
import {DataSource} from "../../../@types/database";

interface Params {
    id?: string;
}

export default {
    type: Item,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root: DataSource.Unit, {id}: any, {database}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('item').findOne({_id: new ObjectID(id)})
    }
};
