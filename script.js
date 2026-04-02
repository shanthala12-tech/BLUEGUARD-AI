// 🌍 Map
let map = L.map('map').setView([20, 78], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

// 📊 Chart
let chart;
let dataPoints = [];

// 🔄 Main function
async function generateData() {
    try {
        let res = await fetch("http://localhost:3000/data");
        let data = await res.json();

        document.getElementById("pollution").innerText = data.pollution;
        document.getElementById("biodiversity").innerText = data.biodiversity;
        document.getElementById("fishing").innerText = data.fishing;

        let prediction = data.pollution.includes("Severe") ? "🚨 High Risk"
            : data.pollution.includes("Moderate") ? "⚠️ Increasing Risk"
            : "✅ Stable";

        document.getElementById("prediction").innerText = prediction;

        let alertBox = document.getElementById("alertBox");
        let alertMsg;

        if (data.pollution.includes("Severe")) {
            alertMsg = "🚨 High Pollution!";
            alertBox.style.border = "3px solid red";
        } else if (data.pollution.includes("Moderate")) {
            alertMsg = "⚠️ Pollution Rising";
            alertBox.style.border = "3px solid orange";
        } else {
            alertMsg = "✅ Safe";
            alertBox.style.border = "3px solid green";
        }

        document.getElementById("alertText").innerText = alertMsg;

        let solution = data.pollution.includes("Severe")
            ? "Reduce waste and control discharge."
            : data.pollution.includes("Moderate")
            ? "Monitor pollution levels."
            : "Maintain safe conditions.";

        if (data.fishing.includes("Overfishing")) {
            solution += " Limit fishing.";
        }

        document.getElementById("solution").innerText = solution;

        let p = data.pollution.toLowerCase();
        let mood;

        if (p.includes("severe")) {
            document.body.style.background = "linear-gradient(to right, #3a0000, #700000)";
            mood = "😡 Critical Ocean";
        } else if (p.includes("moderate")) {
            document.body.style.background = "linear-gradient(to right, #3a2a00, #705000)";
            mood = "😐 Stressed Ocean";
        } else {
            document.body.style.background = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
            mood = "😊 Healthy Ocean";
        }

        document.getElementById("mood").innerText = mood;

        // Map
        let lat = 10 + Math.random() * 20;
        let lon = 70 + Math.random() * 20;

        if (marker) map.removeLayer(marker);

        marker = L.circleMarker([lat, lon], {
            color: p.includes("severe") ? "red" :
                   p.includes("moderate") ? "orange" : "green",
            radius: 10
        }).addTo(map);

        marker.bindPopup("🌊 " + data.pollution);
        map.setView([lat, lon], 5);

        // Graph
        let val = Math.random() * 100;
        dataPoints.push(val);
        if (dataPoints.length > 10) dataPoints.shift();

        if (!chart) {
            let ctx = document.getElementById("chart").getContext("2d");
            chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: dataPoints.map((_, i) => i + 1),
                    datasets: [{
                        label: "Pollution Level",
                        data: dataPoints
                    }]
                }
            });
        } else {
            chart.data.labels = dataPoints.map((_, i) => i + 1);
            chart.data.datasets[0].data = dataPoints;
            chart.update();
        }

    } catch (err) {
        console.log(err);
    }
}

// 🔊 Voice
function speakData() {
    let msg =
        "Ocean report. Pollution is " + document.getElementById("pollution").innerText +
        ". Biodiversity is " + document.getElementById("biodiversity").innerText +
        ". Fishing is " + document.getElementById("fishing").innerText;

    let speech = new SpeechSynthesisUtterance(msg);
    speech.rate = 0.8;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

// ⏱ Time
setInterval(() => {
    document.getElementById("time").innerText =
        new Date().toLocaleTimeString();
}, 1000);

// 🔥 DETAILS PAGE FUNCTION
function openDetails(type) {
    localStorage.setItem("type", type);
    window.location.href = "details.html";
}

// Auto run
setInterval(generateData, 3000);
generateData();





























