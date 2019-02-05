import * as React from 'react';
import {StatelessComponent} from 'react';
import {Loading} from "../Icons";
import './index.scss';

const Component: StatelessComponent<{}> = ({children,}) => (
    <div className="section-loading">
        <Loading />
    </div>
);

export default Component;
