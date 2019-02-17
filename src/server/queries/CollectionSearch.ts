import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import {CollectionType, Collection} from '../types/Collection';
import {GraphQlContext} from '../../../@types'
import {ObjectID} from "bson";

export default {
    type: new GraphQLList(Collection),
    args: {
        term: {
            name: 'term',
            type: new GraphQLNonNull(GraphQLString),
        },
        limit: {
            name: 'limit',
            type: GraphQLInt
        },
        type: {
            name: 'type',
            type: CollectionType
        }
    },
    resolve (root: any, {term, limit = 10}: any, {database, search}: GraphQlContext) {
        return search.search({
            index: 'collection',
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                fuzzy: {
                                    name: {value: term, boost: 1}
                                }
                            }
                        ]
                    }
                }
            },
        }).then((data: any) => (
            data.hits.hits.map((item: any) => ({...item._source, _id: new ObjectID(item._id)}))
        ));
    }
};

