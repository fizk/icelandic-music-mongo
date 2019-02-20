import * as React from 'react';
import {Time} from "../Time";

interface Props {
    from: string;
    to: string;
}

export default class PeriodYear extends React.Component<Props> {
    static defaultProps = {
        from: undefined,
        to: undefined,
    };

    render() {
        return (
            <div>
                <Time>{this.props.from ? new Date(this.props.from).getFullYear() : undefined}</Time>
                <Time> - {this.props.to ? new Date(this.props.to).getFullYear() : undefined}</Time>
            </div>
        );
    }
}
