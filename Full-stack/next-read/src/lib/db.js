import "server-only";
import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI;

if(!url || url===undefined){
  throw new Error("Url is not defined");
}

const client = new MongoClient(url);

// console.log(client);


async function DB(dbName) {
  try{
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  return db;
  }catch(err){
    console.log(err);
  }
}

export async function getCollection(collectionName) {
  const db =  await DB("next-read");
  const collection = db?.collection(collectionName);
  return collection;
}