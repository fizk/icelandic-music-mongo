import * as React from 'react';
import classVariations from '../../helpers/classVariations';

type Props = {
    variations?: string[]
    index?: number
}

class TabContent extends React.Component<Props> {
    static defaultProps = {
        variations: [],
    };

    render() {
        return (
            <div className={classVariations('tab-content', this.props.variations)}>
                {React.Children.count(this.props.children) &&
                React.Children.toArray(this.props.children)[this.props.index || 0]}
            </div>
        );
    }
}

export {TabContent};
