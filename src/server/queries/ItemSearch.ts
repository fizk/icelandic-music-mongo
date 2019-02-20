import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import {GraphQlContext} from '../../../@types'
import {Item} from '../types/Item';
import {DataSource} from "../../../@types/database";

interface Params {
    term: string;
    limit?: number;
}

interface SearchSource { //@todo fixme
    _source: DataSource.Unit;
    _id: string;
}

interface SearchResult {
    hits: {
        hits: SearchSource[];
    };
}

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
    resolve (root: DataSource.Unit, {term}: any, {search}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
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
        }).then((data: SearchResult) => {
            return data.hits.hits.map(item => {
                return {
                    ...item._source,
                    _id: item._id,
                    __ref: item._source.__ref.map(reference => ({
                        ...reference,
                        // _id: database.doc(reference._id)
                    }))
                }
            });
        });
    }
};

