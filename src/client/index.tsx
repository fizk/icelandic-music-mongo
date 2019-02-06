import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes';

const fragmentMatcher = new IntrospectionFragmentMatcher({introspectionQueryResultData});
const client = new ApolloClient({
    cache: new InMemoryCache({fragmentMatcher}),
    link: new HttpLink({uri: '/graphql'})
});

console.log('hey gaman');

ReactDOM.hydrate(
    <ApolloProvider client={client}>
        <Router>
            <App/>
        </Router>
    </ApolloProvider>,
    document.querySelector('[data-react]')
);
