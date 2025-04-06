const connectDB = require('../db');

async function queryBySource(source) {
  const db = await connectDB();
  return db.collection('articles').find({ source }).toArray();
}

async function queryByKeyword(keyword) {
  const db = await connectDB();
  return db.collection('articles').find({
    title: { $regex: keyword, $options: 'i' }
  }).toArray();
}

async function markAsRead(link) {
  const db = await connectDB();
  return db.collection('articles').updateOne({ link }, { $set: { read: true } });
}

module.exports = { queryBySource, queryByKeyword, markAsRead };
