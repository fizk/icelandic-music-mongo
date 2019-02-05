import * as React from 'react';
import {GraphQLTypes} from "../../../../@types";
import classVariations from "../../helpers/classVariations";
import './_index.scss';

type Props = {
    src: string,
    base64: string,
    width?: string | number
    height?: string | number
}

export class Hero extends React.Component<Props> {
    img : any;

    static defaultProps = {
        src: undefined,
        base64: undefined,
    };

    constructor(props: Props) {
        super(props);

        this.img = undefined;

        const imageObject = new Image();
        imageObject.addEventListener('load', (event) => {
            this.img.style.backgroundImage = `url(${props.src})`;
            this.img.classList.add('hero__container--fade-in');
        });
        imageObject.src = props.src;
    }

    componentWillReceiveProps(props: Props) {
        if (props.src === undefined) {
            this.img.style.backgroundImage = 'none';
        } else if (props.src !== this.props.src) {
            const imageObject = new Image();
            imageObject.addEventListener('load', (event) => {
                this.img.style.backgroundImage = `url(${props.src})`;
                this.img.classList.add('hero__container--fade-in');
            });
            imageObject.src = props.src;
        }
    }

    render() {
        const containerStyle = {
            backgroundImage: `url(${this.props.base64})`,
        };
        return (
            <div className="hero" style={containerStyle}>
                <div className="hero__container" ref={item => this.img = item}/>
            </div>
        );
    }
}


type HeroProps = {
    src: GraphQLTypes.ImageType
    variations?: string[]
}

export default class extends React.Component<HeroProps> {
    ironImageHd: HTMLDivElement|undefined|null;

    static defaultProps = {
        src: {
            url: undefined,
            base64: undefined,
        },
        variations: [],
    };

    componentWillReceiveProps(props: HeroProps) {

        const hdLoaderImg = new Image();

        hdLoaderImg.src = props.src.url!;

        hdLoaderImg.addEventListener('load', () => {
            this.ironImageHd!.setAttribute(
                'style',
                `background-image: url('${props.src.url}')`
            );
            this.ironImageHd!.classList.add('hero-image-fade-in');
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
            this.ironImageHd!.classList.add('hero-image-fade-in');
        });
    };

    render() {
        return (
            <div className={classVariations('hero-image-container', this.props.variations)}>
                <div className="hero-image-loaded"
                    ref={imageLoadedElem => this.ironImageHd = imageLoadedElem}>
                </div>
                <div className="hero-image-preload"
                    style={{ backgroundImage: `url('${this.props.src.base64}')` }}>
                </div>
            </div>
        )
    }
}
