import * as React from 'react';
import classVariations from '../../helpers/classVariations';

type Props = {
    onSelect?: () => void
    active?: boolean
}

class Tab extends React.Component<Props> {
    render() {
        return (
            <div className={classVariations('tab', this.props.active ? ['active'] : [])} onClick={this.props.onSelect}>
                {this.props.children}
            </div>);
    }
}

export {Tab};
