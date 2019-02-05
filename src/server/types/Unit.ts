import {GraphQLID, GraphQLInterfaceType, GraphQLNonNull, GraphQLString} from "graphql";
import GraphQLDateTime from "./GraphQLDateTime";
import Content from "./Content";

export default new GraphQLInterfaceType({
    name: 'Entity',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        contentType: {
            type: Content,
        },
        createTime: {
            type: GraphQLDateTime,
        },
        updateTime: {
            type: GraphQLDateTime,
        },
    }
});
