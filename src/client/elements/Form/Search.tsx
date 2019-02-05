import * as React from 'react';
import classVariations from '../../helpers/classVariations';

type Props = {
    variations: string[],
    onClear: (event: any) => void,
    onChange: (event: any) => void,
    isError?: boolean,
    isSearching?: boolean,
    placeholder?: string
    value?: any
}

class Search extends React.Component<Props> {

    static defaultProps = {
        variations: [],
        onClear: () => {},
        onChange: () => {},
        isError: false,
        isSearching: false,
    };

    constructor(props: Props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.trim() === '') {
            this.props.onClear(event);
            return;
        }
        this.props.onChange(event);
    }

    render() {
        let props = {...this.props, };
        let variations = this.props.variations.concat(this.props.isError ? ['search', 'error'] : ['search']);
        delete props.variations;
        delete props.onClear;
        delete props.isError;
        delete props.isSearching;

        return (
            <input {...props}
                type="search"
                onChange={this.handleChange}
                className={classVariations('input', variations)} />
        );
    }
}

export {Search};

