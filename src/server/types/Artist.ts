import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLUnionType,
    GraphQLEnumType
} from "graphql";
import {PeriodTypeInput} from './Period';
import Group from "./Group";
import Person from "./Person";

export default new GraphQLUnionType({
    name: 'Artist',
    types: [Person, Group],
    resolveType: data => data.__contentType === 'artist/person' ? Person : Group,
});

export const ArtistInput = new GraphQLInputObjectType({
    name: 'ArtistInput',
    fields: {
        name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
        },
        aka: {
            name: 'aka',
            type: new GraphQLList(GraphQLString),
        },
        description: {
            name: 'description',
            type: GraphQLString,
        },
        genres: {
            name: 'genre',
            type: new GraphQLList(GraphQLString),
        },
        periods: {
            name: 'periods',
            type: new GraphQLList(PeriodTypeInput)
        }
    },
});

export const ArtistType = new GraphQLEnumType({
    name: 'ArtistType',
    values: {
        person: {value: 'person'},
        group: {value: 'group'},
    }
});
