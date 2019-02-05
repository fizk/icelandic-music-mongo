import {GraphQLList, GraphQLID, GraphQLNonNull} from 'graphql';
import {GroupMember} from '../types/Group';
// import {v4 as uuid} from 'uuid';
import {PeriodTypeInput} from "../types/Period";

export default {
    type: GroupMember,
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
    // resolve (root, {artist, member, periods = []}, {database}) {
    //     return database.doc(`/artists/${artist}`).get()
    //         .then((snapshot: QueryDocumentSnapshot) => {
    //             const data = snapshot.data();
    //             const reference: D.ReferenceUnit = {
    //                 __contentType: 'artist/person+member',
    //                 _id: database.doc(`artists/${member}`),
    //                 __created: new Date(),
    //                 __uuid: uuid(),
    //                 periods: periods.map(item => ({
    //                     from: new Date(item.from),
    //                     to: new Date(item.to)
    //                 }))
    //             };
    //             return snapshot.ref.update('__ref', [...data.__ref, reference]).then(() => reference)
    //         });
    //
    // }
};
