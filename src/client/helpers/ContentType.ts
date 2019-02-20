interface ContentTypeObject {
    type?: string | null | undefined;
    subtype?: string | null | undefined;
    attribute?: string | null | undefined;
}
export default class ContentType {
    private type: string | null | undefined;
    private subtype: string | null | undefined;
    private attribute: string | null | undefined;

    public constructor(type: string | null | undefined, subtype: string | null | undefined, attribute: string | null | undefined) {
        this.type = type;
        this.subtype = subtype;
        this.attribute = attribute;
    }

    public static fromString(contentType: string): ContentType {
        const [, type, subtype, ] = (contentType || '').match(/(.*)\/(.*)/) || [undefined, undefined, undefined];
        return new ContentType(type, subtype, undefined);
    }

    public toObject(): ContentTypeObject {
        return {
            type: this.type,
            subtype: this.subtype,
            attribute: this.attribute,
        };
    }

    public toString(): string {
        return this.attribute
            ? `${this.type}/${this.subtype}+${this.attribute}`
            : `${this.type}/${this.subtype}`;
    }
}

export const contentTypeToString = ({type, subtype, attribute}: ContentTypeObject): string => {
    return attribute
        ? `${type}/${subtype}+${attribute}`
        : `${type}/${subtype}`;
};
