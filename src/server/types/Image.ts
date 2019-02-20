import {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType} from "graphql";
import {DataSource} from '../../../@types/database'

export const Image = new GraphQLObjectType<DataSource.Image>({
    name: 'Image',
    description: 'Image with base64 pre-loader string',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID),
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
    })
});
