import {GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLList} from "graphql";
import GraphQLDate from './GraphQLDate';
import Publisher from './Publisher';
import {Unit as DBUnit} from "../../../@types/database";
import {transformSnapshot} from "../utils/transform";

export default new GraphQLObjectType({
    name: 'Publication',
    fields: {
        catalogNumber: {
            name: 'catalogNumber',
            type: GraphQLString
        },
        formats: {
            name: 'formats',
            type: new GraphQLList(GraphQLString),
        },
        date: {
            name: 'date',
            type: GraphQLDate,
        },
        publishers: {
            name: 'publishers',
            type: new GraphQLList(Publisher),
            resolve(root) {
                return [];
                // const referenceUnits: Promise<DocumentSnapshot>[] = root.__ref
                //     .filter((item: D.ReferenceUnit) => item.__contentType === 'publisher/publication')
                //     .map(item => item._id.get());
                //
                // return Promise.all(referenceUnits).then((items: DocumentSnapshot[]) => {
                //     return items.map(transformSnapshot)
                // });
            }
        },
    }
});

export const ContentTypeInput = new GraphQLInputObjectType({
    name: 'PublicationInput',
    description: 'ContentTypeInput',
    fields: {
        type: {type: GraphQLString},
        subtype: {type: GraphQLString},
        attribute: {type: GraphQLString},
    }
});
