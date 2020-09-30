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
            if (!state.songs.some(e => e.id === newSong.id)) {
                state.songs.push(newSong)
            }
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
            const resp = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                'Authorization': 'Bearer ' + state.access_token
                }
            })
            commit('setUser', await resp.json())
        },
        async loadUserSongs({ state, commit }) {
            const resp = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
                headers: {
                    'Authorization': 'Bearer ' + state.access_token
                }
            })
            commit('wipeSongs')
            ;(await resp.json()).items.forEach(async song => {
                const features = await fetch('https://api.spotify.com/v1/audio-features/'+song.track.id, {
                    headers: {
                        'Authorization': 'Bearer ' + state.access_token
                    }
                })
                const data = await features.json()
                const songSubset = {
                    playedAt: song.played_at.substring(14,22),
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