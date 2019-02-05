import * as React from 'react';

type Props = {
    width: number,
    height: number,
    src: string,
    base64: string,
}

class Img extends React.Component<Props> {
    img: any;

    static defaultProps = {
        width: 0,
        height: 0,
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
            display: 'inline-block',
            backgroundImage: `url(${this.props.base64})`,
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
            borderRadius: '50%',

        };
        return (
            <span style={containerStyle}>
                <img height={this.props.height} width={this.props.width} ref={item => this.img = item}/>
            </span>
        );
    }
}

export {Img};
