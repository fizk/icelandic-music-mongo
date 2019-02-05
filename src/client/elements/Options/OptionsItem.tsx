import * as React from 'react';
import classVariations from '../../helpers/classVariations';

type Props = {
    onSelect: (value: any) => void,
    value: any,
    isSelected: boolean,
    variations: string[],
}

class OptionsItem extends React.Component<Props> {

    static defaultProps = {
        onSelect: () => {},
        value: undefined,
        isSelected: false,
        variations: [],
    };

    render() {
        const variations = this.props.isSelected
            ? this.props.variations.concat(['active'])
            : this.props.variations;

        return (
            <div className={classVariations('options-list__item', variations)}
                onClick={() => this.props.onSelect(this.props.value)}>
                {this.props.children}
            </div>
        );
    }
}

export {OptionsItem};
