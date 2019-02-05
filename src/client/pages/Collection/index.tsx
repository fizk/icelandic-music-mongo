import * as React from 'react';
import {StatelessComponent, Fragment} from 'react';
import {Route} from 'react-router-dom';
import CollectionSection from '../../sections/CollectionSection';

const Collection: StatelessComponent<{}> = () => (
    <Fragment>
        <Route exact path="/verk" render={() => (<div>Collection of artists</div>)} />
        <Route exact path="/verk/:id" render={({match: {params}}) => (<CollectionSection id={params.id} />)} />
    </Fragment>
);

export default Collection;
