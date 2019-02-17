import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import {ArtistType, Artist} from '../types/Artist';
import {GraphQlContext} from '../../../@types'
import {ObjectID} from "bson";

export default {
    type: new GraphQLList(Artist),
    args: {
        term: {
            name: 'term',
            type: new GraphQLNonNull(GraphQLString),
        },
        type: {
            type: ArtistType
        },
        limit: {
            name: 'limit',
            type: GraphQLInt
        },
    },
    resolve (root: any, {term, limit = 10}: any, {database, search}: GraphQlContext) {
        return search.search({
            index: 'artist',
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
