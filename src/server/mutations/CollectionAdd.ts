import {GraphQLNonNull} from 'graphql';
import Collection, {CollectionInput, CollectionType} from '../types/Collection';
import {transformSnapshot} from "../utils/transform";
import {GraphQlContext} from '../../../@types'
import {CollectionReference} from "../../../@types/database";

export default {
    type: Collection,
    args: {
        values: {
            type: new GraphQLNonNull(CollectionInput),
        },
        type: {
            name: 'type',
            type: new GraphQLNonNull(CollectionType)
        },
    },

    resolve (root: any, {values, type}: any, {database,}: GraphQlContext) {
        return database.collection('collection').insertOne({
            __contentType: `collection/${type}`,
            name: values.name,
            releaseDates: new Date(),
            description: new Date(),
            genres: [],
            aka: [],
            __ref: [],
        }).then((result: any) => {
            console.log(result, 'hey');

            return result.ops[0];
        })
        // const data: D.CollectionType = Object.assign({
        //     __contentType: `collection/${type}`,
        //     __ref: [],
        //     aka: [],
        //     description: null,
        //     genres: [],
        //     releaseDates: null
        // }, values);
        //
        // return database.collection('collections').add(data)
        //     .then(doc => doc.get())
        //     .then(transformSnapshot);
    }
};
