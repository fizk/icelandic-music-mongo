import {GraphQLNonNull, GraphQLString} from "graphql";
import Artist from '../types/Artist';
import {ObjectID,} from 'mongodb'
import {GraphQlContext} from '../../../@types'

type root = any;
type params = {id?: string};
type context = GraphQlContext;

export default {
    type: Artist,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve (root: root, {id}: params, {database}: context) {
        return database.collection('artist').findOne({_id: new ObjectID(id)})
    }
};

