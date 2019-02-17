import {GraphQLObjectType, GraphQLString, GraphQLInputObjectType} from "graphql";

export const ContentType = new GraphQLObjectType({
    name: 'ContentType',
    fields: {
        type: {type: GraphQLString},
        subtype: {type: GraphQLString},
        attribute: {type: GraphQLString},
    }
});

export const ContentTypeInput = new GraphQLInputObjectType({
    name: 'ContentTypeInput',
    description: 'ContentTypeInput',
    fields: {
        type: {type: GraphQLString},
        subtype: {type: GraphQLString},
        attribute: {type: GraphQLString},
    }
});
