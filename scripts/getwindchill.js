const temperature = 28;
const windSpeed = 34;

function calculationWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * speed ** 0.16 + 0.3965 * temp * speed ** 0.16;
}

const windChillElement = document.getElementById("windchill");

if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculationWindChill(temperature, windSpeed).toFixed(1)}°C`;
} else {
    windChillElement.textContent = `N/A`;
}
