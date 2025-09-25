document.getElementById("weatherForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const locationInput = document.getElementById("locationInput");
    const weatherResult = document.getElementById("weatherResult");
    const location = locationInput.value.trim();
    const apiKey = "2ccbb3fd28eb47bebd061451252602";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    // Clear previous result & show loading state
    weatherResult.innerHTML = `<p class="loading">Fetching weather data...</p>`;

    // Check if input is empty
    if (!location) {
        weatherResult.innerHTML = `<p style="color: red;">Please enter a location.</p>`;
        return;
    }

    try {
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Weather data not found. Please enter a valid location.");

        const data = await response.json();

        weatherResult.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>🌡 Temperature: ${data.current.temp_c}°C</p>
            <p>🌤 Condition: ${data.current.condition.text}</p>
            <p>💧 Humidity: ${data.current.humidity}%</p>
            <p>🌍 Air Quality Index: ${data.current.air_quality.pm2_5.toFixed(2)}</p>
            <img src="${data.current.condition.icon}" alt="Weather Icon">
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
});

// Dark Mode Toggle with Icon Change & Local Storage
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Function to apply dark mode settings
function applyDarkMode() {
    const isDarkMode = localStorage.getItem("darkMode") === "enabled";
    if (isDarkMode) {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "🌙"; 
    } else {
        body.classList.remove("dark-mode");
        darkModeToggle.textContent = "☀️"; 
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    const isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    darkModeToggle.textContent = isDarkMode ? "🌙" : "☀️";
}

// Apply dark mode setting on page load
applyDarkMode();

// Event listener for dark mode toggle
darkModeToggle.addEventListener("click", toggleDarkMode);
