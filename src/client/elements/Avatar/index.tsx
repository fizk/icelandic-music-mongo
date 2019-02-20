import * as React from 'react';
import {GraphQLTypes} from "../../../../@types";
import classVariations from "../../helpers/classVariations";
import './_index.scss';

interface Props {
    src: GraphQLTypes.ImageType;
    variations?: string[];
}

export default class extends React.Component<Props> {
    static defaultProps = {
        src: {
            url: undefined,
            base64: undefined,
        },
        variations: [],
    };

    imageElement: HTMLImageElement | null | undefined;

    constructor(props: Props) {
        super(props);
        this.loadImage = this.loadImage.bind(this);
    }

    loadImage (event: any) {
        event.target.classList.replace('avatar-image__image--hidden', 'avatar-image__image--visible')
    }

    componentWillReceiveProps(props: Props) {
        if ((props.src.url !== this.props.src.url) && this.imageElement) {
            this.imageElement.classList.replace('avatar-image__image--visible', 'avatar-image__image--hidden')
        }
    }

    render() {
        return (
            <div className={classVariations('avatar-image', this.props.variations)}>
                {this.props.src.url && (
                    <img ref={element => this.imageElement = element}
                        onLoad={this.loadImage}
                        className="avatar-image__image avatar-image__image--hidden"
                        src={`/images/unsafe/120x120/${this.props.src.url}`}
                    />
                )}
            </div>
        )
    }
}
