import {GraphQLScalarType} from "graphql";
import {ValueNode} from "graphql/language/ast";

export default new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'Description of my custom scalar type',
    serialize(value): string | null {
        return new Date(value).toString() === 'Invalid Date' ? null : new Date(value).toISOString().split('T')[0];
    },
    parseValue(value): Date | null {
        return new Date(value).toString() === 'Invalid Date' ? null : new Date(value);
    },
    parseLiteral(valueNode: ValueNode): string {
        return valueNode.kind;
    }
});
