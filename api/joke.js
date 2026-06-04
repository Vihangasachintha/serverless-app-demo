// Serverless Function: /api/joke
// Each call to this function is a fresh, isolated execution
// Returns a random programming joke from JokeAPI (free, no key needed)

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    );
    if (!response.ok) throw new Error("Joke API failed");

    const data = await response.json();

    // JokeAPI returns either a single joke or a two-part setup/delivery joke
    const joke =
      data.type === "single"
        ? { type: "single", text: data.joke }
        : { type: "twopart", setup: data.setup, delivery: data.delivery };

    res.status(200).json({ ...joke, category: data.category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
