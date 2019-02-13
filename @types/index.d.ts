import {Db} from "mongodb";

type ID = string;
type UUID = string;

export type GraphQlContext = {
    database: Db,
    search: any
}

/**
 * GraphQL types are the shapes that the GraphQL server
 * returns
 *
 */
declare namespace GraphQLTypes {

    export interface UnitType {
        _id?: ID
        __typename?: string,
        updateTime?: string
        createTime?: string
        [key: string]: any
    }

    export interface PeriodType {
        from: string
        to: string
    }

    export interface GenreType {
        type: string
        style: string
    }

    export interface ImageType {
        _id?: ID
        name?: string
        width?: number
        height?: number
        base64?: string
        url?: string
    }

    export interface ContentType {
        type: string
        subtype: string
        attribute: string
    }

    export interface PublicationType {
        [key: string]: any
    }

    export interface PersonAssociationType {
        periods: PeriodType[]
        uuid: UUID
        group: ArtistType
    }

    export interface GroupMemberType {
        periods: PeriodType[]
        uuid: UUID
        artist: ArtistType
    }

    export interface CollectionConnectionType {
        uuid: string
        collection: CollectionType
    }

    export interface ArtistType extends UnitType{
        contentType?: ContentType
        __typename: string
        name: string
        description?: string
        genres?: GenreType[]
        aka?: string[]
        from?: Date
        to?: Date
        association?: PersonAssociationType[],
        members?: GroupMemberType[],
        albums?: CollectionConnectionType[]
        compilations?: CollectionConnectionType[]
        eps?: CollectionConnectionType[]
        singles?: CollectionConnectionType[]
        periods?: PeriodType[]
        avatar?: ImageType
        hero?: ImageType
    }

    export interface ItemType extends UnitType {
        name: string
        description?: string
        duration?: number
        genres?: string[]
        instruments?: ArtistType[]
        authors?: ArtistType[]
        engineers?: ArtistType[]
        appearsOn?: CollectionType
    }

    export interface CollectionType extends UnitType {
        __typename: string,
        contentType?: ContentType
        genres?: GenreType[]
        name: string
        releaseDates?: string
        description?: string
        aka?: string[]
        from?: Date
        to?: Date
        songs?: {song: ItemType, position: number}[]
    }
}
//
// declare global {
//     namespace jest {
//         // tslint:disable-next-line:interface-name
//         interface Matchers<R> {
//             toMatchShapeOf(expected: any): R
//         }
//     }
// }
