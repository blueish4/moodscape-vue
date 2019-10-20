import axios from "axios"

export const spotify = {
    state: {
        user: {},
        access_token: '',
        songs: [{}]
    },
    mutations: {
        setAccessToken (state, newToken) {
            if (newToken!=='')
                state.access_token = newToken
        },
        insertSong(state, newSong) {
            state.songs.push(newSong)
        },
        setUser(state, newUser) {
            state.user = newUser
        },
        resetState(state) {
            state.user = {}
            state.access_token = ''
            state.songs = [{}]
        },
        wipeSongs(state) {
            state.songs = []
        },
    },
    actions: {
        async loadUserData({ commit, state }) {
            const data = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                'Authorization': 'Bearer ' + state.access_token
                }
            })
            commit('setUser', data.data)
        },
        async loadUserSongs({ state, commit }) {
            const data = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
                headers: {
                    'Authorization': 'Bearer ' + state.access_token
                },
                params: {
                    'limit': 50
                }
            })
            commit('wipeSongs')
            data.data.items.forEach(async song => {
                const { data } = await axios.get('https://api.spotify.com/v1/audio-features/'+song.track.id, {
                    headers: {
                        'Authorization': 'Bearer ' + state.access_token
                    }
                })
                const songSubset = {
                    playedAt: song.played_at,
                    id: song.track.id,
                    name: song.track.name,
                    artist: song.track.artists[0].name,
                    energy: data.energy,
                    valence: data.valence
                }
                commit('insertSong', songSubset)
            })
        }
    }
}
export default spotify