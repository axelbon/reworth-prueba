const { Router } = require('express');
const fetch = require('node-fetch');
const url = require('../../config/env/development.env').spotifyApiUrl;
const tokenUrl = require('../../config/env/development.env').spotifyTokenUrl;
const router = new Router();

router.get('/login', async (req, res) => {
    const { clientId, clientSecret } = req.body;
    const token = await _getToken(clientId, clientSecret);
    res.json(token);
});

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
    albumsData.items.forEach(element => {
        albumsList.albums.push(element.name);
    });
    res.json(albumsList);
})

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