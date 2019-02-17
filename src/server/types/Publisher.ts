import {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID} from "graphql";
import {GraphQLDateTime} from "graphql-iso-date";
import {Unit} from "./Unit";
import {splitContentType} from "../utils/split";
import {ContentType} from "./ContentType";
import {Image} from "./Image";
import {DataSource} from '../../../@types/database';
import {GraphQlContext} from '../../../@types';

export const Publisher = new GraphQLObjectType<DataSource.Publisher, GraphQlContext>({
    name: 'Publisher',
    description: 'publisher of a collection',
    interfaces: [Unit],
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            name: 'name',
            type: GraphQLString,
        },
        description: {
            name: 'description',
            type: GraphQLString,
        },
        createTime: {
            type: GraphQLDateTime,
        },
        updateTime: {
            type: GraphQLDateTime,
        },
        contentType: {
            name: 'contentType',
            type: ContentType,
            resolve: ({__contentType}) => splitContentType(__contentType)
        },
        avatar: {
            name: 'avatar',
            type: Image,
            resolve (root, _, {database}) {
                const imagesReference = root.__ref
                    .filter((item: any) => item.__contentType ===  "image/avatar")
                    .reduce((a: any, b: any) => b, undefined);

                return imagesReference
                    ? database.collection('media')
                        .findOne({_id: imagesReference._id.oid})
                    : null;
            }
        },
        hero: {
            name: 'hero',
            type: Image,
            resolve (root, _, {database}) {
                const imagesReference = root.__ref
                    .filter((item: any) => item.__contentType ===  "image/hero")
                    .reduce((a: any, b: any) => b, undefined);

                return imagesReference
                    ? database.collection('media')
                        .findOne({_id: imagesReference._id.oid})
                    : null;
            }
        },
    }
});
