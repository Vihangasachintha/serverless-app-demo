// Serverless Function: /api/quote

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const response = await fetch("https://quotable.kurokeita.dev/api/quotes/random");
    if (!response.ok) throw new Error("Quotable API responded with " + response.status);

    const data = await response.json();

    res.status(200).json({
      quote:  data.quote.content,
      author: data.quote.author.name,
      tags:   (data.quote.tags || []).map(t => t.name),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
