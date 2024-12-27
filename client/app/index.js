function getLocation() {
    // Check if geolocation features are available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            // Use the coordinates to send a request to the server
            getWeather(latitude, longitude).catch((err) => {
                alert("Unable to get weather data");
                console.error(`Error getting weather data`, err);
            });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


window.onload = getLocation;

async function getWeather(lat, lon) {
    const res = await fetch('/api/current-weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lon }),
    });

    // Destructure the response body
    const { city, icon, description, currentTemp, minTemp, maxTemp } = await res.json();

    // If the response is not ok, alert the user
    if (!res.ok) {
        console.log(res);
        alert("Unable to get weather data");
        return;
    }

    // Otherwise, hide loader and display weather data
    const loaderElement = document.getElementById('loader');
    loaderElement.classList.add('hidden');

    const containerElement = document.getElementById('container');
    containerElement.classList.remove('hidden');

    const cityElement = document.getElementById('city');
    cityElement.innerHTML = city;

    const iconElement = document.getElementById('icon');
    iconElement.src = icon;

    const descriptionElement = document.getElementById('description');
    descriptionElement.innerHTML = description;

    const currentTempElement = document.getElementById('currentTemp');
    currentTempElement.innerHTML = `${currentTemp}°F`;

    const minTempElement = document.getElementById('minTemp');
    minTempElement.innerHTML = `${minTemp}°F`;

    const maxTempElement = document.getElementById('maxTemp');
    maxTempElement.innerHTML = `${maxTemp}°F`;
}
