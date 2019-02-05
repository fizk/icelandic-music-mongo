import {GraphQLScalarType} from "graphql";

export default new GraphQLScalarType({
    name: 'GraphQLDate',
    serialize: value => {
        return new Date(value).toString() === 'Invalid Date' ? null : new Date(value).toISOString().split('T')[0] ;
    },
    parseValue: value => {
        return new Date(value).toString() === 'Invalid Date' ? null : new Date(value) ;
    },
    parseLiteral: ast => {
        return (ast as any).value;
    }
});
