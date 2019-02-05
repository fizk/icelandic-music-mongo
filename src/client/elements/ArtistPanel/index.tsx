import * as React from 'react';
import {Link} from 'react-router-dom';
import './_index.scss';

const ArtistPanel = ({children}: any) => ( //@todo fix any
    <div className="artist-panel">{children}</div>
);

const ArtistTile = ({children, artist}: any) => ( //@todo fix any
    <div className="artist-panel__tile" style={{backgroundImage: `url(${artist.hero && artist.hero.url})`}}>
        <Link to={`/listamenn/${artist._id}`}>{artist.name}</Link>
    </div>
);

export {ArtistPanel, ArtistTile};
