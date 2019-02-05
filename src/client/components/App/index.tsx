import * as React from 'react';
import {StatelessComponent} from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Index from "../../pages/Index";
import Collection from "../../pages/Collection";
import Item from "../../pages/Item";
import Artist from '../../pages/Artist';
import {Chrome} from "../Chrome";
import './_index.scss';

const App: StatelessComponent<{}> = () => (
    <Chrome>
        <Route exact={true} path="/" component={Index} />
        <Route path="/listamenn" component={Artist} />
        <Route path="/verk" component={Collection} />
        <Route path="/stak" component={Item} />
    </Chrome>
);

export default App;


/*
const App: StatelessComponent<{}> = () => (
    <Router>
        <Chrome>
            <Route exact={true} path="/" component={Index} />
            <Route path="/listamenn" component={ArtistType} />
            <Route path="/verk" component={CollectionType} />
            <Route path="/stak" component={Item} />
        </Chrome>
    </Router>
);
 */
