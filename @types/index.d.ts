import {Db} from "mongodb";

type ID = string;
type UUID = string;

export type GraphQlContext = {
    database: Db,
    search: any,
    event: any
}

/**
 * GraphQL types are the shapes that the GraphQL server
 * returns
 *
 */
declare namespace GraphQLTypes {

    export interface Unit {
        _id?: ID
        __typename?: string,
        updateTime?: string
        createTime?: string
        [key: string]: any
    }

    export interface PeriodType {
        from: string
        to: string | undefined | null
    }

    export interface PeriodInputType {
        from: string
        to: string
    }

    export interface GenreType {
        type: string
        style: string | undefined | null
    }

    export interface GenreInputType {
        type: string
        style: string | undefined | null
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
        type?: string
        subtype?: string
        attribute?: string | undefined | null
    }

    export interface ArtistRoleType {
        artist?: ArtistType
        roles?: string[]
    }

    export interface Publisher extends Unit {
        name: string
        description?: string
        contentType?: ContentType
        avatar?: ImageType | null
        hero?: ImageType | null
    }

    export interface PublicationType {
        [key: string]: any
        catalogNumber: string
        formats: string[]
        date: string
        publisher: Publisher
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

    export interface ArtistType extends Unit {
        contentType?: ContentType
        name: string
        description?: string
        genres?: GenreType[]
        aka?: string[]
        association?: PersonAssociationType[],  //Artist
        members?: GroupMemberType[],            //Group
        albums?: CollectionConnectionType[]
        compilations?: CollectionConnectionType[]
        eps?: CollectionConnectionType[]
        singles?: CollectionConnectionType[]
        period?: PeriodType                     //Artist
        periods?: PeriodType[]                  //Group
        avatar?: ImageType | null
        hero?: ImageType | null
    }

    export interface ItemType extends Unit {
        name: string
        contentType?: ContentType
        description?: string
        duration?: number
        genres?: GenreType[]
        instruments?: ArtistRoleType[]
        authors?: ArtistRoleType[]
        engineers?: ArtistRoleType[]
        appearsOn?: CollectionType[]
    }

    export interface CollectionType extends Unit {
        contentType?: ContentType
        genres?: GenreType[]
        name: string
        releaseDates?: string
        description?: string
        aka?: string[]
        from?: Date
        to?: Date
        songs?: {song: ItemType, position: number}[]
        publications?: PublicationType[]
    }
    
    export interface ArtistInputType {
        name: string
        aka?: string[]
        description?: string
        genres?: string[]
        periods?: PeriodInputType[]
    }
    
    export interface CollectionInput {
        name: string
        aka?: string[]
        description?: string
        releaseDates: string
        genres: GenreInputType[]
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



