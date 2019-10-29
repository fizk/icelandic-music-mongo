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
        __typename: string,
        updateTime?: string
        createTime?: string
        [key: string]: any
    }

    export interface Period {
        from: string
        to: string | null | undefined
    }

    export interface Genre {
        type: string
        style: string | null | undefined
    }

    export interface Image {
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
        attribute?: string | null | undefined
    }

    export interface ArtistRole {
        artist?: Artist
        roles?: string[]
    }

    export interface Publication {
        catalogNumber: string
        formats: string[]
        date: string
        publisher: Publisher
    }

    export interface PersonAssociation {
        periods: Period[]
        uuid: UUID
        group: Artist
    }

    export interface GroupMember {
        periods: Period[]
        uuid: UUID
        artist: Artist
    }

    export interface CollectionConnection {
        uuid: string
        collection: Collection
    }

    export interface ItemConnection {
        uuid: string
        position: string
        song: Item
    }

    export interface Artist extends Unit {
        contentType?: ContentType
        name: string
        description?: string
        genres?: Genre[]
        aka?: string[]
        association?: PersonAssociation[],  //Artist
        members?: GroupMember[],            //Group
        albums?: CollectionConnection[]
        compilations?: CollectionConnection[]
        eps?: CollectionConnection[]
        singles?: CollectionConnection[]
        period?: Period                     //Artist
        periods?: Period[]                  //Group
        avatar?: Image | null | undefined
        hero?: Image | null | undefined
    }

    export interface Item extends Unit {
        name: string
        contentType?: ContentType
        description?: string
        duration?: number
        genres?: Genre[]
        instruments?: ArtistRole[]
        authors?: ArtistRole[]
        engineers?: ArtistRole[]
        appearsOn?: Collection[]
    }

    export interface Collection extends Unit {
        contentType?: ContentType
        genres?: Genre[]
        name: string
        releaseDates?: string
        description?: string
        aka?: string[]
        songs?: {song: Item, position: number}[]
        publications?: Publication[]
    }

    export interface Publisher extends Unit {
        name: string
        description?: string
        contentType?: ContentType
        avatar?: Image | null | undefined
        hero?: Image | null | undefined
    }
    
    export interface ArtistInput {
        name: string
        aka?: string[]
        description?: string
        genres?: string[]
        periods?: PeriodInput[]
    }
    
    export interface CollectionInput {
        name: string
        aka?: string[]
        description?: string
        releaseDates: string
        genres: GenreInput[]
    }

    export interface PeriodInput {
        from: string
        to: string | null | undefined
    }

    export interface GenreInput {
        type: string
        style: string | null | undefined
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



