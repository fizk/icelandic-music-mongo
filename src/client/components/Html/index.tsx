import React from 'react';

export default ({ content, state }: any) => {
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
