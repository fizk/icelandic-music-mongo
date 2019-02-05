import * as React from 'react';
import classVariations from '../../helpers/classVariations';

type Props = {
    onSelect: () => void,
    index: number,
    variations?: string[],
}

class OptionsList extends React.Component<Props> {
    static defaultProps = {
        onSelect: () => {},
        index: undefined,
        variations: [],
    };

    render() {
        return (
            <div className={classVariations('options-list', this.props.variations)}>
                {/*{React.Children.map(this.props.children, (element, i) => {*/}
                    {/*return React.cloneElement(*/}
                        {/*element,*/}
                        {/*{*/}
                            {/*onSelect: this.props.onSelect,*/}
                            {/*isSelected: i === this.props.index,*/}
                        {/*}*/}
                    {/*);*/}
                {/*})}*/}
            </div>
        );
    }
}

export {OptionsList};
