import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import {CollectionType, Collection} from '../types/Collection';
import {GraphQlContext} from '../../../@types'
import {ObjectID} from "bson";
import {DataSource} from "../../../@types/database";

interface Params {
    term: string;
    type?: 'album' | 'album+ep' | 'album+single' | 'album+compilation';
    limit?: number;
}

interface SearchSource { //@todo fixme
    _source: object;
    _id: string;
}

interface SearchResult {
    hits: {
        hits: SearchSource[];
    };
}

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
    // resolve (root: any, {term, limit = 10}: any, {database, search}: GraphQlContext) {
    resolve (root: DataSource.Unit, {term}: any, {search}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
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
        }).then((data: SearchResult) => (
            data.hits.hits.map(item => ({...item._source, _id: new ObjectID(item._id)}))
        ));
    }
};

