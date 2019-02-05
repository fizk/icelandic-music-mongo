export const splitContentType = (contentType: string) => {
    // tslint:disable-next-line
    const [a, type, b, subtype, c, attr] = (contentType || '')
        .match(/^([a-z]*)(\/([a-z]*))?(\+([a-z]*))?$/) ||
        [undefined, undefined, undefined, undefined, undefined, undefined];
    return {
        type: type,
        subtype: subtype,
        attribute: attr
    }
};

export const splitGenre = (genre: string) => {
    const genreArray = genre.split('/');
    return {
        type: genreArray[0],
        style: genreArray[1],
    }
};
