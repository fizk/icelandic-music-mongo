import {GraphQLTypes} from '../../../@types';

export const splitContentType = (contentType: string): {
    type?: string | null | undefined;
    subtype?: string | null | undefined;
    attribute?: string | null | undefined;
} => {
    // tslint:disable-next-line
    const [, type, , subtype, , attr] = (contentType || '')
        .match(/^([a-z]*)(\/([a-z]*))?(\+([a-z]*))?$/) ||
        [undefined, undefined, undefined, undefined, undefined, undefined];
    return {
        type: type,
        subtype: subtype,
        attribute: attr
    }
};

export const splitGenre = (genre: string): GraphQLTypes.GenreType => {
    const genreArray = genre.split('/');
    return {
        type: genreArray[0],
        style: genreArray[1],
    }
};
