// Serverless Function: /api/joke

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    );
    if (!response.ok) throw new Error("JokeAPI responded with " + response.status);

    const data = await response.json();

    const joke =
      data.type === "single"
        ? { type: "single", text: data.joke }
        : { type: "twopart", setup: data.setup, delivery: data.delivery };

    res.status(200).json({ ...joke, category: data.category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
