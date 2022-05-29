const API_controller = (function(){
    // basic info
    const clientId = "e6cd9b30ba4449119b59fab04765a3e5";
    const clientSecret = "691b0bc2f52c4223b09ef2c10b84e203";

    // get token
    const _get_token = async () => {
        const result = await fetch ("https://ccounts.spotify.com/api/token",{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic" + btoa(clientId + ":" + clientSecret)
            },
            body: "grant_type=client_credentials"
        });
        const data = await result.json();
        return data.access_token;
    }

    const _get_genres = async () => {
        const results = await fetch("https://api.spotify.com/v1/browse/categories?locale=sv_US",{
            method: 'GET',
            headers: { "Authorization" : "Bearer" + token}
        });
        const data = await result.json();
        return data.categories.items;
    }

    const _get_playlistbygenre = async (token, genre_id) => {
        const limit = 20;
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genre_id}/playlists?limit=${limit}`, {
            method: "GET",
            headers: { "Authorization" : "Bearer" + token}
        });
        const data = await result.json();
        return data.playlists.items;
    }

    const _get_tracks = async (token, tracks_endpoint) => {
        const limit = 20;
        const result = await fetch (`${tracks_endpoint}?limit=${limit}`, {
            method: 'GET',
            headers: {"Authorization" : "Bearer" + token}
        });
        const data = result.json();
        return data.items;
    }

    const _get_track = async (token, track_endpoint) => {
        const result = await fetch(`${track_endpoint}`, {
            method: 'GET',
            headers: {"Authorization" : "Bearer" + token}
        });
        const data = result.json();
        return data;
    }

    return {
        get_token(){
            return _get_token();
        },
        get_genres(token){
            return _get_genres(token);
        },
        get_playlistbygenre(token, genre_id){
            return _get_playlistbygenre(token, genre_id);
        },
        get_tracks(token, tracks_endpoint){
            return _get_tracks(token, tracks_endpoint);
        },
        get_track(token, track_endpoint){
            return _get_track(token, track_endpoint);
        }
    }
})();