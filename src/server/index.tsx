import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import {MongoClient} from 'mongodb';
import React from 'react';
import ReactDOM from 'react-dom/server';
import fetch from 'isomorphic-fetch';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router';
import {InMemoryCache, IntrospectionFragmentMatcher} from "apollo-cache-inmemory";
import Application from "../client/components/App";
import introspectionQueryResultData from '../fragmentTypes';

const fragmentMatcher = new IntrospectionFragmentMatcher({introspectionQueryResultData});
const cache = new InMemoryCache({fragmentMatcher});

// Connection URL
const mongoUrl = 'mongodb://database:27017';
const port = 3000;

function Html({ content, state }: any) {
    return (
        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/app.css"/>
        </head>
        <body>
        <div data-react dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
        }} />
        <script src="/bundle.js" />
        </body>
        </html>
    );
}

MongoClient.connect(mongoUrl, { useNewUrlParser: true }).then(database => {
    console.log(`Connecting to MongoDB on ${mongoUrl}`);
    const app = express();
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        // rootValue: root,
        graphiql: true,
        context: {database: database.db('icelandic-music')}
    }));
    app.use(express.static('public')); //@todo serve from Apache or something
    app.use((request, response) => {
        const client = new ApolloClient({
            ssrMode: true,
            cache,
            // Remember that this is the interface the SSR server will use to connect to the
            // API server, so we need to ensure it isn't firewalled, etc
            link: createHttpLink({
                uri: 'http://localhost:3000/graphql',
                fetch: fetch,
                credentials: 'same-origin',
                headers: {
                    cookie: request.header('Cookie'),
                },
            }),

        });

        // The client-side App will instead use <BrowserRouter>
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

