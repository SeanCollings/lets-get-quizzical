const { MongoClient, Db } = require('mongodb');

type MongoConnection = {
  client: MongoClient;
  db: Db;
};

declare module globalThis {
  var _mongoClientPromise: Promise<MongoClient>;
  var mongodb: {
    conn: MongoConnection | null;
    promise: Promise<MongoConnection> | null;
  };
}
