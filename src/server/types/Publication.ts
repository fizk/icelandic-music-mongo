import {GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLList} from "graphql";
import {GraphQlContext} from "../../../@types";
import {DataSource} from "../../../@types/database";
import {GraphQLDate} from "graphql-iso-date";
import {Publisher} from "./Publisher";

export default new GraphQLObjectType<DataSource.CollectionReferencePublication, GraphQlContext>({
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

export const PublicationInput = new GraphQLInputObjectType({
    name: 'PublicationInput',
    description: 'ContentTypeInput',
    fields: {
        type: {type: GraphQLString},
        subtype: {type: GraphQLString},
        attribute: {type: GraphQLString},
    }
});
