import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import Item from '../types/Item';

export default {
    type: new GraphQLList(Item),
    args: {
        term: {
            name: 'term',
            type: new GraphQLNonNull(GraphQLString),
        },
        limit: {
            name: 'limit',
            type: GraphQLInt
        },
    },
    resolve (root: any, {term, limit = 10}: any, {database, search}: any) {
        return search.search({
            index: 'it_items',
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                fuzzy: {
                                    "name.raw": {value: term, boost: 1}
                                }
                            },{
                                fuzzy: {
                                    "aka.raw": {value: term}
                                }
                            }, {
                                fuzzy: {
                                    "description.raw": {value: term}
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

