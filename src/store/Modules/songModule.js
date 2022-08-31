import * as api from "../Services/api"
const defaultFields = [
    {key:'song_name', label: 'Song Name', sortable: true },
    {key:'artist_name', label: 'Artist Name', sortable: true },
    {key:'album_name', label: 'Album Name', sortable: true },
    {key:'year_released', label: 'Year Released', sortable: true },
    {key:'song_track', label: 'Song Track', sortable: true }
]
const state = {
    fields: [
        ...defaultFields
    ],
    items:[],
    itemsCount: 0,
}

const mutations = {
    SET_ALBUMS(state, payload) {
        let items = [];
        payload.forEach(async function(item) {
            let song = {song_name: item.name,song_track: item.track};
           await api.get(`/albums/`+item.album_id).then(async (album) => {
                song.album_name = album.name;
                song.year_released = album.year_released;
                await api.get(`/artists/`+album.artist_id).then((response) => {
                    song.artist_name = response.name;
                })
            });
            items.push(song);
        });
        
        state.items = items;
    },
    SET_ITEMS_COUNT(state, payload) {
        state.itemsCount = payload;
    }
}

const actions = {
    async get({ commit }, {page, perPage, sortBy, sortDesc}) {
        await api.get(`/songs`).then((response) => {
            commit('SET_ITEMS_COUNT', response.length);
        });
        return await api.get(`/songs?_page=${page}&_limit=${perPage}&_sort=${sortBy}&_order=${sortDesc}`).then((response) => {
            commit('SET_ALBUMS', response)
            return response
        });
    },
}

const getters = {
    fields: ({ fields }) => fields,
    items: ({ items }) => items,
    itemsCount: ({ itemsCount }) => itemsCount,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
