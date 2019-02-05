import * as React from 'react';
import './_index.scss';

const Block = ({children}: any) => { //@todo fix any
    return (
        <div className="block">{children}</div>
    );
};

const Static = ({children}: any) => { //@todo fix any
    return (
        <div className="block__static">{children}</div>
    );
};

const Stretched = ({children}: any) => { //@todo fix any
    return (
        <div className="block__stretched">{children}</div>
    );
};

export {Block, Static, Stretched};
