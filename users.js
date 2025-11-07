import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'music';
const collectionName = 'users';

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    if (req.method === 'POST') {
      const user = req.body;
      await collection.insertOne(user);
      res.status(200).json({ message: 'User added successfully' });
    } else if (req.method === 'GET') {
      const users = await collection.find({}).toArray();
      res.status(200).json(users);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
