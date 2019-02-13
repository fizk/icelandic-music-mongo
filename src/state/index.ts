import ApolloClient from "apollo-client/ApolloClient";

type apolloContext<T> = {cache: ApolloClient<T>}

export const mutations = {
    updateArtistSectionModal: (_:any, {key, value}: any, {cache}: apolloContext<any>) => {
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
