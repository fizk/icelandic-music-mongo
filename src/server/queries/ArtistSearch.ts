import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import {ArtistType, Artist} from '../types/Artist';
import {GraphQlContext} from '../../../@types'
import {ObjectID} from "bson";
import {DataSource} from "../../../@types/database";

interface Params {
    term: string;
    type?: 'person' | 'group';
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
    // resolve (root: null, {term, limit = 10}: Params, {database, search}: GraphQlContext) {
    resolve (root: DataSource.Unit, {term}: any, {search}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
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
        }).then((data: SearchResult) => (
            data.hits.hits.map(item => ({...item._source, _id: new ObjectID(item._id)}))
        ));
    }
};
