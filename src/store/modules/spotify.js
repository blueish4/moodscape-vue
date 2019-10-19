export const spotify = {
    state: {
        access_token: '',
        songs: [{
            id: 'rlihwslfijfnjwjiklwsehgolwafhi',
            name: 'test song',
            energy: 0.4,
            valence: 0.7
        }]
    },
    mutations: {
        setAccessToken (state, newToken) {
            state.access_token = newToken
        },
        insertSong(state, newSong) {
            state.songs.push(newSong)
        }
    }
}
export default spotify