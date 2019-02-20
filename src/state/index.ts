import ApolloClient from "apollo-client/ApolloClient";

interface ApolloContext<T> {cache: ApolloClient<T>}

export const mutations = {
    updateArtistSectionModal: (_: null, {key, value}: {key: string; value: string}, {cache}: ApolloContext<object>) => { //@todo fix object
        const data = {
            artistSectionModal: {
                __typename: 'ArtistSectionModal',
                album: false,
                single: false,
                ep: false,
                compilation: false,
                [key]: value
            },
        };
        cache.writeData({data});
        return null;
    }
};

export const defaults = {
    artistSectionModal: {
        __typename: 'ArtistSectionModal',
        album: false,
        single: false,
        ep: false,
        compilation: false,
    }
};
