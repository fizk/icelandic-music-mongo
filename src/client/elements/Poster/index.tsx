import * as React from 'react';
import {GraphQLTypes} from "../../../../@types";
import classVariations from '../../helpers/classVariations';
import './_index.scss';

type Props = {
    src: GraphQLTypes.ImageType
    variations?: string[]
}

export default class extends React.Component<Props> {

    static defaultProps = {
        src: {
            url: undefined,
            base64: undefined,
        },
        variations: [],
    };

    ironImageHd: HTMLDivElement|undefined|null = null;

    componentWillReceiveProps(props: Props) {
        const hdLoaderImg = new Image();
        hdLoaderImg.src = props.src.url!;
        hdLoaderImg.addEventListener('load', () => {
            this.ironImageHd!.setAttribute(
                'style',
                `background-image: url('${props.src.url}')`
            );
            this.ironImageHd!.classList.add('poster-image-fade-in');
        });
    }

    componentDidMount() {
        const hdLoaderImg = new Image();
        hdLoaderImg.src = this.props.src.url!;
        hdLoaderImg.addEventListener('load', () => {
            this.ironImageHd!.setAttribute(
                'style',
                `background-image: url('${this.props.src.url}')`
            );
            this.ironImageHd!.classList.add('poster-image-fade-in');
        });
    };

    render() {
        return (
            <div className={classVariations('poster-image-container', this.props.variations)}>
                <div
                    className="poster-image-loaded"
                    ref={imageLoadedElem => this.ironImageHd = imageLoadedElem}>
                </div>
                <div
                    className="poster-image-preload"
                    style={{ backgroundImage: `url('${this.props.src.base64}')` }}>
                </div>
            </div>
        )
    }
}


