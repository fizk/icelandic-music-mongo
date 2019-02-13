import {GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";
import Collection, {CollectionType} from '../types/Collection';
import {GraphQlContext} from '../../../@types'

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
    resolve (root: any, {term, type, limit = 10}: any, {database, search}: GraphQlContext) {
        const condition: any = {must: []};

        condition.must.push({
            fuzzy: {'name.raw': {value: term}}
        });

        if (type) {
            condition.must.push({
                match: {'__contentType': `collection/${type}`}
            });
        }

        return search.search({
            index: 'it_collections',
            body: {
                query: {
                    bool: condition
                }
            },
        }).then((data: any) => {
            return data.hits.hits.map((item: any) => {
                return {
                    ...item._source,
                    _id: item._id,
                    __ref: item._source.__ref.map((reference: any) => ({
                        ...reference,
                        _id: database.collection('collection').findOne({_id: reference._id})
                    }))
                }
            });
        });
    }
};

