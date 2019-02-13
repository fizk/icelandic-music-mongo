import {GraphQLError, GraphQLScalarType, Kind} from "graphql";

const anyRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function anyNonNil(str: string) {
    return anyRegex.test(str);
}

// export default new GraphQLScalarType({
//     name: 'GraphQLUUID',
//     description: `UUID scalar type`,
//     serialize: value => {
//         return anyNonNil(value)
//             ? value
//             : null
//     },
//     parseValue: value => {
//         if (anyNonNil(value)) {
//             return value;
//         }
//         throw new GraphQLError('')
//     },
//     parseLiteral: ast => {
//         if (ast.kind !== Kind.STRING) {
//             throw new GraphQLError(`Type should be "String", found ${ast.kind}.`);
//         }
//         if (anyNonNil(ast.value)) {
//             return ast.value;
//         }
//         throw new GraphQLError(`Invalid UUID literal.\n${ast.value} is not UUID.`);
//     }
// });


export default new GraphQLScalarType({
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
        return ast.kind
    }
});
