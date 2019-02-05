import * as React from 'react';
import {StatelessComponent, Fragment} from 'react';
import {Route} from 'react-router-dom';
import ItemSection from '../../sections/ItemSection';

const Item: StatelessComponent<{}> = () => (
    <Fragment>
        <Route exact path="/stak" render={() => (<div>Collection of songs etc...</div>)} />
        <Route exact path="/stak/:id" render={({match: {params}}) => (<ItemSection id={params.id} />)} />
    </Fragment>
);

export default Item;
