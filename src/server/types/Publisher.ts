import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull} from "graphql";
import {Image as DBImage, PictureReference as DBPictureReference} from "../../../@types/database";
import Image from './Image';
import UnitInterface from "./Unit";
import Content from "./Content";
import {splitContentType} from "../utils/split";
import GraphQLDateTime from "./GraphQLDateTime";

export default new GraphQLObjectType({
    name: 'Publisher',
    description: 'publisher of a collection',
    interfaces: [UnitInterface],
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
            type: Content,
            resolve: (root) => splitContentType(root.__contentType)
        },
        avatar: {
            name: 'avatar',
            type: Image,
            resolve (root, _, {database}) {
                const imagesReference = root.__ref
                    .filter((item: any) => item.__contentType === 'image/avatar')
                    .reduce((a: any, b: DBPictureReference|undefined) => b, undefined);

                return imagesReference
                    ? database.collection('media')
                        .findOne({_id: imagesReference._id.oid})
                        .then((data: DBImage) => ({...data, dimensions: {height: data.height, width: data.width}}))
                    : null;
            }
        },
        hero: {
            name: 'hero',
            type: Image,
            resolve (root, _, {database}) {
                const imagesReference = root.__ref
                    .filter((item: any) => item.__contentType === 'image/hero')
                    .reduce((a: any, b: DBPictureReference|undefined) => b, undefined);

                return imagesReference
                    ? database.collection('media')
                        .findOne({_id: imagesReference._id.oid})
                        .then((data: DBImage) => ({...data, dimensions: {height: data.height, width: data.width}}))
                    : null;
            }
        },
    }
});
