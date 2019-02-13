import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import {MongoClient} from 'mongodb';
import React from 'react';
import ReactDOM from 'react-dom/server';
import fetch from 'isomorphic-fetch';
import {ApolloProvider, getDataFromTree} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {StaticRouter} from 'react-router';
import {InMemoryCache, IntrospectionFragmentMatcher} from "apollo-cache-inmemory";
import Application from "../client/components/App";
import Html from "../client/components/Html";
import introspectionQueryResultData from '../fragmentTypes';
import * as elasticsearch from 'elasticsearch';
import {withClientState} from "apollo-link-state";
import {ApolloLink} from "apollo-link";
import {defaults, mutations} from '../state'

// Connection URL
const mongoUrl = 'mongodb://database:27017';
const port = 3000;

const elasticSearchClient = new elasticsearch.Client({
    host: 'search:9200',
    log: 'trace'
});

const fragmentMatcher = new IntrospectionFragmentMatcher({introspectionQueryResultData});
const cache = new InMemoryCache({fragmentMatcher});
const stateLink = withClientState({
    cache,
    resolvers: {Mutation: mutations,},
    defaults: defaults,
});

MongoClient.connect(mongoUrl, { useNewUrlParser: true }).then(database => {
    console.log(`Connecting to MongoDB on ${mongoUrl}`);
    const app = express();
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        // rootValue: root,
        graphiql: true,
        context: {database: database.db('icelandic-music'), search: elasticSearchClient}
    }));
    app.use(express.static('public')); //@todo serve from Apache or something
    app.use((request, response) => {

        const httpLink = createHttpLink({
                uri: 'http://localhost:3000/graphql',
                fetch: fetch,
                credentials: 'same-origin',
                headers: {
                    cookie: request.header('Cookie'),
                },
            });

        const client = new ApolloClient({
            ssrMode: true,
            cache,
            link: ApolloLink.from([stateLink, httpLink]),

        });

        const App = (
            <ApolloProvider client={client}>
                <StaticRouter location={request.url} context={{}}>
                    <Application />
                </StaticRouter>
            </ApolloProvider>
        );

        // during request (see above)
        getDataFromTree(App).then(() => {
            // We are ready to render for real
            const content = ReactDOM.renderToString(App);
            const initialState = client.extract();

            const html = <Html content={content} state={initialState} />;

            response.status(200);
            response.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
            response.end();
        }).catch(console.error);


    });
    app.listen(port, () => console.log(`Running a GraphQL API server at localhost:${port}/graphql`));
});

