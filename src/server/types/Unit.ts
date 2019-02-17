import {GraphQLID, GraphQLInterfaceType, GraphQLNonNull, GraphQLString} from "graphql";
import {GraphQLDateTime} from "graphql-iso-date";
import {ContentType} from "./ContentType";

export const Unit = new GraphQLInterfaceType({
    name: 'Unit',
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
            type: ContentType,
        },
        createTime: {
            type: GraphQLDateTime,
        },
        updateTime: {
            type: GraphQLDateTime,
        },
    }
});
