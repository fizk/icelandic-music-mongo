import {GraphQLString, GraphQLList} from "graphql";
import {SearchResult} from "../types/SearchResult";
import {GraphQlContext} from '../../../@types'
import {DataSource} from "../../../@types/database";

interface Params {
    term: string;
    limit?: number;
}

interface SearchSource { //@todo fixme
    _source: object;
    _id: string;
}

interface SearchReturn {
    hits: {
        hits: SearchSource[];
    };
}

export default {
    type: new GraphQLList(SearchResult),
    args: {
        term: {
            name: 'term',
            type: GraphQLString
        }
    },
    resolve (root: DataSource.Unit, {term}: any, {search}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return search.search({
            index: 'it_items, it_collections, it_artists',
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
        }).then((data: SearchReturn) => {
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
