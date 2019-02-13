import {GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLList} from "graphql";
import GraphQLDate from './GraphQLDate';
import Publisher from './Publisher';
import {Unit as DBUnit} from "../../../@types/database";
import {transformSnapshot} from "../utils/transform";
import {GraphQlContext} from '../../../@types'

export default new GraphQLObjectType<any, GraphQlContext>({
    name: 'Publication',
    fields: {
        catalogNumber: {
            name: 'catalogNumber',
            type: GraphQLString
        },
        formats: {
            name: 'formats',
            type: new GraphQLList(GraphQLString),
        },
        date: {
            name: 'date',
            type: GraphQLDate,
        },
        publisher: {
            name: 'publisher',
            type: Publisher,
            resolve(root, _, {database}) {
                return database.collection('publisher').findOne({_id: root._id.oid})
            }
        },
    }
});

export const ContentTypeInput = new GraphQLInputObjectType({
    name: 'PublicationInput',
    description: 'ContentTypeInput',
    fields: {
        type: {type: GraphQLString},
        subtype: {type: GraphQLString},
        attribute: {type: GraphQLString},
    }
});
