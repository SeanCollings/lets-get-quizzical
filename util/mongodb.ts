import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!uri) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;

const { MONGODB_URI, MONGODB_DB } = process.env;

let cached = global.mongodb;
if (!cached) {
  cached = global.mongodb = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is undefined');
  }

  if (!MONGODB_DB) {
    throw new Error('MONGODB_DB is undefined');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {};

    cached.promise = MongoClient.connect(MONGODB_URI as string, opts).then(
      (client) => {
        return {
          client,
          db: client.db(MONGODB_DB),
        };
      }
    );
  }
  cached.conn = await cached.promise;

  return cached.conn;
}

export { connectToDatabase };
