const express = require("express");
const app = express();

// 🔥 Serve all static files (HTML, CSS, JS, MP3)
app.use(express.static(__dirname));

// 🌊 API for ocean data
app.get("/data", (req, res) => {
    const pollutionLevels = ["Clean ✅", "Moderate ⚠️", "Severe 🚨"];
    const biodiversityLevels = ["Healthy 🌱", "Declining ⚠️", "Critical 🚨"];
    const fishingLevels = ["Safe 🎣", "Overfishing ⚠️"];

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

    res.json({
        pollution: random(pollutionLevels),
        biodiversity: random(biodiversityLevels),
        fishing: random(fishingLevels)
    });
});

// 🚀 Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});



