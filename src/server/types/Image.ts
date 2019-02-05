import {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType} from "graphql";
import Dimensions from './Dimensions';

export default new GraphQLObjectType({
    name: 'Image',
    description: 'Image with base64 pre-loader string',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        base64: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
        dimensions: {
            type: Dimensions
        }
    })
});
