import {GraphQLInt, GraphQLObjectType} from "graphql";

export default new GraphQLObjectType({
    name: 'Dimensions',
    description: 'Width and height of an object',
    fields: {
        width: {type: GraphQLInt},
        height: {type: GraphQLInt},
    }
})
