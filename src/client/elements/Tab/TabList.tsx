import * as React from 'react';

type Props = {
    index?: number
    onSelect?: (index: any) => void
}

class TabList extends React.Component<Props> {

    render() {
        return (<div className="tab-list">
            {/*{React.Children.map(this.props.children, (child, index) => {*/}
                {/*return React.cloneElement(child, {*/}
                    {/*index: this.props.index,*/}
                    {/*active: index === this.props.index,*/}
                    {/*onSelect: () => {this.props.onSelect(index)},*/}
                {/*});*/}
            {/*})}*/}
        </div>);
    }
}

export {TabList};
