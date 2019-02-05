import {GraphQLID, GraphQLNonNull} from "graphql";
import Item from '../types/Item';
import {GraphQlContext} from "../../../@types";
import {ObjectID} from "mongodb";

type root = any;
type params = {id?: string};
type context = GraphQlContext;

export default {
    type: Item,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root: root, {id}: params, {database}: context) {
        return database.collection('item').findOne({_id: new ObjectID(id)})
    }
};
