// Serverless Function: /api/quote
// Uses dummyjson.com — free, no key, reliable

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    // dummyjson has 100 quotes, pick a random one each call
    const randomId = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`https://dummyjson.com/quotes/${randomId}`);
    if (!response.ok) throw new Error("DummyJSON responded with " + response.status);

    const data = await response.json();

    res.status(200).json({
      quote:  data.quote,
      author: data.author,
      tags:   [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};