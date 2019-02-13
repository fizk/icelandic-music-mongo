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
import  {withClientState} from 'apollo-link-state';
import {ApolloLink} from 'apollo-link';
import {mutations, defaults} from '../state'

const fragmentMatcher = new IntrospectionFragmentMatcher({introspectionQueryResultData});
const cache = new InMemoryCache({fragmentMatcher});
const stateLink = withClientState({
    cache,
    resolvers: {Mutation: mutations,},
    defaults: defaults,
});
const client = new ApolloClient({
    cache: cache,
    link: ApolloLink.from([stateLink, new HttpLink({uri: '/graphql'})]),
});

ReactDOM.hydrate(
    <ApolloProvider client={client}>
        <Router>
            <App/>
        </Router>
    </ApolloProvider>,
    document.querySelector('[data-react]')
);
