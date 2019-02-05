import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classVariations from '../../helpers/classVariations';
import './_auto-complete.scss'
import {SyntheticEvent} from "react";

const mod = (n: number, m: number) => {
    return ((n % m) + m) % m;
};

type Props = {
    onType: (term: string) => void
    onSelect: (value: any) => void
    onClear: () => void
    loading?: boolean
    children: Array<any>
}

type State = {
    index: number
    counter: number
    value: string
}

export default class AutoComplete extends React.Component<Props, State> {
    static defaultProps = {
        onType: () => {},
        onSelect: () => {},
        onClear: () => {},
        loading: false
    };

    state = {
        index: 0,
        counter: 0,
        value: ''
    };

    mounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.mounted = true;

        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleInput = this.handleInput.bind(this);

        this.handleInitialState(props)
    }

    componentWillReceiveProps(props: Props) {
        this.handleInitialState(props)
    }

    handleInitialState = (props: Props) => {
        // if (React.Children.toArray(props.children).length > 0) {
        //     document && document.addEventListener('click', this.handleDocumentClick, false);
        //     document && document.addEventListener('touchend', this.handleDocumentClick, false);
        //     document && document.addEventListener('keyup', this.handleKeyUp, false);
        // } else {
        //     document && document.removeEventListener('click', this.handleDocumentClick, false);
        //     document && document.removeEventListener('touchend', this.handleDocumentClick, false);
        //     document && document.removeEventListener('keyup', this.handleKeyUp, false);
        // }
    };

    componentWillUnmount () {
        this.mounted = false;
        // document && document.removeEventListener('click', this.handleDocumentClick, false);
        // document && document.removeEventListener('touchend', this.handleDocumentClick, false);
    }

    handleDocumentClick (event: React.ChangeEvent<HTMLBodyElement>) { //@todo this is not a change-input event
        if (this.mounted) {
            if (!ReactDOM.findDOMNode(this)!.contains(event.target)) {
                this.props.onClear();
                this.setState({
                    counter: 0,
                    index: 0,
                    value: '',
                });
            }
        }
    }

    handleInput(event: SyntheticEvent<HTMLInputElement>) {
        this.setState({
            value: (event.target as HTMLInputElement).value
        });
        this.props.onType((event.target as HTMLInputElement).value);
    }

    handleKeyUp (event: SyntheticEvent<HTMLInputElement> & {code: string}) { //@todo fix this & stuff
        const currentCounter = this.state.counter;
        if (this.mounted) {
            switch (event.code) {
                case 'ArrowDown':
                    event.preventDefault();
                    this.setState({
                        index: ( mod(currentCounter + 1, React.Children.count(this.props.children) )),
                        counter: currentCounter + 1
                    });
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.setState({
                        counter: currentCounter - 1,
                        index: ( mod(currentCounter - 1, React.Children.count(this.props.children)) ),
                    });
                    break;
                case 'Escape':
                    this.props.onClear();
                    this.setState({
                        counter: 0,
                        index: 0,
                        value: '',
                    });
                    break;
                case 'Enter':
                    this.props.onSelect(this.props.children[this.state.index].props.value);
                    this.setState({
                        counter: 0,
                        index: 0,
                        value: '',
                    });
                    break;
            }
        }
    }

    render() {
        return (
            <div className={classVariations('auto-complete', this.props.loading ? ['loading'] : [])}>
                <input className="auto-complete__input"
                       onChange={this.handleInput}
                       value={this.state.value}/>
                {React.Children.count(this.props.children) > 0 && (
                    <div className="auto-complete__drop-down">
                        {React.Children.map(this.props.children, (child: any, i: number) => {
                            return child && React.cloneElement(child, {
                                onSelect: this.props.onSelect,
                                active: i === this.state.index,
                            });
                        })}
                    </div>
                )}
            </div>
        )
    }
}
