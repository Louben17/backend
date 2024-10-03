// backend/index.js

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;
const INSTAGRAM_USER_ID = '67619903950'; // Změňte na váš Instagram user ID

app.get('/instagram', async (req, res) => {
    try {
        const response = await axios.get(`https://graph.instagram.com/${INSTAGRAM_USER_ID}/media`, {
            params: {
                fields: 'id,caption,media_type,media_url,permalink',
                access_token: INSTAGRAM_TOKEN,
                limit: 5
            }
        });

        // Filtrovat pro zahrnutí pouze obrázků a reels
        const mediaPosts = response.data.data.filter(post => post.media_type === 'IMAGE' || post.media_type === 'REEL');
        res.json(mediaPosts);
    } catch (error) {
        console.error('Error fetching Instagram data:', error);
        res.status(500).send('Error fetching Instagram data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
