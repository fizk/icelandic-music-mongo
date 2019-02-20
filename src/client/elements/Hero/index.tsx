import * as React from 'react';
import {GraphQLTypes} from "../../../../@types";
import classVariations from "../../helpers/classVariations";
import './_index.scss';
import {SyntheticEvent} from "react";

interface Props {
    src: string;
    base64: string;
    width?: string | number;
    height?: string | number;
}

export class Hero extends React.Component<Props> {
    img: any;

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


interface HeroProps {
    src: GraphQLTypes.Image;
    variations?: string[];
}

export default class extends React.Component<HeroProps> {
    static defaultProps = {
        src: {
            url: undefined,
            base64: undefined,
        },
        variations: [],
    };

    imageElement: HTMLImageElement | null | undefined;

    constructor(props: HeroProps) {
        super(props);
        this.loadImage = this.loadImage.bind(this);
    }

    loadImage (event: any) {
        event.target.classList.replace('hero-image__image--hidden', 'hero-image__image--visible')
    }

    componentWillReceiveProps(props: HeroProps) {
        if ((props.src.url !== this.props.src.url) && this.imageElement) {
            this.imageElement.classList.replace('hero-image__image--visible', 'hero-image__image--hidden')
        }
    }

    render() {
        return (
            <div className="hero-image">
                {this.props.src.url && (
                    <img height={274}
                        width={1024}
                        ref={element => this.imageElement = element}
                        onLoad={this.loadImage}
                        className="hero-image__image hero-image__image--hidden"
                        src={`/images/unsafe/1024x274/${this.props.src.url}`}
                    />
                )}
            </div>
        )
    }
}

// export default class extends React.Component<HeroProps> {
//     ironImageHd: HTMLDivElement|undefined|null;
//
//     static defaultProps = {
//         src: {
//             url: undefined,
//             base64: undefined,
//         },
//         variations: [],
//     };
//
//     componentWillReceiveProps(props: HeroProps) {
//
//         // const hdLoaderImg = new Image();
//         //
//         // hdLoaderImg.src = props.src.url!;
//         //
//         // hdLoaderImg.addEventListener('load', () => {
//         //     this.ironImageHd!.setAttribute(
//         //         'style',
//         //         `background-image: url('${props.src.url}')`
//         //     );
//         //     this.ironImageHd!.classList.add('hero-image-fade-in');
//         // });
//     }
//
//     componentDidMount() {
//         const hdLoaderImg = new Image();
//
//         // hdLoaderImg.src = this.props.src.url!;
//         //
//         // hdLoaderImg.addEventListener('load', () => {
//         //     this.ironImageHd!.setAttribute(
//         //         'style',
//         //         `background-image: url('${this.props.src.url}')`
//         //     );
//         //     this.ironImageHd!.classList.add('hero-image-fade-in');
//         // });
//     };
//
//     render() {
//         return (
//             <div className={classVariations('hero-image-container', this.props.variations)}>
//                 <div className="hero-image-loaded"
//                     ref={imageLoadedElem => this.ironImageHd = imageLoadedElem}>
//                 </div>
//                 <div className="hero-image-preload" />
//                 {/*<div className="hero-image-preload"*/}
//                     {/*style={{ backgroundImage: `url('${this.props.src.base64}')` }}>*/}
//                 {/*</div>*/}
//             </div>
//         )
//     }
// }
