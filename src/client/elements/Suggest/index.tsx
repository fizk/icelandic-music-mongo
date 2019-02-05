import * as React from 'react';
import './_index.scss';

export const SuggestItem = ({children, }: any) => ( //@todo fix any
    <div className="suggest-item">
        <div className="suggest-item__content">
            {children}
        </div>
    </div>
);

export const SuggestItemAvatar = ({children, avatar, }: any) => ( //@todo fix any
    <div className="suggest-item">
        <div className="suggest-item__content">
            {children}
        </div>
        <div className="suggest-item__avatar">{avatar}</div>
    </div>
);

