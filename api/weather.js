// Serverless Function: /api/weather
// Vercel wakes this up on each request, then shuts it down — no persistent server

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { lat = "6.9271", lon = "79.8612" } = req.query;

  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m,apparent_temperature` +
      `&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather API responded with " + response.status);

    const data = await response.json();
    const c = data.current;

    const weatherCodes = {
      0:"Clear sky", 1:"Mainly clear", 2:"Partly cloudy", 3:"Overcast",
      45:"Foggy", 48:"Icy fog", 51:"Light drizzle", 53:"Drizzle", 55:"Heavy drizzle",
      61:"Slight rain", 63:"Moderate rain", 65:"Heavy rain",
      71:"Slight snow", 73:"Moderate snow", 75:"Heavy snow",
      80:"Rain showers", 81:"Moderate showers", 82:"Violent showers",
      95:"Thunderstorm", 99:"Thunderstorm + hail"
    };

    res.status(200).json({
      temperature:      c.temperature_2m,
      apparent:         c.apparent_temperature,
      unit:             data.current_units.temperature_2m,
      condition:        weatherCodes[c.weathercode] ?? "Code " + c.weathercode,
      windspeed:        c.windspeed_10m,
      humidity:         c.relative_humidity_2m,
      timezone:         data.timezone,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
