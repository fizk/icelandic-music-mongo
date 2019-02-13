import {ObjectID} from 'mongodb'
import {UUID} from "./index";

// ///////////////////  Abstract types  /////////////////////////////////////////////////////////////////////////////////

export interface ReferenceUnit {
    _id: {
        namespace: string;
        oid: ObjectID;
        db?: string;
    } | null
    __created?: Date
    __uuid: UUID
    __contentType: string
    [key: string]: any
}

export interface Unit {
    _id: ObjectID
    updateTime?: string
    createTime?: string
    __contentType: string
    __ref: ReferenceUnit[]
}


// ///////////////////  Concrete types  ////////////////////////////////////////////////////////////////////////////////

export interface Period {
    from: string,
    to?: string
}

// ////////////////////////////////////////////////////
//
// ARTIST
//
// ////////////////////////////////////////////////////

export interface ArtistReferenceCollection extends ReferenceUnit {
    __contentType: 'collection/album' | 'collection/album+single' | 'collection/album+ep' | 'collection/album+compilation'
}

export interface ArtistReferenceMember extends ReferenceUnit {
    __contentType: '﻿artist/person+member'
    periods: Period[]
}

type ArtistReference = ArtistReferenceCollection | ArtistReferenceMember | PictureReference

export interface Artist extends Unit {
    __contentType: 'artist/person' | 'artist/group' | 'artist/person+member'
    name: string
    description?: string
    genres?: string[]
    aka?: string[]
    from?: Date
    to?: Date
    __ref: ArtistReference[]
}

// ////////////////////////////////////////////////////
//
// COLLECTION
//
// ////////////////////////////////////////////////////

export interface CollectionReferencePublication extends ReferenceUnit {
    __contentType: 'publisher/publication'
    catalogNumber: string
    formats: string[]
    date: string
}

export interface CollectionReferenceSong extends ReferenceUnit {
    __contentType: 'item/song'
    position: number
}

type CollectionReference = PictureReference | CollectionReferenceSong | CollectionReferencePublication

export interface Collection extends Unit {
    __contentType: 'collection/album' | 'collection/album+single' | 'collection/album+ep' | 'collection/album+compilation'
    name: string
    releaseDates?: Date
    description?: string
    genres?: string[]
    aka?: string[]
    __ref: CollectionReference[]
}

// ////////////////////////////////////////////////////
//
// ITEM
//
// ////////////////////////////////////////////////////

export interface ItemReferenceParticipant extends ReferenceUnit {
    __contentType: 'participant/instrument' | 'participant/author' | 'participant/recording'
    roles: string[]
}

type ItemReference = PictureReference | ItemReferenceParticipant

export interface Item extends Unit {
    __contentType: 'item/song'
    name: string
    description?: string
    duration?: number
    genres?: string[]
    __ref: ItemReference[]
}

// ////////////////////////////////////////////////////
//
// MEDIA
//
// ////////////////////////////////////////////////////

export interface PictureReference extends ReferenceUnit{
    __contentType: '﻿image/avatar' | '﻿image/hero'
}

export interface Image extends Unit {
    __contentType: 'image/avatar' | 'image/hero'
    width?: number
    height?: number
    url?: string
    base64?: string
    name?: string
}


// ////////////////////////////////////////////////////
//
// PUBLISHER
//
// ////////////////////////////////////////////////////
export interface Publisher extends Unit {
    __contentType: 'publisher/publisher'
    name: string
    description: string
}
