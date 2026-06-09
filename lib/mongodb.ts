import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Only initialize the client if the URI exists, preventing a fatal crash at build time
if (uri) {
  if (process.env.NODE_ENV === 'development') {
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
} else {
  console.warn("⚠️ Warning: MONGODB_URI environment variable is missing.");
}

export default clientPromise;
