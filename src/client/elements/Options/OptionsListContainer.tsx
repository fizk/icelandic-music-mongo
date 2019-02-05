import * as React from 'react';

type Props = {
    width: number
}

class OptionsListContainer extends React.Component<Props> {
    static defaultProps = {
        width: 0,
    };

    render() {
        const style = {
            width: this.props.width,
            // position: 'absolute',
            zIndex: 1,
        };
        return (<div style={style} className="options-list__container">{this.props.children}</div>);
    }

}

export {OptionsListContainer};
