const Parser = require('rss-parser');
const connectDB = require('./db');

const parser = new Parser();

async function fetchAndStoreFeed(url) {
  try {
    const db = await connectDB();
    const articles = db.collection('articles');

    const feed = await parser.parseURL(url);

    for (const item of feed.items) {
      const existing = await articles.findOne({ link: item.link });
      if (!existing) {
        await articles.insertOne({
          ...item,
          source: feed.title,
          read: false,
          date: new Date(item.pubDate || Date.now())
        });
      }
    }

    console.log(`✔ Fetched and stored feed from ${feed.title}`);
  } catch (err) {
    console.error('❌ Error fetching feed:', err.message);
  }
}

module.exports = { fetchAndStoreFeed };
