const { Router } = require('express');
const router = new Router();
const fetch = require('node-fetch');
const url = require('../../config/env/development.env').spotifyApiUrl;

const User = require('../model/user.model');
const Criterio = require('../model/criterio.model');

//search artist albums
router.get('/artist/search', async (req, res) => {
    const arti = req.query.q;
    const token = req.headers['spotify-token'];

    const criterio = await createOrUpdateCriterio(arti);

    if (!arti) {
        res.json('No artista incluido en la query');
        return;
    }

    if (!token) {
        res.json('auth token no encontrado');
        return;
    }

    //get artist id
    const id = await getArtistId(arti, token, res);
    if (typeof id !== 'string') {
        res.status(id.status).json(id.message);
        return;
    }

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
    //get user profile
    const user = await fetch(`${url}/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (user[Object.getOwnPropertySymbols(user)[1]].statusText === 'Unauthorized') {
        res.status(401).json(user[Object.getOwnPropertySymbols(user)[1]].statusText);
        return;
    }

    const userData = await user.json();
    const find = await User.findOne({ display_name: userData.display_name }).exec();

    if (find) {
        res.json(find);
        return;
    };

    const userProfile = new User({
        country: userData.country,
        display_name: userData.display_name,
        followers: userData.followers.total,
        type: userData.type
    });
    await userProfile.save();

    res.json({
        message: 'user saved',
        userProfile
    })
})

//search artist top tracks
router.get('/artist/top-tracks', async (req, res) => {
    const arti = req.query.q;
    const token = req.headers['spotify-token'];
    const id = await getArtistId(arti, token);

    const criterio = await createOrUpdateCriterio(arti);

    if (typeof id !== 'string') {
        res.status(id.status).json(id.message);
        return;
    }

    const topTracks = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const topTracksData = await topTracks.json();
    let data = {
        totalTracks: 0,
        tracks: [ /*{ name: string, release_date: date }*/]
    }

    topTracksData.tracks.forEach(track => {
        data.tracks.push({ name: track.name, release_date: track.album.release_date });
        data.totalTracks++;
    });

    res.json(data);
});

//private function
//search for artist id
const getArtistId = async (artitstName, token, res) => {
    //get artist id
    const artist = await fetch(`${url}/search?q=${artitstName}&type=artist&market=ES&limit=1`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const artistData = await artist.json();
    //handle error from fetch
    if (artistData.error) {
        return artistData.error;
    } else {
        const id = artistData.artists.items[0].id;

        return id;
    }

}

//private function
//create or update criterio
const createOrUpdateCriterio = async (description) => {
    const criterio =  await Criterio.findOne({descripcion: description});

    if(criterio) {
        criterio.total = criterio.total + 1;
        criterio.save();
        return true;
    } 

    const newCriterio = new Criterio({
        descripcion: description,
        total: 1
    });
    newCriterio.save();

    return false;
};

module.exports = router;