const { Router } = require('express');
const router = new Router();
const fetch = require('node-fetch');
const url = require('../../config/env/development.env').spotifyApiUrl;
const tokenUrl = require('../../config/env/development.env').spotifyTokenUrl;

//Authorization
const client_id = 'bf8840bfab164c3ba3211b9c1f32c604'; // Your client id
const client_secret = '08a3e16292cf4f7fab755d07b3969095'; // Your secret

//https://accounts.spotify.com/authorize?client_id=YmY4ODQwYmZhYjE2NGMzYmEzMjExYjljMWYzMmM2MDQ6MDhhM2UxNjI5MmNmNGY3ZmFiNzU1ZDA3YjM5NjkwOTU=&redirect_uri=http://127.0.0.1:3000/&scope=user-read-private%20user-read-email&response_type=token


//logs in for the spotify token
router.get('/login', async (req, res) => {
    const { clientId, clientSecret } = req.body;
    const token = await _getToken(clientId, clientSecret);
    res.json(token);
});

//search artist albums
router.get('/searchArtist', async (req, res) => {
    const arti = req.query.q;
    const token = req.headers['spotify-token'];
    //get artist id
    const artist = await fetch(`${url}/search?q=${arti}&type=artist&market=ES&limit=1`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const artistData = await artist.json();
    const id = artistData.artists.items[0].id;
    //search albums
    const albums = await fetch(`${url}/artists/${id}/albums?market=ES&limit=20`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const albumsData = await albums.json();
    let albumsList = {
        artist: arti,
        albums: [],
        time: new Date(),
        limit: albumsData.limit
    };
    //push albums name to the albums list
    albumsData.items.forEach(element => {
        albumsList.albums.push(element.name);
    });
    //return album list json object
    res.json(albumsList);
})

//search user profile
router.get('/userProfile', async (req, res) => {
    const token = req.headers['spotify-token'];
    console.log(token);
    //get user profile
    const user = await fetch(`${url}/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const userData = await user.json();
    res.json(userData)
})

//gets spotify token auth
const _getToken = async (client_id, client_secret) => {
    const result = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();

    return data;
};

module.exports = router;