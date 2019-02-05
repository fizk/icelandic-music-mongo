import * as React from 'react';
import {Search} from '../Form';
import {OptionsListContainer} from './OptionsListContainer';
import {OptionsList} from './OptionsList';
import {SyntheticEvent} from "react";

type Props = {
    placeholder?: string
    onSelect: () => void,
    onFocus: () => void,
    onBlur: () => void,
    onChange: (value: any) => void,
    onClear: (event: any) => void,
    value: any,
    isSearching: boolean,
    elastic: boolean,
    index: number,
}

class Options extends React.Component<Props> {

    static defaultProps = {
        onSelect: () => {},
        onFocus: () => {},
        onBlur: () => {},
        onChange: () => {},
        onClear: () => {},
        value: undefined,
        isSearching: false,
        elastic: false,
    };

    inputElement: any;

    constructor(props: Props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnClear = this.handleOnClear.bind(this);
    }

    dimensions = {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    };

    componentWillUpdate() {
        // let node = ReactDOM.findDOMNode(this.inputElement);
        //
        // if (node) {
        //     const rect = node.getBoundingClientRect();
        //     const scrollX = 0;//parseInt(document.documentElement.scrollLeft);
        //     const scrollY = 0;//parseInt(document.documentElement.scrollTop);
        //
        //     this.dimensions = {
        //         height: rect.height,
        //         width: rect.width,
        //         top: (rect.top + scrollY),
        //         left: (rect.left + scrollX),
        //     };
        //
        // } else {
            this.dimensions = {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
            };
        // }
    }

    handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(event.target.value);
    }

    handleOnClear(event: React.ChangeEvent<HTMLInputElement>) {
        this.props.onClear(event);
    }

    render() {
        let variations = (React.Children.count(this.props.children) >= 1)
            ? ['md'].concat(['tail-element', ])
            : ['md'];

        variations = variations.concat(this.props.isSearching ? ['is-searching'] : []);
        variations = variations.concat(this.props.elastic ? ['elastic'] : []);

        const style = {
            // position: 'relative',
            width: this.props.elastic ? '100%' : 'auto',
        };

        return (
            <div style={style}>
                <Search
                    placeholder={this.props.placeholder || undefined}
                    variations={variations}
                    ref={element => this.inputElement = element}
                    value={this.props.value}
                    onClear={this.handleOnClear}
                    onChange={this.handleOnChange}/>
                {(React.Children.count(this.props.children) > 0) &&
                <OptionsListContainer width={this.dimensions.width}>
                    <OptionsList onSelect={this.props.onSelect} index={this.props.index}>
                        {this.props.children}
                    </OptionsList>
                </OptionsListContainer>
                }
            </div>
        );
    }
}

export {Options};
