// backend.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample SEO headline templates
const headlines = [
  "Why NAME is LOCATION's Sweetest Spot in 2025",
  "Discover the Magic of NAME in LOCATION",
  "Top 5 Reasons NAME is Trending in LOCATION",
  "Customers in LOCATION Love NAME!",
  "Is NAME the Best Business in LOCATION? Find Out!"
];

// POST: /business-data
app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  const headline = `Why ${name} is ${location}'s Sweetest Spot in 2025`;

  res.json({
    rating: 4.3,
    reviews: 127,
    headline
  });
});

// GET: /regenerate-headline
app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  const template = headlines[Math.floor(Math.random() * headlines.length)];
  const headline = template.replace(/NAME/g, name).replace(/LOCATION/g, location);

  res.json({ headline });
});

// Start server
app.listen(PORT, () => {
  console.log(` Backend running on http://localhost:${PORT}`);
});
