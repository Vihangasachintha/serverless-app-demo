// Serverless Function: /api/quote
// Fetches a random inspirational quote from the Quotable API (free, no key needed)
// This function is stateless — it fetches fresh data on every invocation

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { tags = "" } = req.query;
  const tagParam = tags ? `?tags=${tags}` : "";

  try {
    const response = await fetch(`https://api.quotable.kurokeita.dev/api/quotes/random${tagParam}`);
    if (!response.ok) throw new Error("Quotes API failed");

    const data = await response.json();

    res.status(200).json({
      quote: data.quote.content,
      author: data.quote.author.name,
      tags: data.quote.tags?.map(t => t.name) ?? [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
