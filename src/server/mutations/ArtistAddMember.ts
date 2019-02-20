import {GraphQLList, GraphQLID, GraphQLNonNull, GraphQLError} from 'graphql';
import {Artist} from '../types/Artist';
import {v4 as uuid} from 'uuid';
import {PeriodTypeInput} from "../types/Period";
import {GraphQlContext, GraphQLTypes} from "../../../@types";
import {ObjectID} from "bson";

interface Params {
    artist: string;
    member: string;
    periods: GraphQLTypes.PeriodInput[];
}

export default {
    type: Artist,
    args: {
        artist: {
            name: 'artist',
            type: new GraphQLNonNull(GraphQLID)
        },
        member: {
            name: 'member',
            type: new GraphQLNonNull(GraphQLID)
        },
        periods: {
            name: 'periods',
            type: new GraphQLList(PeriodTypeInput)
        }
    },
    resolve (root: null, {artist, member, periods = []}: any, {database, event}: GraphQlContext) {// eslint-disable-line @typescript-eslint/no-explicit-any
        return database.collection('artist').findOneAndUpdate(
            {_id: new ObjectID(artist)},
            { $push: {__ref: {
                __contentType: `artist/person+member`,
                _id: {
                    namespace: 'artist',
                    oid: new ObjectID(member),
                },
                __created: new Date(),
                __updated: new Date(),
                __uuid: uuid(),
                periods: periods
            }
            }
            },
            {returnOriginal: false}
        ).then(result => {
            if (result.ok) {
                event.emit('update', 'artist', result.value);
                return result.value
            }
            throw new GraphQLError(`Couldn't add Member(${member}) to Artist(${artist})`);
        });
    }
};
