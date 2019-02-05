import {GraphQLObjectType, GraphQLInputObjectType} from "graphql";
import GraphQLDate from './GraphQLDate';

export default new GraphQLObjectType({
    name: 'Period',
    description: 'Range between two dates',
    fields: {
        from: {type: GraphQLDate},
        to: {type: GraphQLDate},
    }
});

export const PeriodTypeInput = new GraphQLInputObjectType({
    name: 'PeriodInput',
    description: 'PeriodTypeInput',
    fields: {
        from: {type: GraphQLDate},
        to: {type: GraphQLDate},
    }
});
