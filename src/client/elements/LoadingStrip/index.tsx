import * as React from 'react';
import classVariations from '../../helpers/classVariations';
import './_index.scss';

type Props = {
    loading: boolean,
}

export default class LoadingStrip extends React.Component<Props> {
    static defaultProps = {
        loading: false,
    };

    render() {
        const classNames = classVariations('loading-strip', this.props.loading ? ['loading'] : []);
        return (
            <div className={classNames} />
        );
    }
}
