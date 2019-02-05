import {Collection as DBCollection} from "../../../@types/database";

export const orderAlbumType = (a: DBCollection, b: DBCollection) => (
    new Date(b.releaseDates || '').getTime() - new Date(a.releaseDates || '').getTime()
);
