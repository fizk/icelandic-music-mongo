import {GraphQLNonNull, GraphQLID} from "graphql";
import Collection from '../types/Collection';
import {ObjectID} from "mongodb";
import {GraphQlContext} from '../../../@types'

type root = any;
type params = {id?: string};
type context = GraphQlContext;

export default {
    type: Collection,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root: root, {id}: params, {database}: context) {
        return database.collection('collection').findOne({_id: new ObjectID(id)})
    }
};
