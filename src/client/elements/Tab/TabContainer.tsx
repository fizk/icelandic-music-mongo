import * as React from 'react';
import classVariations from '../../helpers/classVariations';

interface Props {
    variations: string[];
}

interface State {
    index: number;
}

class TabContainer extends React.Component<Props, State> {

    static defaultProps = {
        variations: [],
    };

    constructor(props: Props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
        };
    }

    handleSelect(index: number) {
        this.setState({index: index, });
    }

    render() {
        return (<div className={classVariations('tab-container', this.props.variations)}>
            {/*{React.Children.map(this.props.children, child => {*/}
            {/*return React.cloneElement(child, {*/}
            {/*index: this.state.index,*/}
            {/*onSelect: this.handleSelect,*/}
            {/*});*/}
            {/*})}*/}
        </div>);

    }
}

export {TabContainer};
