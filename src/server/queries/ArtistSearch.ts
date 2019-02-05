import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import Artist, {ArtistType} from '../types/Artist';

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
    resolve (root: any, {term, limit = 10}: any, {database, search}: any) {
        return search.search({
            index: 'it_artists',
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                fuzzy: {
                                    "name": {value: term, boost: 1}
                                }
                            }
                        ]
                    }
                }
            },
        }).then((data: any) => {
            return data.hits.hits.map((item: any) => {
                return {
                    ...item._source,
                    _id: item._id,
                    __ref: item._source.__ref.map((reference: any) => ({
                        ...reference,
                        _id: database.doc(reference._id)
                    }))
                }
            });
        });
    }
};
