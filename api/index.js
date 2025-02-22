const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.get("/tracks", async (req, res) => {
    try {
        const query = req.query.url;
        console.log(query);
        
        const response = await axios.post("https://spotify.musicdown.co/api/get-metadata", {
            url: query
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch track metadata" });
    }
});

app.get("/download", async (req, res) => {
    try {
        const query = req.query.url;
        
        const response = await axios.post("https://spotify.musicdown.co/api/download-track", {
            url: query
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to download track" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
