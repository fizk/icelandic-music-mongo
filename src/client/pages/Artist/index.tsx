import * as React from 'react';
import {StatelessComponent, Fragment} from 'react';
import {Route} from 'react-router-dom';
import ArtistSection from '../../sections/ArtistSection';

const Artist: StatelessComponent = () => {
    return (
        <Fragment>
            <Route exact path="/listamenn" render={() => (<div>Collection of artists</div>)} />
            <Route exact path="/listamenn/:id" render={({match: {params}}) => (<ArtistSection edit={true} id={params.id} />)} />
        </Fragment>
    )
};

export default Artist;
