import * as React from 'react';

class TabItem extends React.Component {

    render() {
        return (<div className="tab-item">{this.props.children}</div>);
    }
}

export {TabItem};
