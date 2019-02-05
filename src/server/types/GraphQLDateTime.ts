import {GraphQLScalarType} from "graphql";

export default new GraphQLScalarType({
    name: 'GraphQLDateTime',
    serialize: value => {
        return new Date(value).toString() === 'Invalid Date' ? null : new Date(value).toISOString();
    },
    parseValue: value => {
        return new Date(value).toString() === 'Invalid Date' ? null : new Date(value) ;
    },
    parseLiteral: ast => {
        return (ast as any).value;
    }
});
