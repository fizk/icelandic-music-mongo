import {GraphQLObjectType, GraphQLString, GraphQLInputObjectType} from "graphql";

export default new GraphQLObjectType({
    name: 'Content',
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
