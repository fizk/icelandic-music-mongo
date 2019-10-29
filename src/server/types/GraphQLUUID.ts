import {GraphQLScalarType} from "graphql";

const anyRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function anyNonNil(str: string): boolean {
    return anyRegex.test(str);
}

export const GraphQLUUID = new GraphQLScalarType({
    name: 'GraphQLUUID',
    description: `UUID scalar type`,
    serialize: (value): string | null => {
        return anyNonNil(value)
            ? value
            : null
    },
    parseValue: (value): string |  null=> {
        return anyNonNil(value) ? value : null;

    },
    parseLiteral: (ast): string => {
        return (ast as {value: string}).value;
    }
});
