import {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInputObjectType} from "graphql";

export const Genre = new GraphQLObjectType({
    name: 'Genre',
    fields: {
        type: {type: new GraphQLNonNull(GraphQLString)},
        style: {type: GraphQLString},
    }
});

export const GenreInput = new GraphQLInputObjectType({
    name: 'GenreInput',
    fields: {
        type: {type: new GraphQLNonNull(GraphQLString)},
        style: {type: GraphQLString},
    }
});
